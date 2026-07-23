# GiardDesign — recruitment task

Responsywna implementacja landing page przygotowana na podstawie projektu z Figmy, wykonana w ramach
procesu rekrutacyjnego dla agencji **adRespect.pl**. Widok desktop odwzorowuje makietę na siatce
1440 px, a wersje tablet i mobile zostały zaprojektowane samodzielnie, ponieważ makieta ich nie
zawierała.

## Demo

[Zobacz stronę online](https://twoj-adres-wdrozenia)

<!-- Po wdrożeniu zastąp powyższy adres publicznym URL z Vercel / Netlify. -->

## Technologie

- React
- TypeScript
- Vite
- Tailwind CSS
- Masonry Layout

Kroje pisma (Montserrat, Inter) są hostowane lokalnie, więc strona nie wysyła zapytań do zewnętrznych
domen.

## Główne możliwości

- Responsywny układ desktop / tablet / mobile bez poziomego przewijania.
- Galeria realizacji oparta na Masonry Layout z zachowaną kolejnością DOM i tabulacji.
- Lightbox otwierający wybrane zdjęcie, ze strzałkami, obsługą klawiatury i pułapką fokusu.
- Hero w formie slidera — zdjęcie, nagłówek, tekst i przyciski przełączane razem (strzałki,
  klawiatura, swipe).
- Animacje pojawiania się sekcji przy przewijaniu, z poszanowaniem `prefers-reduced-motion`.
- Nawigacja klawiaturą oraz zarządzanie fokusem w menu i oknach modalnych.
- Bezpośrednie linki z hashem (`#realizacje`, `#kontakt`, …) działające także po pełnym przeładowaniu.

## Uruchomienie lokalne

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Informacja o projekcie

Projekt graficzny jest własnością agencji adRespect.pl.
Implementacja powstała w ramach procesu rekrutacyjnego dla adRespect.pl.

Zdjęcia pochodzą z Unsplash — te same pliki, które są osadzone w makiecie.
