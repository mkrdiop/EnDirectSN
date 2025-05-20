
"use client";

import { PageHeader } from "@/components/page-header";
// TODO: Replace StreamCard with a MusicTrackCard component
import { StreamCard } from "@/components/viewer/stream-card"; 
// TODO: Replace mockStreams, streamCategories, getStreamsByCategory with music-specific data and functions
import { mockStreams, streamCategories, getStreamsByCategory, type Stream } from "@/lib/mock-streams";
import { Library, Wallet, Music2 } from "lucide-react"; // Changed LibraryMusic to Library
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


const MOCK_WALLET_BALANCE_KEY = "mockWalletBalance";
const MOCK_UNLOCKED_STREAMS_KEY = "mockUnlockedStreams"; // Will become MOCK_UNLOCKED_TRACKS_KEY


export default function ExploreMusicPage() { // Renamed component
  // TODO: Update selectedCategory and filteredStreams to use music genres and tracks
  const [selectedCategory, setSelectedCategory] = useState<string>(streamCategories[0]);
  const [filteredStreams, setFilteredStreams] = useState<Stream[]>([]); // Should be MusicTrack[]
  const { toast } = useToast();
  
  const [walletBalance, setWalletBalance] = useState<number>(0);
  // TODO: Update unlockedStreams to unlockedTracks (Set of track IDs)
  const [unlockedStreams, setUnlockedStreams] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedBalance = localStorage.getItem(MOCK_WALLET_BALANCE_KEY);
    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    } else {
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, "2000");
      setWalletBalance(2000);
    }

    const storedUnlocked = localStorage.getItem(MOCK_UNLOCKED_STREAMS_KEY);
    if (storedUnlocked) {
      setUnlockedStreams(new Set(JSON.parse(storedUnlocked)));
    }
  }, []);


  useEffect(() => {
    // TODO: Replace with getMusicByGenre or similar
    setFilteredStreams(getStreamsByCategory(selectedCategory));
  }, [selectedCategory]);

  // TODO: Adapt this function for unlocking music tracks
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
        icon={Library} // Changed icon
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

      {/* TODO: Update Tabs to use music genres from a new mock data source */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap">
          {streamCategories.map((category) => ( // streamCategories should become musicGenres
            <TabsTrigger key={category} value={category} className="flex-1 lg:flex-none">
              {category} {/* Category names should be music genres */}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* TODO: Replace StreamCard with MusicTrackCard and use music track data */}
      {filteredStreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStreams.map((stream) => ( // stream should be musicTrack
            <StreamCard 
              key={stream.id} 
              stream={stream} // Prop should be musicTrack
              onUnlockStream={handleUnlockStream} // Functionality might change for music
              isUnlocked={unlockedStreams.has(stream.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Aucune musique trouvée dans cette catégorie pour le moment.</p>
          <p className="text-muted-foreground mt-2">Essayez de sélectionner un autre genre ou revenez plus tard.</p>
        </div>
      )}
    </div>
  );
}
