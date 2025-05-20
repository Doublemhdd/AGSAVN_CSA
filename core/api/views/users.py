from rest_framework import viewsets, mixins, filters
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view

from core.api.permissions import IsOwnerOrAdmin
from core.api.serializers.users import UserActivitySerializer, ActivityLogSerializer
from core.models import User, ActivityLog


@extend_schema_view(
    list=extend_schema(description="List the current user's activity log."),
    retrieve=extend_schema(description="View a specific user's activity log (admin only).")
)
class UserActivityViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing user activity logs."""
    
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        """
        Return the queryset for the viewset.
        Regular users can only see their own activity.
        Admins can see all users.
        """
        user = self.request.user
        
        if user.is_admin:
            return ActivityLog.objects.all()
        
        # Regular users can only see their own activity
        return ActivityLog.objects.filter(user=user)
    
    def get_object(self):
        """
        Return the user for the given request.
        If the pk is 'me', return the current user.
        """
        if self.kwargs.get('pk') == 'me':
            return self.request.user
        
        return super().get_object() 