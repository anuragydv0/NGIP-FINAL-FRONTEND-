import React from 'react';
import { cx } from '../../utils/format';

export function Sparkline({
  data,
  width = 88,
  height = 24,
  tone,
  className,
  area = true







}: {data: number[];width?: number;height?: number;tone?: 'pos' | 'neg' | 'accent';className?: string;area?: boolean;}) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1 || 1);
  const points = data.map((v, i) => [
  i * stepX,
  height - (v - min) / span * (height - 3) - 1.5]
  );
  const d = points.
  map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).
  join(' ');
  const resolved =
  tone ?? (data[data.length - 1] >= data[0] ? 'pos' : 'neg');
  const stroke =
  resolved === 'pos' ? 'var(--pos)' : resolved === 'neg' ? 'var(--neg)' : 'var(--accent)';
  const id = React.useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cx('overflow-visible', className)}
      aria-hidden>
      
      {area &&
      <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.16" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
          d={`${d} L${width},${height} L0,${height} Z`}
          fill={`url(#${id})`} />
        
        </>
      }
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round" />
      
    </svg>);

}