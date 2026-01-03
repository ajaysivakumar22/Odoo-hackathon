from django.contrib import admin
from .models import Trip, TripStop, TripActivity, Expense, SharedTrip

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'start_date', 'end_date', 'is_public')
    list_filter = ('is_public', 'start_date')
    search_fields = ('title', 'description')

@admin.register(TripStop)
class TripStopAdmin(admin.ModelAdmin):
    list_display = ('trip', 'city', 'arrival_date', 'departure_date', 'order')

@admin.register(TripActivity)
class TripActivityAdmin(admin.ModelAdmin):
    list_display = ('stop', 'activity', 'date', 'actual_cost')

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('trip', 'category', 'amount', 'date')

admin.site.register(SharedTrip)
