
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Users, Play, Tv, Mic, BarChart3, Palette, Cpu } from "lucide-react";
import { Logo } from "@/components/logo";
import React from "react";
import { Badge } from "@/components/ui/badge";

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
              <Users className="mr-2 h-4 w-4" /> Pour les Spectateurs
            </Link>
          </Button>
          <Button asChild>
            <Link href="/explore">
             <Play className="mr-2 h-4 w-4" /> Explorer les Streams
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
          &copy; {new Date().getFullYear()} EnDirectAuSénégal. Tous droits réservés.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          La plateforme de streaming qui connecte le Sénégal au monde.
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
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainLandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
           <div className="absolute inset-0 opacity-10">
            <Image
                src="https://picsum.photos/seed/mainhero-bg/1920/1080"
                alt="Fond abstrait"
                layout="fill"
                objectFit="cover"
                data-ai-hint="abstract background pattern"
            />
          </div>
          <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Bienvenue sur <span className="text-primary">EnDirectAuSénégal</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La plateforme où créateurs et spectateurs se rencontrent. Diffusez vos passions, découvrez des contenus uniques, et vivez le direct comme jamais auparavant.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/creators">
                  <Mic className="mr-2 h-5 w-5" /> Devenir Créateur
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">
                  <Play className="mr-2 h-5 w-5" /> Explorer les Streams
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
                <Badge variant="secondary" className="mb-3">Pour les Créateurs</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Partagez Votre Talent, <span className="text-primary">Monétisez Votre Passion</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  EnDirectAuSénégal vous offre les outils pour diffuser en HD, atteindre une large audience avec le multistreaming, et générer des revenus grâce à l'intégration Sonatel Orange Money. Nos fonctionnalités IA vous aident à créer des contenus engageants sans effort.
                </p>
                <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-center gap-3"><Cpu className="h-5 w-5 text-primary" /> Outils IA pour moments forts et vidéos courtes.</li>
                    <li className="flex items-center gap-3"><BarChart3 className="h-5 w-5 text-primary" /> Modèle de revenus équitable : 5% de commission.</li>
                    <li className="flex items-center gap-3"><Palette className="h-5 w-5 text-primary" /> Personnalisation avancée de vos streams.</li>
                </ul>
                <Button size="lg" asChild>
                  <Link href="/creators">
                    En Savoir Plus & S'inscrire <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 md:order-2">
                <Image
                  src="https://picsum.photos/seed/creatorsection/600/500"
                  alt="Streamer utilisant EnDirectAuSénégal"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-2xl object-cover"
                  data-ai-hint="streamer workspace"
                />
              </div>
            </div>
          </div>
        </section>

        {/* For Viewers Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="https://picsum.photos/seed/viewersection/600/500"
                  alt="Spectateurs regardant un stream"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-2xl object-cover"
                  data-ai-hint="audience watching"
                />
              </div>
              <div>
                <Badge variant="secondary" className="mb-3">Pour les Spectateurs</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Découvrez le Meilleur du <span className="text-accent">Direct Sénégalais</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Plongez dans un univers de contenus variés : musique, culture, éducation, gaming, et bien plus. Interagissez en temps réel, soutenez vos créateurs favoris et profitez d'une expérience HD immersive.
                </p>
                 <ul className="space-y-3 text-muted-foreground mb-8">
                    <li className="flex items-center gap-3"><Tv className="h-5 w-5 text-accent" /> Streams HD sur tous vos appareils.</li>
                    <li className="flex items-center gap-3"><Users className="h-5 w-5 text-accent" /> Communautés vibrantes et interactives.</li>
                    <li className="flex items-center gap-3"><Play className="h-5 w-5 text-accent" /> Accès facile et paiements sécurisés via Orange Money.</li>
                </ul>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/viewers">
                    Découvrir l'Expérience Spectateur <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Highlights Section */}
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Une Plateforme, <span className="text-primary">Deux Mondes Connectés</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              EnDirectAuSénégal est conçu pour enrichir l'écosystème du streaming au Sénégal et au-delà, en offrant des outils puissants aux créateurs et une expérience de visionnage exceptionnelle aux spectateurs.
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
                  <CardDescription>Des outils professionnels et IA pour des streams de qualité.</CardDescription>
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
                  <CardDescription>Une multitude de contenus live pour tous les goûts.</CardDescription>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-secondary/10 transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-secondary/10 text-secondary rounded-full w-fit mb-2">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle>Connectez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Rejoignez une communauté passionnée et engagez-vous.</CardDescription>
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

