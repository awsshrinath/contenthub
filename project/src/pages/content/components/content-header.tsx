import React from 'react';
import { Sparkles } from 'lucide-react';

export function ContentHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Create Your Next Content Masterpiece
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-primary-500" />
        Use AI to create engaging content tailored for any platform
      </p>
    </div>
  );
}