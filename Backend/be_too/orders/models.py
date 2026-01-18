# PATH: backend/betoo/orders/models.py

from django.db import models
from accounts.models import CustomUser
from products.models import ProductVariant


class Order(models.Model):
    STATUS = [
        ('pending', 'En attente'),
        ('paid', 'Payée'),
        ('shipped', 'Expédiée'),
        ('delivered', 'Livrée'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total(self):
        self.total = sum([item.get_total() for item in self.items.all()])
        self.save()

    def __str__(self):
        return f"Commande {self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def get_total(self):
        return self.quantity * self.price
