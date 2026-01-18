# PATH: backend/betoo/payments/admin.py

from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = [
        "order",
        "provider",
        "transaction_id",
        "is_verified"
    ]
