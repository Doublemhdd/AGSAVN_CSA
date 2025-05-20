import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


class SystemLog(models.Model):
    """SystemLog model for tracking system component statuses."""
    
    class Status(models.TextChoices):
        OPERATIONAL = 'operational', _('Operational')
        DEGRADED = 'degraded', _('Degraded Performance')
        DOWN = 'down', _('Down')
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    component = models.CharField(_('component'), max_length=255)
    status = models.CharField(
        _('status'),
        max_length=20,
        choices=Status.choices,
        default=Status.OPERATIONAL
    )
    message = models.TextField(_('message'), blank=True, null=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('system log')
        verbose_name_plural = _('system logs')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.component} - {self.get_status_display()} - {self.created_at}"
    
    @classmethod
    def log_status(cls, component, status, message=None):
        """
        Utility method to create system logs.
        """
        return cls.objects.create(
            component=component,
            status=status,
            message=message
        ) 