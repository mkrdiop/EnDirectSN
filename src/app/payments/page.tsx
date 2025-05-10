
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function PaymentsPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Paiements & Monétisation"
        description="Gérez vos revenus et intégrez Sonatel Orange Money pour des paiements fluides."
        icon={CreditCard}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image src="https://picsum.photos/seed/sonatel/40/40" alt="Sonatel Orange Money" width={40} height={40} className="rounded-full" data-ai-hint="logo Sonatel"/>
              Intégration Sonatel Orange Money
            </CardTitle>
            <CardDescription>
              Permettez aux spectateurs de payer pour accéder à vos streams exclusifs en utilisant Sonatel Orange Money.
              Fixez vos prix et gérez les paiements directement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-4 rounded-md bg-primary/10 text-primary border border-primary/20">
              <AlertTriangle className="h-6 w-6 mr-3 shrink-0" />
              <p className="text-sm">
                <strong>Note du développeur :</strong> L'intégration complète de l'API Sonatel Orange Money est une fonctionnalité complexe.
                Cette section est une maquette. Dans un environnement de production, cela impliquerait des appels API sécurisés,
                la gestion des transactions et l'authentification des utilisateurs avec les services Sonatel.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Tarification du Stream</h3>
              <p className="text-muted-foreground mb-2">
                Définissez les frais d'accès pour votre contenu premium en direct. Proposez divers niveaux de tarification ou des options de paiement à la séance.
              </p>
              <Button disabled>Configurer la Tarification (Bientôt disponible)</Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Paiements</h3>
              <p className="text-muted-foreground mb-2">
                Consultez vos revenus et gérez vos paramètres de paiement. Les fonds sont transférés de manière sécurisée via Orange Money.
              </p>
              <Button disabled>Voir les Revenus (Bientôt disponible)</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              Aperçu des Revenus
            </CardTitle>
            <CardDescription>
              Suivez vos revenus issus des streams payants.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-primary">0 CFA</p>
            <p className="text-muted-foreground mt-1">Revenus Totaux (30 derniers jours)</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">0</p>
                <p className="text-muted-foreground">Streams Payants</p>
              </div>
              <div>
                <p className="font-semibold">0</p>
                <p className="text-muted-foreground">Abonnés</p>
              </div>
            </div>
            <Button variant="outline" className="mt-6" disabled>
              Voir le Rapport Détaillé (Bientôt disponible)
            </Button>
          </CardContent>
        </Card>
      </div>

       <Card className="mt-8 shadow-md bg-secondary/10">
        <CardHeader>
          <CardTitle>Pourquoi Monétiser avec EnDirectAuSénégal ?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-secondary-foreground/80">
          <p><strong>Solution de Paiement Locale :</strong> Intégration transparente avec Sonatel Orange Money, largement utilisé au Sénégal.</p>
          <p><strong>Revenus Directs :</strong> Conservez une part importante de vos revenus.</p>
          <p><strong>Configuration Facile :</strong> Configurez rapidement la tarification de votre contenu exclusif.</p>
          <p><strong>Transactions Sécurisées :</strong> Tous les paiements sont traités de manière sécurisée.</p>
        </CardContent>
      </Card>
    </div>
  );
}
