from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductVariantSerializer

class CartItemSerializer(serializers.ModelSerializer):
    variant = ProductVariantSerializer(read_only=True)
    total_item_price = serializers.ReadOnlyField(source='get_total')

    class Meta:
        model = CartItem
        fields = ['id', 'variant', 'quantity', 'total_item_price']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_cart_price = serializers.ReadOnlyField(source='total')

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_cart_price', 'updated_at']