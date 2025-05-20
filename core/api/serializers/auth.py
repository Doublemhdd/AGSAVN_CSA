from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import User, ActivityLog


class SignupSerializer(serializers.ModelSerializer):
    """Serializer for user signup."""
    
    password = serializers.CharField(write_only=True, min_length=8)
    token = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['email', 'full_name', 'password', 'role', 'token']
        extra_kwargs = {
            'role': {'required': True},
            'full_name': {'required': True}
        }
    
    def get_token(self, user):
        """Generate token for the user."""
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    
    def create(self, validated_data):
        """Create and return a user with encrypted password."""
        password = validated_data.pop('password')
        user = User.objects.create_user(
            **validated_data,
            password=password
        )
        
        # Log the activity
        ActivityLog.log_activity(
            user=user,
            action="Signed up",
            details="User account created"
        )
        
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    
    email = serializers.EmailField(max_length=255, required=True)
    password = serializers.CharField(write_only=True, required=True)
    token = serializers.SerializerMethodField()
    
    def get_token(self, attrs):
        """Generate token for the user."""
        user = self.context['user']
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    
    def validate(self, attrs):
        """Validate and authenticate the user."""
        email = attrs.get('email')
        password = attrs.get('password')
        
        user = authenticate(
            request=self.context.get('request'),
            email=email,
            password=password
        )
        
        if not user:
            raise serializers.ValidationError(
                _('Unable to log in with provided credentials.'),
                code='authorization'
            )
        
        if not user.is_active:
            raise serializers.ValidationError(
                _('User account is disabled.'),
                code='authorization'
            )
        
        # Update last login time
        user.save(update_fields=['last_login'])
        
        # Log the activity
        ActivityLog.log_activity(
            user=user,
            action="Logged in",
            details=f"User logged in from {self.context.get('request').META.get('REMOTE_ADDR', 'unknown IP')}"
        )
        
        # Store the user in the context for get_token
        self.context['user'] = user
        
        return attrs


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role', 'date_joined', 'last_login']
        read_only_fields = ['id', 'date_joined', 'last_login'] 