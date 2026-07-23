export type ButtonVariant = 'fill' | 'stroke' | 'line';
export type ButtonTone = 'dark' | 'light';

const base =
  'group/btn inline-flex items-center justify-center whitespace-nowrap text-base transition-colors duration-200 ease-smooth';

const styles: Record<ButtonTone, Record<ButtonVariant, string>> = {
  dark: {
    fill: 'h-[50px] rounded-full bg-green px-6 text-cream hover:bg-[#154C28]',
    stroke: 'h-[50px] gap-2 rounded-full border border-green px-[22px] text-green hover:bg-green hover:text-cream',
    line: 'gap-2.5 border-b border-green pb-1 text-green',
  },
  // The green and black sections need the outline flipped to cream.
  light: {
    fill: 'h-[50px] rounded-full bg-cream px-6 text-green hover:bg-white',
    stroke: 'h-[50px] gap-2 rounded-full border border-cream px-[22px] text-cream hover:bg-cream hover:text-green',
    line: 'gap-2.5 border-b border-cream pb-1 text-cream',
  },
};

export function buttonClass(variant: ButtonVariant = 'fill', tone: ButtonTone = 'dark') {
  return `${base} ${styles[tone][variant]}`;
}
