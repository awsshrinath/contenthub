import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Template } from '@/types/admin';

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDelete: (templateId: string) => void;
}

export function TemplateCard({ template, onEdit, onDelete }: TemplateCardProps) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-4">
      <div className="aspect-video mb-4 rounded-lg overflow-hidden">
        {template.contentType === 'image' ? (
          <img
            src={template.fileUrl}
            alt={template.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={template.fileUrl}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{template.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{template.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {template.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {template.style}
          </span>
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(template)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(template.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}