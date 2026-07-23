import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { COLLAPSED_PROJECTS, projects, type Photo } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { buttonClass } from './buttonStyles';
import { ResponsiveImage } from './ResponsiveImage';
import { ArrowDown } from './icons';

// The gallery overlay is only needed once a photo is clicked.
const Lightbox = lazy(() => import('./Lightbox').then((module) => ({ default: module.Lightbox })));

const columnsFor = (width: number) => (width >= 1024 ? 3 : width >= 640 ? 2 : 1);

/** Dealing the list round-robin into N columns rebuilds the Figma grid at N=3. */
function toColumns<T>(items: T[], count: number) {
  const columns: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => columns[index % count].push(item));
  return columns;
}

export function Projects() {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [columnCount, setColumnCount] = useState(() => columnsFor(window.innerWidth));
  const [gridHeight, setGridHeight] = useState<number>();

  const gridRef = useRef<HTMLDivElement>(null);
  const visible = expanded ? projects : projects.slice(0, COLLAPSED_PROJECTS);
  const sectionRef = useReveal<HTMLElement>(visible.length);

  useEffect(() => {
    const onResize = () => setColumnCount(columnsFor(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // The wrapper height is driven by the grid so it can animate open; the observer
  // also keeps it in sync when the column count or viewport changes.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => setGridHeight(grid.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const columns = toColumns(
    visible.map((photo, index) => ({ photo, index })),
    columnCount,
  );

  return (
    <section
      id="realizacje"
      ref={sectionRef}
      aria-labelledby="realizacje-tytul"
      className="scroll-mt-20 bg-beige pb-16 pt-20 lg:pb-11 lg:pt-[120px]"
    >
      <div className="wrap-mid reveal" data-reveal>
        <p className="text-caption text-green">Realizacje</p>
        <h2 id="realizacje-tytul" className="mt-4 font-display text-h2 font-medium">
          Nasze <em>projekty</em>
        </h2>
      </div>

      <div className="relative mt-14 lg:mt-24">
        <div
          id="galeria-realizacji"
          className="overflow-hidden transition-[height] duration-500 ease-smooth"
          style={{ height: gridHeight }}
        >
          <div ref={gridRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-[43px]">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-3 sm:gap-6 lg:gap-[43px]">
                {column.map(({ photo, index }) => (
                  <ProjectTile key={photo.src} photo={photo} onOpen={() => setOpenIndex(index)} />
                ))}
              </div>
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
      className="reveal-mask group relative block w-full overflow-hidden"
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
