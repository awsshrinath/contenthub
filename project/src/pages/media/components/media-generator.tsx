import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2 } from 'lucide-react';
import { generateImage, generateVideo } from '@/services/media';
import type { GeneratedMedia } from '@/types/media';

interface MediaGeneratorProps {
  type: 'image' | 'video';
  onGenerate: (media: GeneratedMedia) => void;
  initialPrompt?: string;
  editMode?: boolean;
  mediaToEdit?: GeneratedMedia;
}

export function MediaGenerator({ 
  type, 
  onGenerate, 
  initialPrompt = '',
  editMode = false,
  mediaToEdit
}: MediaGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt || mediaToEdit?.metadata?.prompt || '');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const media = type === 'image' 
        ? await generateImage({ 
            prompt, 
            resolution: mediaToEdit?.metadata?.resolution || '1024x1024', 
            style: 'modern' 
          })
        : await generateVideo({ 
            script: prompt, 
            resolution: mediaToEdit?.metadata?.resolution || '1080p',
            format: mediaToEdit?.metadata?.format || 'horizontal',
            duration: mediaToEdit?.metadata?.duration || 'medium',
            voiceover: 'professional'
          });
      onGenerate(media);
    } catch (error) {
      console.error(`Failed to generate ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {type === 'image' ? 'Image Description' : 'Video Script'}
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={type === 'image' 
            ? "Describe the image you want to generate..."
            : "Write your video script here..."
          }
          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          rows={5}
        />
      </div>

      <Button 
        onClick={handleGenerate} 
        className="w-full" 
        disabled={loading || !prompt.trim()}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4 mr-2" />
        )}
        {loading ? 'Generating...' : editMode ? 'Regenerate' : `Generate ${type}`}
      </Button>
    </div>
  );
}