import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { heroSlides } from '../data/site';
import { Button } from './Button';
import { ResponsiveImage } from './ResponsiveImage';
import { SliderArrow } from './icons';

const SWIPE_THRESHOLD = 48;

export function Hero() {
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const go = (step: number) => setIndex((current) => (current + step + heroSlides.length) % heroSlides.length);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') go(-1);
    if (event.key === 'ArrowRight') go(1);
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(event.clientY - start.y)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  return (
    <section
      id="start"
      className="relative scroll-mt-[72px] bg-beige lg:min-h-[737px]"
      aria-roledescription="carousel"
      aria-label="Prezentacja oferty"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="wrap flex items-center py-14 sm:py-20 lg:min-h-[737px] lg:py-24">
        {/* 47.46% of the 1262 grid is the 599px text column from Figma; it gets
            a little more room below 1280 so the headline keeps its line breaks. */}
        <div className="grid w-full lg:w-[52%] xl:w-[47.46%]" aria-live="polite">
          {heroSlides.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slajd"
                aria-label={`${slideIndex + 1} z ${heroSlides.length}`}
                aria-hidden={!active}
                className={`col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-smooth ${
                  active ? 'opacity-100' : 'invisible translate-y-3 opacity-0'
                }`}
              >
                <h1 className="font-display text-h1 font-medium">
                  {slide.headline.map((line) => (
                    <span key={line} className="block">
                      {line}{' '}
                    </span>
                  ))}
                </h1>
                <p className="mt-7 max-w-[490px] text-lead lg:mt-11">{slide.text}</p>
                <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-9 lg:mt-[72px]">
                  <Button href="#kontakt">Skontaktuj się z nami</Button>
                  <Button href="#realizacje" variant="stroke">
                    Zobacz nasze realizacje
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[44%] xl:w-[47.7778%]">
        {heroSlides.map((slide, slideIndex) => (
          <div
            key={slide.id}
            aria-hidden={slideIndex !== index}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ease-smooth ${
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ResponsiveImage
              photo={slide.photo}
              sizes="(min-width: 1024px) 48vw, 100vw"
              priority={slideIndex === 0}
              className={`h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth ${
                slideIndex === index ? 'scale-100' : 'scale-105'
              }`}
            />
            {/* Figma lays a 10% white wash over the hero photograph. */}
            <div className="absolute inset-0 bg-white/10" />
          </div>
        ))}

        <div className="absolute bottom-0 right-0 flex items-center gap-6 bg-cream px-6 py-4 lg:gap-8 lg:px-8 lg:py-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="group grid h-12 w-12 place-items-center text-ink"
            aria-label="Poprzedni slajd"
          >
            <SliderArrow className="h-12 w-12 rotate-180 transition-transform duration-200 ease-smooth group-hover:-translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="group grid h-12 w-12 place-items-center text-ink"
            aria-label="Następny slajd"
          >
            <SliderArrow className="h-12 w-12 transition-transform duration-200 ease-smooth group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
