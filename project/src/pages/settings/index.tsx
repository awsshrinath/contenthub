import React from 'react';
import { useAuth } from '@/lib/auth';
import { APIIntegrationCard } from './api-integration-card';

const apiIntegrations = [
  {
    name: 'ChatGPT',
    description: 'Generate refined content prompts and suggestions',
    status: 'not_configured',
    icon: '🤖',
  },
  {
    name: 'DALL-E',
    description: 'Create AI-generated images from text prompts',
    status: 'not_configured',
    icon: '🎨',
  },
  {
    name: 'Sora AI',
    description: 'Generate high-quality videos with advanced AI',
    status: 'not_configured',
    icon: '🎬',
  },
  {
    name: 'Kling.ai',
    description: 'Generate videos with customizable formats',
    status: 'not_configured',
    icon: '🎥',
  },
  {
    name: 'ElevenLabs',
    description: 'Natural text-to-speech voiceovers',
    status: 'not_configured',
    icon: '🎙️',
  },
  {
    name: 'Social Media',
    description: 'Connect to Meta, Twitter, LinkedIn, YouTube',
    status: 'not_configured',
    icon: '🌐',
  },
];

export function Settings() {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = React.useState<Record<string, string>>({});

  const handleSaveApiKey = (service: string, apiKey: string) => {
    setApiKeys(prev => ({ ...prev, [service]: apiKey }));
    // Here you would typically save this to your backend
    console.log(`Saving ${service} API key:`, apiKey);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      
      {user?.isAdmin && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">API Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiIntegrations.map((integration) => (
              <APIIntegrationCard
                key={integration.name}
                {...integration}
                apiKey={apiKeys[integration.name]}
                onSave={(apiKey) => handleSaveApiKey(integration.name, apiKey)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}