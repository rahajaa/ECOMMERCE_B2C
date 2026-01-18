# X:\Projects\BeToo_Project\be_too_ecommerce\cart\serializers.py

from rest_framework import serializers
from .models import Cart, CartItem
from products.serializer import ProductVariantSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True) # Affiche les détails de la variante

    class Meta:
        model = CartItem
        fields = ['id', 'product_variant', 'quantity', 'added_at']
        read_only_fields = ['added_at']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True) # Affiche les articles du panier
    # Vous pouvez ajouter un champ calculé pour le total du panier ici

    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_key', 'created_at', 'updated_at', 'items']
        read_only_fields = ['user', 'session_key', 'created_at', 'updated_at']
