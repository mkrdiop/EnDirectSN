
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Languages, MessageSquareText } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { liveTranslateStream, LiveTranslateStreamInput, LiveTranslateStreamOutput } from "@/ai/flows/live-translate-stream";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  spokenText: z.string().min(1, "Le texte parlé est requis."),
  targetLanguage: z.string().min(1, "La langue cible est requise."),
});

type FormData = z.infer<typeof formSchema>;

const supportedLanguages = [
  { code: "en", name: "Anglais" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Espagnol" },
  { code: "de", name: "Allemand" },
  { code: "pt", name: "Portugais" },
  { code: "wo", name: "Wolof" },
  { code: "ar", name: "Arabe" },
  { code: "zh", name: "Chinois (Simplifié)" },
];

export default function AiTranslationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetLanguage: "fr", 
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgress(0);
    setTranslatedText(null);
    try {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 20; 
        if (currentProgress <= 80) {
          setProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 100);

      const response: LiveTranslateStreamOutput = await liveTranslateStream(data as LiveTranslateStreamInput);
      clearInterval(progressInterval);
      setProgress(100);
      setTranslatedText(response.translatedText);
      toast({
        title: "Traduction Réussie !",
        description: `Texte traduit en ${supportedLanguages.find(l => l.code === data.targetLanguage)?.name || data.targetLanguage}.`,
      });
    } catch (error) {
      console.error("Erreur lors de la traduction du texte :", error);
      clearInterval(progressInterval);
      setProgress(0);
      toast({
        title: "Erreur",
        description: "Échec de la traduction du texte. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Traduction IA en Direct"
        description="Traduisez en temps réel le texte parlé de votre stream."
        icon={Languages}
      />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Traduire du Texte</CardTitle>
            <CardDescription>Entrez le texte à traduire et sélectionnez la langue cible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="spokenText">Texte à Traduire (Discours de l'hôte)</Label>
                <Textarea
                  id="spokenText"
                  {...register("spokenText")}
                  placeholder="Entrez le texte parlé par l'hôte..."
                  rows={5}
                  disabled={isLoading}
                />
                {errors.spokenText && <p className="text-sm text-destructive mt-1">{errors.spokenText.message}</p>}
              </div>

              <div>
                <Label htmlFor="targetLanguage">Langue Cible</Label>
                <Controller
                  name="targetLanguage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <SelectTrigger id="targetLanguage">
                        <SelectValue placeholder="Sélectionnez la langue" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedLanguages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.targetLanguage && <p className="text-sm text-destructive mt-1">{errors.targetLanguage.message}</p>}
              </div>

              {isLoading && (
                <div className="space-y-2">
                  <Label>Traduction en cours...</Label>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Traduction..." : "Traduire"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText className="h-6 w-6 text-primary" /> Texte Traduit
            </CardTitle>
            <CardDescription>Le texte traduit apparaîtra ici.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] bg-muted/30 p-4 rounded-md border">
            {translatedText ? (
              <p className="whitespace-pre-wrap text-foreground">{translatedText}</p>
            ) : (
              <p className="text-muted-foreground">
                {isLoading ? "Traduction en cours..." : "Entrez du texte et cliquez sur traduire pour voir le résultat."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
