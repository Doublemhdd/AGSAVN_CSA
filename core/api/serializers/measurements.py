from rest_framework import serializers

from core.models import Measurement, Indicator, Region


class IndicatorNestedSerializer(serializers.ModelSerializer):
    """Serializer for indicators nested in measurement responses."""
    
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Indicator
        fields = ['id', 'name', 'category_name', 'unit']


class RegionNestedSerializer(serializers.ModelSerializer):
    """Serializer for regions nested in measurement responses."""
    
    class Meta:
        model = Region
        fields = ['id', 'name', 'code']


class MeasurementSerializer(serializers.ModelSerializer):
    """Serializer for the Measurement model."""
    
    class Meta:
        model = Measurement
        fields = ['id', 'indicator', 'region', 'value', 'date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class MeasurementDetailSerializer(MeasurementSerializer):
    """Serializer for detailed Measurement responses including relationships."""
    
    indicator = IndicatorNestedSerializer(read_only=True)
    region = RegionNestedSerializer(read_only=True)
    
    class Meta(MeasurementSerializer.Meta):
        fields = MeasurementSerializer.Meta.fields 