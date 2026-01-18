# PATH: backend/betoo/monitoring/services.py

from payments.models import Payment
from .models import PaymentMonitoring
from sms.gateway import send_sms

def monitor_payments():
    """
    Vérifie tous les paiements récents et détecte :
    - Montants incorrects
    - TX doublons
    - Paiements non vérifiés > 24h
    """

    import datetime
    from django.utils import timezone

    now = timezone.now()
    payments = Payment.objects.filter(is_verified=False)

    for p in payments:
        errors = []

        if p.amount != p.order.total:
            errors.append("Montant incorrect")

        if Payment.objects.filter(transaction_id=p.transaction_id, is_verified=True).exclude(id=p.id).exists():
            errors.append("Transaction déjà utilisée")

        if (now - p.created_at).total_seconds() > 86400:
            errors.append("Paiement non vérifié depuis plus de 24h")

        for e in errors:
            monitoring_entry = PaymentMonitoring.objects.create(
                payment=p,
                error_type=e,
                description=f"Commande #{p.order.id} - TX {p.transaction_id}",
            )

            # Notification SMS automatique
            send_sms("+261xxxxxxxxx", f"Alerte BeToo: {e} pour TX {p.transaction_id}")
