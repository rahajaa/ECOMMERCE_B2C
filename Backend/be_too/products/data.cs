# X:\Projects\BeToo_Project\be_too_ecommerce\products\management\commands\import_data.py

import csv
import json
import os
from django.core.management.base import BaseCommand, CommandError
from django.core.files.base import ContentFile
from django.conf import settings
from products.models import Category, Product, ProductVariant, ProductImage
from django.utils.text import slugify
from decimal import Decimal

class Command(BaseCommand):
    help = 'Importe les donnees des produits et categories depuis un fichier CSV.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Le chemin vers le fichier CSV a importer.')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']
        self.stdout.write(self.style.SUCCESS(f"Debut de l'importation depuis {csv_file_path}..."))

        try:
            with open(csv_file_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    # 1. Creation ou recuperation de la categorie
                    category_name = row.get('category_name')
                    if not category_name:
                        self.stdout.write(self.style.ERROR(f"Ligne ignoree: '{row.get('name', 'N/A')}' - Nom de categorie manquant."))
                        continue

                    category_obj, _ = Category.objects.get_or_create(
                        name=category_name,
                        defaults={'slug': slugify(category_name)}
                    )

                    # 2. Creation ou recuperation du produit
                    product_name = row.get('name')
                    if not product_name:
                        self.stdout.write(self.style.ERROR(f"Ligne ignoree: '{category_name}' - Nom de produit manquant."))
                        continue

                    product_slug = slugify(product_name)
                    # Tente de trouver un produit existant, si oui met a jour. Sinon, cree.
                    try:
                        product_obj = Product.objects.get(slug=product_slug)
                        created = False
                        self.stdout.write(self.style.WARNING(f"Produit '{product_name}' (slug: {product_slug}) existe deja. Mise a jour des champs..."))
                        product_obj.description = row.get('description', product_obj.description)
                        product_obj.short_description = row.get('short_description', product_obj.short_description)
                        product_obj.category = category_obj
                        product_obj.price = Decimal(row.get('price', product_obj.price))
                        product_obj.status = row.get('status', product_obj.status) # Maj du status
                        product_obj.is_featured = row.get('is_featured', 'False').lower() == 'true'
                        product_obj.save()
                    except Product.DoesNotExist:
                        product_obj = Product.objects.create(
                            name=product_name,
                            slug=product_slug,
                            description=row.get('description', ''),
                            short_description=row.get('short_description', ''),
                            category=category_obj,
                            price=Decimal(row.get('price', '0.00')),
                            status=row.get('status', 'published'),
                            is_featured=row.get('is_featured', 'False').lower() == 'true',
                        )
                        created = True
                        self.stdout.write(self.style.SUCCESS(f"Produit '{product_name}' cree."))

                    # 3. Gestion des variantes
                    attributes_str = row.get('attributes')
                    attributes = json.loads(attributes_str) if attributes_str else {}

                    stock = int(row.get('stock', 0))
                    price_override = Decimal(row.get('price_override', '0.00')) if row.get('price_override') else None
                    
                    # Si des attributs sont fournis, on cree ou met a jour une variante specifique
                    if attributes:
                        # Generer un SKU base sur le produit et les attributs pour assurer l'unicite
                        # Tri des attributs pour une generation de SKU coherente
                        attr_sorted_str = "_".join(f"{k}-{v}" for k, v in sorted(attributes.items()))
                        variant_sku = f"{product_obj.slug}-{slugify(attr_sorted_str)}"
                        
                        variant_obj, _ = ProductVariant.objects.get_or_create(
                            product=product_obj,
                            attributes=attributes,
                            defaults={
                                'sku': variant_sku,
                                'stock': stock,
                                'price_override': price_override,
                                'is_active': True
                            }
                        )
                        if not _: # Si la variante existait deja, on met a jour le stock/prix
                            variant_obj.stock = stock
                            if price_override is not None:
                                variant_obj.price_override = price_override
                            variant_obj.save()
                    else: # Si pas d'attributs, on cree une variante generique pour le produit
                        variant_sku = product_obj.slug # SKU simple pour le produit sans variante
                        variant_obj, _ = ProductVariant.objects.get_or_create(
                            product=product_obj,
                            attributes={}, # Attributs vides pour une variante simple
                            defaults={
                                'sku': variant_sku,
                                'stock': stock,
                                'price_override': None, # Prend le prix du produit parent
                                'is_active': True
                            }
                        )
                        if not _: # Si la variante existait deja, on met a jour le stock
                            variant_obj.stock = stock
                            variant_obj.save()


                    # 4. Gestion des images locales
                    image_local_path = row.get('image_local_path')
                    if image_local_path:
                        # Le chemin MEDIA_ROOT est X:\Projects\BeToo_Project\be_too_ecommerce\media
                        # Donc l'image doit etre dans X:\Projects\BeToo_Project\be_too_ecommerce\media\product_images\
                        full_image_path = os.path.join(settings.MEDIA_ROOT, 'product_images', image_local_path)
                        
                        if os.path.exists(full_image_path):
                            with open(full_image_path, 'rb') as f:
                                filename = os.path.basename(full_image_path)
                                # Pour assurer un nom unique dans le dossier media/product_images/
                                # Ceci evite les conflits si plusieurs produits ont des images avec le meme nom
                                filename_unique = f"{product_obj.slug}_{filename}" 

                                # Verifie si l'image existe deja pour ce produit pour eviter les doublons
                                # Recherche l'image par le chemin dans la base de donnees
                                if not ProductImage.objects.filter(product=product_obj, image__icontains=filename_unique).exists():
                                    product_image = ProductImage(product=product_obj, alt_text=product_name, is_main=True)
                                    # save=True telecharge le fichier et l'enregistre dans la DB
                                    product_image.image.save(filename_unique, ContentFile(f.read()), save=True)
                                    self.stdout.write(self.style.SUCCESS(f"Image '{filename_unique}' ajoutee pour '{product_name}'."))
                                else:
                                    self.stdout.write(self.style.WARNING(f"Image '{filename_unique}' existe deja pour '{product_name}'. Ignoree."))
                        else:
                            self.stdout.write(self.style.ERROR(f"Fichier image local non trouve : {full_image_path} pour produit '{product_name}'"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Pas de chemin d'image locale specifie pour '{product_name}'."))

                    self.stdout.write(self.style.SUCCESS(f"Produit '{product_name}' importe/mis a jour avec succes."))

        except FileNotFoundError:
            raise CommandError(f'Le fichier CSV "{csv_file_path}" n\'existe pas.')
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Une erreur est survenue lors de l'importation: {e}"))
            raise CommandError(f"Importation echouee: {e}")

        self.stdout.write(self.style.SUCCESS('Importation des donnees terminee.'))