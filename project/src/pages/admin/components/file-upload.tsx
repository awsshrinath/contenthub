import React from 'react';
import { Button } from '@/components/ui/button';
import { Image, Video } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  preview: string | null;
  contentType: 'image' | 'video';
  onFileChange: (file: File) => void;
  onClear: () => void;
}

export function FileUpload({ file, preview, contentType, onFileChange, onClear }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 dark:border-gray-600">
      <div className="space-y-1 text-center">
        {preview ? (
          <div className="relative max-w-md mx-auto">
            {contentType === 'image' ? (
              <img src={preview} alt="Preview" className="rounded-lg" />
            ) : (
              <video src={preview} className="rounded-lg" controls />
            )}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onClear}
            >
              Change
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              {contentType === 'video' ? (
                <Video className="h-12 w-12 text-gray-400" />
              ) : (
                <Image className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-hover">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}