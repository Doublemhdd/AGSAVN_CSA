from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, extend_schema_view

from core.api.permissions import IsAdminOrReadOnly
from core.api.serializers.regions import RegionSerializer
from core.models import Region, ActivityLog


@extend_schema_view(
    list=extend_schema(description="List all regions."),
    retrieve=extend_schema(description="Retrieve a specific region."),
    create=extend_schema(description="Create a new region. Admin only."),
    update=extend_schema(description="Update a region. Admin only."),
    partial_update=extend_schema(description="Partially update a region. Admin only."),
    destroy=extend_schema(description="Delete a region. Admin only.")
)
class RegionViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing regions."""
    
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    
    def perform_create(self, serializer):
        """Create a new region and log activity."""
        region = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Created region",
            details=f"Created region: {region.name}"
        )
    
    def perform_update(self, serializer):
        """Update a region and log activity."""
        region = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Updated region",
            details=f"Updated region: {region.name}"
        )
    
    def perform_destroy(self, instance):
        """Delete a region and log activity."""
        name = instance.name
        instance.delete()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Deleted region",
            details=f"Deleted region: {name}"
        ) 