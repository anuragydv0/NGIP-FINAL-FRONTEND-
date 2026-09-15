import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Donut } from '../components/charts/Charts';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';
import { savedStrategies } from '../data/strategy';

export function StrategyBuilder() {
  const [activeTab, setActiveTab] = useState<'build' | 'saved'>('saved');
  const [strategies, setStrategies] = useState(savedStrategies);
  const [weights, setWeights] = useState<Record<string, number>>({'India': 50, 'Vietnam': 50});
  const [strategyName, setStrategyName] = useState('');
  const [strategyDescription, setStrategyDescription] = useState('');
  
  const toast = useToast();

  const totalWeight = Object.values(weights).reduce((sum, w) => sum + (Number(w) || 0), 0);
  const isValid = totalWeight === 100;

  const handleSave = () => {
    if (!isValid) return;

    const newStrategy = {
      id: 's' + Date.now(),
      name: strategyName.trim() || 'Custom Strategy',
      description: strategyDescription.trim() || 'Custom user allocation strategy.',
      creator: 'Current User',
      updatedAt: new Date().toISOString().split('T')[0],
      allocations: Object.entries(weights)
        .filter(([_, w]) => Number(w) > 0)
        .map(([name, weight]) => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          weight: Number(weight)
        }))
    };

    setStrategies((prev) => [newStrategy, ...prev]);
    toast.push({
      title: 'Strategy saved',
      description: `Successfully created ${newStrategy.name}`,
      tone: 'success'
    });
    
    // reset tab
    setActiveTab('saved');
    // optionally reset form
    setStrategyName('');
    setStrategyDescription('');
    setWeights({'India': 50, 'Vietnam': 50});
  };

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
          <div className="flex items-center gap-2 bg-subtle p-1 rounded-lg border border-line">
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'saved' ? 'bg-surface text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2'}`}
              onClick={() => setActiveTab('saved')}
            >
              Saved Strategies
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'build' ? 'bg-surface text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2'}`}
              onClick={() => setActiveTab('build')}
            >
              Build New
            </button>
          </div>
        }
      />
      <PageBody className="space-y-6">
        {activeTab === 'saved' && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {strategies.map(strat => (
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
                  <div className="mt-6 flex flex-col gap-2">
                    {strat.allocations.map(a => (
                      <div key={a.id} className="flex justify-between items-center text-sm border-b border-line last:border-0 pb-2 last:pb-0">
                        <span className="text-ink-2">{a.name}</span>
                        <span className="font-medium">{a.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-line mt-auto bg-subtle/50">
                  <Link to={`/app/backtesting?strategy=${strat.id}`}>
                    <Button variant="primary" className="w-full">Run Backtest</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'build' && (
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <Card>
              <CardHeader title="Create new strategy" subtitle="Assign target weights to countries/instruments" />
              <div className="p-6 space-y-6">
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-ink">Strategy Name</label>
                    <Input 
                      placeholder="e.g. Emerging Market Focus" 
                      value={strategyName} 
                      onChange={(e) => setStrategyName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-ink">Description</label>
                    <Input 
                      placeholder="Brief description of the strategy..." 
                      value={strategyDescription} 
                      onChange={(e) => setStrategyDescription(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="h-px bg-line my-6" />

                <div className="space-y-4">
                  <h4 className="font-medium text-ink">Allocations</h4>
                  {Object.entries(weights).map(([name, weight]) => (
                    <div key={name} className="flex items-center gap-4">
                      <div className="flex-1 font-medium">{name}</div>
                      <div className="w-32">
                        <Input 
                          type="number" 
                          value={weight} 
                          onChange={(e) => setWeights(prev => ({...prev, [name]: Number(e.target.value)}))} 
                          min={0}
                          max={100}
                        />
                      </div>
                      <span className="text-sm text-ink-3">%</span>
                    </div>
                  ))}
                </div>
                
                <div className={`p-4 rounded-lg flex items-center justify-between ${isValid ? 'bg-pos/10 text-pos' : 'bg-neg/10 text-neg'}`}>
                  <span className="font-medium">Total Allocation</span>
                  <span className="font-bold text-lg">{totalWeight}%</span>
                </div>
                
                {!isValid && (
                  <p className="text-sm text-neg">Weights must sum to exactly 100% before saving.</p>
                )}
                
                <div className="flex gap-3 pt-4 border-t border-line">
                  <Button variant="primary" disabled={!isValid} onClick={handleSave}>Save Strategy</Button>
                  <Button onClick={() => setActiveTab('saved')}>Cancel</Button>
                </div>
              </div>
            </Card>
            
            <Card>
              <CardHeader title="Preview" />
              <div className="p-5">
                {totalWeight > 0 ? (
                  <Donut 
                    data={Object.entries(weights).map(([label, value]) => ({ label, value }))}
                    category="label"
                    value="value"
                    height={220}
                    valueFormatter={(v) => `${v}%`}
                  />
                ) : (
                  <div className="h-[220px] flex items-center justify-center text-sm text-ink-3 bg-subtle rounded-full aspect-square mx-auto max-w-[220px]">
                    No allocation
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </PageBody>
    </>
  );
}
