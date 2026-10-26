"use client";

import { LanguageProvider } from "@/i18n";
import { AppErrorBoundary } from "@/components/AppError";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppErrorBoundary>
      <LanguageProvider>{children}</LanguageProvider>
    </AppErrorBoundary>
  );
}
