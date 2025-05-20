
import type { LucideIcon } from 'lucide-react';
import { Music, Disc3, Guitar, Headphones, Users, Mic2, CalendarPlus, Radio } from 'lucide-react';

export interface MusicGenreCategory { // Renamed from ExploreCategory
  name: string;
  slug: string;
  icon: LucideIcon;
  imageUrl: string; // Will be AI-generated
  aiHint: string; // For AI image generation prompt
  imagePrompt?: string; // Specific prompt for AI
  description: string;
  isLoading?: boolean; // For image loading state
}

export const musicGenreCategories: MusicGenreCategory[] = [
  {
    name: "Afrobeat",
    slug: "afrobeat",
    icon: Music,
    imageUrl: "https://placehold.co/400x250.png?text=Afrobeat",
    aiHint: "Afrobeat music genre vibrant",
    imagePrompt: "Vibrant and energetic artwork representing the Afrobeat music genre, with African patterns and musical notes, photorealistic.",
    description: "Les rythmes irrésistibles de l'Afrobeat, parfaits pour danser.",
    isLoading: true,
  },
  {
    name: "Mbalax",
    slug: "mbalax",
    icon: Disc3,
    imageUrl: "https://placehold.co/400x250.png?text=Mbalax",
    aiHint: "Mbalax music Senegal traditional",
    imagePrompt: "Dynamic artwork for Mbalax music, showcasing Senegalese drumming and dance energy, culturally rich, photorealistic.",
    description: "L'énergie unique du Mbalax, le son emblématique du Sénégal.",
    isLoading: true,
  },
  {
    name: "Hip Hop Africain",
    slug: "hiphop-africain",
    icon: Headphones,
    imageUrl: "https://placehold.co/400x250.png?text=Hip+Hop+Africain",
    aiHint: "African Hip Hop urban style",
    imagePrompt: "Urban artwork representing African Hip Hop, with graffiti elements and modern African cityscapes, energetic, photorealistic.",
    description: "Flows percutants et beats lourds, le Hip Hop made in Africa.",
    isLoading: true,
  },
  {
    name: "Desert Blues",
    slug: "desert-blues",
    icon: Guitar,
    imageUrl: "https://placehold.co/400x250.png?text=Desert+Blues",
    aiHint: "Desert Blues music Sahara atmosphere",
    imagePrompt: "Atmospheric artwork for Desert Blues music, evoking Saharan landscapes and soulful guitar melodies, moody, photorealistic.",
    description: "Mélodies envoûtantes et guitares bluesy du désert.",
    isLoading: true,
  },
  {
    name: "Musique Mandingue",
    slug: "musique-mandingue",
    icon: Music, // Placeholder icon, consider specific if available
    imageUrl: "https://placehold.co/400x250.png?text=Musique+Mandingue",
    aiHint: "Mandingue music kora strings",
    imagePrompt: "Elegant artwork representing Mandingue music, featuring Kora and Balafon with West African cultural motifs, rich colors, photorealistic.",
    description: "Les sonorités riches et mélodiques de l'Empire Mandingue.",
    isLoading: true,
  },
  {
    name: "Afro Pop",
    slug: "afro-pop",
    icon: Radio,
    imageUrl: "https://placehold.co/400x250.png?text=Afro+Pop",
    aiHint: "Afro Pop music contemporary africa",
    imagePrompt: "Modern and catchy artwork for Afro Pop music, bright colors, youthful energy, contemporary African fashion, photorealistic.",
    description: "Les tubes Afro Pop qui font vibrer le continent et la diaspora.",
    isLoading: true,
  },
  {
    name: "Reggae Africain",
    slug: "reggae-africain",
    icon: Music, // Placeholder
    imageUrl: "https://placehold.co/400x250.png?text=Reggae+Africain",
    aiHint: "African Reggae rasta colors",
    imagePrompt: "Artwork for African Reggae music, featuring Rasta colors, peace symbols, and African cultural elements, positive vibes, photorealistic.",
    description: "Les vibrations positives du Reggae aux couleurs de l'Afrique.",
    isLoading: true,
  },
  {
    name: "Jazz Africain",
    slug: "jazz-africain",
    icon: Guitar, // Placeholder
    imageUrl: "https://placehold.co/400x250.png?text=Jazz+Africain",
    aiHint: "African Jazz fusion instruments",
    imagePrompt: "Sophisticated artwork for African Jazz, showing a fusion of jazz instruments with African rhythms and textures, cool and smooth, photorealistic.",
    description: "Improvisations et fusions créatives du Jazz ancré en Afrique.",
    isLoading: true,
  },
];

export interface TopArtist { // Renamed from TopStreamer
  id: string;
  name: string;
  avatarUrl: string; // Will be AI-generated
  avatarAiHint: string; // For AI image generation prompt
  avatarImagePrompt?: string; // Specific prompt for AI
  mainGenre: string; // e.g., "Mbalax", "Afrobeat"
  followerCount: number;
  isVerified?: boolean; // Optional: if artist is verified
  isLoading?: boolean; // For image loading state
}

export const topArtists: TopArtist[] = [
  {
    id: "artist1",
    name: "Youssou N'Dour",
    avatarUrl: "https://placehold.co/100x100.png?text=YN",
    avatarAiHint: "Youssou NDour Senegalese musician",
    avatarImagePrompt: "Iconic portrait of Youssou N'Dour, the Senegalese music legend, performing on stage, powerful expression, photorealistic.",
    mainGenre: "Mbalax / World Music",
    followerCount: 2850000,
    isVerified: true,
    isLoading: true,
  },
  {
    id: "artist2",
    name: "Angélique Kidjo",
    avatarUrl: "https://placehold.co/100x100.png?text=AK",
    avatarAiHint: "Angelique Kidjo African singer",
    avatarImagePrompt: "Dynamic portrait of Angélique Kidjo, the Beninese superstar, singing passionately, vibrant colors, photorealistic.",
    mainGenre: "Afro-Funk / World Music",
    followerCount: 1920000,
    isVerified: true,
    isLoading: true,
  },
  {
    id: "artist3",
    name: "Wizkid",
    avatarUrl: "https://placehold.co/100x100.png?text=WZ",
    avatarAiHint: "Wizkid Nigerian afrobeat star",
    avatarImagePrompt: "Stylish portrait of Wizkid, the Nigerian Afrobeats global icon, cool and confident, fashion-forward, photorealistic.",
    mainGenre: "Afrobeats",
    followerCount: 15300000,
    isVerified: true,
    isLoading: true,
  },
  {
    id: "artist4",
    name: "Sarkodie",
    avatarUrl: "https://placehold.co/100x100.png?text=SK",
    avatarAiHint: "Sarkodie Ghanaian rapper",
    avatarImagePrompt: "Powerful portrait of Sarkodie, the Ghanaian Hip Hop heavyweight, performing with intensity, urban setting, photorealistic.",
    mainGenre: "Hip Hop / Hiplife",
    followerCount: 2200000,
    isVerified: true,
    isLoading: true,
  },
   {
    id: "artist5",
    name: "Fatoumata Diawara",
    avatarUrl: "https://placehold.co/100x100.png?text=FD",
    avatarAiHint: "Fatoumata Diawara Malian artist",
    avatarImagePrompt: "Artistic portrait of Fatoumata Diawara, the Malian singer-songwriter and guitarist, elegant and soulful, culturally rich, photorealistic.",
    mainGenre: "Wassoulou / Folk",
    followerCount: 780000,
    isVerified: true,
    isLoading: true,
  },
  {
    id: "artist6",
    name: "Black Coffee",
    avatarUrl: "https://placehold.co/100x100.png?text=BC",
    avatarAiHint: "Black Coffee South African DJ",
    avatarImagePrompt: "Cool portrait of Black Coffee, the South African DJ and producer, at his decks, deep house vibes, sophisticated, photorealistic.",
    mainGenre: "Deep House / Electronic",
    followerCount: 1250000,
    isVerified: true,
    isLoading: true,
  }
];


export interface UpcomingRelease { // Renamed from PlannedStream
  id: string;
  title: string; // Album or Single title
  artistName: string;
  artistAvatarUrl: string; // Will be AI-generated
  artistAvatarAiHint: string;
  artistAvatarImagePrompt?: string;
  genre: string;
  releaseDate: string; // e.g., "25 Juillet 2024"
  artworkUrl: string; // Will be AI-generated
  artworkAiHint: string; // For AI image generation prompt
  artworkImagePrompt?: string; // Specific prompt for AI
  description: string; // Short description of the release
  type: "Album" | "Single" | "EP";
  isLoading?: boolean; // For image loading state
}

export const upcomingReleases: UpcomingRelease[] = [
  {
    id: "release1",
    title: "Teranga Spirit",
    artistName: "Baaba Maal",
    artistAvatarUrl: "https://placehold.co/60x60.png?text=BM",
    artistAvatarAiHint: "Baaba Maal portrait",
    artistAvatarImagePrompt: "Regal portrait of Baaba Maal, the Senegalese music icon, in traditional attire, powerful and wise, photorealistic.",
    genre: "Afro-Pop / Folk",
    releaseDate: "Vendredi Prochain - 21h00",
    artworkUrl: "https://placehold.co/400x225.png?text=Teranga+Spirit",
    artworkAiHint: "album cover Teranga Spirit Baaba Maal",
    artworkImagePrompt: "Epic album artwork for 'Teranga Spirit' by Baaba Maal, depicting Senegalese hospitality and landscapes, warm colors, photorealistic.",
    description: "Le nouvel album très attendu, explorant les racines de la musique sénégalaise.",
    type: "Album",
    isLoading: true,
  },
  {
    id: "release2",
    title: "Nouveau Single: 'Dakar Sunrise'",
    artistName: "Viviane Chidid",
    artistAvatarUrl: "https://placehold.co/60x60.png?text=VC",
    artistAvatarAiHint: "Viviane Chidid portrait",
    artistAvatarImagePrompt: "Glamorous portrait of Viviane Chidid, the Queen of Mbalax, vibrant and energetic, modern Senegalese fashion, photorealistic.",
    genre: "Mbalax / Pop",
    releaseDate: "Le 28 Juillet à 19h00",
    artworkUrl: "https://placehold.co/400x225.png?text=Dakar+Sunrise",
    artworkAiHint: "single cover Dakar Sunrise Viviane Chidid",
    artworkImagePrompt: "Artwork for Viviane Chidid's single 'Dakar Sunrise', showing a beautiful Dakar sunrise over the ocean, hopeful and bright, photorealistic.",
    description: "Un hymne entraînant célébrant la beauté de Dakar au lever du soleil.",
    type: "Single",
    isLoading: true,
  },
  {
    id: "release3",
    title: "EP: 'Urban Griot'",
    artistName: "Didier Awadi",
    artistAvatarUrl: "https://placehold.co/60x60.png?text=DA",
    artistAvatarAiHint: "Didier Awadi portrait",
    artistAvatarImagePrompt: "Engaged portrait of Didier Awadi, the Senegalese Hip Hop pioneer, thoughtful and powerful, urban background, photorealistic.",
    genre: "Hip Hop engagé",
    releaseDate: "Ce Samedi à 15h00",
    artworkUrl: "https://placehold.co/400x225.png?text=Urban+Griot",
    artworkAiHint: "EP cover Urban Griot Didier Awadi",
    artworkImagePrompt: "Cover art for Didier Awadi's EP 'Urban Griot', blending traditional griot imagery with modern urban aesthetics, impactful, photorealistic.",
    description: "Chroniques urbaines et réflexions sociales sur des beats incisifs.",
    type: "EP",
    isLoading: true,
  }
];

