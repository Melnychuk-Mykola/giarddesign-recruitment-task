import { useEffect, useState } from 'react';
import { navLinks } from '../data/site';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { OfferMenu } from './OfferMenu';
import { NavSearch } from './Search';
import { CloseIcon, MenuIcon } from './icons';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // The search field slides out on top of the links, so they step aside.
  const linkClass = `transition-opacity duration-200 ease-smooth ${searchOpen ? 'invisible opacity-0' : 'opacity-100'}`;

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    // Figma places the bar above the hero; it is pinned because the page is long.
    <header className="sticky top-0 z-40 bg-white">
      <div className="wrap">
        <div className="flex h-[72px] items-center justify-between">
          <a href="#start" aria-label="GiardDesign — początek strony" className="shrink-0">
            <Logo className="h-[19px] w-[114px] text-ink" />
          </a>

          <nav aria-label="Nawigacja główna" className="hidden lg:block">
            <ul className="flex items-center gap-12">
              <li className={linkClass}>
                <OfferMenu />
              </li>
              {navLinks.map((link) => (
                <li key={link.href} className={linkClass}>
                  <a href={link.href} className="text-small">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <NavSearch open={searchOpen} onOpenChange={setSearchOpen} />
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobilne"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
