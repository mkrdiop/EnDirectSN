
"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Wallet, PlusCircle, History, DollarSign } from "lucide-react";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";


const MOCK_WALLET_BALANCE_KEY = "mockWalletBalance";
const MOCK_TRANSACTION_HISTORY_KEY = "mockTransactionHistory";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number; // Positive for deposit, negative for spending
  type: "deposit" | "spend";
}

const rechargeSchema = z.object({
  amount: z.coerce.number().min(500, "Le montant minimum est de 500 CFA.").max(100000, "Le montant maximum est de 100 000 CFA."),
  paymentMethod: z.string().min(1, "Veuillez sélectionner une méthode de paiement."),
});

type RechargeFormData = z.infer<typeof rechargeSchema>;

export default function WalletPage() {
  const [balance, setBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<RechargeFormData>({
    resolver: zodResolver(rechargeSchema),
    defaultValues: {
      amount: 1000,
      paymentMethod: "orangemoney_sn",
    }
  });

  useEffect(() => {
    // Load balance from localStorage
    const storedBalance = localStorage.getItem(MOCK_WALLET_BALANCE_KEY);
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    } else {
      localStorage.setItem(MOCK_WALLET_BALANCE_KEY, "2000"); // Default starting balance
      setBalance(2000);
    }

    // Load transaction history from localStorage
    const storedHistory = localStorage.getItem(MOCK_TRANSACTION_HISTORY_KEY);
    if (storedHistory) {
      setTransactionHistory(JSON.parse(storedHistory));
    } else {
       const initialHistory: Transaction[] = [
        { id: "init1", date: new Date(Date.now() - 86400000 * 2).toISOString(), description: "Dépôt initial", amount: 2000, type: "deposit" },
       ];
       localStorage.setItem(MOCK_TRANSACTION_HISTORY_KEY, JSON.stringify(initialHistory));
       setTransactionHistory(initialHistory);
    }
  }, []);

  const addTransaction = (description: string, amount: number, type: "deposit" | "spend") => {
    const newTransaction: Transaction = {
      id: `txn_${type}_${Date.now()}`,
      date: new Date().toISOString(),
      description,
      amount: type === "deposit" ? amount : -Math.abs(amount), // ensure spend is negative
      type,
    };
    const updatedHistory = [newTransaction, ...transactionHistory].slice(0, 10); // Keep last 10
    setTransactionHistory(updatedHistory);
    localStorage.setItem(MOCK_TRANSACTION_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const handleRecharge: (data: RechargeFormData) => void = (data) => {
    const newBalance = balance + data.amount;
    setBalance(newBalance);
    localStorage.setItem(MOCK_WALLET_BALANCE_KEY, String(newBalance));
    addTransaction(`Recharge via ${data.paymentMethod === 'orangemoney_sn' ? 'Orange Money' : 'Autre'}`, data.amount, "deposit");
    
    toast({
      title: "Recharge Réussie!",
      description: `Votre compte a été rechargé de ${data.amount.toLocaleString()} CFA. Nouveau solde: ${newBalance.toLocaleString()} CFA.`,
    });
    reset();
    setIsRechargeDialogOpen(false);
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Mon Portefeuille"
        description="Gérez votre solde et consultez l'historique de vos transactions."
        icon={Wallet}
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" /> Solde Actuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{balance.toLocaleString()} CFA</p>
            <Dialog open={isRechargeDialogOpen} onOpenChange={setIsRechargeDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" /> Recharger le Compte
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Recharger Votre Compte</DialogTitle>
                  <DialogDescription>
                    Ajoutez des fonds à votre portefeuille pour accéder aux streams payants.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleRecharge)} className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="amount">Montant (CFA)</Label>
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => <Input id="amount" type="number" placeholder="ex: 5000" {...field} />}
                    />
                    {errors.amount && <p className="text-sm text-destructive mt-1">{errors.amount.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Méthode de Paiement</Label>
                     <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="paymentMethod">
                                <SelectValue placeholder="Sélectionnez une méthode" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="orangemoney_sn">
                                    <div className="flex items-center gap-2">
                                        <Image src="https://picsum.photos/seed/omlogo/20/20" alt="Orange Money" width={20} height={20} data-ai-hint="orange money" />
                                        Orange Money (Sénégal)
                                    </div>
                                </SelectItem>
                                <SelectItem value="wave_sn" disabled>Wave (Sénégal) - Bientôt</SelectItem>
                                <SelectItem value="card_sn" disabled>Carte Bancaire - Bientôt</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.paymentMethod && <p className="text-sm text-destructive mt-1">{errors.paymentMethod.message}</p>}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                       <Button type="button" variant="outline">Annuler</Button>
                    </DialogClose>
                    <Button type="submit">Confirmer la Recharge</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6 text-primary" /> Historique des Transactions
            </CardTitle>
            <CardDescription>Vos 10 dernières transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            {transactionHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Montant (CFA)</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{new Date(tx.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                    <TableCell className="truncate max-w-xs">{tx.description}</TableCell>
                    <TableCell className={`text-right font-medium ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'deposit' ? '+' : ''}{tx.amount.toLocaleString()} 
                    </TableCell>
                    <TableCell>
                       <Badge variant={tx.type === 'deposit' ? 'default' : 'destructive'} className={tx.type === 'deposit' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}>
                        {tx.type === 'deposit' ? 'Dépôt' : 'Dépense'}
                       </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
               <TableCaption>Affichage des 10 transactions les plus récentes.</TableCaption>
            </Table>
            ) : (
                <p className="text-muted-foreground text-center py-4">Aucune transaction pour le moment.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

