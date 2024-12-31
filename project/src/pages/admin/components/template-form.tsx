import React from 'react';
import { Button } from '@/components/ui/button';
import { TemplateMetadata } from '@/types/admin';

interface TemplateFormProps {
  metadata: TemplateMetadata;
  onChange: (metadata: TemplateMetadata) => void;
  categories: string[];
  styles: string[];
}

export function TemplateForm({ metadata, onChange, categories, styles }: TemplateFormProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Title
        </label>
        <input
          type="text"
          value={metadata.title}
          onChange={(e) => onChange({ ...metadata, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          value={metadata.description}
          onChange={(e) => onChange({ ...metadata, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Category
          </label>
          <select
            value={metadata.category}
            onChange={(e) => onChange({ ...metadata, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Style
          </label>
          <select
            value={metadata.style}
            onChange={(e) => onChange({ ...metadata, style: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
            required
          >
            <option value="">Select a style</option>
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}