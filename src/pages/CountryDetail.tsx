import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRightLeftIcon,
  BellPlusIcon,
  FileTextIcon,
  StarIcon } from
'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, MetricRow } from '../components/ui/Card';
import { Badge, DataStatus, Delta, RiskBadge, ScoreBar } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Segmented, Tabs } from '../components/ui/Tabs';
import { AreaSeries, BarSeries, Donut, LineSeries, RadarScore } from '../components/charts/Charts';
import { EmptyState } from '../components/ui/States';
import { InstrumentCard, NewsCard, ResearchCard } from '../components/domain/Cards';
import { countryById } from '../data/countries';
import { instruments } from '../data/instruments';
import { news, research } from '../data/content';
import { useOrderTicket } from '../contexts/OrderTicketContext';
import { cx, num, pct } from '../utils/format';

const tabs = [
{ id: 'overview', label: 'Overview' },
{ id: 'economy', label: 'Economic indicators' },
{ id: 'structure', label: 'Sectors & demographics' },
{ id: 'external', label: 'Trade & external' },
{ id: 'risks', label: 'Risks & scenarios' },
{ id: 'research', label: 'News & research' },
{ id: 'instruments', label: 'Instruments' }];


const ranges = ['1Y', '5Y', '10Y', '20Y', 'MAX'];

export function CountryDetail() {
  const { id = 'in' } = useParams();
  const country = countryById(id);
  const [tab, setTab] = React.useState('overview');
  const [range, setRange] = React.useState('10Y');
  const [watching, setWatching] = React.useState(false);
  const orderTicket = useOrderTicket();

  if (!country) {
    return (
      <PageBody>
        <Card>
          <EmptyState
            title="Country not covered"
            description="This economy is not part of the current NGIP coverage universe."
            action={
            <Link to="/app/countries">
                <Button size="sm" variant="primary">
                  Back to countries
                </Button>
              </Link>
            } />
          
        </Card>
      </PageBody>);

  }

  const history =
  range === '1Y' ?
  country.cgiHistory.slice(-2) :
  range === '5Y' ?
  country.cgiHistory.slice(-5) :
  range === '10Y' ?
  country.cgiHistory.slice(-10) :
  country.cgiHistory;

  const relatedInstruments = instruments.filter(
    (i) =>
    i.countryId === country.id ||
    i.countryExposure.some((e) => e.name === country.name)
  );
  const relatedNews = news.filter((n) => n.country === country.name);
  const relatedResearch = research.filter((r) => r.country === country.name);

  const sectors = [
  { name: 'Services', value: 53 },
  { name: 'Manufacturing', value: 18 },
  { name: 'Agriculture', value: 16 },
  { name: 'Construction', value: 8 },
  { name: 'Mining & utilities', value: 5 }];


  const demographics = [
  { label: '0–14', value: 24.2 },
  { label: '15–24', value: 17.1 },
  { label: '25–44', value: 29.4 },
  { label: '45–64', value: 20.1 },
  { label: '65+', value: 9.2 }];


  const trade = country.cgiHistory.slice(-8).map((h) => ({
    year: h.year,
    exports: Number((h.cgi * 6.4).toFixed(0)),
    imports: Number((h.cgi * 7.1).toFixed(0))
  }));

  const scenarios = [
  {
    id: 'bull',
    label: 'Bull case',
    tone: 'pos' as const,
    growth: country.gdpGrowth + 1.6,
    cgi: country.cgi + 4.2,
    body: 'Capex cycle broadens beyond public investment, private manufacturing capacity utilisation stays above trend and external demand recovers faster than consensus.'
  },
  {
    id: 'base',
    label: 'Base case',
    tone: 'info' as const,
    growth: country.gdpGrowth,
    cgi: country.cgi,
    body: 'Growth holds near trend with gradual disinflation. Fiscal consolidation proceeds slowly and the investment cycle continues at the current pace.'
  },
  {
    id: 'bear',
    label: 'Bear case',
    tone: 'neg' as const,
    growth: country.gdpGrowth - 2.1,
    cgi: country.cgi - 5.6,
    body: 'External demand weakens, commodity prices re-accelerate and monetary policy stays restrictive for longer, delaying private investment decisions.'
  }];


  const risks = [
  ['External demand', 'Elevated', 'Export concentration in a small number of partner economies.'],
  ['Fiscal', country.debtToGdp > 90 ? 'High' : 'Moderate', `Debt at ${pct(country.debtToGdp, 1)} of GDP with rising interest servicing costs.`],
  ['Inflation', country.inflation > 8 ? 'High' : 'Low', `Headline CPI at ${pct(country.inflation, 1)} against the policy target band.`],
  ['Currency', 'Moderate', 'Reserve adequacy is sufficient but capital-flow sensitivity remains.'],
  ['Policy execution', 'Moderate', 'Implementation lags between announced and deployed capital.']];


  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Countries', to: '/app/countries' },
        { label: country.name }]
        }
        title={
        <span className="flex items-center gap-3">
            <span className="text-2xl leading-none" aria-hidden>
              {country.flag}
            </span>
            {country.name}
            <span className="font-mono text-sm font-medium text-ink-4">
              {country.code}
            </span>
          </span>
        }
        subtitle={country.summary}
        meta={
        <div className="flex flex-wrap items-center gap-2.5">
            <Badge tone="accent">{country.region}</Badge>
            <Badge>{country.development}</Badge>
            <Badge>{country.income} income</Badge>
            <RiskBadge band={country.riskBand} />
            <DataStatus status="UPDATED" detail="18 min ago" />
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
            
              {watching ? 'In watchlist' : 'Add to watchlist'}
            </Button>
            <Button icon={<BellPlusIcon className="h-3.5 w-3.5" />}>
              Create alert
            </Button>
            <Link to={`/app/compare?ids=${country.id},vn`}>
              <Button icon={<ArrowRightLeftIcon className="h-3.5 w-3.5" />}>
                Compare
              </Button>
            </Link>
            <Link to="/app/instruments">
              <Button variant="primary">View instruments</Button>
            </Link>
          </>
        }
        tabs={<Tabs tabs={tabs} value={tab} onChange={setTab} />} />
      

      <PageBody className="space-y-5">
        <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
              Country Growth Index
            </p>
            <div className="mt-3 flex items-end gap-3">
              <p className="num text-[44px] font-semibold leading-none tabular-nums tracking-tight text-ink">
                {country.cgi.toFixed(1)}
              </p>
              <Delta value={country.cgiDelta} suffix="" size="md" />
            </div>
            <ScoreBar value={country.cgi} className="mt-4" />
            <p className="mt-2 text-[11px] text-ink-4">
              Rank {country.cgi > 85 ? 2 : country.cgi > 75 ? 7 : 14} of 24
              covered economies · methodology v4.2
            </p>
            <div className="mt-5 border-t border-line pt-2">
              <MetricRow label="GDP" value={`$${country.gdp.toFixed(2)}T`} />
              <MetricRow
                label="GDP growth"
                value={pct(country.gdpGrowth, 1)}
                tone={country.gdpGrowth >= 3 ? 'pos' : undefined} />
              
              <MetricRow
                label="Inflation"
                value={pct(country.inflation, 1)}
                tone={country.inflation > 8 ? 'neg' : undefined} />
              
              <MetricRow label="Debt / GDP" value={pct(country.debtToGdp, 1)} />
              <MetricRow label="FDI inflow" value={`$${country.fdi.toFixed(1)}B`} />
              <MetricRow
                label="Population"
                value={`${num(country.population, 0)}M`} />
              
              <MetricRow label="Interest rate" value={pct(country.interestRate)} />
              <MetricRow label="Unemployment" value={pct(country.unemployment, 1)} />
              <MetricRow label="Currency" value={country.currency} />
              <MetricRow label="Capital" value={country.capital} />
            </div>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardHeader
                title="Country Growth Index history"
                subtitle="Indexed score with GDP growth overlay"
                action={
                <Segmented
                  size="xs"
                  options={ranges}
                  value={range}
                  onChange={setRange} />

                } />
              
              <div className="px-3 py-4">
                <AreaSeries
                  data={history}
                  xKey="year"
                  series={[
                  { key: 'cgi', label: 'CGI' },
                  { key: 'growth', label: 'GDP growth %', color: '#1F5FA8' }]
                  }
                  height={268} />
                
              </div>
            </Card>

            {tab === 'overview' &&
            <Card>
                <CardHeader
                title="CGI breakdown"
                subtitle="Ten pillars, each scored 0–100 and weighted by methodology v4.2" />
              
                <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {country.pillars.map((p) =>
                  <div key={p.label}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-xs text-ink-2">{p.label}</span>
                          <span className="flex items-baseline gap-2">
                            <span className="num text-xs font-semibold tabular-nums text-ink">
                              {p.score}
                            </span>
                            <Delta
                          value={p.delta}
                          suffix=""
                          size="xs"
                          showIcon={false} />
                        
                          </span>
                        </div>
                        <ScoreBar
                      value={p.score}
                      tone={
                      p.score > 80 ?
                      'pos' :
                      p.score > 60 ?
                      'accent' :
                      p.score > 45 ?
                      'info' :
                      'warn'
                      }
                      className="mt-1.5" />
                    
                      </div>
                  )}
                  </div>
                  <div className="border-line lg:border-l lg:pl-5">
                    <RadarScore
                    data={country.pillars.map((p) => ({
                      label: p.label.split(' ')[0],
                      score: p.score
                    }))}
                    series={[{ key: 'score', label: country.name }]}
                    height={300} />
                  
                  </div>
                </div>
              </Card>
            }
          </div>
        </div>

        {tab === 'overview' &&
        <div className="grid gap-5 lg:grid-cols-3">
            <Card>
              <CardHeader title="Investment instruments" href="/app/instruments" dense />
              <div className="space-y-3 p-4">
                {relatedInstruments.slice(0, 2).map((i) =>
              <InstrumentCard key={i.id} instrument={i} onTrade={(x) => orderTicket.open(x)} />
              )}
                {relatedInstruments.length === 0 &&
              <EmptyState
                compact
                title="No direct instruments yet"
                description="Consider regional or thematic funds with exposure to this economy." />

              }
              </div>
            </Card>
            <Card>
              <CardHeader title="Latest news" href="/app/news" dense />
              <div className="px-4">
                {(relatedNews.length ? relatedNews : news).slice(0, 5).map((n) =>
              <NewsCard key={n.id} item={n} variant="compact" />
              )}
              </div>
            </Card>
            <Card>
              <CardHeader title="Research" href="/app/research" dense />
              <div className="space-y-3 p-4">
                {(relatedResearch.length ? relatedResearch : research).
              slice(0, 2).
              map((r) =>
              <ResearchCard key={r.id} report={r} />
              )}
              </div>
            </Card>
          </div>
        }

        {tab === 'economy' &&
        <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader
              title="Economic indicators"
              subtitle="Latest published values with prior period comparison" />
            
              <div className="p-5">
                {[
              ['Nominal GDP', `$${country.gdp.toFixed(2)}T`, 'World Bank · FY26E'],
              ['Real GDP growth', pct(country.gdpGrowth, 1), 'National accounts · Q2 2026'],
              ['CPI inflation', pct(country.inflation, 1), 'Statistics office · Aug 2026'],
              ['Policy interest rate', pct(country.interestRate), 'Central bank · Sep 2026'],
              ['Unemployment rate', pct(country.unemployment, 1), 'Labour survey · Q2 2026'],
              ['Government debt / GDP', pct(country.debtToGdp, 1), 'IMF · FY26E'],
              ['FDI net inflow', `$${country.fdi.toFixed(1)}B`, 'UNCTAD · FY25'],
              ['Population growth', pct(country.populationGrowth), 'UN · 2026']].
              map(([label, value, source]) =>
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-0">
                
                    <span>
                      <span className="block text-[13px] text-ink">{label}</span>
                      <span className="block text-[11px] text-ink-4">{source}</span>
                    </span>
                    <span className="num text-[13px] font-semibold tabular-nums text-ink">
                      {value}
                    </span>
                  </div>
              )}
              </div>
            </Card>
            <Card>
              <CardHeader
              title="Historical trends"
              subtitle="CGI and real GDP growth, 2015–2026" />
            
              <div className="px-3 py-4">
                <LineSeries
                data={country.cgiHistory}
                xKey="year"
                series={[
                { key: 'cgi', label: 'CGI' },
                { key: 'growth', label: 'GDP growth %', color: '#A9700D' }]
                }
                height={300}
                showLegend />
              
              </div>
            </Card>
          </div>
        }

        {tab === 'structure' &&
        <div className="grid gap-5 lg:grid-cols-3">
            <Card>
              <CardHeader title="Sector composition" subtitle="Share of gross value added" />
              <div className="p-4">
                <Donut data={sectors} height={200} formatter={(v) => `${v}%`} />
                <ul className="mt-3 space-y-1.5">
                  {sectors.map((s) =>
                <li
                  key={s.name}
                  className="flex items-center justify-between text-xs">
                  
                      <span className="text-ink-2">{s.name}</span>
                      <span className="num font-medium tabular-nums text-ink">
                        {s.value}%
                      </span>
                    </li>
                )}
                </ul>
              </div>
            </Card>
            <Card>
              <CardHeader title="Demographics" subtitle="Population by age band, %" />
              <div className="px-3 py-4">
                <BarSeries
                data={demographics}
                xKey="label"
                series={[{ key: 'value', label: 'Share of population' }]}
                height={252} />
              
                <div className="mt-2 grid grid-cols-2 gap-3 px-2">
                  <MetricRow
                  label="Population"
                  value={`${num(country.population, 0)}M`} />
                
                  <MetricRow
                  label="Growth"
                  value={pct(country.populationGrowth)} />
                
                </div>
              </div>
            </Card>
            <Card>
              <CardHeader title="Infrastructure & innovation" />
              <div className="p-5">
                {[
              ['Infrastructure score', country.pillars[3].score],
              ['Innovation score', country.pillars[5].score],
              ['Productivity', country.pillars[1].score],
              ['Governance', country.pillars[9].score],
              ['Employment', country.pillars[4].score]].
              map(([label, score]) =>
              <div key={label as string} className="mb-3.5 last:mb-0">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-ink-2">{label}</span>
                      <span className="num text-xs font-semibold tabular-nums text-ink">
                        {score}
                      </span>
                    </div>
                    <ScoreBar value={Number(score)} className="mt-1.5" />
                  </div>
              )}
              </div>
            </Card>
          </div>
        }

        {tab === 'external' &&
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <CardHeader
              title="Trade balance"
              subtitle="Goods exports and imports, $B" />
            
              <div className="px-3 py-4">
                <BarSeries
                data={trade}
                xKey="year"
                series={[
                { key: 'exports', label: 'Exports' },
                { key: 'imports', label: 'Imports', color: '#98A2AF' }]
                }
                height={280} />
              
              </div>
            </Card>
            <Card>
              <CardHeader title="External sector & fiscal position" />
              <div className="p-5">
                <MetricRow label="Current account / GDP" value="-1.4%" tone="neg" />
                <MetricRow label="FX reserves" value="$642B" />
                <MetricRow label="Import cover" value="11.2 months" />
                <MetricRow label="External debt / GDP" value="18.6%" />
                <MetricRow label="Fiscal deficit / GDP" value="-5.1%" tone="neg" />
                <MetricRow label="Primary balance" value="-0.8%" />
                <MetricRow label="Tax revenue / GDP" value="18.2%" />
                <MetricRow label="Sovereign rating" value="BBB / Stable" />
              </div>
            </Card>
          </div>
        }

        {tab === 'risks' &&
        <div className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-3">
              {scenarios.map((s) =>
            <Card key={s.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <Badge tone={s.tone}>{s.label}</Badge>
                    <span className="num text-xs tabular-nums text-ink-4">
                      2027–2031
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-4">
                        GDP growth
                      </p>
                      <p className="num mt-1 text-xl font-semibold tabular-nums text-ink">
                        {pct(s.growth, 1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-4">
                        CGI
                      </p>
                      <p className="num mt-1 text-xl font-semibold tabular-nums text-ink">
                        {s.cgi.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-ink-3">{s.body}</p>
                </Card>
            )}
            </div>
            <Card>
              <CardHeader
              title="Risk register"
              subtitle="Assessed by the NGIP country research team"
              href="/app/risk"
              hrefLabel="Portfolio risk" />
            
              <ul className="divide-y divide-line">
                {risks.map(([factor, band, note]) =>
              <li
                key={factor}
                className="flex flex-wrap items-center gap-3 px-5 py-3">
                
                    <span className="w-40 text-[13px] font-medium text-ink">
                      {factor}
                    </span>
                    <RiskBadge band={band} />
                    <span className="min-w-[200px] flex-1 text-xs text-ink-3">
                      {note}
                    </span>
                  </li>
              )}
              </ul>
            </Card>
          </div>
        }

        {tab === 'research' &&
        <div className="space-y-5">
            <Card>
              <CardHeader title={`${country.name} news`} href="/app/news" />
              <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {(relatedNews.length ? relatedNews : news).slice(0, 6).map((n) =>
              <NewsCard key={n.id} item={n} />
              )}
              </div>
            </Card>
            <Card>
              <CardHeader title="Research coverage" href="/app/research" />
              <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {(relatedResearch.length ? relatedResearch : research).
              slice(0, 3).
              map((r) =>
              <ResearchCard key={r.id} report={r} />
              )}
              </div>
            </Card>
          </div>
        }

        {tab === 'instruments' &&
        <Card>
            <CardHeader
            title={`Instruments with ${country.name} exposure`}
            subtitle="ETFs, funds, bonds and baskets available on NGIP"
            action={
            <Link
              to="/app/instruments"
              className="text-xs font-medium text-accent hover:text-accent-hover">
              
                  Full instrument discovery
                </Link>
            } />
          
            <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
              {relatedInstruments.map((i) =>
            <InstrumentCard
              key={i.id}
              instrument={i}
              onTrade={(x) => orderTicket.open(x)} />

            )}
              {relatedInstruments.length === 0 &&
            <div className="col-span-full">
                  <EmptyState
                icon={<FileTextIcon className="h-4 w-4" />}
                title="No instruments cover this economy directly"
                description="Regional and thematic funds may still provide partial exposure."
                action={
                <Link to="/app/instruments">
                        <Button size="sm" variant="primary">
                          Browse all instruments
                        </Button>
                      </Link>
                } />
              
                </div>
            }
            </div>
          </Card>
        }
      </PageBody>
    </>);

}