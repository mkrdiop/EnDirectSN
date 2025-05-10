"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Share2, Youtube, PlusCircle, Trash2, Users, Wifi } from "lucide-react";
import React, { useState } from "react";

interface Destination {
  id: string;
  platform: string;
  streamKey: string;
  rtmpUrl: string;
  enabled: boolean;
}

const initialDestinations: Destination[] = [
  { id: "youtube1", platform: "YouTube", streamKey: "", rtmpUrl: "rtmp://a.rtmp.youtube.com/live2", enabled: false },
];

export default function MultistreamingPage() {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const { toast } = useToast();

  const addDestination = () => {
    if (destinations.length >= 8) {
      toast({
        title: "Limit Reached",
        description: "You can add up to 8 destinations.",
        variant: "destructive",
      });
      return;
    }
    setDestinations([
      ...destinations,
      { id: `custom${Date.now()}`, platform: "Custom RTMP", streamKey: "", rtmpUrl: "", enabled: false },
    ]);
  };

  const updateDestination = (id: string, field: keyof Destination, value: string | boolean) => {
    setDestinations(
      destinations.map((dest) =>
        dest.id === id ? { ...dest, [field]: value } : dest
      )
    );
  };

  const removeDestination = (id: string) => {
    setDestinations(destinations.filter((dest) => dest.id !== id));
    toast({ title: "Destination Removed" });
  };
  
  const handleSave = () => {
    // Logic to save destinations
    toast({
      title: "Multistreaming Settings Saved",
      description: "Your destinations have been updated.",
    });
    console.log("Saved destinations:", destinations);
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Multistreaming"
        description="Broadcast your live stream to multiple platforms simultaneously."
        icon={Share2}
      />

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>On-Air Webinar Feature</CardTitle>
          <CardDescription>Host webinars for up to 1000 viewers directly on our platform. Unlimited streaming time.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Users className="h-10 w-10 text-primary" />
          <div>
            <p className="text-lg font-semibold">Up to 1000 Viewers</p>
            <p className="text-muted-foreground">Engage a large audience with interactive webinars.</p>
          </div>
           <Wifi className="h-10 w-10 text-primary ml-auto" />
           <div>
            <p className="text-lg font-semibold">Unlimited Streaming</p>
            <p className="text-muted-foreground">No time limits on your broadcasts.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Streaming Destinations</CardTitle>
            <CardDescription>Configure up to 8 RTMP destinations. Current count: {destinations.length}/8.</CardDescription>
          </div>
          <Button onClick={addDestination} disabled={destinations.length >= 8}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Destination
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {destinations.map((dest, index) => (
            <React.Fragment key={dest.id}>
              {index > 0 && <Separator />}
              <div className="p-4 border rounded-lg shadow-sm bg-card/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    {dest.platform === "YouTube" ? <Youtube className="mr-2 h-6 w-6 text-red-500" /> : null}
                    {dest.platform}
                  </h3>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center space-x-2">
                        <Switch
                            id={`enable-${dest.id}`}
                            checked={dest.enabled}
                            onCheckedChange={(checked) => updateDestination(dest.id, "enabled", checked)}
                        />
                        <Label htmlFor={`enable-${dest.id}`}>{dest.enabled ? "Enabled" : "Disabled"}</Label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeDestination(dest.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`platform-${dest.id}`}>Platform Name</Label>
                    <Input
                      id={`platform-${dest.id}`}
                      value={dest.platform}
                      onChange={(e) => updateDestination(dest.id, "platform", e.target.value)}
                      placeholder="e.g., YouTube, Facebook, Twitch"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rtmp-${dest.id}`}>RTMP URL</Label>
                    <Input
                      id={`rtmp-${dest.id}`}
                      value={dest.rtmpUrl}
                      onChange={(e) => updateDestination(dest.id, "rtmpUrl", e.target.value)}
                      placeholder="rtmp://..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`key-${dest.id}`}>Stream Key</Label>
                    <Input
                      id={`key-${dest.id}`}
                      type="password"
                      value={dest.streamKey}
                      onChange={(e) => updateDestination(dest.id, "streamKey", e.target.value)}
                      placeholder="Enter your stream key"
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
           {destinations.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No destinations added yet. Click "Add Destination" to get started.</p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end mt-8">
        <Button size="lg" onClick={handleSave}>Save Destinations</Button>
      </div>
    </div>
  );
}
