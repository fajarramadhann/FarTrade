"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useMiniApp } from '@/hooks/use-miniapp';
import type { MiniAppContext, MiniAppHookReturn } from '@/types/miniapp';

// Use the shared type for consistency
type MiniAppProviderContext = MiniAppHookReturn;

const MiniAppReactContext = createContext<MiniAppProviderContext | null>(null);

interface MiniAppProviderProps {
  children: ReactNode;
}

export function MiniAppProvider({ children }: MiniAppProviderProps) {
  const miniAppData = useMiniApp();

  return (
    <MiniAppReactContext.Provider value={miniAppData}>
      {children}
    </MiniAppReactContext.Provider>
  );
}

export function useMiniAppContext() {
  const context = useContext(MiniAppReactContext);
  if (!context) {
    throw new Error('useMiniAppContext must be used within a MiniAppProvider');
  }
  return context;
}
