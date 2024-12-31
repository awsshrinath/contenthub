import { useMemo } from 'react';
import { themedClasses } from './theme-utils';

export function useThemedComponents() {
  return useMemo(() => ({
    Card: ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => (
      <div className={cn(themedClasses.card, className)} {...props}>
        {children}
      </div>
    ),
    
    Input: ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
      <input className={cn(themedClasses.input, className)} {...props} />
    ),
    
    Text: ({ children, className, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
      <p className={cn(themedClasses.text, className)} {...props}>
        {children}
      </p>
    ),
    
    Section: ({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) => (
      <section className={cn(themedClasses.section, className)} {...props}>
        {children}
      </section>
    ),
  }), []);
}