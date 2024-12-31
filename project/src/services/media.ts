import { ImageGenerationParams, VideoGenerationParams, GeneratedMedia } from '@/types/media';
import { generateVideoWithSora } from './sora';

export async function generateImage(params: ImageGenerationParams): Promise<GeneratedMedia> {
  // Simulated DALL-E API call
  return {
    id: Math.random().toString(36).substring(7),
    url: `https://source.unsplash.com/random/1024x1024/?${encodeURIComponent(params.prompt)}`,
    type: 'image',
    metadata: {
      resolution: params.resolution,
    },
    createdAt: new Date().toISOString(),
  };
}

export async function generateVideo(params: VideoGenerationParams): Promise<GeneratedMedia> {
  if (params.generator.type === 'sora') {
    const soraResponse = await generateVideoWithSora(params.script, params.generator);
    return {
      id: Math.random().toString(36).substring(7),
      url: soraResponse.videoUrl,
      type: 'video',
      metadata: {
        resolution: params.generator.resolution,
        format: params.generator.format,
        duration: params.generator.duration,
        generator: 'sora'
      },
      createdAt: new Date().toISOString(),
    };
  }

  // Default to Kling.ai
  return {
    id: Math.random().toString(36).substring(7),
    url: 'https://example.com/sample-video.mp4',
    type: 'video',
    metadata: {
      resolution: params.generator.resolution,
      format: params.generator.format,
      duration: params.generator.duration,
      generator: 'kling'
    },
    createdAt: new Date().toISOString(),
  };
}