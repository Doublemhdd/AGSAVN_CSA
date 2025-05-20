from rest_framework import serializers

from core.models import Alert, AlertAction, Measurement, User


class MeasurementNestedSerializer(serializers.ModelSerializer):
    """Serializer for measurements nested in alert responses."""
    
    indicator_name = serializers.CharField(source='indicator.name', read_only=True)
    indicator_unit = serializers.CharField(source='indicator.unit', read_only=True)
    region_name = serializers.CharField(source='region.name', read_only=True)
    
    class Meta:
        model = Measurement
        fields = ['id', 'indicator_name', 'region_name', 'value', 'date', 'indicator_unit']


class UserNestedSerializer(serializers.ModelSerializer):
    """Serializer for users nested in alert responses."""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role']


class AlertActionSerializer(serializers.ModelSerializer):
    """Serializer for the AlertAction model."""
    
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = AlertAction
        fields = ['id', 'action', 'comment', 'user', 'user_email', 'created_at']
        read_only_fields = ['id', 'created_at', 'user_email']
        extra_kwargs = {
            'user': {'write_only': True}
        }
    
    def create(self, validated_data):
        """Set the user to the current user."""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class AlertSerializer(serializers.ModelSerializer):
    """Serializer for the Alert model."""
    
    class Meta:
        model = Alert
        fields = ['id', 'measurement', 'type', 'level', 'status', 'message', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class AlertDetailSerializer(AlertSerializer):
    """Serializer for detailed Alert responses."""
    
    measurement = MeasurementNestedSerializer(read_only=True)
    handled_by = UserNestedSerializer(read_only=True)
    actions = AlertActionSerializer(many=True, read_only=True)
    
    class Meta(AlertSerializer.Meta):
        fields = AlertSerializer.Meta.fields + ['actions'] 