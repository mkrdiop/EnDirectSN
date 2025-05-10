
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Film, UploadCloud, Scissors, TagsIcon, FileTextIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createShortFormVideo, CreateShortFormVideoInput, CreateShortFormVideoOutput } from "@/ai/flows/create-short-form-video";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  streamDataUri: z.string().min(1, "Le fichier vidéo du stream est requis."),
  desiredDurationSeconds: z.coerce.number().positive("La durée doit être un nombre positif."),
  videoAspectRatio: z.string().min(1, "Le format d'image est requis."),
  additionalContext: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const videoDurations = [
  { value: 15, label: "15 secondes" },
  { value: 30, label: "30 secondes" },
  { value: 60, label: "60 secondes (1 minute)" },
];

const videoAspectRatios = [
  { value: "9:16", label: "Vertical (9:16 - Shorts, Reels, TikTok)" },
  { value: "1:1", label: "Carré (1:1 - Instagram Post)" },
  { value: "16:9", label: "Horizontal (16:9 - Standard YouTube)" },
  { value: "4:5", label: "Portrait (4:5 - Instagram Post)" },
];

export default function AiShortsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CreateShortFormVideoOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredDurationSeconds: 30,
      videoAspectRatio: "9:16",
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast({
          title: "Type de Fichier Invalide",
          description: "Veuillez sélectionner un fichier vidéo.",
          variant: "destructive",
        });
        return;
      }
      // Max 20MB for demo due to potential processing
      if (file.size > 20 * 1024 * 1024) { 
         toast({
          title: "Fichier Trop Volumineux",
          description: "Veuillez sélectionner un fichier vidéo de moins de 20Mo pour cette démo.",
          variant: "destructive",
        });
        return;
      }

      setFileName(file.name);
      setIsLoading(true); 
      setProgress(0);
      setResult(null);
      
      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded * 100) / event.total);
          setProgress(percentage);
        }
      };
      reader.onloadend = () => {
        setValue("streamDataUri", reader.result as string);
        setIsLoading(false);
        setProgress(100);
         toast({ title: "Fichier Prêt", description: `${file.name} a été préparé pour la génération de la vidéo courte.` });
      };
      reader.onerror = () => {
        setIsLoading(false);
        setProgress(0);
        toast({ title: "Erreur de Lecture du Fichier", description: "Impossible de lire le fichier sélectionné.", variant: "destructive" });
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgress(0); 
    setResult(null);
    try {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5; // Slower increment due to video processing
        if (currentProgress <= 95) { 
          setProgress(currentProgress);
        } else {
          clearInterval(progressInterval); // Stop before 100, final 5% is for actual result
        }
      }, 500); // Longer interval

      const response = await createShortFormVideo(data as CreateShortFormVideoInput);
      clearInterval(progressInterval);
      setProgress(100);
      setResult(response);
      toast({
        title: "Vidéo Courte Générée !",
        description: "Votre vidéo courte générée par IA est prête.",
      });
    } catch (error) {
      console.error("Erreur lors de la génération de la vidéo courte :", error);
      clearInterval(progressInterval);
      setProgress(0);
      toast({
        title: "Erreur de Génération",
        description: "Échec de la génération de la vidéo courte. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Générateur de Vidéos Courtes IA"
        description="Transformez vos longs streams en vidéos courtes et percutantes pour les réseaux sociaux."
        icon={Scissors}
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Créer une Nouvelle Vidéo Courte</CardTitle>
          <CardDescription>
            Téléversez la vidéo de votre stream, choisissez vos préférences, et laissez l'IA créer une vidéo courte optimisée.
            Utilisez des fichiers vidéo de moins de 20Mo pour la démo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="stream-video-shorts" className="block text-sm font-medium mb-1">Fichier Vidéo du Stream Original</Label>
              <Input
                id="stream-video-shorts"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                disabled={isLoading}
              />
              {fileName && <p className="text-sm text-muted-foreground mt-1">Fichier original sélectionné : {fileName}</p>}
              {errors.streamDataUri && <p className="text-sm text-destructive mt-1">{errors.streamDataUri.message}</p>}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="desiredDurationSeconds">Durée Souhaitée</Label>
                    <Controller
                        name="desiredDurationSeconds"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={String(field.value)} disabled={isLoading}>
                                <SelectTrigger id="desiredDurationSeconds">
                                <SelectValue placeholder="Sélectionnez une durée" />
                                </SelectTrigger>
                                <SelectContent>
                                {videoDurations.map((duration) => (
                                    <SelectItem key={duration.value} value={String(duration.value)}>
                                    {duration.label}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.desiredDurationSeconds && <p className="text-sm text-destructive mt-1">{errors.desiredDurationSeconds.message}</p>}
                </div>
                <div>
                    <Label htmlFor="videoAspectRatio">Format d'Image</Label>
                     <Controller
                        name="videoAspectRatio"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                <SelectTrigger id="videoAspectRatio">
                                <SelectValue placeholder="Sélectionnez un format" />
                                </SelectTrigger>
                                <SelectContent>
                                {videoAspectRatios.map((ratio) => (
                                    <SelectItem key={ratio.value} value={ratio.value}>
                                    {ratio.label}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.videoAspectRatio && <p className="text-sm text-destructive mt-1">{errors.videoAspectRatio.message}</p>}
                </div>
            </div>

            <div>
              <Label htmlFor="additionalContext">Contexte ou Instructions (Optionnel)</Label>
              <Textarea
                id="additionalContext"
                {...register("additionalContext")}
                placeholder="ex: Concentrez-vous sur le moment où je parle de X, créez une ambiance humoristique, mettez en avant le produit Y..."
                rows={3}
                disabled={isLoading}
              />
              {errors.additionalContext && <p className="text-sm text-destructive mt-1">{errors.additionalContext.message}</p>}
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <Label>{progress < 100 && progress > 0 && fileName ? `Préparation de ${fileName}...` : 'Génération de la vidéo courte par IA...'}</Label>
                <Progress value={progress} className="w-full" />
                 <p className="text-sm text-muted-foreground text-center">
                   {fileName && progress < 100 && progress > 0 ? `Analyse de ${fileName} pour les meilleurs moments...` : "L'IA assemble votre vidéo courte. Cela peut prendre un moment..."}
                 </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !fileName}>
              <Scissors className="mr-2 h-4 w-4" />
              {isLoading ? "Génération en Cours..." : "Générer la Vidéo Courte"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Film className="h-6 w-6 text-primary"/> Vidéo Courte Prête !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2"><FileTextIcon className="h-5 w-5 text-muted-foreground"/> Description / Titre Suggéré :</h3>
              <p className="text-muted-foreground bg-muted/50 p-3 rounded-md mt-1 whitespace-pre-wrap">{result.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2"><TagsIcon className="h-5 w-5 text-muted-foreground"/> Tags / Hashtags Suggérés :</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {result.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag.startsWith('#') ? tag : `#${tag}`}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Vidéo Générée :</h3>
              {result.shortVideoDataUri && result.shortVideoDataUri.startsWith("data:video") ? (
                <video controls src={result.shortVideoDataUri} className="w-full max-w-sm mx-auto rounded-md border mt-2 shadow-md aspect-[9/16]" />
              ) : (
                 <p className="text-destructive mt-1">Impossible d'afficher l'aperçu vidéo. L'URI de données est invalide ou manquant.</p>
              )}
               <Button asChild variant="default" className="mt-4 w-full max-w-sm mx-auto block" disabled={!result.shortVideoDataUri || !result.shortVideoDataUri.startsWith("data:video")}>
                 <a href={result.shortVideoDataUri} download={`video_courte_ia_${Date.now()}.mp4`}>Télécharger la Vidéo Courte</a>
               </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
