# X:\Projects\BeToo_Project\be_too_ecommerce\cart\views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart, CartItem
from . import serializers # Importez le module serializers de l'application cart
from products.models import ProductVariant # Importez le modèle de variante de produit

class CartDetailView(generics.RetrieveAPIView):
    serializer_class = serializers.CartSerializer # Utilisez serializers.CartSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,) # Permettre aux invités de voir le panier

    def get_object(self):
        # Tente de récupérer le panier par utilisateur ou session_key
        if self.request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=self.request.user)
        else:
            session_key = self.request.session.session_key
            if not session_key:
                self.request.session.create()
                session_key = self.request.session.session_key
            cart, created = Cart.objects.get_or_create(session_key=session_key)
        return cart

class AddToCartView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def post(self, request, *args, **kwargs):
        variant_id = request.data.get('variant_id')
        quantity = request.data.get('quantity', 1)

        try:
            product_variant = ProductVariant.objects.get(id=variant_id)
        except ProductVariant.DoesNotExist:
            return Response({"detail": "Variante de produit non trouvée."}, status=status.HTTP_404_NOT_FOUND)

        if product_variant.stock < quantity:
            return Response({"detail": "Stock insuffisant pour cette variante."}, status=status.HTTP_400_BAD_REQUEST)

        # Récupérer le panier de l'utilisateur ou de la session
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
        else:
            session_key = request.session.session_key
            if not session_key:
                request.session.create()
                session_key = request.session.session_key
            cart, created = Cart.objects.get_or_create(session_key=session_key)

        # Ajouter ou mettre à jour l'article dans le panier
        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            product_variant=product_variant,
            defaults={'quantity': quantity}
        )
        if not item_created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = serializers.CartSerializer(cart, context={'request': request}) # Utilisez serializers.CartSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateCartItemView(generics.UpdateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = serializers.CartItemSerializer # Utilisez serializers.CartItemSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    lookup_field = 'pk' # Pour mettre à jour un article de panier par son ID

    def get_queryset(self):
        # S'assurer que l'utilisateur ne peut modifier que ses propres articles de panier
        if self.request.user.is_authenticated:
            return CartItem.objects.filter(cart__user=self.request.user)
        else:
            session_key = self.request.session.session_key
            return CartItem.objects.filter(cart__session_key=session_key)

    def perform_update(self, serializer):
        # Vérifier le stock avant de mettre à jour
        quantity = serializer.validated_data.get('quantity')
        product_variant = serializer.instance.product_variant
        if quantity is not None and product_variant.stock < quantity:
            raise serializers.ValidationError({"quantity": "Stock insuffisant."})
        serializer.save()

class RemoveFromCartView(generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    lookup_field = 'pk' # Pour supprimer un article de panier par son ID

    def get_queryset(self):
        # S'assurer que l'utilisateur ne peut supprimer que ses propres articles de panier
        if self.request.user.is_authenticated:
            return CartItem.objects.filter(cart__user=self.request.user)
        else:
            session_key = self.request.session.session_key
            return CartItem.objects.filter(cart__session_key=session_key)
