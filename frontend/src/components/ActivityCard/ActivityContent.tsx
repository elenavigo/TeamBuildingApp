import type { ActivityItem } from './types';
import Location from './../../assets/location.svg?react';
import People from './../../assets/users.svg?react';

export const ActivityContent = ({ activity }: { activity: ActivityItem }) => {
  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">{activity.title}</h2>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {activity.description}
      </p>

      <div className="mt-auto text-sm text-gray-500 flex justify-between">
        {activity.distance !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            <Location className="inline-block h-4 w-4" />
            <span>{activity.distance.toFixed(2)} km from office</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <People className="inline-block h-4 w-4" />
          <span>
            {activity.min_people}–{activity.max_people}
          </span>
        </div>
      </div>
    </div>
  );
};
