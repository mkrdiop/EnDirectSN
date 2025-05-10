
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, UploadCloud, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FilePreview {
  name: string;
  url: string;
  type: "image" | "video";
}

export default function StreamingSettingsPage() {
  const [resolution, setResolution] = useState("1080p");
  const [recordingQuality, setRecordingQuality] = useState("4k");
  const [logo, setLogo] = useState<FilePreview | null>(null);
  const [overlay, setOverlay] = useState<FilePreview | null>(null);
  const [background, setBackground] = useState<FilePreview | null>(null);
  const { toast } = useToast();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<FilePreview | null>>,
    fileType: "image" | "video"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if ((fileType === "image" && !file.type.startsWith("image/")) || 
          (fileType === "video" && !file.type.startsWith("video/"))) {
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
    // Handle form submission logic, e.g., save settings to backend
    toast({
      title: "Paramètres Enregistrés",
      description: "Vos paramètres de streaming ont été mis à jour avec succès.",
    });
    console.log({ resolution, recordingQuality, logo, overlay, background });
  };

  const FileUploadCard = ({
    title,
    description,
    currentFile,
    onFileChange,
    accept,
    fileType,
    dataAiHint,
  }: {
    title: string;
    description: string;
    currentFile: FilePreview | null;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
    fileType: "image" | "video";
    dataAiHint: string;
  }) => (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
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
                <Image src={currentFile.url} alt={title} width={100} height={50} className="mt-1 rounded-md object-contain" data-ai-hint={dataAiHint} />
              )}
              {currentFile.type === "video" && (
                <video src={currentFile.url} controls width="100" className="mt-1 rounded-md" data-ai-hint={dataAiHint}></video>
              )}
            </div>
          ) : (
             <Image src={`https://picsum.photos/seed/${title}/200/100`} alt="Placeholder" width={100} height={50} className="mt-1 rounded-md object-contain opacity-50" data-ai-hint={dataAiHint} />
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Configuration du Streaming"
        description="Personnalisez la qualité et l'apparence de votre stream."
        icon={Settings}
      />
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Qualité du Stream</CardTitle>
            <CardDescription>Définissez la qualité de votre streaming en direct et de vos enregistrements.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resolution">Résolution de Streaming (Max)</Label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger id="resolution">
                  <SelectValue placeholder="Sélectionnez la résolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                  <SelectItem value="720p">HD (720p)</SelectItem>
                  <SelectItem value="480p">SD (480p)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recording-quality">Qualité d'Enregistrement Local</Label>
              <Select value={recordingQuality} onValueChange={setRecordingQuality}>
                <SelectTrigger id="recording-quality">
                  <SelectValue placeholder="Sélectionnez la qualité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4k">4K</SelectItem>
                  <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                  <SelectItem value="720p">HD (720p)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div>
          <h2 className="text-2xl font-semibold mb-1">Personnalisation</h2>
          <p className="text-muted-foreground mb-6">Ajoutez les éléments de votre marque au stream.</p>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <FileUploadCard
              title="Logo"
              description="Téléversez le logo de votre marque (PNG, JPG, max 2Mo)."
              currentFile={logo}
              onFileChange={(e) => handleFileChange(e, setLogo, "image")}
              accept="image/png, image/jpeg"
              fileType="image"
              dataAiHint="brand logo"
            />
            <FileUploadCard
              title="Superposition"
              description="Téléversez une superposition personnalisée (PNG, max 5Mo)."
              currentFile={overlay}
              onFileChange={(e) => handleFileChange(e, setOverlay, "image")}
              accept="image/png"
              fileType="image"
              dataAiHint="stream overlay"
            />
            <FileUploadCard
              title="Image/Vidéo d'Arrière-plan"
              description="Définissez un arrière-plan pour les écrans d'attente ou les intros (JPG, PNG, MP4, max 10Mo)."
              currentFile={background}
              onFileChange={(e) => handleFileChange(e, setBackground, "video")} 
              accept="image/png, image/jpeg, video/mp4"
              fileType="video" 
              dataAiHint="stream background"
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg">Enregistrer les Paramètres</Button>
        </div>
      </form>
    </div>
  );
}
