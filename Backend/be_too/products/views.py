# X:\ecommerce_Projects\BeToo_Project\be_too_ecommerce\products\views.py

from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response 
from rest_framework import status 
from django.shortcuts import get_object_or_404

# Assurez-vous que vos modèles sont importés depuis le même répertoire 'products'
from .models import Category, Product, ProductVariant, ProductImage 

# Assurez-vous que vos sérialiseurs sont importés depuis le même répertoire 'products'
from .serializer import (
    CategorySerializer, 
    ProductSerializer, 
    ProductVariantSerializer, 
    ProductImageSerializer
)

# --- Fonction utilitaire pour passer le contexte de la requête aux sérialiseurs ---
# Ceci est important pour que les URLs des images soient absolues
def get_serializer_context_with_request(self):
    return {'request': self.request}

# --- Vues pour les Catégories ---

class CategoryListCreateView(generics.ListCreateAPIView):
    """
    Vue pour lister toutes les catégories ou en créer une nouvelle.
    Accessible via /api/products/categories/
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Vue pour récupérer, mettre à jour ou supprimer une catégorie par son slug.
    Accessible via /api/products/categories/<slug:slug>/
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug' # Utilisez 'slug' pour la recherche dans l'URL
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

# --- Vues pour les Produits ---

class ProductListCreateView(generics.ListCreateAPIView):
    """
    Vue pour lister tous les produits ou en créer un nouveau.
    Accessible via /api/products/
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Vue pour récupérer, mettre à jour ou supprimer un produit par son slug.
    Accessible via /api/products/<slug:slug>/
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug' # Utilisez 'slug' pour la recherche dans l'URL
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

# --- Vues pour les Variantes de Produits ---

class ProductVariantListCreateView(generics.ListCreateAPIView):
    """
    Vue pour lister les variantes d'un produit spécifique ou en créer une nouvelle.
    Accessible via /api/products/<slug:product_slug>/variants/
    """
    serializer_class = ProductVariantSerializer
    
    def get_queryset(self):
        product_slug = self.kwargs['product_slug']
        product = get_object_or_404(Product, slug=product_slug)
        return ProductVariant.objects.filter(product=product)

    def perform_create(self, serializer):
        product_slug = self.kwargs['product_slug']
        product = get_object_or_404(Product, slug=product_slug)
        serializer.save(product=product) 
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

class ProductVariantDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Vue pour récupérer, mettre à jour ou supprimer une variante spécifique d'un produit.
    Accessible via /api/products/<slug:product_slug>/variants/<int:pk>/
    """
    serializer_class = ProductVariantSerializer
    
    def get_queryset(self):
        product_slug = self.kwargs['product_slug']
        product = get_object_or_404(Product, slug=product_slug)
        return ProductVariant.objects.filter(product=product)
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

# --- Vues pour les Images de Produits ---

class ProductImageListCreateView(generics.ListCreateAPIView):
    """
    Vue pour lister les images d'un produit spécifique ou en ajouter une nouvelle.
    Accessible via /api/products/<slug:product_slug>/images/
    """
    serializer_class = ProductImageSerializer
    
    def get_queryset(self):
        product_slug = self.kwargs['product_slug']
        product = get_object_or_404(Product, slug=product_slug)
        return ProductImage.objects.filter(product=product)

    def perform_create(self, serializer):
        product_slug = self.kwargs['product_slug']
        product = get_object_or_404(Product, slug=product_slug)
        serializer.save(product=product) 
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

class ProductImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Vue pour récupérer, mettre à jour ou supprimer une image spécifique d'un produit.
    Accessible via /api/products/<slug:product_slug>/images/<int:pk>/
    """
    serializer_class = ProductImageSerializer
    
    def get_queryset(self):
        product_slug = self.kwargs['product_slug']
        product = get_object_or_404(Product, slug=product_slug)
        return ProductImage.objects.filter(product=product)
    
    def get_serializer_context(self): # Utilise la méthode pour passer le contexte
        return get_serializer_context_with_request(self)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    # Optionnel : filtrer par catégorie, featured, etc.
    def get_queryset(self):
        queryset = Product.objects.all()
        is_featured = self.request.query_params.get('is_featured')
        category = self.request.query_params.get('category')
        
        if is_featured:
            queryset = queryset.filter(is_featured=True)
        if category:
            queryset = queryset.filter(category_id=category)
            
        return queryset

# ViewSet pour les catégories
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer