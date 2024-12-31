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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Accounts</h2>
      <div className="space-y-4">
        {PLATFORMS.map(({ id, name, icon: Icon }) => (
          <div
            key={id}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              selected.includes(id)
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => togglePlatform(id)}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium">{name}</span>
            </div>
            <div className={`px-3 py-1 rounded-md text-sm font-medium ${
              selected.includes(id)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {selected.includes(id) ? 'Selected' : 'Select'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}