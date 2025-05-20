from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from core.models import Category
from core.api.serializers.category import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for managing categories."""
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated] 