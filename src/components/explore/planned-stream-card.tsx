
"use client";

import type { PlannedStream } from "@/lib/mock-explore-data";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlannedStreamCardProps {
  stream: PlannedStream;
}

export function PlannedStreamCard({ stream }: PlannedStreamCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg h-full bg-card/80 backdrop-blur-sm border-dashed border-primary/30 hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={stream.thumbnailUrl}
          alt={stream.title}
          width={400}
          height={225} // 16:9 aspect ratio
          className="object-cover w-full aspect-video opacity-80 group-hover:opacity-100 transition-opacity"
          data-ai-hint={stream.aiHint}
        />
        <Badge variant="secondary" className="absolute top-2 left-2 bg-amber-400 text-amber-900">
          À Venir
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={stream.streamerAvatarUrl} alt={stream.streamerName} data-ai-hint={stream.streamerAvatarAiHint}/>
            <AvatarFallback>{stream.streamerName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg leading-tight mb-1">{stream.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{stream.streamerName}</p>
          </div>
        </div>
        <Badge variant="outline" className="mb-3">{stream.category}</Badge>
        <CardDescription className="text-sm line-clamp-2 mb-3">{stream.description}</CardDescription>
        <div className="flex items-center text-sm text-primary font-medium">
          <CalendarClock className="mr-2 h-4 w-4" />
          <span>{stream.scheduledTime}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t border-dashed border-primary/30">
        <Button variant="outline" className="w-full" disabled>
          <Bell className="mr-2 h-4 w-4" /> M'alerter (Bientôt disponible)
        </Button>
      </CardFooter>
    </Card>
  );
}
