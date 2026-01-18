# PATH: backend/betoo/accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_customer = models.BooleanField(default=True)

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="profile")
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, default="Antananarivo")
    country = models.CharField(max_length=100, default="Madagascar")

    def __str__(self):
        return f"Profil de {self.user.username}"


class CustomerAddress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="addresses")
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, default="Antananarivo")
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.full_name} - {self.city}"
