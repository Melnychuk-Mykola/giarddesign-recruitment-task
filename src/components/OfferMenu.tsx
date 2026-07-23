import { useCallback, useRef, useState } from 'react';
import { offer } from '../data/site';
import { useDismiss } from '../hooks/useDismiss';
import { ChevronDown } from './icons';

export function OfferMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (containerRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
  }, []);

  useDismiss(open, containerRef, close);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="flex items-center gap-[5px] text-small"
        aria-expanded={open}
        aria-controls="menu-oferta"
        onClick={() => setOpen((value) => !value)}
      >
        Oferta
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ease-smooth ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        id="menu-oferta"
        className={`absolute left-1/2 top-full z-10 w-[320px] -translate-x-1/2 pt-5 transition-[opacity,transform] duration-200 ease-smooth ${
          open ? 'translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <ul className="rounded-2xl border border-ink/10 bg-white p-2">
          {offer.map((item) => (
            <li key={item.id}>
              <a
                href={`#oferta-${item.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-cream"
              >
                <span className="block font-display text-base font-medium">{item.title}</span>
                <span className="mt-0.5 block text-small text-ink/70">{item.short}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
