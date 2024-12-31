import React, { useState } from 'react';
import { Volume2, Music, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioTrack {
  id: string;
  type: 'voiceover' | 'background';
  startTime: number;
  endTime: number;
  volume: number;
  url: string;
}

interface AudioTimelineProps {
  tracks: AudioTrack[];
  onVolumeChange: (trackId: string, volume: number) => void;
  onAddTrack: (type: 'voiceover' | 'background', file: File) => void;
}

export function AudioTimeline({ tracks, onVolumeChange, onAddTrack }: AudioTimelineProps) {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'voiceover' | 'background') => {
    const file = event.target.files?.[0];
    if (file) {
      onAddTrack(type, file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Audio Timeline</h3>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              id="add-voiceover"
              onChange={(e) => handleFileUpload(e, 'voiceover')}
            />
            <Button size="sm" variant="outline" onClick={() => document.getElementById('add-voiceover')?.click()}>
              <Mic className="w-4 h-4 mr-2" />
              Add Voiceover
            </Button>
          </div>
          <div className="relative">
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              id="add-music"
              onChange={(e) => handleFileUpload(e, 'background')}
            />
            <Button size="sm" variant="outline" onClick={() => document.getElementById('add-music')?.click()}>
              <Music className="w-4 h-4 mr-2" />
              Add Music
            </Button>
          </div>
        </div>
      </div>

      {/* Audio tracks visualization */}
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`p-2 rounded-md ${
              selectedTrack === track.id ? 'bg-primary/10' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedTrack(track.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {track.type === 'voiceover' ? (
                  <Mic className="w-4 h-4" />
                ) : (
                  <Music className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {track.type === 'voiceover' ? 'Voiceover' : 'Background Music'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={track.volume}
                  onChange={(e) => onVolumeChange(track.id, Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}