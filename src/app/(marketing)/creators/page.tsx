
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, DollarSign, BarChart, Users, Music2, Film, Sparkles, Share2, CreditCard, Wand2, SlidersHorizontal, Palette } from "lucide-react";
import { Logo } from "@/components/logo";
import React, { useState, useEffect } from "react";
import { generateLandingImage } from "@/ai/flows/generate-landing-image-flow";
import { Skeleton } from "@/components/ui/skeleton";

const CreatorsLandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#fonctionnalites" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Fonctionnalités IA
          </Link>
          <Link href="#tarifs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Notre Modèle
          </Link>
          <Link href="#pourquoi-nous" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Pourquoi Zikcut?
          </Link>
          <Button variant="outline" asChild>
            <Link href="/viewers">
              Espace Fan
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              Tableau de Bord Créateur
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
           <Button asChild variant="outline">
            <Link href="/dashboard">
              Accès Créateur
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const CreatorsLandingFooter = () => {
  return (
    <footer className="border-t py-12 bg-muted/50">
      <div className="container text-center">
        <Logo />
        <p className="mt-4 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Zikcut. Tous droits réservés. <br/>
          La plateforme de création musicale IA pour les artistes et influenceurs.
        </p>
      </div>
    </footer>
  );
};

const initialFeatures = [
  {
    icon: Music2,
    title: "Génération de Pistes Audio IA",
    description: "Créez des morceaux originaux, des instrus ou des boucles. Choisissez le genre, l'ambiance, et laissez l'IA composer pour vous ou vous assister.",
    dataAiHint: "AI music generation studio african artist",
    imagePrompt: "A futuristic music studio where an African artist is collaborating with an AI interface to compose a new song, vibrant visuals, energetic.",
  },
  {
    icon: Film,
    title: "Création de Clips Vidéo IA",
    description: "Transformez vos pistes audio en clips vidéo dynamiques. L'IA peut générer des visuels, synchroniser des scènes et créer des effets.",
    dataAiHint: "AI video production for music african style",
    imagePrompt: "Dynamic visuals of an AI generating a music video for an African pop song, showing abstract patterns, dancers, and futuristic cityscapes.",
  },
  {
    icon: Palette,
    title: "Conception de Pochettes IA",
    description: "Obtenez des pochettes d'album uniques et professionnelles en quelques clics, basées sur le style de votre musique et vos descriptions.",
    dataAiHint: "AI album art generator african music theme",
    imagePrompt: "An AI creating a stunning, culturally rich album cover for an African artist, blending traditional motifs with modern design.",
  },
  {
    icon: Wand2,
    title: "Assistant Paroles IA",
    description: "Bloqué sur une rime ? L'IA vous aide à trouver l'inspiration, suggérer des thèmes, et peaufiner vos paroles.",
    dataAiHint: "AI lyric writing assistant african languages",
    imagePrompt: "An inspirational image of an AI helping a songwriter craft lyrics, with digital notes and words flowing around them, African context.",
  },
  {
    icon: Share2,
    title: "Distribution & Promotion",
    description: "Partagez facilement vos créations sur Zikcut et bénéficiez d'outils pour atteindre les fans et les influenceurs.",
    dataAiHint: "music distribution platform africa",
    imagePrompt: "A visual representation of music tracks being distributed globally from Africa, network lines connecting to various devices and platforms.",
  },
  {
    icon: CreditCard,
    title: "Monétisation Flexible",
    description: "Vendez vos pistes, proposez des abonnements exclusifs. Intégration Sonatel Orange Money (maquette) pour des paiements simplifiés.",
    dataAiHint: "music monetization africa mobile money",
    imagePrompt: "An image symbolizing music monetization in Africa, showing a mobile money interface (like Orange Money) integrated with a music sales platform.",
  },
];

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  dataAiHint: string;
  imagePrompt: string;
  imageUrl: string;
  isLoading: boolean;
}

export default function CreatorsLandingPage() {
  const [heroImageUrl, setHeroImageUrl] = useState("https://placehold.co/1280x720.png?text=Chargement+Dashboard+Zikcut...");
  const [isHeroImageLoading, setIsHeroImageLoading] = useState(true);
  const [features, setFeatures] = useState<FeatureItem[]>(
    initialFeatures.map(f => ({ 
      ...f, 
      imageUrl: `https://placehold.co/400x200.png?text=${encodeURIComponent(f.title)}`,
      isLoading: true,
    }))
  );

  useEffect(() => {
    const fetchHeroImage = async () => {
      setIsHeroImageLoading(true);
      try {
        const { imageDataUri } = await generateLandingImage({ prompt: "Photorealistic image of a modern music creation dashboard interface, Zikcut branded, showcasing AI tools and analytics for African artists." });
        setHeroImageUrl(imageDataUri);
      } catch (error) {
        console.error("Failed to generate hero image:", error);
        setHeroImageUrl("https://placehold.co/1280x720.png?text=Erreur+Image+H%C3%A9ro");
      } finally {
        setIsHeroImageLoading(false);
      }
    };
    fetchHeroImage();
  }, []);

  useEffect(() => {
    const fetchFeatureImages = async () => {
      const updatedFeatures = await Promise.all(
        features.map(async (feature) => {
          if (feature.isLoading) { // only fetch if not already loaded or failed
            try {
              const { imageDataUri } = await generateLandingImage({ prompt: feature.imagePrompt });
              return { ...feature, imageUrl: imageDataUri, isLoading: false };
            } catch (error) {
              console.error(`Failed to generate image for ${feature.title}:`, error);
              return { ...feature, imageUrl: `https://placehold.co/400x200.png?text=Erreur+Image`, isLoading: false };
            }
          }
          return feature;
        })
      );
      setFeatures(updatedFeatures);
    };
    fetchFeatureImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const whyUsPoints = [
  {
    icon: DollarSign,
    title: "Focus sur les Créateurs Africains",
    description: "Une plateforme pensée pour les talents du continent et de la diaspora, avec des outils et une monétisation adaptés.",
    dataAiHint: "african creator focus"
  },
  {
    icon: Sparkles,
    title: "Technologie IA de Pointe",
    description: "Bénéficiez des dernières avancées en IA générative pour la musique, les vidéos et les visuels.",
    dataAiHint: "AI technology music",
  },
  {
    icon: Users,
    title: "Communauté et Réseau",
    description: "Connectez-vous avec d'autres artistes, des influenceurs et des fans. Collaborez et grandissez ensemble.",
    dataAiHint: "music community network"
  },
];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <CreatorsLandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Révolutionnez Votre Musique avec <span className="text-primary">Zikcut</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La plateforme tout-en-un pour les créateurs de musique. Utilisez l'IA pour composer, produire des clips, designer vos pochettes et connecter avec votre public.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard">
                  Commencer à Créer
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#fonctionnalites">
                  Découvrir les Outils IA
                </Link>
              </Button>
            </div>
             <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                {isHeroImageLoading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <Image src={heroImageUrl} alt="Tableau de bord Zikcut pour créateurs" layout="fill" objectFit="cover" data-ai-hint="dashboard music creation"/>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-left">
                    <h3 className="text-2xl font-semibold text-white">Votre Studio de Création Musicale Augmenté par l'IA</h3>
                    <p className="text-white/80 mt-1">De l'idée à la distribution, Zikcut vous accompagne.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fonctionnalites" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Des Outils IA pour Libérer Votre Créativité Musicale</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour produire des morceaux et des clips uniques et professionnels.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                  <CardHeader className="flex-row items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl mt-1">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                   <CardFooter>
                    {feature.isLoading ? (
                        <Skeleton className="rounded-md object-cover aspect-video w-full h-[200px]" />
                    ) : (
                        <Image src={feature.imageUrl} alt={feature.title} width={400} height={200} className="rounded-md object-cover aspect-video w-full" data-ai-hint={feature.dataAiHint} />
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Revenue Model Section */}
        <section id="tarifs" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <DollarSign className="h-16 w-16 text-primary mx-auto mb-6 p-3 bg-primary/10 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Notre Modèle Gagnant-Gagnant : <span className="text-primary">5% Seulement</span></h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Zikcut prélève une commission de seulement 5% sur les revenus que vous générez via la plateforme (ventes de pistes, abonnements exclusifs). Pas de frais cachés, pas de coûts initiaux élevés.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Notre succès est directement lié au vôtre.
              </p>
              <Card className="mt-8 text-left shadow-md p-6 bg-background">
                <CardTitle className="text-xl mb-3">Ce que cela signifie pour vous :</CardTitle>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Gardez 95% de vos revenus :</strong> La majeure partie de vos gains vous revient directement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Accès complet aux outils IA :</strong> Profitez de toutes nos fonctionnalités de création IA pour cette commission unique.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Alignement d'intérêts :</strong> Nous sommes motivés à vous aider à créer, à vous faire connaître et à augmenter vos revenus.</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="pourquoi-nous" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Pourquoi Choisir Zikcut ?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Nous sommes plus qu'une simple plateforme. Nous sommes votre partenaire pour la création musicale à l'ère de l'IA.
              </p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {whyUsPoints.map((point) => (
                <div key={point.title} className="bg-card p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
                  <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                    <point.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{point.title}</h3>
                  <p className="text-muted-foreground flex-grow">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Prêt à Composer l'Avenir de Votre Musique ?</h2>
            <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
              Rejoignez la communauté des créateurs qui utilisent Zikcut pour innover.
              Inscrivez-vous gratuitement et commencez à créer dès aujourd'hui.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" asChild className="text-secondary-foreground hover:bg-secondary/90">
                <Link href="/dashboard">
                  Créer Mon Compte Artiste
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <CreatorsLandingFooter />
    </div>
  );
}

    