import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { TemplateMetadata } from '@/types/admin';

interface MetadataFormProps {
  onSave: (metadata: TemplateMetadata) => void;
}

export function MetadataForm({ onSave }: MetadataFormProps) {
  const [metadata, setMetadata] = useState<TemplateMetadata>({
    title: '',
    description: '',
    category: '',
    style: '',
    contentType: 'image',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(metadata);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-dark-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-200">Template Details</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Title
          </label>
          <input
            type="text"
            value={metadata.title}
            onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
            className="w-full rounded-md bg-dark-card-hover border-gray-600 text-gray-200 focus:border-primary focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            value={metadata.description}
            onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
            className="w-full rounded-md bg-dark-card-hover border-gray-600 text-gray-200 focus:border-primary focus:ring-primary"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Category
            </label>
            <select
              value={metadata.category}
              onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
              className="w-full rounded-md bg-dark-card-hover border-gray-600 text-gray-200 focus:border-primary focus:ring-primary"
              required
            >
              <option value="">Select category</option>
              <option value="marketing">Marketing</option>
              <option value="social-media">Social Media</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Style
            </label>
            <select
              value={metadata.style}
              onChange={(e) => setMetadata({ ...metadata, style: e.target.value })}
              className="w-full rounded-md bg-dark-card-hover border-gray-600 text-gray-200 focus:border-primary focus:ring-primary"
              required
            >
              <option value="">Select style</option>
              <option value="minimalist">Minimalist</option>
              <option value="vibrant">Vibrant</option>
              <option value="professional">Professional</option>
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save Template
        </Button>
      </div>
    </form>
  );
}