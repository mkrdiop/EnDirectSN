
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Tv2, MessageSquareText, Wallet, Heart, Smartphone, PlaySquare, Users, MonitorPlay, Lock, Laptop, Tv } from "lucide-react";
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
            <Link href="/live-streams">
              <span>Explorer les Streams</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              <span>Espace Créateur</span>
            </Link> {/* Keep a link to streamer space */}
          </Button>
        </nav>
        <div className="md:hidden">
           <Button asChild variant="outline">
            <Link href="/live-streams">
              <span>Streams</span>
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
          &copy; {new Date().getFullYear()} EnDirectAuSénégal. Tous droits réservés. <br/>
          Votre portail vers le meilleur du streaming sénégalais et de la diaspora.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="/live-streams" className="text-muted-foreground hover:text-primary"><PlaySquare className="h-5 w-5" /></Link>
          <Link href="#" className="text-muted-foreground hover:text-primary"><Smartphone className="h-5 w-5" /></Link>
          <Link href="#" className="text-muted-foreground hover:text-primary"><Tv className="h-5 w-5" /></Link>
        </div>
      </div>
    </footer>
  );
};

const viewerFeatures = [
  {
    icon: Search,
    title: "Diversité de Contenus Uniques",
    description: "Explorez des milliers de streams : musique, culture, éducation, gaming, sport, débats et bien plus, par des créateurs sénégalais et de la diaspora.",
    dataAiHint: "content discovery",
  },
  {
    icon: MonitorPlay,
    title: "Qualité HD Immersive",
    description: "Vivez chaque instant en haute définition. Profitez d'une expérience de visionnage fluide et de qualité professionnelle, sans interruption.",
    dataAiHint: "hd streaming",
  },
  {
    icon: MessageSquareText,
    title: "Interagissez en Temps Réel",
    description: "Rejoignez la conversation ! Chattez avec les streamers et la communauté, réagissez en direct et faites partie intégrante de l'expérience.",
    dataAiHint: "live chat",
  },
  {
    icon: Wallet,
    title: "Accès Flexible et Sécurisé",
    description: "Regardez de nombreux streams gratuits ou accédez à du contenu exclusif. Rechargez facilement votre compte avec Orange Money.",
    dataAiHint: "secure payment wallet",
  },
  {
    icon: Heart,
    title: "Soutenez Vos Créateurs Préférés",
    description: "En choisissant des streams payants ou en faisant des dons, vous supportez directement les talents et la créativité que vous aimez.",
    dataAiHint: "creator support",
  },
  {
    icon: Laptop,
    title: "Disponible Partout, Tout le Temps",
    description: "Accédez à EnDirectAuSénégal sur votre ordinateur, tablette ou smartphone. Ne manquez jamais un direct, où que vous soyez.",
    dataAiHint: "multi-platform access",
  },
];

const howItWorksSteps = [
    { title: "Inscrivez-vous Gratuitement", description: "Créez votre compte spectateur en quelques clics et commencez à explorer." },
    { title: "Découvrez les Streams", description: "Naviguez par catégories, popularité ou suivez vos créateurs favoris." },
    { title: "Rechargez Votre Portefeuille", description: "Pour les streams payants, ajoutez des fonds facilement via Orange Money." },
    { title: "Profitez du Direct !", description: "Regardez, interagissez et vivez des moments uniques en direct." },
];


export default function ViewersLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ViewersLandingNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Plongez au Cœur de l'Action <br className="hidden md:block" />avec <span className="text-primary">EnDirectAuSénégal</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Votre destination unique pour le streaming live du Sénégal et de sa diaspora. Musique, culture, débats, gaming – tout y est !
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/live-streams">
                  <span>Explorer les Streams</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#avantages">
                  <span>Pourquoi Nous Choisir ?</span>
                </Link>
              </Button>
            </div>
             <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                <Image src="https://picsum.photos/seed/viewerhero/1280/720" alt="Spectateurs regardant un stream EnDirectAuSénégal" layout="fill" objectFit="cover" data-ai-hint="audience watching stream"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-left">
                    <h3 className="text-2xl font-semibold text-white">Le Meilleur du Direct, à Portée de Clic</h3>
                    <p className="text-white/80 mt-1">Une expérience de visionnage exceptionnelle vous attend.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="avantages" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Une Expérience de Streaming Inégalée</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Profitez d'une plateforme conçue pour vous, le spectateur.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {viewerFeatures.map((feature) => (
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
                   <CardContent className="pt-0"> {/* Adjusted from CardFooter for layout consistency */}
                     <Image src={`https://picsum.photos/seed/${feature.title.replace(/\s+/g, '')}/400/200`} alt={feature.title} width={400} height={200} className="rounded-md object-cover aspect-video w-full" data-ai-hint={feature.dataAiHint} />
                  </CardContent>
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
                Rejoindre l'expérience EnDirectAuSénégal est rapide et facile.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <Card key={index} className="shadow-md text-center p-6 flex flex-col items-center">
                    <div className="mb-4 p-3 bg-primary text-primary-foreground rounded-full text-2xl font-bold w-12 h-12 flex items-center justify-center">
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ce Que Disent Nos Spectateurs</h2>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg">
                <CardDescription className="italic">"Enfin une plateforme qui met en avant les talents locaux ! J'adore la variété des streams."</CardDescription>
                <p className="mt-4 font-semibold text-right">- Aïssatou D., Dakar</p>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardDescription className="italic">"Super facile de recharger mon compte avec Orange Money. La qualité HD est top !"</CardDescription>
                <p className="mt-4 font-semibold text-right">- Moussa B., Paris (Diaspora)</p>
              </Card>
              <Card className="p-6 shadow-lg">
                <CardDescription className="italic">"Je découvre de nouveaux artistes sénégalais tous les jours. C'est ma nouvelle app préférée !"</CardDescription>
                <p className="mt-4 font-semibold text-right">- Fatou K., New York (Diaspora)</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Prêt à Plonger Dans le Direct ?</h2>
            <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
              Des milliers de streams captivants vous attendent. Rejoignez la communauté EnDirectAuSénégal et vivez des moments inoubliables.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-secondary-foreground hover:bg-secondary/90">
                <Link href="/live-streams">
                  <span>Explorer les Streams</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="#">
                  <span>Créer Mon Compte (Bientôt)</span>
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

