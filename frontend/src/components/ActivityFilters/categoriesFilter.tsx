import { Command, CommandList, CommandItem } from '@/components/ui/command';

interface CategoriesFilterProps {
  categoriesFilter: string[];
  setCategoriesFilter: (value: string[]) => void;
}

const categories = [
  'adventure',
  'corporate',
  'gastronomy',
  'learning',
  'creative',
];

export const CategoriesFilters = ({
  categoriesFilter,
  setCategoriesFilter,
}: CategoriesFilterProps) => {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Categories</p>
      <Command className="border rounded-md bg-white">
        <CommandList>
          {categories.map((cat) => (
            <CommandItem
              key={cat}
              onSelect={() =>
                setCategoriesFilter(
                  categoriesFilter.includes(cat)
                    ? categoriesFilter.filter((c) => c !== cat)
                    : [...categoriesFilter, cat]
                )
              }
            >
              <span className="flex-1 capitalize">{cat}</span>
              {categoriesFilter.includes(cat) && (
                <span className="text-blue-500 font-bold">✓</span>
              )}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};
