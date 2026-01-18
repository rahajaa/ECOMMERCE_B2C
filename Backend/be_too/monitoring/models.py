# PATH: backend/betoo/monitoring/models.py

from django.db import models
from payments.models import Payment
from accounts.models import CustomUser

class PaymentMonitoring(models.Model):
    """
    Journal des paiements suspects ou erreurs détectées
    """
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True)
    detected_at = models.DateTimeField(auto_now_add=True)
    error_type = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    notified = models.BooleanField(default=False)
    checked_by = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ["-detected_at"]

    def __str__(self):
        return f"[{self.detected_at}] {self.error_type} - TX {self.payment.transaction_id if self.payment else 'N/A'}"
