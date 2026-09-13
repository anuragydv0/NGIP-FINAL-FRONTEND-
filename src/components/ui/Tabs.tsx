import React from 'react';
import { cx } from '../../utils/format';

export function Tabs({
  tabs,
  value,
  onChange,
  className,
  variant = 'underline'






}: {tabs: {id: string;label: string;count?: number;}[];value: string;onChange: (id: string) => void;className?: string;variant?: 'underline' | 'enclosed';}) {
  if (variant === 'enclosed') {
    return (
      <div
        role="tablist"
        className={cx(
          'no-scrollbar inline-flex overflow-x-auto rounded-md border border-line-strong bg-surface p-0.5',
          className
        )}>
        
        {tabs.map((t) =>
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cx(
            'whitespace-nowrap rounded px-3 py-1.5 text-xs font-medium transition-colors duration-150 ease-swift',
            value === t.id ?
            'bg-ink text-white' :
            'text-ink-3 hover:text-ink'
          )}>
          
            {t.label}
            {t.count !== undefined &&
          <span className="num ml-1.5 tabular-nums opacity-60">{t.count}</span>
          }
          </button>
        )}
      </div>);

  }

  return (
    <div
      role="tablist"
      className={cx(
        'no-scrollbar flex gap-6 overflow-x-auto border-b border-line',
        className
      )}>
      
      {tabs.map((t) =>
      <button
        key={t.id}
        role="tab"
        aria-selected={value === t.id}
        onClick={() => onChange(t.id)}
        className={cx(
          'relative -mb-px whitespace-nowrap border-b-2 pb-2.5 pt-1 text-[13px] font-medium transition-colors duration-150 ease-swift',
          value === t.id ?
          'border-accent text-ink' :
          'border-transparent text-ink-3 hover:text-ink'
        )}>
        
          {t.label}
          {t.count !== undefined &&
        <span
          className={cx(
            'num ml-1.5 rounded px-1.5 py-0.5 text-[11px] tabular-nums',
            value === t.id ? 'bg-accent-soft text-accent' : 'bg-ink/[0.05] text-ink-3'
          )}>
          
              {t.count}
            </span>
        }
        </button>
      )}
    </div>);

}

export function Segmented({
  options,
  value,
  onChange,
  className,
  size = 'sm'






}: {options: string[];value: string;onChange: (v: string) => void;className?: string;size?: 'xs' | 'sm';}) {
  return (
    <div
      className={cx(
        'inline-flex rounded-md border border-line-strong bg-surface p-0.5',
        className
      )}>
      
      {options.map((o) =>
      <button
        key={o}
        type="button"
        onClick={() => onChange(o)}
        aria-pressed={value === o}
        className={cx(
          'rounded font-medium transition-colors duration-150 ease-swift',
          size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
          value === o ?
          'bg-ink text-white' :
          'text-ink-3 hover:bg-ink/[0.04] hover:text-ink'
        )}>
        
          {o}
        </button>
      )}
    </div>);

}