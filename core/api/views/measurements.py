from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view

from core.api.permissions import IsAdminOrReadOnly
from core.api.serializers.measurements import MeasurementSerializer, MeasurementDetailSerializer
from core.models import Measurement, ActivityLog


@extend_schema_view(
    list=extend_schema(description="List all measurements."),
    retrieve=extend_schema(description="Retrieve a specific measurement with details."),
    create=extend_schema(description="Create a new measurement. Alerts will be automatically generated if threshold values are exceeded."),
    update=extend_schema(description="Update a measurement. Admin only."),
    partial_update=extend_schema(description="Partially update a measurement. Admin only."),
    destroy=extend_schema(description="Delete a measurement. Admin only.")
)
class MeasurementViewSet(viewsets.ModelViewSet):
    """ViewSet for managing measurements."""
    
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['indicator', 'region', 'date']
    search_fields = ['indicator__name', 'region__name', 'source']
    ordering_fields = ['date', 'value', 'created_at']
    
    def get_serializer_class(self):
        """
        Return appropriate serializer:
        - List and create actions use MeasurementSerializer
        - Retrieve action uses MeasurementDetailSerializer with relationship details
        """
        if self.action == 'retrieve':
            return MeasurementDetailSerializer
        return self.serializer_class
    
    @action(detail=False, methods=['get'])
    def by_region(self, request):
        """Return measurements filtered by region."""
        region_id = request.query_params.get('region_id')
        if not region_id:
            return Response({'error': 'region_id parameter is required'}, status=400)
            
        measurements = self.get_queryset().filter(region_id=region_id)
        serializer = self.get_serializer(measurements, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_indicator(self, request):
        """Return measurements filtered by indicator."""
        indicator_id = request.query_params.get('indicator_id')
        if not indicator_id:
            return Response({'error': 'indicator_id parameter is required'}, status=400)
            
        measurements = self.get_queryset().filter(indicator_id=indicator_id)
        serializer = self.get_serializer(measurements, many=True)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        """Create a new measurement and log activity."""
        measurement = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Created measurement",
            details=f"Created measurement for {measurement.indicator.name} in {measurement.region.name}: {measurement.value} {measurement.indicator.unit}"
        )
    
    def perform_update(self, serializer):
        """Update a measurement and log activity."""
        measurement = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Updated measurement",
            details=f"Updated measurement for {measurement.indicator.name} in {measurement.region.name}"
        )
    
    def perform_destroy(self, instance):
        """Delete a measurement and log activity."""
        details = f"Deleted measurement for {instance.indicator.name} in {instance.region.name}"
        instance.delete()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Deleted measurement",
            details=details
        ) 