
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Search, Headphones, MessageSquareText, Wallet, Heart, Smartphone, PlaySquare, Users, MonitorPlay, Disc3, Laptop, Tv } from "lucide-react";
import { Logo } from "@/components/logo";
import React from "react";

const ViewersLandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#decouvrir" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Découvrir
          </Link>
          <Link href="#avantages" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Avantages
          </Link>
          <Link href="#comment-ca-marche" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Comment ça marche ?
          </Link>
          <Button asChild variant="outline">
            <Link href="/explore">
              Explorer la Musique
            </Link>
          </Button>
          <Button asChild>
            <Link href="/creators">
              Espace Créateur
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

const ViewersLandingFooter = () => {
  return (
    <footer className="border-t py-12 bg-muted/50">
      <div className="container text-center">
        <Logo />
        <p className="mt-4 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Zikcut. Tous droits réservés. <br/>
          Votre portail vers l'avant-garde musicale.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="/explore" className="text-muted-foreground hover:text-primary"><PlaySquare className="h-5 w-5" /></Link>
          <Link href="#" className="text-muted-foreground hover:text-primary"><Smartphone className="h-5 w-5" /></Link>
          <Link href="#" className="text-muted-foreground hover:text-primary"><Headphones className="h-5 w-5" /></Link>
        </div>
      </div>
    </footer>
  );
};

const viewerFeatures = [
  {
    icon: Disc3,
    title: "Musique Innovante et Originale",
    description: "Explorez des milliers de pistes uniques, y compris des créations assistées par IA, par des artistes et influenceurs émergents.",
    dataAiHint: "innovative music",
  },
  {
    icon: MonitorPlay, // Keep for general "quality viewing/listening"
    title: "Audio Haute Fidélité",
    description: "Plongez dans une expérience d'écoute immersive avec un son de haute qualité, optimisé pour tous les appareils.",
    dataAiHint: "high fidelity audio",
  },
  {
    icon: MessageSquareText,
    title: "Connectez avec les Artistes & Influenceurs",
    description: "Rejoignez les communautés, échangez avec les créateurs, découvrez les histoires derrière la musique et influencez les tendances.",
    dataAiHint: "artist fan interaction",
  },
  {
    icon: Wallet,
    title: "Écoute Gratuite & Contenu Exclusif",
    description: "Accédez à une vaste bibliothèque de musique gratuite ou soutenez les artistes en achetant des pistes/albums exclusifs. Rechargez via Orange Money.",
    dataAiHint: "music streaming wallet",
  },
  {
    icon: Heart,
    title: "Soutenez les Artistes Émergents",
    description: "En écoutant, partageant ou achetant, vous supportez directement les talents et la créativité que vous aimez sur Zikcut.",
    dataAiHint: "support artists",
  },
  {
    icon: Laptop,
    title: "Disponible Partout, Tout le Temps",
    description: "Accédez à Zikcut sur votre ordinateur, tablette ou smartphone. Votre musique vous suit partout.",
    dataAiHint: "multi-platform music",
  },
];

const howItWorksSteps = [
    { title: "Inscrivez-vous (Bientôt !)", description: "Créez votre compte fan en quelques clics et personnalisez votre expérience." },
    { title: "Découvrez des Pépites Musicales", description: "Naviguez par genres, moods, artistes ou laissez-vous surprendre par nos recommandations IA." },
    { title: "Rechargez Votre Portefeuille Zikcut", description: "Pour du contenu exclusif, ajoutez des fonds facilement via Orange Money (maquette)." },
    { title: "Vibrez au Son de Zikcut !", description: "Écoutez, partagez, commentez et faites partie de la révolution musicale." },
];


export default function ViewersLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ViewersLandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-accent/10 via-background to-background">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Découvrez l'Avant-Garde Musicale <br className="hidden md:block" />avec <span className="text-accent">Zikcut</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Votre destination unique pour explorer la musique de demain. Artistes innovants, créations IA, communautés vibrantes – tout y est !
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/explore">
                  Explorer la Musique
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#avantages">
                  Pourquoi Zikcut ?
                </Link>
              </Button>
            </div>
             <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                <Image src="https://placehold.co/1280x720.png" alt="Fans découvrant de la musique sur Zikcut" layout="fill" objectFit="cover" data-ai-hint="fans discovering music"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-left">
                    <h3 className="text-2xl font-semibold text-white">Votre Prochain Coup de Cœur Musical est Ici</h3>
                    <p className="text-white/80 mt-1">Une expérience d'écoute enrichissante vous attend.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="avantages" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Une Expérience d'Écoute Révolutionnaire</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Profitez d'une plateforme conçue pour vous, l'amateur de musique et le découvreur de tendances.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {viewerFeatures.map((feature) => (
                <Card key={feature.title} className="shadow-lg hover:shadow-accent/20 transition-shadow duration-300 flex flex-col">
                  <CardHeader className="flex-row items-start gap-4">
                    <div className="p-3 rounded-full bg-accent/10 text-accent">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl mt-1">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                   <CardFooter>
                     <Image src={`https://placehold.co/400x200.png`} alt={feature.title} width={400} height={200} className="rounded-md object-cover aspect-video w-full" data-ai-hint={feature.dataAiHint} />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="comment-ca-marche" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Commencez en Quelques Étapes Simples</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Plonger dans l'univers Zikcut est rapide et facile.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <Card key={index} className="shadow-md text-center p-6 flex flex-col items-center">
                    <div className="mb-4 p-3 bg-accent text-accent-foreground rounded-full text-2xl font-bold w-12 h-12 flex items-center justify-center">
                        {index + 1}
                    </div>
                    <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Mock Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ce Que Disent Nos Auditeurs</h2>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg">
                <CardDescription className="italic">"Incroyable de découvrir autant de talents et de sons nouveaux ! Zikcut, c'est frais."</CardDescription>
                <p className="mt-4 font-semibold text-right">- Omar K., Dakar</p>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardDescription className="italic">"L'IA qui aide à créer, c'est le futur ! J'adore écouter ces expérimentations musicales."</CardDescription>
                <p className="mt-4 font-semibold text-right">- Mariama S., Abidjan</p>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardDescription className="italic">"Enfin une plateforme qui met en avant la musique africaine innovante. Bravo Zikcut !"</CardDescription>
                <p className="mt-4 font-semibold text-right">- David A., Londres</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-accent text-accent-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Prêt à Explorer la Musique de Demain ?</h2>
            <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
              Des milliers de pistes et d'artistes uniques vous attendent. Rejoignez la communauté Zikcut et vivez des moments musicaux inoubliables.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-secondary-foreground hover:bg-secondary/90">
                <Link href="/explore">
                  Découvrir les Musiques
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-accent-foreground/50 text-accent-foreground hover:bg-accent-foreground/10">
                <Link href="#">
                  Créer Mon Compte Fan (Bientôt)
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ViewersLandingFooter />
    </div>
  );
}
