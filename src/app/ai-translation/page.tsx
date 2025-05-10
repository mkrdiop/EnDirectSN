"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Languages, MessageSquareText } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { liveTranslateStream, LiveTranslateStreamInput, LiveTranslateStreamOutput } from "@/ai/flows/live-translate-stream";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  spokenText: z.string().min(1, "Spoken text is required."),
  targetLanguage: z.string().min(1, "Target language is required."),
});

type FormData = z.infer<typeof formSchema>;

const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "pt", name: "Portuguese" },
  { code: "wo", name: "Wolof" }, // Added Wolof
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese (Simplified)" },
];

export default function AiTranslationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetLanguage: "fr", // Default to French
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgress(0);
    setTranslatedText(null);
    try {
      // Simulate progress for AI processing
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 20; // Faster simulation for text
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
        title: "Translation Successful!",
        description: `Text translated to ${supportedLanguages.find(l => l.code === data.targetLanguage)?.name || data.targetLanguage}.`,
      });
    } catch (error) {
      console.error("Error translating text:", error);
      clearInterval(progressInterval);
      setProgress(0);
      toast({
        title: "Error",
        description: "Failed to translate text. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Live AI Translation"
        description="Translate spoken text from your live stream in real-time."
        icon={Languages}
      />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Translate Text</CardTitle>
            <CardDescription>Enter the text to translate and select the target language.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="spokenText">Text to Translate (Host's Speech)</Label>
                <Textarea
                  id="spokenText"
                  {...register("spokenText")}
                  placeholder="Enter the text spoken by the host..."
                  rows={5}
                  disabled={isLoading}
                />
                {errors.spokenText && <p className="text-sm text-destructive mt-1">{errors.spokenText.message}</p>}
              </div>

              <div>
                <Label htmlFor="targetLanguage">Target Language</Label>
                <Controller
                  name="targetLanguage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <SelectTrigger id="targetLanguage">
                        <SelectValue placeholder="Select language" />
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
                  <Label>Translating...</Label>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Translating..." : "Translate"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText className="h-6 w-6 text-primary" /> Translated Text
            </CardTitle>
            <CardDescription>The translated text will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] bg-muted/30 p-4 rounded-md border">
            {translatedText ? (
              <p className="whitespace-pre-wrap text-foreground">{translatedText}</p>
            ) : (
              <p className="text-muted-foreground">
                {isLoading ? "Translation in progress..." : "Enter text and click translate to see the result."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
