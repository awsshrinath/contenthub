import { cn } from '@/lib/utils';

export const getThemedClass = (baseClass: string, darkClass?: string) => {
  return cn(
    baseClass,
    darkClass && `dark:${darkClass}`
  );
};

// Common themed classes
export const themedClasses = {
  // Backgrounds
  background: 'bg-gray-50 dark:bg-dark-background',
  card: 'bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-card-hover',
  cardStatic: 'bg-white dark:bg-dark-card',
  
  // Text
  text: 'text-gray-900 dark:text-dark-text-primary',
  textSecondary: 'text-gray-600 dark:text-dark-text-secondary',
  
  // Borders
  border: 'border-gray-200 dark:border-dark-border',
  
  // Forms
  input: 'bg-white dark:bg-dark-card border-gray-300 dark:border-dark-border text-gray-900 dark:text-white',
  
  // Common layouts
  page: 'min-h-screen bg-gray-50 dark:bg-dark-background text-gray-900 dark:text-white',
  section: 'bg-white dark:bg-dark-card rounded-lg shadow-sm'
};