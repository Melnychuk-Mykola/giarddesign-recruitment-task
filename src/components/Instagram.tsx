import { contact } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { Button } from './Button';

export function Instagram() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="instagram" ref={ref} aria-labelledby="instagram-tytul" className="bg-cream py-14 lg:py-[60px]">
      <div className="wrap-narrow">
        <div
          data-reveal
          className="reveal on-dark flex flex-col gap-10 bg-green px-8 py-12 text-cream sm:px-12 sm:py-16 xl:flex-row xl:items-end xl:gap-10 xl:px-[110px] xl:py-[120px]"
        >
          <h2 id="instagram-tytul" className="max-w-[599px] font-display text-h3">
            Zostańmy w kontakcie! Znajdziesz nas na <em>Instagramie</em>.
          </h2>
          {/* 181px instead of the 157px in Figma: Inter needs the extra room to
              keep the line break where the mockup has it. */}
          <div className="xl:w-[181px] xl:shrink-0">
            <p>Śledź nasze najnowsze realizacje!</p>
            <Button
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              tone="light"
              withArrow={false}
              className="mt-6 h-[46px]"
            >
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
