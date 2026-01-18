# PATH: backend/betoo/core/mails.py

from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_order_confirmation(order):

    send_mail(
        "Commande reçue",
        f"Votre commande #{order.id} est enregistrée",
        "contact@betoo.mg",
        [order.user.email]
    )

def send_order_email(order):

    html = render_to_string(
        "emails/order.html",
        {"order": order}
    )

    mail = EmailMultiAlternatives(
        "Confirmation commande",
        "Votre commande",
        "contact@betoo.mg",
        [order.user.email]
    )

    mail.attach_alternative(html, "text/html")
    mail.send()
