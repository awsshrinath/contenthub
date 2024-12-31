import React from 'react';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

interface ScriptInputProps {
  script: string;
  onChange: (script: string) => void;
  onGenerate: () => void;
  loading?: boolean;
}

export function ScriptInput({ script, onChange, onGenerate, loading = false }: ScriptInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Video Script
        </label>
        <textarea
          value={script}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="Enter your video script here..."
        />
      </div>
      <Button 
        onClick={onGenerate} 
        disabled={!script.trim() || loading}
        className="w-full"
      >
        <Wand2 className="w-4 h-4 mr-2" />
        {loading ? 'Generating...' : 'Generate Video'}
      </Button>
    </div>
  );
}