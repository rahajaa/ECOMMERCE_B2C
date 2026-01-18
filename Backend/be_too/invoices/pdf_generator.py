# PATH: backend/betoo/invoices/pdf_generator.py

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from django.template.loader import render_to_string
import tempfile

def generate_invoice_pdf(invoice):
    """Génère un PDF depuis le modèle Invoice et renvoie le chemin temporaire"""
    
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    doc = SimpleDocTemplate(temp_file.name, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []

    # Header
    story.append(Paragraph(f"{invoice.company_name}", styles["Title"]))
    story.append(Paragraph(f"{invoice.company_address}", styles["Normal"]))
    story.append(Paragraph(f"NIF: {invoice.company_nif} | STAT: {invoice.company_stat}", styles["Normal"]))
    story.append(Spacer(1, 12))

    story.append(Paragraph(f"Facture: {invoice.invoice_number}", styles["Heading2"]))
    story.append(Paragraph(f"Commande #: {invoice.order.id}", styles["Normal"]))
    story.append(Paragraph(f"Client: {invoice.order.user.username if invoice.order.user else 'Invité'}", styles["Normal"]))
    story.append(Paragraph(f"Date: {invoice.issued_at}", styles["Normal"]))
    story.append(Spacer(1, 12))

    # Table
    data = [["Produit", "Qté", "Prix Unitaire", "Total HT"]]
    for item in invoice.order.items.all():
        total_ht = item.price_at_purchase * item.quantity
        data.append([item.product_variant.product.name, item.quantity, f"{item.price_at_purchase:.2f}", f"{total_ht:.2f}"])
    table = Table(data, hAlign="LEFT")
    table.setStyle([
        ('GRID', (0,0), (-1,-1), 1, colors.black),
        ('BACKGROUND', (0,0), (-1,0), colors.lightgrey)
    ])
    story.append(table)
    story.append(Spacer(1,12))

    # Totaux
    story.append(Paragraph(f"Total HT: {invoice.total_ht:.2f} Ar", styles["Normal"]))
    story.append(Paragraph(f"TVA ({invoice.tva_percent}%): {invoice.total_tva:.2f} Ar", styles["Normal"]))
    story.append(Paragraph(f"Total TTC: {invoice.total_ttc:.2f} Ar", styles["Heading2"]))
    story.append(Spacer(1,12))
    story.append(Paragraph("Merci pour votre confiance – BeToo Madagascar", styles["Normal"]))

    doc.build(story)
    return temp_file.name
