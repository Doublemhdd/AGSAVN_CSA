from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema

from core.api.serializers.auth import SignupSerializer, LoginSerializer, UserSerializer
from core.models import User


class SignupView(APIView):
    """View for user signup."""
    
    permission_classes = [AllowAny]
    
    @extend_schema(
        request=SignupSerializer,
        responses={201: UserSerializer},
        description="Create a new user account."
    )
    def post(self, request):
        serializer = SignupSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    'user': UserSerializer(user).data,
                    'token': serializer.data['token']
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """View for user login."""
    
    permission_classes = [AllowAny]
    
    @extend_schema(
        request=LoginSerializer,
        responses={200: UserSerializer},
        description="Log in to an existing user account."
    )
    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            user = serializer.context['user']
            # Update last login time
            user.last_login = timezone.now()
            user.save(update_fields=['last_login'])
            
            return Response(
                {
                    'user': UserSerializer(user).data,
                    'token': serializer.data['token']
                },
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """View for user logout."""
    
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        responses={204: None},
        description="Log out the current user."
    )
    def post(self, request):
        # This is a placeholder for logout functionality
        # In a real implementation, you might invalidate tokens or do other cleanup
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterView(APIView):
    """Alias for SignupView to maintain compatibility."""
    
    permission_classes = [AllowAny]
    
    @extend_schema(
        request=SignupSerializer,
        responses={201: UserSerializer},
        description="Register a new user account (alias for signup)."
    )
    def post(self, request):
        return SignupView().post(request)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for managing users."""
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class ProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for managing user profiles."""
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Limit to the current user
        return User.objects.filter(id=self.request.user.id)


class PasswordChangeView(APIView):
    """View for changing user password."""
    
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        responses={204: None},
        description="Change the current user's password."
    )
    def post(self, request):
        # Placeholder implementation
        return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordResetView(APIView):
    """View for requesting a password reset."""
    
    permission_classes = [AllowAny]
    
    @extend_schema(
        responses={204: None},
        description="Request a password reset for a user account."
    )
    def post(self, request):
        # Placeholder implementation
        return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordResetConfirmView(APIView):
    """View for confirming a password reset."""
    
    permission_classes = [AllowAny]
    
    @extend_schema(
        responses={204: None},
        description="Confirm a password reset and set a new password."
    )
    def post(self, request):
        # Placeholder implementation
        return Response(status=status.HTTP_204_NO_CONTENT) 