import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, Settings, Share2, Sparkles, Languages, CreditCard } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Configuration du Streaming",
    description: "Configurez le streaming HD et personnalisez votre diffusion avec des logos et des superpositions.",
    icon: Settings,
    href: "/streaming-settings",
    cta: "Configurer le Stream",
  },
  {
    title: "Multistreaming",
    description: "Atteignez un public plus large en diffusant sur plusieurs plateformes simultanément.",
    icon: Share2,
    href: "/multistreaming",
    cta: "Configurer les Destinations",
  },
  {
    title: "Moments Forts IA",
    description: "Générez automatiquement des extraits captivants de vos diffusions en direct.",
    icon: Sparkles,
    href: "/ai-highlights",
    cta: "Créer des Moments Forts",
  },
  {
    title: "Traduction IA",
    description: "Fournissez des traductions en direct de votre stream dans plusieurs langues.",
    icon: Languages,
    href: "/ai-translation",
    cta: "Traduire le Contenu",
  },
  {
    title: "Paiements",
    description: "Gérez vos revenus et intégrez Sonatel pour le traitement des paiements.",
    icon: CreditCard,
    href: "/payments",
    cta: "Voir les Paiements",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Tableau de Bord"
        description="Bienvenue sur EnDirectAuSénégal ! Gérez vos streams et accédez à des fonctionnalités puissantes."
        icon={LayoutDashboard}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <feature.icon className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardContent>
              <Link href={feature.href} passHref>
                <Button variant="default" className="w-full group">
                  {feature.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Prêt à passer en direct ?</h2>
            <p className="text-muted-foreground mt-1">
              Lancez votre diffusion en direct professionnelle dès aujourd'hui avec EnDirectAuSénégal.
            </p>
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
            Lancer un Nouveau Stream <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
