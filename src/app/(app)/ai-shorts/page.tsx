
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Film, UploadCloud, Wand2, TagsIcon, FileTextIcon } from "lucide-react"; // Replaced Scissors with Wand2
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// TODO: Rename flow and types once AI flow is refactored
import { createShortFormVideo as generateMusicVideo, CreateShortFormVideoInput as GenerateMusicVideoInput, CreateShortFormVideoOutput as GenerateMusicVideoOutput } from "@/ai/flows/create-short-form-video";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const videoStyles = ["Cinématique", "Animé (cartoon)", "Minimaliste", "Psychédélique", "Néon Urbain", "Nature Abstraite"];
const videoAspectRatios = [
  { value: "9:16", label: "Vertical (9:16 - TikTok, Reels, Shorts)" },
  { value: "1:1", label: "Carré (1:1 - Instagram Post)" },
  { value: "16:9", label: "Horizontal (16:9 - YouTube Standard)" },
  { value: "4:3", label: "Classique (4:3)" },
];

const formSchema = z.object({
  audioDataUri: z.string().min(1, "Le fichier audio de la piste est requis."),
  visualTheme: z.string().min(3, "Un thème visuel ou une description est requise."),
  videoStyle: z.string().min(1, "Veuillez sélectionner un style vidéo."),
  videoAspectRatio: z.string().min(1, "Le format d'image est requis."),
  additionalContext: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AiVideoGenerationPage() { // Renamed component
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0); // Renamed progress
  const [result, setResult] = useState<GenerateMusicVideoOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoStyle: videoStyles[0],
      videoAspectRatio: "9:16",
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("audio/")) { // Expecting audio input
        toast({
          title: "Type de Fichier Invalide",
          description: "Veuillez sélectionner un fichier audio (MP3, WAV, etc.).",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 20 * 1024 * 1024) { 
         toast({
          title: "Fichier Audio Trop Volumineux",
          description: "Veuillez sélectionner un fichier audio de moins de 20Mo pour cette démo.",
          variant: "destructive",
        });
        return;
      }

      setFileName(file.name);
      setIsLoading(true); 
      setProgressValue(0);
      setResult(null);
      
      const reader = new FileReader();
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentage = Math.round((event.loaded * 100) / event.total);
          setProgressValue(percentage);
        }
      };
      reader.onloadend = () => {
        setValue("audioDataUri", reader.result as string);
        setIsLoading(false);
        setProgressValue(100);
         toast({ title: "Fichier Audio Prêt", description: `${file.name} a été préparé pour la génération du clip.` });
      };
      reader.onerror = () => {
        setIsLoading(false);
        setProgressValue(0);
        toast({ title: "Erreur de Lecture du Fichier Audio", description: "Impossible de lire le fichier audio sélectionné.", variant: "destructive" });
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgressValue(0); 
    setResult(null);
    try {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5;
        if (currentProgress <= 95) { 
          setProgressValue(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 500);

      // Adapt input for the new music video generation paradigm
      // The existing flow `createShortFormVideo` expects `streamDataUri`, `desiredDurationSeconds`.
      // We need to map our new form data. `streamDataUri` becomes `audioDataUri`.
      // `desiredDurationSeconds` could be derived from audio or set, for now, let's assume the flow handles it or it's fixed.
      const aiInput: GenerateMusicVideoInput = {
        streamDataUri: data.audioDataUri, // This is now the audio track
        desiredDurationSeconds: 60, // Placeholder, ideally derived from audio or set by user
        videoAspectRatio: data.videoAspectRatio,
        additionalContext: `Thème visuel: ${data.visualTheme}. Style vidéo: ${data.videoStyle}. ${data.additionalContext || ''}`,
      };

      const response = await generateMusicVideo(aiInput);
      clearInterval(progressInterval);
      setProgressValue(100);
      setResult(response);
      toast({
        title: "Clip Vidéo Généré !",
        description: "Votre clip vidéo généré par IA est prêt.",
      });
    } catch (error) {
      console.error("Erreur lors de la génération du clip vidéo :", error);
      clearInterval(progressInterval);
      setProgressValue(0);
      toast({
        title: "Erreur de Génération Vidéo",
        description: "Échec de la génération du clip vidéo. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Générateur de Clips Vidéo IA"
        description="Créez des clips vidéo uniques pour votre musique. Téléversez votre piste audio, décrivez l'ambiance visuelle et laissez l'IA Zikcut opérer sa magie."
        icon={Film} // Changed icon
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Créer un Nouveau Clip Vidéo</CardTitle>
          <CardDescription>
            Téléversez votre piste audio, décrivez le thème visuel, choisissez vos préférences, et laissez l'IA créer un clip.
            Utilisez des fichiers audio de moins de 20Mo pour la démo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="audio-file" className="block text-sm font-medium mb-1">Fichier Audio de la Piste</Label>
              <Input
                id="audio-file"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                disabled={isLoading}
              />
              {fileName && <p className="text-sm text-muted-foreground mt-1">Piste audio sélectionnée : {fileName}</p>}
              {errors.audioDataUri && <p className="text-sm text-destructive mt-1">{errors.audioDataUri.message}</p>}
            </div>

            <div>
              <Label htmlFor="visualTheme">Thème Visuel / Description du Clip</Label>
              <Textarea
                id="visualTheme"
                {...register("visualTheme")}
                placeholder="Ex: Voyage psychédélique dans l'espace, ambiance urbaine nocturne à Dakar, histoire d'amour animée en noir et blanc..."
                rows={3}
                disabled={isLoading}
              />
              {errors.visualTheme && <p className="text-sm text-destructive mt-1">{errors.visualTheme.message}</p>}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="videoStyle">Style Vidéo</Label>
                    <Controller
                        name="videoStyle"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                <SelectTrigger id="videoStyle">
                                <SelectValue placeholder="Sélectionnez un style" />
                                </SelectTrigger>
                                <SelectContent>
                                {videoStyles.map((style) => (
                                    <SelectItem key={style} value={style}>
                                    {style}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.videoStyle && <p className="text-sm text-destructive mt-1">{errors.videoStyle.message}</p>}
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
              <Label htmlFor="additionalContext">Instructions Spécifiques (Optionnel)</Label>
              <Textarea
                id="additionalContext"
                {...register("additionalContext")}
                placeholder="Ex: Mettre l'accent sur le refrain, inclure des images de nature, éviter les visages humains..."
                rows={3}
                disabled={isLoading}
              />
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <Label>{progressValue < 100 && progressValue > 0 && fileName ? `Préparation de ${fileName}...` : 'Génération du clip vidéo par IA...'}</Label>
                <Progress value={progressValue} className="w-full" />
                 <p className="text-sm text-muted-foreground text-center">
                   {fileName && progressValue < 100 && progressValue > 0 ? `Analyse de ${fileName} pour la création du clip...` : "L'IA assemble votre clip vidéo. Cela peut prendre un moment..."}
                 </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !fileName}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? "Génération en Cours..." : "Générer le Clip Vidéo"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Film className="h-6 w-6 text-primary"/> Clip Vidéo Prêt !</CardTitle>
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
                <video controls src={result.shortVideoDataUri} className="w-full max-w-md mx-auto rounded-md border mt-2 shadow-md" style={{aspectRatio: result.shortVideoDataUri.includes("9:16") ? "9/16" : "16/9"}} />
              ) : (
                 <p className="text-destructive mt-1">Impossible d'afficher l'aperçu vidéo. L'URI de données est invalide ou manquant.</p>
              )}
               <Button asChild variant="default" className="mt-4 w-full max-w-sm mx-auto block" disabled={!result.shortVideoDataUri || !result.shortVideoDataUri.startsWith("data:video")}>
                 <a href={result.shortVideoDataUri} download={`clip_video_ia_${Date.now()}.mp4`}>Télécharger le Clip Vidéo</a>
               </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
