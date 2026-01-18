# X:\ecommerce_Projects\BeToo_Project\be_too_ecommerce\products\forms.py

from django import forms
from django.forms import BaseInlineFormSet # <-- Importez ceci
from .models import ProductVariant
import json

class ProductVariantAdminForm(forms.ModelForm):
    attributes = forms.CharField(required=False, widget=forms.Textarea)

    class Meta:
        model = ProductVariant
        fields = '__all__'

    def clean_attributes(self):
        data = self.cleaned_data['attributes']
        if data:
            try:
                # Retourne un dictionnaire python à partir du JSON
                return json.loads(data)
            except json.JSONDecodeError:
                raise forms.ValidationError("Veuillez entrer un JSON valide pour les attributs (ex: {\"taille\": \"M\"})")
        return {} # Retourne un dictionnaire vide si le champ est vide

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.attributes:
            # Assurez-vous que self.instance.attributes est bien un dictionnaire avant de le dumper
            if isinstance(self.instance.attributes, dict):
                self.initial['attributes'] = json.dumps(self.instance.attributes, indent=2)
            else:
                # Gérer le cas où 'attributes' n'est pas un dict inattendu (par ex. None), laisser vide
                self.initial['attributes'] = "{}"

# Nouvelle classe de formset pour gérer le JSONField
class BaseProductVariantFormSet(BaseInlineFormSet):
    def clean(self):
        # Cette méthode est appelée par le formset pour effectuer des validations globales.
        # Nous allons réimplémenter la logique d'unicité manuellement ici
        # pour éviter que Django ne tente de "hacher" le dictionnaire 'attributes'.

        # Garder une trace des combinaisons de 'product' et 'sku'
        # pour assurer l'unicité si votre modèle n'a pas unique_together sur ces champs.
        # Si 'sku' est déjà unique=True sur le modèle, cette vérification est redondante
        # mais ne fait pas de mal.
        seen_skus = set()
        for form in self.forms:
            if self.can_delete and self._should_delete_form(form):
                continue
            if form.errors:
                return # Si le formulaire a déjà des erreurs, on s'arrête là

            if form.cleaned_data:
                sku = form.cleaned_data.get('sku')
                # Vérifiez l'unicité du SKU PARMI LES FORMULAIRES DU FORMSET
                if sku:
                    if sku in seen_skus:
                        # Ajoutez une erreur au formulaire concerné si le SKU est en double
                        form.add_error('sku', 'Ce SKU est déjà utilisé pour une autre variante de ce produit.')
                    seen_skus.add(sku)
                
                # Pas besoin de vérifier l'unicité des attributs JSON ici,
                # car ce n'est pas censé être unique et causerait le TypeError.
        
        # Appelez la méthode clean du parent après nos vérifications personnalisées
        super().clean()