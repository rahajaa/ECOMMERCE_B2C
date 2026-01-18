# X:\Projects\BeToo_Project\be_too_ecommerce\payments\serializers.py

from rest_framework import serializers
from .models import Payment # Assurez-vous que le modèle Payment est importé

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
