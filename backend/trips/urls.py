from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TripViewSet, TripStopViewSet, TripActivityViewSet, 
    ExpenseViewSet, SharedTripViewSet
)

router = DefaultRouter()
router.register(r'trips', TripViewSet, basename='trip')
router.register(r'stops', TripStopViewSet, basename='stop')
router.register(r'activities', TripActivityViewSet, basename='activity')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'share', SharedTripViewSet, basename='share')

urlpatterns = [
    path('', include(router.urls)),
]
