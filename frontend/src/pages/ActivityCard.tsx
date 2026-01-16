import { useState } from 'react';
import { type Activity } from '../api/activities';
import { ActivityCardContent } from './ActivityCardContent';
import { ActivityCardBadge } from './ActivityCardBadge';

export const ActivityCard = ({ activity }: { activity: Activity }) => {
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
          <ActivityCardBadge category={activity.category} />
        ) : (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>

      {imageLoaded && <ActivityCardContent activity={activity} />}
    </li>
  );
};
