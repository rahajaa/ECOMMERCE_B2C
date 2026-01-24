from django.urls import path
from .views import CartDetailView, AddToCartView, UpdateCartItemView, RemoveFromCartView

urlpatterns = [
    path('', CartDetailView.as_view(), name='cart-detail'),
    path('add/', AddToCartView.as_view(), name='cart-add'),
    path('item/<int:pk>/update/', UpdateCartItemView.as_view(), name='cart-update'),
    path('item/<int:pk>/remove/', RemoveFromCartView.as_view(), name='cart-remove'),
]