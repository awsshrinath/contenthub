import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Hash } from 'lucide-react';

interface MetadataEditorProps {
  initialDescription?: string;
  initialHashtags?: string[];
  onSave: (description: string, hashtags: string[]) => void;
}

export function MetadataEditor({ 
  initialDescription = '', 
  initialHashtags = [], 
  onSave 
}: MetadataEditorProps) {
  const [description, setDescription] = useState(initialDescription);
  const [hashtags, setHashtags] = useState<string[]>(initialHashtags);
  const [newHashtag, setNewHashtag] = useState('');

  const handleAddHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handleSave = () => {
    onSave(description, hashtags);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="Add a description for your content..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hashtags
        </label>
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <div className="flex items-center border rounded-md">
              <span className="pl-3">
                <Hash className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="text"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
                className="block w-full border-0 py-2 pl-1 focus:ring-0"
                placeholder="Add hashtag"
              />
            </div>
          </div>
          <Button onClick={handleAddHashtag} variant="outline">
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-primary/10 text-primary"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveHashtag(tag)}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary/20"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Metadata
      </Button>
    </div>
  );
}