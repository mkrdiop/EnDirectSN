
"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { PlaySquare, Smartphone, Tv, Github, Twitter, Facebook } from "lucide-react"; // Added some social icons

export function ExploreFooter() {
  return (
    <footer className="border-t py-12 bg-muted/50">
      <div className="container text-center">
        <div className="flex justify-center mb-6">
         <Logo />
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EnDirectAuSénégal. Tous droits réservés.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Votre portail vers le meilleur du streaming sénégalais et de la diaspora.
        </p>
        <div className="mt-6 flex justify-center gap-5">
          <Link href="/live-streams" className="text-muted-foreground hover:text-primary" aria-label="Explorer les streams">
            <Compass className="h-5 w-5" />
          </Link>
          <Link href="/(marketing)/viewers" className="text-muted-foreground hover:text-primary" aria-label="Page spectateurs">
            <Users className="h-5 w-5" />
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-primary" aria-label="Page créateurs">
            <Mic2 className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-6 flex justify-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
                <Github className="h-5 w-5" />
            </Link>
        </div>
         <div className="mt-6 text-xs text-muted-foreground space-x-3">
            <Link href="#" className="hover:text-primary">Conditions d'utilisation</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-primary">Politique de confidentialité</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-primary">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

// Adding missing icons for ExploreFooter
import { Compass, Users, Mic2 } from "lucide-react";
