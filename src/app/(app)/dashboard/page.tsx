
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, SlidersHorizontal, Share2, Music2, Film, Palette, FileText, CreditCard } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Paramètres Projet Musical",
    description: "Configurez les détails de vos projets musicaux, métadonnées et préférences de génération.",
    icon: SlidersHorizontal, // Changed from Settings
    href: "/project-settings", // Was /streaming-settings
    cta: "Configurer le Projet",
  },
  {
    title: "Distribution & Partage",
    description: "Gérez la diffusion de votre musique, partagez sur les réseaux et accédez à des outils promotionnels.",
    icon: Share2,
    href: "/distribution-tools", // Was /multistreaming
    cta: "Gérer la Distribution",
  },
  {
    title: "Génération Audio IA",
    description: "Créez des pistes audio, des instrus ou des samples uniques avec l'aide de l'intelligence artificielle.",
    icon: Music2, // Changed from Sparkles
    href: "/ai-audio-generation", // Was /ai-highlights
    cta: "Générer de l'Audio",
  },
  {
    title: "Génération Vidéo IA",
    description: "Produisez des clips vidéo, des visualizers ou des vidéos promotionnelles pour votre musique.",
    icon: Film, // Changed from Scissors
    href: "/ai-video-generation", // Was /ai-shorts
    cta: "Créer des Vidéos",
  },
  {
    title: "Pochettes d'Album IA",
    description: "Générez des pochettes d'album et des visuels artistiques uniques pour vos sorties musicales.",
    icon: Palette, // Changed from ImageIcon
    href: "/ai-album-art", // Was /stream-thumbnails
    cta: "Créer des Pochettes",
  },
  {
    title: "Assistant Paroles IA",
    description: "Obtenez de l'aide pour écrire, améliorer ou traduire des paroles pour vos chansons.",
    icon: FileText, // Changed from Languages
    href: "/ai-lyrics-assistant", // Was /ai-translation
    cta: "Écrire des Paroles",
  },
  {
    title: "Revenus Musicaux",
    description: "Suivez vos revenus, gérez vos options de monétisation et configurez vos paiements (maquette).",
    icon: CreditCard,
    href: "/revenues", // Was /payments
    cta: "Voir les Revenus",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Tableau de Bord Zikcut"
        description="Bienvenue sur Zikcut ! Gérez vos créations musicales, utilisez nos outils IA et connectez avec votre audience."
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
            <h2 className="text-2xl font-semibold text-foreground">Prêt à créer votre prochain hit ?</h2>
            <p className="text-muted-foreground mt-1">
              Utilisez les outils IA de Zikcut pour donner vie à vos idées musicales.
            </p>
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group" asChild>
            <Link href="/ai-audio-generation"> {/* Direct link to a creation tool */}
              Lancer un Nouveau Projet Audio <Music2 className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
