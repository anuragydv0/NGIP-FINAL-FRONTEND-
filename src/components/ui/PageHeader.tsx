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
        'border-b border-line bg-surface/80 backdrop-blur-md px-5 pt-3 lg:px-7',
        tabs ? 'pb-0' : 'pb-3',
        className
      )}>
      
      {breadcrumbs &&
      <div className="mb-1.5">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      }
      <div className="flex flex-col items-start gap-y-4 md:flex-row md:items-center md:justify-between md:gap-x-6">
        <div className="min-w-0 w-full md:flex-1">
          <h1 className="text-xl font-bold tracking-tight text-ink">
            {title}
          </h1>
          {subtitle &&
          <p className="mt-0.5 max-w-2xl text-[12px] leading-relaxed text-ink-3">
              {subtitle}
            </p>
          }
          {meta && <div className="mt-2">{meta}</div>}
        </div>
        {actions &&
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">{actions}</div>
        }
      </div>
      {tabs && <div className="mt-3">{tabs}</div>}
    </header>);

}

export function PageBody({
  children,
  className



}: {children: React.ReactNode;className?: string;}) {
  return (
    <div className={cx('px-5 py-5 lg:px-7 lg:py-6', className)}>{children}</div>);

}