import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

export function NavItem({ icon: Icon, label, to }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
          'hover:bg-gray-800/50 hover:shadow-lg hover:shadow-primary/20',
          'group relative overflow-hidden',
          isActive && 'bg-gray-800 shadow-lg shadow-primary/20'
        )}
    >
      {({ isActive }) => (
        <>
          {/* Glow effect */}
          <div className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-200',
            'bg-gradient-to-r from-primary/20 to-transparent',
            isActive && 'opacity-100'
          )} />

          <Icon className={cn(
            'w-5 h-5 transition-colors duration-200 relative z-10',
            isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-200'
          )} />
          
          <span className={cn(
            'font-medium transition-colors duration-200 relative z-10',
            isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
          )}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}