
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Compass, Sparkles, Users as UsersIcon, CalendarDays, ArrowRight } from "lucide-react";
import { ExploreNavbar } from "@/components/explore/explore-navbar";
import { ExploreFooter } from "@/components/explore/explore-footer";
import { StreamCard } from "@/components/viewer/stream-card";
import type { Stream } from "@/lib/mock-streams";
import { mockStreams } from "@/lib/mock-streams";
import type { ExploreCategory, TopStreamer } from "@/lib/mock-explore-data";
import { exploreCategories, topStreamers } from "@/lib/mock-explore-data";
import { CategoryCard } from "@/components/explore/category-card";
import { StreamerCard } from "@/components/explore/streamer-card";
import React, { useState, useEffect }from "react";
import { useToast } from "@/hooks/use-toast";


// Dummy onUnlockStream for StreamCard as it's not the focus of this page
const MOCK_WALLET_BALANCE_KEY = "mockWalletBalance";
const MOCK_UNLOCKED_STREAMS_KEY = "mockUnlockedStreams";

export default function ExplorePage() {
  const featuredStreams = mockStreams.filter(s => s.isLive).sort((a, b) => b.viewersCount - a.viewersCount).slice(0, 6);
  const { toast } = useToast();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [unlockedStreams, setUnlockedStreams] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedBalance = localStorage.getItem(MOCK_WALLET_BALANCE_KEY);
    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    }
    const storedUnlocked = localStorage.getItem(MOCK_UNLOCKED_STREAMS_KEY);
    if (storedUnlocked) {
      setUnlockedStreams(new Set(JSON.parse(storedUnlocked)));
    }
  }, []);

  const handleUnlockStream = (streamId: string, price: number): boolean => {
    if (walletBalance >= price) {
      const newBalance = walletBalance - price;
      setWalletBalance(newBalance);
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, String(newBalance));

      const newUnlockedStreams = new Set(unlockedStreams).add(streamId);
      setUnlockedStreams(newUnlockedStreams);
      localStorage.setItem(MOCK_UNLOCKED_STREAMS_KEY, JSON.stringify(Array.from(newUnlockedStreams)));
      
      const MOCK_TRANSACTION_HISTORY_KEY = "mockTransactionHistory";
      const storedHistory = localStorage.getItem(MOCK_TRANSACTION_HISTORY_KEY);
      let history = storedHistory ? JSON.parse(storedHistory) : [];
      const streamTitle = mockStreams.find(s => s.id === streamId)?.title || "Stream";
      const newTransaction = {
        id: `txn_spend_${Date.now()}`,
        date: new Date().toISOString(),
        description: `Déblocage: ${streamTitle}`,
        amount: -price,
        type: "spend",
      };
      history = [newTransaction, ...history].slice(0,10);
      localStorage.setItem(MOCK_TRANSACTION_HISTORY_KEY, JSON.stringify(history));
      return true;
    } else {
      toast({
        title: "Solde Insuffisant",
        description: (
          <div>
            Votre solde est insuffisant.
            <Button variant="link" asChild className="p-0 h-auto ml-1">
              <Link href="/account/wallet">Recharger.</Link>
            </Button>
          </div>
        ),
        variant: "destructive",
      });
      return false;
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ExploreNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/explorehero/1920/1080"
              alt="Ambiance de streaming en direct"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
              data-ai-hint="live streaming ambiance"
              priority
            />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
          </div>
          <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Explorez un Monde de <span className="text-primary">Streams Uniques</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez des créateurs passionnés, des contenus variés et des communautés vibrantes. Votre prochaine découverte commence ici.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Rechercher des streams, catégories, créateurs..."
                  className="h-12 text-base pl-12 pr-4 rounded-full shadow-md"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-base">
                <Link href="/live-streams">
                  <Compass className="mr-2 h-5 w-5" /> Parcourir Tous les Streams
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Streams Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
                <Sparkles className="mr-3 h-7 w-7 text-primary" /> En Vedette Actuellement
              </h2>
              <Button variant="outline" asChild>
                <Link href="/live-streams">
                  Voir Tout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <ScrollArea className="w-full pb-4">
              <div className="flex space-x-6">
                {featuredStreams.map((stream) => (
                  <div key={stream.id} className="w-[320px] shrink-0">
                    <StreamCard stream={stream} onUnlockStream={handleUnlockStream} isUnlocked={unlockedStreams.has(stream.id)} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Explorer par Catégories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {exploreCategories.slice(0, 8).map((category) => ( // Show up to 8 categories
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
            {exploreCategories.length > 8 && (
                 <div className="text-center mt-10">
                    <Button variant="default" size="lg" asChild>
                        <Link href="/live-streams"> {/* Or a dedicated categories page */}
                            Voir Toutes les Catégories
                        </Link>
                    </Button>
                </div>
            )}
          </div>
        </section>

        {/* Top Streamers Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 flex items-center justify-center">
              <UsersIcon className="mr-3 h-8 w-8 text-primary" /> Nos Créateurs Vedettes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {topStreamers.slice(0,6).map((streamer) => ( // Show up to 6 streamers
                <StreamerCard key={streamer.id} streamer={streamer} />
              ))}
            </div>
            {/* Placeholder for "View All Streamers" button if needed */}
          </div>
        </section>
        
        {/* Upcoming Streams Section Placeholder */}
        <section className="py-12 md:py-16 bg-primary/5">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center justify-center">
                <CalendarDays className="mr-3 h-8 w-8 text-primary" /> À ne pas manquer
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Découvrez les streams et événements spéciaux programmés par vos créateurs préférés.
                (Fonctionnalité bientôt disponible)
            </p>
            <div className="grid md:grid-cols-3 gap-6 opacity-50">
                {[1,2,3].map(i => (
                    <Card key={i} className="p-6 shadow-md">
                        <CardHeader>
                            <Image src={`https://picsum.photos/seed/upcoming${i}/300/150`} width={300} height={150} alt="Stream à venir" className="rounded-md mb-3" data-ai-hint="event placeholder"/>
                            <CardTitle>Événement Spécial {i}</CardTitle>
                            <CardDescription>Par Créateur Populaire - Le 30 Mai à 20h00</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button disabled>M'alerter (Bientôt)</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </section>

      </main>

      <ExploreFooter />
    </div>
  );
}
