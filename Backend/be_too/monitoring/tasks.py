# PATH: backend/betoo/monitoring/tasks.py

from celery import shared_task
from monitoring.services import monitor_payments
from invoices.models import Invoice
from invoices.pdf_generator import generate_invoice_pdf
from orders.models import Order

@shared_task
def task_monitor_payments():
    """
    Tâche périodique pour surveiller les paiements et envoyer SMS
    """
    monitor_payments()
    return "Monitoring paiement exécuté"

@shared_task
def task_generate_invoices():
    """
    Génère automatiquement les factures PDF pour les paiements validés
    """
    paid_orders = Order.objects.filter(status="paid")
    for order in paid_orders:
        invoice, created = Invoice.objects.get_or_create(order=order)
        generate_invoice_pdf(invoice)
    return "Factures PDF générées"
