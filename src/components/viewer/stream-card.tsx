
"use client";

// This component is now used to display MusicTrack info
// The 'Stream' type here is a mapped version from MusicTrack for compatibility
// but the displayed info is music-centric.

import type { MusicTrack as OriginalMusicTrack } from "@/lib/mock-streams"; // Using original type for clarity inside
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlayCircle, Ticket, Heart, Music2 as MusicIcon } from "lucide-react"; // Changed Eye to MusicIcon or Heart
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";


// The 'stream' prop here is expected to be structured somewhat like the old Stream
// but with MusicTrack data. The ExplorePage maps MusicTrack to this structure.
interface MappedStreamForCard {
  id: string;
  title: string;
  streamerName: string; // artistName
  streamerAvatarUrl: string; // artistAvatarUrl
  category: string; // genre
  price: number;
  thumbnailUrl: string; // artworkUrl
  thumbnailAiHint: string; // artworkAiHint
  viewersCount: number; // playCount
  isLive: boolean; // always false for tracks, or can be repurposed
  description: string;
  duration?: string; // new field for music
  isLoading?: boolean; // For skeleton
}

interface MusicTrackCardProps {
  stream: MappedStreamForCard; // Prop name kept as 'stream' for less breaking changes in ExplorePage
  onUnlockStream: (trackId: string, price: number) => boolean;
  isUnlocked: boolean;
}

export function StreamCard({ stream: track, onUnlockStream, isUnlocked }: MusicTrackCardProps) {
  const { toast } = useToast();
  const [unlocked, setUnlocked] = useState(isUnlocked);

  const handlePlayTrack = () => {
    if (unlocked || track.price === 0) {
      toast({
        title: "Lecture de la Piste",
        description: `Lecture de : ${track.title}. (Fonctionnalité de lecture audio à venir)`,
      });
      // e.g. playAudio(track.id);
    } else {
      const success = onUnlockStream(track.id, track.price);
      if (success) {
        setUnlocked(true);
         toast({
          title: "Piste Débloquée!",
          description: `Vous pouvez maintenant écouter ${track.title}.`,
        });
      }
    }
  };

  if (track.isLoading) {
    return (
        <Card className="flex flex-col overflow-hidden shadow-lg h-full">
            <CardHeader className="p-0 relative">
                <Skeleton className="w-full aspect-video" />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <div className="flex items-start gap-3 mb-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1.5">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-2/3 mt-1" />
            </CardContent>
            <CardFooter className="p-4 border-t">
                <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
  }

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={track.thumbnailUrl} // Artwork
          alt={track.title}
          width={600}
          height={338} // 16:9 aspect ratio for consistency, or make square
          className="object-cover w-full aspect-video" // Could be aspect-square for music
          data-ai-hint={track.thumbnailAiHint}
        />
        {track.duration && (
          <Badge variant="default" className="absolute top-2 left-2 bg-black/60 text-white">
            {track.duration}
          </Badge>
        )}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
          <Heart className="w-3 h-3" /> {track.viewersCount.toLocaleString()} {/* Play count */}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-3 mb-2">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={track.streamerAvatarUrl} alt={track.streamerName} data-ai-hint="artist avatar" />
            <AvatarFallback>{track.streamerName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg leading-tight mb-0.5">{track.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{track.streamerName}</p> {/* Artist Name */}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{track.category}</Badge> {/* Genre */}
          {track.price > 0 ? (
            <Badge variant="outline" className="text-primary border-primary">
              {track.price.toLocaleString()} CFA
            </Badge>
          ) : (
            <Badge variant="outline" className="text-green-600 border-green-600">
              Gratuit
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{track.description}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={handlePlayTrack} className="w-full group">
          {unlocked || track.price === 0 ? (
            <>
              <PlayCircle className="mr-2 h-4 w-4" /> Écouter
            </>
          ) : (
            <>
              <Ticket className="mr-2 h-4 w-4" /> Débloquer pour {track.price.toLocaleString()} CFA
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
