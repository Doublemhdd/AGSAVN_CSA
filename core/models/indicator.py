import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    """Category model for grouping indicators."""
    
    class CategoryType(models.TextChoices):
        FOOD = 'food', _('Food Security')
        NUTRITION = 'nutrition', _('Nutrition')
        WATER = 'water', _('Water and Hygiene')
        VULNERABILITY = 'vulnerability', _('Vulnerability')
        AGRICULTURE = 'agriculture', _('Agriculture')
        LIVESTOCK = 'livestock', _('Livestock')
        MARKET = 'market', _('Market')
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_('name'), max_length=255)
    code = models.CharField(
        _('code'), 
        max_length=20, 
        choices=CategoryType.choices,
        unique=True
    )
    description = models.TextField(_('description'), blank=True, null=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Indicator(models.Model):
    """Indicator model for tracking specific metrics."""
    
    class AlertType(models.TextChoices):
        RAPID = 'RAPID', _('Rapid')
        INFORMATIVE = 'INFORMATIVE', _('Informative')
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True, null=True)
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE,
        related_name='indicators',
        verbose_name=_('category')
    )
    unit = models.CharField(_('unit'), max_length=50, blank=True, null=True)
    documentation_link = models.URLField(_('documentation link'), blank=True, null=True)
    alert_threshold_low = models.DecimalField(
        _('alert threshold low'), 
        max_digits=10, 
        decimal_places=2, 
        blank=True, 
        null=True
    )
    alert_threshold_high = models.DecimalField(
        _('alert threshold high'), 
        max_digits=10, 
        decimal_places=2, 
        blank=True, 
        null=True
    )
    alert_type = models.CharField(
        _('alert type'),
        max_length=15,
        choices=AlertType.choices,
        default=AlertType.INFORMATIVE
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('indicator')
        verbose_name_plural = _('indicators')
        ordering = ['category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.category})" 