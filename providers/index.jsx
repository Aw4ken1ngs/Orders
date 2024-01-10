"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AuthContext } from '@/contexts/auth-context';
import { FIRE_BASE} from '@/constants/config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import React, { useMemo } from 'react';

export function Providers({ children }) {
  const app = useMemo(() => {
    return initializeApp(FIRE_BASE);
  }, []);

  const provider = useMemo(() => {
    const provider = new GoogleAuthProvider();
    console.log('4551554546512655-------------', provider)
    provider.addScope('email profile https://www.googleapis.com/auth/spreadsheets');
    return provider;
  }, [])

  const auth = useMemo(() => {
    return getAuth(app);
  }, [app])

  return (
    <NextUIProvider>
      <AuthContext.Provider value={{
        provider,
        auth
      }}>
        {children}
      </AuthContext.Provider>
    </NextUIProvider>
  );
}