
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface GoalCategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  goalCounts: Record<string, number>;
}

export function GoalCategories({ categories, selectedCategory, onCategorySelect, goalCounts }: GoalCategoriesProps) {
  const totalGoals = Object.values(goalCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(null)}
          className={`h-8 px-3 text-xs ${
            selectedCategory === null 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'border-gray-600 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
          <Badge variant="secondary" className="ml-2 bg-gray-700 text-gray-300">
            {totalGoals}
          </Badge>
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(category)}
            className={`h-8 px-3 text-xs ${
              selectedCategory === category 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
            <Badge variant="secondary" className="ml-2 bg-gray-700 text-gray-300">
              {goalCounts[category] || 0}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}
