const categoryTypeColors: Record<string, string> = {
  adventure: 'bg-green-100 text-green-800',
  corporate: 'bg-yellow-100 text-yellow-800',
  gastronomy: 'bg-purple-100 text-purple-800',
  learning: 'bg-blue-100 text-blue-800',
  creative: 'bg-pink-100 text-pink-800',
};

export const ActivityCardBadge = ({ category }: { category: string }) => {
  return (
    <span
      className={`absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full ${
        categoryTypeColors[category] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {category}
    </span>
  );
};
