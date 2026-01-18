# X:\Projects\BeToo_Project\be_too_ecommerce\accounts\urls.py
from django.urls import path
from .views import UserRegistrationView, UserProfileView 
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),

    # Note: La connexion est geree par simplejwt aux URLs /api/token/ et /api/token/refresh/
]