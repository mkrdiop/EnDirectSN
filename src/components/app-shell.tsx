

// NOTE: This component is not needed due to changes in the prompt that removed the use of route groups.
// The AppShell functionality is now integrated directly into the RootLayout or specific page layouts.
// For this specific implementation, Sidebar and main content structure will be part of RootLayout and individual page.tsx files.
// Creating a placeholder to satisfy the thought process. In a real scenario, this might be removed or refactored.

"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Share2,
  Sparkles,
  Languages,
  CreditCard,
  Home,
  Video,
  Radio,
  MessageSquareText,
  FileText,
  DollarSign,
  Scissors,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Tableau de Bord", icon: LayoutDashboard },
  { href: "/streaming-settings", label: "Configuration Stream", icon: Settings },
  { href: "/multistreaming", label: "Multistreaming", icon: Share2 },
  { href: "/ai-highlights", label: "Moments Forts IA", icon: Sparkles },
  { href: "/ai-shorts", label: "Vidéos Courtes IA", icon: Scissors },
  { href: "/ai-translation", label: "Traduction IA", icon: Languages },
  { href: "/payments", label: "Paiements", icon: CreditCard },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      <Sidebar
        variant="sidebar"
        collapsible={isMobile ? "offcanvas" : "icon"}
        className="border-r"
      >
        <SidebarHeader className="flex items-center justify-between p-2">
          <Logo />
          {!isMobile && <SidebarTrigger />}
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: "right", align: "center" }}
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        {isMobile && (
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger />
            <div className="sm:hidden">
              <Logo />
            </div>
          </header>
        )}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}

