import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';
import { SidebarHeader } from './sidebar-header';
import { SidebarNavigation } from './sidebar-navigation';
import { useTheme } from '@/lib/theme/use-theme';

export function Sidebar() {
  const { isExpanded } = useSidebar();
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
        'transition-all duration-300 ease-in-out z-30',
        isExpanded ? 'w-64' : 'w-16',
        'flex flex-col'
      )}
    >
      <SidebarHeader />
      <SidebarNavigation />
    </div>
  );
}