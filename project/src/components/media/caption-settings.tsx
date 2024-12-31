import React from 'react';

interface CaptionSettingsProps {
  fontSize: number;
  color: string;
  position: string;
  onSettingsChange: (key: string, value: string | number) => void;
}

export function CaptionSettings({
  fontSize,
  color,
  position,
  onSettingsChange,
}: CaptionSettingsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size
        </label>
        <input
          type="range"
          min={12}
          max={24}
          value={fontSize}
          onChange={(e) => onSettingsChange('fontSize', Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-500 mt-1">{fontSize}px</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => onSettingsChange('color', e.target.value)}
          className="w-full h-9 rounded-md border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <select
          value={position}
          onChange={(e) => onSettingsChange('position', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="bottom">Bottom</option>
          <option value="top">Top</option>
          <option value="middle">Middle</option>
        </select>
      </div>
    </div>
  );
}