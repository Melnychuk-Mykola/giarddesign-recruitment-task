# GiardDesign

Strona firmy zajmującej się projektowaniem i realizacją ogrodów, zbudowana na podstawie makiety
`Zadanie rekrutacyjne 2023` (Figma). Widok desktop odtwarza makietę na siatce 1440 px; wersje
tablet i mobile zostały zaprojektowane samodzielnie, bo makieta ich nie zawiera.

## Uruchomienie

```bash
npm install
npm run dev
```

Pozostałe polecenia: `npm run build`, `npm run preview`, `npm run lint`.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS. Jedyna dodatkowa zależność to `@fontsource-variable`
(Montserrat i Inter) — kroje są hostowane lokalnie, więc strona nie wysyła zapytań do zewnętrznych
domen. Slider, masonry i lightbox są napisane ręcznie; każdy z nich to kilkadziesiąt linii, a gotowe
biblioteki dawałyby mniej kontroli nad animacją, obsługą klawiatury i dostępnością niż same wnoszą.

## Struktura

```
src/
  components/   sekcje strony (SiteHeader, Hero, Services, About, Projects, Instagram, SiteFooter)
                + elementy wspólne (Button, Lightbox, ResponsiveImage, Logo, icons)
  hooks/        useReveal, useDismiss, useSiteSearch
  data/site.ts  treści, zdjęcia i indeks wyszukiwarki
public/images/  zdjęcia w WebP w trzech szerokościach (480 / 960 / 1600)
```

## Siatka i typografia

Makieta trzyma się ramy 1440 px z marginesami 89 px (kolumna 1262 px), a nagłówek Oferty, blok
Instagram i stopka — marginesów 200 px (kolumna 1040 px). Zamiast drabinki breakpointów marginesy są
zapisane jako procent szerokości sekcji (`6.1806%` to dokładnie 89 px przy 1440 px), dzięki czemu
proporcje makiety utrzymują się na każdej szerokości. Rozmiary nagłówków to `clamp()` interpolowany
między 360 a 1440 px i zablokowany na wartości z Figmy przy 1440 px.

Makieta używa kroju Bagoss Extended (wersja trial, niedostępna do licencjonowania). Sam plik `.fig`
ma zapisane zastępstwo Montserrat + Inter i taki zestaw jest tu użyty; kursywa w nagłówkach
(`kompleksowo`, `z pasją`, `projekty`, `Instagramie`) odtwarza akcent z makiety. Logotyp
`giarddesign` i znak adRespect w stopce to wektory wyjęte z pliku źródłowego.

## Interakcje

- **Nawigacja** — `Oferta` rozwija menu z trzema usługami, ikona lupy wysuwa pole wyszukiwania nad
  linkami (linki wygaszają się, więc nie ma przeskoku layoutu). Wyszukiwarka filtruje indeks sekcji
  tej strony i przenosi do wybranej. Oba elementy zamyka `Escape` i kliknięcie poza obszarem, fokus
  wraca na przycisk. Poniżej 1024 px menu i wyszukiwarka są w panelu mobilnym.
- **Hero** — cała sekcja jest sliderem: zdjęcie, nagłówek, tekst i przyciski zmieniają się razem.
  Obsługa strzałkami na ekranie, klawiszami ← →, oraz swipe na dotyku.
- **Oferta** — całe karty są klikalne (link rozciągnięty pseudo-elementem, jeden stop tabulacji),
  hover unosi kartę i przesuwa strzałkę.
- **Realizacje** — masonry z trzech kolumn (2 na tablecie, 1 na telefonie); lista jest rozdzielana
  round-robin, co przy trzech kolumnach odtwarza układ z Figmy co do piksela. `Rozwiń` płynnie
  dopowiada pozostałe realizacje, kliknięcie zdjęcia otwiera lightbox ze strzałkami, obsługą
  klawiatury, pułapką fokusu i blokadą przewijania strony.

## Świadome odstępstwa od makiety

- Nagłówek jest przyklejony do góry (`sticky`) — strona ma ponad 5000 px, a pasek jest biały, więc
  w pozycji wyjściowej wygląda dokładnie jak w Figmie.
- W makiecie widać wszystkie dziewięć realizacji naraz; tutaj stan złożony pokazuje sześć, a
  `Rozwiń` dopowiada resztę — inaczej przycisk nie miałby czego pokazać.
- Blok Instagram ma prawą kolumnę szerszą o 24 px (181 zamiast 157), bo Inter potrzebuje tej
  przestrzeni, żeby złamać zdanie w tym samym miejscu co makieta.
- Dwa dodatkowe slajdy hero korzystają ze zdjęć z galerii, ale w osobnym kadrze pod proporcje hero.
- Odnośniki „Dowiedz się więcej” prowadzą do kontaktu, a nie do podstron — makieta nie zawiera
  żadnych podstron.

## Wydajność i dostępność

Zdjęcia są konwertowane do WebP i podawane przez `srcset`/`sizes`; każdy kafelek ma zadany stosunek
boków, więc nie ma przesunięć układu. Zdjęcia poniżej pierwszego ekranu ładują się leniwie, kod
lightboxa doładowuje się dopiero przy otwarciu galerii. Sekcje pojawiają się przy przewijaniu,
zdjęcia wjeżdżają maską; wszystkie animacje wyłącza `prefers-reduced-motion`.

Zdjęcia pochodzą z Unsplash — to te same pliki, które są osadzone w makiecie.
