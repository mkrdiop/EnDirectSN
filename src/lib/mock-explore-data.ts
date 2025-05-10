
import type { LucideIcon } from 'lucide-react';
import { Gamepad2, Music, ChefHat, Tv, Palette, Brain, Briefcase, Users } from 'lucide-react'; // Added Users for streamer card

export interface ExploreCategory {
  name: string;
  slug: string;
  icon: LucideIcon;
  imageUrl: string;
  aiHint: string;
  description: string;
}

export const exploreCategories: ExploreCategory[] = [
  {
    name: "Gaming",
    slug: "gaming",
    icon: Gamepad2,
    imageUrl: "https://picsum.photos/seed/catgaming/400/250",
    aiHint: "gaming category",
    description: "Plongez dans des univers virtuels épiques avec les meilleurs gamers."
  },
  {
    name: "Musique",
    slug: "musique",
    icon: Music,
    imageUrl: "https://picsum.photos/seed/catmusic/400/250",
    aiHint: "music category",
    description: "Vibrez au son des concerts live, DJ sets et sessions acoustiques."
  },
  {
    name: "Cuisine",
    slug: "cuisine",
    icon: ChefHat,
    imageUrl: "https://picsum.photos/seed/catcuisine/400/250",
    aiHint: "cooking category",
    description: "Apprenez des recettes savoureuses et découvrez les secrets des chefs."
  },
  {
    name: "Divertissement",
    slug: "divertissement",
    icon: Tv,
    imageUrl: "https://picsum.photos/seed/catent/400/250",
    aiHint: "entertainment category",
    description: "Talk-shows, humour, podcasts et bien plus pour vous divertir."
  },
  {
    name: "Art & Créativité",
    slug: "art",
    icon: Palette,
    imageUrl: "https://picsum.photos/seed/catart/400/250",
    aiHint: "art category",
    description: "Explorez le monde de l'art, du dessin à la sculpture, avec des artistes talentueux."
  },
  {
    name: "Éducation",
    slug: "education",
    icon: Brain,
    imageUrl: "https://picsum.photos/seed/catedu/400/250",
    aiHint: "education category",
    description: "Apprenez de nouvelles compétences, des langues aux sciences."
  },
  {
    name: "Business & Tech",
    slug: "business",
    icon: Briefcase,
    imageUrl: "https://picsum.photos/seed/catbiz/400/250",
    aiHint: "business category",
    description: "Discussions sur l'entrepreneuriat, l'innovation et la technologie."
  },
];

export interface TopStreamer {
  id: string;
  name: string;
  avatarUrl: string;
  avatarAiHint: string;
  specialty: string;
  followers: number;
  isLive: boolean;
}

export const topStreamers: TopStreamer[] = [
  {
    id: "streamer1",
    name: "GamerProSN",
    avatarUrl: "https://picsum.photos/seed/avatar1/100/100",
    avatarAiHint: "gamer avatar",
    specialty: "Pro du Gaming & eSport",
    followers: 28500,
    isLive: true,
  },
  {
    id: "streamer2",
    name: "ChefAmina",
    avatarUrl: "https://picsum.photos/seed/avatar2/100/100",
    avatarAiHint: "chef avatar",
    specialty: "Reine de la Cuisine Sénégalaise",
    followers: 19200,
    isLive: false,
  },
  {
    id: "streamer3",
    name: "MusicienTalentueux",
    avatarUrl: "https://picsum.photos/seed/avatar4/100/100",
    avatarAiHint: "musician avatar",
    specialty: "Virtuose du Mbalax Acoustique",
    followers: 15300,
    isLive: true,
  },
  {
    id: "streamer4",
    name: "AnalysteEco",
    avatarUrl: "https://picsum.photos/seed/avatar3/100/100",
    avatarAiHint: "analyst avatar",
    specialty: "Expert en Économie Africaine",
    followers: 22000,
    isLive: false,
  },
   {
    id: "streamer5",
    name: "ArtistePeintre",
    avatarUrl: "https://picsum.photos/seed/avatar7/100/100",
    avatarAiHint: "painter avatar",
    specialty: "Toiles Inspirées d'Afrique",
    followers: 7800,
    isLive: true,
  },
  {
    id: "streamer6",
    name: "TechGuruSN",
    avatarUrl: "https://picsum.photos/seed/avatar8/100/100",
    avatarAiHint: "tech guru avatar",
    specialty: "Le Futur de la Tech Africaine",
    followers: 12500,
    isLive: true,
  }
];
