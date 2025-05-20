import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


class Alert(models.Model):
    """Alert model for indicator threshold violations."""
    
    class Status(models.TextChoices):
        PENDING = 'PENDING', _('Pending')
        CONFIRMED = 'CONFIRMED', _('Confirmed')
        REJECTED = 'REJECTED', _('Rejected')
        RESOLVED = 'RESOLVED', _('Resolved')
    
    class Severity(models.TextChoices):
        CRITICAL = 'critical', _('Critical')
        HIGH = 'high', _('High')
        MEDIUM = 'medium', _('Medium')
        LOW = 'low', _('Low')
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    measurement = models.ForeignKey(
        'core.Measurement',
        on_delete=models.CASCADE,
        related_name='alerts',
        verbose_name=_('measurement')
    )
    severity = models.CharField(
        _('severity'),
        max_length=20,
        choices=Severity.choices,
        default=Severity.MEDIUM
    )
    status = models.CharField(
        _('status'),
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    threshold_value = models.DecimalField(
        _('threshold value'),
        max_digits=10,
        decimal_places=2
    )
    threshold_type = models.CharField(
        _('threshold type'),
        max_length=10,
        choices=[('low', _('Low')), ('high', _('High'))]
    )
    description = models.TextField(_('description'), blank=True, null=True)
    handled_by = models.ForeignKey(
        'core.User',
        on_delete=models.SET_NULL,
        related_name='handled_alerts',
        verbose_name=_('handled by'),
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('alert')
        verbose_name_plural = _('alerts')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_severity_display()} Alert - {self.measurement.indicator.name} - {self.measurement.region.name}"


class AlertAction(models.Model):
    """AlertAction model for tracking actions taken on alerts."""
    
    class Action(models.TextChoices):
        APPROVE = 'approve', _('Approve')
        REJECT = 'reject', _('Reject')
        RESOLVE = 'resolve', _('Resolve')
        COMMENT = 'comment', _('Comment')
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    alert = models.ForeignKey(
        Alert,
        on_delete=models.CASCADE,
        related_name='actions',
        verbose_name=_('alert')
    )
    user = models.ForeignKey(
        'core.User',
        on_delete=models.CASCADE,
        related_name='alert_actions',
        verbose_name=_('user')
    )
    action = models.CharField(
        _('action'),
        max_length=20,
        choices=Action.choices
    )
    comment = models.TextField(_('comment'), blank=True, null=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('alert action')
        verbose_name_plural = _('alert actions')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_action_display()} by {self.user.email} on {self.alert}"
    
    def save(self, *args, **kwargs):
        """
        Override save method to update the alert status.
        """
        super().save(*args, **kwargs)
        
        # Update the alert status based on the action
        if self.action == self.Action.APPROVE:
            self.alert.status = Alert.Status.CONFIRMED
            self.alert.handled_by = self.user
        elif self.action == self.Action.REJECT:
            self.alert.status = Alert.Status.REJECTED
            self.alert.handled_by = self.user
        elif self.action == self.Action.RESOLVE:
            self.alert.status = Alert.Status.RESOLVED
            self.alert.handled_by = self.user
        
        self.alert.save(update_fields=['status', 'handled_by']) 