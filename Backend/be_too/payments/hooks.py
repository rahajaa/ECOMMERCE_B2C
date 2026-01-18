# PATH: backend/betoo/payments/hooks.py

from sms.services import send_sms
from invoices.models import Invoice
from invoices.pdf_generator import generate_invoice_pdf

def notify_payment(payment):

    send_sms(
        payment.phone_number,
        f"BeToo: paiement reçu pour commande #{payment.order.id}"
    )

def post_payment_finalize(payment):

    if payment.is_verified:
        invoice, _ = Invoice.objects.get_or_create(order=payment.order)
        pdf_path = generate_invoice_pdf(invoice)
        print(f"Facture PDF générée: {pdf_path}")
