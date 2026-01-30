'use client';

import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-primary text-white'
            : 'bg-card border border-border text-foreground hover:border-primary'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === category.id
              ? 'bg-primary text-white'
              : 'bg-card border border-border text-foreground hover:border-primary'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
