# PATH: backend/betoo/cart/models.py

from django.db import models
from accounts.models import CustomUser
from products.models import ProductVariant


class Cart(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=40, null=True, blank=True, db_index=True) # AJOUTER CECI
    updated_at = models.DateTimeField(auto_now=True)

    def total(self):
        return sum([i.get_total() for i in self.items.all()])

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def get_total(self):
        return self.quantity * self.variant.price
