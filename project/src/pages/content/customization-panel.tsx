import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const toneOptions = ['Professional', 'Casual', 'Friendly', 'Formal', 'Creative'];
const audienceOptions = ['General', 'Technical', 'Business', 'Students', 'Seniors'];
const styleOptions = ['Informative', 'Persuasive', 'Educational', 'Entertaining'];

export function CustomizationPanel() {
  const [tone, setTone] = useState('Professional');
  const [audience, setAudience] = useState('General');
  const [style, setStyle] = useState('Informative');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Customize Your Content</h2>
      
      {/* Tone Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((option) => (
            <Button
              key={option}
              variant={tone === option ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTone(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
        <div className="flex flex-wrap gap-2">
          {audienceOptions.map((option) => (
            <Button
              key={option}
              variant={audience === option ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setAudience(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Writing Style */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Writing Style</label>
        <div className="flex flex-wrap gap-2">
          {styleOptions.map((option) => (
            <Button
              key={option}
              variant={style === option ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStyle(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}