const OFFICE_COORDINATES = { lat: 41.387, lon: 2.17 };

export const getDistanceFromLatLngInKm = (lat: number, lng: number): number => {
  const R = 6371;
  const dLat = deg2rad(lat - OFFICE_COORDINATES.lat);
  const dLon = deg2rad(lng - OFFICE_COORDINATES.lon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(OFFICE_COORDINATES.lat)) *
      Math.cos(deg2rad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
