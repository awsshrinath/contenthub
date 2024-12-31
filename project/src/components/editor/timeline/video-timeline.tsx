import React, { useState } from 'react';
import { Scissors, Trash2, Replace, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoSegment {
  id: string;
  startTime: number;
  endTime: number;
  url: string;
}

interface VideoTimelineProps {
  segments: VideoSegment[];
  onTrim: (segmentId: string, startTime: number, endTime: number) => void;
  onDelete: (segmentId: string) => void;
  onReplace: (segmentId: string, newVideo: File) => void;
}

export function VideoTimeline({ segments, onTrim, onDelete, onReplace }: VideoTimelineProps) {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(0);

  const handleTrim = () => {
    if (selectedSegment) {
      onTrim(selectedSegment, trimStart, trimEnd);
    }
  };

  const handleReplace = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedSegment) {
      onReplace(selectedSegment, file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Video Timeline</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleTrim}>
            <Scissors className="w-4 h-4 mr-2" />
            Trim
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => selectedSegment && onDelete(selectedSegment)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <div className="relative">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              id="replace-video"
              onChange={handleReplace}
            />
            <Button size="sm" variant="outline" onClick={() => document.getElementById('replace-video')?.click()}>
              <Replace className="w-4 h-4 mr-2" />
              Replace
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="h-24 bg-gray-100 rounded-lg p-4">
        <div className="relative h-full">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className={`absolute h-full rounded-md cursor-pointer transition-all ${
                selectedSegment === segment.id ? 'bg-primary/20 border-2 border-primary' : 'bg-gray-200'
              }`}
              style={{
                left: `${(segment.startTime / 100) * 100}%`,
                width: `${((segment.endTime - segment.startTime) / 100) * 100}%`,
              }}
              onClick={() => setSelectedSegment(segment.id)}
            />
          ))}
        </div>
      </div>

      {/* Trim controls */}
      {selectedSegment && (
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="number"
              value={trimStart}
              onChange={(e) => setTrimStart(Number(e.target.value))}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="number"
              value={trimEnd}
              onChange={(e) => setTrimEnd(Number(e.target.value))}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}