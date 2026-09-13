import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DownloadIcon, StarIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, MetricRow } from '../components/ui/Card';
import { Badge, DataStatus, Delta, RiskBadge, ScoreBar } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Segmented, Tabs } from '../components/ui/Tabs';
import { AreaSeries, BarSeries, Donut } from '../components/charts/Charts';
import { EmptyState } from '../components/ui/States';
import { NewsCard, ResearchCard } from '../components/domain/Cards';
import { instrumentById } from '../data/instruments';
import { news, research } from '../data/content';
import { useOrderTicket } from '../contexts/OrderTicketContext';
import { cx, num, pct } from '../utils/format';

const tabs = [
{ id: 'overview', label: 'Overview' },
{ id: 'chart', label: 'Chart' },
{ id: 'performance', label: 'Performance' },
{ id: 'holdings', label: 'Holdings' },
{ id: 'country', label: 'Country exposure' },
{ id: 'sector', label: 'Sector exposure' },
{ id: 'risk', label: 'Risk' },
{ id: 'fees', label: 'Fees' },
{ id: 'liquidity', label: 'Liquidity' },
{ id: 'news', label: 'News' },
{ id: 'research', label: 'Research' },
{ id: 'documents', label: 'Documents' }];


const ranges = ['1D', '1W', '1M', '6M', '1Y', '5Y'];

export function InstrumentDetail() {
  const { id = 'ngin' } = useParams();
  const instrument = instrumentById(id);
  const [tab, setTab] = React.useState('overview');
  const [range, setRange] = React.useState('1Y');
  const [watching, setWatching] = React.useState(false);
  const orderTicket = useOrderTicket();

  if (!instrument) {
    return (
      <PageBody>
        <Card>
          <EmptyState
            title="Instrument not found"
            description="This instrument is not part of the NGIP coverage universe."
            action={
            <Link to="/app/instruments">
                <Button size="sm" variant="primary">
                  Back to instruments
                </Button>
              </Link>
            } />
          
        </Card>
      </PageBody>);

  }

  const priceSeries = instrument.trend.map((v, i) => ({
    t: `T-${instrument.trend.length - i}`,
    price: v
  }));

  const holdingsList = [
  ['Top financial holding', 9.4],
  ['Second holding', 7.2],
  ['Third holding', 6.1],
  ['Fourth holding', 5.4],
  ['Fifth holding', 4.8],
  ['Remaining 84 holdings', 67.1]];


  const perf = [
  { label: '1M', value: 2.4 },
  { label: '3M', value: 6.1 },
  { label: 'YTD', value: instrument.ytd },
  { label: '1Y', value: instrument.oneYear },
  { label: '3Y', value: instrument.threeYear },
  { label: '5Y', value: instrument.threeYear + 2.4 }];


  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Instruments', to: '/app/instruments' },
        { label: instrument.symbol }]
        }
        title={
        <span className="flex flex-wrap items-baseline gap-3">
            {instrument.name}
            <span className="font-mono text-sm font-semibold text-accent">
              {instrument.symbol}
            </span>
          </span>
        }
        meta={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-baseline gap-3">
              <span className="num text-2xl font-semibold tabular-nums tracking-tight text-ink">
                {num(instrument.price)}
              </span>
              <span
              className={cx(
                'num text-[13px] font-medium tabular-nums',
                instrument.changePct >= 0 ? 'text-pos' : 'text-neg'
              )}>
              
                {instrument.change >= 0 ? '+' : ''}
                {num(instrument.change)}
              </span>
              <Delta value={instrument.changePct} size="sm" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{instrument.type}</Badge>
              <Badge tone="accent">
                <span aria-hidden>{instrument.flag}</span> {instrument.country}
              </Badge>
              <RiskBadge band={instrument.risk} />
              <DataStatus status="DELAYED" detail={`${instrument.currency} · NSE`} />
            </div>
          </div>
        }
        actions={
        <>
            <Button
            icon={
            <StarIcon
              className={cx('h-3.5 w-3.5', watching && 'fill-warn text-warn')} />

            }
            onClick={() => setWatching((v) => !v)}>
            
              {watching ? 'Watching' : 'Watchlist'}
            </Button>
            <Button
            variant="danger"
            onClick={() => orderTicket.open(instrument, 'SELL')}>
            
              Sell
            </Button>
            <Button
            variant="primary"
            onClick={() => orderTicket.open(instrument, 'BUY')}>
            
              Buy
            </Button>
          </>
        }
        tabs={<Tabs tabs={tabs} value={tab} onChange={setTab} />} />
      

      <PageBody className="space-y-5">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <Card>
            <CardHeader
              title="Price chart"
              subtitle={`${instrument.currency} · ${range} view`}
              action={
              <Segmented
                size="xs"
                options={ranges}
                value={range}
                onChange={setRange} />

              } />
            
            <div className="px-3 py-4">
              <AreaSeries
                data={
                range === '1D' ?
                priceSeries.slice(-6) :
                range === '1W' ?
                priceSeries.slice(-10) :
                range === '1M' ?
                priceSeries.slice(-16) :
                priceSeries
                }
                xKey="t"
                series={[{ key: 'price', label: instrument.symbol }]}
                height={320}
                formatter={(v) => num(Number(v))} />
              
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
              Key facts
            </p>
            <div className="mt-3">
              <MetricRow label="Provider" value={instrument.provider} />
              <MetricRow label="Asset type" value={instrument.type} />
              <MetricRow label="Sector" value={instrument.sector} />
              <MetricRow label="Currency" value={instrument.currency} />
              <MetricRow label="AUM" value={`₹${num(instrument.aum, 0)} Cr`} />
              <MetricRow
                label="Expense ratio"
                value={pct(instrument.expenseRatio)} />
              
              <MetricRow label="Liquidity" value={instrument.liquidity} />
              <MetricRow
                label="YTD return"
                value={pct(instrument.ytd, 1)}
                tone={instrument.ytd >= 0 ? 'pos' : 'neg'} />
              
              <MetricRow
                label="1Y return"
                value={pct(instrument.oneYear, 1)}
                tone={instrument.oneYear >= 0 ? 'pos' : 'neg'} />
              
              <MetricRow
                label="3Y annualised"
                value={pct(instrument.threeYear, 1)} />
              
            </div>
            <Link
              to={`/app/countries/${instrument.countryId}`}
              className="mt-4 block rounded-md border border-line bg-subtle px-3 py-2.5 text-xs text-ink-2 transition-colors duration-150 ease-swift hover:border-accent-line hover:bg-accent-soft">
              
              Research the underlying economy →
            </Link>
          </Card>
        </div>

        {(tab === 'overview' || tab === 'performance') &&
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <Card>
              <CardHeader
              title="Performance"
              subtitle="Trailing returns versus NGIP Global 200" />
            
              <div className="px-3 py-4">
                <BarSeries
                data={perf.map((p) => ({
                  label: p.label,
                  instrument: p.value,
                  benchmark: Number((p.value * 0.72).toFixed(1))
                }))}
                xKey="label"
                series={[
                { key: 'instrument', label: instrument.symbol },
                { key: 'benchmark', label: 'Benchmark', color: '#98A2AF' }]
                }
                height={260} />
              
              </div>
            </Card>
            <Card>
              <CardHeader title="Risk profile" />
              <div className="space-y-4 p-5">
                {[
              ['Volatility (1Y)', 62, '14.2%'],
              ['Max drawdown', 48, '-18.4%'],
              ['Tracking error', 22, '0.84%'],
              ['Concentration', 71, 'Top 10 = 41%'],
              ['Liquidity score', instrument.liquidity === 'High' ? 88 : 54, instrument.liquidity]].
              map(([label, score, value]) =>
              <div key={label as string}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-ink-2">{label}</span>
                      <span className="num text-xs font-medium tabular-nums text-ink">
                        {value}
                      </span>
                    </div>
                    <ScoreBar
                  value={Number(score)}
                  tone={Number(score) > 70 ? 'warn' : 'accent'}
                  className="mt-1.5" />
                
                  </div>
              )}
              </div>
            </Card>
          </div>
        }

        {(tab === 'overview' || tab === 'country' || tab === 'sector') &&
        <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader title="Country exposure" />
              <div className="grid items-center gap-4 p-4 sm:grid-cols-[200px_1fr]">
                <Donut
                data={instrument.countryExposure.map((e) => ({
                  name: e.name,
                  value: e.weight
                }))}
                height={196}
                formatter={(v) => `${v}%`} />
              
                <ul className="space-y-2">
                  {instrument.countryExposure.map((e) =>
                <li key={e.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-ink-2">{e.name}</span>
                        <span className="num text-xs font-medium tabular-nums text-ink">
                          {e.weight}%
                        </span>
                      </div>
                      <ScoreBar value={e.weight} className="mt-1" />
                    </li>
                )}
                </ul>
              </div>
            </Card>
            <Card>
              <CardHeader title="Sector exposure" />
              <div className="px-3 py-4">
                <BarSeries
                data={instrument.sectorExposure.map((s) => ({
                  label: s.name,
                  weight: s.weight
                }))}
                xKey="label"
                series={[{ key: 'weight', label: 'Weight %' }]}
                layout="vertical"
                height={200} />
              
              </div>
            </Card>
          </div>
        }

        {tab === 'holdings' &&
        <Card>
            <CardHeader
            title="Underlying holdings"
            subtitle="Disclosed monthly · as of 31 Aug 2026"
            action={
            <Button size="xs" icon={<DownloadIcon className="h-3 w-3" />}>
                  Download full list
                </Button>
            } />
          
            <ul className="divide-y divide-line">
              {holdingsList.map(([name, weight]) =>
            <li
              key={name as string}
              className="flex items-center gap-4 px-5 py-3">
              
                  <span className="w-56 text-[13px] text-ink">{name}</span>
                  <ScoreBar value={Number(weight)} className="flex-1" />
                  <span className="num w-16 text-right text-[13px] font-medium tabular-nums text-ink">
                    {weight}%
                  </span>
                </li>
            )}
            </ul>
          </Card>
        }

        {tab === 'fees' &&
        <Card>
            <CardHeader title="Fees and charges" />
            <div className="grid gap-6 p-5 md:grid-cols-2">
              <div>
                {[
              ['Expense ratio', pct(instrument.expenseRatio)],
              ['Management fee', pct(instrument.expenseRatio * 0.7)],
              ['Administrative', pct(instrument.expenseRatio * 0.2)],
              ['Other costs', pct(instrument.expenseRatio * 0.1)],
              ['Entry load', 'Nil'],
              ['Exit load', 'Nil after 30 days']].
              map(([k, v]) =>
              <MetricRow key={k} label={k} value={v} />
              )}
              </div>
              <div className="rounded-lg border border-line bg-subtle p-4">
                <p className="text-[13px] font-semibold text-ink">
                  Cost of holding ₹1,00,000 for one year
                </p>
                <p className="num mt-2 text-2xl font-semibold tabular-nums text-ink">
                  ₹{(instrument.expenseRatio * 1000).toFixed(0)}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-3">
                  Estimated total cost including expense ratio only. Brokerage,
                  taxes and currency conversion are charged separately and shown
                  on the order ticket.
                </p>
              </div>
            </div>
          </Card>
        }

        {tab === 'liquidity' &&
        <Card>
            <CardHeader title="Liquidity profile" subtitle="Trailing 30 sessions" />
            <div className="grid gap-5 p-5 md:grid-cols-3">
              {[
            ['Average daily volume', '1.24M units'],
            ['Average spread', '0.06%'],
            ['Days to liquidate 1% AUM', '1.8']].
            map(([k, v]) =>
            <div key={k} className="rounded-lg border border-line px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-ink-4">
                    {k}
                  </p>
                  <p className="num mt-1.5 text-lg font-semibold tabular-nums text-ink">
                    {v}
                  </p>
                </div>
            )}
            </div>
          </Card>
        }

        {tab === 'news' &&
        <Card>
            <CardHeader title="Related news" href="/app/news" />
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {news.slice(0, 6).map((n) =>
            <NewsCard key={n.id} item={n} />
            )}
            </div>
          </Card>
        }

        {tab === 'research' &&
        <Card>
            <CardHeader title="Related research" href="/app/research" />
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {research.slice(0, 3).map((r) =>
            <ResearchCard key={r.id} report={r} />
            )}
            </div>
          </Card>
        }

        {tab === 'documents' &&
        <Card>
            <CardHeader title="Documents" />
            <ul className="divide-y divide-line">
              {[
            ['Scheme information document', 'PDF · 2.4 MB', 'Updated 01 Sep 2026'],
            ['Factsheet — August 2026', 'PDF · 640 KB', 'Updated 05 Sep 2026'],
            ['Annual report FY26', 'PDF · 5.1 MB', 'Updated 12 Jul 2026'],
            ['Methodology and index rules', 'PDF · 1.2 MB', 'Updated 18 Apr 2026']].
            map(([name, meta, date]) =>
            <li
              key={name}
              className="flex flex-wrap items-center gap-3 px-5 py-3">
              
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-ink">
                      {name}
                    </span>
                    <span className="block text-[11px] text-ink-4">
                      {meta} · {date}
                    </span>
                  </span>
                  <Button size="xs" icon={<DownloadIcon className="h-3 w-3" />}>
                    Download
                  </Button>
                </li>
            )}
            </ul>
          </Card>
        }
      </PageBody>
    </>);

}