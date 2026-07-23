import { contact, footerLinks } from '../data/site';
import { Button } from './Button';
import { Logo } from './Logo';

export function SiteFooter() {
  return (
    <footer id="kontakt" className="on-dark scroll-mt-20 bg-ink py-14 text-cream lg:py-20">
      <div className="wrap-narrow">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo className="h-[19px] w-[114px]" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <p>Daj znać, co możemy dla Ciebie zrobić!</p>
            <Button href={`mailto:${contact.email}`} tone="light" className="w-fit">
              Skontaktuj się z nami
            </Button>
          </div>
        </div>

        <hr className="my-12 border-cream lg:my-[62px]" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 lg:gap-x-12">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="text-small"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 lg:gap-x-12">
            <li>
              <a href={`tel:${contact.phone.replace(/-/g, '')}`} className="text-small">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="text-small">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:mt-[120px]">
          <p>Prawa zastrzeżone © 2022</p>
          <p className="flex items-center gap-4">
            made by
            <img src="/adrespect.svg" alt="adRespect" width={113} height={23} loading="lazy" />
          </p>
        </div>

        <p className="mt-8 text-caption text-cream/60">
          Projekt powstał w procesie rekrutacyjnym dla agencji adRespect.pl.
        </p>
      </div>
    </footer>
  );
}
