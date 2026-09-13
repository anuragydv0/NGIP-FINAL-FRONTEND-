import React from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { DataStatus, Delta } from '../components/ui/Badge';
import { Segmented, Tabs } from '../components/ui/Tabs';
import { Sparkline } from '../components/ui/Sparkline';
import { Column, DataTable, DensityToggle, Density } from '../components/ui/Table';
import {
  commodities,
  countryMarkets,
  currencies,
  economicIndicators,
  globalIndices,
  marketMovers,
  MarketRow,
  regionalMarkets } from
'../data/markets';
import { cx, num, signedPct } from '../utils/format';

const ranges = ['1D', '1W', '1M', '6M', '1Y'];

const tabs = [
{ id: 'indices', label: 'Global indices' },
{ id: 'countries', label: 'Country markets' },
{ id: 'regions', label: 'Regional markets' },
{ id: 'currencies', label: 'Currencies' },
{ id: 'commodities', label: 'Commodities' },
{ id: 'indicators', label: 'Economic indicators' }];


export function Markets() {
  const [tab, setTab] = React.useState('indices');
  const [range, setRange] = React.useState('1D');
  const [density, setDensity] = React.useState<Density>('comfortable');

  const dataFor: Record<string, MarketRow[]> = {
    indices: globalIndices,
    countries: countryMarkets,
    regions: regionalMarkets,
    currencies,
    commodities
  };

  const columns: Column<MarketRow>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    sortValue: (r) => r.name,
    render: (r) =>
    <span>
          <span className="block font-medium text-ink">{r.name}</span>
          <span className="block text-[11px] text-ink-4">{r.sub}</span>
        </span>

  },
  {
    key: 'value',
    header: 'Value',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.value,
    render: (r) =>
    <span className="num font-medium tabular-nums">{num(r.value)}</span>

  },
  {
    key: 'change',
    header: 'Change',
    align: 'right',
    hideBelow: 'sm',
    sortable: true,
    sortValue: (r) => r.change,
    render: (r) =>
    <span
      className={cx(
        'num tabular-nums',
        r.change >= 0 ? 'text-pos' : 'text-neg'
      )}>
      
          {r.change >= 0 ? '+' : ''}
          {num(r.change)}
        </span>

  },
  {
    key: 'pct',
    header: '%',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.changePct,
    render: (r) => <Delta value={r.changePct} size="xs" />
  },
  {
    key: 'trend',
    header: `Trend · ${range}`,
    align: 'right',
    width: '120px',
    hideBelow: 'md',
    render: (r) =>
    <span className="flex justify-end">
          <Sparkline data={r.trend} width={96} height={24} />
        </span>

  }];


  return (
    <>
      <PageHeader
        title="Global markets"
        subtitle="Indices, country markets, currencies, commodities and macro indicators in one view."
        meta={
        <div className="flex flex-wrap items-center gap-3">
            <DataStatus status="DELAYED" detail="Exchange feeds" />
            <DataStatus status="UPDATED" detail="Indicators · 42 min ago" />
          </div>
        }
        actions={
        <>
            <Segmented options={ranges} value={range} onChange={setRange} />
            <DensityToggle density={density} onChange={setDensity} />
          </>
        }
        tabs={<Tabs tabs={tabs} value={tab} onChange={setTab} />} />
      

      <PageBody className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {globalIndices.slice(0, 4).map((m) =>
          <div
            key={m.name}
            className="rounded-lg border border-line bg-surface px-4 py-3 shadow-card">
            
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ink-4">
                    {m.sub}
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-ink">
                    {m.name}
                  </p>
                </div>
                <Sparkline data={m.trend} width={60} height={22} />
              </div>
              <div className="mt-2.5 flex items-baseline gap-2.5">
                <p className="num text-lg font-semibold tabular-nums tracking-tight text-ink">
                  {num(m.value)}
                </p>
                <Delta value={m.changePct} size="xs" />
              </div>
            </div>
          )}
        </div>

        {tab === 'indicators' ?
        <Card>
            <CardHeader
            title="Global economic indicators"
            subtitle="Aggregated across 24 covered economies" />
          
            <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
              {economicIndicators.map((i) =>
            <div key={i.name} className="px-4 py-4">
                  <p className="text-[11px] uppercase tracking-wider text-ink-4">
                    {i.period}
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-ink">{i.name}</p>
                  <div className="mt-2 flex items-baseline gap-2.5">
                    <p className="num text-xl font-semibold tabular-nums text-ink">
                      {i.value}
                    </p>
                    <Delta value={i.change} suffix="pp" size="xs" />
                  </div>
                </div>
            )}
            </div>
          </Card> :

        <Card>
            <CardHeader
            title={tabs.find((t) => t.id === tab)?.label ?? ''}
            subtitle={`${dataFor[tab].length} instruments · ${range} change`}
            action={<DataStatus status="DELAYED" />} />
          
            <DataTable
            columns={columns}
            rows={dataFor[tab]}
            rowKey={(r) => r.name}
            density={density}
            defaultSort={{ key: 'pct', dir: 'desc' }} />
          
          </Card>
        }

        <div className="grid gap-5 lg:grid-cols-2">
          {[
          ['Top gainers', marketMovers.gainers],
          ['Top losers', marketMovers.losers]].
          map(([title, rows]) =>
          <Card key={title as string}>
              <CardHeader
              title={title as string}
              subtitle="Instruments available on NGIP"
              href="/app/instruments" />
            
              <ul className="divide-y divide-line">
                {(rows as MarketRow[]).map((r) =>
              <li key={r.name}>
                    <Link
                  to={`/app/instruments/${r.sub.toLowerCase()}`}
                  className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 ease-swift hover:bg-subtle">
                  
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] font-semibold text-accent">
                          {r.sub}
                        </span>
                        <span className="block truncate text-xs text-ink-2">
                          {r.name}
                        </span>
                      </span>
                      <Sparkline data={r.trend} width={64} height={20} />
                      <span className="w-24 text-right">
                        <span className="num block text-[13px] font-medium tabular-nums text-ink">
                          {num(r.value)}
                        </span>
                        <span
                      className={cx(
                        'num text-[11px] tabular-nums',
                        r.changePct >= 0 ? 'text-pos' : 'text-neg'
                      )}>
                      
                          {signedPct(r.changePct)}
                        </span>
                      </span>
                    </Link>
                  </li>
              )}
              </ul>
            </Card>
          )}
        </div>
      </PageBody>
    </>);

}