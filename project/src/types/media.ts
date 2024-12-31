export interface VideoGeneratorOptions {
  type: 'sora' | 'kling';
  resolution: string;
  format: string;
  duration: string;
  voiceover: string;
}

export interface VideoGenerationParams {
  script: string;
  generator: VideoGeneratorOptions;
}

export interface GeneratedMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  metadata: {
    resolution: string;
    format?: string;
    duration?: string;
    generator?: string;
  };
  createdAt: string;
}