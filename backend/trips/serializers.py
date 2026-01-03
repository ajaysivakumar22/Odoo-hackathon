from rest_framework import serializers
from .models import Trip, TripStop, TripActivity, Expense, SharedTrip
from geo.serializers import CitySerializer, ActivitySerializer

class TripActivitySerializer(serializers.ModelSerializer):
    activity_details = ActivitySerializer(source='activity', read_only=True)

    class Meta:
        model = TripActivity
        fields = ('id', 'stop', 'activity', 'activity_details', 'date', 'time', 'notes', 'actual_cost')

class TripStopSerializer(serializers.ModelSerializer):
    city_details = CitySerializer(source='city', read_only=True)
    activities = TripActivitySerializer(many=True, read_only=True)

    class Meta:
        model = TripStop
        fields = ('id', 'trip', 'city', 'city_details', 'arrival_date', 'departure_date', 'order', 'budget_limit', 'activities')

class TripSerializer(serializers.ModelSerializer):
    stops = TripStopSerializer(many=True, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Trip
        fields = ('id', 'owner', 'title', 'description', 'start_date', 'end_date', 'cover_image', 'is_public', 'stops', 'created_at')

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class SharedTripSerializer(serializers.ModelSerializer):
    trip_details = TripSerializer(source='trip', read_only=True)

    class Meta:
        model = SharedTrip
        fields = '__all__'
