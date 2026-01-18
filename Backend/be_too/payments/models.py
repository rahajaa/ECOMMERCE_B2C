# PATH: backend/betoo/payments/models.py

from django.db import models
from orders.models import Order

class MobileMoneyProvider(models.TextChoices):
    MVOLA = "mvola", "MVola"
    ORANGE = "orange", "Orange Money"
    AIRTEL = "airtel", "Airtel Money"


class Payment(models.Model):

    order = models.OneToOneField(Order, on_delete=models.CASCADE)

    provider = models.CharField(
        max_length=20,
        choices=MobileMoneyProvider.choices
    )

    phone_number = models.CharField(max_length=20)

    transaction_id = models.CharField(max_length=100)

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.provider} - {self.transaction_id}"


class PaymentAudit(models.Model):

    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)

    checked_by = models.ForeignKey(
        "accounts.CustomUser",
        on_delete=models.SET_NULL,
        null=True
    )

    check_date = models.DateTimeField(auto_now_add=True)

    source = models.CharField(max_length=50, default="admin_panel")

    notes = models.TextField(blank=True)

    is_valid = models.BooleanField(default=False)

    class Meta:
        ordering = ["-check_date"]
