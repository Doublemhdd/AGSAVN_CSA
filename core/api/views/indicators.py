from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
# from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view

from core.api.permissions import IsAdminOrReadOnly
from core.api.serializers.indicators import IndicatorSerializer, IndicatorDetailSerializer
from core.models import Indicator, ActivityLog


@extend_schema_view(
    list=extend_schema(description="List all indicators."),
    retrieve=extend_schema(description="Retrieve a specific indicator with category details."),
    create=extend_schema(description="Create a new indicator. Admin only."),
    update=extend_schema(description="Update an indicator. Admin only."),
    partial_update=extend_schema(description="Partially update an indicator. Admin only."),
    destroy=extend_schema(description="Delete an indicator. Admin only.")
)
class IndicatorViewSet(viewsets.ModelViewSet):
    """ViewSet for managing indicators."""
    
    queryset = Indicator.objects.all()
    serializer_class = IndicatorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['category', 'alert_type']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'category__name', 'created_at']
    
    def get_serializer_class(self):
        """
        Return appropriate serializer:
        - List and create actions use IndicatorSerializer
        - Retrieve action uses IndicatorDetailSerializer with category details
        """
        if self.action == 'retrieve':
            return IndicatorDetailSerializer
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new indicator and log activity."""
        indicator = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Created indicator",
            details=f"Created indicator: {indicator.name}"
        )
    
    def perform_update(self, serializer):
        """Update an indicator and log activity."""
        indicator = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Updated indicator",
            details=f"Updated indicator: {indicator.name}"
        )
    
    def perform_destroy(self, instance):
        """Delete an indicator and log activity."""
        name = instance.name
        instance.delete()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Deleted indicator",
            details=f"Deleted indicator: {name}"
        ) 