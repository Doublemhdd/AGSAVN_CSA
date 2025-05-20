import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


class Region(models.Model):
    """Region model for geographical areas."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(_('name'), max_length=255)
    code = models.CharField(_('code'), max_length=50, unique=True)
    description = models.TextField(_('description'), blank=True, null=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('region')
        verbose_name_plural = _('regions')
        ordering = ['name']
    
    def __str__(self):
        return self.name 