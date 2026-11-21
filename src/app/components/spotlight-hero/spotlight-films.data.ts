export type TitleStyle = 'condensed' | 'serif' | 'didone' | 'outline';

export interface SpotlightFilm {
  slug: string;
  title: string;
  year: number;
  style: TitleStyle;
}

export interface SpotlightPass {
  passIndex: number;
  films: SpotlightFilm[];
}

export const SPOTLIGHT_FILMS: SpotlightFilm[] = [
  { slug: 'lagaan', title: 'Lagaan', year: 2001, style: 'condensed' },
  { slug: 'taare-zameen-par', title: 'Taare Zameen Par', year: 2007, style: 'serif' },
  { slug: 'jaane-tu-ya-jaane-na', title: 'Jaane Tu... Ya Jaane Na', year: 2008, style: 'outline' },
  { slug: 'peepli-live', title: 'Peepli Live', year: 2010, style: 'didone' },
  { slug: 'dhobi-ghat', title: 'Dhobi Ghat', year: 2010, style: 'serif' },
  { slug: 'delhi-belly', title: 'Delhi Belly', year: 2011, style: 'condensed' },
  { slug: 'dangal', title: 'Dangal', year: 2016, style: 'outline' },
  { slug: 'secret-superstar', title: 'Secret Superstar', year: 2017, style: 'didone' },
  { slug: 'laal-singh-chaddha', title: 'Laal Singh Chaddha', year: 2022, style: 'serif' },
  { slug: 'laapataa-ladies', title: 'Laapataa Ladies', year: 2024, style: 'condensed' },
  { slug: 'sitaare-zameen-par', title: 'Sitaare Zameen Par', year: 2025, style: 'didone' }
];

/**
 * Generate passes rotated by 3 films per pass, up to maxPasses (capped at 4)
 */
export function generateSpotlightPasses(maxPasses = 4): SpotlightPass[] {
  const passes: SpotlightPass[] = [];
  const len = SPOTLIGHT_FILMS.length;

  for (let p = 0; p < maxPasses; p++) {
    const shift = (p * 3) % len;
    const rotated = [...SPOTLIGHT_FILMS.slice(shift), ...SPOTLIGHT_FILMS.slice(0, shift)];
    passes.push({
      passIndex: p,
      films: rotated
    });
  }

  return passes;
}
