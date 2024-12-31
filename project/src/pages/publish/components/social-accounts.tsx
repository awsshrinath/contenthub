import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'twitter', name: 'Twitter', icon: Twitter },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
];

interface SocialAccountsProps {
  selected: string[];
  onSelect: (platforms: string[]) => void;
}

export function SocialAccounts({ selected, onSelect }: SocialAccountsProps) {
  const togglePlatform = (platformId: string) => {
    if (selected.includes(platformId)) {
      onSelect(selected.filter(id => id !== platformId));
    } else {
      onSelect([...selected, platformId]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Media Accounts</h2>
      <div className="space-y-4">
        {PLATFORMS.map(({ id, name, icon: Icon }) => (
          <div
            key={id}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              selected.includes(id)
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => togglePlatform(id)}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium">{name}</span>
            </div>
            <div className={`px-3 py-1 rounded-md text-sm font-medium ${
              selected.includes(id)
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}>
              {selected.includes(id) ? 'Selected' : 'Select'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}