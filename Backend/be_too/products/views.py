from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Brand, Product, ProductVariant, ProductImage
from .serializers import (
    CategorySerializer, 
    BrandSerializer,
    ProductSerializer, 
    ProductVariantSerializer, 
    ProductImageSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    lookup_field = 'slug'

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'brand__slug', 'is_featured', 'status']
    search_fields = ['name', 'description', 'short_description']
    ordering_fields = ['price', 'created_at']

    def get_queryset(self):
        queryset = Product.objects.select_related('category', 'brand')\
                                  .prefetch_related('images', 'variants')
        if self.request.user.is_staff:
            return queryset.all()
        return queryset.filter(status='published')

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.filter(is_active=True)
    serializer_class = ProductVariantSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product__slug']

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer