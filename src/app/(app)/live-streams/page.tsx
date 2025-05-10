
"use client";

import { PageHeader } from "@/components/page-header";
import { StreamCard } from "@/components/viewer/stream-card";
import { mockStreams, streamCategories, getStreamsByCategory, type Stream } from "@/lib/mock-streams";
import { Tv2, Wallet } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


// Simulate wallet balance and unlocked streams
const MOCK_WALLET_BALANCE_KEY = "mockWalletBalance";
const MOCK_UNLOCKED_STREAMS_KEY = "mockUnlockedStreams";


export default function LiveStreamsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(streamCategories[0]);
  const [filteredStreams, setFilteredStreams] = useState<Stream[]>([]);
  const { toast } = useToast();
  
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [unlockedStreams, setUnlockedStreams] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load mock wallet balance from localStorage
    const storedBalance = localStorage.getItem(MOCK_WALLET_BALANCE_KEY);
    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    } else {
      // Initialize with a default balance for demo
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, "2000");
      setWalletBalance(2000);
    }

    // Load unlocked streams from localStorage
    const storedUnlocked = localStorage.getItem(MOCK_UNLOCKED_STREAMS_KEY);
    if (storedUnlocked) {
      setUnlockedStreams(new Set(JSON.parse(storedUnlocked)));
    }
  }, []);


  useEffect(() => {
    setFilteredStreams(getStreamsByCategory(selectedCategory));
  }, [selectedCategory]);

  const handleUnlockStream = (streamId: string, price: number): boolean => {
    if (walletBalance >= price) {
      const newBalance = walletBalance - price;
      setWalletBalance(newBalance);
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, String(newBalance));

      const newUnlockedStreams = new Set(unlockedStreams).add(streamId);
      setUnlockedStreams(newUnlockedStreams);
      localStorage.setItem(MOCK_UNLOCKED_STREAMS_KEY, JSON.stringify(Array.from(newUnlockedStreams)));
      
      return true;
    } else {
      toast({
        title: "Solde Insuffisant",
        description: (
          <div>
            Votre solde est insuffisant pour débloquer ce stream.
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
        title="Streams en Direct"
        description="Découvrez les streams en cours et rejoignez la communauté."
        icon={Tv2}
      />

      <Card className="mb-6 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-6 w-6 text-primary"/>
                    Votre Solde
                </CardTitle>
                <CardDescription>Utilisez votre solde pour débloquer des streams payants.</CardDescription>
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

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:flex lg:flex-wrap">
          {streamCategories.map((category) => (
            <TabsTrigger key={category} value={category} className="flex-1 lg:flex-none">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filteredStreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStreams.map((stream) => (
            <StreamCard 
              key={stream.id} 
              stream={stream} 
              onUnlockStream={handleUnlockStream}
              isUnlocked={unlockedStreams.has(stream.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Aucun stream en direct dans cette catégorie pour le moment.</p>
          <p className="text-muted-foreground mt-2">Essayez de sélectionner une autre catégorie ou revenez plus tard.</p>
        </div>
      )}
    </div>
  );
}
