"use client";

import { SessionProvider } from "next-auth/react";
import { GeneralProvider } from "@/context/GeneralContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GeneralProvider>{children}</GeneralProvider>
    </SessionProvider>
  );
}
