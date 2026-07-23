import { useCallback, useEffect, useId, useRef } from 'react';
import { useDismiss } from '../hooks/useDismiss';
import { useSiteSearch, type SearchEntry } from '../hooks/useSiteSearch';
import { CloseIcon, SearchIcon } from './icons';

interface ResultListProps {
  matches: SearchEntry[];
  onSelect: () => void;
  className?: string;
  id?: string;
}

export function SearchResults({ matches, onSelect, className = '', id }: ResultListProps) {
  return (
    <ul id={id} className={className}>
      {matches.length === 0 ? (
        <li className="px-4 py-3 text-small text-ink/70">Brak wyników.</li>
      ) : (
        matches.map((entry) => (
          <li key={`${entry.href}-${entry.label}`}>
            <a
              href={entry.href}
              onClick={onSelect}
              className="block rounded-xl px-4 py-2.5 transition-colors duration-200 hover:bg-cream"
            >
              <span className="block text-small font-medium">{entry.label}</span>
              <span className="block text-caption text-ink/70">{entry.hint}</span>
            </a>
          </li>
        ))
      )}
    </ul>
  );
}

/**
 * Desktop navigation search. The header owns the open state because it fades
 * the links out while the field covers them.
 */
export function NavSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { query, setQuery, matches, hasQuery } = useSiteSearch();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery('');
    if (containerRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
  }, [onOpenChange, setQuery]);

  useDismiss(open, containerRef, close);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    // The 44px hit area is wider than the 24px icon, so it is pulled back to
    // keep the icon on the same optical line as the links.
    <div ref={containerRef} className="relative -mx-2.5 flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : onOpenChange(true))}
        aria-expanded={open}
        aria-label={open ? 'Zamknij wyszukiwarkę' : 'Otwórz wyszukiwarkę'}
        className="grid h-11 w-11 place-items-center text-ink"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <SearchIcon className="h-6 w-6" />}
      </button>

      {/* Sliding the field out to the left of the icon keeps the links in place. */}
      <form
        role="search"
        inert={!open}
        onSubmit={(event) => {
          event.preventDefault();
          if (!matches[0]) return;
          window.location.hash = matches[0].href;
          close();
        }}
        className={`absolute right-11 top-1/2 -translate-y-1/2 overflow-hidden transition-[width,opacity] duration-300 ease-smooth ${
          open ? 'w-[260px] opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <label className="sr-only" htmlFor={`${id}-input`}>
          Szukaj na stronie
        </label>
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Szukaj na stronie"
          autoComplete="off"
          aria-controls={id}
          className="h-11 w-[248px] rounded-full border border-ink/15 bg-white px-4 text-small placeholder:text-ink/50"
        />
      </form>

      {open && hasQuery && (
        <SearchResults
          id={id}
          matches={matches}
          onSelect={close}
          className="absolute right-0 top-full z-10 mt-3 w-[300px] rounded-2xl border border-ink/10 bg-white p-2"
        />
      )}
    </div>
  );
}
