from django.utils import timezone
from django.db.models import Count, Q, F, Avg, Max, Min
from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from datetime import timedelta

from core.models import Indicator, Alert, Measurement, Region, Category
from core.api.permissions import IsAdmin


class IndicatorStatsView(views.APIView):
    """View for retrieving indicator statistics."""
    
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        description="Get indicator statistics",
        parameters=[
            OpenApiParameter(name="region_id", location="query", required=False, type=int),
            OpenApiParameter(name="category_id", location="query", required=False, type=int),
            OpenApiParameter(name="days", location="query", required=False, type=int, default=30),
        ],
    )
    def get(self, request):
        region_id = request.query_params.get('region_id')
        category_id = request.query_params.get('category_id')
        days = int(request.query_params.get('days', 30))
        
        # Base queryset
        queryset = Indicator.objects.all()
        
        # Apply filters
        if region_id:
            queryset = queryset.filter(region_id=region_id)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        # Total count of indicators
        total_indicators = queryset.count()
        
        # Count by status
        status_counts = queryset.values('status').annotate(count=Count('status'))
        status_data = {item['status']: item['count'] for item in status_counts}
        
        # Count by category
        category_counts = queryset.values('category__name').annotate(count=Count('category'))
        category_data = {item['category__name']: item['count'] for item in category_counts if item['category__name']}
        
        # Count by region
        region_counts = queryset.values('region__name').annotate(count=Count('region'))
        region_data = {item['region__name']: item['count'] for item in region_counts if item['region__name']}
        
        return Response({
            'total_indicators': total_indicators,
            'by_status': status_data,
            'by_category': category_data,
            'by_region': region_data,
        })


class AlertStatsView(views.APIView):
    """View for retrieving alert statistics."""
    
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        description="Get alert statistics",
        parameters=[
            OpenApiParameter(name="region_id", location="query", required=False, type=int),
            OpenApiParameter(name="category_id", location="query", required=False, type=int),
            OpenApiParameter(name="days", location="query", required=False, type=int, default=30),
        ],
    )
    def get(self, request):
        region_id = request.query_params.get('region_id')
        category_id = request.query_params.get('category_id')
        days = int(request.query_params.get('days', 30))
        
        # Time frame
        start_date = timezone.now() - timedelta(days=days)
        
        # Base queryset
        queryset = Alert.objects.filter(created_at__gte=start_date)
        
        # Apply filters
        if region_id:
            queryset = queryset.filter(measurement__indicator__region_id=region_id)
        if category_id:
            queryset = queryset.filter(measurement__indicator__category_id=category_id)
        
        # Total count of alerts
        total_alerts = queryset.count()
        
        # Count by status
        status_counts = queryset.values('status').annotate(count=Count('status'))
        status_data = {item['status']: item['count'] for item in status_counts}
        
        # Count by priority
        priority_counts = queryset.values('priority').annotate(count=Count('priority'))
        priority_data = {item['priority']: item['count'] for item in priority_counts}
        
        # Count by category
        category_counts = queryset.values('measurement__indicator__category__name').annotate(count=Count('measurement__indicator__category'))
        category_data = {item['measurement__indicator__category__name']: item['count'] for item in category_counts if item['measurement__indicator__category__name']}
        
        # Count by region
        region_counts = queryset.values('measurement__indicator__region__name').annotate(count=Count('measurement__indicator__region'))
        region_data = {item['measurement__indicator__region__name']: item['count'] for item in region_counts if item['measurement__indicator__region__name']}
        
        return Response({
            'total_alerts': total_alerts,
            'by_status': status_data,
            'by_priority': priority_data,
            'by_category': category_data,
            'by_region': region_data,
        })


class IndicatorTrendsView(views.APIView):
    """View for retrieving indicator measurement trends."""
    
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        description="Get indicator measurement trends",
        parameters=[
            OpenApiParameter(name="indicator_id", location="query", required=False, type=int),
            OpenApiParameter(name="region_id", location="query", required=False, type=int),
            OpenApiParameter(name="category_id", location="query", required=False, type=int),
            OpenApiParameter(name="days", location="query", required=False, type=int, default=30),
        ],
    )
    def get(self, request):
        indicator_id = request.query_params.get('indicator_id')
        region_id = request.query_params.get('region_id')
        category_id = request.query_params.get('category_id')
        days = int(request.query_params.get('days', 30))
        
        # Time frame
        start_date = timezone.now() - timedelta(days=days)
        
        # Base queryset
        queryset = Measurement.objects.filter(timestamp__gte=start_date)
        
        # Apply filters
        if indicator_id:
            queryset = queryset.filter(indicator_id=indicator_id)
        if region_id:
            queryset = queryset.filter(indicator__region_id=region_id)
        if category_id:
            queryset = queryset.filter(indicator__category_id=category_id)
        
        # Group by indicator and get stats
        indicator_stats = []
        
        if indicator_id:
            # Detailed stats for a single indicator
            measurements = queryset.order_by('timestamp')
            indicator_data = {
                'indicator_id': indicator_id,
                'indicator_name': measurements.first().indicator.name if measurements.exists() else None,
                'measurements': [
                    {
                        'timestamp': m.timestamp,
                        'value': m.value,
                        'unit': m.indicator.unit
                    } for m in measurements
                ]
            }
            indicator_stats.append(indicator_data)
        else:
            # Summary stats for multiple indicators
            indicators = Indicator.objects.filter(
                id__in=queryset.values_list('indicator_id', flat=True).distinct()
            )
            
            for indicator in indicators:
                ind_measurements = queryset.filter(indicator=indicator)
                if ind_measurements.exists():
                    indicator_data = {
                        'indicator_id': indicator.id,
                        'indicator_name': indicator.name,
                        'region': indicator.region.name if indicator.region else None,
                        'category': indicator.category.name if indicator.category else None,
                        'unit': indicator.unit,
                        'stats': {
                            'avg': ind_measurements.aggregate(avg=Avg('value'))['avg'],
                            'max': ind_measurements.aggregate(max=Max('value'))['max'],
                            'min': ind_measurements.aggregate(min=Min('value'))['min'],
                            'count': ind_measurements.count(),
                            'latest': ind_measurements.order_by('-timestamp').first().value
                        }
                    }
                    indicator_stats.append(indicator_data)
        
        return Response({
            'trends': indicator_stats,
            'time_range': {
                'start': start_date,
                'end': timezone.now(),
                'days': days
            }
        }) 