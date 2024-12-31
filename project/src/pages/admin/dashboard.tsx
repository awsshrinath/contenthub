import React from 'react';
import { TemplateUpload } from './template-upload';
import { TemplateList } from './template-list';
import { CustomizationSettings } from './customization-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      
      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload Template</TabsTrigger>
          <TabsTrigger value="manage">Manage Templates</TabsTrigger>
          <TabsTrigger value="customize">Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <TemplateUpload />
        </TabsContent>

        <TabsContent value="manage">
          <TemplateList />
        </TabsContent>

        <TabsContent value="customize">
          <CustomizationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}