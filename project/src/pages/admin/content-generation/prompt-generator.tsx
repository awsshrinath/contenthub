import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import type { ContentType } from '@/types/admin';

interface PromptGeneratorProps {
  onPromptGenerated: (prompt: string, contentType: ContentType) => void;
}

export function PromptGenerator({ onPromptGenerated }: PromptGeneratorProps) {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('image');

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setLoading(true);
    try {
      // TODO: Integrate with ChatGPT API
      const refinedPrompt = `Create a ${contentType === 'image' ? 'visual' : 'video'} that ${idea}`;
      onPromptGenerated(refinedPrompt, contentType);
    } catch (error) {
      console.error('Failed to generate prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-dark-card p-6 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          What would you like to create?
        </label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full rounded-md bg-dark-card-hover border-gray-600 text-gray-200 focus:border-primary focus:ring-primary"
          rows={4}
          placeholder="E.g., Generate a creative marketing idea for a fitness brand..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Content Type
          </label>
          <div className="flex gap-2">
            <Button
              variant={contentType === 'image' ? 'primary' : 'outline'}
              onClick={() => setContentType('image')}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Image
            </Button>
            <Button
              variant={contentType === 'video' ? 'primary' : 'outline'}
              onClick={() => setContentType('video')}
            >
              <Video className="w-4 h-4 mr-2" />
              Video
            </Button>
          </div>
        </div>

        <Button 
          className="self-end"
          onClick={handleGenerate} 
          disabled={!idea.trim() || loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2" />
          )}
          Generate Prompt
        </Button>
      </div>
    </div>
  );
}