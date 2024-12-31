import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image, Video, Loader2 } from 'lucide-react';
import { uploadTemplate } from '@/services/admin';
import type { TemplateMetadata } from '@/types/admin';

const CATEGORIES = ['Business', 'Social Media', 'Education', 'Marketing'];
const STYLES = ['Minimalist', 'Professional', 'Vibrant', 'Modern'];

export function TemplateUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<TemplateMetadata>({
    title: '',
    description: '',
    category: '',
    style: '',
    contentType: 'image',
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMetadata(prev => ({
        ...prev,
        contentType: selectedFile.type.startsWith('video/') ? 'video' : 'image'
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      await uploadTemplate(file, metadata);
      // Reset form
      setFile(null);
      setPreview(null);
      setMetadata({
        title: '',
        description: '',
        category: '',
        style: '',
        contentType: 'image',
      });
    } catch (error) {
      console.error('Failed to upload template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Upload Template
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 dark:border-gray-600">
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="relative max-w-md mx-auto">
                  {metadata.contentType === 'image' ? (
                    <img src={preview} alt="Preview" className="rounded-lg" />
                  ) : (
                    <video src={preview} className="rounded-lg" controls />
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    {metadata.contentType === 'video' ? (
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
        </div>

        {/* Metadata Fields */}
        <div className="grid grid-cols-1 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              value={metadata.title}
              onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              value={metadata.description}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              <select
                value={metadata.category}
                onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Style
              </label>
              <select
                value={metadata.style}
                onChange={(e) => setMetadata({ ...metadata, style: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card-hover dark:text-white shadow-sm"
                required
              >
                <option value="">Select a style</option>
                {STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading || !file}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Template
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}