# PATH: backend/betoo/api/views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from products.models import Product
from cart.models import Cart, CartItem
from orders.models import Order, OrderItem
from .serializers import (
    ProductSerializer,
    CartSerializer,
    OrderSerializer
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter()
    serializer_class = ProductSerializer


class CartViewSet(viewsets.ViewSet):

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['post'])
    def add(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)

        variant_id = request.data.get("variant_id")
        qty = int(request.data.get("quantity", 1))

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            variant_id=variant_id
        )

        if not created:
            item.quantity += qty
        else:
            item.quantity = qty

        item.save()

        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=['post'])
    def remove(self, request):
        cart = Cart.objects.get(user=request.user)
        CartItem.objects.filter(
            cart=cart,
            variant_id=request.data.get("variant_id")
        ).delete()

        return Response(CartSerializer(cart).data)


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CheckoutViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'])
    def create_order(self, request):

        cart = Cart.objects.get(user=request.user)

        if cart.items.count() == 0:
            return Response(
                {"error": "Panier vide"},
                status=400
            )

        order = Order.objects.create(user=request.user)

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                variant=item.variant,
                quantity=item.quantity,
                price=item.variant.price
            )

        order.calculate_total()

        cart.items.all().delete()

        return Response({
            "message": "Commande créée",
            "order_id": order.id
        })
