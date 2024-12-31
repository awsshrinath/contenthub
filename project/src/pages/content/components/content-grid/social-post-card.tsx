import React from 'react';
import { Twitter, Linkedin, Instagram, Facebook, Heart, Share2 } from 'lucide-react';

interface SocialPostCardProps {
  content: string;
  platform: string;
  engagement: {
    likes: number;
    shares: number;
  };
}

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

export function SocialPostCard({ content, platform, engagement }: SocialPostCardProps) {
  const Icon = platformIcons[platform as keyof typeof platformIcons];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-primary-500" />
        <span className="font-medium text-gray-900 dark:text-white capitalize">{platform}</span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">{content}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4" />
          <span>{engagement.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          <span>{engagement.shares}</span>
        </div>
      </div>
    </div>
  );
}