import React from 'react';
import { Link } from 'react-router-dom';
import { LockIcon, ShieldCheckIcon, ServerIcon } from 'lucide-react';
import { Logo } from '../../components/shell/Logo';

export function AuthLayout({
  title,
  subtitle,
  children,
  footer





}: {title: string;subtitle?: string;children: React.ReactNode;footer?: React.ReactNode;}) {
  return (
    <div className="grid min-h-full w-full lg:grid-cols-[1fr_minmax(0,520px)]">
      <aside className="hidden flex-col justify-between bg-[#0B1420] px-12 py-10 lg:flex">
        <Link to="/" aria-label="NGIP home">
          <Logo tone="light" subtitle="Nation Growth Investment Platform" />
        </Link>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Global economic intelligence
          </p>
          <h2 className="mt-4 max-w-md text-[30px] font-semibold leading-tight tracking-[-0.015em] text-white">
            Understand the world. Invest with context.
          </h2>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/55">
            24 covered economies, 186 tracked indicators, and a published
            Country Growth Index methodology — connected directly to the
            instruments that provide exposure.
          </p>
          <dl className="mt-9 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[
            ['Economies', '24'],
            ['Indicators', '186'],
            ['Instruments', '1,240']].
            map(([k, v]) =>
            <div key={k}>
                <dt className="text-[10px] uppercase tracking-wider text-white/40">
                  {k}
                </dt>
                <dd className="num mt-1 text-xl font-semibold tabular-nums text-white">
                  {v}
                </dd>
              </div>
            )}
          </dl>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/45">
          {[
          [ShieldCheckIcon, 'SEBI registered · INZ000842'],
          [LockIcon, '256-bit TLS encryption'],
          [ServerIcon, 'Data residency in India']].
          map(([Icon, label]) => {
            const I = Icon as React.ComponentType<{className?: string;}>;
            return (
              <li key={label as string} className="flex items-center gap-1.5">
                <I className="h-3 w-3" />
                {label}
              </li>);

          })}
        </ul>
      </aside>

      <main className="flex flex-col justify-center bg-surface px-5 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <Link to="/" aria-label="NGIP home">
              <Logo subtitle="Nation Growth Investment Platform" />
            </Link>
          </div>
          <h1 className="mt-8 text-[22px] font-semibold tracking-tight text-ink lg:mt-0">
            {title}
          </h1>
          {subtitle &&
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-3">
              {subtitle}
            </p>
          }
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-7">{footer}</div>}
        </div>
      </main>
    </div>);

}

export function GoogleButton({ label }: {label: string;}) {
  return (
    <button
      type="button"
      className="flex h-10 w-full items-center justify-center gap-2.5 rounded-md border border-line-strong bg-surface text-[13px] font-medium text-ink transition-colors duration-150 ease-swift hover:bg-subtle">
      
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z" />
        
        <path
          fill="#34A853"
          d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1a7 7 0 0 1-6.6-4.8H1.4v3.1A11.9 11.9 0 0 0 12 24Z" />
        
        <path
          fill="#FBBC05"
          d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a11.9 11.9 0 0 0 0 10.7l4-3Z" />
        
        <path
          fill="#EA4335"
          d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A11.5 11.5 0 0 0 12 0 11.9 11.9 0 0 0 1.4 6.7l4 3.1A7 7 0 0 1 12 4.8Z" />
        
      </svg>
      {label}
    </button>);

}

export function Divider({ label }: {label: string;}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-line" />
      <span className="text-[11px] uppercase tracking-wider text-ink-4">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>);

}