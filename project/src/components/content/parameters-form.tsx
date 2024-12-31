import React from 'react';
import { ContentParameters } from '@/types/content';
import { Button } from '@/components/ui/button';

const TONE_OPTIONS = ['Professional', 'Casual', 'Friendly', 'Formal', 'Creative'];
const STYLE_OPTIONS = ['Informative', 'Persuasive', 'Educational', 'Entertaining'];
const AUDIENCE_OPTIONS = ['General', 'Technical', 'Business', 'Students'];
const CONTENT_TYPES = ['Social Media Post', 'Blog Post', 'Video Script', 'Email'];

interface ParametersFormProps {
  parameters: ContentParameters;
  onChange: (params: ContentParameters) => void;
}

export function ParametersForm({ parameters, onChange }: ParametersFormProps) {
  const handleChange = (key: keyof ContentParameters, value: string) => {
    onChange({ ...parameters, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Content Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Type
        </label>
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPES.map((type) => (
            <Button
              key={type}
              variant={parameters.contentType === type ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleChange('contentType', type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map((tone) => (
            <Button
              key={tone}
              variant={parameters.tone === tone ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleChange('tone', tone)}
            >
              {tone}
            </Button>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Style
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((style) => (
            <Button
              key={style}
              variant={parameters.style === style ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleChange('style', style)}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Audience
        </label>
        <div className="flex flex-wrap gap-2">
          {AUDIENCE_OPTIONS.map((audience) => (
            <Button
              key={audience}
              variant={parameters.audience === audience ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleChange('audience', audience)}
            >
              {audience}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}