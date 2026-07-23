import type { ComponentPropsWithoutRef } from 'react';
import { buttonClass, type ButtonTone, type ButtonVariant } from './buttonStyles';
import { ArrowRight } from './icons';

interface ButtonProps extends ComponentPropsWithoutRef<'a'> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  withArrow?: boolean;
}

export function Button({ variant = 'fill', tone = 'dark', withArrow, className = '', children, ...rest }: ButtonProps) {
  const showArrow = withArrow ?? variant !== 'fill';
  return (
    <a className={`${buttonClass(variant, tone)} ${className}`.trim()} {...rest}>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 ease-smooth group-hover/btn:translate-x-1" />
      )}
    </a>
  );
}
