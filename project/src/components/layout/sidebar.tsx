import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PenTool,
  Image,
  Edit,
  Share2,
  Settings,
  User,
  Shield,
  Newspaper,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Content', to: '/content', icon: PenTool },
  { name: 'Media', to: '/media', icon: Image },
  { name: 'Daily Posts', to: '/daily-posts', icon: Newspaper },
  { name: 'Trending', to: '/trending', icon: TrendingUp },
  { name: 'Editor', to: '/editor', icon: Edit },
  { name: 'Publish', to: '/publish', icon: Share2 },
  { name: 'Settings', to: '/settings', icon: Settings },
  { name: 'Account', to: '/settings/account', icon: User },
];

export function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-white dark:bg-dark-card border-r border-light-border dark:border-dark-border">
      <div className="flex h-16 items-center px-4 border-b border-light-border dark:border-dark-border">
        <h1 className="text-xl font-bold text-primary dark:text-primary-hover">Content AI</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                {
                  'bg-primary text-white': isActive,
                  'text-light-text dark:text-dark-text hover:bg-light-card dark:hover:bg-dark-card-hover': !isActive,
                }
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}

        {user?.isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors mt-4 border-t border-light-border dark:border-dark-border pt-4',
                {
                  'bg-primary text-white': isActive,
                  'text-light-text dark:text-dark-text hover:bg-light-card dark:hover:bg-dark-card-hover': !isActive,
                }
              )
            }
          >
            <Shield className="mr-3 h-5 w-5" />
            Admin Panel
          </NavLink>
        )}
      </nav>
    </div>
  );
}