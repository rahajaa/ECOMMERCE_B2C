from django.db import models
from django.utils.text import slugify
import os


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(TimeStampedModel):

    STATUS_CHOICES = [
        ('draft', 'Brouillon'),
        ('published', 'Publié'),
        ('archived', 'Archivé'),
    ]

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name="products"
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)

    description = models.TextField(blank=True, null=True)

    short_description = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    stock = models.IntegerField(default=0)

    is_featured = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )

    seo_title = models.CharField(max_length=255, blank=True, null=True)
    seo_description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProductVariant(TimeStampedModel):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants"
    )

    sku = models.CharField(max_length=100, unique=True)

    attributes = models.JSONField(default=dict)

    price_override = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    stock = models.IntegerField(default=0)

    is_active = models.BooleanField(default=True)

    @property
    def price(self):
        return self.price_override or self.product.price

    def __str__(self):
        return f"{self.product.name} - {self.sku}"


def product_image_upload_path(instance, filename):
        return f'products/{filename}'



class ProductImage(TimeStampedModel):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to=product_image_upload_path)

    alt_text = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Image de {self.product.name}"
