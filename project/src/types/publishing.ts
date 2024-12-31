export interface PublishingStatus {
  id: string;
  platform: string;
  status: 'published' | 'scheduled' | 'failed';
  publishedUrl?: string;
  scheduledTime?: string;
  timestamp: string;
}

export interface PublishingPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  username?: string;
}