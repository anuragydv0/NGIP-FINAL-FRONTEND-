import React from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, StatCard } from '../components/ui/Card';
import { Badge, DataStatus, RiskBadge, ScoreBar } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  AreaSeries,
  BarSeries,
  Heatmap,
  ScatterPlot } from
'../components/charts/Charts';
import { InsightCard } from '../components/domain/Cards';
import {
  countryAllocation,
  currencyAllocation,
  drawdownSeries,
  holdings,
  portfolioSummary } from
'../data/portfolio';
import { countries } from '../data/countries';
import { pct } from '../utils/format';

const correlationRows = ['India', 'Vietnam', 'US', 'Korea', 'Germany', 'UAE'];
const correlationValues = [
[1, 0.62, 0.41, 0.58, 0.34, 0.29],
[0.62, 1, 0.36, 0.64, 0.31, 0.24],
[0.41, 0.36, 1, 0.72, 0.68, 0.44],
[0.58, 0.64, 0.72, 1, 0.52, 0.38],
[0.34, 0.31, 0.68, 0.52, 1, 0.41],
[0.29, 0.24, 0.44, 0.38, 0.41, 1]];


export function RiskAnalysis() {
  const scatter = holdings.map((h) => {
    const c = countries.find((x) => x.name === h.country);
    return {
      x: c?.riskScore ?? 40,
      y: h.returnPct,
      z: h.weight * 8,
      name: h.symbol
    };
  });

  const topCountry = countryAllocation[0];

  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Analytics', to: '/app/analytics' },
        { label: 'Risk analysis' }]
        }
        title="Risk analysis"
        subtitle="Concentration, volatility and correlation across countries, sectors and currencies."
        meta={<DataStatus status="UPDATED" detail="Risk engine run 15:00 IST" />}
        actions={
        <>
            <Link to="/app/scenario">
              <Button>Scenario analysis</Button>
            </Link>
            <Link to="/app/ai-analyst">
              <Button variant="primary">Ask the AI analyst</Button>
            </Link>
          </>
        } />
      

      <PageBody className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-3">
          <InsightCard
            tone="warn"
            title={`${topCountry.weight.toFixed(0)}% of your portfolio exposure is concentrated in one country`}
            body={`${topCountry.name} represents ${pct(topCountry.weight, 1)} of portfolio value across four instruments. A single-country policy or currency shock would transmit directly to almost half the portfolio.`}
            action={
            <Link
              to="/app/holdings"
              className="text-[11px] font-semibold text-accent hover:text-accent-hover">
              
                Review the holdings →
              </Link>
            } />
          
          <InsightCard
            tone="info"
            title="Currency exposure is less diversified than country exposure"
            body="INR and USD together account for 74.5% of currency exposure. Adding EUR or JPY denominated instruments would reduce the portfolio's sensitivity to a single rate cycle." />
          
          <InsightCard
            tone="pos"
            title="Drawdown profile is shallower than the benchmark"
            body={`Maximum drawdown of ${pct(portfolioSummary.maxDrawdown, 1)} compares favourably with -19.6% for NGIP Global 200 over the same period, largely due to the sovereign debt allocation.`} />
          
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Volatility"
            value={pct(portfolioSummary.volatility, 1)}
            sub="Annualised, 1Y" />
          
          <StatCard
            label="Sharpe ratio"
            value={portfolioSummary.sharpe.toFixed(2)}
            sub="Above peer median" />
          
          <StatCard
            label="Maximum drawdown"
            value={pct(portfolioSummary.maxDrawdown, 1)}
            tone="neg"
            sub="Mar 2025" />
          
          <StatCard
            label="Concentration (HHI)"
            value="0.28"
            sub="Moderate concentration" />
          
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader
              title="Risk versus return"
              subtitle="Holding return against country risk score · bubble size is portfolio weight" />
            
            <div className="px-3 py-4">
              <ScatterPlot
                data={scatter}
                xLabel="Country risk score"
                yLabel="Holding return %"
                height={300} />
              
            </div>
          </Card>
          <Card>
            <CardHeader
              title="Country concentration"
              subtitle="Share of portfolio value by economy" />
            
            <div className="px-3 py-4">
              <BarSeries
                data={countryAllocation.map((c) => ({
                  label: c.name,
                  weight: c.weight
                }))}
                xKey="label"
                series={[{ key: 'weight', label: 'Weight %' }]}
                layout="vertical"
                height={300}
                formatter={(v) => `${Number(v).toFixed(1)}%`} />
              
            </div>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <Card>
            <CardHeader title="Currency exposure" />
            <div className="space-y-3.5 p-5">
              {currencyAllocation.map((c) =>
              <div key={c.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-ink-2">{c.name}</span>
                    <span className="num text-xs font-semibold tabular-nums text-ink">
                      {pct(c.weight, 1)}
                    </span>
                  </div>
                  <ScoreBar
                  value={c.weight}
                  tone={c.weight > 40 ? 'warn' : 'accent'}
                  className="mt-1.5" />
                
                </div>
              )}
            </div>
          </Card>
          <Card>
            <CardHeader
              title="Correlation matrix"
              subtitle="Trailing 12-month return correlation between country exposures" />
            
            <div className="p-4">
              <Heatmap
                rows={correlationRows}
                columns={correlationRows}
                values={correlationValues} />
              
            </div>
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <CardHeader
              title="Drawdown history"
              subtitle="Portfolio decline from running peak" />
            
            <div className="px-3 py-4">
              <AreaSeries
                data={drawdownSeries}
                xKey="date"
                series={[{ key: 'drawdown', label: 'Drawdown %', color: '#C2372C' }]}
                height={264}
                formatter={(v) => `${Number(v).toFixed(2)}%`} />
              
            </div>
          </Card>
          <Card>
            <CardHeader title="Risk register" subtitle="By exposure category" />
            <ul className="divide-y divide-line">
              {[
              ['Country risk', 'Elevated', 'India 48.4% · concentration above policy'],
              ['Regional risk', 'Moderate', 'Asia Pacific 72.1% of exposure'],
              ['Currency risk', 'Elevated', 'INR and USD 74.5% combined'],
              ['Liquidity risk', 'Low', 'All holdings above ₹300 Cr AUM'],
              ['Sector risk', 'Moderate', 'Infrastructure and technology 42%'],
              ['Interest rate risk', 'Moderate', 'Duration 4.2 years on debt sleeve']].
              map(([label, band, note]) =>
              <li key={label} className="flex flex-wrap items-center gap-3 px-5 py-3">
                  <span className="w-32 text-[13px] font-medium text-ink">
                    {label}
                  </span>
                  <RiskBadge band={band} />
                  <span className="min-w-[180px] flex-1 text-xs text-ink-3">
                    {note}
                  </span>
                </li>
              )}
            </ul>
            <div className="border-t border-line px-5 py-3">
              <Badge tone="info">
                Risk model is simulated for demonstration purposes
              </Badge>
            </div>
          </Card>
        </div>
      </PageBody>
    </>);

}