# X:\Projects\BeToo_Project\be_too_ecommerce\payments\views.py

from rest_framework import generics, permissions
from .models import Payment
from .serializers import PaymentSerializer
import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from orders.models import Order 


class PaymentListView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = (permissions.IsAuthenticated,) # Seuls les utilisateurs authentifiés peuvent voir/créer

    def get_queryset(self):
        # Les paiements sont liés aux commandes de l'utilisateur
        # Assurez-vous que l'utilisateur est authentifié pour filtrer
        if self.request.user.is_authenticated:
            return Payment.objects.filter(order__user=self.request.user).order_by('-created_at')
        return Payment.objects.none() # Retourne un queryset vide si non authentifié

    def perform_create(self, serializer):
        # Assurez-vous que le paiement est lié à une commande appartenant à l'utilisateur
        # Cette logique sera probablement plus complexe avec la création de commandes réelles
        # Pour l'instant, nous allons simplement sauvegarder si l'utilisateur est authentifié
        if self.request.user.is_authenticated:
            # Vous devrez probablement passer l'ID de la commande dans la requête
            # et vérifier si cette commande appartient bien à l'utilisateur.
            # Pour un exemple simple, on suppose que la commande est valide pour l'utilisateur.
            serializer.save()
        else:
            raise permissions.PermissionDenied("Vous devez être authentifié pour créer un paiement.")


class PaymentDetailView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        # Un utilisateur ne peut voir que ses propres paiements
        if self.request.user.is_authenticated:
            return Payment.objects.filter(order__user=self.request.user)
        return Payment.objects.none()
    

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            # On récupère le montant envoyé par le frontend (ou calculé via la commande)
            # Pour le test, on met 1000 (10.00 MGA ou EUR selon ton compte)
            amount = request.data.get('amount', 1000) 
            
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'mga', # Ou 'usd' / 'eur' selon ton dashboard
                        'product_data': {'name': 'Achat sur E-commerce B2C'},
                        'unit_amount': int(amount),
                    },
                    'quantity': 1,
                }],
                mode='payment',
                # URLs vers lesquelles l'utilisateur revient après le paiement
                success_url='http://10.96.131.99:3000/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url='http://10.96.131.99:3000/cancel',
            )
            return Response({'url': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)