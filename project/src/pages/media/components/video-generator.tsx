import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2 } from 'lucide-react';
import { generateVideo } from '@/services/media';
import type { GeneratedMedia, VideoGeneratorOptions } from '@/types/media';

interface VideoGeneratorProps {
  onGenerate: (media: GeneratedMedia) => void;
  initialPrompt?: string;
}

export function VideoGenerator({ onGenerate, initialPrompt = '' }: VideoGeneratorProps) {
  const [script, setScript] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [generator, setGenerator] = useState<VideoGeneratorOptions>({
    type: 'kling',
    resolution: '1080p',
    format: 'horizontal',
    duration: 'medium',
    voiceover: 'professional'
  });

  const handleGenerate = async () => {
    if (!script.trim()) return;

    setLoading(true);
    try {
      const media = await generateVideo({
        script,
        generator
      });
      onGenerate(media);
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Video Script
        </label>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Write your video script here..."
          className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          rows={5}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Video Generator
          </label>
          <select
            value={generator.type}
            onChange={(e) => setGenerator({ ...generator, type: e.target.value as 'sora' | 'kling' })}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="kling">Kling.ai</option>
            <option value="sora">Sora AI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Format
          </label>
          <select
            value={generator.format}
            onChange={(e) => setGenerator({ ...generator, format: e.target.value })}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="horizontal">Horizontal (16:9)</option>
            <option value="vertical">Vertical (9:16)</option>
            <option value="square">Square (1:1)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Resolution
          </label>
          <select
            value={generator.resolution}
            onChange={(e) => setGenerator({ ...generator, resolution: e.target.value })}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="4k">4K</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Duration
          </label>
          <select
            value={generator.duration}
            onChange={(e) => setGenerator({ ...generator, duration: e.target.value })}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="short">Short (15s)</option>
            <option value="medium">Medium (30s)</option>
            <option value="long">Long (60s)</option>
          </select>
        </div>
      </div>

      <Button 
        onClick={handleGenerate} 
        className="w-full" 
        disabled={loading || !script.trim()}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4 mr-2" />
        )}
        {loading ? 'Generating...' : 'Generate Video'}
      </Button>
    </div>
  );
}