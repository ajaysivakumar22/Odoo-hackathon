from rest_framework import viewsets, permissions, filters
from .models import Trip, TripStop, TripActivity, Expense, SharedTrip
from .serializers import (
    TripSerializer, TripStopSerializer, TripActivitySerializer, 
    ExpenseSerializer, SharedTripSerializer
)

class TripViewSet(viewsets.ModelViewSet):
    serializer_class = TripSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['start_date', 'created_at']

    def get_queryset(self):
        return Trip.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TripStopViewSet(viewsets.ModelViewSet):
    serializer_class = TripStopSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return TripStop.objects.filter(trip__owner=self.request.user)

class TripActivityViewSet(viewsets.ModelViewSet):
    serializer_class = TripActivitySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return TripActivity.objects.filter(stop__trip__owner=self.request.user)

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Expense.objects.filter(trip__owner=self.request.user)

class SharedTripViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SharedTrip.objects.all()
    serializer_class = SharedTripSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'share_token'
