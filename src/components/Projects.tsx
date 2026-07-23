import Masonry from 'masonry-layout';
import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react';
import { COLLAPSED_PROJECTS, projects, type Photo } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { buttonClass } from './buttonStyles';
import { ResponsiveImage } from './ResponsiveImage';
import { ArrowDown } from './icons';

// The gallery overlay is only needed once a photo is clicked.
const Lightbox = lazy(() => import('./Lightbox').then((module) => ({ default: module.Lightbox })));

export function Projects() {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [gridHeight, setGridHeight] = useState<number>();

  const gridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry | null>(null);
  const visible = expanded ? projects : projects.slice(0, COLLAPSED_PROJECTS);
  const sectionRef = useReveal<HTMLElement>(visible.length);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // horizontalOrder deals the items across the columns in DOM order, which is
    // both the reading order of the mockup and the tab order of the gallery.
    const masonry = new Masonry(grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      gutter: '.masonry-gutter-sizer',
      percentPosition: true,
      horizontalOrder: true,
      transitionDuration: 0,
    });
    masonryRef.current = masonry;

    // Masonry writes the container height; the wrapper follows it so opening
    // and closing the gallery can be animated. The container also carries the
    // bottom margin of the last row, which is trimmed back off here.
    const observer = new ResizeObserver(() => {
      const rowGap = grid.querySelector('.masonry-gutter-sizer')?.getBoundingClientRect().width ?? 0;
      setGridHeight(grid.getBoundingClientRect().height - rowGap);
    });
    observer.observe(grid);

    return () => {
      observer.disconnect();
      masonry.destroy?.();
      masonryRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    masonryRef.current?.reloadItems?.();
    masonryRef.current?.layout?.();
  }, [visible.length]);

  return (
    <section
      id="realizacje"
      ref={sectionRef}
      aria-labelledby="realizacje-tytul"
      className="scroll-mt-[72px] bg-beige pb-16 pt-20 lg:pb-11 lg:pt-[120px]"
    >
      <div className="wrap-mid reveal" data-reveal>
        <p className="text-caption text-green">Realizacje</p>
        <h2 id="realizacje-tytul" className="mt-4 font-display text-h2 font-medium">
          Nasze <em className="heading-accent">projekty</em>
        </h2>
      </div>

      <div className="relative mt-14 lg:mt-24">
        <div
          id="galeria-realizacji"
          className="overflow-hidden transition-[height] duration-500 ease-smooth"
          style={{ height: gridHeight }}
        >
          <div ref={gridRef} className="masonry">
            <div className="masonry-sizer" aria-hidden="true" />
            <div className="masonry-gutter-sizer" aria-hidden="true" />
            {visible.map((photo, index) => (
              <ProjectTile key={photo.src} photo={photo} onOpen={() => setOpenIndex(index)} />
            ))}
          </div>
        </div>

        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-beige to-beige/0 lg:h-[420px]" />
        )}
      </div>

      <div className="mt-10 flex justify-center lg:mt-8">
        <button
          type="button"
          className={`${buttonClass('stroke')} group/btn`}
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="galeria-realizacji"
        >
          {expanded ? 'Zwiń' : 'Rozwiń'}
          <ArrowDown
            className={`h-4 w-4 transition-transform duration-300 ease-smooth group-hover/btn:translate-y-1 ${
              expanded ? 'rotate-180 group-hover/btn:-translate-y-1' : ''
            }`}
          />
        </button>
      </div>

      {openIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox photos={visible} index={openIndex} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
        </Suspense>
      )}
    </section>
  );
}

function ProjectTile({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-reveal
      className="masonry-item reveal-mask group relative block overflow-hidden"
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      aria-label={`Powiększ zdjęcie: ${photo.alt}`}
    >
      <ResponsiveImage
        photo={photo}
        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
      />
      {/* Figma washes the gallery photos with 10% white; the wash lifts on hover. */}
      <span className="absolute inset-0 bg-white/10 transition-opacity duration-500 ease-smooth group-hover:opacity-0" />
    </button>
  );
}
