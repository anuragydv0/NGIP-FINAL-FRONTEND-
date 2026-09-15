import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../components/ui/Table';
import { AreaSeries, Donut } from '../components/charts/Charts';
import { pct, num, currency } from '../utils/format';

import { savedStrategies } from '../data/strategy';
import { generateMockBacktest } from '../data/backtest';

export function StrategyBuilder() {
  const [activeTab, setActiveTab] = useState<'build' | 'saved'>('saved');

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Analytics', to: '/app/analytics' },
          { label: 'Strategy builder' }
        ]}
        title="Strategy builder"
        subtitle="Define quantitative country rules, rank the universe and build a rebalanced basket."
        actions={
          <div className="flex items-center gap-2">
            <Button variant={activeTab === 'saved' ? 'primary' : 'secondary'} onClick={() => setActiveTab('saved')}>Saved Strategies</Button>
            <Button variant={activeTab === 'build' ? 'primary' : 'secondary'} onClick={() => setActiveTab('build')}>Build New</Button>
          </div>
        }
      />
      <PageBody className="space-y-6">
        {activeTab === 'saved' && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {savedStrategies.map(strat => (
              <Card key={strat.id} className="flex flex-col">
                <CardHeader title={strat.name} subtitle={strat.description} />
                <div className="flex-1 p-5">
                  <Donut 
                    data={strat.allocations.map(a => ({ label: a.name, value: a.weight }))}
                    category="label"
                    value="value"
                    height={200}
                    valueFormatter={(v) => `${v}%`}
                  />
                  <div className="mt-4 flex flex-col gap-2">
                    {strat.allocations.map(a => (
                      <div key={a.id} className="flex justify-between items-center text-sm">
                        <span className="text-ink-2">{a.name}</span>
                        <span className="font-medium">{a.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 border-t border-line mt-auto">
                  <Link to={`/app/backtesting?strategy=${strat.id}`}>
                    <Button variant="primary" className="w-full">Run Backtest</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'build' && (
          <Card>
            <CardHeader title="Create new strategy" subtitle="Assign target weights to countries/instruments (must sum to 100%)" />
            <div className="p-6 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-subtle mb-4">
                  <span className="text-xl">???</span>
                </div>
                <h3 className="text-lg font-medium text-ink mb-2">Builder interface</h3>
                <p className="text-ink-2 mb-6">Select countries and assign allocation weights.</p>
                <Button onClick={() => setActiveTab('saved')}>Cancel</Button>
              </div>
            </div>
          </Card>
        )}
      </PageBody>
    </>
  );
}

export function Backtesting() {
  const query = new URLSearchParams(window.location.search);
  const strategyId = query.get('strategy') || savedStrategies[0].id;
  const strategy = savedStrategies.find(s => s.id === strategyId) || savedStrategies[0];
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof generateMockBacktest> | null>(null);

  React.useEffect(() => {
    setLoading(true);
    // Simulate async data fetching
    const timer = setTimeout(() => {
      setResult(generateMockBacktest(strategy.id));
      setLoading(false);
    }, 600);
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
              <h3 className="font-semibold text-ink">{strategy.name}</h3>
              <p className="text-sm text-ink-2">{strategy.description}</p>
            </div>
            <Badge tone="info">Date Range: Sep 2023 - Sep 2026</Badge>
          </div>
          
          {loading || !result ? (
            <div className="p-8 space-y-4 animate-pulse">
              <div className="h-24 bg-subtle rounded-md w-full"></div>
              <div className="h-64 bg-subtle rounded-md w-full"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-line border-b border-line">
                <div className="p-5">
                  <div className="text-xs text-ink-3 mb-1">CAGR</div>
                  <div className="text-xl font-semibold text-ink">{pct(result.cagr, 2)}</div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-ink-3 mb-1">Sharpe Ratio</div>
                  <div className="text-xl font-semibold text-ink">{num(result.sharpeRatio, 2)}</div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-ink-3 mb-1">Max Drawdown</div>
                  <div className="text-xl font-semibold text-neg">{pct(result.maxDrawdown, 2)}</div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-ink-3 mb-1">XIRR</div>
                  <div className="text-xl font-semibold text-ink">{pct(result.xirr, 2)}</div>
                </div>
              </div>
              
              <div className="p-5">
                <h4 className="font-medium text-ink mb-4">Cumulative Returns vs Benchmark</h4>
                <AreaSeries
                  data={result.series}
                  xKey="date"
                  series={[
                    { key: 'strategy', label: 'Strategy', color: '#14b8a6' },
                    { key: 'benchmark', label: 'Benchmark', color: '#64748b' }
                  ]}
                  height={300}
                  formatter={(v) => currency(Number(v))}
                />
              </div>
            </>
          )}
        </Card>

        <Card>
          <CardHeader title="Period Returns" />
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Period</TableCell>
                  <TableCell align="right">Strategy Return</TableCell>
                  <TableCell align="right">Benchmark Return</TableCell>
                  <TableCell align="right">Outperformance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                   <TableRow><TableCell colSpan={4} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : result?.periodReturns.map(pr => {
                  const outperf = pr.strategyReturn - pr.benchmarkReturn;
                  return (
                    <TableRow key={pr.period}>
                      <TableCell>{pr.period}</TableCell>
                      <TableCell align="right" className={pr.strategyReturn >= 0 ? 'text-pos' : 'text-neg'}>
                        {pct(pr.strategyReturn * 100, 2)}
                      </TableCell>
                      <TableCell align="right">
                        {pct(pr.benchmarkReturn * 100, 2)}
                      </TableCell>
                      <TableCell align="right" className={outperf >= 0 ? 'text-pos' : 'text-neg'}>
                        {outperf >= 0 ? '+' : ''}{pct(outperf * 100, 2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </PageBody>
    </>
  );
}
