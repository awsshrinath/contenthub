import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { VideoTimeline } from '@/components/editor/timeline/video-timeline';
import { AudioTimeline } from '@/components/editor/timeline/audio-timeline';
import { MetadataEditor } from '@/components/editor/metadata/metadata-editor';
import { VideoPreview } from './video-preview';
import { saveEditedMedia } from '@/services/editor';
import type { Caption, CaptionStyle, EditedMedia } from '@/types/editor';
import { ArrowRight, Download, Save } from 'lucide-react';

const DEFAULT_CAPTION_STYLE: CaptionStyle = {
  fontSize: '16px',
  color: '#FFFFFF',
  position: 'bottom',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
};

export function Editor() {
  const navigate = useNavigate();
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>(DEFAULT_CAPTION_STYLE);
  const [voiceoverUrl, setVoiceoverUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [videoSegments, setVideoSegments] = useState([
    { id: '1', startTime: 0, endTime: 100, url: 'https://example.com/sample-video.mp4' }
  ]);
  const [audioTracks, setAudioTracks] = useState([]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates: Partial<EditedMedia> = {
        captions,
        captionStyle,
        voiceoverUrl: voiceoverUrl || undefined,
      };
      
      await saveEditedMedia('user123', 'media123', updates);
      navigate('/publish');
    } catch (error) {
      console.error('Failed to save edited media:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTrim = (segmentId: string, startTime: number, endTime: number) => {
    setVideoSegments(segments =>
      segments.map(segment =>
        segment.id === segmentId
          ? { ...segment, startTime, endTime }
          : segment
      )
    );
  };

  const handleDelete = (segmentId: string) => {
    setVideoSegments(segments =>
      segments.filter(segment => segment.id !== segmentId)
    );
  };

  const handleReplace = (segmentId: string, newVideo: File) => {
    // Handle video replacement logic
    console.log('Replacing video segment:', segmentId, newVideo);
  };

  const handleVolumeChange = (trackId: string, volume: number) => {
    // Handle volume change logic
    console.log('Changing volume:', trackId, volume);
  };

  const handleAddAudioTrack = (type: 'voiceover' | 'background', file: File) => {
    // Handle adding new audio track logic
    console.log('Adding audio track:', type, file);
  };

  const handleSaveMetadata = (description: string, hashtags: string[]) => {
    // Handle saving metadata logic
    console.log('Saving metadata:', { description, hashtags });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Edit Content</h1>
        <div className="flex gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <VideoPreview
              videoUrl={videoSegments[0].url}
              captions={captions}
              captionStyle={captionStyle}
              voiceoverUrl={voiceoverUrl || undefined}
            />
          </div>

          {/* Timelines */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <VideoTimeline
              segments={videoSegments}
              onTrim={handleTrim}
              onDelete={handleDelete}
              onReplace={handleReplace}
            />
            <AudioTimeline
              tracks={audioTracks}
              onVolumeChange={handleVolumeChange}
              onAddTrack={handleAddAudioTrack}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Details</h2>
            <MetadataEditor
              onSave={handleSaveMetadata}
              initialHashtags={['content', 'social']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}