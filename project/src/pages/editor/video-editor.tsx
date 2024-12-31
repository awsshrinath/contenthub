import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Scissors, 
  Type, 
  Music, 
  ArrowRightLeft 
} from 'lucide-react';

export function VideoEditor() {
  return (
    <div className="space-y-6">
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">
          <video className="w-12 h-12 mx-auto mb-2" />
          <p>Drop a video or click to upload</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="h-24 bg-gray-100 rounded-lg p-4">
        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
          <span className="text-gray-400">Timeline</span>
        </div>
      </div>

      {/* Tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline">
          <Scissors className="w-4 h-4 mr-2" />
          Trim
        </Button>
        <Button variant="outline">
          <Type className="w-4 h-4 mr-2" />
          Captions
        </Button>
        <Button variant="outline">
          <Music className="w-4 h-4 mr-2" />
          Audio
        </Button>
        <Button variant="outline">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Transitions
        </Button>
      </div>
    </div>
  );
}