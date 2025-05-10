
export interface Stream {
  id: string;
  title: string;
  streamerName: string;
  streamerAvatarUrl: string;
  category: string;
  price: number; // 0 for free
  thumbnailUrl: string;
  thumbnailAiHint: string;
  viewersCount: number;
  isLive: boolean;
  description: string;
}

export const mockStreams: Stream[] = [
  {
    id: "1",
    title: "Session de Gaming Intense sur 'CyberPunk Dakar'",
    streamerName: "GamerProSN",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar1/40/40",
    category: "Gaming",
    price: 500, // CFA
    thumbnailUrl: "https://picsum.photos/seed/stream1/600/400",
    thumbnailAiHint: "gaming cyberpunk",
    viewersCount: 1250,
    isLive: true,
    description: "Rejoignez-moi pour une aventure épique dans les rues de CyberPunk Dakar. Action et adrénaline garanties !"
  },
  {
    id: "2",
    title: "Cours de Cuisine: Thieboudienne revisité",
    streamerName: "ChefAmina",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar2/40/40",
    category: "Cuisine",
    price: 0, // Free
    thumbnailUrl: "https://picsum.photos/seed/stream2/600/400",
    thumbnailAiHint: "cuisine senegalese",
    viewersCount: 800,
    isLive: true,
    description: "Apprenez à préparer une version moderne du Thieboudienne. Recette facile et délicieuse."
  },
  {
    id: "3",
    title: "Débat Politique: Les Enjeux Économiques",
    streamerName: "AnalysteEco",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar3/40/40",
    category: "Discussion",
    price: 250,
    thumbnailUrl: "https://picsum.photos/seed/stream3/600/400",
    thumbnailAiHint: "political debate",
    viewersCount: 2500,
    isLive: true,
    description: "Analyse approfondie des défis et opportunités économiques au Sénégal. Participez au débat !"
  },
  {
    id: "4",
    title: "Concert Acoustique Mbalax",
    streamerName: "MusicienTalentueux",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar4/40/40",
    category: "Musique",
    price: 1000,
    thumbnailUrl: "https://picsum.photos/seed/stream4/600/400",
    thumbnailAiHint: "acoustic concert",
    viewersCount: 500,
    isLive: true,
    description: "Un concert intime avec les meilleurs classiques du Mbalax en version acoustique. Ambiance chaleureuse."
  },
  {
    id: "5",
    title: "Apprendre le Wolof: Phrases Utiles",
    streamerName: "ProfDeWolof",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar5/40/40",
    category: "Éducation",
    price: 0,
    thumbnailUrl: "https://picsum.photos/seed/stream5/600/400",
    thumbnailAiHint: "language learning",
    viewersCount: 300,
    isLive: true,
    description: "Cours interactif pour apprendre les phrases de base en Wolof pour la vie quotidienne."
  },
  {
    id: "6",
    title: "Fitness en Direct: Séance Abdos-Fessiers",
    streamerName: "CoachFitnessSN",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar6/40/40",
    category: "Sport",
    price: 300,
    thumbnailUrl: "https://picsum.photos/seed/stream6/600/400",
    thumbnailAiHint: "fitness workout",
    viewersCount: 150,
    isLive: false, // Example of an offline stream
    description: "Session d'entraînement intense pour renforcer vos abdominaux et fessiers. Préparez-vous à transpirer !"
  },
   {
    id: "7",
    title: "Art Sénégalais: Visite d'Atelier",
    streamerName: "ArtistePeintre",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar7/40/40",
    category: "Art",
    price: 150,
    thumbnailUrl: "https://picsum.photos/seed/stream7/600/400",
    thumbnailAiHint: "art studio",
    viewersCount: 450,
    isLive: true,
    description: "Découvrez les coulisses de mon atelier et mon processus de création artistique."
  },
  {
    id: "8",
    title: "Tech Talk: Le Futur de l'IA au Sénégal",
    streamerName: "TechGuruSN",
    streamerAvatarUrl: "https://picsum.photos/seed/avatar8/40/40",
    category: "Technologie",
    price: 750,
    thumbnailUrl: "https://picsum.photos/seed/stream8/600/400",
    thumbnailAiHint: "tech talk",
    viewersCount: 920,
    isLive: true,
    description: "Discussion passionnante sur les avancées de l'IA et leur impact potentiel au Sénégal."
  }
];

export const streamCategories = ["Tous", ...Array.from(new Set(mockStreams.filter(s => s.isLive).map(s => s.category)))];

export const getStreamsByCategory = (category: string): Stream[] => {
  if (category === "Tous") {
    return mockStreams.filter(s => s.isLive);
  }
  return mockStreams.filter(s => s.category === category && s.isLive);
};

