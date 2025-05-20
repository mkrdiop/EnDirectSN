
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText as AiLyricsIcon, MessageSquareText, Wand2 } from "lucide-react"; // Renamed Languages to FileText, added Wand2
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// TODO: Rename flow and types once AI flow is refactored
import { liveTranslateStream as generateLyrics, LiveTranslateStreamInput as GenerateLyricsInput, LiveTranslateStreamOutput as GenerateLyricsOutput } from "@/ai/flows/live-translate-stream";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const lyricLanguages = [
  { code: "fr", name: "Français" },
  { code: "en", name: "Anglais" },
  { code: "wo", name: "Wolof" },
  { code: "es", name: "Espagnol" },
  { code: "pt", name: "Portugais" },
];
const lyricStyles = ["Poétique", "Narratif", "Abstrait", "Engagé", "Festif", "Introspectif"];
const lyricMoods = ["Joyeux", "Triste", "Colérique", "Amoureux", "Nostalgique", "Plein d'espoir"];

const formSchema = z.object({
  topicOrTheme: z.string().min(5, "Le sujet ou thème est requis (min 5 caractères)."),
  lyricStyle: z.string().min(1, "Veuillez sélectionner un style de paroles."),
  mood: z.string().min(1, "Veuillez sélectionner une ambiance pour les paroles."),
  language: z.string().min(1, "La langue des paroles est requise."),
  keywords: z.string().optional().describe("Mots-clés ou phrases à inclure."),
});

type FormData = z.infer<typeof formSchema>;

export default function AiLyricsAssistantPage() { // Renamed component
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0); // Renamed progress
  const [generatedLyricsText, setGeneratedLyricsText] = useState<string | null>(null); // Renamed translatedText
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "fr",
      lyricStyle: lyricStyles[0],
      mood: lyricMoods[0],
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgressValue(0);
    setGeneratedLyricsText(null);
    try {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 20; 
        if (currentProgress <= 80) {
          setProgressValue(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 100);

      // Adapt input for lyrics generation
      // The existing flow `liveTranslateStream` expects `spokenText` and `targetLanguage`.
      // We will map our new form data to these.
      const promptForLyrics = `Écris des paroles de chanson sur le thème: "${data.topicOrTheme}". Style: ${data.lyricStyle}. Ambiance: ${data.mood}. ${data.keywords ? `Mots-clés à inclure: ${data.keywords}.` : ''}`;
      const aiInput: GenerateLyricsInput = {
        spokenText: promptForLyrics, // This will be the detailed prompt for lyrics
        targetLanguage: data.language, // This will be the language of the lyrics
      };

      const response: GenerateLyricsOutput = await generateLyrics(aiInput);
      clearInterval(progressInterval);
      setProgressValue(100);
      setGeneratedLyricsText(response.translatedText); // translatedText will now hold lyrics
      toast({
        title: "Paroles Générées !",
        description: `Des paroles en ${lyricLanguages.find(l => l.code === data.language)?.name || data.language} ont été suggérées.`,
      });
    } catch (error) {
      console.error("Erreur lors de la génération des paroles :", error);
      clearInterval(progressInterval);
      setProgressValue(0);
      toast({
        title: "Erreur de Génération",
        description: "Échec de la génération des paroles. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Assistant Paroles IA Zikcut"
        description="Laissez l'IA vous aider à écrire des paroles percutantes pour vos chansons. Définissez le thème, le style, l'ambiance et la langue."
        icon={AiLyricsIcon} // Changed icon
      />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Générer des Paroles</CardTitle>
            <CardDescription>Entrez les détails pour que l'IA compose des paroles pour vous.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="topicOrTheme">Sujet ou Thème Principal</Label>
                <Input
                  id="topicOrTheme"
                  {...register("topicOrTheme")}
                  placeholder="Ex: L'amour à Dakar, la vie d'artiste, un message d'espoir..."
                  disabled={isLoading}
                />
                {errors.topicOrTheme && <p className="text-sm text-destructive mt-1">{errors.topicOrTheme.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lyricStyle">Style des Paroles</Label>
                  <Controller
                    name="lyricStyle"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <SelectTrigger id="lyricStyle"><SelectValue placeholder="Choisir un style..." /></SelectTrigger>
                        <SelectContent>
                          {lyricStyles.map((style) => <SelectItem key={style} value={style}>{style}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.lyricStyle && <p className="text-sm text-destructive mt-1">{errors.lyricStyle.message}</p>}
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
                          {lyricMoods.map((mood) => <SelectItem key={mood} value={mood}>{mood}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.mood && <p className="text-sm text-destructive mt-1">{errors.mood.message}</p>}
                </div>
              </div>
              
              <div>
                <Label htmlFor="language">Langue des Paroles</Label>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <SelectTrigger id="language"><SelectValue placeholder="Sélectionnez la langue" /></SelectTrigger>
                      <SelectContent>
                        {lyricLanguages.map((lang) => <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.language && <p className="text-sm text-destructive mt-1">{errors.language.message}</p>}
              </div>

               <div>
                <Label htmlFor="keywords">Mots-clés ou Phrases à Inclure (Optionnel)</Label>
                <Input
                  id="keywords"
                  {...register("keywords")}
                  placeholder="Ex: teranga, soleil, espoir, yoff"
                  disabled={isLoading}
                />
              </div>


              {isLoading && (
                <div className="space-y-2">
                  <Label>Génération des paroles en cours...</Label>
                  <Progress value={progressValue} className="w-full" />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isLoading ? "Génération..." : "Générer les Paroles"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText className="h-6 w-6 text-primary" /> Paroles Suggérées par l'IA
            </CardTitle>
            <CardDescription>Les paroles générées par l'IA apparaîtront ici. N'hésitez pas à les éditer et les adapter.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] bg-muted/30 p-4 rounded-md border">
            {generatedLyricsText ? (
              <Textarea value={generatedLyricsText} readOnly rows={15} className="whitespace-pre-wrap text-foreground font-mono text-sm" />
            ) : (
              <p className="text-muted-foreground">
                {isLoading ? "L'IA écrit pour vous..." : "Entrez les informations et cliquez sur générer pour voir les suggestions de paroles."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
