import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2, Settings2, FileText } from 'lucide-react';
import { AdminDashboard } from './dashboard';
import { ContentGeneration } from './content-generation';
import { Documentation } from './docs';

export function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => navigate('/admin/content-generation')}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Wand2 className="w-6 h-6 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Content Generation</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Generate AI content templates for users using ChatGPT, DALL-E, and Kling.ai
          </p>
          <Button variant="outline" size="sm">
            Generate Content
          </Button>
        </div>

        <div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => navigate('/settings')}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Settings2 className="w-6 h-6 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">API Settings</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Configure API integrations and manage service connections
          </p>
          <Button variant="outline" size="sm">
            Manage Settings
          </Button>
        </div>

        <div 
          className="bg-white dark:bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => navigate('/admin/docs')}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documentation</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Platform documentation, guides, and technical specifications
          </p>
          <Button variant="outline" size="sm">
            View Docs
          </Button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/content-generation" element={<ContentGeneration />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </div>
  );
}