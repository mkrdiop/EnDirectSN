
"use client";

import type { TopStreamer } from "@/lib/mock-explore-data";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StreamerCardProps {
  streamer: TopStreamer;
}

export function StreamerCard({ streamer }: StreamerCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 overflow-hidden">
      <CardHeader className="p-4 flex flex-row items-center gap-4 bg-muted/30">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={streamer.avatarUrl} alt={streamer.name} data-ai-hint={streamer.avatarAiHint} />
          <AvatarFallback>{streamer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{streamer.name}</h3>
          <p className="text-sm text-muted-foreground">{streamer.specialty}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1.5" />
          {streamer.followers.toLocaleString()} abonnés
        </div>
        {streamer.isLive && (
          <Badge variant="destructive" className="animate-pulse">
            <Radio className="mr-1.5 h-3 w-3" /> EN DIRECT
          </Badge>
        )}
      </CardContent>
      {/* Future: Link to streamer profile */}
      {/* <CardFooter className="p-2">
        <Button variant="outline" size="sm" className="w-full">
          Voir le Profil
        </Button>
      </CardFooter> */}
    </Card>
  );
}
