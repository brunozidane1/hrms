'use client';

import { AuthProvider } from "@/lib/auth-context";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
