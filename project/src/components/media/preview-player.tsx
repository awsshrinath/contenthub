import React, { useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewPlayerProps {
  videoUrl: string;
  captionStyle: {
    fontSize: number;
    color: string;
    position: string;
  };
  captions: Array<{
    text: string;
    startTime: number;
    endTime: number;
  }>;
}

export function PreviewPlayer({ videoUrl, captionStyle, captions }: PreviewPlayerProps) {
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

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        
        {getCurrentCaption() && (
          <div
            className="absolute left-0 right-0 px-4 py-2 text-center"
            style={{
              [captionStyle.position]: '32px',
              fontSize: `${captionStyle.fontSize}px`,
              color: captionStyle.color,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            }}
          >
            {getCurrentCaption()?.text}
          </div>
        )}
      </div>

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

        <div className="flex-1 mx-4">
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
        </div>

        <div className="text-sm text-gray-500">
          {Math.floor(currentTime)}s
        </div>
      </div>
    </div>
  );
}