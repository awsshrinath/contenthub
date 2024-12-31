import React from 'react';
import { Pin, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';
import { ThemeToggle } from '../theme-toggle';

export function SidebarHeader() {
  const { isExpanded, isPinned, togglePinned } = useSidebar();

  return (
    <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
      <div className={cn('flex items-center', !isExpanded && 'justify-center w-full')}>
        {isExpanded ? (
          <span className="text-xl font-bold text-gray-900 dark:text-white">Content AI</span>
        ) : (
          <span className="text-xl font-bold text-gray-900 dark:text-white">AI</span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isExpanded && (
          <button
            onClick={togglePinned}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            {isPinned ? (
              <Pin className="w-5 h-5 text-gray-500" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}