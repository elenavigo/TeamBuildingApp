import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getActivities,
  type Activity,
  type FiltersType,
} from '../api/activities';

type Filters = {
  minPeople: number;
  maxPeople: number;
  categories: string[];
  distance: number;
};

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingFirstActivities, setLoadingFirstActivities] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    minPeople: 2,
    maxPeople: 40,
    categories: [],
    distance: 100,
  });

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const fetchActivities = useCallback(
    async (endpoint?: string, filters?: FiltersType, signal?: AbortSignal) => {
      try {
        setLoadingFirstActivities(true);
        const data = await getActivities(endpoint, filters, signal);
        setActivities(data.results);
        setNextPage(data.next);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFirstActivities(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (abortRef.current) abortRef.current.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      const applyFilters = async () => {
        fetchActivities(
          undefined,
          {
            min_people: filters.minPeople,
            max_people: filters.maxPeople,
            categories: filters.categories,
          },
          controller.signal
        );
      };

      applyFilters();
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchActivities, filters]);

  const loadMore = useCallback(async () => {
    if (!nextPage || loadingNextPage) return;

    setLoadingNextPage(true);

    try {
      const data = await getActivities(nextPage);

      setActivities((prev) => {
        const ids = new Set(prev.map((a) => a.id));
        const newOnes = data.results.filter((a) => !ids.has(a.id));
        return [...prev, ...newOnes];
      });

      setNextPage(data.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNextPage(false);
    }
  }, [nextPage, loadingNextPage]);

  return {
    activities,
    loadingFirstActivities,
    loadingNextPage,
    nextPage,
    loadMore,
    filters,
    setFilters,
  };
};
