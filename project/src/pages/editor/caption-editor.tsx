import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Upload, Edit2 } from 'lucide-react';
import { Caption, CaptionStyle } from '@/types/editor';
import { generateCaptions } from '@/services/editor';

interface CaptionEditorProps {
  mediaUrl: string;
  onCaptionsGenerated: (captions: Caption[]) => void;
  onStyleChange: (style: CaptionStyle) => void;
}

export function CaptionEditor({ mediaUrl, onCaptionsGenerated, onStyleChange }: CaptionEditorProps) {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState<CaptionStyle>({
    fontSize: '16px',
    color: '#FFFFFF',
    position: 'bottom',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  });

  const handleGenerateCaptions = async () => {
    setLoading(true);
    try {
      const generated = await generateCaptions(mediaUrl);
      setCaptions(generated);
      onCaptionsGenerated(generated);
    } catch (error) {
      console.error('Failed to generate captions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStyleChange = (updates: Partial<CaptionStyle>) => {
    const newStyle = { ...style, ...updates };
    setStyle(newStyle);
    onStyleChange(newStyle);
  };

  const handleCaptionEdit = (id: string, text: string) => {
    const updated = captions.map(cap => 
      cap.id === id ? { ...cap, text } : cap
    );
    setCaptions(updated);
    onCaptionsGenerated(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button onClick={handleGenerateCaptions} disabled={loading}>
          <Wand2 className="w-4 h-4 mr-2" />
          {loading ? 'Generating...' : 'Generate Captions'}
        </Button>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Upload SRT/VTT
        </Button>
      </div>

      {/* Caption Style Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <select
            value={style.position}
            onChange={(e) => handleStyleChange({ position: e.target.value as 'bottom' | 'top' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="bottom">Bottom</option>
            <option value="top">Top</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={style.fontSize}
            onChange={(e) => handleStyleChange({ fontSize: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="14px">Small</option>
            <option value="16px">Medium</option>
            <option value="18px">Large</option>
          </select>
        </div>
      </div>

      {/* Caption List */}
      <div className="space-y-4">
        {captions.map((caption) => (
          <div key={caption.id} className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">
                {caption.startTime}s - {caption.endTime}s
              </div>
              <textarea
                value={caption.text}
                onChange={(e) => handleCaptionEdit(caption.id, e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                rows={2}
              />
            </div>
            <Button variant="outline" size="sm">
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}