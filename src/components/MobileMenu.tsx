import { useEffect, useState } from 'react';
import { contact, navLinks, offer } from '../data/site';
import { useSiteSearch } from '../hooks/useSiteSearch';
import { ChevronDown } from './icons';
import { SearchResults } from './Search';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [offerOpen, setOfferOpen] = useState(false);
  const { query, setQuery, matches, hasQuery } = useSiteSearch();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    setOfferOpen(false);
    setQuery('');
  }, [open, setQuery]);

  return (
    <div
      id="menu-mobilne"
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto bg-cream lg:hidden"
    >
      <div className="wrap py-8">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (!matches[0]) return;
            window.location.hash = matches[0].href;
            onClose();
          }}
        >
          <label className="sr-only" htmlFor="szukaj-mobile">
            Szukaj na stronie
          </label>
          <input
            id="szukaj-mobile"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Szukaj na stronie"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-ink/15 bg-white px-5 text-base placeholder:text-ink/50"
          />
        </form>
        {hasQuery && <SearchResults matches={matches} onSelect={onClose} className="mt-3 rounded-2xl bg-white p-2" />}

        <nav aria-label="Menu mobilne" className="mt-8">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            <li>
              <button
                type="button"
                onClick={() => setOfferOpen((value) => !value)}
                aria-expanded={offerOpen}
                aria-controls="menu-mobilne-oferta"
                className="flex w-full items-center justify-between py-4 font-display text-h4 font-medium"
              >
                Oferta
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ease-smooth ${offerOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <ul id="menu-mobilne-oferta" hidden={!offerOpen} className="pb-4">
                {offer.map((item) => (
                  <li key={item.id}>
                    <a href={`#oferta-${item.id}`} onClick={onClose} className="block py-2 text-base">
                      {item.title}
                      <span className="block text-small text-ink/70">{item.short}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={onClose} className="block py-4 font-display text-h4 font-medium">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 space-y-1 text-base">
          <p>
            <a href={`tel:${contact.phone.replace(/-/g, '')}`}>{contact.phone}</a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
