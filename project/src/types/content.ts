export type ContentType = 'post' | 'script' | 'blog';

export interface ContentOptions {
  type: ContentType;
  tone: string;
  platform: string;
}

export interface GeneratedContent {
  text: string;
  hashtags: string[];
  metadata: {
    type: ContentType;
    tone: string;
    platform: string;
  };
}