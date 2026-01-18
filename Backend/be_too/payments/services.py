# PATH: backend/betoo/payments/services.py

def get_payment_instructions(provider, amount):

    MERCHANTS = {
        "mvola": "0343500001",
        "orange": "0322200001",
        "airtel": "0333300001"
    }

    return {
        "send_to": MERCHANTS[provider],
        "amount": amount,
        "message": "Utiliser référence commande"
    }

def security_checks(payment):

    # 1. Montant exact
    if payment.amount != payment.order.total:
        return False, "Montant incorrect"

    # 2. TX déjà utilisé
    exists = Payment.objects.filter(
        transaction_id=payment.transaction_id,
        is_verified=True
    ).exists()

    if exists:
        return False, "Transaction déjà utilisée"

    # 3. Format TX Madagascar
    if len(payment.transaction_id) < 6:
        return False, "Format invalide"

    return True, "OK"
