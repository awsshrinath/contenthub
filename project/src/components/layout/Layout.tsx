import React from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { themedClasses } from '@/lib/theme/theme-utils';
import { cn } from '@/lib/utils/cn';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={themedClasses.page}>
      <header className={cn(
        themedClasses.cardStatic,
        'fixed top-0 left-0 right-0 z-50 border-b',
        themedClasses.border
      )}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className={themedClasses.text}>Content AI</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-8">
        {children}
      </main>
    </div>
  );
}