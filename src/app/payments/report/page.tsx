
"use client"

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { ArrowLeft, BarChart3, TrendingUp, Wallet, FileText } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";

const monthlyRevenueData = [
  { month: "Jan", revenue: Math.floor(Math.random() * 45000) + 5000 },
  { month: "Fév", revenue: Math.floor(Math.random() * 45000) + 5000 },
  { month: "Mar", revenue: Math.floor(Math.random() * 45000) + 5000 },
  { month: "Avr", revenue: Math.floor(Math.random() * 45000) + 5000 },
  { month: "Mai", revenue: Math.floor(Math.random() * 45000) + 5000 },
  { month: "Juin", revenue: 125000 }, // Current month mock data
];

const chartConfig = {
  revenue: {
    label: "Revenu (CFA)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const transactionsData = [
  { id: "TXN001", date: "2024-06-15", description: "Accès - Concert Live Acoustique", amount: 2500, status: "Payé" },
  { id: "TXN002", date: "2024-06-18", description: "Abonnement Mensuel VIP", amount: 10000, status: "Payé" },
  { id: "TXN003", date: "2024-06-20", description: "Accès - Webinaire Tech", amount: 1500, status: "Payé" },
  { id: "TXN004", date: "2024-06-22", description: "Pourboire - Stream 'Cuisine Sénégalaise'", amount: 500, status: "Payé" },
  { id: "TXN005", date: "2024-06-25", description: "Accès - Masterclass Entrepreneuriat", amount: 7500, status: "En attente" },
  { id: "TXN006", date: "2024-06-28", description: "Accès - Session Q&R Exclusive", amount: 3000, status: "Payé" },
];

export default function PaymentsReportPage() {
  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTransactions = transactionsData.length;
  const averageTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Rapport Détaillé des Paiements"
        description="Analysez vos revenus et l'historique de vos transactions."
        icon={FileText}
      />

      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/payments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux Paiements
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total (6 derniers mois)</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString('fr-FR')} CFA</div>
            <p className="text-xs text-muted-foreground">
              Basé sur les données de démonstration.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nombre de Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Transactions enregistrées.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Moyenne / Transaction</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTransactionValue.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} CFA</div>
            <p className="text-xs text-muted-foreground">
              Moyenne calculée sur les transactions.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle>Évolution des Revenus (6 derniers mois)</CardTitle>
          <CardDescription>Aperçu des revenus mensuels. (Données de démonstration)</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={monthlyRevenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickFormatter={(value) => `${(value / 1000)}k`} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Historique des Transactions Récentes</CardTitle>
          <CardDescription>Liste des dernières transactions enregistrées. (Données de démonstration)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Montant (CFA)</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">{transaction.amount.toLocaleString('fr-FR')}</TableCell>
                  <TableCell>
                     <span className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === "Payé" ? "bg-green-100 text-green-700" : 
                        transaction.status === "En attente" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700" 
                      }`}>
                       {transaction.status}
                     </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {transactionsData.length === 0 && (
                 <TableCaption>Aucune transaction trouvée pour cette période.</TableCaption>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
