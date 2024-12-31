import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavMenu } from './navigation/nav-menu';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <NavMenu />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}