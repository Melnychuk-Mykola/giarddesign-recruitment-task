export interface Photo {
  /** Base name of the generated files in /public/images. */
  src: string;
  alt: string;
  /** Display box from the Figma layout — used for the aspect ratio. */
  width: number;
  height: number;
}

export interface HeroSlide {
  id: string;
  headline: string[];
  text: string;
  photo: Photo;
}

export interface OfferItem {
  id: string;
  title: string;
  short: string;
  text: string;
  icon: string;
  cta: { label: string; href: string };
}

export const navLinks = [
  { label: 'O firmie', href: '#o-firmie' },
  { label: 'Realizacje', href: '#realizacje' },
  { label: 'Kontakt', href: '#kontakt' },
];

export const heroSlides: HeroSlide[] = [
  {
    id: 'aranzacja',
    headline: ['Nowoczesna aranżacja', 'Twojego ogrodu'],
    text: 'Marka GiardDesign to wieloletnie doświadczenie i wysoka estetyka realizacji. Oferujemy kompleksowy zakres usług z indywidualnym podejściem do każdego projektu.',
    photo: {
      src: 'zywoplot',
      alt: 'Geometryczny żywopłot na białej ścianie',
      width: 688,
      height: 737,
    },
  },
  {
    id: 'wizualizacja',
    headline: ['Zobacz swój ogród', 'zanim powstanie'],
    text: 'Projekt koncepcyjny przedstawiamy jako animowany spacer w technologii 3D. Każdy detal ustalamy wspólnie, zanim ruszą prace w terenie.',
    photo: {
      src: 'sciezka-ogrodowa-hero',
      alt: 'Kręta żwirowa ścieżka wśród bujnej roślinności',
      width: 688,
      height: 737,
    },
  },
  {
    id: 'maloobslugowe',
    headline: ['Zieleń zaprojektowana', 'na lata'],
    text: 'Rośliny i materiały dobieramy tak, aby ogród wyglądał dobrze przez cały rok i pozostał małoobsługowy.',
    photo: {
      src: 'pergola-taras-hero',
      alt: 'Zadaszony taras z betonowymi donicami i zielenią',
      width: 688,
      height: 737,
    },
  },
];

export const offer: OfferItem[] = [
  {
    id: 'projekty',
    title: 'Projekty',
    short: 'Koncepcja i dokumentacja ogrodu',
    text: 'Zaprojektujemy Twój ogród w nowoczesnym stylu i z najlepszym wykorzystaniem istniejącej przestrzeni.',
    icon: '/images/ikony/projekty.webp',
    cta: { label: 'Dowiedz się więcej', href: '#kontakt' },
  },
  {
    id: 'wizualizacje',
    title: 'Wizualizacje',
    short: 'Wirtualny spacer w technologii 3D',
    text: 'Przedstawimy Ci projekty koncepcyjne w postaci wirtualnego spaceru animowanego w technologii 3D.',
    icon: '/images/ikony/wizualizacje.webp',
    cta: { label: 'Dowiedz się więcej', href: '#kontakt' },
  },
  {
    id: 'realizacje',
    title: 'Realizacje',
    short: 'Wykonanie ogrodu od A do Z',
    text: 'Zrealizujemy Twoje marzenie przy użyciu najnowszych rozwiązań i zaawansowanych technologii.',
    icon: '/images/ikony/realizacje.webp',
    cta: { label: 'Zobacz nasze realizacje', href: '#realizacje' },
  },
];

export const aboutPhoto: Photo = {
  src: 'ogrod-japonski',
  alt: 'Ogród w stylu japońskim z kamieniem, mchem i drewnianym pawilonem',
  width: 688,
  height: 720,
};

/** Row-major order: dealing the list into N columns rebuilds the Figma grid. */
export const projects: Photo[] = [
  { src: 'schody-taras', alt: 'Schody i skarpa obsadzone zielenią przy nowoczesnym tarasie', width: 451, height: 601 },
  { src: 'basen-patio', alt: 'Patio z basenem i drewnianą pergolą', width: 452, height: 338 },
  { src: 'pergola-rozana', alt: 'Pergola porośnięta pnącymi różami', width: 451, height: 451 },
  { src: 'pergola-taras', alt: 'Zadaszony taras z betonowymi donicami', width: 451, height: 452 },
  { src: 'oczko-wodne', alt: 'Oczko wodne z karpiami koi i liliami wodnymi', width: 452, height: 452 },
  { src: 'sciezka-ogrodowa', alt: 'Kręta żwirowa ścieżka wśród bujnej roślinności', width: 451, height: 603 },
  { src: 'betonowa-sciana', alt: 'Betonowa ściana oporowa z ażurowym ogrodzeniem', width: 451, height: 338 },
  { src: 'pergola-drewniana', alt: 'Drewniana pergola nad trawnikiem przy elewacji budynku', width: 452, height: 601 },
  { src: 'zadaszenie', alt: 'Ażurowe zadaszenie z drewnianych belek', width: 451, height: 338 },
];

export const COLLAPSED_PROJECTS = 6;

export const contact = {
  phone: '000-000-000',
  email: 'giarddesign@kontakt.pl',
  instagram: 'https://www.instagram.com/',
};

export const footerLinks = [
  { label: 'Kontakt', href: '#kontakt' },
  { label: 'Instagram', href: contact.instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

/** Backs the header search — every entry points at something on this page. */
export const searchIndex = [
  { label: 'Oferta', hint: 'Kompleksowa obsługa terenów zielonych', href: '#oferta' },
  { label: 'Projekty', hint: 'Projekt ogrodu w nowoczesnym stylu', href: '#oferta-projekty' },
  { label: 'Wizualizacje', hint: 'Wirtualny spacer w technologii 3D', href: '#oferta-wizualizacje' },
  { label: 'Realizacje', hint: 'Wykonanie ogrodu od A do Z', href: '#realizacje' },
  { label: 'O firmie', hint: 'Zespół projektantów i architektów', href: '#o-firmie' },
  { label: 'Nasze projekty', hint: 'Galeria zrealizowanych ogrodów', href: '#realizacje' },
  { label: 'Instagram', hint: 'Najnowsze realizacje na Instagramie', href: '#instagram' },
  { label: 'Kontakt', hint: 'Telefon i adres e-mail', href: '#kontakt' },
];
