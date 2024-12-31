import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PromptSuggestionsProps {
  suggestions: string[];
}

export function PromptSuggestions({ suggestions }: PromptSuggestionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Suggestions</h2>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
          >
            <p className="text-gray-700">{suggestion}</p>
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Use This
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}