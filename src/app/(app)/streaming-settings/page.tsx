
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, UploadCloud, Palette as ImageIcon, Music2 as VideoIcon } from "lucide-react"; // Renamed icons
import Image from "next/image";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface FilePreview {
  name: string;
  url: string;
  type: "image" | "audio"; // Changed video to audio
}

export default function ProjectSettingsPage() { // Renamed component
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [audioQuality, setAudioQuality] = useState("lossless"); // Example audio setting
  const [coverArt, setCoverArt] = useState<FilePreview | null>(null);
  const [mainAudioFile, setMainAudioFile] = useState<FilePreview | null>(null); // For main track
  const [instrumentalFile, setInstrumentalFile] = useState<FilePreview | null>(null); // Optional instrumental
  const { toast } = useToast();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<FilePreview | null>>,
    fileType: "image" | "audio"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if ((fileType === "image" && !file.type.startsWith("image/")) || 
          (fileType === "audio" && !file.type.startsWith("audio/"))) {
        toast({
          title: "Type de Fichier Invalide",
          description: `Veuillez sélectionner un fichier ${fileType} valide.`,
          variant: "destructive",
        });
        return;
      }
      setter({ name: file.name, url: URL.createObjectURL(file), type: fileType });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Paramètres du Projet Enregistrés",
      description: `Les paramètres pour "${projectName || 'Nouveau Projet'}" ont été mis à jour.`,
    });
    console.log({ projectName, projectDescription, audioQuality, coverArt, mainAudioFile, instrumentalFile });
  };

  const FileUploadCard = ({
    title,
    description,
    currentFile,
    onFileChange,
    accept,
    fileType,
    dataAiHint,
    icon: IconComponent,
  }: {
    title: string;
    description: string;
    currentFile: FilePreview | null;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
    fileType: "image" | "audio";
    dataAiHint: string;
    icon: React.ElementType;
  }) => (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2"><IconComponent className="h-5 w-5 text-primary"/> {title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor={`${title.toLowerCase().replace(/\s+/g, "-")}-upload`} className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:border-primary transition-colors">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Cliquez pour téléverser ou glissez-déposez</span>
          </Label>
          <Input id={`${title.toLowerCase().replace(/\s+/g, "-")}-upload`} type="file" className="hidden" accept={accept} onChange={onFileChange} />
          {currentFile ? (
            <div className="mt-2 p-2 border rounded-md">
              <p className="text-sm font-medium truncate">{currentFile.name}</p>
              {currentFile.type === "image" && (
                <Image src={currentFile.url} alt={title} width={100} height={100} className="mt-1 rounded-md object-contain aspect-square" data-ai-hint={dataAiHint} />
              )}
              {currentFile.type === "audio" && (
                <audio src={currentFile.url} controls className="mt-1 rounded-md w-full" data-ai-hint={dataAiHint}></audio>
              )}
            </div>
          ) : (
             <Image src={`https://placehold.co/100x100.png`} alt="Placeholder" width={100} height={100} className="mt-1 rounded-md object-contain opacity-50 aspect-square" data-ai-hint={dataAiHint} />
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Paramètres du Projet Musical"
        description="Configurez les détails de votre projet musical, téléversez vos fichiers et préparez votre sortie."
        icon={SlidersHorizontal} // Changed from Settings
      />
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Informations Générales du Projet</CardTitle>
            <CardDescription>Définissez le nom, la description et la qualité audio de votre projet musical.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="projectName">Nom du Projet/Titre</Label>
              <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Ex: Mon Nouveau Single, Album Révélation" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="audio-quality">Qualité Audio (Encodage)</Label>
              <Select value={audioQuality} onValueChange={setAudioQuality}>
                <SelectTrigger id="audio-quality">
                  <SelectValue placeholder="Sélectionnez la qualité audio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lossless">Lossless (WAV, FLAC)</SelectItem>
                  <SelectItem value="high">Haute Qualité (MP3 320kbps)</SelectItem>
                  <SelectItem value="standard">Standard (MP3 192kbps)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="projectDescription">Description du Projet</Label>
                <Textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Décrivez votre projet, son style, son inspiration..." rows={4} />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div>
          <h2 className="text-2xl font-semibold mb-1">Fichiers du Projet</h2>
          <p className="text-muted-foreground mb-6">Téléversez la pochette, la piste principale et d'autres éléments de votre projet.</p>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <FileUploadCard
              title="Pochette d'Album/Single"
              description="Téléversez l'image de couverture (PNG, JPG, min 1000x1000px)."
              currentFile={coverArt}
              onFileChange={(e) => handleFileChange(e, setCoverArt, "image")}
              accept="image/png, image/jpeg"
              fileType="image"
              dataAiHint="album cover"
              icon={ImageIcon}
            />
            <FileUploadCard
              title="Piste Audio Principale"
              description="Téléversez votre morceau final (WAV, MP3, FLAC)."
              currentFile={mainAudioFile}
              onFileChange={(e) => handleFileChange(e, setMainAudioFile, "audio")}
              accept="audio/wav, audio/mpeg, audio/flac"
              fileType="audio"
              dataAiHint="main audio track"
              icon={VideoIcon} // Re-using VideoIcon as Music2 for consistency with other parts
            />
            <FileUploadCard
              title="Piste Instrumentale (Optionnel)"
              description="Téléversez la version instrumentale de votre morceau."
              currentFile={instrumentalFile}
              onFileChange={(e) => handleFileChange(e, setInstrumentalFile, "audio")} 
              accept="audio/wav, audio/mpeg, audio/flac"
              fileType="audio" 
              dataAiHint="instrumental track"
              icon={VideoIcon} // Re-using VideoIcon as Music2
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg">Enregistrer les Paramètres du Projet</Button>
        </div>
      </form>
    </div>
  );
}
