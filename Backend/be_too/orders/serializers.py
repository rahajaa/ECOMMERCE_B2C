# X:\ecommerce_Projects\BeToo_Project\be_too_ecommerce\orders\serializers.py

from decimal import Decimal
from rest_framework import serializers
from products.models import ProductVariant # <-- AJOUTEZ CETTE LIGNE

from .models import Order, OrderItem
#from products.serializers import ProductVariantSerializer # Si vous voulez un serializer imbriqué pour la variante

class OrderItemSerializer(serializers.ModelSerializer):
    # Si vous voulez afficher les détails de la variante, vous pouvez utiliser un serializer imbriqué
    # product_variant_details = ProductVariantSerializer(source='product_variant', read_only=True)

    product_variant = serializers.PrimaryKeyRelatedField(
        queryset=ProductVariant.objects.all(), 
        source='product_variant', 
        write_only=True # Cela signifie que vous fournissez l'ID de la variante lors de la création/mise à jour
    )
    # Champ read-only pour afficher le nom du produit et les attributs si besoin
    product_name = serializers.CharField(source='product_variant.product.name', read_only=True)
    variant_attributes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product_variant', 'product_name', 'variant_attributes', 'quantity', 'price_at_purchase']
        read_only_fields = ['order', 'price_at_purchase'] # Ces champs sont définis par le backend lors de la création

    def get_variant_attributes(self, obj):
        # Méthode pour afficher les attributs de la variante, ex: "Taille: M, Couleur: Rouge"
        if obj.product_variant and obj.product_variant.attributes:
            # Assurez-vous que display_attributes() existe sur votre modèle ProductVariant
            return obj.product_variant.display_attributes() 
        return None

    def create(self, validated_data):
        # Lors de la création d'un OrderItem, le prix doit être enregistré au moment de l'achat.
        # Le prix doit venir du ProductVariant au moment de la création de l'OrderItem.
        product_variant = validated_data.get('product_variant')
        if product_variant:
            validated_data['price_at_purchase'] = product_variant.price
        return super().create(validated_data)

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True) # Une commande a plusieurs articles
    # user = serializers.StringRelatedField(read_only=True) # Affiche le nom d'utilisateur, read-only

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'updated_at', 'status', 'total_amount', 'is_paid', 'payment_intent_id', 'shipping_address', 'items']
        read_only_fields = ['user', 'created_at', 'updated_at', 'total_amount', 'is_paid', 'payment_intent_id']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        total_amount = Decimal('0.00')

        for item_data in items_data:
            # Assurez-vous que product_variant est un objet ProductVariant
            product_variant = item_data.get('product_variant') 
            if not product_variant:
                raise serializers.ValidationError("Chaque article de commande doit spécifier une variante de produit.")

            # Récupérer le prix de la variante au moment de l'achat
            price_at_purchase = product_variant.price 

            OrderItem.objects.create(
                order=order,
                product_variant=product_variant,
                quantity=item_data['quantity'],
                price_at_purchase=price_at_purchase # Enregistrez le prix au moment de l'achat
            )
            total_amount += price_at_purchase * item_data['quantity']
        
        order.total_amount = total_amount
        order.save()
        return order
    
    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)

        instance = super().update(instance, validated_data)

        if items_data is not None:
            # C'est une logique simplifiée. Pour une mise à jour complexe des OrderItems,
            # vous devriez gérer les ajouts, modifications et suppressions.
            # Pour l'instant, on se contente de réinitialiser et recréer si de nouveaux items sont fournis.
            # OU vous pourriez interdire la modification des items après la création.
            instance.items.all().delete() # Supprime les anciens items
            total_amount = Decimal('0.00')
            for item_data in items_data:
                product_variant = item_data.get('product_variant')
                if not product_variant:
                    raise serializers.ValidationError("Chaque article de commande doit spécifier une variante de produit.")
                
                price_at_purchase = product_variant.price # Récupérer le prix actuel de la variante

                OrderItem.objects.create(
                    order=instance,
                    product_variant=product_variant,
                    quantity=item_data['quantity'],
                    price_at_purchase=price_at_purchase
                )
                total_amount += price_at_purchase * item_data['quantity']
            instance.total_amount = total_amount
            instance.save()

        return instance