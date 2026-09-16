import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlusIcon, SlidersHorizontalIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, StatCard } from '../components/ui/Card';
import { Badge, DataStatus, Delta, RiskBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Segmented } from '../components/ui/Tabs';
import { Sparkline } from '../components/ui/Sparkline';
import { AreaSeries, Donut, palette } from '../components/charts/Charts';
import { GlobalMap, MapMode } from '../components/charts/GlobalMap';
import { DataTable, Column } from '../components/ui/Table';
import { NewsCard } from '../components/domain/Cards';
import { LiveCell } from '../contexts/LiveDataContext';
import { countries, regionAggregates } from '../data/countries';
import { globalGrowthIndex } from '../data/markets';
import {
  countryAllocation,
  orders,
  performanceSeries,
  portfolioSummary,
  regionAllocation,
  sectorAllocation } from
'../data/portfolio';
import { calendarEvents, news, watchlists } from '../data/content';
import { instruments } from '../data/instruments';
import { Country } from '../types';
import { cx, inr, num, pct, signedInr, signedPct } from '../utils/format';

const mapModes: MapMode[] = ['Growth', 'CGI', 'Risk', 'GDP', 'Inflation', 'FDI'];

export function Dashboard() {
  const [mode, setMode] = React.useState<MapMode>('Growth');
  const [range, setRange] = React.useState('1Y');
  const [allocView, setAllocView] = React.useState('Country');

  const topCountries = React.useMemo(
    () => [...countries].sort((a, b) => b.cgi - a.cgi).slice(0, 8),
    []
  );

  const columns: Column<Country>[] = [
  {
    key: 'rank',
    header: '#',
    width: '44px',
    render: (_r, i) =>
    <span className="num text-xs tabular-nums text-ink-4">{i + 1}</span>

  },
  {
    key: 'country',
    header: 'Country',
    render: (c) =>
    <Link
      to={`/app/countries/${c.id}`}
      className="flex items-center gap-2 font-medium text-ink hover:text-accent">
      
          <span aria-hidden>{c.flag}</span>
          <span className="truncate">{c.name}</span>
        </Link>

  },
  {
    key: 'cgi',
    header: 'CGI',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.cgi,
    render: (c) =>
    <span className="num font-semibold tabular-nums">{c.cgi.toFixed(1)}</span>

  },
  {
    key: 'growth',
    header: 'Growth',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.gdpGrowth,
    render: (c) =>
    <span className="num tabular-nums">{pct(c.gdpGrowth, 1)}</span>

  },
  {
    key: 'risk',
    header: 'Risk',
    align: 'right',
    hideBelow: 'md',
    render: (c) => <RiskBadge band={c.riskBand} />
  },
  {
    key: 'trend',
    header: 'Trend',
    align: 'right',
    width: '96px',
    hideBelow: 'lg',
    render: (c) =>
    <span className="flex justify-end">
          <Sparkline data={c.trend} width={72} height={20} />
        </span>

  }];


  const allocationData =
  allocView === 'Country' ?
  countryAllocation :
  allocView === 'Region' ?
  regionAllocation :
  sectorAllocation;

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Your global overview — portfolio, economies and market movement."
        meta={
        <div className="flex flex-wrap items-center gap-3">
            <DataStatus status="LIVE" detail="Market data" />
            <DataStatus status="UPDATED" detail="Economic data · 18 min ago" />
            <Badge tone="info">Simulated environment</Badge>
          </div>
        }
        actions={
        <>
            <Link to="/app/screener">
              <Button icon={<SlidersHorizontalIcon className="h-3.5 w-3.5" />}>
                Run a screen
              </Button>
            </Link>
            <Link to="/app/funds">
              <Button variant="primary" icon={<PlusIcon className="h-3.5 w-3.5" />}>
                Add funds
              </Button>
            </Link>
          </>
        } />
      

      <PageBody className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Portfolio value"
            value={inr(portfolioSummary.totalValue)}
            delta={portfolioSummary.dayPnlPct}
            sub="vs yesterday"
            emphasis />
          
          <StatCard
            label="Today's P&L"
            value={signedInr(portfolioSummary.dayPnl)}
            delta={portfolioSummary.dayPnlPct}
            tone="pos" />
          
          <StatCard
            label="Total return"
            value={signedInr(portfolioSummary.totalReturn)}
            delta={portfolioSummary.totalReturnPct}
            tone="pos" />
          
          <StatCard
            label="Invested capital"
            value={inr(portfolioSummary.invested)}
            sub={`XIRR ${pct(portfolioSummary.xirr)}`} />
          
          <StatCard
            label="Available funds"
            value={inr(portfolioSummary.availableFunds)}
            sub={`${inr(portfolioSummary.pending)} pending`} />
          
        </div>

        <Card>
          <CardHeader
            title="Global market overview"
            subtitle="Growth index by development stage and region"
            href="/app/markets"
            hrefLabel="Markets" />
          
          <div className="grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4 xl:grid-cols-6">
            {[
            {
              label: 'Global Growth Index',
              value: globalGrowthIndex.value,
              delta: globalGrowthIndex.delta,
              strong: true
            },
            {
              label: 'Developed markets',
              value: globalGrowthIndex.developed.value,
              delta: globalGrowthIndex.developed.delta
            },
            {
              label: 'Emerging markets',
              value: globalGrowthIndex.emerging.value,
              delta: globalGrowthIndex.emerging.delta
            },
            ...regionAggregates.
            filter((r) =>
            ['Asia Pacific', 'Europe', 'Americas'].includes(r.region)
            ).
            map((r) => ({
              label: r.region,
              value: r.cgi,
              delta: r.growth - 2.4
            }))].
            map((m) =>
            <div
              key={m.label}
              className={cx(
                'border-b border-line px-4 py-3.5 last:border-b-0 lg:border-b-0',
                m.strong && 'bg-subtle'
              )}>
              
                <p className="truncate text-[11px] uppercase tracking-wider text-ink-4">
                  {m.label}
                </p>
                <p className="num mt-1.5 text-lg font-semibold tabular-nums tracking-tight text-ink">
                  {m.value.toFixed(1)}
                </p>
                <Delta value={m.delta} suffix="" size="xs" />
              </div>
            )}
          </div>
        </Card>

        <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
          <Card>
            <CardHeader
              title="Global economic map"
              subtitle="Click any economy to open its country intelligence page"
              action={
              <Segmented
                size="xs"
                options={mapModes}
                value={mode}
                onChange={(v) => setMode(v as MapMode)}
                className="hidden md:inline-flex" />

              } />
            
            <div className="p-2 md:p-3">
              <div className="md:hidden mb-2">
                <Segmented
                  size="xs"
                  options={mapModes}
                  value={mode}
                  onChange={(v) => setMode(v as MapMode)} />
                
              </div>
              <GlobalMap mode={mode} height={352} />
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader
              title="Top countries by CGI"
              subtitle="Country Growth Index, revised 12 Sep 2026"
              href="/app/countries" />
            
            <DataTable
              columns={columns}
              rows={topCountries}
              rowKey={(c) => c.id}
              density="compact"
              defaultSort={{ key: 'cgi', dir: 'desc' }} />
            
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
          <Card>
            <CardHeader
              title="Portfolio performance"
              subtitle="NGIP portfolio vs NGIP Global 200 benchmark"
              action={
              <Segmented
                size="xs"
                options={['1M', '6M', '1Y', '3Y', 'MAX']}
                value={range}
                onChange={setRange} />

              }
              href="/app/portfolio"
              hrefLabel="Portfolio" />
            
            <div className="px-3 py-4">
              <div className="mb-3 flex flex-wrap items-end gap-x-8 gap-y-2 px-2">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ink-4">
                    Current value
                  </p>
                  <p className="num mt-1 text-2xl font-semibold tabular-nums tracking-tight text-ink">
                    {inr(portfolioSummary.totalValue)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ink-4">
                    Total return
                  </p>
                  <p className="num mt-1 flex items-baseline gap-2 text-base font-semibold tabular-nums text-pos">
                    {signedInr(portfolioSummary.totalReturn)}
                    <span className="text-xs">
                      {signedPct(portfolioSummary.totalReturnPct)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-ink-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 rounded bg-accent" /> Portfolio
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 rounded bg-ink-4" /> Benchmark
                  </span>
                </div>
              </div>
              <AreaSeries
                data={
                range === '1M' ?
                performanceSeries.slice(-2) :
                range === '6M' ?
                performanceSeries.slice(-7) :
                range === '1Y' ?
                performanceSeries.slice(-13) :
                performanceSeries
                }
                xKey="date"
                series={[
                { key: 'portfolio', label: 'Portfolio' },
                { key: 'benchmark', label: 'Benchmark', color: 'var(--ink-4)' }]
                }
                height={264}
                yTickFormatter={(v) => `${(v / 100000).toFixed(1)}L`}
                formatter={(v) => inr(Number(v), 0)} />
              
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader
              title="Allocation"
              action={
              <Segmented
                size="xs"
                options={['Country', 'Region', 'Sector']}
                value={allocView}
                onChange={setAllocView} />

              }
              href="/app/analytics"
              hrefLabel="Analytics" />
            
            <div className="grid flex-1 items-center gap-2 p-4 sm:grid-cols-[180px_1fr] xl:grid-cols-1">
              <Donut
                data={allocationData.map((a) => ({
                  name: a.name,
                  value: a.weight
                }))}
                height={186}
                formatter={(v) => `${Number(v).toFixed(1)}%`} />
              
              <ul className="space-y-1.5">
                {allocationData.slice(0, 6).map((a, i) =>
                <li key={a.name} className="flex items-center gap-2">
                    <span
                    className="h-2 w-2 shrink-0 rounded-sm"
                    style={{ background: palette[i % palette.length] }} />
                  
                    <span className="truncate text-xs text-ink-2">{a.name}</span>
                    <span className="num ml-auto text-xs font-medium tabular-nums text-ink">
                      {a.weight.toFixed(1)}%
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="flex flex-col">
            <CardHeader title="Recent orders" href="/app/orders" dense />
            <ul className="flex-1 divide-y divide-line">
              {orders.slice(0, 5).map((o) =>
              <li key={o.id}>
                  <Link
                  to={`/app/orders/${o.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 ease-swift hover:bg-subtle">
                  
                    <span
                    className={cx(
                      'rounded px-1.5 py-0.5 text-[10px] font-bold',
                      o.side === 'BUY' ?
                      'bg-pos-soft text-pos' :
                      'bg-neg-soft text-neg'
                    )}>
                    
                      {o.side}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-mono text-[11px] font-semibold text-ink">
                        {o.symbol}
                      </span>
                      <span className="num block text-[11px] tabular-nums text-ink-4">
                        {num(o.quantity, 0)} @ {num(o.price)}
                      </span>
                    </span>
                    <Badge
                    tone={
                    o.status === 'Executed' ?
                    'pos' :
                    o.status === 'Rejected' ?
                    'neg' :
                    o.status === 'Cancelled' ?
                    'neutral' :
                    'warn'
                    }>
                    
                      {o.status}
                    </Badge>
                  </Link>
                </li>
              )}
            </ul>
          </Card>

          <Card className="flex flex-col">
            <CardHeader title="Economic calendar" href="/app/calendar" dense />
            <ul className="flex-1 divide-y divide-line">
              {calendarEvents.slice(0, 5).map((e) =>
              <li key={e.id} className="flex gap-3 px-4 py-2.5">
                  <span className="num w-10 shrink-0 text-[11px] tabular-nums text-ink-4">
                    {e.time}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-ink">
                      <span aria-hidden>{e.flag}</span> {e.event}
                    </span>
                    <span className="num mt-0.5 block text-[11px] tabular-nums text-ink-4">
                      Exp {e.expected} · Prev {e.previous}
                    </span>
                  </span>
                  <span
                  className={cx(
                    'mt-1 h-1.5 w-1.5 shrink-0 rounded-full',
                    e.importance === 'High' ?
                    'bg-neg' :
                    e.importance === 'Medium' ?
                    'bg-warn' :
                    'bg-ink-4'
                  )}
                  title={`${e.importance} importance`} />
                
                </li>
              )}
            </ul>
          </Card>

          <Card className="flex flex-col">
            <CardHeader title="Market news" href="/app/news" dense />
            <div className="flex-1 px-4">
              {news.slice(0, 4).map((n) =>
              <NewsCard key={n.id} item={n} variant="compact" />
              )}
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader
              title="Watchlist · My Instruments"
              href="/app/watchlists"
              dense />
            
            <ul className="flex-1 divide-y divide-line">
              {watchlists[1].items.map((id) => {
                const ins = instruments.find((x) => x.id === id);
                if (!ins) return null;
                return (
                  <li key={id}>
                    <Link
                      to={`/app/instruments/${ins.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 ease-swift hover:bg-subtle">
                      
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] font-semibold text-accent">
                          {ins.symbol}
                        </span>
                        <span className="block truncate text-[11px] text-ink-4">
                          {ins.country}
                        </span>
                      </span>
                      <Sparkline data={ins.trend} width={48} height={18} />
                      <span className="w-20 text-right">
                        <span className="block text-xs">
                          <LiveCell type="instrument" id={ins.id} fallback={ins.price} />
                        </span>
                        <Delta value={ins.changePct} size="xs" showIcon={false} />
                      </span>
                    </Link>
                  </li>);

              })}
            </ul>
            <div className="border-t border-line px-4 py-2">
              <Link
                to="/app/instruments"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:text-accent-hover">
                
                Discover instruments
                <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        </div>
      </PageBody>
    </>);

}