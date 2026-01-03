from django.db import models
from django.conf import settings
from geo.models import City, Activity

class Trip(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trips')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    cover_image = models.ImageField(upload_to='trip_covers/', blank=True, null=True)
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class TripStop(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='stops')
    city = models.ForeignKey(City, on_delete=models.PROTECT)
    arrival_date = models.DateField()
    departure_date = models.DateField()
    order = models.PositiveIntegerField()
    budget_limit = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.trip.title} - {self.city.name}"

class TripActivity(models.Model):
    stop = models.ForeignKey(TripStop, on_delete=models.CASCADE, related_name='activities')
    activity = models.ForeignKey(Activity, on_delete=models.PROTECT)
    date = models.DateField()
    time = models.TimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    actual_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.activity.name} at {self.stop.city.name}"

class Expense(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='expenses')
    category = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.category}: {self.amount}"

class SharedTrip(models.Model):
    trip = models.OneToOneField(Trip, on_delete=models.CASCADE)
    share_token = models.CharField(max_length=100, unique=True)
    view_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Shared: {self.trip.title}"
