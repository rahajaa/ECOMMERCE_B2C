# X:\ecommerce_Projects\BeToo_Project\be_too_ecommerce\orders\views.py

import stripe
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView # Cette ligne est correcte
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import ProductVariant # Import nécessaire pour ProductVariant
from decimal import Decimal

# Configure Stripe avec votre clé secrète
stripe.api_key = settings.STRIPE_SECRET_KEY

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated] # Seuls les utilisateurs authentifiés peuvent lister/creer

    def get_queryset(self):
        # Un utilisateur ne voit que ses propres commandes
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product_variant__product', 'shipping_address')

    def perform_create(self, serializer):
        # L'utilisateur est automatiquement associé à la commande via IsAuthenticated
        serializer.save(user=self.request.user)

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un utilisateur ne peut voir/modifier/supprimer que ses propres commandes
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product_variant__product', 'shipping_address')

    # Si vous voulez empecher la suppression/modification apres un certain statut
    def perform_destroy(self, instance):
        if instance.status != 'pending': # Exemple: ne peut supprimer que les commandes en attente
            raise generics.ValidationError("Impossible de supprimer une commande non en attente.")
        super().perform_destroy(instance)

    def perform_update(self, serializer):
        # Empêcher la modification de certains champs après la création ou selon le statut
        if 'status' in serializer.validated_data and serializer.instance.status != 'pending':
            # Exemple: Ne pas changer le statut si ce n'est pas "pending"
            # Une logique plus complexe de workflow de statut serait ici.
            pass
        super().perform_update(serializer)


class StripeCheckoutSessionCreateView(APIView):
    permission_classes = [IsAuthenticated] # L'utilisateur doit etre connecte pour creer une session de paiement

    def post(self, request, *args, **kwargs):
        # Les données attendues dans le corps de la requête POST sont l'ID de la commande
        order_id = request.data.get('order_id')
        
        if not order_id:
            return Response({'error': 'Order ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        order = get_object_or_404(Order, id=order_id, user=request.user)

        if order.is_paid:
            return Response({'error': 'This order has already been paid.'}, status=status.HTTP_400_BAD_REQUEST)

        if not order.items.exists():
            return Response({'error': 'Order has no items.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd', # ou 'mga' pour Ariary malgache si Stripe le supporte
                            'product_data': {
                                'name': item.product_variant.product.name,
                                'description': f"{item.quantity} x {item.product_variant.display_attributes()}" if item.product_variant.attributes else f"{item.quantity} x {item.product_variant.product.name}",
                            },
                            'unit_amount': int(item.price_at_purchase * 100), # Montant en centimes
                        },
                        'quantity': item.quantity,
                    }
                    for item in order.items.all()
                ],
                mode='payment',
                success_url='http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}', # URL de redirection apres succes
                cancel_url='http://localhost:3000/cancel', # URL de redirection apres annulation
                client_reference_id=str(order.id), # Lier la session Stripe a votre ID de commande
                metadata={
                    'order_id': str(order.id), # Stocke l'ID de la commande dans les metadonnees de Stripe
                    'user_id': str(order.user.id) if order.user else 'guest',
                }
            )
            return Response({'checkout_url': checkout_session.url})

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt # Nécessaire car le webhook vient d'un service externe (Stripe)
def StripeWebhookView(request): # C'est une FONCTION, c'est pourquoi pas de .as_view() dans urls.py
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session