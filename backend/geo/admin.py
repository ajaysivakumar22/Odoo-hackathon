from django.contrib import admin
from .models import City, Activity

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'cost_index')
    search_fields = ('name', 'country')

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'base_cost')
    list_filter = ('category',)
    search_fields = ('name',)
