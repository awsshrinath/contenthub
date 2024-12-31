import React from 'react';
import Markdown from 'react-markdown';

// Define documentation content directly since importing .md files isn't working
const documentation = `
# Content Automation Platform

## Overview

The Content Automation Platform is a comprehensive solution for generating, managing, and publishing digital content using AI technologies.

### Key Features

- AI-powered content generation
- Multi-platform social media publishing
- Image and video generation
- Content scheduling and automation
- Dark/Light theme support
- Responsive design

## Architecture

### Frontend Stack
- React 18
- TypeScript
- Vite
- TailwindCSS
- Lucide Icons

### Backend Services
- Firebase Authentication
- Firebase Firestore
- Google Cloud Storage
`;

export function Documentation() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <div className="prose dark:prose-invert max-w-none">
          <Markdown>{documentation}</Markdown>
        </div>
      </div>
    </div>
  );
}