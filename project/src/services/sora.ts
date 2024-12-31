import { VideoGenerationParams } from '@/types/media';

interface SoraResponse {
  videoUrl: string;
  metadata: {
    duration: number;
    resolution: string;
    format: string;
  };
}

export async function generateVideoWithSora(
  prompt: string,
  params: VideoGenerationParams
): Promise<SoraResponse> {
  const response = await fetch('/api/sora/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      ...params,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate video with Sora');
  }

  return response.json();
}

export async function checkSoraAccess(userId: string): Promise<boolean> {
  const response = await fetch(`/api/users/${userId}/sora-access`);
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return data.hasAccess;
}