
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Users, Play, Music2 as Mic, BarChart3, Palette, Cpu, Headphones, Disc3 } from "lucide-react";
import { Logo } from "@/components/logo";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { generateLandingImage } from "@/ai/flows/generate-landing-image-flow";
import { Skeleton } from "@/components/ui/skeleton";

const MainLandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-4 items-center">
          <Button variant="ghost" asChild>
            <Link href="/creators">
              <Mic className="mr-2 h-4 w-4" /> Pour les Créateurs
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/viewers">
              <Headphones className="mr-2 h-4 w-4" /> Pour les Fans
            </Link>
          </Button>
          <Button asChild>
            <Link href="/explore">
             <Play className="mr-2 h-4 w-4" /> Explorer la Musique
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
           <Button asChild variant="outline">
            <Link href="/explore">
              Explorer
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const MainLandingFooter = () => {
  return (
    <footer className="border-t py-12 bg-muted/50">
      <div className="container text-center">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Zikcut. Tous droits réservés.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          La plateforme où la musique rencontre l'intelligence artificielle.
        </p>
         <div className="mt-6 text-xs text-muted-foreground space-x-3">
            <Link href="#" className="hover:text-primary">À Propos</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-primary">Contact</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-primary">Presse</Link>
        </div>
      </div>
    </footer>
  );
};

export default function MainLandingPage() {
  const [heroBgUrl, setHeroBgUrl] = useState("https://placehold.co/1920x1080.png?text=Chargement...");
  const [isHeroBgLoading, setIsHeroBgLoading] = useState(true);
  const [creatorImageUrl, setCreatorImageUrl] = useState("https://placehold.co/600x500.png?text=Chargement...");
  const [isCreatorImageLoading, setIsCreatorImageLoading] = useState(true);
  const [fansImageUrl, setFansImageUrl] = useState("https://placehold.co/600x500.png?text=Chargement...");
  const [isFansImageLoading, setIsFansImageLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async (setter: React.Dispatch<React.SetStateAction<string>>, loadingSetter: React.Dispatch<React.SetStateAction<boolean>>, prompt: string, fallback: string) => {
      loadingSetter(true);
      try {
        const { imageDataUri } = await generateLandingImage({ prompt });
        setter(imageDataUri);
      } catch (error) {
        console.error(`Failed to generate image for prompt "${prompt}":`, error);
        setter(fallback);
      } finally {
        loadingSetter(false);
      }
    };

    fetchImage(setHeroBgUrl, setIsHeroBgLoading, "Vibrant abstract music background, soundwaves and colors, suitable for a music platform hero section.", "https://placehold.co/1920x1080.png?text=Erreur+Image");
    fetchImage(setCreatorImageUrl, setIsCreatorImageLoading, "Photorealistic image of a diverse group of African musicians collaborating and creating music using modern technology like laptops and tablets in a vibrant studio.", "https://placehold.co/600x500.png?text=Erreur+Image");
    fetchImage(setFansImageUrl, setIsFansImageLoading, "Photorealistic image of diverse music fans joyfully listening to music on headphones and mobile devices, with African cultural elements subtly integrated.", "https://placehold.co/600x500.png?text=Erreur+Image");
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainLandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
           <div className="absolute inset-0 opacity-10">
            {isHeroBgLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <Image
                  src={heroBgUrl}
                  alt="Fond abstrait musical"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="abstract music pattern"
                  priority
              />
            )}
          </div>
          <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Bienvenue sur <span className="text-primary">Zikcut</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La plateforme où créateurs de musique, influenceurs et fans se rencontrent. Créez avec l'IA, découvrez des sons uniques, et vivez la musique comme jamais auparavant.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/creators">
                  <Mic className="mr-2 h-5 w-5" /> Espace Créateur
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">
                  <Play className="mr-2 h-5 w-5" /> Explorer la Musique
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Creators Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Badge variant="secondary" className="mb-3">Pour les Créateurs de Musique</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Composez Votre Prochain Hit, <span className="text-primary">Partagez Votre Univers Sonore</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Zikcut vous offre des outils IA pour générer des pistes audio et des clips vidéo, atteindre une large audience, et monétiser votre musique. Libérez votre créativité sans limites.
                </p>
                <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-center gap-3"><Cpu className="h-5 w-5 text-primary" /> Outils IA pour pistes audio, clips vidéo et pochettes.</li>
                    <li className="flex items-center gap-3"><BarChart3 className="h-5 w-5 text-primary" /> Modèle de revenus équitable : 5% de commission.</li>
                    <li className="flex items-center gap-3"><Palette className="h-5 w-5 text-primary" /> Personnalisation de vos projets musicaux.</li>
                </ul>
                <Button size="lg" asChild>
                  <Link href="/creators">
                    Découvrir les Outils Créateur <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 md:order-2 aspect-[6/5]">
                {isCreatorImageLoading ? (
                  <Skeleton className="w-full h-full rounded-xl" />
                ) : (
                  <Image
                    src={creatorImageUrl}
                    alt="Musicien utilisant Zikcut pour créer"
                    width={600}
                    height={500}
                    className="rounded-xl shadow-2xl object-cover w-full h-full"
                    data-ai-hint="musician creating AI"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* For Fans/Consumers Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[6/5]">
                {isFansImageLoading ? (
                  <Skeleton className="w-full h-full rounded-xl" />
                ) : (
                  <Image
                    src={fansImageUrl}
                    alt="Fans écoutant de la musique sur Zikcut"
                    width={600}
                    height={500}
                    className="rounded-xl shadow-2xl object-cover w-full h-full"
                    data-ai-hint="fans listening music"
                  />
                )}
              </div>
              <div>
                <Badge variant="secondary" className="mb-3">Pour les Fans & Influenceurs</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Découvrez la Bande Son de <span className="text-accent">Demain, Aujourd'hui</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Plongez dans un univers de créations musicales originales, explorez des genres nouveaux et soutenez vos artistes et influenceurs préférés. Zikcut est votre porte d'entrée vers l'innovation musicale.
                </p>
                 <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-center gap-3"><Disc3 className="h-5 w-5 text-accent" /> Musique générée par IA et créations d'artistes émergents.</li>
                    <li className="flex items-center gap-3"><Users className="h-5 w-5 text-accent" /> Connectez-vous avec les créateurs et influenceurs.</li>
                    <li className="flex items-center gap-3"><Play className="h-5 w-5 text-accent" /> Accès facile et découverte personnalisée.</li>
                </ul>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/viewers">
                    Explorer l'Expérience Fan <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Highlights Section */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Zikcut : Là où la <span className="text-primary">Créativité Musicale Prend Vie</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Zikcut est conçu pour révolutionner l'écosystème musical en offrant des outils IA puissants aux créateurs et une expérience de découverte unique aux fans et influenceurs.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg hover:shadow-primary/10 transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 text-primary rounded-full w-fit mb-2">
                    <Mic className="h-8 w-8" />
                  </div>
                  <CardTitle>Créez Sans Limites</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Outils IA pour pistes audio, clips, pochettes et paroles.</CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-accent/10 transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-accent/10 text-accent rounded-full w-fit mb-2">
                    <Play className="h-8 w-8" />
                  </div>
                  <CardTitle>Explorez & Vibrez</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Un catalogue infini de musique originale et innovante.</CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-secondary/10 transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-secondary/10 text-secondary rounded-full w-fit mb-2">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle>Connectez & Influencez</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Rejoignez une communauté de passionnés et façonnez les tendances.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>

      <MainLandingFooter />
    </div>
  );
}

    