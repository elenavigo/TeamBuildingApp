import { useState } from 'react';
import { ActivityContent } from './ActivityContent';
import { ActivityBadge } from './ActivityBadge';
import type { ActivityItem } from './types';

export const ActivityCard = ({ activity }: { activity: ActivityItem }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <li
      className={`group bg-white rounded-2xl shadow-sm shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden ${
        imageLoaded && 'animate-fadeIn'
      }`}
    >
      <div className="relative h-48">
        <img
          loading="lazy"
          src={activity.image_url}
          alt={activity.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />

        {imageLoaded ? (
          <ActivityBadge category={activity.category} />
        ) : (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>

      {imageLoaded && <ActivityContent activity={activity} />}
    </li>
  );
};
