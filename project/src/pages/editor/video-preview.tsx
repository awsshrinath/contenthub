import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';
import { Caption, CaptionStyle } from '@/types/editor';

interface VideoPreviewProps {
  videoUrl: string;
  captions: Caption[];
  captionStyle: CaptionStyle;
  voiceoverUrl?: string;
}

export function VideoPreview({ videoUrl, captions, captionStyle, voiceoverUrl }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const getCurrentCaption = () => {
    return captions.find(
      caption => currentTime >= caption.startTime && currentTime <= caption.endTime
    );
  };

  const handleExport = async (format: 'mp4' | 'srt') => {
    // Simulated export functionality
    const filename = format === 'mp4' ? 'video-with-captions.mp4' : 'captions.srt';
    console.log(`Exporting ${format} file: ${filename}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        >
          {voiceoverUrl && <audio src={voiceoverUrl} />}
        </video>

        {/* Caption Display */}
        {getCurrentCaption() && (
          <div
            className="absolute left-0 right-0 px-4 py-2 text-center"
            style={{
              [captionStyle.position]: '32px',
              fontSize: captionStyle.fontSize,
              color: captionStyle.color,
              backgroundColor: captionStyle.backgroundColor,
            }}
          >
            {getCurrentCaption()?.text}
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={togglePlayPause} size="sm">
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button onClick={handleRewind} size="sm" variant="outline">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Export Options */}
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport('mp4')}
            size="sm"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Video
          </Button>
          <Button
            onClick={() => handleExport('srt')}
            size="sm"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Captions
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="h-8 relative">
        <input
          type="range"
          min={0}
          max={videoRef.current?.duration || 100}
          value={currentTime}
          onChange={(e) => {
            if (videoRef.current) {
              videoRef.current.currentTime = Number(e.target.value);
            }
          }}
          className="w-full"
        />
        <div className="text-sm text-gray-500 mt-1">
          {Math.floor(currentTime)}s
        </div>
      </div>
    </div>
  );
}