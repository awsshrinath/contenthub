import React from 'react';
import { ContentInput } from './content-input';
import { ContentOptions } from './content-options';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2 } from 'lucide-react';

interface ContentFormProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  options: any;
  onOptionsChange: (options: any) => void;
  onGenerate: () => void;
  loading: boolean;
}

export function ContentForm({
  description,
  onDescriptionChange,
  options,
  onOptionsChange,
  onGenerate,
  loading
}: ContentFormProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg">
      <ContentInput
        value={description}
        onChange={onDescriptionChange}
        onTrendingClick={() => {}}
      />

      <div className="mt-6">
        <ContentOptions
          options={options}
          onChange={onOptionsChange}
        />
      </div>

      <Button
        onClick={onGenerate}
        className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        disabled={loading || !description.trim()}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Content
          </>
        )}
      </Button>
    </div>
  );
}