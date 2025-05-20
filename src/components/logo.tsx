
"use client";

import { Music2 } from "lucide-react"; // Changed icon to Music2
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="Accueil Zikcut">
      <Music2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
      <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
        Zikcut
      </span>
    </Link>
  );
}
