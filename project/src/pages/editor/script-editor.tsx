import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, Heading } from 'lucide-react';

export function ScriptEditor() {
  const [content, setContent] = useState('');

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <List className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Heading className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-96 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        placeholder="Start writing your script..."
      />
    </div>
  );
}