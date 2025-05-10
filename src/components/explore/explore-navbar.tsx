
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Compass, LayoutDashboard, LogIn, Mic } from "lucide-react"; // Added Mic icon

export function ExploreNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-4 items-center">
          <Button variant="ghost" asChild>
            <Link href="/live-streams">
              <Compass className="mr-2 h-4 w-4" /> Tous les Streams
            </Link>
          </Button>
          <Button variant="ghost" asChild>
             <Link href="/creators">
              <Mic className="mr-2 h-4 w-4" /> Pour les Créateurs
            </Link>
          </Button>
           <Button variant="outline" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Espace Créateur
            </Link>
          </Button>
          {/* Placeholder for Login/Signup or User Profile */}
          {/* <Button asChild>
            <Link href="/auth/login">
              <LogIn className="mr-2 h-4 w-4" /> Se Connecter
            </Link>
          </Button> */}
        </nav>
        <div className="md:hidden">
          <Button asChild variant="outline" size="sm">
            <Link href="/live-streams">
              Streams
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
