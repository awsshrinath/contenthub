import React from 'react';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  FileText, 
  Video, 
  Mail, 
  Presentation 
} from 'lucide-react';

const contentTypes = [
  { id: 'social', name: 'Social Media', icon: MessageSquare },
  { id: 'blog', name: 'Blog Post', icon: FileText },
  { id: 'video', name: 'Video Script', icon: Video },
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'presentation', name: 'Presentation', icon: Presentation },
];

interface ContentTypeSelectorProps {
  selected: string;
  onChange: (type: string) => void;
}

export function ContentTypeSelector({ selected, onChange }: ContentTypeSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {contentTypes.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              'flex flex-col items-center p-4 rounded-lg border-2 transition-all',
              selected === id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}