import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusIcon, XIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge, Delta, RiskBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Input';
import { Segmented } from '../components/ui/Tabs';
import {
  BarSeries,
  LineSeries,
  palette,
  RadarScore,
  ScatterPlot } from
'../components/charts/Charts';
import { countries } from '../data/countries';
import { cx, num, pct } from '../utils/format';

const metricRows: {
  label: string;
  get: (c: (typeof countries)[number]) => number;
  format: (v: number) => string;
  betterHigh: boolean;
}[] = [
{ label: 'Country Growth Index', get: (c) => c.cgi, format: (v) => v.toFixed(1), betterHigh: true },
{ label: 'GDP (USD trillion)', get: (c) => c.gdp, format: (v) => `$${v.toFixed(2)}T`, betterHigh: true },
{ label: 'Real GDP growth', get: (c) => c.gdpGrowth, format: (v) => pct(v, 1), betterHigh: true },
{ label: 'CPI inflation', get: (c) => c.inflation, format: (v) => pct(v, 1), betterHigh: false },
{ label: 'Government debt / GDP', get: (c) => c.debtToGdp, format: (v) => pct(v, 1), betterHigh: false },
{ label: 'FDI net inflow', get: (c) => c.fdi, format: (v) => `$${v.toFixed(1)}B`, betterHigh: true },
{ label: 'Population (millions)', get: (c) => c.population, format: (v) => num(v, 0), betterHigh: true },
{ label: 'Productivity score', get: (c) => c.pillars[1].score, format: (v) => v.toFixed(0), betterHigh: true },
{ label: 'Innovation score', get: (c) => c.pillars[5].score, format: (v) => v.toFixed(0), betterHigh: true },
{ label: 'Infrastructure score', get: (c) => c.pillars[3].score, format: (v) => v.toFixed(0), betterHigh: true },
{ label: 'Risk score', get: (c) => c.riskScore, format: (v) => v.toFixed(0), betterHigh: false }];


export function CountryComparison() {
  const [params] = useSearchParams();
  const initial = (params.get('ids') ?? 'in,vn,id,us,jp').
  split(',').
  filter((id) => countries.some((c) => c.id === id)).
  slice(0, 6);
  const [ids, setIds] = React.useState<string[]>(
    initial.length ? initial : ['in', 'vn', 'id']
  );
  const [chart, setChart] = React.useState('Line');

  const selected = ids.
  map((id) => countries.find((c) => c.id === id)!).
  filter(Boolean);

  const addable = countries.filter((c) => !ids.includes(c.id));

  const historyData = countries[0].cgiHistory.map((h, i) => {
    const row: Record<string, string | number> = { year: h.year };
    selected.forEach((c) => {
      row[c.id] = c.cgiHistory[i].cgi;
    });
    return row;
  });

  const barData = selected.map((c) => ({
    label: c.name,
    growth: c.gdpGrowth,
    inflation: c.inflation
  }));

  const radarData = countries[0].pillars.map((p, i) => {
    const row: Record<string, string | number> = {
      label: p.label.split(' ')[0]
    };
    selected.forEach((c) => {
      row[c.id] = c.pillars[i].score;
    });
    return row;
  });

  const scatter = selected.map((c) => ({
    x: c.riskScore,
    y: c.gdpGrowth,
    z: c.gdp * 10,
    name: c.name
  }));

  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Countries', to: '/app/countries' },
        { label: 'Comparison' }]
        }
        title="Country comparison"
        subtitle="Compare two to six economies across growth, stability and structural indicators."
        actions={
        <>
            <Link to="/app/screener">
              <Button>Open screener</Button>
            </Link>
            <Link to="/app/strategy">
              <Button variant="primary">Build a strategy</Button>
            </Link>
          </>
        } />
      

      <PageBody className="space-y-5">
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            {selected.map((c, i) =>
            <span
              key={c.id}
              className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 shadow-card">
              
                <span
                className="h-2 w-2 rounded-sm"
                style={{ background: palette[i % palette.length] }} />
              
                <span aria-hidden>{c.flag}</span>
                <span className="text-[13px] font-medium text-ink">{c.name}</span>
                <span className="num text-[11px] tabular-nums text-ink-4">
                  CGI {c.cgi.toFixed(1)}
                </span>
                <button
                onClick={() => setIds((s) => s.filter((x) => x !== c.id))}
                aria-label={`Remove ${c.name}`}
                className="text-ink-4 transition-colors duration-150 ease-swift hover:text-neg">
                
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </span>
            )}
            {ids.length < 6 &&
            <div className="flex items-center gap-2">
                <PlusIcon className="h-3.5 w-3.5 text-ink-4" />
                <Select
                value=""
                onChange={(e) =>
                e.target.value && setIds((s) => [...s, e.target.value])
                }
                className="h-8 w-44 text-xs"
                aria-label="Add country">
                
                  <option value="">Add country…</option>
                  {addable.map((c) =>
                <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                )}
                </Select>
              </div>
            }
            <Badge className="ml-auto">{selected.length} of 6 selected</Badge>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Comparison table"
            subtitle="Best value in each row is highlighted" />
          
          <div className="ngip-scroll overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-subtle">
                <tr className="border-b border-line">
                  <th className="sticky left-0 z-10 bg-subtle px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                    Indicator
                  </th>
                  {selected.map((c) =>
                  <th
                    key={c.id}
                    className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                    
                      <span aria-hidden>{c.flag}</span> {c.name}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {metricRows.map((row) => {
                  const values = selected.map((c) => row.get(c));
                  const best = row.betterHigh ?
                  Math.max(...values) :
                  Math.min(...values);
                  return (
                    <tr key={row.label} className="hover:bg-subtle">
                      <th className="sticky left-0 z-10 bg-surface px-4 py-2.5 text-left text-[13px] font-medium text-ink-2">
                        {row.label}
                      </th>
                      {selected.map((c) => {
                        const v = row.get(c);
                        return (
                          <td
                            key={c.id}
                            className={cx(
                              'num px-4 py-2.5 text-right text-[13px] tabular-nums',
                              v === best ?
                              'bg-accent-soft/60 font-semibold text-accent' :
                              'text-ink'
                            )}>
                            
                            {row.format(v)}
                          </td>);

                      })}
                    </tr>);

                })}
                <tr>
                  <th className="sticky left-0 z-10 bg-surface px-4 py-2.5 text-left text-[13px] font-medium text-ink-2">
                    Risk band
                  </th>
                  {selected.map((c) =>
                  <td key={c.id} className="px-4 py-2.5 text-right">
                      <RiskBadge band={c.riskBand} />
                    </td>
                  )}
                </tr>
                <tr>
                  <th className="sticky left-0 z-10 bg-surface px-4 py-2.5 text-left text-[13px] font-medium text-ink-2">
                    CGI change
                  </th>
                  {selected.map((c) =>
                  <td key={c.id} className="px-4 py-2.5 text-right">
                      <span className="flex justify-end">
                        <Delta value={c.cgiDelta} suffix="" size="xs" />
                      </span>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader
              title="Comparative visualisation"
              subtitle={
              chart === 'Line' ?
              'Country Growth Index, 2015–2026' :
              chart === 'Bar' ?
              'GDP growth and inflation, latest' :
              'CGI pillar profile'
              }
              action={
              <Segmented
                size="xs"
                options={['Line', 'Bar', 'Radar']}
                value={chart}
                onChange={setChart} />

              } />
            
            <div className="px-3 py-4">
              {chart === 'Line' &&
              <LineSeries
                data={historyData}
                xKey="year"
                series={selected.map((c, i) => ({
                  key: c.id,
                  label: c.name,
                  color: palette[i % palette.length]
                }))}
                height={320}
                showLegend />

              }
              {chart === 'Bar' &&
              <BarSeries
                data={barData}
                xKey="label"
                series={[
                { key: 'growth', label: 'GDP growth %' },
                { key: 'inflation', label: 'Inflation %', color: '#A9700D' }]
                }
                height={320} />

              }
              {chart === 'Radar' &&
              <RadarScore
                data={radarData}
                series={selected.map((c, i) => ({
                  key: c.id,
                  label: c.name,
                  color: palette[i % palette.length]
                }))}
                height={320} />

              }
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Risk versus growth"
              subtitle="Bubble size represents nominal GDP" />
            
            <div className="px-3 py-4">
              <ScatterPlot
                data={scatter}
                xLabel="Risk score"
                yLabel="GDP growth %"
                height={320} />
              
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Where to get exposure"
            subtitle="Instruments covering the selected economies"
            href="/app/instruments" />
          
          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {selected.map((c) =>
            <Link
              key={c.id}
              to={`/app/countries/${c.id}`}
              className="rounded-lg border border-line p-4 transition-[border-color,background-color] duration-150 ease-swift hover:border-accent-line hover:bg-accent-soft/40">
              
                <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <span aria-hidden>{c.flag}</span> {c.name}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-3">
                  {c.summary}
                </p>
                <p className="mt-3 text-[11px] font-medium text-accent">
                  Open country intelligence →
                </p>
              </Link>
            )}
          </div>
        </Card>
      </PageBody>
    </>);

}