# X:\Projects\BeToo_Project\be_too_ecommerce\accounts\views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny # <--- Importez AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



class UserRegistrationView(generics.CreateAPIView):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] 
    


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "Enregistrement reussi. Vous pouvez maintenant vous connecter."
        }, status=status.HTTP_201_CREATED, headers=headers)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] # Cette ligne est correcte pour le profil

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
# accounts/views.py


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    """
    Retourne le profil de l'utilisateur connecté (JWT requis)
    """
    user = request.user
    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username,
    })
