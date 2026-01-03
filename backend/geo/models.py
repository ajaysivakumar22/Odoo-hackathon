from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='cities/', blank=True, null=True)
    cost_index = models.DecimalField(max_digits=5, decimal_places=2, default=1.0) # Relative cost factor

    class Meta:
        verbose_name_plural = "Cities"
        unique_together = ('name', 'country')

    def __str__(self):
        return f"{self.name}, {self.country}"

class Activity(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    base_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    category = models.CharField(max_length=50, choices=[
        ('SIGHTSEEING', 'Sightseeing'),
        ('ADVENTURE', 'Adventure'),
        ('FOOD', 'Food & Dining'),
        ('RELAX', 'Relaxation'),
        ('CULTURE', 'Culture & History')
    ])

    class Meta:
        verbose_name_plural = "Activities"

    def __str__(self):
        return self.name
