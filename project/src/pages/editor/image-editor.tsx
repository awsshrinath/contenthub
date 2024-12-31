import React from 'react';
import { Button } from '@/components/ui/button';
import { Crop, Move, Type, Image as ImageIcon } from 'lucide-react';

export function ImageEditor() {
  return (
    <div className="space-y-6">
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-2" />
          <p>Drop an image or click to upload</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline">
          <Crop className="w-4 h-4 mr-2" />
          Crop
        </Button>
        <Button variant="outline">
          <Move className="w-4 h-4 mr-2" />
          Resize
        </Button>
        <Button variant="outline">
          <Type className="w-4 h-4 mr-2" />
          Add Text
        </Button>
        <Button variant="outline">
          <ImageIcon className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}