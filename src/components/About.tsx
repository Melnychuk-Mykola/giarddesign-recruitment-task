import { aboutPhoto } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { Button } from './Button';
import { ResponsiveImage } from './ResponsiveImage';

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="o-firmie" ref={ref} aria-labelledby="o-firmie-tytul" className="on-dark relative bg-green text-cream">
      <div
        data-reveal
        className="reveal-mask relative aspect-[4/3] sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto lg:w-[47.7778%]"
      >
        <ResponsiveImage
          photo={aboutPhoto}
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="wrap flex items-center py-16 sm:py-20 lg:min-h-[720px] lg:py-24">
        {/* 39.86% of the 1262 grid is the 503px column that starts at x=848. */}
        <div className="reveal lg:ml-auto lg:w-[46%] xl:w-[39.86%]" data-reveal>
          <p className="text-caption">O firmie</p>
          <h2 id="o-firmie-tytul" className="mt-4 font-display text-h2 font-medium">
            Tworzymy <em>z pasją</em>
          </h2>
          <p className="mt-8 lg:mt-10">
            Każdy projekt to nowe wyzwanie. Dlatego nasz zespół tworzą wykwalifikowani projektanci oraz architekci,
            których zadaniem jest rozpoznanie i realizacja potrzeb każdego Klienta. Nasza specjalizacja to przestrzenie
            nowoczesne, które charakteryzuje minimalizm, geometria i elegancka prostota. Tworzymy ogrody małoobsługowe,
            dostosowane do współczesnego trybu życia.
          </p>
          <Button href="#realizacje" variant="stroke" tone="light" className="mt-10 lg:mt-[72px]">
            Poznaj nas bliżej
          </Button>
        </div>
      </div>
    </section>
  );
}
