import { About } from './components/About';
import { Hero } from './components/Hero';
import { Instagram } from './components/Instagram';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

export default function App() {
  return (
    <>
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-green focus:px-5 focus:py-3 focus:text-cream"
      >
        Przejdź do treści
      </a>
      <SiteHeader />
      <main id="tresc">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Instagram />
      </main>
      <SiteFooter />
    </>
  );
}
