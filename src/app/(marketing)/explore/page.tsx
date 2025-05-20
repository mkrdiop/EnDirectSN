
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Compass, Music2, Library, Mic2, CalendarDays, ArrowRight, Users as UsersIcon } from "lucide-react"; // Updated icons
import { ExploreNavbar } from "@/components/explore/explore-navbar";
import { ExploreFooter } from "@/components/explore/explore-footer";
import { StreamCard } from "@/components/viewer/stream-card"; 
import type { MusicTrack } from "@/lib/mock-streams"; // Adapted to MusicTrack
import { mockMusicTracks } from "@/lib/mock-streams"; // Adapted to mockMusicTracks
import type { MusicGenreCategory, TopArtist, UpcomingRelease } from "@/lib/mock-explore-data"; // Adapted types
import { musicGenreCategories as initialMusicGenreCategories, topArtists as initialTopArtists, upcomingReleases as initialUpcomingReleases } from "@/lib/mock-explore-data"; // Adapted data
import { CategoryCard } from "@/components/explore/category-card"; 
import { StreamerCard } from "@/components/explore/streamer-card"; // Will be adapted to ArtistCard visually by data
import { PlannedStreamCard } from "@/components/explore/planned-stream-card"; // Will be adapted to ReleaseCard visually by data
import React, { useState, useEffect }from "react";
import { useToast } from "@/hooks/use-toast";
import { generateLandingImage } from "@/ai/flows/generate-landing-image-flow";
import { Skeleton } from "@/components/ui/skeleton";

const MOCK_WALLET_BALANCE_KEY = "mockWalletBalance";
const MOCK_UNLOCKED_TRACKS_KEY = "mockUnlockedTracks"; // Adapted key

export default function ExploreMusicPage() { // Renamed component
  const [heroImageUrl, setHeroImageUrl] = useState("https://placehold.co/1920x1080.png?text=Chargement+Ambiance+Musicale...");
  const [isHeroImageLoading, setIsHeroImageLoading] = useState(true);

  const [featuredTracks, setFeaturedTracks] = useState<MusicTrack[]>(
    mockMusicTracks.filter(t => t.isFeatured).slice(0, 6).map(track => ({...track, isLoading: true}))
  );
  const [musicGenreCategories, setMusicGenreCategories] = useState<MusicGenreCategory[]>(
     initialMusicGenreCategories.slice(0,8).map(cat => ({...cat, isLoading: true}))
  );
  const [topArtists, setTopArtists] = useState<TopArtist[]>(
    initialTopArtists.slice(0,6).map(artist => ({...artist, isLoading: true}))
  );
  const [upcomingReleases, setUpcomingReleases] = useState<UpcomingRelease[]>(
    initialUpcomingReleases.map(release => ({...release, isLoading: true}))
  );

  const { toast } = useToast();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [unlockedTracks, setUnlockedTracks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchImage = async (prompt: string, fallback: string): Promise<string> => {
      try {
        const { imageDataUri } = await generateLandingImage({ prompt });
        return imageDataUri;
      } catch (error) {
        console.error(`Failed to generate image for prompt "${prompt}":`, error);
        return fallback;
      }
    };

    const loadHeroImage = async () => {
      setIsHeroImageLoading(true);
      const url = await fetchImage("Vibrant abstract music background, soundwaves and colors, Zikcut branding", "https://placehold.co/1920x1080.png?text=Erreur+Image");
      setHeroImageUrl(url);
      setIsHeroImageLoading(false);
    };
    loadHeroImage();

    const loadFeaturedTrackArtworks = async () => {
      const updatedTracks = await Promise.all(
        featuredTracks.map(async (track) => {
          if (track.isLoading) {
            const artworkUrl = await fetchImage(track.artworkAiHint, track.artworkUrl);
            return { ...track, artworkUrl, isLoading: false };
          }
          return track;
        })
      );
      setFeaturedTracks(updatedTracks);
    };
    loadFeaturedTrackArtworks();

    const loadGenreImages = async () => {
        const updatedCategories = await Promise.all(
            musicGenreCategories.map(async (category) => {
                if (category.isLoading) {
                    const imageUrl = await fetchImage(category.imagePrompt || category.aiHint, category.imageUrl);
                    return { ...category, imageUrl, isLoading: false };
                }
                return category;
            })
        );
        setMusicGenreCategories(updatedCategories);
    };
    loadGenreImages();

    const loadArtistAvatars = async () => {
        const updatedArtists = await Promise.all(
            topArtists.map(async (artist) => {
                if (artist.isLoading) {
                    const avatarUrl = await fetchImage(artist.avatarImagePrompt || artist.avatarAiHint, artist.avatarUrl);
                    return { ...artist, avatarUrl, isLoading: false };
                }
                return artist;
            })
        );
        setTopArtists(updatedArtists);
    };
    loadArtistAvatars();
    
    const loadReleaseArtworks = async () => {
        const updatedReleases = await Promise.all(
            upcomingReleases.map(async (release) => {
                if (release.isLoading) {
                    const artworkUrl = await fetchImage(release.artworkImagePrompt || release.artworkAiHint, release.artworkUrl);
                    const artistAvatarUrl = await fetchImage(release.artistAvatarImagePrompt || release.artistAvatarAiHint, release.artistAvatarUrl);
                    return { ...release, artworkUrl, artistAvatarUrl, isLoading: false };
                }
                return release;
            })
        );
        setUpcomingReleases(updatedReleases);
    };
    loadReleaseArtworks();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount


  useEffect(() => {
    const storedBalance = localStorage.getItem(MOCK_WALLET_BALANCE_KEY);
    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    }
    const storedUnlocked = localStorage.getItem(MOCK_UNLOCKED_TRACKS_KEY);
    if (storedUnlocked) {
      setUnlockedTracks(new Set(JSON.parse(storedUnlocked)));
    }
  }, []);

  const handleUnlockTrack = (trackId: string, price: number): boolean => {
    if (walletBalance >= price) {
      const newBalance = walletBalance - price;
      setWalletBalance(newBalance);
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, String(newBalance));

      const newUnlockedTracks = new Set(unlockedTracks).add(trackId);
      setUnlockedTracks(newUnlockedTracks);
      localStorage.setItem(MOCK_UNLOCKED_TRACKS_KEY, JSON.stringify(Array.from(newUnlockedTracks)));
      
      const MOCK_TRANSACTION_HISTORY_KEY = "mockTransactionHistory";
      const storedHistory = localStorage.getItem(MOCK_TRANSACTION_HISTORY_KEY);
      let history = storedHistory ? JSON.parse(storedHistory) : [];
      const trackTitle = mockMusicTracks.find(t => t.id === trackId)?.title || "Piste Musicale";
      const newTransaction = {
        id: `txn_spend_music_${Date.now()}`,
        date: new Date().toISOString(),
        description: `Achat: ${trackTitle}`,
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
            Votre solde est insuffisant pour acheter cette piste.
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
            {isHeroImageLoading ? (
              <Skeleton className="w-full h-full opacity-20" />
            ) : (
              <Image
                src={heroImageUrl}
                alt="Ambiance musicale Zikcut"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
                data-ai-hint="music ambiance abstract"
                priority
              />
            )}
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
                  placeholder="Rechercher musique, genres, artistes..."
                  className="h-12 text-base pl-12 pr-4 rounded-full shadow-md"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-base">
                <Link href="/explore-music"> 
                  <Library className="mr-2 h-5 w-5" /> Parcourir Toute la Musique
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
                <Link href="/explore-music?filter=featured">
                  Voir Tout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {featuredTracks.length > 0 ? (
              <ScrollArea className="w-full pb-4">
                <div className="flex space-x-6">
                  {featuredTracks.map((track) => (
                    <div key={track.id} className="w-[300px] sm:w-[320px] shrink-0">
                       {track.isLoading ? <Skeleton className="h-[450px] w-full rounded-lg" /> :
                        <StreamCard // Adapting StreamCard to display MusicTrack
                          stream={{ // Mapping MusicTrack to Stream props
                            id: track.id,
                            title: track.title,
                            streamerName: track.artistName,
                            streamerAvatarUrl: track.artistAvatarUrl,
                            category: track.genre,
                            price: track.price,
                            thumbnailUrl: track.artworkUrl,
                            thumbnailAiHint: track.artworkAiHint,
                            viewersCount: track.playCount,
                            isLive: false, // Music tracks are not live streams
                            description: track.description,
                          }}
                          onUnlockStream={handleUnlockTrack} 
                          isUnlocked={unlockedTracks.has(track.id) || track.price === 0}
                        />
                       }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {musicGenreCategories.map((category) => ( 
                category.isLoading ? <Skeleton key={category.slug} className="h-[300px] w-full rounded-lg" /> :
                <CategoryCard key={category.slug} category={{
                    name: category.name,
                    slug: `/explore-music?genre=${category.slug}`, // Updated link
                    icon: category.icon,
                    imageUrl: category.imageUrl,
                    aiHint: category.aiHint,
                    description: category.description,
                }} />
              ))}
            </div>
            {initialMusicGenreCategories.length > 8 && ( // Check original length
                 <div className="text-center mt-10">
                    <Button variant="default" size="lg" asChild>
                        <Link href="/explore-music?filter=all-genres">
                            Voir Tous les Genres
                        </Link>
                    </Button>
                </div>
            )}
             {musicGenreCategories.length === 0 && !initialMusicGenreCategories.some(c => c.isLoading) && ( // Check if initial load complete and still empty
                 <p className="text-muted-foreground text-center py-8">Les genres musicaux arrivent bientôt.</p>
            )}
          </div>
        </section>

        {/* Top Artists Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 flex items-center justify-center">
              <Mic2 className="mr-3 h-8 w-8 text-primary" /> Nos Artistes & Influenceurs Vedettes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {topArtists.map((artist) => ( 
                 artist.isLoading ? <Skeleton key={artist.id} className="h-[150px] w-full rounded-lg" /> :
                <StreamerCard key={artist.id} streamer={{ // Mapping TopArtist to TopStreamer props
                    id: artist.id,
                    name: artist.name,
                    avatarUrl: artist.avatarUrl,
                    avatarAiHint: artist.avatarAiHint,
                    specialty: artist.mainGenre,
                    followers: artist.followerCount,
                    isLive: artist.isVerified || false, // Using isLive to show a "verified" like badge perhaps
                }} />
              ))}
            </div>
             {topArtists.length === 0 && !initialTopArtists.some(a => a.isLoading) && (
                <p className="text-muted-foreground text-center py-8">Découvrez bientôt nos artistes et influenceurs vedettes.</p>
            )}
          </div>
        </section>
        
        {/* Upcoming Releases Section */}
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
            {upcomingReleases.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingReleases.map((release) => (
                    release.isLoading ? <Skeleton key={release.id} className="h-[400px] w-full rounded-lg" /> :
                    <PlannedStreamCard key={release.id} stream={{ // Mapping UpcomingRelease to PlannedStream props
                        id: release.id,
                        title: `${release.type}: ${release.title}`,
                        streamerName: release.artistName,
                        streamerAvatarUrl: release.artistAvatarUrl,
                        streamerAvatarAiHint: release.artistAvatarAiHint,
                        category: release.genre,
                        scheduledTime: release.releaseDate,
                        thumbnailUrl: release.artworkUrl,
                        aiHint: release.artworkAiHint,
                        description: release.description
                    }} />
                ))}
                </div>
            ) : (
                 !initialUpcomingReleases.some(r => r.isLoading) && 
                <p className="text-muted-foreground text-center py-8">Aucun événement spécial ou sortie programmée pour le moment. Revenez bientôt !</p>
            )}
          </div>
        </section>

      </main>

      <ExploreFooter />
    </div>
  );
}
