# PATH: backend/betoo/api/serializers.py

from rest_framework import serializers
from products.models import Category, Product, ProductVariant
from cart.models import Cart, CartItem
from orders.models import Order, OrderItem
from accounts.models import CustomerAddress


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


# CART
class CartItemSerializer(serializers.ModelSerializer):
    variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total"]

    def get_total(self, obj):
        return obj.total()


# ORDERS
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = "__all__"
