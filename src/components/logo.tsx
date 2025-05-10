"use client";

import { PlaySquare } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="EnDirectAuSénégal Home">
      <PlaySquare className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
      <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
        EnDirectAuSénégal
      </span>
    </Link>
  );
}
