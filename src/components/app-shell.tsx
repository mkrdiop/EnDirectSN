
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
  Music2 as AiAudioIcon, // Renamed Sparkles to Music2
  Film as AiVideoIcon, // Renamed Scissors to Film
  Palette as AiAlbumArtIcon, // Renamed ImageIcon to Palette
  FileText as AiLyricsIcon, // Renamed Languages to FileText
  CreditCard,
  LibraryMusic, // Renamed Tv2 to LibraryMusic
  Wallet, 
  Users,
  SlidersHorizontal, // Icon for Project Settings
} from "lucide-react";

const creatorNavItems = [
  { href: "/dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { href: "/project-settings", label: "Paramètres Projet", icon: SlidersHorizontal }, // Was streaming-settings
  { href: "/distribution-tools", label: "Distribution & Partage", icon: Share2 }, // Was multistreaming
  { href: "/ai-audio-generation", label: "Génération Audio IA", icon: AiAudioIcon }, // Was ai-highlights
  { href: "/ai-video-generation", label: "Génération Vidéo IA", icon: AiVideoIcon }, // Was ai-shorts
  { href: "/ai-album-art", label: "Pochettes d'Album IA", icon: AiAlbumArtIcon }, // Was stream-thumbnails
  { href: "/ai-lyrics-assistant", label: "Assistant Paroles IA", icon: AiLyricsIcon }, // Was ai-translation
  { href: "/revenues", label: "Revenus Musicaux", icon: CreditCard }, // Was payments
];

const fanNavItems = [
  { href: "/explore-music", label: "Explorer la Musique", icon: LibraryMusic }, // Was live-streams
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
            {/* Creator Section */}
             <SidebarMenuItem className="px-2 group-data-[collapsible=icon]:hidden">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-4 w-4"/> Espace Créateur
                </div>
            </SidebarMenuItem>
            {creatorNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
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
            
            {/* Fan Section Label - only shows if sidebar is expanded */}
             <SidebarMenuItem className="px-2 group-data-[collapsible=icon]:hidden">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-4 w-4"/> Espace Fan
                </div>
            </SidebarMenuItem>

            {fanNavItems.map((item) => (
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
