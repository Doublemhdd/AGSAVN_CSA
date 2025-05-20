from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view

from core.api.permissions import IsAdminOrReadOnly
from core.api.serializers.categories import CategorySerializer, CategoryDetailSerializer
from core.models import Category, ActivityLog


@extend_schema_view(
    list=extend_schema(description="List all categories."),
    retrieve=extend_schema(description="Retrieve a specific category with its indicators."),
    create=extend_schema(description="Create a new category. Admin only."),
    update=extend_schema(description="Update a category. Admin only."),
    partial_update=extend_schema(description="Partially update a category. Admin only."),
    destroy=extend_schema(description="Delete a category. Admin only.")
)
class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for viewing and editing categories."""
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    
    def get_serializer_class(self):
        """
        Return appropriate serializer:
        - List action uses CategorySerializer
        - Retrieve action uses CategoryDetailSerializer with indicators
        """
        if self.action == 'retrieve':
            return CategoryDetailSerializer
        return self.serializer_class
    
    def perform_create(self, serializer):
        """Create a new category and log activity."""
        category = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Created category",
            details=f"Created category: {category.name}"
        )
    
    def perform_update(self, serializer):
        """Update a category and log activity."""
        category = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Updated category",
            details=f"Updated category: {category.name}"
        )
    
    def perform_destroy(self, instance):
        """Delete a category and log activity."""
        name = instance.name
        instance.delete()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Deleted category",
            details=f"Deleted category: {name}"
        ) 