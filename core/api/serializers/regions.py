from rest_framework import serializers

from core.models import Region


class RegionSerializer(serializers.ModelSerializer):
    """Serializer for the Region model."""
    
    class Meta:
        model = Region
        fields = ['id', 'name', 'code', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at'] 