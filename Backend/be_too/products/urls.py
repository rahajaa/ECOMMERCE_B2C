# X:\ecommerce_Projects\BeToo_Project\be_too_ecommerce\products\urls.py
from django.urls import path
from . import views  # <-- IMPORTANT: Utilisez ".views" car c'est dans le même dossier

urlpatterns = [
    # URLs pour les Catégories
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<slug:slug>/', views.CategoryDetailView.as_view(), name='category-detail'),

    # URLs pour les Produits (racine de /api/products/)
    path('', views.ProductListCreateView.as_view(), name='product-list-create'), 
    path('<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'), 

    # URLs pour les Variantes de Produits
    path('<slug:product_slug>/variants/', views.ProductVariantListCreateView.as_view(), name='product-variant-list-create'),
    path('<slug:product_slug>/variants/<int:pk>/', views.ProductVariantDetailView.as_view(), name='product-variant-detail'),

    # URLs pour les Images de Produits
    path('<slug:product_slug>/images/', views.ProductImageListCreateView.as_view(), name='product-image-list-create'),
    path('<slug:product_slug>/images/<int:pk>/', views.ProductImageDetailView.as_view(), name='product-image-detail'),
]