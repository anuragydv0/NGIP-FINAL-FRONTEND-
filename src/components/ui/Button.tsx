import React from 'react';
import { cx } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'link';
type Size = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  full?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
  'bg-accent text-surface border border-accent hover:bg-accent-hover hover:border-accent-hover disabled:bg-accent/40 disabled:border-transparent',
  secondary:
  'bg-surface text-ink border border-line-strong hover:bg-subtle hover:border-ink-4 disabled:text-ink-4',
  ghost:
  'bg-transparent text-ink-2 border border-transparent hover:bg-ink/[0.04] hover:text-ink disabled:text-ink-4',
  danger:
  'bg-neg text-surface border border-neg hover:bg-[#A82C22] hover:border-[#A82C22]',
  success:
  'bg-pos text-surface border border-pos hover:bg-[#0B7343] hover:border-[#0B7343]',
  link: 'bg-transparent border border-transparent text-accent hover:text-accent-hover hover:underline underline-offset-4 px-0'
};

const sizes: Record<Size, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5 rounded',
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded',
  md: 'h-9 px-3.5 text-[13px] gap-2 rounded-md',
  lg: 'h-11 px-5 text-sm gap-2 rounded-md'
};

export function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  full,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center font-medium whitespace-nowrap select-none',
        'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-swift',
        'active:scale-[0.985] disabled:cursor-not-allowed disabled:active:scale-100',
        variants[variant],
        sizes[size],
        full && 'w-full',
        className
      )}>
      
      {loading ?
      <span
        className="h-3.5 w-3.5 rounded-full border-2 border-current border-r-transparent animate-spin"
        aria-hidden /> :


      icon
      }
      {children}
      {iconRight}
    </button>);

}

export function IconButton({
  label,
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {label: string;}) {
  return (
    <button
      {...rest}
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-3',
        'transition-[background-color,color] duration-150 ease-swift',
        'hover:bg-ink/[0.05] hover:text-ink',
        className
      )}>
      
      {children}
    </button>);

}