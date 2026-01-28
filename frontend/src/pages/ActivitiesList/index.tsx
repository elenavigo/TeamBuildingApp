import { useEffect, useRef } from 'react';
import { ActivityCard } from '../../components/ActivityCard';
import { ActivityFilters } from '../../components/ActivityFilters';
import { useActivities } from '../../hooks/useActivities';

export const ActivitiesList = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    activities,
    loadingFirstActivities,
    loadingNextPage,
    loadMore,
    filters,
    setFilters,
    error,
  } = useActivities();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollTop + clientHeight >= scrollHeight - 120) {
        loadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  if (error) {
    return (
      <div className="px-5 text-center mt-10 text-gray-500">
        <div>{error} </div>
        <a
          href="https://momentsapp.onrender.com/api/activities/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Wake it up
        </a>
      </div>
    );
  }

  if (loadingFirstActivities) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Finding great moments for your team…
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-8 pb-20 h-[calc(100vh-50px)]"
    >
      <span className="text-2xl font-medium uppercase tracking-wide">
        Moments
      </span>

      <p className="text-gray-600 mt-2 mb-10 max-w-2xl">
        Great teams are built through shared moments. Discover simple, memorable
        activities for your team. Just a couple of clicks away.
      </p>

      <ActivityFilters
        minPeopleFilter={filters.minPeople}
        maxPeopleFilter={filters.maxPeople}
        categoriesFilter={filters.categories}
        distanceFilter={filters.distance}
        setMinPeopleFilter={(v) => setFilters((f) => ({ ...f, minPeople: v }))}
        setMaxPeopleFilter={(v) => setFilters((f) => ({ ...f, maxPeople: v }))}
        setCategoriesFilter={(v) =>
          setFilters((f) => ({ ...f, categories: v }))
        }
        setDistanceFilter={(v) => setFilters((f) => ({ ...f, distance: v }))}
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </ul>

      {loadingNextPage && (
        <div className="flex justify-center mt-6">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
