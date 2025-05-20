
"use client";

import type { TopArtist } from "@/lib/mock-explore-data"; // Updated type
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Mic2, CheckCircle } from "lucide-react"; // Added Mic2, CheckCircle
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface ArtistCardProps { // Renamed interface
  streamer: TopArtist; // Updated prop type, keeping 'streamer' for now to avoid breaking explore page too much
}

export function StreamerCard({ streamer: artist }: ArtistCardProps) { // Renamed prop
  return (
    <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 overflow-hidden">
      <CardHeader className="p-4 flex flex-row items-center gap-4 bg-muted/30">
        {artist.isLoading ? (
            <Skeleton className="h-16 w-16 rounded-full" />
        ) : (
            <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={artist.avatarUrl} alt={artist.name} data-ai-hint={artist.avatarAiHint} />
            <AvatarFallback>{artist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
        )}
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            {artist.name}
            {artist.isVerified && <CheckCircle className="ml-2 h-4 w-4 text-blue-500" />}
          </h3>
          <p className="text-sm text-muted-foreground">{artist.mainGenre}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1.5" />
          {typeof artist.followerCount === 'number' ? artist.followerCount.toLocaleString() : '0'} fans
        </div>
        {/* isLive can be repurposed for something else if needed, or removed for artists */}
        {/* For now, let's use it to show a generic "Top Artist" badge or similar */}
        {/* {artist.isVerified && ( // Example, could be another status
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Mic2 className="mr-1.5 h-3 w-3" /> Top Artiste
          </Badge>
        )} */}
      </CardContent>
      {/* Future: Link to artist profile */}
      {/* <CardFooter className="p-2">
        <Button variant="outline" size="sm" className="w-full">
          Voir le Profil
        </Button>
      </CardFooter> */}
    </Card>
  );
}

