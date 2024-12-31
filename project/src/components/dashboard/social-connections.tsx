import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import type { SocialConnection } from '@/types/dashboard';

const PLATFORM_ICONS = {
  Facebook,
  Twitter,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

interface SocialConnectionsProps {
  connections: SocialConnection[];
}

export function SocialConnections({ connections }: SocialConnectionsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connected Accounts</h2>
      <div className="space-y-4">
        {connections.map((connection) => {
          const Icon = PLATFORM_ICONS[connection.platform as keyof typeof PLATFORM_ICONS] || Twitter;
          
          return (
            <div
              key={connection.platform}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{connection.platform}</h3>
                  {connection.username && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">@{connection.username}</p>
                  )}
                </div>
              </div>
              <Button
                variant={connection.status === 'connected' ? 'outline' : 'primary'}
                size="sm"
              >
                {connection.status === 'connected' ? 'Connected' : 'Connect'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}