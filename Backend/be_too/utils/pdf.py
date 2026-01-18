# PATH: backend/betoo/utils/pdf.py

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_invoice(order, path):

    doc = SimpleDocTemplate(path)
    styles = getSampleStyleSheet()

    content = []

    content.append(Paragraph(
        f"FACTURE N° {order.id}",
        styles["Heading1"]
    ))

    for item in order.items.all():

        content.append(Paragraph(
            f"{item.variant.product.name} x {item.quantity} = {item.get_total()} Ar",
            styles["Normal"]
        ))

    content.append(Paragraph(
        f"TOTAL : {order.total} Ar",
        styles["Heading2"]
    ))

    doc.build(content)
