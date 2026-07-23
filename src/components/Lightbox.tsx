import { useEffect, useRef, type PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import type { Photo } from '../data/site';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { CloseIcon, SliderArrow } from './icons';

const SWIPE_THRESHOLD = 48;

interface LightboxProps {
  photos: Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const photo = photos[index];

  const go = (step: number) => onIndexChange((index + step + photos.length) % photos.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    // `scrollbar-gutter: stable` on <html> keeps the page from shifting here.
    body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);

  useFocusTrap(true, dialogRef);

  useEffect(() => {
    const step = (direction: number) => onIndexChange((index + direction + photos.length) % photos.length);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [index, photos.length, onIndexChange, onClose]);

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

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria realizacji"
      tabIndex={-1}
      className="on-dark fixed inset-0 z-50 flex flex-col bg-ink/95 text-cream focus:outline-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="flex items-center justify-between px-5 py-4 lg:px-10 lg:py-6">
        <p className="text-small" aria-live="polite">
          {index + 1} / {photos.length}
        </p>
        <button type="button" onClick={onClose} aria-label="Zamknij galerię" className="grid h-11 w-11 place-items-center">
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-5 pb-6 lg:px-10"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <img
          key={photo.src}
          src={`/images/${photo.src}-1600.webp`}
          srcSet={`/images/${photo.src}-960.webp 960w, /images/${photo.src}-1600.webp 1600w`}
          sizes="(min-width: 1024px) 80vw, 100vw"
          alt={photo.alt}
          decoding="async"
          className="max-h-full max-w-full animate-fade-in object-contain"
        />
      </div>

      <div className="flex items-center justify-center gap-4 pb-8 lg:pb-10">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Poprzednie zdjęcie"
          className="group grid h-12 w-12 place-items-center"
        >
          <SliderArrow className="h-10 w-10 rotate-180 transition-transform duration-200 ease-smooth group-hover:-translate-x-1" />
        </button>
        <p className="max-w-[40ch] px-2 text-center text-small text-cream/80">{photo.alt}</p>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Następne zdjęcie"
          className="group grid h-12 w-12 place-items-center"
        >
          <SliderArrow className="h-10 w-10 transition-transform duration-200 ease-smooth group-hover:translate-x-1" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
