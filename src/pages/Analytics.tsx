import React from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, StatCard } from '../components/ui/Card';
import { DataStatus } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Segmented } from '../components/ui/Tabs';
import {
  AreaSeries,
  BarSeries,
  Donut,
  LineSeries,
  palette } from
'../components/charts/Charts';
import {
  countryAllocation,
  currencyAllocation,
  drawdownSeries,
  performanceSeries,
  portfolioSummary,
  sectorAllocation } from
'../data/portfolio';
import { inr, pct, signedPct } from '../utils/format';

export function Analytics() {
  const [range, setRange] = React.useState('1Y');
  const [attribution, setAttribution] = React.useState('Country');

  const contribution = (
  attribution === 'Country' ?
  countryAllocation :
  attribution === 'Sector' ?
  sectorAllocation :
  currencyAllocation).
  map((a, i) => ({
    label: a.name,
    contribution: Number((a.weight * (1.4 + i % 4 * 0.6) / 10).toFixed(2))
  }));

  const slice =
  range === '6M' ?
  performanceSeries.slice(-7) :
  range === '1Y' ?
  performanceSeries.slice(-13) :
  performanceSeries;

  const indexed = slice.map((p, i) => ({
    date: p.date,
    portfolio: Number((p.portfolio / slice[0].portfolio * 100).toFixed(2)),
    benchmark: Number((p.benchmark / slice[0].benchmark * 100).toFixed(2))
  }));

  return (
    <>
      <PageHeader
        title="Portfolio analytics"
        subtitle="Performance, attribution and benchmark comparison across your global exposure."
        meta={<DataStatus status="UPDATED" detail="Valued 15:24 IST" />}
        actions={
        <>
            <Segmented
            options={['6M', '1Y', 'MAX']}
            value={range}
            onChange={setRange} />
          
            <Link to="/app/risk">
              <Button variant="primary">Risk analysis</Button>
            </Link>
          </>
        } />
      

      <PageBody className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <StatCard
            label="Total return"
            value={signedPct(portfolioSummary.totalReturnPct)}
            sub={inr(portfolioSummary.totalReturn, 0)}
            tone="pos" />
          
          <StatCard label="CAGR" value={pct(portfolioSummary.cagr)} sub="Since inception" />
          <StatCard label="XIRR" value={pct(portfolioSummary.xirr)} sub="Cash-flow adjusted" />
          <StatCard
            label="Volatility"
            value={pct(portfolioSummary.volatility, 1)}
            sub="Annualised, 1Y" />
          
          <StatCard
            label="Sharpe ratio"
            value={portfolioSummary.sharpe.toFixed(2)}
            sub="Risk-free 6.5%" />
          
          <StatCard
            label="Max drawdown"
            value={pct(portfolioSummary.maxDrawdown, 1)}
            tone="neg"
            sub="Peak to trough" />
          
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader
              title="Portfolio return"
              subtitle="Indexed to 100 at period start, versus NGIP Global 200" />
            
            <div className="px-3 py-4">
              <LineSeries
                data={indexed}
                xKey="date"
                series={[
                { key: 'portfolio', label: 'Portfolio' },
                {
                  key: 'benchmark',
                  label: 'NGIP Global 200',
                  color: '#98A2AF',
                  dashed: true
                }]
                }
                height={300}
                showLegend
                formatter={(v) => Number(v).toFixed(1)} />
              
            </div>
          </Card>
          <Card>
            <CardHeader
              title="Drawdown"
              subtitle="Decline from the running peak" />
            
            <div className="px-3 py-4">
              <AreaSeries
                data={drawdownSeries.slice(-13)}
                xKey="date"
                series={[
                { key: 'drawdown', label: 'Drawdown %', color: '#C2372C' }]
                }
                height={300}
                formatter={(v) => `${Number(v).toFixed(2)}%`} />
              
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Return attribution"
            subtitle="Contribution to total return, percentage points"
            action={
            <Segmented
              size="xs"
              options={['Country', 'Sector', 'Currency']}
              value={attribution}
              onChange={setAttribution} />

            } />
          
          <div className="grid gap-5 p-4 lg:grid-cols-[1.4fr_1fr]">
            <BarSeries
              data={contribution}
              xKey="label"
              series={[{ key: 'contribution', label: 'Contribution (pp)' }]}
              layout="vertical"
              height={300}
              formatter={(v) => `${Number(v).toFixed(2)} pp`} />
            
            <div>
              <Donut
                data={contribution.map((c) => ({
                  name: c.label,
                  value: Math.abs(c.contribution)
                }))}
                height={220}
                formatter={(v) => `${Number(v).toFixed(2)} pp`} />
              
              <ul className="mt-3 space-y-1.5">
                {contribution.slice(0, 6).map((c, i) =>
                <li key={c.label} className="flex items-center gap-2">
                    <span
                    className="h-2 w-2 shrink-0 rounded-sm"
                    style={{ background: palette[i % palette.length] }} />
                  
                    <span className="truncate text-xs text-ink-2">{c.label}</span>
                    <span className="num ml-auto text-xs font-medium tabular-nums text-ink">
                      {c.contribution.toFixed(2)} pp
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Benchmark comparison"
            subtitle="Trailing returns against three reference indices" />
          
          <div className="px-3 py-4">
            <BarSeries
              data={[
              { label: '1M', portfolio: 2.4, global: 1.6, emerging: 2.1 },
              { label: '3M', portfolio: 6.8, global: 4.2, emerging: 5.4 },
              { label: 'YTD', portfolio: 14.2, global: 9.8, emerging: 13.6 },
              { label: '1Y', portfolio: 21.4, global: 14.2, emerging: 18.9 },
              { label: '3Y', portfolio: 16.4, global: 11.6, emerging: 9.8 }]
              }
              xKey="label"
              series={[
              { key: 'portfolio', label: 'Portfolio' },
              { key: 'global', label: 'NGIP Global 200', color: '#98A2AF' },
              { key: 'emerging', label: 'NGIP Emerging 100', color: '#1F5FA8' }]
              }
              height={268}
              formatter={(v) => `${Number(v).toFixed(1)}%`} />
            
          </div>
        </Card>
      </PageBody>
    </>);

}