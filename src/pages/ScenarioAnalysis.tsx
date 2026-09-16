import React, { useState } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/Table';
import { Field, Select, Input } from '../components/ui/Input';
import { predefinedScenarios, calculateScenarioImpact } from '../data/scenarios';
import { ScenarioDefinition, ScenarioResult } from '../types';
import { inr, pct, cx } from '../utils/format';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';

export function ScenarioAnalysis() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(predefinedScenarios[0].id);
  const [customParams, setCustomParams] = useState<Omit<ScenarioDefinition, 'id' | 'name' | 'description' | 'isCustom'>>({
    growthShock: -2.0,
    currencyShock: 0,
    riskOffSentiment: 'Medium'
  });
  
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);

  const isCustom = selectedScenarioId === 'custom';
  
  const selectedDef = isCustom 
    ? {
        id: 'custom',
        name: 'Custom Scenario',
        description: 'User-defined stress parameters.',
        ...customParams,
        isCustom: true
      }
    : predefinedScenarios.find(s => s.id === selectedScenarioId)!;

  const handleRun = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setResult(calculateScenarioImpact(selectedDef));
      setRunning(false);
    }, 800);
  };

  const columns = [
    {
      key: 'holding',
      header: 'Holding',
      render: (h: any) => (
        <div>
          <p className="text-[13px] font-medium text-ink">{h.symbol}</p>
          <p className="text-xs text-ink-3">{h.holdingName}</p>
        </div>
      )
    },
    {
      key: 'weight',
      header: 'Weight',
      render: (h: any) => <span className="text-[13px] text-ink">{pct(h.weight)}</span>,
      align: 'right' as const
    },
    {
      key: 'impact',
      header: 'Projected Impact',
      render: (h: any) => (
        <span className={cx('text-[13px] font-medium', h.pctChange >= 0 ? 'text-pos' : 'text-neg')}>
          {h.pctChange > 0 ? '+' : ''}{pct(h.pctChange)}
        </span>
      ),
      align: 'right' as const
    },
    {
      key: 'valueChange',
      header: 'Value Change',
      render: (h: any) => (
        <span className={cx('text-[13px]', h.valueChange >= 0 ? 'text-pos' : 'text-neg')}>
          {h.valueChange > 0 ? '+' : ''}{inr(h.valueChange, 0)}
        </span>
      ),
      align: 'right' as const
    },
    {
      key: 'projectedValue',
      header: 'Projected Value',
      render: (h: any) => <span className="text-[13px] font-medium text-ink">{inr(h.valueAfter, 0)}</span>,
      align: 'right' as const
    }
  ];

  // Prepare chart data if result exists
  const chartData = result ? result.impacts.slice(0, 10).map(i => ({
    name: i.symbol,
    impact: i.pctChange
  })) : [];

  return (
    <>
      <PageHeader
        title="Scenario Analysis"
        subtitle="Stress-test your portfolio against hypothetical macroeconomic scenarios."
      />
      <PageBody className="max-w-6xl space-y-6">
        
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          
          {/* Controls Sidebar */}
          <div className="space-y-6">
            <Card className="p-5">
              <h3 className="text-[13px] font-medium text-ink mb-4">Select Scenario</h3>
              <div className="space-y-2">
                {predefinedScenarios.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedScenarioId(s.id)}
                    className={cx(
                      'cursor-pointer rounded-md border p-3 transition-colors',
                      selectedScenarioId === s.id 
                        ? 'border-accent bg-accent/5' 
                        : 'border-line hover:border-line-strong'
                    )}
                  >
                    <p className="text-[13px] font-medium text-ink">{s.name}</p>
                  </div>
                ))}
                <div 
                  onClick={() => setSelectedScenarioId('custom')}
                  className={cx(
                    'cursor-pointer rounded-md border p-3 transition-colors',
                    selectedScenarioId === 'custom' 
                      ? 'border-accent bg-accent/5' 
                      : 'border-line hover:border-line-strong'
                  )}
                >
                  <p className="text-[13px] font-medium text-ink">Custom Scenario...</p>
                </div>
              </div>
            </Card>

            {isCustom && (
              <Card className="p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <h3 className="text-[13px] font-medium text-ink mb-2">Custom Parameters</h3>
                <Field label="Growth Shock (%)">
                  <Input 
                    type="number" 
                    value={customParams.growthShock} 
                    onChange={e => setCustomParams({...customParams, growthShock: Number(e.target.value)})}
                  />
                </Field>
                <Field label="Currency Shock (%)">
                  <Input 
                    type="number" 
                    value={customParams.currencyShock} 
                    onChange={e => setCustomParams({...customParams, currencyShock: Number(e.target.value)})}
                  />
                </Field>
                <Field label="Risk-off Sentiment">
                  <Select 
                    value={customParams.riskOffSentiment} 
                    onChange={e => setCustomParams({...customParams, riskOffSentiment: e.target.value as any})}
                  >
                    <option value="Low">Low (Flight to Quality)</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High (Panic Selling)</option>
                  </Select>
                </Field>
              </Card>
            )}

            <Button 
              variant="primary" 
              className="w-full justify-center h-10" 
              onClick={handleRun}
              disabled={running}
            >
              {running ? 'Simulating...' : 'Run Scenario'}
            </Button>
          </div>

          {/* Results Area */}
          <div className="min-w-0 space-y-6">
            {!result && !running ? (
              <Card className="flex h-full flex-col items-center justify-center p-12 text-center text-ink-3">
                <p className="text-[14px]">Select a scenario and click "Run Scenario" to view the projected impact on your portfolio.</p>
                <p className="mt-2 text-[12px]">{selectedDef.description}</p>
              </Card>
            ) : running ? (
              <Card className="flex h-full flex-col items-center justify-center p-12 text-center text-ink-3 bg-subtle">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent mb-4" />
                <p className="text-[13px]">Running Monte Carlo simulations...</p>
              </Card>
            ) : result ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <Card className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-ink">{result.scenarioName}</h2>
                      <p className="text-[13px] text-ink-3 mt-1">{selectedDef.description}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-ink-4">Projected Impact</p>
                      <p className={cx('text-2xl font-bold mt-1', result.pctChange >= 0 ? 'text-pos' : 'text-neg')}>
                        {result.pctChange > 0 ? '+' : ''}{result.pctChange.toFixed(2)}%
                      </p>
                      <p className={cx('text-[13px]', result.valueChange >= 0 ? 'text-pos' : 'text-neg')}>
                        {result.valueChange > 0 ? '+' : ''}{inr(result.valueChange, 0)}
                      </p>
                    </div>
                  </div>

                  <div className="h-[250px] w-full mt-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--ink-3)' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--ink-3)' }} tickFormatter={(val) => `${val}%`} />
                        <Tooltip 
                          cursor={{ fill: 'var(--subtle)' }}
                          contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--line)', borderRadius: '6px', fontSize: '12px' }}
                          formatter={(value: number) => [`${value.toFixed(2)}%`, 'Impact']}
                        />
                        <ReferenceLine y={0} stroke="var(--line-strong)" />
                        <Bar dataKey="impact" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <cell key={`cell-${index}`} fill={entry.impact >= 0 ? 'var(--pos)' : 'var(--neg)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card>
                  <div className="border-b border-line px-5 py-4 flex items-center justify-between">
                    <h3 className="text-[13px] font-medium text-ink">Impact by Holding</h3>
                    <Badge tone="info">Sorted by severity</Badge>
                  </div>
                  <DataTable rows={result.impacts} columns={columns} rowKey={(h) => h.holdingId} />
                </Card>
                
                <div className="text-center">
                  <span className="text-[11px] text-ink-4">Simulated scenario for illustrative purposes only. Not a prediction of actual market outcomes.</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

      </PageBody>
    </>
  );
}
