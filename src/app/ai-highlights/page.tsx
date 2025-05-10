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
  streamDataUri: z.string().min(1, "Stream video file is required."),
  viewerEngagementData: z.string().min(1, "Viewer engagement data is required."),
  keyEventsData: z.string().min(1, "Key events data is required."),
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
          title: "Invalid File Type",
          description: "Please select a video file.",
          variant: "destructive",
        });
        return;
      }
      // Max 10MB for demo
      if (file.size > 10 * 1024 * 1024) {
         toast({
          title: "File Too Large",
          description: "Please select a video file smaller than 10MB for this demo.",
          variant: "destructive",
        });
        return;
      }

      setFileName(file.name);
      setIsLoading(true); // For file reading indication
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
         toast({ title: "File Ready", description: `${file.name} has been prepared.` });
      };
      reader.onerror = () => {
        setIsLoading(false);
        toast({ title: "File Read Error", description: "Could not read the selected file.", variant: "destructive" });
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgress(0); // Reset progress for AI processing
    setResult(null);
    try {
      // Simulate progress for AI processing
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 90) { // Don't go to 100 until result is back
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
        title: "Highlight Reel Generated!",
        description: "Your AI-powered highlight reel is ready.",
      });
    } catch (error) {
      console.error("Error generating highlight reel:", error);
      clearInterval(progressInterval);
      setProgress(0);
      toast({
        title: "Error",
        description: "Failed to generate highlight reel. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="AI Highlight Reel Generator"
        description="Automatically create engaging highlight reels from your live streams using AI."
        icon={Sparkles}
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Create New Highlight Reel</CardTitle>
          <CardDescription>
            Upload your stream video and provide engagement data to get started.
            For demo purposes, please use small video files (e.g., under 10MB).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="stream-video" className="block text-sm font-medium mb-1">Stream Video File</Label>
              <Input
                id="stream-video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                disabled={isLoading}
              />
              {fileName && <p className="text-sm text-muted-foreground mt-1">Selected: {fileName}</p>}
              {errors.streamDataUri && <p className="text-sm text-destructive mt-1">{errors.streamDataUri.message}</p>}
            </div>

            <div>
              <Label htmlFor="viewerEngagementData">Viewer Engagement Data</Label>
              <Textarea
                id="viewerEngagementData"
                {...register("viewerEngagementData")}
                placeholder="e.g., Chat logs, peak viewership times, user reactions..."
                rows={4}
                disabled={isLoading}
              />
              {errors.viewerEngagementData && <p className="text-sm text-destructive mt-1">{errors.viewerEngagementData.message}</p>}
            </div>

            <div>
              <Label htmlFor="keyEventsData">Key Events Data</Label>
              <Textarea
                id="keyEventsData"
                {...register("keyEventsData")}
                placeholder="e.g., Timestamps of important moments, speaker notes, topics discussed..."
                rows={4}
                disabled={isLoading}
              />
              {errors.keyEventsData && <p className="text-sm text-destructive mt-1">{errors.keyEventsData.message}</p>}
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <Label>{progress < 100 && progress > 0 && fileName ? `Reading ${fileName}...` : 'Processing with AI...'}</Label>
                <Progress value={progress} className="w-full" />
                 <p className="text-sm text-muted-foreground text-center">
                   {fileName && progress < 100 && progress > 0 ? `Preparing ${fileName}...` : 'AI is working its magic. This may take a few moments...'}
                 </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Highlight Reel"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Video className="h-6 w-6 text-primary"/> Highlight Reel Ready!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Summary:</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold">Generated Reel:</h3>
              {result.highlightReelDataUri.startsWith("data:video") ? (
                <video controls src={result.highlightReelDataUri} className="w-full max-w-md rounded-md border mt-2 shadow-md" />
              ) : (
                 <p className="text-muted-foreground">Could not display video preview. <a href={result.highlightReelDataUri} download="highlight_reel.mp4" className="text-primary hover:underline">Download Reel</a></p>
              )}
               <Button asChild variant="outline" className="mt-2">
                 <a href={result.highlightReelDataUri} download="highlight_reel.mp4">Download Reel</a>
               </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
