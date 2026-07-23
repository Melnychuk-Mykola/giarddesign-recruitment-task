import { offer } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { ArrowRight } from './icons';

export function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    // 120/160 keeps the block on the 939px height the Figma frame is locked to.
    <section
      id="oferta"
      ref={ref}
      aria-labelledby="oferta-tytul"
      className="scroll-mt-[72px] bg-cream pb-20 pt-20 lg:pb-[160px] lg:pt-[120px]"
    >
      <div className="wrap-narrow reveal" data-reveal>
        <p className="text-caption text-green">Oferta</p>
        <div className="mt-4 max-w-[709px]">
          <h2 id="oferta-tytul" className="font-display text-h2 font-medium">
            Działamy <em className="heading-accent">kompleksowo</em>
          </h2>
          <p className="mt-6 lg:mt-8">
            Oferujemy kompletną obsługę inwestycji terenów zielonych. Projektujemy nowoczesne ogrody przydomowe oraz
            rezydencjonalne. Stworzymy dla Ciebie projekt, zwizualizujemy go i wcielimy w życie, a na każdym etapie
            posłużymy radą i wieloletnim doświadczeniem.
          </p>
        </div>
      </div>

      <div className="wrap mt-14 lg:mt-24">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {offer.map((item, index) => (
            <li
              key={item.id}
              id={`oferta-${item.id}`}
              data-reveal
              style={{ transitionDelay: `${index * 90}ms` }}
              className="reveal group relative flex scroll-mt-28 flex-col justify-between rounded-[28px] bg-white px-8 py-10 transition-transform duration-300 ease-smooth hover:-translate-y-1.5 lg:min-h-[370px] lg:px-10 lg:py-12 [&:has(a:focus-visible)]:outline [&:has(a:focus-visible)]:outline-2 [&:has(a:focus-visible)]:outline-offset-2 [&:has(a:focus-visible)]:outline-green"
            >
              <div>
                <img
                  src={item.icon}
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-auto transition-transform duration-300 ease-smooth group-hover:-translate-y-1"
                />
                <h3 className="mt-8 font-display text-h4 font-medium">{item.title}</h3>
                <p className="mt-3 text-small">{item.text}</p>
              </div>

              <a
                href={item.cta.href}
                className="mt-8 inline-flex w-fit items-center gap-2.5 border-b border-green pb-1 text-green focus-visible:outline-none"
              >
                {item.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
                <span className="absolute inset-0 rounded-[28px]" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
