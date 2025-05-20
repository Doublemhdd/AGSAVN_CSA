import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


class Measurement(models.Model):
    """Measurement model for recording indicator values in regions."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    indicator = models.ForeignKey(
        'core.Indicator',
        on_delete=models.CASCADE,
        related_name='measurements',
        verbose_name=_('indicator')
    )
    region = models.ForeignKey(
        'core.Region',
        on_delete=models.CASCADE,
        related_name='measurements',
        verbose_name=_('region')
    )
    value = models.DecimalField(_('value'), max_digits=10, decimal_places=2)
    source = models.CharField(_('source'), max_length=255, blank=True, null=True)
    date = models.DateField(_('date'))
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('measurement')
        verbose_name_plural = _('measurements')
        ordering = ['-date', 'indicator']
        # Ensure we only have one measurement per indicator, region, and date
        constraints = [
            models.UniqueConstraint(
                fields=['indicator', 'region', 'date'],
                name='unique_measurement'
            )
        ]
    
    def __str__(self):
        return f"{self.indicator} - {self.region} - {self.date}"
    
    def save(self, *args, **kwargs):
        """
        Override save method to check thresholds and create alerts if needed.
        """
        is_new = not self.pk
        super().save(*args, **kwargs)
        
        # Only check thresholds for new measurements
        if is_new:
            self.check_thresholds()
    
    def check_thresholds(self):
        """
        Check if the measurement value exceeds any thresholds and create an alert if needed.
        """
        from core.models.alert import Alert
        
        # Check if indicator has thresholds
        indicator = self.indicator
        
        # Check low threshold
        if indicator.alert_threshold_low is not None and self.value < indicator.alert_threshold_low:
            Alert.objects.create(
                measurement=self,
                severity=Alert.Severity.CRITICAL if indicator.alert_type == indicator.AlertType.RAPID else Alert.Severity.HIGH,
                threshold_value=indicator.alert_threshold_low,
                threshold_type='low'
            )
        
        # Check high threshold
        elif indicator.alert_threshold_high is not None and self.value > indicator.alert_threshold_high:
            Alert.objects.create(
                measurement=self,
                severity=Alert.Severity.CRITICAL if indicator.alert_type == indicator.AlertType.RAPID else Alert.Severity.HIGH,
                threshold_value=indicator.alert_threshold_high,
                threshold_type='high'
            ) 