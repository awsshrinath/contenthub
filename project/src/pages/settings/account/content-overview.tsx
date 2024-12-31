import React from 'react';
import { FileText, Video, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContentOverview() {
  const contentStats = [
    { icon: FileText, label: 'Drafts', count: 12 },
    { icon: Video, label: 'Videos', count: 8 },
    { icon: ImageIcon, label: 'Images', count: 24 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Content Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {contentStats.map(({ icon: Icon, label, count }) => (
          <div key={label} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Recent Content</h3>
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">Content Title {i}</p>
                  <p className="text-sm text-gray-500">Last edited 2 days ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}