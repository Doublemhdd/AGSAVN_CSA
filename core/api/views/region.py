from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core.models import Region
from core.api.serializers.region import RegionSerializer


class RegionViewSet(viewsets.ModelViewSet):
    """ViewSet for managing regions."""
    
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [IsAuthenticated] 