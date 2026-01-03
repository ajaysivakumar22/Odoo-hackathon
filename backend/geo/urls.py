from django.urls import path
from .views import CityListView, ActivityListView

urlpatterns = [
    path('cities/', CityListView.as_view(), name='city-list'),
    path('activities/', ActivityListView.as_view(), name='activity-list'),
]
