import { useCallback, useEffect, useRef, useState } from 'react';
import { navLinks } from '../data/site';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { OfferMenu } from './OfferMenu';
import { NavSearch } from './Search';
import { CloseIcon, MenuIcon } from './icons';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The search field slides out on top of the links, so they step aside.
  const linkClass = `transition-opacity duration-200 ease-smooth ${searchOpen ? 'invisible opacity-0' : 'opacity-100'}`;

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    if (headerRef.current?.contains(document.activeElement)) toggleRef.current?.focus();
  }, []);

  // Above the breakpoint the panel is hidden by CSS, so the state has to follow
  // it — otherwise the body scroll lock would outlive the menu.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  // The panel covers the page, so the page stops being reachable by keyboard
  // and assistive technology while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const behind = document.querySelectorAll<HTMLElement>('main, footer');
    behind.forEach((element) => element.setAttribute('inert', ''));
    return () => behind.forEach((element) => element.removeAttribute('inert'));
  }, [menuOpen]);

  useFocusTrap(menuOpen, headerRef);

  return (
    // Figma places the bar above the hero; it is pinned because the page is long.
    <header ref={headerRef} className="sticky top-0 z-40 bg-white">
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
            ref={toggleRef}
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-expanded={menuOpen}
            aria-controls="menu-mobilne"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Links close the panel without pulling focus back, so the browser can
          hand it to the section the link points at. */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
