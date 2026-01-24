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

# ... (tes imports restent identiques)

class AddToCartView(APIView):
    permission_classes = (permissions.AllowAny,) # Changé pour permettre l'ajout sans login

    def post(self, request, *args, **kwargs):
        variant_id = request.data.get('variant_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            product_variant = ProductVariant.objects.get(id=variant_id)
        except ProductVariant.DoesNotExist:
            return Response({"detail": "Variante non trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # 1. Récupération du panier (Logique session/user)
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
        else:
            if not request.session.session_key:
                request.session.create()
            cart, created = Cart.objects.get_or_create(session_key=request.session.session_key)

        # 2. Ajout ou mise à jour (Correction du nom de champ : variant)
        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            variant=product_variant, # <-- Corrigé (était product_variant)
            defaults={'quantity': quantity}
        )
        
        if not item_created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = serializers.CartSerializer(cart, context={'request': request})
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
