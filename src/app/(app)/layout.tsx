"use client";

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppShell } from '@/components/app-shell';
import type { ReactNode } from 'react';

export default function AppPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <AppShell>{children}</AppShell>
    </SidebarProvider>
  );
}