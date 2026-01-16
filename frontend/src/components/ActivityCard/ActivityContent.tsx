import type { ActivityItem } from './types';

export const ActivityContent = ({ activity }: { activity: ActivityItem }) => {
  return (
    <div className="p-6 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">{activity.title}</h2>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {activity.description}
      </p>

      <div className="mt-2 text-sm text-gray-500">
        {activity.distance !== undefined ? (
          <span>{activity.distance.toFixed(2)} km from office</span>
        ) : (
          <span>Distance not available</span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Ideal for {activity.min_people}–{activity.max_people} people
        </span>

        <span className="font-medium group-hover:underline">
          View details →
        </span>
      </div>
    </div>
  );
};
