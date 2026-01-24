from django.contrib import admin
from .models import Category, Brand, Product, ProductVariant, ProductImage

# --- Inlines (Pour éditer tout sur la même page produit) ---

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'alt_text', 'is_main')

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    # Note : 'attributes' est un JSONField, pratique pour la dynamique !
    fields = ('sku', 'attributes', 'price_override', 'stock', 'is_active')

# --- Configurations Admin ---

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'slug', 'is_active')
    list_filter = ('is_active', 'parent')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # 'total_stock' est la @property qu'on a créée dans models.py
    list_display = ('name', 'brand', 'category', 'price', 'discount_price', 'total_stock', 'status')
    list_filter = ('status', 'brand', 'category', 'is_featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    raw_id_fields = ('category', 'brand')
    
    inlines = [ProductImageInline, ProductVariantInline]

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    # 'final_price' est la @property qui gère le prix de base ou surchargé
    list_display = ('product', 'sku', 'final_price', 'stock', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('sku', 'product__name')
    raw_id_fields = ('product',)

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image', 'is_main')
    list_filter = ('is_main',)
    raw_id_fields = ('product',)