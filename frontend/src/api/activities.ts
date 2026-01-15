import axios from 'axios';

export interface Activity {
  id: number;
  title: string;
  description: string;
  image_url: string;
  min_people: number;
  max_people: number;
  category: string;
}

export type PaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Activity[];
};

export async function getActivities(page: {
  page?: number;
}): Promise<Activity[]> {
  const endpoint = page
    ? `http://127.0.0.1:8000/api/activities/?page=${page}`
    : 'http://127.0.0.1:8000/api/activities/';
  const res = await axios.get(endpoint);
  return res.data.results;
}
