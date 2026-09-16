import React from 'react';
import { XIcon } from 'lucide-react';
import { cx } from '../../utils/format';
import { Select } from './Input';

export function FilterBar({
  children,
  className



}: {children: React.ReactNode;className?: string;}) {
  return (
    <div
      className={cx(
        'flex flex-wrap items-center gap-2 border-b border-line bg-subtle px-4 py-2.5',
        className
      )}>
      
      {children}
    </div>);

}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  className






}: {label: string;value: string;options: string[];onChange: (v: string) => void;className?: string;}) {
  return (
    <Select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cx('h-8 min-w-[132px] text-xs', className)}>
      
      <option value="All">{label}: All</option>
      {options.map((o) =>
      <option key={o} value={o}>
          {label}: {o}
        </option>
      )}
    </Select>);

}

export function ActiveFilter({
  label,
  onClear



}: {label: string;onClear: () => void;}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
      {label}
      <button
        onClick={onClear}
        aria-label={`Clear ${label}`}
        className="transition-opacity duration-150 ease-swift hover:opacity-70">
        
        <XIcon className="h-3 w-3" />
      </button>
    </span>);

}

export function Pagination({
  page,
  pageCount,
  total,
  onPage





}: {page: number;pageCount: number;total: number;onPage: (p: number) => void;}) {
  return (
    <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
      <p className="num text-xs tabular-nums text-ink-3">
        Page {page} of {pageCount} · {total.toLocaleString('en-IN')} results
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded border border-line-strong px-2.5 py-1 text-xs font-medium text-ink-2 transition-colors duration-150 ease-swift hover:bg-surface disabled:opacity-40">
          
          Previous
        </button>
        {Array.from({ length: Math.min(pageCount, 5) }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={cx(
                'num h-7 w-7 rounded text-xs font-medium tabular-nums transition-colors duration-150 ease-swift',
                p === page ?
                'bg-ink text-surface' :
                'text-ink-3 hover:bg-ink/[0.05]'
              )}>
              
              {p}
            </button>);

        })}
        <button
          onClick={() => onPage(Math.min(pageCount, page + 1))}
          disabled={page === pageCount}
          className="rounded border border-line-strong px-2.5 py-1 text-xs font-medium text-ink-2 transition-colors duration-150 ease-swift hover:bg-surface disabled:opacity-40">
          
          Next
        </button>
      </div>
    </div>);

}