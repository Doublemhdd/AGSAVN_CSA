from rest_framework import serializers

from core.models import SystemLog


class SystemLogSerializer(serializers.ModelSerializer):
    """Serializer for the SystemLog model."""
    
    class Meta:
        model = SystemLog
        fields = ['id', 'component', 'status', 'message', 'created_at']
        read_only_fields = ['id', 'created_at'] 