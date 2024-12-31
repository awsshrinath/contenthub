import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { Dashboard } from '@/pages/dashboard';
import { Content } from '@/pages/content';
import { Media } from '@/pages/media';
import { Generate } from '@/pages/generate';
import { Editor } from '@/pages/editor';
import { Publish } from '@/pages/publish';
import { Settings } from '@/pages/settings';
import { AdminPanel } from '@/pages/admin';
import { AdminGuard } from '@/components/auth/admin-guard';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/content" element={<Content />} />
        <Route path="/media" element={<Media />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/settings" element={<Settings />} />
        <Route 
          path="/admin/*" 
          element={
            <AdminGuard>
              <AdminPanel />
            </AdminGuard>
          } 
        />
      </Route>
    </Routes>
  );
}