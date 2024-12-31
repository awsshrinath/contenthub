import React from 'react';
import { LayoutDashboard, PenTool, Image, Video, Send, Settings, Sparkles } from 'lucide-react';
import { NavItem } from './nav-item';

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Content', icon: PenTool, to: '/content' },
  { label: 'Images', icon: Image, to: '/media?type=image' },
  { label: 'Videos', icon: Video, to: '/media?type=video' },
  { label: 'Generate', icon: Sparkles, to: '/generate' },
  { label: 'Publish', icon: Send, to: '/publish' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

export function NavMenu() {
  return (
    <nav className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 px-3 py-6 space-y-2">
      {/* Logo */}
      <div className="px-4 mb-8">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-600 text-transparent bg-clip-text">
          Content AI
        </h1>
      </div>

      {/* Navigation Items */}
      {navigation.map((item) => (
        <NavItem
          key={item.to}
          icon={item.icon}
          label={item.label}
          to={item.to}
        />
      ))}
    </nav>
  );
}