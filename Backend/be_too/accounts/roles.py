# PATH: backend/betoo/accounts/roles.py

from django.contrib.auth.models import Group, Permission

def create_roles():

    finance, _ = Group.objects.get_or_create(name="FINANCE")

    finance.permissions.add(
        Permission.objects.get(codename="view_payment"),
        Permission.objects.get(codename="change_payment"),
    )

    logistics, _ = Group.objects.get_or_create(name="LOGISTICS")

    logistics.permissions.add(
        Permission.objects.get(codename="change_shipment"),
    )
