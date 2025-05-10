

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
  SidebarSeparator,
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
  Tv2, // Added for "Streams en Direct"
  Wallet, // Added for "Mon Portefeuille"
  Users, // For general "Espace Spectateur"
} from "lucide-react";

const streamerNavItems = [
  { href: "/", label: "Tableau de Bord", icon: LayoutDashboard },
  { href: "/streaming-settings", label: "Configuration Stream", icon: Settings },
  { href: "/multistreaming", label: "Multistreaming & Webinaire", icon: Share2 },
  { href: "/ai-highlights", label: "Moments Forts IA", icon: Sparkles },
  { href: "/ai-shorts", label: "Vidéos Courtes IA", icon: Scissors },
  { href: "/ai-translation", label: "Traduction IA", icon: Languages },
  { href: "/payments", label: "Paiements Streamer", icon: CreditCard },
];

const viewerNavItems = [
  { href: "/live-streams", label: "Streams en Direct", icon: Tv2 },
  { href: "/account/wallet", label: "Mon Portefeuille", icon: Wallet },
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
            {/* Streamer Section */}
            {streamerNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
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
            
            <SidebarSeparator className="my-2" />
            
            {/* Viewer Section Label - only shows if sidebar is expanded */}
             <SidebarMenuItem className="px-2 group-data-[collapsible=icon]:hidden">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-4 w-4"/> Espace Spectateur
                </div>
            </SidebarMenuItem>

            {viewerNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
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

