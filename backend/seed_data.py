import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from geo.models import City, Activity

def seed_data():
    cities = [
        {'name': 'Paris', 'country': 'France', 'description': 'The City of Light', 'cost_index': 1.5},
        {'name': 'London', 'country': 'UK', 'description': 'Historic and vibrant', 'cost_index': 1.6},
        {'name': 'Tokyo', 'country': 'Japan', 'description': 'A blend of tradition and tech', 'cost_index': 1.4},
        {'name': 'Bali', 'country': 'Indonesia', 'description': 'Tropical paradise', 'cost_index': 0.8},
        {'name': 'Rome', 'country': 'Italy', 'description': 'The Eternal City', 'cost_index': 1.2},
        {'name': 'Berlin', 'country': 'Germany', 'description': 'Creative and edgy', 'cost_index': 1.1},
    ]

    for c in cities:
        City.objects.get_or_create(name=c['name'], country=c['country'], defaults={'description': c['description'], 'cost_index': c['cost_index']})
        print(f"Seeded City: {c['name']}")

    activities = [
        {'name': 'Eiffel Tower Visit', 'description': 'Iconic landmark tour', 'base_cost': 50.0, 'category': 'SIGHTSEEING'},
        {'name': 'Sushi Making Class', 'description': 'Learn to roll like a pro', 'base_cost': 80.0, 'category': 'FOOD'},
        {'name': 'Surfing Lesson', 'description': 'Catch some waves', 'base_cost': 40.0, 'category': 'ADVENTURE'},
        {'name': 'Colosseum Tour', 'description': 'Step back in time', 'base_cost': 45.0, 'category': 'CULTURE'},
        {'name': 'Nightlife Clubbing', 'description': 'Experience the city at night', 'base_cost': 30.0, 'category': 'RELAX'},
    ]

    for a in activities:
        Activity.objects.get_or_create(name=a['name'], defaults={'description': a['description'], 'base_cost': a['base_cost'], 'category': a['category']})
        print(f"Seeded Activity: {a['name']}")

if __name__ == "__main__":
    seed_data()
