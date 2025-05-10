
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, UploadCloud, Video } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createHighlightReel, CreateHighlightReelInput, CreateHighlightReelOutput } from "@/ai/flows/create-highlight-reel";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  streamDataUri: z.string().min(1, "Le fichier vidéo du stream est requis."),
  viewerEngagementData: z.string().min(1, "Les données d'engagement des spectateurs sont requises."),
  keyEventsData: z.string().min(1, "Les données des événements clés sont requises."),
});

type FormData = z.infer<typeof formSchema>;

export default function AiHighlightsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CreateHighlightReelOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
      // Max 10MB for demo
      if (file.size > 10 * 1024 * 1024) {
         toast({
          title: "Fichier Trop Volumineux",
          description: "Veuillez sélectionner un fichier vidéo de moins de 10Mo pour cette démo.",
          variant: "destructive",
        });
        return;
      }

      setFileName(file.name);
      setIsLoading(true); 
      setProgress(0);
      
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
         toast({ title: "Fichier Prêt", description: `${file.name} a été préparé.` });
      };
      reader.onerror = () => {
        setIsLoading(false);
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
        currentProgress += 10;
        if (currentProgress <= 90) { 
          setProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 300);

      const response = await createHighlightReel(data as CreateHighlightReelInput);
      clearInterval(progressInterval);
      setProgress(100);
      setResult(response);
      toast({
        title: "Moments Forts Générés !",
        description: "Vos moments forts générés par IA sont prêts.",
      });
    } catch (error) {
      console.error("Erreur lors de la génération des moments forts :", error);
      clearInterval(progressInterval);
      setProgress(0);
      toast({
        title: "Erreur",
        description: "Échec de la génération des moments forts. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Générateur de Moments Forts IA"
        description="Créez automatiquement des extraits captivants de vos diffusions en direct grâce à l'IA."
        icon={Sparkles}
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Créer de Nouveaux Moments Forts</CardTitle>
          <CardDescription>
            Téléversez la vidéo de votre stream et fournissez les données d'engagement pour commencer.
            Pour la démo, veuillez utiliser des fichiers vidéo de petite taille (ex: moins de 10Mo).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="stream-video" className="block text-sm font-medium mb-1">Fichier Vidéo du Stream</Label>
              <Input
                id="stream-video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                disabled={isLoading}
              />
              {fileName && <p className="text-sm text-muted-foreground mt-1">Sélectionné : {fileName}</p>}
              {errors.streamDataUri && <p className="text-sm text-destructive mt-1">{errors.streamDataUri.message}</p>}
            </div>

            <div>
              <Label htmlFor="viewerEngagementData">Données d'Engagement des Spectateurs</Label>
              <Textarea
                id="viewerEngagementData"
                {...register("viewerEngagementData")}
                placeholder="ex: Logs de chat, pics d'audience, réactions des utilisateurs..."
                rows={4}
                disabled={isLoading}
              />
              {errors.viewerEngagementData && <p className="text-sm text-destructive mt-1">{errors.viewerEngagementData.message}</p>}
            </div>

            <div>
              <Label htmlFor="keyEventsData">Données des Événements Clés</Label>
              <Textarea
                id="keyEventsData"
                {...register("keyEventsData")}
                placeholder="ex: Horodatages des moments importants, notes de l'orateur, sujets discutés..."
                rows={4}
                disabled={isLoading}
              />
              {errors.keyEventsData && <p className="text-sm text-destructive mt-1">{errors.keyEventsData.message}</p>}
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <Label>{progress < 100 && progress > 0 && fileName ? `Lecture de ${fileName}...` : 'Traitement par IA...'}</Label>
                <Progress value={progress} className="w-full" />
                 <p className="text-sm text-muted-foreground text-center">
                   {fileName && progress < 100 && progress > 0 ? `Préparation de ${fileName}...` : "L'IA fait sa magie. Cela peut prendre quelques instants..."}
                 </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Génération en cours..." : "Générer les Moments Forts"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Video className="h-6 w-6 text-primary"/> Moments Forts Prêts !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Résumé :</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold">Vidéo Générée :</h3>
              {result.highlightReelDataUri.startsWith("data:video") ? (
                <video controls src={result.highlightReelDataUri} className="w-full max-w-md rounded-md border mt-2 shadow-md" />
              ) : (
                 <p className="text-muted-foreground">Impossible d'afficher l'aperçu vidéo. <a href={result.highlightReelDataUri} download="moments_forts.mp4" className="text-primary hover:underline">Télécharger la Vidéo</a></p>
              )}
               <Button asChild variant="outline" className="mt-2">
                 <a href={result.highlightReelDataUri} download="moments_forts.mp4">Télécharger la Vidéo</a>
               </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
