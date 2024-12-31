import React from 'react';
import { Template } from '@/types/admin';

export function TemplateList() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Manage Templates</h2>
      <p className="text-gray-600 dark:text-gray-400">No templates available yet.</p>
    </div>
  );
}