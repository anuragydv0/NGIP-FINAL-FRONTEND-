import React from 'react';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InboxIcon,
  InfoIcon,
  RefreshCwIcon,
  XCircleIcon } from
'lucide-react';
import { cx } from '../../utils/format';
import { Button } from './Button';

export function Skeleton({ className }: {className?: string;}) {
  return (
    <div
      className={cx('animate-pulse rounded bg-ink/[0.06]', className)}
      aria-hidden />);


}

export function LoadingState({ label = 'Loading data' }: {label?: string;}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-r-transparent" />
      <p className="text-[13px] text-ink-3">{label}…</p>
    </div>);

}

export function EmptyState({
  title,
  description,
  action,
  icon,
  compact






}: {title: string;description?: string;action?: React.ReactNode;icon?: React.ReactNode;compact?: boolean;}) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center px-6 text-center',
        compact ? 'py-8' : 'py-16'
      )}>
      
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-subtle text-ink-4">
        {icon ?? <InboxIcon className="h-4.5 w-4.5" />}
      </div>
      <h3 className="mt-3 text-[13px] font-semibold text-ink">{title}</h3>
      {description &&
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-ink-3">
          {description}
        </p>
      }
      {action && <div className="mt-4">{action}</div>}
    </div>);

}

export function ErrorState({
  title = 'Unable to load data',
  description = 'The data source did not respond. This can happen during scheduled ingestion windows.',
  onRetry




}: {title?: string;description?: string;onRetry?: () => void;}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neg-soft text-neg">
        <AlertTriangleIcon className="h-4.5 w-4.5" />
      </div>
      <h3 className="mt-3 text-[13px] font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-ink-3">
        {description}
      </p>
      {onRetry &&
      <Button
        size="sm"
        className="mt-4"
        icon={<RefreshCwIcon className="h-3.5 w-3.5" />}
        onClick={onRetry}>
        
          Retry
        </Button>
      }
    </div>);

}

type AlertTone = 'info' | 'warn' | 'neg' | 'pos' | 'accent';

export function Alert({
  tone = 'info',
  title,
  children,
  action,
  className






}: {tone?: AlertTone;title?: string;children?: React.ReactNode;action?: React.ReactNode;className?: string;}) {
  const map: Record<AlertTone, {cls: string;icon: React.ReactNode;}> = {
    info: {
      cls: 'bg-info-soft border-info/20 text-info',
      icon: <InfoIcon className="h-4 w-4" />
    },
    warn: {
      cls: 'bg-warn-soft border-warn/20 text-warn',
      icon: <AlertTriangleIcon className="h-4 w-4" />
    },
    neg: {
      cls: 'bg-neg-soft border-neg/20 text-neg',
      icon: <XCircleIcon className="h-4 w-4" />
    },
    pos: {
      cls: 'bg-pos-soft border-pos/20 text-pos',
      icon: <CheckCircle2Icon className="h-4 w-4" />
    },
    accent: {
      cls: 'bg-accent-soft border-accent-line text-accent',
      icon: <InfoIcon className="h-4 w-4" />
    }
  };
  const t = map[tone];
  return (
    <div
      role="status"
      className={cx('flex gap-3 rounded-lg border px-4 py-3', t.cls, className)}>
      
      <span className="mt-0.5 shrink-0">{t.icon}</span>
      <div className="min-w-0 flex-1">
        {title && <p className="text-[13px] font-semibold">{title}</p>}
        {children &&
        <div className="mt-0.5 text-xs leading-relaxed text-ink-2">
            {children}
          </div>
        }
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>);

}

export function SuccessPanel({
  title,
  description,
  children




}: {title: string;description?: string;children?: React.ReactNode;}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pos-soft text-pos">
        <CheckCircle2Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      {description &&
      <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ink-3">
          {description}
        </p>
      }
      {children && <div className="mt-5 w-full">{children}</div>}
    </div>);

}