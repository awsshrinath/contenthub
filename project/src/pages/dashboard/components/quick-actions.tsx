import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Video, Image as ImageIcon, FileText, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: 'New Content', icon: PlusCircle, path: '/content', color: 'from-blue-500 to-indigo-600' },
    { label: 'Create Video', icon: Video, path: '/media?type=video', color: 'from-purple-500 to-pink-600' },
    { label: 'Generate Image', icon: ImageIcon, path: '/media?type=image', color: 'from-green-500 to-emerald-600' },
    { label: 'Schedule Post', icon: Send, path: '/publish', color: 'from-orange-500 to-red-600' },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map(({ label, icon: Icon, path, color }) => (
          <Button
            key={label}
            onClick={() => navigate(path)}
            className={`relative overflow-hidden bg-gradient-to-r ${color} text-white hover:shadow-lg transition-all duration-300 flex flex-col items-center py-6 gap-2`}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}