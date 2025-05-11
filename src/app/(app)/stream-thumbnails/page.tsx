
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageIcon, UploadCloud, CheckCircle, Wand2, ImagePlus, FileImage } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { generateStreamThumbnails, GenerateStreamThumbnailsInput, GenerateStreamThumbnailsOutput } from "@/ai/flows/generate-stream-thumbnails-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_UPLOAD_FILES = 3; // Limit number of files for demo

const formSchema = z.object({
  streamDescription: z.string().min(10, "Veuillez fournir une description d'au moins 10 caractères."),
  streamFramesDataUris: z.array(z.string()).optional(),
  numberOfThumbnails: z.coerce.number().min(1).max(4).default(3),
});

type FormData = z.infer<typeof formSchema>;
type GeneratedThumbnail = GenerateStreamThumbnailsOutput["thumbnails"][0];

export default function StreamThumbnailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedThumbnails, setGeneratedThumbnails] = useState<GeneratedThumbnail[] | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<GeneratedThumbnail | null>(null);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);
  const [uploadedFilePreviews, setUploadedFilePreviews] = useState<string[]>([]);

  const { toast } = useToast();
  const { control, register, handleSubmit, setValue, resetField, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfThumbnails: 3,
      streamDescription: "",
      streamFramesDataUris: [],
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files.length > MAX_UPLOAD_FILES) {
        toast({
          title: "Trop de Fichiers",
          description: `Veuillez sélectionner un maximum de ${MAX_UPLOAD_FILES} images.`,
          variant: "destructive",
        });
        event.target.value = ""; // Clear the input
        return;
      }

      const newFileNames: string[] = [];
      const newFilePreviews: string[] = [];
      const dataUris: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Type de Fichier Invalide",
            description: `${file.name} n'est pas une image. Veuillez sélectionner des fichiers image (PNG, JPG, etc.).`,
            variant: "destructive",
          });
          continue; 
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit per file
          toast({
            title: "Fichier Trop Volumineux",
            description: `${file.name} dépasse 5Mo. Veuillez sélectionner des fichiers plus petits.`,
            variant: "destructive",
          });
          continue;
        }
        newFileNames.push(file.name);
        const dataUri = await readFileAsDataURL(file);
        if (dataUri) {
          newFilePreviews.push(dataUri);
          dataUris.push(dataUri);
        }
      }
      
      setUploadedFileNames(newFileNames);
      setUploadedFilePreviews(newFilePreviews);
      setValue("streamFramesDataUris", dataUris);

      if (dataUris.length > 0) {
        toast({ title: "Images Téléversées", description: `${dataUris.length} image(s) prête(s).` });
      }
       if (dataUris.length === 0 && files.length > 0) {
        // Reset if all files were invalid
        resetField("streamFramesDataUris");
        setUploadedFileNames([]);
        setUploadedFilePreviews([]);
      }
    } else {
        // No files selected, clear existing
        setValue("streamFramesDataUris", []);
        setUploadedFileNames([]);
        setUploadedFilePreviews([]);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  };


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setProgress(0);
    setGeneratedThumbnails(null);
    setSelectedThumbnail(null);

    try {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 90) {
          setProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 600); // Slower interval for image generation

      const response = await generateStreamThumbnails(data as GenerateStreamThumbnailsInput);
      clearInterval(progressInterval);
      setProgress(100);

      if (response.thumbnails && response.thumbnails.length > 0) {
        setGeneratedThumbnails(response.thumbnails);
        toast({
          title: "Miniatures Générées !",
          description: `${response.thumbnails.length} miniatures ont été créées par l'IA.`,
        });
      } else {
        toast({
          title: "Aucune Miniature Générée",
          description: "L'IA n'a pas pu générer de miniatures. Essayez d'ajuster la description ou les images.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la génération des miniatures:", error);
      clearInterval(progressInterval);
      setProgress(0);
      toast({
        title: "Erreur de Génération",
        description: "Échec de la génération des miniatures. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailSelect = (thumbnail: GeneratedThumbnail) => {
    setSelectedThumbnail(thumbnail);
  };

  const handleConfirmSelection = () => {
    if (selectedThumbnail) {
      toast({
        title: "Miniature Sélectionnée !",
        description: `Vous avez choisi une miniature pour votre stream.`,
      });
      console.log("Miniature sélectionnée:", selectedThumbnail.imageDataUri);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Générateur de Miniatures IA"
        description="Créez automatiquement des miniatures attrayantes pour vos streams enregistrés. Fournissez une description et jusqu'à 3 images de référence pour guider l'IA."
        icon={ImageIcon}
      />

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Configurer la Génération</CardTitle>
          <CardDescription>
            Fournissez une description de votre stream et téléversez jusqu'à {MAX_UPLOAD_FILES} images de référence (captures d'écran du stream par exemple).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="streamDescription">Description du Stream</Label>
              <Textarea
                id="streamDescription"
                {...register("streamDescription")}
                placeholder="Ex: Live coding d'une app Next.js, concert acoustique de Mbalax, cours de cuisine Thieboudienne..."
                rows={4}
                disabled={isLoading}
              />
              {errors.streamDescription && <p className="text-sm text-destructive mt-1">{errors.streamDescription.message}</p>}
            </div>

            <div>
              <Label htmlFor="streamFrames">Images de Référence (Optionnel, max {MAX_UPLOAD_FILES})</Label>
              <Input
                id="streamFrames"
                type="file"
                accept="image/*"
                multiple // Allow multiple file selection
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                disabled={isLoading}
              />
              {uploadedFileNames.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">Fichiers téléversés : {uploadedFileNames.join(", ")}</p>
              )}
              {uploadedFilePreviews.length > 0 && (
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {uploadedFilePreviews.map((previewUrl, index) => (
                    <Image key={index} src={previewUrl} alt={`Aperçu ${index + 1}`} width={150} height={84} className="rounded-md border object-cover aspect-video" />
                  ))}
                </div>
              )}
               {errors.streamFramesDataUris && <p className="text-sm text-destructive mt-1">{errors.streamFramesDataUris.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="numberOfThumbnails">Nombre de Miniatures à Générer</Label>
              <Controller
                name="numberOfThumbnails"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={String(field.value)} disabled={isLoading}>
                    <SelectTrigger id="numberOfThumbnails">
                      <SelectValue placeholder="Choisissez un nombre" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map(num => (
                        <SelectItem key={num} value={String(num)}>{num} miniature{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.numberOfThumbnails && <p className="text-sm text-destructive mt-1">{errors.numberOfThumbnails.message}</p>}
            </div>

            {isLoading && (
              <div className="space-y-2">
                <Label>Génération par IA en cours...</Label>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">L'IA travaille à la création de vos miniatures. Cela peut prendre un moment...</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? "Génération en Cours..." : "Générer les Miniatures"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedThumbnails && generatedThumbnails.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Miniatures Générées</CardTitle>
            <CardDescription>Sélectionnez votre miniature préférée pour votre stream.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {generatedThumbnails.map((thumb, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden cursor-pointer transition-all duration-200 ${selectedThumbnail?.imageDataUri === thumb.imageDataUri ? 'ring-2 ring-primary shadow-xl scale-105' : 'hover:shadow-md'}`}
                  onClick={() => handleThumbnailSelect(thumb)}
                >
                  {thumb.imageDataUri.startsWith('data:image') ? (
                    <Image
                        src={thumb.imageDataUri}
                        alt={`Miniature générée ${index + 1}`}
                        width={400}
                        height={225}
                        className="w-full object-cover aspect-video"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-muted flex items-center justify-center">
                        <FileImage className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <CardFooter className="p-2 bg-muted/50">
                    {selectedThumbnail?.imageDataUri === thumb.imageDataUri ? (
                       <Button variant="ghost" size="sm" className="w-full text-primary">
                         <CheckCircle className="mr-2 h-4 w-4" /> Sélectionnée
                       </Button>
                    ) : (
                       <Button variant="outline" size="sm" className="w-full">
                         Choisir cette miniature
                       </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirmSelection} disabled={!selectedThumbnail || isLoading} size="lg">
              <ImagePlus className="mr-2 h-4 w-4" />
              Confirmer la Sélection
            </Button>
          </CardFooter>
        </Card>
      )}
       {generatedThumbnails && generatedThumbnails.length === 0 && !isLoading && (
         <Alert variant="default" className="mt-8">
           <Wand2 className="h-4 w-4" />
           <AlertTitle>Aucune Miniature Produite</AlertTitle>
           <AlertDescription>
             L'IA n'a pas pu générer de miniatures avec les informations fournies. Veuillez essayer de modifier votre description ou les images de référence et relancer la génération.
           </AlertDescription>
         </Alert>
       )}
    </div>
  );
}

