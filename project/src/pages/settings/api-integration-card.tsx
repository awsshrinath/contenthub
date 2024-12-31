import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-react';

interface APIIntegrationCardProps {
  name: string;
  description: string;
  status: 'configured' | 'not_configured';
  icon: string;
  apiKey?: string;
  onSave?: (apiKey: string) => void;
}

export function APIIntegrationCard({
  name,
  description,
  status,
  icon,
  apiKey = '',
  onSave,
}: APIIntegrationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newApiKey, setNewApiKey] = useState(apiKey);

  const handleSave = () => {
    onSave?.(newApiKey);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="password"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Enter API Key"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className={`text-sm ${
              status === 'configured' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {status === 'configured' ? 'Configured' : 'Not Configured'}
            </span>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Settings2 className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}