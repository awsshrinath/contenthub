import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, HelpCircle, Loader2 } from 'lucide-react';
import { generateImage, generateVideo } from '@/services/media';
import type { GeneratedMedia } from '@/types/media';

interface MediaInputProps {
  type: 'image' | 'video';
  onGenerate: (media: GeneratedMedia) => void;
  initialPrompt?: string;
}

export function MediaInput({ type, onGenerate, initialPrompt = '' }: MediaInputProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const media = type === 'image' 
        ? await generateImage({
            prompt,
            resolution: '1024x1024',
            style: 'modern'
          })
        : await generateVideo({
            script: prompt,
            generator: {
              type: 'sora',
              resolution: '1080p',
              format: 'horizontal',
              duration: 'medium',
              voiceover: 'professional'
            }
          });
      onGenerate(media);
    } catch (error) {
      console.error(`Failed to generate ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {type === 'image' ? 'Image Description' : 'Video Script'}
          </label>
          <button
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {showTooltip && (
          <div className="p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
            <p>Tips for better results:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Be specific and descriptive</li>
              <li>Include style preferences</li>
              <li>Mention colors and mood</li>
            </ul>
          </div>
        )}

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={type === 'image' 
            ? "Describe the image you want to generate (e.g., 'A futuristic cityscape at sunset with flying cars')"
            : "Write your video script or describe the scene you want to create"
          }
          className="w-full min-h-[120px] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          rows={5}
        />
      </div>

      <Button
        onClick={handleGenerate}
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
        disabled={loading || !prompt.trim()}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 mr-2" />
            Generate {type === 'image' ? 'Image' : 'Video'}
          </>
        )}
      </Button>
    </div>
  );
}