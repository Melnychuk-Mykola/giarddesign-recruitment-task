type IconProps = { className?: string };

/** Arrow used by the Figma button component (16×16, 45° head). */
export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={className} aria-hidden="true" focusable="false">
      <path d="M0 8h15.4" />
      <path d="m8.9 1 7.1 7-7.1 7" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className={className} aria-hidden="true" focusable="false">
      <path d="M8 0v15.4" />
      <path d="m1 8.9 7 7.1 7-7.1" />
    </svg>
  );
}

export function ChevronDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      <path d="m2 4.2 4 4 4-4" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 6 6" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} aria-hidden="true" focusable="false">
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} aria-hidden="true" focusable="false">
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

/** Slider arrow — 3px stroke with the arrow cap used in the hero panel. */
export function SliderArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" className={className} aria-hidden="true" focusable="false">
      <path d="M11.9 24h24.2" />
      <path d="m29.5 17.4 6.6 6.6-6.6 6.6" />
    </svg>
  );
}
