import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis } from
'recharts';

export const palette = [
'var(--accent)',
'var(--info)',
'var(--warn)',
'var(--ink-2)',
'var(--pos)',
'var(--neg)',
'var(--ink-3)',
'var(--accent-hover)'];


const axis = {
  stroke: 'var(--ink-4)',
  fontSize: 11,
  tickLine: false,
  axisLine: false
};

function TooltipBox({
  active,
  payload,
  label,
  formatter





}: {active?: boolean;payload?: {name?: string;value?: number | string;color?: string;}[];label?: string | number;formatter?: (v: number | string, name?: string) => string;}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-surface px-3 py-2 shadow-pop">
      {label !== undefined &&
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
          {label}
        </p>
      }
      <div className="space-y-0.5">
        {payload.map((p, i) =>
        <div key={i} className="flex items-center gap-2 text-xs">
            <span
            className="h-2 w-2 rounded-sm"
            style={{ background: p.color }} />
          
            <span className="text-ink-3">{p.name}</span>
            <span className="num ml-auto font-medium tabular-nums text-ink">
              {formatter && p.value !== undefined ?
            formatter(p.value, p.name) :
            p.value}
            </span>
          </div>
        )}
      </div>
    </div>);

}

export function AreaSeries({
  data,
  xKey,
  series,
  height = 260,
  formatter,
  yWidth = 52,
  yTickFormatter








}: {data: Record<string, string | number>[];xKey: string;series: {key: string;label: string;color?: string;}[];height?: number;formatter?: (v: number | string, name?: string) => string;yWidth?: number;yTickFormatter?: (v: number) => string;}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          {series.map((s, i) =>
          <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop
              offset="0%"
              stopColor={s.color ?? palette[i]}
              stopOpacity={0.18} />
            
              <stop
              offset="100%"
              stopColor={s.color ?? palette[i]}
              stopOpacity={0} />
            
            </linearGradient>
          )}
        </defs>
        <CartesianGrid stroke="var(--line)" vertical={false} />
        <XAxis dataKey={xKey} {...axis} minTickGap={24} />
        <YAxis
          {...axis}
          width={yWidth}
          tickFormatter={yTickFormatter}
          domain={['auto', 'auto']} />
        
        <Tooltip content={<TooltipBox formatter={formatter} />} />
        {series.map((s, i) =>
        <Area
          key={s.key}
          type="monotone"
          dataKey={s.key}
          name={s.label}
          stroke={s.color ?? palette[i]}
          strokeWidth={1.8}
          fill={`url(#grad-${s.key})`}
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0 }}
          animationDuration={280} />

        )}
      </AreaChart>
    </ResponsiveContainer>);

}

export function LineSeries({
  data,
  xKey,
  series,
  height = 240,
  formatter,
  showLegend,
  yTickFormatter








}: {data: Record<string, string | number>[];xKey: string;series: {key: string;label: string;color?: string;dashed?: boolean;}[];height?: number;formatter?: (v: number | string, name?: string) => string;showLegend?: boolean;yTickFormatter?: (v: number) => string;}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke="var(--line)" vertical={false} />
        <XAxis dataKey={xKey} {...axis} minTickGap={20} />
        <YAxis {...axis} width={48} tickFormatter={yTickFormatter} domain={['auto', 'auto']} />
        <Tooltip content={<TooltipBox formatter={formatter} />} />
        {showLegend &&
        <Legend
          iconType="plainline"
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />

        }
        {series.map((s, i) =>
        <Line
          key={s.key}
          type="monotone"
          dataKey={s.key}
          name={s.label}
          stroke={s.color ?? palette[i]}
          strokeWidth={1.8}
          strokeDasharray={s.dashed ? '4 3' : undefined}
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0 }}
          animationDuration={280} />

        )}
      </LineChart>
    </ResponsiveContainer>);

}

export function BarSeries({
  data,
  xKey,
  series,
  height = 240,
  stacked,
  layout = 'horizontal',
  formatter








}: {data: Record<string, string | number>[];xKey: string;series: {key: string;label: string;color?: string;}[];height?: number;stacked?: boolean;layout?: 'horizontal' | 'vertical';formatter?: (v: number | string, name?: string) => string;}) {
  const vertical = layout === 'vertical';
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={layout}
        margin={{ top: 8, right: 12, bottom: 0, left: vertical ? 8 : 0 }}
        barCategoryGap={vertical ? '22%' : '32%'}>
        
        <CartesianGrid stroke="var(--line)" vertical={vertical} horizontal={!vertical} />
        {vertical ?
        <>
            <XAxis type="number" {...axis} />
            <YAxis type="category" dataKey={xKey} {...axis} width={104} />
          </> :

        <>
            <XAxis dataKey={xKey} {...axis} minTickGap={12} />
            <YAxis {...axis} width={48} />
          </>
        }
        <Tooltip
          cursor={{ fill: 'rgba(11,20,32,0.03)' }}
          content={<TooltipBox formatter={formatter} />} />
        
        {series.map((s, i) =>
        <Bar
          key={s.key}
          dataKey={s.key}
          name={s.label}
          stackId={stacked ? 'a' : undefined}
          fill={s.color ?? palette[i]}
          radius={stacked ? 0 : vertical ? [0, 2, 2, 0] : [2, 2, 0, 0]}
          animationDuration={280} />

        )}
      </BarChart>
    </ResponsiveContainer>);

}

export function Donut({
  data,
  height = 200,
  innerRadius = 52,
  outerRadius = 76,
  formatter






}: {data: {name: string;value: number;}[];height?: number;innerRadius?: number;outerRadius?: number;formatter?: (v: number | string, name?: string) => string;}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={1.5}
          stroke="var(--surface)"
          strokeWidth={1.5}
          animationDuration={320}>
          
          {data.map((_, i) =>
          <Cell key={i} fill={palette[i % palette.length]} />
          )}
        </Pie>
        <Tooltip content={<TooltipBox formatter={formatter} />} />
      </PieChart>
    </ResponsiveContainer>);

}

export function RadarScore({
  data,
  series,
  height = 300




}: {data: {label: string;[k: string]: string | number;}[];series: {key: string;label: string;color?: string;}[];height?: number;}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="var(--line-strong)" />
        <PolarAngleAxis
          dataKey="label"
          tick={{ fill: 'var(--ink-3)', fontSize: 10 }} />
        
        <PolarRadiusAxis
          domain={[0, 100]}
          tick={{ fill: 'var(--ink-4)', fontSize: 9 }}
          axisLine={false} />
        
        <Tooltip content={<TooltipBox />} />
        {series.map((s, i) =>
        <Radar
          key={s.key}
          dataKey={s.key}
          name={s.label}
          stroke={s.color ?? palette[i]}
          fill={s.color ?? palette[i]}
          fillOpacity={0.14}
          strokeWidth={1.6}
          animationDuration={320} />

        )}
      </RadarChart>
    </ResponsiveContainer>);

}

export function ScatterPlot({
  data,
  xLabel,
  yLabel,
  height = 300





}: {data: {x: number;y: number;z?: number;name: string;}[];xLabel: string;yLabel: string;height?: number;}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 12, right: 16, bottom: 20, left: 0 }}>
        <CartesianGrid stroke="var(--line)" />
        <XAxis
          type="number"
          dataKey="x"
          name={xLabel}
          {...axis}
          label={{
            value: xLabel,
            position: 'insideBottom',
            offset: -12,
            fill: 'var(--ink-3)',
            fontSize: 11
          }} />
        
        <YAxis
          type="number"
          dataKey="y"
          name={yLabel}
          {...axis}
          width={44}
          label={{
            value: yLabel,
            angle: -90,
            position: 'insideLeft',
            fill: 'var(--ink-3)',
            fontSize: 11
          }} />
        
        <ZAxis type="number" dataKey="z" range={[60, 420]} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as {
              name: string;
              x: number;
              y: number;
            };
            return (
              <div className="rounded-md border border-line bg-surface px-3 py-2 shadow-pop">
                <p className="text-xs font-semibold text-ink">{p.name}</p>
                <p className="num mt-1 text-[11px] tabular-nums text-ink-3">
                  {xLabel}: {p.x} · {yLabel}: {p.y}
                </p>
              </div>);

          }} />
        
        <Scatter data={data} fill="var(--accent)" fillOpacity={0.65} animationDuration={320} />
      </ScatterChart>
    </ResponsiveContainer>);

}

export function Heatmap({
  rows,
  columns,
  values,
  format = (v: number) => v.toFixed(2)





}: {rows: string[];columns: string[];values: number[][];format?: (v: number) => string;}) {
  const color = (v: number) => {
    const t = Math.max(-1, Math.min(1, v));
    if (t >= 0) {
      return `rgba(11, 110, 99, ${0.08 + t * 0.62})`;
    }
    return `rgba(194, 55, 44, ${0.08 + Math.abs(t) * 0.62})`;
  };
  return (
    <div className="ngip-scroll overflow-x-auto">
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-surface px-2 py-1.5" />
            {columns.map((c) =>
            <th
              key={c}
              className="px-2 py-1.5 text-center font-semibold uppercase tracking-wide text-ink-3">
              
                {c}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) =>
          <tr key={r}>
              <th className="sticky left-0 z-10 whitespace-nowrap bg-surface px-2 py-1.5 text-left font-medium text-ink-2">
                {r}
              </th>
              {columns.map((c, j) =>
            <td key={c} className="p-0.5">
                  <div
                className="num flex h-8 items-center justify-center rounded tabular-nums text-ink"
                style={{ background: color(values[i][j]) }}
                title={`${r} / ${c}: ${format(values[i][j])}`}>
                
                    {format(values[i][j])}
                  </div>
                </td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}