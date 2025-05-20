from rest_framework import serializers

from core.models import Category


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the Category model."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'code', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at'] 