
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Palette as AiAlbumArtIcon, UploadCloud, CheckCircle, Wand2, ImagePlus, FileImage } from "lucide-react"; // Renamed ImageIcon to Palette

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
// TODO: Rename flow and types once AI flow is refactored
import { generateStreamThumbnails as generateAlbumArt, GenerateStreamThumbnailsInput as GenerateAlbumArtInput, GenerateStreamThumbnailsOutput as GenerateAlbumArtOutput } from "@/ai/flows/generate-stream-thumbnails-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_UPLOAD_FILES = 1; // For album art, usually one main reference image if any
const artStyles = ["Photoréaliste", "Abstrait", "Dessin Animé", "Vintage", "Minimaliste", "Surréaliste", "Typographique"];

const formSchema = z.object({
  trackTitle: z.string().min(3, "Le titre de la piste est requis (min 3 caractères)."),
  artistName: z.string().min(2, "Le nom de l'artiste est requis (min 2 caractères)."),
  genre: z.string().optional(),
  mood: z.string().optional(),
  visualDescription: z.string().min(10, "Veuillez fournir une description visuelle d'au moins 10 caractères."),
  artStyle: z.string().min(1, "Veuillez sélectionner un style artistique."),
  referenceImageDataUri: z.array(z.string()).optional(), // Kept as array for consistency, but UI will guide to 1
  numberOfCovers: z.coerce.number().min(1).max(4).default(3),
});

type FormData = z.infer<typeof formSchema>;
type GeneratedCover = GenerateAlbumArtOutput["thumbnails"][0];

export default function AiAlbumArtPage() { // Renamed component
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0); // Renamed progress
  const [generatedCovers, setGeneratedCovers] = useState<GeneratedCover[] | null>(null);
  const [selectedCover, setSelectedCover] = useState<GeneratedCover | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);

  const { toast } = useToast();
  const { control, register, handleSubmit, setValue, resetField, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfCovers: 3,
      trackTitle: "",
      artistName: "",
      visualDescription: "",
      artStyle: artStyles[0],
      referenceImageDataUri: [],
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Type de Fichier Invalide",
          description: `${file.name} n'est pas une image. Veuillez sélectionner un fichier image (PNG, JPG, etc.).`,
          variant: "destructive",
        });
        event.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit per file
        toast({
          title: "Fichier Trop Volumineux",
          description: `${file.name} dépasse 5Mo. Veuillez sélectionner un fichier plus petit.`,
          variant: "destructive",
        });
        event.target.value = "";
        return;
      }
      
      setUploadedFileName(file.name);
      const dataUri = await readFileAsDataURL(file);
      if (dataUri) {
        setUploadedFilePreview(dataUri);
        setValue("referenceImageDataUri", [dataUri]); // Store as an array with one item
        toast({ title: "Image Téléversée", description: `${file.name} prête comme référence.` });
      } else {
        resetField("referenceImageDataUri");
        setUploadedFileName(null);
        setUploadedFilePreview(null);
      }
    } else {
      setValue("referenceImageDataUri", []);
      setUploadedFileName(null);
      setUploadedFilePreview(null);
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
    setProgressValue(0);
    setGeneratedCovers(null);
    setSelectedCover(null);

    try {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 90) {
          setProgressValue(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 600);

      // Adapt input for album art generation
      // The existing flow `generateStreamThumbnails` expects `streamDescription`, `streamFramesDataUris`.
      const descriptionForAI = `Pochette pour: "${data.trackTitle}" par ${data.artistName}. Genre: ${data.genre || 'Non spécifié'}. Ambiance: ${data.mood || 'Non spécifiée'}. Style artistique: ${data.artStyle}. Description visuelle: ${data.visualDescription}`;
      const aiInput: GenerateAlbumArtInput = {
        streamDescription: descriptionForAI,
        streamFramesDataUris: data.referenceImageDataUri, // Use the single uploaded image if present
        numberOfThumbnails: data.numberOfCovers,
      };

      const response = await generateAlbumArt(aiInput);
      clearInterval(progressInterval);
      setProgressValue(100);

      if (response.thumbnails && response.thumbnails.length > 0) {
        setGeneratedCovers(response.thumbnails);
        toast({
          title: "Pochettes Générées !",
          description: `${response.thumbnails.length} pochettes ont été créées par l'IA Zikcut.`,
        });
      } else {
        toast({
          title: "Aucune Pochette Générée",
          description: "L'IA n'a pas pu générer de pochettes. Essayez d'ajuster la description ou l'image de référence.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la génération des pochettes:", error);
      clearInterval(progressInterval);
      setProgressValue(0);
      toast({
        title: "Erreur de Génération",
        description: "Échec de la génération des pochettes. " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverSelect = (cover: GeneratedCover) => {
    setSelectedCover(cover);
  };

  const handleConfirmSelection = () => {
    if (selectedCover) {
      toast({
        title: "Pochette Sélectionnée !",
        description: `Vous avez choisi une pochette pour votre projet musical.`,
      });
      console.log("Pochette sélectionnée:", selectedCover.imageDataUri);
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Générateur de Pochettes d'Album IA"
        description="Créez des visuels uniques pour vos singles ou albums avec Zikcut IA. Décrivez votre concept, choisissez un style, et laissez l'IA générer des options."
        icon={AiAlbumArtIcon} // Changed icon
      />

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Configurer la Génération de Pochette</CardTitle>
          <CardDescription>
            Fournissez des détails sur votre musique et vos préférences visuelles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="trackTitle">Titre de la Piste/Album</Label>
                    <Input id="trackTitle" {...register("trackTitle")} placeholder="Ex: Nuit Étoilée à Dakar" disabled={isLoading} />
                    {errors.trackTitle && <p className="text-sm text-destructive mt-1">{errors.trackTitle.message}</p>}
                </div>
                <div>
                    <Label htmlFor="artistName">Nom de l'Artiste</Label>
                    <Input id="artistName" {...register("artistName")} placeholder="Ex: Artiste Prodige" disabled={isLoading} />
                    {errors.artistName && <p className="text-sm text-destructive mt-1">{errors.artistName.message}</p>}
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="genre">Genre Musical (Optionnel)</Label>
                    <Input id="genre" {...register("genre")} placeholder="Ex: Afrobeat, Mbalax, Jazz Fusion" disabled={isLoading} />
                </div>
                 <div>
                    <Label htmlFor="mood">Ambiance / Humeur (Optionnel)</Label>
                    <Input id="mood" {...register("mood")} placeholder="Ex: Nostalgique, Énergique, Spirituel" disabled={isLoading} />
                </div>
            </div>
             <div>
              <Label htmlFor="visualDescription">Description Visuelle Détaillée</Label>
              <Textarea
                id="visualDescription"
                {...register("visualDescription")}
                placeholder="Ex: Un lion majestueux devant un baobab au crépuscule, des motifs géométriques colorés inspirés du bogolan, une silhouette dansant sous la lune..."
                rows={4}
                disabled={isLoading}
              />
              {errors.visualDescription && <p className="text-sm text-destructive mt-1">{errors.visualDescription.message}</p>}
            </div>

            <div>
              <Label htmlFor="artStyle">Style Artistique</Label>
              <Controller
                name="artStyle"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={String(field.value)} disabled={isLoading}>
                    <SelectTrigger id="artStyle"><SelectValue placeholder="Choisissez un style..." /></SelectTrigger>
                    <SelectContent>
                      {artStyles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.artStyle && <p className="text-sm text-destructive mt-1">{errors.artStyle.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="referenceImage">Image de Référence (Optionnel, 1 max)</Label>
              <Input
                id="referenceImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                disabled={isLoading}
              />
              {uploadedFileName && (
                <p className="text-sm text-muted-foreground mt-2">Image de référence : {uploadedFileName}</p>
              )}
              {uploadedFilePreview && (
                <div className="mt-2 w-32 h-32">
                  <Image src={uploadedFilePreview} alt="Aperçu" width={128} height={128} className="rounded-md border object-cover aspect-square" />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="numberOfCovers">Nombre de Propositions à Générer</Label>
              <Controller
                name="numberOfCovers"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={String(field.value)} disabled={isLoading}>
                    <SelectTrigger id="numberOfCovers"><SelectValue placeholder="Choisissez un nombre" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map(num => (
                        <SelectItem key={num} value={String(num)}>{num} pochette{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.numberOfCovers && <p className="text-sm text-destructive mt-1">{errors.numberOfCovers.message}</p>}
            </div>

            {isLoading && (
              <div className="space-y-2">
                <Label>Génération IA des pochettes en cours...</Label>
                <Progress value={progressValue} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">L'IA dessine vos pochettes. Cela peut prendre un moment...</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? "Génération en Cours..." : "Générer les Pochettes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {generatedCovers && generatedCovers.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Pochettes Générées</CardTitle>
            <CardDescription>Sélectionnez votre pochette préférée pour votre projet musical.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {generatedCovers.map((cover, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden cursor-pointer transition-all duration-200 ${selectedCover?.imageDataUri === cover.imageDataUri ? 'ring-2 ring-primary shadow-xl scale-105' : 'hover:shadow-md'}`}
                  onClick={() => handleCoverSelect(cover)}
                >
                  {cover.imageDataUri.startsWith('data:image') ? (
                    <Image
                        src={cover.imageDataUri}
                        alt={`Pochette générée ${index + 1}`}
                        width={300}
                        height={300}
                        className="w-full object-cover aspect-square"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-muted flex items-center justify-center">
                        <FileImage className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <CardFooter className="p-2 bg-muted/50">
                    {selectedCover?.imageDataUri === cover.imageDataUri ? (
                       <Button variant="ghost" size="sm" className="w-full text-primary">
                         <CheckCircle className="mr-2 h-4 w-4" /> Sélectionnée
                       </Button>
                    ) : (
                       <Button variant="outline" size="sm" className="w-full">
                         Choisir cette pochette
                       </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirmSelection} disabled={!selectedCover || isLoading} size="lg">
              <ImagePlus className="mr-2 h-4 w-4" />
              Confirmer la Sélection
            </Button>
          </CardFooter>
        </Card>
      )}
       {generatedCovers && generatedCovers.length === 0 && !isLoading && (
         <Alert variant="default" className="mt-8">
           <Wand2 className="h-4 w-4" />
           <AlertTitle>Aucune Pochette Produite</AlertTitle>
           <AlertDescription>
             L'IA n'a pas pu générer de pochettes avec les informations fournies. Veuillez essayer de modifier votre description ou l'image de référence et relancer la génération.
           </AlertDescription>
         </Alert>
       )}
    </div>
  );
}
