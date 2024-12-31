import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenGate } from '@/components/content/token-gate';
import { ContentHeader } from './components/content-header';
import { ContentForm } from './components/content-form';
import { ContentPreview } from './components/content-preview';
import { TrendingSidebar } from './components/trending-sidebar';
import { ContentGrid } from './components/content-grid';
import { generateContent } from '@/services/content';
import type { ContentOptions } from '@/types/content';

export function Content() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [options, setOptions] = useState<ContentOptions>({
    type: 'post',
    tone: 'professional',
    platform: 'linkedin',
  });

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    try {
      const content = await generateContent(description, options);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToMedia = () => {
    if (!generatedContent) return;
    navigate('/media', { 
      state: { 
        initialContent: generatedContent,
        contentType: options.type 
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TokenGate>
        <ContentHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <ContentForm
              description={description}
              onDescriptionChange={setDescription}
              options={options}
              onOptionsChange={setOptions}
              onGenerate={handleGenerate}
              loading={loading}
            />

            {generatedContent && (
              <ContentPreview
                content={generatedContent}
                options={options}
                onSave={handleSaveToMedia}
                onRegenerate={handleGenerate}
              />
            )}

            {/* Sample Content Grid */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
                Content Examples & Inspiration
              </h2>
              <ContentGrid />
            </div>
          </div>

          {/* Trending Sidebar */}
          <div className="lg:col-span-4">
            <TrendingSidebar />
          </div>
        </div>
      </TokenGate>
    </div>
  );
}