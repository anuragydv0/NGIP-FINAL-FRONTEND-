import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRightIcon,
  ClockIcon,
  LightbulbIcon,
  PlusIcon } from
'lucide-react';
import { Country, Instrument, NewsItem, ResearchReport } from '../../types';
import { Badge, Delta, RiskBadge, ScoreBar } from '../ui/Badge';
import { Sparkline } from '../ui/Sparkline';
import { cx, num, pct } from '../../utils/format';

export function CountryCard({ country }: {country: Country;}) {
  return (
    <Link
      to={`/app/countries/${country.id}`}
      className="group flex flex-col rounded-lg border border-line bg-surface p-4 shadow-card transition-[border-color,box-shadow,transform] duration-150 ease-swift hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised">
      
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none" aria-hidden>
            {country.flag}
          </span>
          <div>
            <p className="text-[13px] font-semibold leading-tight text-ink">
              {country.name}
            </p>
            <p className="mt-0.5 text-[11px] text-ink-4">
              {country.code} · {country.region}
            </p>
          </div>
        </div>
        <ArrowUpRightIcon className="h-3.5 w-3.5 text-ink-4 transition-colors duration-150 ease-swift group-hover:text-accent" />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-4">
            Country Growth Index
          </p>
          <p className="num mt-1 text-2xl font-semibold leading-none tabular-nums tracking-tight text-ink">
            {country.cgi.toFixed(1)}
          </p>
        </div>
        <Delta value={country.cgiDelta} suffix="" size="sm" />
      </div>
      <ScoreBar value={country.cgi} className="mt-2.5" />

      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
        {[
        ['GDP Growth', pct(country.gdpGrowth, 1)],
        ['Inflation', pct(country.inflation, 1)],
        ['Risk', String(country.riskScore)]].
        map(([label, value]) =>
        <div key={label}>
            <dt className="text-[10px] uppercase tracking-wider text-ink-4">
              {label}
            </dt>
            <dd className="num mt-0.5 text-[13px] font-medium tabular-nums text-ink">
              {value}
            </dd>
          </div>
        )}
      </dl>
      <div className="mt-3 flex items-center justify-between">
        <RiskBadge band={country.riskBand} />
        <Sparkline data={country.trend} width={72} height={20} />
      </div>
    </Link>);

}

export function InstrumentCard({
  instrument,
  onTrade



}: {instrument: Instrument;onTrade?: (i: Instrument) => void;}) {
  return (
    <div className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-card transition-[border-color,box-shadow] duration-150 ease-swift hover:border-line-strong hover:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold tracking-wide text-accent">
              {instrument.symbol}
            </span>
            <Badge>{instrument.type}</Badge>
          </div>
          <Link
            to={`/app/instruments/${instrument.id}`}
            className="mt-1.5 block truncate text-[13px] font-semibold text-ink hover:text-accent">
            
            {instrument.name}
          </Link>
          <p className="mt-0.5 text-[11px] text-ink-4">
            <span aria-hidden>{instrument.flag}</span> {instrument.country} ·{' '}
            {instrument.sector}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="num text-[15px] font-semibold tabular-nums text-ink">
            {num(instrument.price)}
          </p>
          <Delta value={instrument.changePct} size="xs" />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-line pt-3">
        <dl className="grid flex-1 grid-cols-3 gap-2">
          {[
          ['AUM', `₹${num(instrument.aum, 0)} Cr`],
          ['Expense', pct(instrument.expenseRatio)],
          ['1Y', pct(instrument.oneYear, 1)]].
          map(([label, value]) =>
          <div key={label}>
              <dt className="text-[10px] uppercase tracking-wider text-ink-4">
                {label}
              </dt>
              <dd className="num mt-0.5 text-xs font-medium tabular-nums text-ink">
                {value}
              </dd>
            </div>
          )}
        </dl>
        <Sparkline data={instrument.trend} width={64} height={22} />
      </div>

      {onTrade &&
      <div className="mt-3 flex items-center gap-2">
          <button
          onClick={() => onTrade(instrument)}
          className="flex-1 rounded-md border border-accent bg-accent px-3 py-1.5 text-xs font-semibold text-surface transition-colors duration-150 ease-swift hover:bg-accent-hover">
          
            Trade
          </button>
          <Link
          to={`/app/instruments/${instrument.id}`}
          className="flex-1 rounded-md border border-line-strong px-3 py-1.5 text-center text-xs font-medium text-ink-2 transition-colors duration-150 ease-swift hover:bg-subtle">
          
            Details
          </Link>
        </div>
      }
    </div>);

}

export function NewsCard({
  item,
  variant = 'default'



}: {item: NewsItem;variant?: 'default' | 'featured' | 'compact';}) {
  if (variant === 'compact') {
    return (
      <article className="flex gap-3 border-b border-line py-3 last:border-0">
        <span className="mt-0.5 text-base leading-none" aria-hidden>
          {item.flag}
        </span>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-ink">
            {item.headline}
          </h3>
          <p className="mt-1 flex items-center gap-2 text-[11px] text-ink-4">
            <span>{item.source}</span>
            <span aria-hidden>·</span>
            <span>{item.time}</span>
            <Badge
              tone={item.impact === 'High' ? 'warn' : 'neutral'}
              className="ml-auto">
              
              {item.category}
            </Badge>
          </p>
        </div>
      </article>);

  }

  if (variant === 'featured') {
    return (
      <article className="rounded-lg border border-line bg-surface p-6 shadow-card">
        <div className="flex items-center gap-2">
          <Badge tone="accent">Featured</Badge>
          <Badge tone={item.impact === 'High' ? 'warn' : 'neutral'}>
            {item.category}
          </Badge>
          <span className="text-[11px] text-ink-4">
            <span aria-hidden>{item.flag}</span> {item.country}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink">
          {item.headline}
        </h2>
        <p className="mt-2.5 max-w-3xl text-[13px] leading-relaxed text-ink-2">
          {item.summary}
        </p>
        <p className="mt-4 flex items-center gap-2 text-[11px] text-ink-4">
          <span className="font-medium text-ink-3">{item.source}</span>
          <span aria-hidden>·</span>
          <ClockIcon className="h-3 w-3" />
          {item.time}
        </p>
      </article>);

  }

  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-card transition-[border-color] duration-150 ease-swift hover:border-line-strong">
      <div className="flex items-center gap-2">
        <span className="text-sm" aria-hidden>
          {item.flag}
        </span>
        <span className="text-[11px] font-medium text-ink-3">{item.country}</span>
        <Badge
          tone={item.impact === 'High' ? 'warn' : 'neutral'}
          className="ml-auto">
          
          {item.category}
        </Badge>
      </div>
      <h3 className="mt-2.5 line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
        {item.headline}
      </h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ink-3">
        {item.summary}
      </p>
      <p className="mt-3 flex items-center gap-2 border-t border-line pt-2.5 text-[11px] text-ink-4">
        <span className="font-medium text-ink-3">{item.source}</span>
        <span aria-hidden>·</span>
        <span>{item.time}</span>
      </p>
    </article>);

}

export function ResearchCard({
  report,
  variant = 'default'



}: {report: ResearchReport;variant?: 'default' | 'featured';}) {
  const ratingTone =
  report.rating === 'Overweight' ?
  'pos' :
  report.rating === 'Underweight' ?
  'neg' :
  'info';
  return (
    <Link
      to={`/app/research/${report.id}`}
      className={cx(
        'group flex flex-col rounded-lg border border-line bg-surface shadow-card transition-[border-color,box-shadow,transform] duration-150 ease-swift hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised',
        variant === 'featured' ? 'p-6' : 'p-4'
      )}>
      
      <div className="flex items-center gap-2">
        <Badge tone="accent">{report.category}</Badge>
        {report.rating && <Badge tone={ratingTone}>{report.rating}</Badge>}
      </div>
      <h3
        className={cx(
          'mt-3 font-semibold leading-snug tracking-tight text-ink transition-colors duration-150 ease-swift group-hover:text-accent',
          variant === 'featured' ? 'text-lg' : 'text-[13px]'
        )}>
        
        {report.title}
      </h3>
      <p
        className={cx(
          'mt-2 flex-1 leading-relaxed text-ink-3',
          variant === 'featured' ? 'text-[13px]' : 'line-clamp-3 text-xs'
        )}>
        
        {report.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/[0.06] text-[10px] font-semibold text-ink-2">
          {report.author.
          split(' ').
          map((w) => w[0]).
          slice(0, 2).
          join('')}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-ink-2">
            {report.author}
          </p>
          <p className="num text-[10px] tabular-nums text-ink-4">
            {report.date} · {report.readingTime}
          </p>
        </div>
        <span className="ml-auto text-[11px]" aria-hidden>
          {report.flag}
        </span>
      </div>
    </Link>);

}

export function InsightCard({
  title,
  body,
  tone = 'info',
  action





}: {title: string;body: string;tone?: 'info' | 'warn' | 'neg' | 'pos';action?: React.ReactNode;}) {
  const map = {
    info: 'border-info/25 bg-info-soft',
    warn: 'border-warn/25 bg-warn-soft',
    neg: 'border-neg/25 bg-neg-soft',
    pos: 'border-pos/25 bg-pos-soft'
  };
  const iconTone = {
    info: 'text-info',
    warn: 'text-warn',
    neg: 'text-neg',
    pos: 'text-pos'
  };
  return (
    <div className={cx('flex gap-3 rounded-lg border p-4', map[tone])}>
      <LightbulbIcon className={cx('mt-0.5 h-4 w-4 shrink-0', iconTone[tone])} />
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-2">{body}</p>
        {action && <div className="mt-2.5">{action}</div>}
      </div>
    </div>);

}

export function AddTile({
  label,
  onClick



}: {label: string;onClick?: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong bg-subtle text-ink-3 transition-[border-color,color,background-color] duration-150 ease-swift hover:border-accent hover:bg-accent-soft hover:text-accent">
      
      <PlusIcon className="h-4 w-4" />
      <span className="text-xs font-medium">{label}</span>
    </button>);

}