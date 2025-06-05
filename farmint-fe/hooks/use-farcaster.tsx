"use client";

import { useEffect, useState } from 'react';
import { AuthKitProvider } from '@farcaster/auth-kit';

export function useFarcasterUser() {
  const { user, isLoading, error } = AuthKitProvider.useUser();
  return { user, isLoading, error };
}

export function useFarcasterAuth() {
  return AuthKitProvider.useAuth();
}
