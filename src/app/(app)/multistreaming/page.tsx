
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Share2, Youtube, PlusCircle, Trash2, UploadCloud, Link2, Users, Globe } from "lucide-react"; // Added Globe
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface DistributionPlatform {
  id: string;
  name: string; // e.g., Spotify, Apple Music, YouTube Music, Zikcut internal
  type: "streaming_service" | "social_media" | "zikcut_exclusive";
  linkOrId: string; // Link to profile or an ID for internal services
  enabled: boolean;
}

const initialPlatforms: DistributionPlatform[] = [
  { id: "zikcut1", name: "Zikcut (Exclusif)", type: "zikcut_exclusive", linkOrId: "Par défaut sur Zikcut", enabled: true },
  { id: "youtube1", name: "YouTube Music", type: "streaming_service", linkOrId: "", enabled: false },
];

export default function DistributionToolsPage() { // Renamed component
  const [platforms, setPlatforms] = useState<DistributionPlatform[]>(initialPlatforms);
  const [releaseTitle, setReleaseTitle] = useState("Mon Nouveau Single");
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [distributionNotes, setDistributionNotes] = useState("");

  const { toast } = useToast();

  const addPlatform = () => {
    if (platforms.length >= 8) { // Example limit
      toast({
        title: "Limite Atteinte",
        description: "Vous pouvez configurer jusqu'à 8 plateformes de distribution.",
        variant: "destructive",
      });
      return;
    }
    setPlatforms([
      ...platforms,
      { id: `custom${Date.now()}`, name: "Nouveau Service", type: "streaming_service", linkOrId: "", enabled: false },
    ]);
  };

  const updatePlatform = (id: string, field: keyof DistributionPlatform, value: string | boolean) => {
    setPlatforms(
      platforms.map((plat) =>
        plat.id === id ? { ...plat, [field]: value } : plat
      )
    );
  };

  const removePlatform = (id: string) => {
    if (id === "zikcut1") {
        toast({ title: "Action Non Autorisée", description: "La distribution sur Zikcut est activée par défaut.", variant: "destructive"});
        return;
    }
    setPlatforms(platforms.filter((plat) => plat.id !== id));
    toast({ title: "Plateforme Supprimée" });
  };
  
  const handleSaveDistribution = () => {
    toast({
      title: "Paramètres de Distribution Enregistrés",
      description: `La distribution pour "${releaseTitle}" a été mise à jour.`,
    });
    console.log("Distribution Settings:", { releaseTitle, releaseDate, distributionNotes, platforms });
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Outils de Distribution & Partage"
        description="Gérez où et comment votre musique est distribuée. Planifiez vos sorties et partagez avec votre audience."
        icon={Share2}
      />

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Planification de Sortie</CardTitle>
          <CardDescription>Configurez les détails de votre prochaine sortie musicale.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label htmlFor="releaseTitle">Titre de la Sortie (Single/Album)</Label>
                <Input id="releaseTitle" value={releaseTitle} onChange={(e) => setReleaseTitle(e.target.value)} placeholder="Ex: Mon Album Incroyable" />
            </div>
            <div>
                <Label htmlFor="releaseDate">Date de Sortie Prévue</Label>
                <Input id="releaseDate" type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
            </div>
             <div>
                <Label htmlFor="distributionNotes">Notes pour la Distribution (Optionnel)</Label>
                <Textarea id="distributionNotes" value={distributionNotes} onChange={(e) => setDistributionNotes(e.target.value)} placeholder="Ex: Exclusivité temporaire, régions ciblées, etc." rows={3}/>
            </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Plateformes de Distribution</CardTitle>
            <CardDescription>Choisissez où votre musique sera disponible. Actuellement configurées : {platforms.length}.</CardDescription>
          </div>
          <Button onClick={addPlatform} disabled={platforms.length >= 8}>
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Plateforme
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {platforms.map((plat, index) => (
            <React.Fragment key={plat.id}>
              {index > 0 && <Separator />}
              <div className="p-4 border rounded-lg shadow-sm bg-card/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    {plat.type === "streaming_service" && plat.name.toLowerCase().includes("youtube") ? <Youtube className="mr-2 h-6 w-6 text-red-500" /> : <Globe className="mr-2 h-6 w-6 text-primary" />}
                    {plat.name}
                  </h3>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center space-x-2">
                        <Switch
                            id={`enable-${plat.id}`}
                            checked={plat.enabled}
                            onCheckedChange={(checked) => updatePlatform(plat.id, "enabled", checked)}
                            disabled={plat.id === "zikcut1"} // Zikcut default cannot be disabled by user
                        />
                        <Label htmlFor={`enable-${plat.id}`}>{plat.enabled ? "Activé" : "Désactivé"}</Label>
                    </div>
                    {plat.id !== "zikcut1" && (
                        <Button variant="ghost" size="icon" onClick={() => removePlatform(plat.id)} className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`platform-name-${plat.id}`}>Nom de la Plateforme</Label>
                    <Input
                      id={`platform-name-${plat.id}`}
                      value={plat.name}
                      onChange={(e) => updatePlatform(plat.id, "name", e.target.value)}
                      placeholder="Ex: Spotify, Apple Music, Deezer"
                      disabled={plat.id === "zikcut1"}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`platform-link-${plat.id}`}>{plat.type === "zikcut_exclusive" ? "Statut" : "Lien Profil/ID Artiste"}</Label>
                    <Input
                      id={`platform-link-${plat.id}`}
                      value={plat.linkOrId}
                      onChange={(e) => updatePlatform(plat.id, "linkOrId", e.target.value)}
                      placeholder={plat.type === "zikcut_exclusive" ? "" : "https://... ou ID artiste"}
                      disabled={plat.id === "zikcut1"}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
           {platforms.length === 0 && ( // Should not happen with Zikcut default
            <p className="text-muted-foreground text-center py-4">Aucune plateforme configurée. Cliquez sur "Ajouter une Plateforme".</p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end mt-8">
        <Button size="lg" onClick={handleSaveDistribution}>Enregistrer la Configuration de Distribution</Button>
      </div>
    </div>
  );
}
