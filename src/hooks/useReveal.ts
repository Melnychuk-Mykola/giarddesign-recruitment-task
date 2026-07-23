import { useEffect, useRef } from 'react';

/**
 * Reveals every `[data-reveal]` element inside the returned ref once it scrolls
 * into view. `resetKey` re-runs the scan when a section adds new children.
 */
export function useReveal<T extends HTMLElement>(resetKey?: unknown) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]:not(.reveal-in)');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [resetKey]);

  return ref;
}
