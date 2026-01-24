from rest_framework import serializers
from .models import Category, Brand, Product, ProductVariant, ProductImage

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo', 'description']

class CategorySerializer(serializers.ModelSerializer):
    parent_name = serializers.ReadOnlyField(source='parent.name')
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'parent_name', 'is_active']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_main']

class ProductVariantSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()
    price = serializers.ReadOnlyField(source='final_price')

    class Meta:
        model = ProductVariant
        fields = ['id', 'display_name', 'sku', 'stock', 'price', 'is_active']

    def get_display_name(self, obj):
        return f"{obj.product.name} - {obj.sku}"

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    # UNE SEULE FOIS ICI
    variants = ProductVariantSerializer(many=True, read_only=True)
    stock = serializers.ReadOnlyField(source='total_stock')
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'brand', 'category', 'description',
            'short_description', 'price', 'discount_price', 'stock', 
            'is_featured', 'status', 'images', 'variants', 'main_image'
        ]

    def get_main_image(self, obj):
        image = obj.images.filter(is_main=True).first() or obj.images.first()
        if image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(image.image.url)
            return image.image.url
        return None