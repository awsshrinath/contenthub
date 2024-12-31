export interface DashboardStats {
  totalContent: number;
  totalVideos: number;
  totalImages: number;
  monthlyGrowth: number;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'draft' | 'published';
  timestamp: string;
  platform?: string;
  status?: 'scheduled' | 'published';
}

export interface SocialConnection {
  platform: string;
  status: 'connected' | 'disconnected';
  username?: string;
  lastSync?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentContent: ContentItem[];
  socialConnections: SocialConnection[];
}