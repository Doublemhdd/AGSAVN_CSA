import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


class ActivityLog(models.Model):
    """ActivityLog model for tracking user actions."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'core.User',
        on_delete=models.CASCADE,
        related_name='activities',
        verbose_name=_('user')
    )
    action = models.CharField(_('action'), max_length=255)
    details = models.TextField(_('details'), blank=True, null=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('activity log')
        verbose_name_plural = _('activity logs')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.action} - {self.created_at}"
    
    @classmethod
    def log_activity(cls, user, action, details=None):
        """
        Utility method to create activity logs.
        """
        return cls.objects.create(
            user=user,
            action=action,
            details=details
        ) 