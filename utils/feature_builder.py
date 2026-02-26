import pandas as pd
import numpy as np

SERVICE_CATEGORIES = [
    "cleaning", "plumbing", "electrical", "carpentry",
    "painting", "general_maintenance", "moving_help"
]

WEATHER_TYPES = ["Clouds", "Haze", "Rain"]

# FULL MODEL FEATURE ORDER
FEATURE_COLS = [
    'pickup_lat','pickup_lon','drop_lat','drop_lon','distance_km',
    'booking_value','skill_match_score','driver_avg_rating','customer_repeat_rate',
    'traffic_index','temp','humidity','peak_hour',
] + [f"service_category_{s}" for s in SERVICE_CATEGORIES] \
  + [f"weather_{w}" for w in WEATHER_TYPES]


def build_features(raw):
    """
    Convert a raw JSON job request into a single-row DataFrame suitable for model.predict().
    """
    
    # 1. Start with numeric values
    data = {
        'pickup_lat': raw.get('pickup_lat', 0),
        'pickup_lon': raw.get('pickup_lon', 0),
        'drop_lat': raw.get('drop_lat', 0),
        'drop_lon': raw.get('drop_lon', 0),
        'distance_km': raw.get('distance_km', 0),
        'booking_value': raw.get('booking_value', 0),
        'skill_match_score': raw.get('skill_match_score', 0),
        'driver_avg_rating': raw.get('driver_avg_rating', 0),
        'customer_repeat_rate': raw.get('customer_repeat_rate', 0),
        'traffic_index': raw.get('traffic_index', 0),
        'temp': raw.get('temp', 0),
        'humidity': raw.get('humidity', 0),
        'peak_hour': raw.get('peak_hour', 0),
    }

    # 2. One-hot encode service category
    svc = raw.get("service_category", None)
    for s in SERVICE_CATEGORIES:
        data[f"service_category_{s}"] = 1 if svc == s else 0

    # 3. One-hot encode weather
    w = raw.get("weather", None)
    for wt in WEATHER_TYPES:
        data[f"weather_{wt}"] = 1 if w == wt else 0

    # 4. Convert to DataFrame & reorder columns
    df = pd.DataFrame([data])[FEATURE_COLS]

    return df
