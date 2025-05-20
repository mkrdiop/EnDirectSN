
"use client";

import type { UpcomingRelease } from "@/lib/mock-explore-data"; // Updated type
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock, Bell, Disc3, Album, Music2 } from "lucide-react"; // Added music icons
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface UpcomingReleaseCardProps { // Renamed interface
  stream: UpcomingRelease; // Updated prop type (still named stream for less breaking changes for now)
}

export function PlannedStreamCard({ stream: release }: UpcomingReleaseCardProps) { // Renamed prop
  const IconType = release.type === "Album" ? Album : release.type === "EP" ? Disc3 : Music2;
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg h-full bg-card/80 backdrop-blur-sm border-dashed border-primary/30 hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        {release.isLoading ? (
            <Skeleton className="object-cover w-full aspect-video" />
        ) : (
            <Image
            src={release.artworkUrl}
            alt={release.title}
            width={400}
            height={225} // 16:9 aspect ratio
            className="object-cover w-full aspect-video opacity-80 group-hover:opacity-100 transition-opacity"
            data-ai-hint={release.artworkAiHint}
            />
        )}
        <Badge variant="secondary" className="absolute top-2 left-2 bg-accent/80 text-accent-foreground">
          {release.type} à Venir
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-3 mb-3">
           {release.isLoading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
           ) : (
            <Avatar className="h-10 w-10 border">
                <AvatarImage src={release.artistAvatarUrl} alt={release.artistName} data-ai-hint={release.artistAvatarAiHint}/>
                <AvatarFallback>{release.artistName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
           )}
          <div>
            <CardTitle className="text-lg leading-tight mb-0.5 flex items-center gap-1.5">
                <IconType className="h-5 w-5 text-primary shrink-0" />
                {release.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{release.artistName}</p>
          </div>
        </div>
        <Badge variant="outline" className="mb-3">{release.genre}</Badge>
        <CardDescription className="text-sm line-clamp-2 mb-3">{release.description}</CardDescription>
        <div className="flex items-center text-sm text-primary font-medium">
          <CalendarClock className="mr-2 h-4 w-4" />
          <span>Sortie: {release.releaseDate}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t border-dashed border-primary/30">
        <Button variant="outline" className="w-full" disabled>
          <Bell className="mr-2 h-4 w-4" /> Pré-enregistrer / M'alerter
        </Button>
      </CardFooter>
    </Card>
  );
}
