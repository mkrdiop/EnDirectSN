
export interface MusicTrack {
  id: string;
  title: string;
  artistName: string;
  artistAvatarUrl: string; // For artist image on track
  artistAvatarAiHint: string;
  albumName?: string;
  genre: string;
  price: number; // 0 for free
  artworkUrl: string; // Initially placeholder, to be filled by AI
  artworkAiHint: string; // Used as part of the prompt for AI image generation
  duration?: string; // e.g., "3:45"
  playCount: number;
  isFeatured?: boolean; // To mark tracks for "Featured" section
  releaseDate?: string; // e.g., "2024-07-20"
  description: string;
}

export const mockMusicTracks: MusicTrack[] = [
  {
    id: "track1",
    title: "Sénégal Vibrations",
    artistName: "Youssou N'Dour",
    artistAvatarUrl: "https://placehold.co/40x40.png",
    artistAvatarAiHint: "Youssou NDour portrait",
    albumName: "Africa Rekk",
    genre: "Mbalax",
    price: 0,
    artworkUrl: "https://placehold.co/600x400.png",
    artworkAiHint: "Mbalax music album cover Senegal vibes",
    duration: "4:12",
    playCount: 125000,
    isFeatured: true,
    releaseDate: "2023-05-15",
    description: "Un classique revisité qui capture l'essence du Mbalax moderne."
  },
  {
    id: "track2",
    title: "Dakar Midnight Grooves",
    artistName: "Omar Pene",
    artistAvatarUrl: "https://placehold.co/40x40.png",
    artistAvatarAiHint: "Omar Pene portrait",
    albumName: "Nanga Def",
    genre: "Afrobeat",
    price: 500,
    artworkUrl: "https://placehold.co/600x400.png",
    artworkAiHint: "Afrobeat album cover Dakar nightlife",
    duration: "5:03",
    playCount: 78000,
    isFeatured: true,
    releaseDate: "2024-01-20",
    description: "Laissez-vous emporter par les rythmes envoûtants d'Afrobeat, parfaits pour une soirée à Dakar."
  },
  {
    id: "track3",
    title: "Desert Blues Echo",
    artistName: "Ali Farka Touré",
    artistAvatarUrl: "https://placehold.co/40x40.png",
    artistAvatarAiHint: "Ali Farka Toure portrait",
    genre: "Desert Blues",
    price: 0,
    artworkUrl: "https://placehold.co/600x400.png",
    artworkAiHint: "Desert Blues music artwork African landscape",
    duration: "6:20",
    playCount: 250000,
    isFeatured: false,
    releaseDate: "2006-03-07",
    description: "Un voyage musical à travers les paysages sonores du Sahel."
  },
  {
    id: "track4",
    title: "Afro Hip Hop Cypher",
    artistName: "Nix",
    artistAvatarUrl: "https://placehold.co/40x40.png",
    artistAvatarAiHint: "Nix senegalese rapper portrait",
    albumName: "Excuse My Wolof",
    genre: "Hip Hop",
    price: 300,
    artworkUrl: "https://placehold.co/600x400.png",
    artworkAiHint: "African Hip Hop album cover graffiti urban",
    duration: "3:55",
    playCount: 95000,
    isFeatured: true,
    releaseDate: "2022-11-10",
    description: "Des rimes percutantes sur des beats Afro-urbains, le son de la jeunesse."
  },
  {
    id: "track5",
    title: "Soulful Kora Serenade",
    artistName: "Sona Jobarteh",
    artistAvatarUrl: "https://placehold.co/40x40.png",
    artistAvatarAiHint: "Sona Jobarteh kora player portrait",
    genre: "World Music",
    price: 0,
    artworkUrl: "https://placehold.co/600x400.png",
    artworkAiHint: "Kora music album art serene beautiful",
    duration: "4:40",
    playCount: 150000,
    isFeatured: false,
    releaseDate: "2021-09-01",
    description: "La Kora comme vous ne l'avez jamais entendue, une mélodie qui touche l'âme."
  },
  {
    id: "track6",
    title: "Electro Baobab Beats",
    artistName: "DJ Teranga",
    artistAvatarUrl: "https://placehold.co/40x40.png",
    artistAvatarAiHint: "African DJ portrait electronic music",
    albumName: "Digital Griot",
    genre: "Electro",
    price: 750,
    artworkUrl: "https://placehold.co/600x400.png",
    artworkAiHint: "Electronic music album cover baobab tree futuristic",
    duration: "5:30",
    playCount: 62000,
    isFeatured: true,
    releaseDate: "2024-03-05",
    description: "Fusion de sons traditionnels africains et de rythmes électroniques modernes."
  }
];

// To be used by explore page for categories, adapting streamCategories logic
export const musicGenres = ["Tous les Genres", ...Array.from(new Set(mockMusicTracks.map(t => t.genre)))];

export const getMusicByGenre = (genre: string): MusicTrack[] => {
  if (genre === "Tous les Genres") {
    return mockMusicTracks;
  }
  return mockMusicTracks.filter(t => t.genre === genre);
};
