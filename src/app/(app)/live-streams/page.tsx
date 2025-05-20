
"use client";

import { PageHeader } from "@/components/page-header";
import { StreamCard } from "@/components/viewer/stream-card"; 
import { mockMusicTracks, musicGenres, getMusicByGenre, type MusicTrack } from "@/lib/mock-streams"; // Updated imports
import { Library, Wallet } from "lucide-react"; // Changed LibraryMusic to Library
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


const MOCK_WALLET_BALANCE_KEY = "mockWalletBalance";
const MOCK_UNLOCKED_TRACKS_KEY = "mockUnlockedTracks"; // Updated key


export default function AuthenticatedExploreMusicPage() { // Renamed component
  const [selectedGenre, setSelectedGenre] = useState<string>(musicGenres[0]); // Updated state
  const [filteredMusicTracks, setFilteredMusicTracks] = useState<MusicTrack[]>([]); // Updated state
  const { toast } = useToast();
  
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [unlockedTracks, setUnlockedTracks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedBalance = localStorage.getItem(MOCK_WALLET_BALANCE_KEY);
    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    } else {
      // Setting a default balance if none is found for demo purposes.
      // In a real app, this would come from a backend.
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, "2000");
      setWalletBalance(2000);
    }

    const storedUnlocked = localStorage.getItem(MOCK_UNLOCKED_TRACKS_KEY);
    if (storedUnlocked) {
      setUnlockedTracks(new Set(JSON.parse(storedUnlocked)));
    }
  }, []);


  useEffect(() => {
    setFilteredMusicTracks(getMusicByGenre(selectedGenre)); // Updated function call
  }, [selectedGenre]);

  const handleUnlockTrack = (trackId: string, price: number): boolean => { // Renamed function
    if (walletBalance >= price) {
      const newBalance = walletBalance - price;
      setWalletBalance(newBalance);
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, String(newBalance));

      const newUnlockedTracksSet = new Set(unlockedTracks).add(trackId); // Renamed variable
      setUnlockedTracks(newUnlockedTracksSet);
      localStorage.setItem(MOCK_UNLOCKED_TRACKS_KEY, JSON.stringify(Array.from(newUnlockedTracksSet)));
      
      const MOCK_TRANSACTION_HISTORY_KEY = "mockTransactionHistory";
      const storedHistory = localStorage.getItem(MOCK_TRANSACTION_HISTORY_KEY);
      let history = storedHistory ? JSON.parse(storedHistory) : [];
      const trackTitle = mockMusicTracks.find(s => s.id === trackId)?.title || "Contenu Musical";
      const newTransaction = {
        id: `txn_spend_track_${Date.now()}`, // Updated transaction ID prefix
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
            Votre solde est insuffisant pour acheter cette piste/cet album.
            <Button variant="link" asChild className="p-0 h-auto ml-1">
              <Link href="/account/wallet">Recharger votre compte.</Link>
            </Button>
          </div>
        ),
        variant: "destructive",
      });
      return false;
    }
  };


  return (
    <div className="container mx-auto">
      <PageHeader
        title="Explorer la Musique sur Zikcut"
        description="Découvrez de nouvelles pistes, albums, artistes et genres musicaux. Filtrez par style et trouvez votre prochain son."
        icon={Library} 
      />

      <Card className="mb-6 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-6 w-6 text-primary"/>
                    Votre Solde Zikcut
                </CardTitle>
                <CardDescription>Utilisez votre solde pour acheter des pistes ou albums exclusifs.</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-2xl font-bold text-primary">{walletBalance.toLocaleString()} CFA</p>
          <Button asChild>
            <Link href="/account/wallet">
              Gérer mon Portefeuille
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs value={selectedGenre} onValueChange={setSelectedGenre} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap">
          {musicGenres.map((genre) => ( 
            <TabsTrigger key={genre} value={genre} className="flex-1 lg:flex-none">
              {genre}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filteredMusicTracks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMusicTracks.map((track) => ( 
             <StreamCard 
              key={track.id} 
              stream={{ // Mapping MusicTrack to StreamCard's expected 'stream' prop
                id: track.id,
                title: track.title,
                streamerName: track.artistName,
                streamerAvatarUrl: track.artistAvatarUrl,
                category: track.genre,
                price: track.price,
                thumbnailUrl: track.artworkUrl,
                thumbnailAiHint: track.artworkAiHint,
                viewersCount: track.playCount,
                isLive: false, // Music tracks are not live
                description: track.description,
                duration: track.duration,
              }}
              onUnlockStream={handleUnlockTrack} 
              isUnlocked={unlockedTracks.has(track.id) || track.price === 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Aucune musique trouvée dans ce genre pour le moment.</p>
          <p className="text-muted-foreground mt-2">Essayez de sélectionner un autre genre ou revenez plus tard.</p>
        </div>
      )}
    </div>
  );
}

