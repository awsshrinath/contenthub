import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PenTool,
  Image,
  Edit,
  Share2,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Content', to: '/content', icon: PenTool },
  { name: 'Media', to: '/media', icon: Image },
  { name: 'Editor', to: '/editor', icon: Edit },
  { name: 'Publish', to: '/publish', icon: Share2 },
  { name: 'Account', to: '/settings/account', icon: User },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="flex justify-around">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              cn('flex flex-col items-center p-2', {
                'text-[#003366]': isActive,
                'text-gray-600': !isActive,
              })
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}