# X:\ecommerce_Projects\BeToo_Project\be_too_ecommerce\orders\urls.py

from django.urls import path, include
# Assurez-vous d'importer toutes les vues que vous utilisez
from .views import OrderListCreateView, OrderDetailView, StripeCheckoutSessionCreateView, StripeWebhookView

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list-create'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('create-checkout-session/', StripeCheckoutSessionCreateView.as_view(), name='create-checkout-session'),
    path('stripe-webhook/', StripeWebhookView, name='stripe-webhook'), # <-- CORRECTION ICI
]