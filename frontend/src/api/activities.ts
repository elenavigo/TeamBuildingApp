import axios from 'axios';

export interface Activity {
  id: number;
  title: string;
  description: string;
  image_url: string;
  min_people: number;
  max_people: number;
  category: string;
  location: { lat: number; lng: number };
}

export type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Activity[];
};

export async function getActivities(
  endpoint = 'http://127.0.0.1:8000/api/activities/'
): Promise<PaginatedResponse> {
  const res = await axios.get(endpoint);
  return res.data;
}
