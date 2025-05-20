from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from core.models import (
    User, Region, Category, Indicator, 
    Measurement, Alert, AlertAction,
    ActivityLog, SystemLog
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin configuration for User model."""
    list_display = ('email', 'full_name', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('full_name',)}),
        (_('Permissions'), {'fields': ('role', 'is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2', 'role'),
        }),
    )
    search_fields = ('email', 'full_name')
    ordering = ('email',)


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    """Admin configuration for Region model."""
    list_display = ('name', 'code', 'created_at', 'updated_at')
    search_fields = ('name', 'code')
    list_filter = ('created_at',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for Category model."""
    list_display = ('name', 'code', 'created_at', 'updated_at')
    search_fields = ('name', 'code')
    list_filter = ('created_at',)


@admin.register(Indicator)
class IndicatorAdmin(admin.ModelAdmin):
    """Admin configuration for Indicator model."""
    list_display = ('name', 'category', 'unit', 'alert_threshold_low', 'alert_threshold_high')
    search_fields = ('name',)
    list_filter = ('category', 'alert_type')


@admin.register(Measurement)
class MeasurementAdmin(admin.ModelAdmin):
    """Admin configuration for Measurement model."""
    list_display = ('indicator', 'region', 'value', 'date', 'created_at')
    search_fields = ('indicator__name', 'region__name')
    list_filter = ('indicator__category', 'region', 'date')
    date_hierarchy = 'date'


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    """Admin configuration for Alert model."""
    list_display = ('get_indicator', 'get_region', 'severity', 'status', 'created_at')
    search_fields = ('measurement__indicator__name', 'measurement__region__name')
    list_filter = ('severity', 'status', 'created_at')
    date_hierarchy = 'created_at'
    
    def get_indicator(self, obj):
        return obj.measurement.indicator.name
    get_indicator.short_description = _('Indicator')
    
    def get_region(self, obj):
        return obj.measurement.region.name
    get_region.short_description = _('Region')


@admin.register(AlertAction)
class AlertActionAdmin(admin.ModelAdmin):
    """Admin configuration for AlertAction model."""
    list_display = ('alert', 'user', 'action', 'created_at')
    search_fields = ('alert__measurement__indicator__name', 'user__email')
    list_filter = ('action', 'created_at')
    date_hierarchy = 'created_at'


@admin.register(ActivityLog)
class ActivityLogAdmin(admin.ModelAdmin):
    """Admin configuration for ActivityLog model."""
    list_display = ('user', 'action', 'created_at')
    search_fields = ('user__email', 'action')
    list_filter = ('action', 'created_at')
    date_hierarchy = 'created_at'
    readonly_fields = ('user', 'action', 'details', 'created_at')


@admin.register(SystemLog)
class SystemLogAdmin(admin.ModelAdmin):
    """Admin configuration for SystemLog model."""
    list_display = ('component', 'status', 'created_at')
    search_fields = ('component',)
    list_filter = ('status', 'created_at')
    date_hierarchy = 'created_at'
    readonly_fields = ('component', 'status', 'message', 'created_at') 