import React from 'react';
import { cx } from '../../utils/format';

export function LogoMark({
  size = 28,
  className,
  tone = 'accent'




}: {size?: number;className?: string;tone?: 'accent' | 'light' | 'dark';}) {
  const bg = tone === 'light' ? '#FFFFFF' : tone === 'dark' ? '#0B1420' : '#0B6E63';
  const fg = tone === 'light' ? '#0B6E63' : '#FFFFFF';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cx('shrink-0', className)}
      role="img"
      aria-label="NGIP">
      
      <rect width="32" height="32" rx="7" fill={bg} />
      <path
        d="M7 22.5V13.5"
        stroke={fg}
        strokeWidth="2.2"
        strokeLinecap="round" />
      
      <path
        d="M12.5 22.5V9.5"
        stroke={fg}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55" />
      
      <path
        d="M18 22.5V16.5"
        stroke={fg}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.8" />
      
      <path
        d="M7 13.5L12.5 9.5L18 16.5L25 7.5"
        stroke={fg}
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none" />
      
      <circle cx="25" cy="22.5" r="2.6" stroke={fg} strokeWidth="1.6" fill="none" />
      <path d="M22.4 22.5h5.2" stroke={fg} strokeWidth="1.1" />
    </svg>);

}

export function Logo({
  showWordmark = true,
  tone = 'accent',
  size = 28,
  subtitle





}: {showWordmark?: boolean;tone?: 'accent' | 'light' | 'dark';size?: number;subtitle?: string;}) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} tone={tone} />
      {showWordmark &&
      <span className="leading-none">
          <span
          className={cx(
            'block text-[15px] font-bold tracking-[0.14em]',
            tone === 'light' ? 'text-white' : 'text-ink'
          )}>
          
            NGIP
          </span>
          {subtitle &&
        <span
          className={cx(
            'mt-1 block text-[9px] font-medium uppercase tracking-[0.13em]',
            tone === 'light' ? 'text-white/60' : 'text-ink-4'
          )}>
          
              {subtitle}
            </span>
        }
        </span>
      }
    </span>);

}