import math

OFFICE_COORDINATES = {"lat": 41.387, "lon": 2.17}

def get_distance_from_lat_lon_km(lat, lon):
    R = 6371
    dLat = math.radians(lat - OFFICE_COORDINATES["lat"])
    dLon = math.radians(lon - OFFICE_COORDINATES["lon"])
    lat1 = math.radians(OFFICE_COORDINATES["lat"])
    lat2 = math.radians(lat)

    a = math.sin(dLat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dLon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return round(distance, 3)
