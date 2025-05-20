
"use client";

import type { MusicGenreCategory } from "@/lib/mock-explore-data"; // Updated type
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


interface CategoryCardProps {
  category: MusicGenreCategory; // Updated prop type
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon;

  return (
    <Link href={`/explore-music?genre=${category.slug}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col">
          <CardHeader className="p-0 relative">
            {category.isLoading ? (
                <Skeleton className="object-cover w-full aspect-[16/10]" />
            ) : (
                <Image
                src={category.imageUrl}
                alt={category.name}
                width={400}
                height={250} // Adjusted for consistency with placeholder
                className="object-cover w-full aspect-[16/10]"
                data-ai-hint={category.aiHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <IconComponent className="h-8 w-8 text-white mb-1" />
              <CardTitle className="text-xl font-bold text-white">{category.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardDescription>{category.description}</CardDescription>
          </CardContent>
           <CardContent className="p-4 pt-0">
            <div className="text-sm font-medium text-primary group-hover:underline flex items-center">
              Explorer {category.name} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
