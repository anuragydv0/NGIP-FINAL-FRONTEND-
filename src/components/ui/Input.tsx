import React from 'react';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { cx } from '../../utils/format';

const base =
'w-full rounded-md border border-line-strong bg-surface text-[13px] text-ink placeholder:text-ink-4 ' +
'transition-[border-color,box-shadow] duration-150 ease-swift ' +
'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 ' +
'disabled:cursor-not-allowed disabled:bg-subtle disabled:text-ink-4';

export function Field({
  label,
  hint,
  error,
  required,
  children,
  className







}: {label?: string;hint?: string;error?: string;required?: boolean;children: React.ReactNode;className?: string;}) {
  return (
    <div className={cx('space-y-1.5', className)}>
      {label &&
      <label className="flex items-center gap-1 text-xs font-medium text-ink-2">
          {label}
          {required && <span className="text-neg">*</span>}
        </label>
      }
      {children}
      {error ?
      <p className="text-xs text-neg">{error}</p> :
      hint ?
      <p className="text-xs text-ink-4">{hint}</p> :
      null}
    </div>);

}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {invalid?: boolean;}>(
  function Input({ className, invalid, ...rest }, ref) {
    return (
      <input
        ref={ref}
        {...rest}
        className={cx(base, 'h-9 px-3', invalid && 'border-neg', className)} />);


  });

export function Select({
  className,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={cx(base, 'h-9 appearance-none pl-3 pr-8', className)}>
        
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-4" />
    </div>);

}

export function SearchInput({
  className,
  wrapperClassName,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {wrapperClassName?: string;}) {
  return (
    <div className={cx('relative', wrapperClassName)}>
      <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-4" />
      <input
        type="search"
        {...rest}
        className={cx(base, 'h-9 pl-8 pr-3', className)} />
      
    </div>);

}

export function Textarea({
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...rest} className={cx(base, 'p-3', className)} />;
}

export function Toggle({
  checked,
  onChange,
  label,
  description





}: {checked: boolean;onChange: (v: boolean) => void;label?: string;description?: string;}) {
  return (
    <label className="flex items-start justify-between gap-6">
      {(label || description) &&
      <span className="min-w-0">
          {label &&
        <span className="block text-[13px] font-medium text-ink">
              {label}
            </span>
        }
          {description &&
        <span className="mt-0.5 block text-xs text-ink-3">{description}</span>
        }
        </span>
      }
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cx(
          'relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors duration-150 ease-swift',
          checked ? 'bg-accent' : 'bg-ink/20'
        )}>
        
        <span
          className={cx(
            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150 ease-swift',
            checked ? 'translate-x-[18px]' : 'translate-x-0.5'
          )} />
        
      </button>
    </label>);

}

export function Checkbox({
  checked,
  onChange,
  label,
  className





}: {checked: boolean;onChange: (v: boolean) => void;label?: React.ReactNode;className?: string;}) {
  return (
    <label className={cx('inline-flex items-center gap-2 text-[13px] text-ink-2', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-3.5 w-3.5 rounded border-line-strong text-accent focus:ring-accent/30" />
      
      {label}
    </label>);

}

export function RangeInput({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange








}: {label: string;value: number;min: number;max: number;step?: number;suffix?: string;onChange: (v: number) => void;}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-2">{label}</span>
        <span className="num text-xs font-semibold tabular-nums text-ink">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-accent" />
      
    </div>);

}