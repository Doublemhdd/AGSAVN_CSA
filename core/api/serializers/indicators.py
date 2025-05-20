from rest_framework import serializers

from core.models import Indicator, Category


class CategoryNestedSerializer(serializers.ModelSerializer):
    """Serializer for category data nested in indicator responses."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'code']


class IndicatorSerializer(serializers.ModelSerializer):
    """Serializer for the Indicator model."""
    
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Indicator
        fields = [
            'id', 'name', 'description', 'category', 'category_name', 
            'unit', 'alert_threshold_low', 'alert_threshold_high', 
            'alert_type', 'documentation_link', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class IndicatorDetailSerializer(IndicatorSerializer):
    """Serializer for detailed Indicator responses including category details."""
    
    category = CategoryNestedSerializer(read_only=True)
    
    class Meta(IndicatorSerializer.Meta):
        fields = IndicatorSerializer.Meta.fields 