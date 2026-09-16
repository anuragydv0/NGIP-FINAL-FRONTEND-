import React from 'react';
import { ArrowDownRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { cx, signedPct } from '../../utils/format';

type Tone = 'neutral' | 'accent' | 'pos' | 'neg' | 'warn' | 'info';

const tones: Record<Tone, string> = {
  neutral: 'bg-ink/[0.05] text-ink-2 border-transparent',
  accent: 'bg-accent-soft text-accent border-accent-line',
  pos: 'bg-pos-soft text-pos border-transparent',
  neg: 'bg-neg-soft text-neg border-transparent',
  warn: 'bg-warn-soft text-warn border-transparent',
  info: 'bg-info-soft text-info border-transparent'
};

export function Badge({
  tone = 'neutral',
  children,
  className,
  dot





}: {tone?: Tone;children: React.ReactNode;className?: string;dot?: boolean;}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 text-[11px] font-medium leading-4 whitespace-nowrap',
        tones[tone],
        className
      )}>
      
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>);

}

export function Pill({
  active,
  children,
  onClick,
  className





}: {active?: boolean;children: React.ReactNode;onClick?: () => void;className?: string;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'rounded-full border px-3 py-1 text-xs font-medium transition-[background-color,border-color,color] duration-150 ease-swift',
        active ?
        'border-accent bg-accent text-surface' :
        'border-line-strong bg-surface text-ink-2 hover:border-ink-4 hover:text-ink',
        className
      )}>
      
      {children}
    </button>);

}

export function Delta({
  value,
  suffix = '%',
  showIcon = true,
  size = 'sm',
  className






}: {value: number;suffix?: string;showIcon?: boolean;size?: 'xs' | 'sm' | 'md' | 'lg';className?: string;}) {
  const positive = value >= 0;
  const sizeClass = {
    xs: 'text-[11px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size];
  return (
    <span
      className={cx(
        'num inline-flex items-center gap-0.5 font-medium tabular-nums',
        positive ? 'text-pos' : 'text-neg',
        sizeClass,
        className
      )}>
      
      {showIcon && (
      positive ?
      <ArrowUpRightIcon className="h-3 w-3" strokeWidth={2.5} /> :

      <ArrowDownRightIcon className="h-3 w-3" strokeWidth={2.5} />)
      }
      {suffix === '%' ?
      signedPct(value) :
      `${positive ? '+' : '-'}${Math.abs(value).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}${suffix}`}
    </span>);

}

export function RiskBadge({ band }: {band: string;}) {
  const tone: Tone =
  band === 'Low' ?
  'pos' :
  band === 'Moderate' ?
  'info' :
  band === 'Elevated' ?
  'warn' :
  'neg';
  return <Badge tone={tone}>{band}</Badge>;
}

export function DataStatus({
  status = 'LIVE',
  detail



}: {status?: 'LIVE' | 'DELAYED' | 'SIMULATED' | 'UPDATED';detail?: string;}) {
  const map = {
    LIVE: { tone: 'text-pos', bg: 'bg-pos', label: 'LIVE' },
    DELAYED: { tone: 'text-warn', bg: 'bg-warn', label: 'DELAYED 15M' },
    SIMULATED: { tone: 'text-info', bg: 'bg-info', label: 'SIMULATED' },
    UPDATED: { tone: 'text-ink-3', bg: 'bg-ink-4', label: 'UPDATED' }
  }[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider">
      <span className={cx('h-1.5 w-1.5 rounded-full', map.bg)} />
      <span className={map.tone}>{map.label}</span>
      {detail && <span className="text-ink-4 font-medium">{detail}</span>}
    </span>);

}

export function ScoreBar({
  value,
  max = 100,
  tone = 'accent',
  className





}: {value: number;max?: number;tone?: 'accent' | 'pos' | 'neg' | 'warn' | 'info';className?: string;}) {
  const bg = {
    accent: 'bg-accent',
    pos: 'bg-pos',
    neg: 'bg-neg',
    warn: 'bg-warn',
    info: 'bg-info'
  }[tone];
  return (
    <div className={cx('h-1.5 w-full rounded-full bg-ink/[0.07]', className)}>
      <div
        className={cx('h-full rounded-full transition-[width] duration-500 ease-swift', bg)}
        style={{ width: `${Math.max(0, Math.min(100, value / max * 100))}%` }} />
      
    </div>);

}