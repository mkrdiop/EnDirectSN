
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Music2 as AiAudioIcon, UploadCloud, FileAudio, Wand2 } from "lucide-react"; // Renamed icons
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// TODO: Rename flow and types once AI flow is refactored
import { createHighlightReel as generateAudioTrack, CreateHighlightReelInput as GenerateAudioTrackInput, CreateHighlightReelOutput as GenerateAudioTrackOutput } from "@/ai/flows/create-highlight-reel";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const musicGenres = ["Afrobeat", "Mbalax", "Hip Hop", "Soul", "Jazz", "Pop", "Electro", "Acoustic", "Instrumental"];
const musicMoods = ["Joyeux", "Mélancolique", "Énergique", "Calme", "Romantique", "Épique", "Mystérieux"];

// Schema adapted for audio generation
const formSchema = z.object({
  promptText: z.string().min(10, "Un prompt descriptif d'au moins 10 caractères est requis."),
  genre: z.string().min(1, "Veuillez sélectionner un genre musical."),
  mood: z.string().min(1, "Veuillez sélectionner une ambiance."),
  durationSeconds: z.coerce.number().min(15, "La durée minimale est de 15 secondes.").max(300, "La durée maximale est de 300 secondes (5 minutes)."),
  // streamDataUri is no longer needed for text-to-audio
  // viewerEngagementData and keyEventsData are replaced by musical context
});

type FormData = z.infer<typeof formSchema>;

export default function AiAudioGenerationPage() { // Renamed component
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0); // Renamed progress to progressValue
  const [result, setResult] = useState<GenerateAudioTrackOutput | null>(null);
  const { toast } = useToast();

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      durationSeconds: 60,
      genre: musicGenres[0],
      mood: musicMoods[0],
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgressValue(0); 
    setResult(null);
    try {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 90) { 
          setProgressValue(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 300);

      // Adapt input for the new audio generation paradigm
      // The existing flow `createHighlightReel` expects `streamDataUri`, `viewerEngagementData`, `keyEventsData`.
      // We need to map our new form data to these or (ideally) use a new flow.
      // For now, let's simulate by passing text data into the existing fields.
      const aiInput: GenerateAudioTrackInput = {
        streamDataUri: "data:text/plain;base64,ダミー", // Placeholder, as audio is generated from text
        viewerEngagementData: `Genre: ${data.genre}, Ambiance: ${data.mood}, Durée: ${data.durationSeconds}s`,
        keyEventsData: `Prompt: ${data.promptText}`,
      };

      const response = await generateAudioTrack(aiInput);
      clearInterval(progressInterval);
      setProgressValue(100);
      setResult(response);
      toast({
        title: "Piste Audio Générée !",
        description: "Votre piste audio générée par IA est prête.",
      });
    } catch (error) {
      console.error("Erreur lors de la génération de la piste audio :", error);
      clearInterval(progressInterval);
      setProgressValue(0);
      toast({
        title: "Erreur de Génération Audio",
        description: "Échec de la génération de la piste audio. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Générateur de Pistes Audio IA"
        description="Créez des morceaux de musique originaux, des instrumentaux ou des ambiances sonores grâce à l'IA. Décrivez votre idée, choisissez le style, et laissez Zikcut composer."
        icon={AiAudioIcon} // Changed icon
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Composer avec l'IA</CardTitle>
          <CardDescription>
            Décrivez la musique que vous souhaitez créer. Soyez aussi précis que possible pour de meilleurs résultats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="promptText">Votre Idée Musicale (Prompt)</Label>
              <Textarea
                id="promptText"
                {...register("promptText")}
                placeholder="Ex: Une piste Afrobeat entraînante avec des percussions Kora, une basse groovy, pour une ambiance de fête au coucher du soleil..."
                rows={4}
                disabled={isLoading}
              />
              {errors.promptText && <p className="text-sm text-destructive mt-1">{errors.promptText.message}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="genre">Genre Musical</Label>
                <Controller
                    name="genre"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <SelectTrigger id="genre"><SelectValue placeholder="Choisir un genre..." /></SelectTrigger>
                            <SelectContent>
                                {musicGenres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.genre && <p className="text-sm text-destructive mt-1">{errors.genre.message}</p>}
              </div>
              <div>
                <Label htmlFor="mood">Ambiance / Humeur</Label>
                 <Controller
                    name="mood"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <SelectTrigger id="mood"><SelectValue placeholder="Choisir une ambiance..." /></SelectTrigger>
                            <SelectContent>
                                {musicMoods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.mood && <p className="text-sm text-destructive mt-1">{errors.mood.message}</p>}
              </div>
               <div>
                <Label htmlFor="durationSeconds">Durée (secondes)</Label>
                <Input
                    id="durationSeconds"
                    type="number"
                    {...register("durationSeconds")}
                    placeholder="Ex: 60"
                    disabled={isLoading}
                />
                {errors.durationSeconds && <p className="text-sm text-destructive mt-1">{errors.durationSeconds.message}</p>}
              </div>
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <Label>Composition par IA en cours...</Label>
                <Progress value={progressValue} className="w-full" />
                 <p className="text-sm text-muted-foreground text-center">
                   L'IA compose votre musique. Cela peut prendre quelques instants...
                 </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? "Génération en cours..." : "Générer la Piste Audio"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileAudio className="h-6 w-6 text-primary"/> Piste Audio Prête !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Informations (simulées) :</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.summary}</p> {/* summary will contain genre/mood/prompt info for now */}
            </div>
            <div>
              <h3 className="font-semibold">Piste Générée :</h3>
              {/* The current flow output is highlightReelDataUri, which is a video. 
                  This needs to be an audio file for a real audio generation feature.
                  For demo, we'll assume it *could* be audio if the AI flow was changed.
              */}
              {result.highlightReelDataUri.startsWith("data:audio") || result.highlightReelDataUri.startsWith("data:video") ? ( // Temp allow video for mock
                <audio controls src={result.highlightReelDataUri} className="w-full max-w-md rounded-md border mt-2 shadow-md" />
              ) : (
                 <p className="text-muted-foreground">Impossible d'afficher l'aperçu audio. <a href={result.highlightReelDataUri} download="piste_audio_ia.mp3" className="text-primary hover:underline">Télécharger la Piste</a></p>
              )}
               <Button asChild variant="outline" className="mt-2">
                 <a href={result.highlightReelDataUri} download="piste_audio_ia.mp3">Télécharger la Piste</a>
               </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
