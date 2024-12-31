import React from 'react';

interface PostSchedulerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export function PostScheduler({ value, onChange }: PostSchedulerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule Post</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publication Date & Time
          </label>
          <input
            type="datetime-local"
            value={value?.toISOString().slice(0, 16) || ''}
            onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}