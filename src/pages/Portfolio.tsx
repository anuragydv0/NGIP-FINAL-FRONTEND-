import React from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon, PlusIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, StatCard } from '../components/ui/Card';
import { DataStatus, Delta } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Segmented } from '../components/ui/Tabs';
import { AreaSeries, Donut, palette } from '../components/charts/Charts';
import { Column, DataTable } from '../components/ui/Table';
import { Sparkline } from '../components/ui/Sparkline';
import {
  assetAllocation,
  countryAllocation,
  currencyAllocation,
  holdings,
  performanceSeries,
  portfolioSummary,
  regionAllocation,
  sectorAllocation } from
'../data/portfolio';
import { instruments } from '../data/instruments';
import { Holding } from '../types';
import { cx, inr, num, pct, signedInr, signedPct } from '../utils/format';

const allocationViews = {
  Country: countryAllocation,
  Region: regionAllocation,
  Sector: sectorAllocation,
  Currency: currencyAllocation,
  Asset: assetAllocation
};

export function Portfolio() {
  const [range, setRange] = React.useState('1Y');

  const columns: Column<Holding>[] = [
  {
    key: 'instrument',
    header: 'Instrument',
    sortable: true,
    sortValue: (h) => h.name,
    render: (h) =>
    <Link to={`/app/instruments/${h.instrumentId}`} className="group block">
          <span className="font-mono text-[11px] font-semibold text-accent">
            {h.symbol}
          </span>
          <span className="block truncate font-medium text-ink transition-colors duration-150 ease-swift group-hover:text-accent">
            {h.name}
          </span>
        </Link>

  },
  {
    key: 'country',
    header: 'Country',
    hideBelow: 'md',
    render: (h) =>
    <span className="whitespace-nowrap text-ink-2">
          <span aria-hidden>{h.flag}</span> {h.country}
        </span>

  },
  {
    key: 'value',
    header: 'Current value',
    align: 'right',
    sortable: true,
    sortValue: (h) => h.value,
    render: (h) =>
    <span className="num font-medium tabular-nums">{inr(h.value, 0)}</span>

  },
  {
    key: 'pnl',
    header: 'P&L',
    align: 'right',
    sortable: true,
    sortValue: (h) => h.pnl,
    render: (h) =>
    <span
      className={cx(
        'num tabular-nums font-medium',
        h.pnl >= 0 ? 'text-pos' : 'text-neg'
      )}>
      
          {signedInr(h.pnl, 0)}
        </span>

  },
  {
    key: 'return',
    header: 'Return',
    align: 'right',
    sortable: true,
    sortValue: (h) => h.returnPct,
    render: (h) => <Delta value={h.returnPct} size="xs" />
  },
  {
    key: 'weight',
    header: 'Weight',
    align: 'right',
    hideBelow: 'lg',
    sortable: true,
    sortValue: (h) => h.weight,
    render: (h) =>
    <span className="num tabular-nums text-ink-2">{pct(h.weight, 1)}</span>

  },
  {
    key: 'trend',
    header: 'Trend',
    align: 'right',
    width: '96px',
    hideBelow: 'xl',
    render: (h) => {
      const ins = instruments.find((i) => i.id === h.instrumentId);
      return (
        <span className="flex justify-end">
            {ins && <Sparkline data={ins.trend} width={72} height={20} />}
          </span>);

    }
  }];


  return (
    <>
      <PageHeader
        title="Portfolio"
        subtitle="Global exposure, performance and attribution across every economy you hold."
        meta={<DataStatus status="LIVE" detail="Valued at 15:24 IST" />}
        actions={
        <>
            <Link to="/app/reports">
              <Button icon={<DownloadIcon className="h-3.5 w-3.5" />}>
                Portfolio report
              </Button>
            </Link>
            <Link to="/app/instruments">
              <Button variant="primary" icon={<PlusIcon className="h-3.5 w-3.5" />}>
                Add exposure
              </Button>
            </Link>
          </>
        } />
      

      <PageBody className="space-y-5">
        <Card className="p-5 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                Total portfolio value
              </p>
              <p className="num mt-2 text-[40px] font-semibold leading-none tabular-nums tracking-tight text-ink">
                {inr(portfolioSummary.totalValue)}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="num flex items-baseline gap-2 text-[13px] tabular-nums text-ink-3">
                  Today
                  <span className="font-semibold text-pos">
                    {signedInr(portfolioSummary.dayPnl)}
                  </span>
                  <Delta value={portfolioSummary.dayPnlPct} size="xs" />
                </span>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
                {[
                ['Total return', signedInr(portfolioSummary.totalReturn, 0), signedPct(portfolioSummary.totalReturnPct)],
                ['Invested capital', inr(portfolioSummary.invested, 0), ''],
                ['CAGR', pct(portfolioSummary.cagr), ''],
                ['XIRR', pct(portfolioSummary.xirr), '']].
                map(([k, v, sub]) =>
                <div key={k}>
                    <dt className="text-[11px] uppercase tracking-wider text-ink-4">
                      {k}
                    </dt>
                    <dd className="num mt-1 text-[17px] font-semibold tabular-nums text-ink">
                      {v}
                    </dd>
                    {sub &&
                  <dd className="num text-[11px] tabular-nums text-pos">{sub}</dd>
                  }
                  </div>
                )}
              </dl>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                  Performance vs NGIP Global 200
                </p>
                <Segmented
                  size="xs"
                  options={['1M', '6M', '1Y', '3Y', 'MAX']}
                  value={range}
                  onChange={setRange} />
                
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
                { key: 'benchmark', label: 'Benchmark', color: '#98A2AF' }]
                }
                height={288}
                yTickFormatter={(v) => `${(v / 100000).toFixed(1)}L`}
                formatter={(v) => inr(Number(v), 0)} />
              
            </div>
          </div>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Volatility (1Y)"
            value={pct(portfolioSummary.volatility, 1)}
            sub="Annualised" />
          
          <StatCard
            label="Sharpe ratio"
            value={portfolioSummary.sharpe.toFixed(2)}
            sub="Risk-free 6.5%" />
          
          <StatCard
            label="Maximum drawdown"
            value={pct(portfolioSummary.maxDrawdown, 1)}
            tone="neg"
            sub="Mar 2025" />
          
          <StatCard
            label="Beta to benchmark"
            value={portfolioSummary.beta.toFixed(2)}
            sub="NGIP Global 200" />
          
        </div>

        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
          {Object.entries(allocationViews).slice(0, 4).map(([label, data]) =>
          <Card key={label}>
              <CardHeader title={`${label} allocation`} dense />
              <div className="p-4">
                <Donut
                data={data.map((d) => ({ name: d.name, value: d.weight }))}
                height={168}
                innerRadius={44}
                outerRadius={64}
                formatter={(v) => `${Number(v).toFixed(1)}%`} />
              
                <ul className="mt-3 space-y-1.5">
                  {data.slice(0, 5).map((d, i) =>
                <li key={d.name} className="flex items-center gap-2">
                      <span
                    className="h-2 w-2 shrink-0 rounded-sm"
                    style={{ background: palette[i % palette.length] }} />
                  
                      <span className="truncate text-xs text-ink-2">{d.name}</span>
                      <span className="num ml-auto text-xs font-medium tabular-nums text-ink">
                        {d.weight.toFixed(1)}%
                      </span>
                    </li>
                )}
                </ul>
              </div>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader
            title="Holdings"
            subtitle={`${holdings.length} positions across ${countryAllocation.length} economies`}
            href="/app/holdings"
            hrefLabel="Full holdings view" />
          
          <DataTable
            columns={columns}
            rows={holdings}
            rowKey={(h) => h.id}
            defaultSort={{ key: 'value', dir: 'desc' }} />
          
          <div className="flex items-center justify-between border-t border-line bg-subtle px-4 py-2.5">
            <span className="text-xs font-medium text-ink-2">Total</span>
            <span className="num text-[13px] font-semibold tabular-nums text-ink">
              {inr(holdings.reduce((a, h) => a + h.value, 0), 0)} ·{' '}
              {num(holdings.reduce((a, h) => a + h.weight, 0), 1)}%
            </span>
          </div>
        </Card>
      </PageBody>
    </>);

}