
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, BarChart, Users, Settings, Share2, Sparkles, Languages, CreditCard, Scissors, PlaySquare, Tv, Smartphone } from "lucide-react";
import { Logo } from "@/components/logo";
import React from "react";

const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#fonctionnalites" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Fonctionnalités
          </Link>
          <Link href="#tarifs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Tarifs
          </Link>
          <Link href="#pourquoi-nous" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Pourquoi Nous?
          </Link>
          <Button asChild>
            <Link href="/dashboard">Tableau de Bord</Link>
          </Button>
        </nav>
        <div className="md:hidden">
           <Button asChild variant="outline">
            <Link href="/dashboard">Accès Streamer</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

const LandingFooter = () => {
  return (
    <footer className="border-t py-12 bg-muted/50">
      <div className="container text-center">
        <Logo />
        <p className="mt-4 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EnDirectAuSénégal. Tous droits réservés. <br/>
          La plateforme de streaming pensée pour les créateurs sénégalais.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          {/* Mock social links */}
          <Link href="#" className="text-muted-foreground hover:text-primary"><PlaySquare className="h-5 w-5" /></Link>
          <Link href="#" className="text-muted-foreground hover:text-primary"><Smartphone className="h-5 w-5" /></Link>
          <Link href="#" className="text-muted-foreground hover:text-primary"><Tv className="h-5 w-5" /></Link>
        </div>
      </div>
    </footer>
  );
};


const features = [
  {
    icon: Settings,
    title: "Streaming HD Professionnel",
    description: "Diffusez en haute définition avec des outils de personnalisation avancés : logos, superpositions, arrière-plans virtuels.",
    dataAiHint: "streaming setup",
  },
  {
    icon: Share2,
    title: "Multistreaming Facile",
    description: "Atteignez une audience maximale en diffusant simultanément sur YouTube, Facebook, Twitch et d'autres plateformes RTMP.",
    dataAiHint: "multistreaming platforms",
  },
  {
    icon: Sparkles,
    title: "Moments Forts par IA",
    description: "Ne perdez plus de temps à chercher les meilleurs moments. Notre IA génère automatiquement des extraits captivants de vos directs.",
    dataAiHint: "AI editing",
  },
  {
    icon: Scissors,
    title: "Vidéos Courtes IA",
    description: "Transformez vos longs directs en vidéos courtes (Shorts, Reels, TikToks) prêtes à publier, grâce à l'IA.",
    dataAiHint: "social media video",
  },
  {
    icon: Languages,
    title: "Traduction en Direct par IA",
    description: "Touchez un public mondial grâce à la traduction automatique et en temps réel de vos streams en plusieurs langues.",
    dataAiHint: "live translation",
  },
  {
    icon: CreditCard,
    title: "Monétisation Adaptée au Sénégal",
    description: "Intégrez facilement Sonatel Orange Money pour recevoir des paiements de vos spectateurs. Simple, rapide et local.",
    dataAiHint: "mobile payment",
  },
];

const whyUsPoints = [
  {
    icon: DollarSign,
    title: "Conçu pour le Marché Sénégalais",
    description: "Paiements via Orange Money, focus sur les créateurs et l'audience locale. Nous comprenons vos besoins.",
  },
  {
    icon: BarChart,
    title: "Technologie de Pointe et IA",
    description: "Bénéficiez d'outils IA innovants, d'une qualité HD et d'une plateforme stable pour des streams professionnels.",
  },
  {
    icon: Users,
    title: "Support Dédié et Communauté",
    description: "Notre équipe est là pour vous accompagner. Rejoignez une communauté de créateurs sénégalais passionnés.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Passez au Niveau Supérieur Avec <span className="text-primary">EnDirectAuSénégal</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La plateforme tout-en-un pour les streamers au Sénégal. Créez, diffusez, monétisez et captivez votre audience comme jamais auparavant.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard">Commencez Maintenant</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#fonctionnalites">Découvrir les Fonctionnalités</Link>
              </Button>
            </div>
             <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                <Image src="https://picsum.photos/seed/landinghero/1280/720" alt="Tableau de bord EnDirectAuSénégal" layout="fill" objectFit="cover" data-ai-hint="dashboard platform"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-left">
                    <h3 className="text-2xl font-semibold text-white">Votre Hub de Streaming Centralisé</h3>
                    <p className="text-white/80 mt-1">Gérez tout, du setup à la monétisation.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fonctionnalites" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Des Outils Puissants pour les Créateurs</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour produire des streams professionnels et engageants.
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
                     <Image src={`https://picsum.photos/seed/${feature.title.replace(/\s+/g, '')}/400/200`} alt={feature.title} width={400} height={200} className="rounded-md object-cover aspect-video w-full" data-ai-hint={feature.dataAiHint} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Notre Modèle Équitable : <span className="text-primary">5% Seulement</span></h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Nous croyons en un partenariat transparent. EnDirectAuSénégal prélève une commission de seulement 5% sur les revenus que vous générez via la plateforme. Pas de frais cachés, pas de coûts initiaux élevés.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Plus vous gagnez, plus nous gagnons. Notre succès est lié au vôtre.
              </p>
              <Card className="mt-8 text-left shadow-md p-6 bg-background">
                <CardTitle className="text-xl mb-3">Ce que cela signifie pour vous :</CardTitle>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Gardez 95% de vos revenus :</strong> La grande majorité de ce que vous gagnez vous revient directement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Accès complet à la plateforme :</strong> Profitez de toutes nos fonctionnalités, y compris les outils IA, pour cette commission unique.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Alignement d'intérêts :</strong> Nous sommes motivés à vous aider à réussir et à augmenter votre audience et vos revenus.</span>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Pourquoi Choisir EnDirectAuSénégal ?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Nous sommes plus qu'une simple plateforme. Nous sommes votre partenaire pour le streaming au Sénégal.
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
            <h2 className="text-3xl md:text-4xl font-bold">Prêt à Révolutionner Vos Streams ?</h2>
            <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
              Rejoignez la communauté des streamers sénégalais qui font confiance à EnDirectAuSénégal.
              Inscrivez-vous gratuitement et commencez à diffuser dès aujourd'hui.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" asChild className="text-secondary-foreground hover:bg-secondary/90">
                <Link href="/dashboard">Créer Mon Compte Streamer</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
