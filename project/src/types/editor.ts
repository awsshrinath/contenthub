export interface Caption {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface CaptionStyle {
  fontSize: string;
  color: string;
  position: 'bottom' | 'top';
  backgroundColor: string;
}

export interface VoiceoverParams {
  text: string;
  voice: string;
  language: string;
  speed: number;
}

export interface EditedMedia {
  id: string;
  originalMediaId: string;
  url: string;
  type: 'image' | 'video';
  captions?: Caption[];
  captionStyle?: CaptionStyle;
  voiceoverUrl?: string;
  updatedAt: string;
}