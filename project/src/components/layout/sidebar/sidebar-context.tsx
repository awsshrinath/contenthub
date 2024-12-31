import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  isPinned: boolean;
  toggleExpanded: () => void;
  togglePinned: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPinned, setIsPinned] = useState(true);

  const toggleExpanded = () => {
    if (!isPinned) {
      setIsExpanded(prev => !prev);
    }
  };

  const togglePinned = () => {
    setIsPinned(prev => !prev);
    setIsExpanded(true);
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, isPinned, toggleExpanded, togglePinned }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};