import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';
import {
  LayoutDashboard,
  PenTool,
  Image,
  Calendar,
  TrendingUp,
  Send,
  Settings,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Content', to: '/content', icon: PenTool },
  { name: 'Media', to: '/media', icon: Image },
  { name: 'Daily Posts', to: '/daily-posts', icon: Calendar },
  { name: 'Trending', to: '/trending', icon: TrendingUp },
  { name: 'Publish', to: '/publish', icon: Send },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function SidebarNavigation() {
  const { isExpanded } = useSidebar();
  const { user } = useAuth();

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
              {
                'bg-primary-500 text-white': isActive,
                'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800': !isActive,
              }
            )
          }
        >
          <item.icon className={cn('flex-shrink-0 h-5 w-5', isExpanded ? 'mr-3' : '')} />
          {isExpanded && <span>{item.name}</span>}
        </NavLink>
      ))}

      {user?.isAdmin && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors mt-4 border-t border-gray-200 dark:border-gray-700 pt-4',
              {
                'bg-primary-500 text-white': isActive,
                'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800': !isActive,
              }
            )
          }
        >
          <Shield className={cn('flex-shrink-0 h-5 w-5', isExpanded ? 'mr-3' : '')} />
          {isExpanded && <span>Admin Panel</span>}
        </NavLink>
      )}
    </nav>
  );
}