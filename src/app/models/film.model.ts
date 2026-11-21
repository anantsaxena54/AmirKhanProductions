export interface FilmGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface FilmCreditGroup {
  role: string;
  names: string[];
}

export interface Film {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  year: number;
  releaseDate: string;
  genres: string[];
  tag: string;
  language: string;
  runtimeMinutes: number;
  runtimeDisplay: string;
  synopsis: string;
  synopsisLong?: string[];
  director: string[];
  writer: string[];
  producers: string[];
  cast: string[];
  poster: string;
  heroStill?: string;
  trailerUrl?: string;
  youtubeId?: string;
  kind: 'recent' | 'archive' | 'featured';
  featured: boolean;
  oscarSelection?: boolean;
  accolades?: string[];
  gallery: FilmGalleryItem[];
  behindScenes: FilmGalleryItem[];
  credits: FilmCreditGroup[];
  quote?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'STUDIO NOTES' | 'FILM SPOTLIGHT' | 'ARCHIVE' | 'CINEMA ESSAY';
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
  imageAlt: string;
  author: string;
  featured?: boolean;
}

export interface StudioMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export type TalkiesCategory = 
  | 'All Videos'
  | 'Behind the Scenes'
  | 'Director\'s Commentary'
  | 'Conversations'
  | 'Special Features';

export interface TalkiesVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: 'Behind the Scenes' | 'Director\'s Commentary' | 'Conversations' | 'Special Features';
  relatedFilmSlug?: string;
  relatedFilmTitle?: string;
  thumbnailUrl: string;
  duration?: string;
  publishedAt?: string;
  featured?: boolean;
  sortOrder: number;
}
