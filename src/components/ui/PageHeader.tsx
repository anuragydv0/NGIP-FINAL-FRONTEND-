import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { cx } from '../../utils/format';

export function Breadcrumbs({
  items


}: {items: {label: string;to?: string;}[];}) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs">
      {items.map((item, i) =>
      <span key={item.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRightIcon className="h-3 w-3 text-ink-4" />}
          {item.to ?
        <Link
          to={item.to}
          className="text-ink-3 transition-colors duration-150 ease-swift hover:text-accent">
          
              {item.label}
            </Link> :

        <span className="font-medium text-ink-2">{item.label}</span>
        }
        </span>
      )}
    </nav>);

}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  meta,
  className,
  tabs








}: {title: React.ReactNode;subtitle?: React.ReactNode;breadcrumbs?: {label: string;to?: string;}[];actions?: React.ReactNode;meta?: React.ReactNode;className?: string;tabs?: React.ReactNode;}) {
  return (
    <header
      className={cx(
        'border-b border-line bg-surface px-5 pt-4 lg:px-7',
        tabs ? 'pb-0' : 'pb-4',
        className
      )}>
      
      {breadcrumbs &&
      <div className="mb-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      }
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="text-[19px] font-semibold leading-tight tracking-tight text-ink lg:text-[21px]">
            {title}
          </h1>
          {subtitle &&
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-ink-3">
              {subtitle}
            </p>
          }
          {meta && <div className="mt-2.5">{meta}</div>}
        </div>
        {actions &&
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
        }
      </div>
      {tabs && <div className="mt-4">{tabs}</div>}
    </header>);

}

export function PageBody({
  children,
  className



}: {children: React.ReactNode;className?: string;}) {
  return (
    <div className={cx('px-5 py-5 lg:px-7 lg:py-6', className)}>{children}</div>);

}