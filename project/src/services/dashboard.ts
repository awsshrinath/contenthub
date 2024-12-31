import type { DashboardData } from '@/types/dashboard';

export async function fetchDashboardData(userId: string): Promise<DashboardData> {
  // Simulated API response
  return {
    stats: {
      totalContent: 156,
      totalVideos: 43,
      totalImages: 89,
      monthlyGrowth: 12,
    },
    recentContent: [
      {
        id: '1',
        title: 'AI in Business',
        description: 'How AI is transforming modern businesses',
        type: 'draft',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Remote Work Tips',
        description: 'Top 10 productivity tips for remote workers',
        type: 'published',
        timestamp: new Date().toISOString(),
        platform: 'LinkedIn',
        status: 'published',
      },
    ],
    socialConnections: [
      {
        platform: 'LinkedIn',
        status: 'connected',
        username: 'john.doe',
        lastSync: new Date().toISOString(),
      },
      {
        platform: 'Twitter',
        status: 'disconnected',
      },
    ],
  };
}