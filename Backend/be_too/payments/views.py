# X:\Projects\BeToo_Project\be_too_ecommerce\payments\views.py

from rest_framework import generics, permissions
from .models import Payment
from .serializers import PaymentSerializer

class PaymentListView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = (permissions.IsAuthenticated,) # Seuls les utilisateurs authentifiés peuvent voir/créer

    def get_queryset(self):
        # Les paiements sont liés aux commandes de l'utilisateur
        # Assurez-vous que l'utilisateur est authentifié pour filtrer
        if self.request.user.is_authenticated:
            return Payment.objects.filter(order__user=self.request.user).order_by('-created_at')
        return Payment.objects.none() # Retourne un queryset vide si non authentifié

    def perform_create(self, serializer):
        # Assurez-vous que le paiement est lié à une commande appartenant à l'utilisateur
        # Cette logique sera probablement plus complexe avec la création de commandes réelles
        # Pour l'instant, nous allons simplement sauvegarder si l'utilisateur est authentifié
        if self.request.user.is_authenticated:
            # Vous devrez probablement passer l'ID de la commande dans la requête
            # et vérifier si cette commande appartient bien à l'utilisateur.
            # Pour un exemple simple, on suppose que la commande est valide pour l'utilisateur.
            serializer.save()
        else:
            raise permissions.PermissionDenied("Vous devez être authentifié pour créer un paiement.")


class PaymentDetailView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        # Un utilisateur ne peut voir que ses propres paiements
        if self.request.user.is_authenticated:
            return Payment.objects.filter(order__user=self.request.user)
        return Payment.objects.none()
