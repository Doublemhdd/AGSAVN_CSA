from rest_framework import viewsets, mixins, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
import psutil
import platform
import django
from datetime import datetime

from core.api.permissions import IsAdmin
from core.api.serializers.system import SystemLogSerializer
from core.models import SystemLog


@extend_schema_view(
    list=extend_schema(description="List system component statuses. Admin only."),
    retrieve=extend_schema(description="Retrieve a specific system log entry. Admin only."),
    create=extend_schema(description="Create a new system log entry. Admin only."),
    update=extend_schema(description="Update a system log entry. Admin only."),
    partial_update=extend_schema(description="Partially update a system log entry. Admin only."),
    destroy=extend_schema(description="Delete a system log entry. Admin only.")
)
class SystemStatusViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing system status logs and retrieving system information.
    """
    queryset = SystemLog.objects.all()
    serializer_class = SystemLogSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['component', 'status']
    search_fields = ['component', 'message']
    ordering_fields = ['created_at', 'component']
    ordering = ['-created_at']
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def status(self, request):
        """
        Get basic system status information.
        """
        data = {
            'cpu_usage': psutil.cpu_percent(),
            'memory_usage': psutil.virtual_memory().percent,
            'disk_usage': psutil.disk_usage('/').percent,
            'uptime': self._get_uptime(),
            'timestamp': datetime.now().isoformat()
        }
        return Response(data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def info(self, request):
        """
        Get detailed system information.
        """
        data = {
            'platform': platform.system(),
            'platform_release': platform.release(),
            'platform_version': platform.version(),
            'architecture': platform.machine(),
            'processor': platform.processor(),
            'python_version': platform.python_version(),
            'django_version': django.__version__,
            'total_memory': self._format_bytes(psutil.virtual_memory().total),
            'available_memory': self._format_bytes(psutil.virtual_memory().available),
            'total_disk': self._format_bytes(psutil.disk_usage('/').total),
            'free_disk': self._format_bytes(psutil.disk_usage('/').free),
            'timestamp': datetime.now().isoformat()
        }
        return Response(data)

    def _get_uptime(self):
        """
        Get system uptime in a readable format.
        """
        uptime_seconds = int(psutil.boot_time())
        uptime = datetime.now().timestamp() - uptime_seconds
        days, remainder = divmod(uptime, 86400)
        hours, remainder = divmod(remainder, 3600)
        minutes, seconds = divmod(remainder, 60)
        
        return {
            'days': int(days),
            'hours': int(hours),
            'minutes': int(minutes),
            'seconds': int(seconds),
            'total_seconds': int(uptime)
        }
    
    def _format_bytes(self, bytes):
        """
        Format bytes into a readable format.
        """
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if bytes < 1024:
                return f"{bytes:.2f} {unit}"
            bytes /= 1024
        return f"{bytes:.2f} PB"
    
    @action(detail=False, methods=['get'])
    def components(self, request):
        """Return a list of unique system components."""
        components = SystemLog.objects.values_list('component', flat=True).distinct()
        return Response(list(components))
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Return the latest status for each component."""
        # Get the latest log for each component
        component_logs = {}
        for log in SystemLog.objects.order_by('component', '-created_at'):
            if log.component not in component_logs:
                component_logs[log.component] = log
        
        # Serialize the logs
        serializer = self.get_serializer(component_logs.values(), many=True)
        return Response(serializer.data) 