
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Compass, Sparkles, Users as UsersIcon, CalendarDays, ArrowRight, Music2, LibraryMusic, Mic2 } from "lucide-react";
import { ExploreNavbar } from "@/components/explore/explore-navbar";
import { ExploreFooter } from "@/components/explore/explore-footer";
import { StreamCard } from "@/components/viewer/stream-card"; // Will be adapted to MusicTrackCard later
import type { Stream } from "@/lib/mock-streams"; // Will be adapted to MusicTrack later
import { mockStreams } from "@/lib/mock-streams"; // Will be adapted to mockMusicTracks later
import type { ExploreCategory, TopStreamer, PlannedStream } from "@/lib/mock-explore-data";
import { exploreCategories, topStreamers, plannedStreams } from "@/lib/mock-explore-data"; // Data needs update
import { CategoryCard } from "@/components/explore/category-card"; // Card needs content update
import { StreamerCard } from "@/components/explore/streamer-card"; // Card needs content update
import { PlannedStreamCard } from "@/components/explore/planned-stream-card"; // Card needs content update
import React, { useState, useEffect }from "react";
import { useToast } from "@/hooks/use-toast";


// Dummy onUnlockStream for StreamCard as it's not the focus of this page
const MOCK_WALLET_BALANCE_KEY = "mockWalletBalance";
const MOCK_UNLOCKED_STREAMS_KEY = "mockUnlockedStreams";

export default function ExplorePage() {
  // TODO: Adapt this mock data and filtering to music tracks
  const featuredStreams = mockStreams.filter(s => s.isLive).sort((a, b) => b.viewersCount - a.viewersCount).slice(0, 6);
  const { toast } = useToast();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [unlockedStreams, setUnlockedStreams] = useState<Set<string>>(new Set()); // To be adapted for tracks

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

  // This function will need to be adapted for unlocking music tracks if they are paid
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
      const streamTitle = mockStreams.find(s => s.id === streamId)?.title || "Contenu Musical"; // Changed "Stream"
      const newTransaction = {
        id: `txn_spend_${Date.now()}`,
        date: new Date().toISOString(),
        description: `Achat: ${streamTitle}`, // Changed "Déblocage"
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
              src="https://placehold.co/1920x1080.png"
              alt="Ambiance musicale Zikcut"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
              data-ai-hint="music ambiance abstract"
              priority
            />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
          </div>
          <div className="container text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Explorez un Univers de <span className="text-primary">Créations Musicales</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez des artistes talentueux, des pistes générées par IA, des genres variés et des communautés vibrantes. Votre prochaine pépite musicale commence ici sur Zikcut.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Rechercher musique, genres, artistes, influenceurs..."
                  className="h-12 text-base pl-12 pr-4 rounded-full shadow-md"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-base">
                <Link href="/explore-music"> {/* This path should lead to the main music library / viewer page */}
                  <LibraryMusic className="mr-2 h-5 w-5" /> Parcourir Toute la Musique
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Tracks Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
                <Music2 className="mr-3 h-7 w-7 text-primary" /> Pistes en Vedette
              </h2>
              <Button variant="outline" asChild>
                <Link href="/explore-music">
                  Voir Tout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {/* TODO: Replace StreamCard with MusicTrackCard and use actual music data */}
            {featuredStreams.length > 0 ? (
              <ScrollArea className="w-full pb-4">
                <div className="flex space-x-6">
                  {featuredStreams.map((stream) => (
                    <div key={stream.id} className="w-[300px] sm:w-[320px] shrink-0">
                      <StreamCard stream={stream} onUnlockStream={handleUnlockStream} isUnlocked={unlockedStreams.has(stream.id)} />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            ) : (
                <p className="text-muted-foreground text-center py-8">Aucune piste en vedette pour le moment.</p>
            )}
          </div>
        </section>

        {/* Music Genres Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Explorer par Genres Musicaux
            </h2>
             {/* TODO: Update exploreCategories with music genres and CategoryCard to display them */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {exploreCategories.slice(0, 8).map((category) => ( 
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
            {exploreCategories.length > 8 && (
                 <div className="text-center mt-10">
                    <Button variant="default" size="lg" asChild>
                        <Link href="/explore-music?filter=genres"> {/* Or a dedicated genres page */}
                            Voir Tous les Genres
                        </Link>
                    </Button>
                </div>
            )}
             {exploreCategories.length === 0 && (
                 <p className="text-muted-foreground text-center py-8">Les genres musicaux arrivent bientôt.</p>
            )}
          </div>
        </section>

        {/* Top Artists & Influencers Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 flex items-center justify-center">
              <Mic2 className="mr-3 h-8 w-8 text-primary" /> Nos Artistes & Influenceurs Vedettes
            </h2>
            {/* TODO: Update topStreamers with artists/influencers and StreamerCard to ArtistCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {topStreamers.slice(0,6).map((streamer) => ( 
                <StreamerCard key={streamer.id} streamer={streamer} />
              ))}
            </div>
             {topStreamers.length === 0 && (
                <p className="text-muted-foreground text-center py-8">Découvrez bientôt nos artistes et influenceurs vedettes.</p>
            )}
          </div>
        </section>
        
        {/* Upcoming Releases & Events Section */}
        <section className="py-12 md:py-16 bg-primary/5">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center">
                <CalendarDays className="mr-3 h-8 w-8 text-primary" /> Sorties & Événements à Venir
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Ne manquez pas les nouvelles sorties, les lancements d'albums et événements exclusifs.
              </p>
            </div>
            {/* TODO: Update plannedStreams with music releases and PlannedStreamCard to UpcomingReleaseCard */}
            {plannedStreams.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plannedStreams.map((stream) => (
                    <PlannedStreamCard key={stream.id} stream={stream} />
                ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-8">Aucun événement spécial ou sortie programmée pour le moment. Revenez bientôt !</p>
            )}
          </div>
        </section>

      </main>

      <ExploreFooter />
    </div>
  );
}
