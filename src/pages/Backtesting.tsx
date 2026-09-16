import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AreaSeries } from '../components/charts/Charts';
import { pct, num } from '../utils/format';

import { savedStrategies } from '../data/strategy';
import { generateMockBacktest } from '../data/backtest';
import { BacktestResult } from '../types';

export function Backtesting() {
  const [searchParams] = useSearchParams();
  const strategyId = searchParams.get('strategy') || savedStrategies[0].id;
  const strategy = savedStrategies.find(s => s.id === strategyId) || savedStrategies[0];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<BacktestResult | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setResult(generateMockBacktest(strategy.id));
      setLoading(false);
    }, 800); // simulate loading
    return () => clearTimeout(timer);
  }, [strategy.id]);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Analytics', to: '/app/analytics' },
          { label: 'Backtesting' }
        ]}
        title="Backtesting"
        subtitle="Run a saved strategy against history with fees, slippage and a benchmark."
        actions={
          <Link to="/app/strategy">
            <Button>Change Strategy</Button>
          </Link>
        }
      />
      
      <PageBody className="space-y-6">
        <Card>
          <div className="p-5 border-b border-line flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-ink text-lg">{strategy.name}</h3>
              <p className="text-sm text-ink-3 mt-1">{strategy.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge tone="info">Date Range: Sep 2023 - Sep 2026</Badge>
              <Badge tone="pos">Benchmark: Global 200</Badge>
            </div>
          </div>
          
          {loading || !result ? (
            <div className="p-8 space-y-4 animate-pulse">
              <div className="h-24 bg-subtle rounded-md w-full"></div>
              <div className="h-[300px] bg-subtle rounded-md w-full"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line border-b border-line">
                <div className="p-5 bg-surface">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-3 mb-1">CAGR</div>
                  <div className="text-2xl font-semibold text-ink">{pct(result.cagr, 2)}</div>
                </div>
                <div className="p-5 bg-surface">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-3 mb-1">Sharpe Ratio</div>
                  <div className="text-2xl font-semibold text-ink">{num(result.sharpeRatio, 2)}</div>
                </div>
                <div className="p-5 bg-surface">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-3 mb-1">Max Drawdown</div>
                  <div className="text-2xl font-semibold text-neg">{pct(result.maxDrawdown, 2)}</div>
                </div>
                <div className="p-5 bg-surface">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-3 mb-1">XIRR</div>
                  <div className="text-2xl font-semibold text-ink">{pct(result.xirr, 2)}</div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium text-ink">Cumulative Returns</h4>
                </div>
                <AreaSeries
                  data={result.series}
                  xKey="date"
                  series={[
                    { key: 'strategy', label: 'Strategy', color: 'var(--accent)' },
                    { key: 'benchmark', label: 'Benchmark', color: 'var(--ink-4)' }
                  ]}
                  height={320}
                  formatter={(v) => `$${Number(v).toLocaleString()}`}
                />
              </div>
            </>
          )}
        </Card>

        <Card>
          <CardHeader title="Period Returns" subtitle="Quarterly performance vs benchmark" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-subtle text-ink-3 font-medium border-b border-line">
                <tr>
                  <th className="px-5 py-3">Period</th>
                  <th className="px-5 py-3 text-right">Strategy Return</th>
                  <th className="px-5 py-3 text-right">Benchmark Return</th>
                  <th className="px-5 py-3 text-right">Outperformance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {loading ? (
                   <tr><td colSpan={4} className="px-5 py-8 text-center text-ink-3">Calculating period returns...</td></tr>
                ) : result?.periodReturns.map((pr, i) => {
                  const outperf = pr.strategyReturn - pr.benchmarkReturn;
                  return (
                    <tr key={pr.period} className={i % 2 === 0 ? 'bg-canvas' : 'bg-surface'}>
                      <td className="px-5 py-3 font-medium text-ink">{pr.period}</td>
                      <td className={`px-5 py-3 text-right font-medium tabular-nums ${pr.strategyReturn >= 0 ? 'text-pos' : 'text-neg'}`}>
                        {pr.strategyReturn >= 0 ? '+' : ''}{pct(pr.strategyReturn * 100, 2)}
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-ink-2">
                        {pr.benchmarkReturn >= 0 ? '+' : ''}{pct(pr.benchmarkReturn * 100, 2)}
                      </td>
                      <td className={`px-5 py-3 text-right font-medium tabular-nums ${outperf >= 0 ? 'text-pos' : 'text-neg'}`}>
                        {outperf >= 0 ? '+' : ''}{pct(outperf * 100, 2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </PageBody>
    </>
  );
}
