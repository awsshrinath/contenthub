import React, { useState } from 'react';
import { PromptGenerator } from './prompt-generator';
import { ContentPreview } from './content-preview';
import { MetadataForm } from './metadata-form';
import type { ContentType, TemplateMetadata } from '@/types/admin';

export function ContentGeneration() {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState<ContentType>('image');
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handlePromptGenerated = async (newPrompt: string, type: ContentType) => {
    setPrompt(newPrompt);
    setContentType(type);
    await generateContent(newPrompt, type);
  };

  const generateContent = async (promptText: string, type: ContentType) => {
    setLoading(true);
    try {
      // TODO: Integrate with DALL-E or Kling.ai API
      const url = type === 'image'
        ? `https://source.unsplash.com/random/1024x1024/?${encodeURIComponent(promptText)}`
        : 'https://example.com/sample-video.mp4';
      setMediaUrl(url);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    generateContent(prompt, contentType);
  };

  const handleSaveTemplate = async (metadata: TemplateMetadata) => {
    try {
      // TODO: Integrate with backend API
      console.log('Saving template:', {
        ...metadata,
        prompt,
        mediaUrl,
        contentType,
      });
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-gray-200">Generate Content</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <PromptGenerator onPromptGenerated={handlePromptGenerated} />
          {prompt && (
            <ContentPreview
              contentType={contentType}
              prompt={prompt}
              mediaUrl={mediaUrl}
              onRegenerate={handleRegenerate}
              onSave={() => {}}
              loading={loading}
            />
          )}
        </div>

        {mediaUrl && (
          <MetadataForm onSave={handleSaveTemplate} />
        )}
      </div>
    </div>
  );
}