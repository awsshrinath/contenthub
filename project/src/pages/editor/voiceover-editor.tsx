import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Play, Pause, Upload } from 'lucide-react';
import { VoiceoverParams } from '@/types/editor';
import { generateVoiceover } from '@/services/editor';

interface VoiceoverEditorProps {
  onVoiceoverGenerated: (url: string) => void;
}

export function VoiceoverEditor({ onVoiceoverGenerated }: VoiceoverEditorProps) {
  const [params, setParams] = useState<VoiceoverParams>({
    text: '',
    voice: 'professional',
    language: 'en',
    speed: 1,
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!params.text.trim()) return;

    setLoading(true);
    try {
      const voiceoverUrl = await generateVoiceover(params);
      setPreviewUrl(voiceoverUrl);
      onVoiceoverGenerated(voiceoverUrl);
    } catch (error) {
      console.error('Failed to generate voiceover:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Voiceover Script
        </label>
        <textarea
          value={params.text}
          onChange={(e) => setParams({ ...params, text: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          rows={4}
          placeholder="Enter the text for voiceover..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice
          </label>
          <select
            value={params.voice}
            onChange={(e) => setParams({ ...params, voice: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="casual">Casual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speed
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={params.speed}
            onChange={(e) => setParams({ ...params, speed: parseFloat(e.target.value) })}
            className="w-full"
          />
          <div className="text-sm text-gray-500 mt-1">{params.speed}x</div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleGenerate} disabled={loading}>
          <Mic className="w-4 h-4 mr-2" />
          {loading ? 'Generating...' : 'Generate Voiceover'}
        </Button>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Upload Audio
        </Button>
      </div>

      {previewUrl && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          <audio controls className="w-full">
            <source src={previewUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}