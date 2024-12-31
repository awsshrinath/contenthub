import React from 'react';
import { Button } from '@/components/ui/button';
import { ContentOptions as ContentOptionsType } from '@/types/content';
import { MessageSquare, Users, Share2 } from 'lucide-react';

const TONE_OPTIONS = ['Professional', 'Casual', 'Friendly', 'Formal', 'Creative'];
const PLATFORM_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn', icon: Share2 },
  { value: 'twitter', label: 'Twitter', icon: MessageSquare },
  { value: 'facebook', label: 'Facebook', icon: Users },
];

interface ContentOptionsProps {
  options: ContentOptionsType;
  onChange: (options: ContentOptionsType) => void;
}

export function ContentOptions({ options, onChange }: ContentOptionsProps) {
  return (
    <div className="space-y-6">
      {/* Platform Selection */}
      <div>
        <label className="block text-sm font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
          Platform
        </label>
        <div className="grid grid-cols-3 gap-3">
          {PLATFORM_OPTIONS.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={options.platform === value ? 'primary' : 'outline'}
              className={`flex items-center justify-center py-6 ${
                options.platform === value 
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => onChange({ ...options, platform: value })}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div>
        <label className="block text-sm font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map((tone) => (
            <Button
              key={tone}
              variant={options.tone.toLowerCase() === tone.toLowerCase() ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onChange({ ...options, tone: tone.toLowerCase() })}
              className="transition-all duration-300 hover:shadow-md"
            >
              {tone}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}