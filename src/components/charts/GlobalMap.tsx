import React from 'react';
import { useNavigate } from 'react-router-dom';
import { countries } from '../../data/countries';
import { Country } from '../../types';
import { cx } from '../../utils/format';

export type MapMode = 'Growth' | 'CGI' | 'Risk' | 'GDP' | 'Inflation' | 'FDI';

const coords: Record<string, [number, number]> = {
  in: [78.9, 21.0],
  vn: [106.0, 16.0],
  id: [113.9, -2.5],
  us: [-98.5, 39.8],
  jp: [138.2, 36.2],
  de: [10.4, 51.2],
  br: [-51.9, -12.8],
  mx: [-102.5, 23.6],
  gb: [-2.0, 54.0],
  ae: [54.0, 24.0],
  sa: [45.0, 24.0],
  cn: [104.2, 35.9],
  kr: [127.8, 36.5],
  pl: [19.1, 52.0],
  ng: [8.7, 9.1],
  za: [24.7, -29.0],
  ke: [37.9, 0.02],
  fr: [2.2, 46.6],
  au: [133.8, -25.3],
  ca: [-106.3, 56.1],
  ph: [122.0, 12.9],
  tr: [35.2, 39.0],
  sg: [103.8, 1.35],
  cl: [-71.5, -35.7]
};

function metricOf(c: Country, mode: MapMode): number {
  switch (mode) {
    case 'Growth':
      return c.gdpGrowth;
    case 'CGI':
      return c.cgi;
    case 'Risk':
      return c.riskScore;
    case 'GDP':
      return c.gdp;
    case 'Inflation':
      return c.inflation;
    case 'FDI':
      return c.fdi;
  }
}

function formatMetric(c: Country, mode: MapMode): string {
  switch (mode) {
    case 'Growth':
      return `${c.gdpGrowth.toFixed(1)}%`;
    case 'CGI':
      return c.cgi.toFixed(1);
    case 'Risk':
      return `${c.riskScore}`;
    case 'GDP':
      return `$${c.gdp.toFixed(2)}T`;
    case 'Inflation':
      return `${c.inflation.toFixed(1)}%`;
    case 'FDI':
      return `$${c.fdi.toFixed(1)}B`;
  }
}

const W = 1000;
const H = 460;

function project(lng: number, lat: number): [number, number] {
  return [(lng + 180) / 360 * W, (90 - lat) / 180 * H];
}

export function GlobalMap({
  mode,
  height = 380,
  onSelect,
  highlight





}: {mode: MapMode;height?: number;onSelect?: (id: string) => void;highlight?: string[];}) {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState<string | null>(null);

  const values = countries.map((c) => metricOf(c, mode));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const inverted = mode === 'Risk' || mode === 'Inflation';

  const fill = (c: Country) => {
    const t = (metricOf(c, mode) - min) / (max - min || 1);
    const score = inverted ? 1 - t : t;
    if (score > 0.66) return { bg: 'var(--accent)', ring: 'var(--accent)', opacity: 0.85 };
    if (score > 0.33) return { bg: 'var(--info)', ring: 'var(--info)', opacity: 0.7 };
    return { bg: 'var(--warn)', ring: 'var(--warn)', opacity: 0.7 };
  };

  const radius = (c: Country) => {
    const t = (metricOf(c, mode) - min) / (max - min || 1);
    return 7 + t * 15;
  };

  const hovered = countries.find((c) => c.id === hover);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ height }}
        className="w-full"
        role="img"
        aria-label={`World economic map by ${mode}`}>
        
        <rect x="0" y="0" width={W} height={H} fill="var(--subtle)" />
        {Array.from({ length: 13 }).map((_, i) =>
        <line
          key={`v${i}`}
          x1={i * W / 12}
          y1={0}
          x2={i * W / 12}
          y2={H}
          stroke="var(--line)"
          strokeWidth={1} />

        )}
        {Array.from({ length: 7 }).map((_, i) =>
        <line
          key={`h${i}`}
          x1={0}
          y1={i * H / 6}
          x2={W}
          y2={i * H / 6}
          stroke="var(--line)"
          strokeWidth={1} />

        )}
        <line
          x1={0}
          y1={H / 2}
          x2={W}
          y2={H / 2}
          stroke="var(--line-strong)"
          strokeWidth={1}
          strokeDasharray="6 5" />
        
        {[
        ['AMERICAS', -95, 5],
        ['EUROPE', 15, 62],
        ['AFRICA', 20, -12],
        ['MIDDLE EAST', 48, 36],
        ['ASIA PACIFIC', 120, 48]].
        map(([label, lng, lat]) => {
          const [x, y] = project(Number(lng), Number(lat));
          return (
            <text
              key={label as string}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize={11}
              letterSpacing="1.6"
              fill="var(--ink-4)"
              fontWeight={600}>
              
              {label}
            </text>);

        })}

        {countries.map((c) => {
          const [x, y] = project(...coords[c.id]);
          const f = fill(c);
          const r = radius(c);
          const dim = highlight?.length ? !highlight.includes(c.id) : false;
          const isHover = hover === c.id;
          return (
            <g
              key={c.id}
              transform={`translate(${x},${y})`}
              opacity={dim ? 0.25 : 1}
              className="cursor-pointer"
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() =>
              onSelect ? onSelect(c.id) : navigate(`/app/countries/${c.id}`)
              }>
              
              <circle
                r={r}
                fill={f.bg}
                fillOpacity={f.opacity}
                stroke={f.ring}
                strokeWidth={isHover ? 2 : 1}
                style={{
                  transition: 'r 200ms cubic-bezier(0.23,1,0.32,1)'
                }} />
              
              <text
                y={r + 11}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={600}
                fill="var(--ink-2)">
                
                {c.code}
              </text>
            </g>);

        })}
      </svg>

      {hovered &&
      <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-line bg-surface px-3.5 py-2.5 shadow-pop">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <span aria-hidden>{hovered.flag}</span>
            {hovered.name}
          </p>
          <p className="num mt-1 text-lg font-semibold tabular-nums tracking-tight text-ink">
            {formatMetric(hovered, mode)}
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-4">
            {mode} · {hovered.region}
          </p>
        </div>
      }

      <div className="absolute bottom-2 right-3 flex items-center gap-3 rounded-md border border-line bg-surface/90 px-2.5 py-1.5 text-[10px] font-medium text-ink-3 backdrop-blur">
        <span className="uppercase tracking-wider">{inverted ? 'Lower is better' : 'Higher is better'}</span>
        {[
        ['var(--warn)', 'Low'],
        ['var(--info)', 'Mid'],
        ['var(--accent)', 'High']].
        map(([c, l]) =>
        <span key={l} className="flex items-center gap-1">
            <span
            className={cx('h-2 w-2 rounded-full')}
            style={{ background: c }} />
          
            {l}
          </span>
        )}
      </div>
    </div>);

}