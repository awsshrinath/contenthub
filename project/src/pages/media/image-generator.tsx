import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { generateImage } from '@/services/media';
import type { GeneratedMedia, ImageGenerationParams } from '@/types/media';

const STYLE_OPTIONS = ['Realistic', 'Abstract', 'Artistic', 'Minimalist'];
const RESOLUTION_OPTIONS = ['1024x1024', '1024x1792', '1792x1024'];

interface ImageGeneratorProps {
  onGenerate: (media: GeneratedMedia) => void;
}

export function ImageGenerator({ onGenerate }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [resolution, setResolution] = useState('1024x1024');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const params: ImageGenerationParams = {
        prompt,
        style,
        resolution,
      };
      const media = await generateImage(params);
      onGenerate(media);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Description
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          rows={3}
        />
      </div>

      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((option) => (
            <Button
              key={option}
              variant={style === option ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStyle(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Resolution Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
        <select
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          {RESOLUTION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <Button onClick={handleGenerate} className="w-full" disabled={loading}>
        <Wand2 className="w-4 h-4 mr-2" />
        {loading ? 'Generating...' : 'Generate Image'}
      </Button>
    </div>
  );
}