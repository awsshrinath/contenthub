import React from 'react';
import { DailyPostGenerator } from './components/daily-post-generator';

export function DailyPosts() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Post Generator</h1>
      <DailyPostGenerator />
    </div>
  );
}