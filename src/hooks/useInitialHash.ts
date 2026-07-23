import { useLayoutEffect } from 'react';

/**
 * A page opened straight on `/#realizacje` scrolls before React has rendered
 * the section, so the browser gives up and stays at the top. Repeat the jump
 * once the markup exists — and again after the web fonts settle, unless the
 * visitor has already scrolled somewhere else.
 */
export function useInitialHash() {
  useLayoutEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    // A target that still carries its scroll-in offset would land 20px out, so
    // it arrives already revealed.
    target.classList.add('reveal-in');

    // `instant` overrides the smooth scrolling used for in-page links, so the
    // first paint lands on the section instead of animating down to it.
    const jump = () => target.scrollIntoView({ behavior: 'instant', block: 'start' });
    jump();

    const landed = window.scrollY;
    document.fonts?.ready.then(() => {
      if (window.scrollY === landed) jump();
    });
  }, []);
}
