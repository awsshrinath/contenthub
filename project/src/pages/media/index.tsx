import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TokenGate } from '@/components/content/token-gate';
import { MediaInput } from './components/media-input';
import { MediaPreview } from './components/media-preview';
import { MediaHistory } from './components/media-history';
import { MediaSuggestions } from './components/media-suggestions';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { GeneratedMedia } from '@/types/media';

interface LocationState {
  initialContent?: string;
  contentType?: string;
}

export function Media() {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialContent, contentType } = (location.state as LocationState) || {};
  const [generatedMedia, setGeneratedMedia] = useState<GeneratedMedia | null>(null);
  const [activeTab, setActiveTab] = useState(() => {
    if (contentType) {
      return contentType === 'script' ? 'video' : 'image';
    }
    return 'image';
  });

  const handleMediaGenerated = (media: GeneratedMedia) => {
    setGeneratedMedia(media);
  };

  const handleNext = () => {
    if (generatedMedia) {
      navigate('/editor', { 
        state: { 
          media: generatedMedia,
          returnPath: '/media'
        }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TokenGate>
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {activeTab === 'image' ? 'AI Image Generation' : 'AI Video Creation'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {activeTab === 'image' 
              ? 'Create stunning images with AI-powered generation'
              : 'Generate professional videos with advanced AI technology'
            }
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <TabsList className="bg-white dark:bg-gray-800 p-1 shadow-lg rounded-lg">
            <TabsTrigger 
              value="image" 
              onClick={() => setActiveTab('image')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'image'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Image Generation
            </TabsTrigger>
            <TabsTrigger 
              value="video"
              onClick={() => setActiveTab('video')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'video'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Video Generation
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <MediaInput 
              type={activeTab}
              onGenerate={handleMediaGenerated}
              initialPrompt={activeTab === 'image' ? initialContent : undefined}
            />
            <MediaHistory type={activeTab} />
          </div>

          <div className="lg:sticky lg:top-8 space-y-8">
            {generatedMedia ? (
              <MediaPreview
                media={generatedMedia}
                onNext={handleNext}
              />
            ) : (
              <MediaSuggestions type={activeTab} />
            )}
          </div>
        </div>
      </TokenGate>
    </div>
  );
}