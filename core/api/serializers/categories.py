from rest_framework import serializers

from core.models import Category, Indicator


class IndicatorNestedSerializer(serializers.ModelSerializer):
    """Serializer for indicators to be nested in category responses."""
    
    class Meta:
        model = Indicator
        fields = ['id', 'name', 'unit', 'alert_threshold_low', 'alert_threshold_high']


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the Category model."""
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'code', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class CategoryDetailSerializer(CategorySerializer):
    """Serializer for detailed Category responses including indicators."""
    
    indicators = IndicatorNestedSerializer(many=True, read_only=True)
    
    class Meta(CategorySerializer.Meta):
        fields = CategorySerializer.Meta.fields + ['indicators'] 