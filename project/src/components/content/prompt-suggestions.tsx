import React from 'react';
import { RefinedPrompt } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Check, Tag } from 'lucide-react';

interface PromptSuggestionsProps {
  prompts: RefinedPrompt[];
  selectedPromptId: string | null;
  onSelect: (prompt: RefinedPrompt) => void;
}

export function PromptSuggestions({ prompts, selectedPromptId, onSelect }: PromptSuggestionsProps) {
  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <div
          key={prompt.id}
          className={`p-6 rounded-lg border-2 transition-colors ${
            selectedPromptId === prompt.id
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-900 flex-1">{prompt.prompt}</p>
            <Button
              variant={selectedPromptId === prompt.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onSelect(prompt)}
            >
              <Check className="w-4 h-4 mr-2" />
              {selectedPromptId === prompt.id ? 'Selected' : 'Use This'}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <div className="flex gap-2">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {prompt.metadata && (
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(prompt.metadata).map(([key, value]) => (
                <span
                  key={key}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {key}: {value}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}