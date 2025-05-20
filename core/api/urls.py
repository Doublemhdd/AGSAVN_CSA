from django.urls import path, include
from rest_framework.routers import DefaultRouter

from core.api.views.auth import (
    LoginView, LogoutView, RegisterView, UserViewSet,
    ProfileViewSet, PasswordChangeView, PasswordResetView,
    PasswordResetConfirmView
)
from core.api.views.region import RegionViewSet
from core.api.views.category import CategoryViewSet
from core.api.views.indicators import IndicatorViewSet
from core.api.views.measurements import MeasurementViewSet
from core.api.views.alerts import AlertViewSet
from core.api.views.users import UserActivityViewSet
from core.api.views.system import SystemStatusViewSet
from core.api.views.stats import IndicatorStatsView, AlertStatsView, IndicatorTrendsView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'regions', RegionViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'indicators', IndicatorViewSet)
router.register(r'measurements', MeasurementViewSet)
router.register(r'alerts', AlertViewSet)
router.register(r'user/activity', UserActivityViewSet, basename='user-activity')
router.register(r'system', SystemStatusViewSet, basename='system')

urlpatterns = [
    path('', include(router.urls)),
    
    # Auth endpoints
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/password/change/', PasswordChangeView.as_view(), name='password_change'),
    path('auth/password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    # Stats endpoints
    path('stats/indicators/', IndicatorStatsView.as_view(), name='indicator_stats'),
    path('stats/alerts/', AlertStatsView.as_view(), name='alert_stats'),
    path('stats/trends/', IndicatorTrendsView.as_view(), name='indicator_trends'),
] 