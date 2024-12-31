import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2 } from 'lucide-react';
import { generateVideo } from '@/services/media';
import type { GeneratedMedia, VideoGenerationParams } from '@/types/media';

const RESOLUTION_OPTIONS = ['720p', '1080p', '4K'];
const FORMAT_OPTIONS = ['Square', 'Vertical', 'Horizontal'];
const DURATION_OPTIONS = ['Short (15s)', 'Medium (30s)', 'Long (60s)'];
const VOICEOVER_OPTIONS = ['Friendly', 'Professional', 'Energetic', 'Calm'];

interface VideoGeneratorProps {
  onGenerate: (media: GeneratedMedia) => void;
}

export function VideoGenerator({ onGenerate }: VideoGeneratorProps) {
  const [resolution, setResolution] = useState('1080p');
  const [format, setFormat] = useState('Horizontal');
  const [duration, setDuration] = useState('Medium (30s)');
  const [voiceover, setVoiceover] = useState('Professional');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!script.trim()) return;

    setLoading(true);
    try {
      const params: VideoGenerationParams = {
        script,
        resolution,
        format,
        duration,
        voiceover,
      };
      const media = await generateVideo(params);
      onGenerate(media);
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Script Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Video Script
        </label>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Enter your video script..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resolution Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution
          </label>
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

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format
          </label>
          <div className="flex gap-2">
            {FORMAT_OPTIONS.map((option) => (
              <Button
                key={option}
                variant={format === option ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFormat(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            {DURATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Voiceover Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voiceover Tone
          </label>
          <select
            value={voiceover}
            onChange={(e) => setVoiceover(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            {VOICEOVER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Generate Button */}
      <Button onClick={handleGenerate} className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Play className="w-4 h-4 mr-2" />
        )}
        {loading ? 'Generating Video...' : 'Generate Video'}
      </Button>
    </div>
  );
}