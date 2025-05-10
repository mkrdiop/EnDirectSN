
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
        title: "Limite Atteinte",
        description: "Vous pouvez ajouter jusqu'à 8 destinations.",
        variant: "destructive",
      });
      return;
    }
    setDestinations([
      ...destinations,
      { id: `custom${Date.now()}`, platform: "RTMP Personnalisé", streamKey: "", rtmpUrl: "", enabled: false },
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
    toast({ title: "Destination Supprimée" });
  };
  
  const handleSave = () => {
    // Logic to save destinations
    toast({
      title: "Paramètres de Multistreaming Enregistrés",
      description: "Vos destinations ont été mises à jour.",
    });
    console.log("Destinations enregistrées:", destinations);
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Multistreaming"
        description="Diffusez votre stream en direct sur plusieurs plateformes simultanément."
        icon={Share2}
      />

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Fonctionnalité Webinaire "En Direct"</CardTitle>
          <CardDescription>Organisez des webinaires jusqu'à 1000 spectateurs directement sur notre plateforme. Temps de streaming illimité.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Users className="h-10 w-10 text-primary" />
          <div>
            <p className="text-lg font-semibold">Jusqu'à 1000 Spectateurs</p>
            <p className="text-muted-foreground">Engagez un large public avec des webinaires interactifs.</p>
          </div>
           <Wifi className="h-10 w-10 text-primary ml-auto" />
           <div>
            <p className="text-lg font-semibold">Streaming Illimité</p>
            <p className="text-muted-foreground">Aucune limite de temps pour vos diffusions.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Destinations de Streaming</CardTitle>
            <CardDescription>Configurez jusqu'à 8 destinations RTMP. Nombre actuel : {destinations.length}/8.</CardDescription>
          </div>
          <Button onClick={addDestination} disabled={destinations.length >= 8}>
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Destination
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
                        <Label htmlFor={`enable-${dest.id}`}>{dest.enabled ? "Activé" : "Désactivé"}</Label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeDestination(dest.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`platform-${dest.id}`}>Nom de la Plateforme</Label>
                    <Input
                      id={`platform-${dest.id}`}
                      value={dest.platform}
                      onChange={(e) => updateDestination(dest.id, "platform", e.target.value)}
                      placeholder="ex: YouTube, Facebook, Twitch"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rtmp-${dest.id}`}>URL RTMP</Label>
                    <Input
                      id={`rtmp-${dest.id}`}
                      value={dest.rtmpUrl}
                      onChange={(e) => updateDestination(dest.id, "rtmpUrl", e.target.value)}
                      placeholder="rtmp://..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`key-${dest.id}`}>Clé de Stream</Label>
                    <Input
                      id={`key-${dest.id}`}
                      type="password"
                      value={dest.streamKey}
                      onChange={(e) => updateDestination(dest.id, "streamKey", e.target.value)}
                      placeholder="Entrez votre clé de stream"
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
           {destinations.length === 0 && (
            <p className="text-muted-foreground text-center py-4">Aucune destination ajoutée pour le moment. Cliquez sur "Ajouter une Destination" pour commencer.</p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end mt-8">
        <Button size="lg" onClick={handleSave}>Enregistrer les Destinations</Button>
      </div>
    </div>
  );
}
