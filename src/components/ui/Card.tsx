import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { cx } from '../../utils/format';
import { Delta } from './Badge';

export function Card({
  children,
  className,
  padded = false,
  glass = false
}: {children: React.ReactNode;className?: string;padded?: boolean;glass?: boolean;}) {
  return (
    <section
      className={cx(
        'rounded-xl border border-line shadow-card transition-shadow duration-200 ease-swift hover:shadow-raised',
        glass ? 'bg-surface/80 backdrop-blur-xl' : 'bg-surface',
        padded && 'p-5',
        className
      )}>
      
      {children}
    </section>);

}

export function CardHeader({
  title,
  subtitle,
  action,
  href,
  hrefLabel = 'View all',
  className,
  dense








}: {title: React.ReactNode;subtitle?: React.ReactNode;action?: React.ReactNode;href?: string;hrefLabel?: string;className?: string;dense?: boolean;}) {
  return (
    <header
      className={cx(
        'flex items-center justify-between gap-4 border-b border-line',
        dense ? 'px-4 py-2.5' : 'px-5 py-3.5',
        className
      )}>
      
      <div className="min-w-0">
        <h2 className="truncate text-[13px] font-semibold tracking-tight text-ink">
          {title}
        </h2>
        {subtitle &&
        <p className="mt-0.5 truncate text-xs text-ink-3">{subtitle}</p>
        }
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {action}
        {href &&
        <Link
          to={href}
          className="group inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors duration-150 ease-swift hover:text-accent-hover">
          
            {hrefLabel}
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-swift group-hover:translate-x-0.5" />
          </Link>
        }
      </div>
    </header>);

}

export function StatCard({
  label,
  value,
  delta,
  deltaSuffix = '%',
  sub,
  tone,
  emphasis,
  className









}: {label: string;value: React.ReactNode;delta?: number;deltaSuffix?: string;sub?: React.ReactNode;tone?: 'pos' | 'neg' | 'default';emphasis?: boolean;className?: string;}) {
  return (
    <div
      className={cx(
        'flex flex-col justify-between rounded-lg border px-4 py-3.5 shadow-card',
        emphasis ? 'bg-ink text-surface border-ink' : 'bg-surface border-line',
        className
      )}>
      
      <p
        className={cx(
          'text-[11px] font-medium uppercase tracking-wider',
          emphasis ? 'text-surface/60' : 'text-ink-3'
        )}>
        
        {label}
      </p>
      <p
        className={cx(
          'num mt-2 font-semibold tracking-tight tabular-nums',
          emphasis ? 'text-[26px] leading-8' : 'text-xl leading-7',
          tone === 'pos' && !emphasis && 'text-pos',
          tone === 'neg' && !emphasis && 'text-neg'
        )}>
        
        {value}
      </p>
      <div className="mt-1.5 flex items-center gap-2">
        {delta !== undefined && <Delta value={delta} suffix={deltaSuffix} />}
        {sub &&
        <span
          className={cx(
            'truncate text-xs',
            emphasis ? 'text-surface/60' : 'text-ink-3'
          )}>
          
            {sub}
          </span>
        }
      </div>
    </div>);

}

export function MetricRow({
  label,
  value,
  tone




}: {label: string;value: React.ReactNode;tone?: 'pos' | 'neg';}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-2 last:border-0">
      <span className="text-xs text-ink-3">{label}</span>
      <span
        className={cx(
          'num text-[13px] font-medium tabular-nums',
          tone === 'pos' ? 'text-pos' : tone === 'neg' ? 'text-neg' : 'text-ink'
        )}>
        
        {value}
      </span>
    </div>);

}

export function SectionTitle({
  children,
  right,
  className




}: {children: React.ReactNode;right?: React.ReactNode;className?: string;}) {
  return (
    <div className={cx('flex items-end justify-between gap-4', className)}>
      <h2 className="text-[15px] font-semibold tracking-tight text-ink">
        {children}
      </h2>
      {right}
    </div>);

}