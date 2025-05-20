
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RevenuesPage() { // Renamed component
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Revenus & Monétisation (Créateur)"
        description="Gérez vos revenus issus de la vente de musique, abonnements et autres sources sur Zikcut. Intégration Sonatel Orange Money (maquette)."
        icon={CreditCard}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image src="https://placehold.co/40x40.png" alt="Sonatel Orange Money" width={40} height={40} className="rounded-full" data-ai-hint="logo Sonatel"/>
              Intégration Sonatel Orange Money (Maquette)
            </CardTitle>
            <CardDescription>
              Permettez à vos fans d'acheter votre musique ou de s'abonner à du contenu exclusif en utilisant Sonatel Orange Money.
              Fixez vos prix et gérez les paiements directement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-4 rounded-md bg-primary/10 text-primary border border-primary/20">
              <AlertTriangle className="h-6 w-6 mr-3 shrink-0" />
              <p className="text-sm">
                <strong>Note du développeur :</strong> L'intégration complète de l'API Sonatel Orange Money est une fonctionnalité complexe.
                Cette section est une maquette. En production, cela impliquerait des appels API sécurisés et la gestion des transactions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Tarification de Votre Musique</h3>
              <p className="text-muted-foreground mb-2">
                Définissez les prix pour vos pistes, albums, ou proposez des abonnements fan-club avec accès exclusif.
              </p>
              <Button disabled>Configurer la Tarification (Bientôt disponible)</Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Paiements Reçus</h3>
              <p className="text-muted-foreground mb-2">
                Consultez vos revenus et gérez vos paramètres de virement. Les fonds sont transférés via Orange Money (simulation).
              </p>
              <Button disabled>Voir les Virements (Bientôt disponible)</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              Aperçu des Revenus Zikcut
            </CardTitle>
            <CardDescription>
              Suivez vos revenus générés sur la plateforme. (Données de démonstration)
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-primary">75,000 CFA</p>
            <p className="text-muted-foreground mt-1">Revenus Totaux (30 derniers jours)</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">120</p>
                <p className="text-muted-foreground">Pistes Vendues</p>
              </div>
              <div>
                <p className="font-semibold">15</p>
                <p className="text-muted-foreground">Abonnés Exclusifs</p>
              </div>
            </div>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/revenues/report">Voir le Rapport Détaillé des Revenus</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <Card className="mt-8 shadow-md bg-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-secondary-foreground"/>Pourquoi Monétiser avec Zikcut ?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-secondary-foreground/80">
          <p><strong>Solution de Paiement Locale :</strong> Intégration transparente avec Sonatel Orange Money, largement utilisé au Sénégal (maquette).</p>
          <p><strong>Revenus Directs :</strong> Conservez 95% de vos revenus (commission Zikcut de 5%).</p>
          <p><strong>Modèles Flexibles :</strong> Vente à la piste, albums, abonnements, pourboires (à venir).</p>
          <p><strong>Transactions Sécurisées :</strong> Tous les paiements sont traités de manière sécurisée.</p>
        </CardContent>
      </Card>
    </div>
  );
}
