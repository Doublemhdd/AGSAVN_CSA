from rest_framework import serializers

from core.models import User, ActivityLog


class UserActivitySerializer(serializers.ModelSerializer):
    """Serializer for user activity."""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'activities']
        read_only_fields = ['id', 'email', 'full_name', 'activities']


class ActivityLogSerializer(serializers.ModelSerializer):
    """Serializer for activity logs."""
    
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = ActivityLog
        fields = ['id', 'user', 'user_email', 'action', 'details', 'created_at']
        read_only_fields = ['id', 'user', 'user_email', 'action', 'details', 'created_at'] 