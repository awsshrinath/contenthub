import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit2, Download } from 'lucide-react';
import type { GeneratedMedia } from '@/types/media';

interface PastMediaProps {
  items: GeneratedMedia[];
  onView: (media: GeneratedMedia) => void;
  onEdit: (media: GeneratedMedia) => void;
}

export function PastMedia({ items, onView, onEdit }: PastMediaProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Generations</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((media) => (
          <div key={media.id} className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            {media.type === 'image' ? (
              <img src={media.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <video src={media.url} className="w-full h-full object-cover" />
            )}
            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => onView(media)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onEdit(media)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => window.open(media.url)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}