from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
# from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view

from core.api.permissions import IsAdminOrReadOnly
from core.api.serializers.alerts import AlertSerializer, AlertDetailSerializer, AlertActionSerializer
from core.models import Alert, AlertAction, ActivityLog


@extend_schema_view(
    list=extend_schema(description="List all alerts."),
    retrieve=extend_schema(description="Retrieve a specific alert with details."),
    update=extend_schema(description="Update an alert status."),
    partial_update=extend_schema(description="Partially update an alert status.")
)
class AlertViewSet(viewsets.ModelViewSet):
    """ViewSet for managing alerts."""
    
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'put', 'patch', 'head', 'options']  # No POST or DELETE
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['severity', 'status', 'measurement__indicator', 'measurement__region']
    search_fields = ['measurement__indicator__name', 'measurement__region__name', 'description']
    ordering_fields = ['created_at', 'updated_at', 'severity']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """
        Return appropriate serializer:
        - List action uses AlertSerializer
        - Retrieve action uses AlertDetailSerializer with relationship details
        """
        if self.action == 'retrieve':
            return AlertDetailSerializer
        return self.serializer_class
    
    def get_permissions(self):
        """
        Ensure that only admins can update alerts.
        """
        if self.action in ['update', 'partial_update']:
            return [IsAuthenticated(), IsAdminOrReadOnly()]
        return super().get_permissions()
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve an alert."""
        alert = self.get_object()
        
        # Check if already approved
        if alert.status != Alert.Status.PENDING:
            return Response(
                {'error': f'Alert is already {alert.get_status_display().lower()}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create alert action
        serializer = AlertActionSerializer(
            data={
                'alert': alert.id,
                'action': AlertAction.Action.APPROVE,
                'comment': request.data.get('comment', '')
            },
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            
            # The alert status is automatically updated by the AlertAction save method
            return Response(AlertDetailSerializer(alert).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Reject an alert."""
        alert = self.get_object()
        
        # Check if already approved/rejected
        if alert.status != Alert.Status.PENDING:
            return Response(
                {'error': f'Alert is already {alert.get_status_display().lower()}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create alert action
        serializer = AlertActionSerializer(
            data={
                'alert': alert.id,
                'action': AlertAction.Action.REJECT,
                'comment': request.data.get('comment', '')
            },
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            
            # The alert status is automatically updated by the AlertAction save method
            return Response(AlertDetailSerializer(alert).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        """Resolve an alert."""
        alert = self.get_object()
        
        # Check if already resolved
        if alert.status == Alert.Status.RESOLVED:
            return Response(
                {'error': 'Alert is already resolved'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create alert action
        serializer = AlertActionSerializer(
            data={
                'alert': alert.id,
                'action': AlertAction.Action.RESOLVE,
                'comment': request.data.get('comment', '')
            },
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            
            # The alert status is automatically updated by the AlertAction save method
            return Response(AlertDetailSerializer(alert).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        """Add a comment to an alert."""
        alert = self.get_object()
        
        # Create alert action
        serializer = AlertActionSerializer(
            data={
                'alert': alert.id,
                'action': AlertAction.Action.COMMENT,
                'comment': request.data.get('comment', '')
            },
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(AlertDetailSerializer(alert).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def perform_update(self, serializer):
        """Update an alert and log activity."""
        alert = serializer.save()
        ActivityLog.log_activity(
            user=self.request.user,
            action="Updated alert",
            details=f"Updated alert for {alert.measurement.indicator.name} in {alert.measurement.region.name}"
        ) 