// app/providers/SessionProviderWrapper.tsx
"use client"; // ⚠️ Ye zaruri hai

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SessionProviderWrapper({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
