# PATH: backend/betoo/invoices/models.py

from django.db import models
from orders.models import Order
from django.conf import settings
from decimal import Decimal

class Invoice(models.Model):

    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    invoice_number = models.CharField(max_length=50, unique=True, blank=True)
    issued_at = models.DateTimeField(auto_now_add=True)
    
    # Informations fiscales obligatoires
    company_name = models.CharField(max_length=255, default="BeToo Madagascar")
    company_address = models.CharField(max_length=255, default="Antananarivo, Madagascar")
    company_nif = models.CharField(max_length=50, default="NIF0000000")
    company_stat = models.CharField(max_length=50, default="STAT0000000")
    
    # TVA paramétrable
    tva_percent = models.DecimalField(max_digits=5, decimal_places=2, default=20.0)
    
    total_ht = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_tva = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_ttc = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    def save(self, *args, **kwargs):
        if not self.invoice_number:
            self.invoice_number = f"BT-{self.order.id:06d}"
        
        self.total_ht = sum([item.price_at_purchase * item.quantity for item in self.order.items.all()])
        self.total_tva = (self.total_ht * self.tva_percent / Decimal('100')).quantize(Decimal('1.00'))
        self.total_ttc = (self.total_ht + self.total_tva).quantize(Decimal('1.00'))
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Facture {self.invoice_number} pour commande #{self.order.id}"
