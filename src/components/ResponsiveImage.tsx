import type { Photo } from '../data/site';

const WIDTHS = [480, 960, 1600];

interface ResponsiveImageProps {
  photo: Photo;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export function ResponsiveImage({ photo, sizes, className, priority = false }: ResponsiveImageProps) {
  return (
    <img
      src={`/images/${photo.src}-960.webp`}
      srcSet={WIDTHS.map((width) => `/images/${photo.src}-${width}.webp ${width}w`).join(', ')}
      sizes={sizes}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  );
}
