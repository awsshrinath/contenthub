export type ContentType = 'image' | 'video';

export interface TemplateMetadata {
  title: string;
  description: string;
  category: string;
  style: string;
  contentType: ContentType;
}

export interface Template extends TemplateMetadata {
  id: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  isAdmin: boolean;
}