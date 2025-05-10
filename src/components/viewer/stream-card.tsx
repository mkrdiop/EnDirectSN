
"use client";

import type { Stream } from "@/lib/mock-streams";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, PlayCircle, Ticket, WalletMinimalIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";

interface StreamCardProps {
  stream: Stream;
  onUnlockStream: (streamId: string, price: number) => boolean; // Returns true if unlock is successful
  isUnlocked: boolean;
}

export function StreamCard({ stream, onUnlockStream, isUnlocked }: StreamCardProps) {
  const { toast } = useToast();
  const [unlocked, setUnlocked] = useState(isUnlocked);

  const handleWatchStream = () => {
    if (unlocked || stream.price === 0) {
      toast({
        title: "Accès au Stream",
        description: `Vous regardez maintenant: ${stream.title}. (Fonctionnalité de lecture vidéo à venir)`,
      });
      // Here you would typically navigate to the stream watching page
      // e.g. router.push(`/watch/${stream.id}`);
    } else {
      const success = onUnlockStream(stream.id, stream.price);
      if (success) {
        setUnlocked(true);
         toast({
          title: "Stream Débloqué!",
          description: `Vous pouvez maintenant regarder ${stream.title}.`,
        });
      }
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={stream.thumbnailUrl}
          alt={stream.title}
          width={600}
          height={338} // 16:9 aspect ratio
          className="object-cover w-full aspect-video"
          data-ai-hint={stream.thumbnailAiHint}
        />
        {stream.isLive && (
          <Badge variant="destructive" className="absolute top-2 left-2 animate-pulse">
            EN DIRECT
          </Badge>
        )}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" /> {stream.viewersCount.toLocaleString()}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-3 mb-2">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={stream.streamerAvatarUrl} alt={stream.streamerName} data-ai-hint="streamer avatar" />
            <AvatarFallback>{stream.streamerName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg leading-tight mb-1">{stream.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{stream.streamerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{stream.category}</Badge>
          {stream.price > 0 ? (
            <Badge variant="outline" className="text-primary border-primary">
              {stream.price.toLocaleString()} CFA
            </Badge>
          ) : (
            <Badge variant="outline" className="text-green-600 border-green-600">
              Gratuit
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{stream.description}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={handleWatchStream} className="w-full group" disabled={!stream.isLive && !unlocked}>
          {!stream.isLive && !unlocked ? (
            <>Stream Hors Ligne</>
          ) : unlocked || stream.price === 0 ? (
            <>
              <PlayCircle className="mr-2 h-4 w-4" /> Regarder
            </>
          ) : (
            <>
              <Ticket className="mr-2 h-4 w-4" /> Débloquer pour {stream.price.toLocaleString()} CFA
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
