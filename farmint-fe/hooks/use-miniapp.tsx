"use client";

import { useEffect, useState } from 'react';
import { useMiniAppSimple } from './use-miniapp-simple';
import type { MiniAppContext, MiniAppHookReturn } from '@/types/miniapp';

// Dynamically import the SDK to avoid SSR issues
let sdk: any = null;

const initializeSDK = async () => {
  if (typeof window !== 'undefined' && !sdk) {
    try {
      const { sdk: frameSdk } = await import('@farcaster/frame-sdk');
      sdk = frameSdk;
      return frameSdk;
    } catch (error) {
      console.warn('Failed to load Farcaster Frame SDK:', error);
      return null;
    }
  }
  return sdk;
};

// Re-export types for backward compatibility
export type { MiniAppContext, MiniAppHookReturn } from '@/types/miniapp';

export function useMiniApp(): MiniAppHookReturn {
  const [context, setContext] = useState<MiniAppContext | null>(null);
  const [isInMiniApp, setIsInMiniApp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useSimple, setUseSimple] = useState(false);

  // Fallback to simple version if SDK fails
  const simpleHook = useMiniAppSimple();

  useEffect(() => {
    async function initializeMiniApp() {
      try {
        // Initialize the SDK first
        const frameSdk = await initializeSDK();

        if (!frameSdk) {
          // If SDK fails to load, fall back to simple detection
          console.warn('Falling back to simple miniapp detection');
          setUseSimple(true);
          setIsLoading(false);
          return;
        }

        // Check if we're in a miniapp environment
        const inMiniApp = await frameSdk.isInMiniApp();
        setIsInMiniApp(inMiniApp);

        if (inMiniApp) {
          // Get context from the miniapp
          const miniAppContext = await frameSdk.context;
          setContext(miniAppContext);

          // Call ready to hide splash screen
          await frameSdk.actions.ready();
        }
      } catch (err) {
        console.error('Failed to initialize miniapp:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setUseSimple(true);
      } finally {
        setIsLoading(false);
      }
    }

    initializeMiniApp();
  }, []);

  // Return simple hook if SDK failed to load
  if (useSimple) {
    return simpleHook;
  }

  const signIn = async (nonce: string) => {
    if (!isInMiniApp || !sdk) {
      throw new Error('Not in miniapp environment');
    }

    try {
      return await sdk.actions.signIn({
        nonce,
        acceptAuthAddress: true
      });
    } catch (err) {
      throw new Error(`Sign in failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const addMiniApp = async () => {
    if (!isInMiniApp || !sdk) {
      throw new Error('Not in miniapp environment');
    }

    try {
      await sdk.actions.addMiniApp();
    } catch (err) {
      throw new Error(`Add miniapp failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const composeCast = async (options: {
    text?: string;
    embeds?: string[];
    parent?: { type: 'cast'; hash: string };
    channelKey?: string;
  }) => {
    if (!isInMiniApp || !sdk) {
      throw new Error('Not in miniapp environment');
    }

    try {
      return await sdk.actions.composeCast(options);
    } catch (err) {
      throw new Error(`Compose cast failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const openUrl = async (url: string) => {
    if (!isInMiniApp || !sdk) {
      window.open(url, '_blank');
      return;
    }

    try {
      await sdk.actions.openUrl(url);
    } catch (err) {
      console.error('Failed to open URL:', err);
      // Fallback to regular window.open
      window.open(url, '_blank');
    }
  };

  const close = async () => {
    if (!isInMiniApp || !sdk) {
      return;
    }

    try {
      await sdk.actions.close();
    } catch (err) {
      console.error('Failed to close miniapp:', err);
    }
  };

  return {
    context,
    isInMiniApp,
    isLoading,
    error,
    actions: {
      signIn,
      addMiniApp,
      composeCast,
      openUrl,
      close,
    },
  };
}
