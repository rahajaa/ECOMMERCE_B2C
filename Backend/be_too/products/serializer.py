# X:\ecommerce_Projects\BeToo_Project\be_too_ecommerce\products\serializers.py

from rest_framework import serializers
from .models import Category, Product, ProductVariant, ProductImage
#from products.serializer import ProductVariantSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']
        

class ProductImageSerializer(serializers.ModelSerializer):
    # Ce champ retournera l'URL absolue de l'image
    image_url = serializers.SerializerMethodField() 

    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_main', 'image_url']
        read_only_fields = ['image_url'] # L'URL est générée, pas directement modifiable

    def get_image_url(self, obj):
        # Construit l'URL absolue en utilisant le contexte de la requête, essentiel pour les chemins complets
        if obj.image and hasattr(obj.image, 'url'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url # Fallback pour les cas sans requête (ex: shell)
        return None

class ProductVariantSerializer(serializers.ModelSerializer):
    attributes = serializers.JSONField() # Sérialisation directe de JSONField

    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'attributes', 'price_override', 'stock', 'is_active', 'get_price']
        read_only_fields = ['get_price'] # 'get_price' est une méthode ou propriété, non modifiable directement

class ProductSerializer(serializers.ModelSerializer):
    # Sérialiseurs imbriqués pour inclure les données liées
    category = CategorySerializer(read_only=True) # Détails complets de la catégorie
    # Pour la création/mise à jour, permet de définir la catégorie par son ID
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True) 
    images = ProductImageSerializer(many=True, read_only=True) # Toutes les images liées
    variants = ProductVariantSerializer(many=True, read_only=True) # Toutes les variantes liées
    
    # Champ personnalisé pour l'URL de l'image principale du produit, utilise la propriété du modèle Product
    main_image_url = serializers.SerializerMethodField() 

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_id', 'description',
            'short_description', 'price', 'is_featured', 'status',
            'created_at', 'updated_at', 'images', 'variants', 'main_image_url'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at', 'main_image_url']

    def get_main_image_url(self, obj):
        # Utilise la propriété 'main_image_url' du modèle Product
        # Construit l'URL absolue en utilisant le contexte de la requête
        request = self.context.get('request')
        # S'assure que obj.main_image_url n'est pas None ou vide et que la requête est disponible
        if obj.main_image_url and request:
            return request.build_absolute_uri(obj.main_image_url)
        return obj.main_image_url # Fallback si la requête n'est pas disponible ou l'URL est déjà absolue
