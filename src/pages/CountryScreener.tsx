import React from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon, RotateCcwIcon, SaveIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge, Delta, RiskBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { RangeInput, Select } from '../components/ui/Input';
import { Column, DataTable } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { Sparkline } from '../components/ui/Sparkline';
import { useToast } from '../components/ui/Toast';
import { countries, regions } from '../data/countries';
import { Country } from '../types';
import { pct } from '../utils/format';

const defaults = {
  cgi: 60,
  growth: 2,
  inflation: 12,
  debt: 140,
  fdi: 0,
  popGrowth: -1,
  risk: 80,
  region: 'All',
  development: 'All',
  income: 'All'
};

const savedScreens = [
{ name: 'High growth, low risk', count: 6 },
{ name: 'Emerging Asia capex', count: 4 },
{ name: 'Disinflation candidates', count: 9 }];


export function CountryScreener() {
  const toast = useToast();
  const [f, setF] = React.useState(defaults);

  const results = countries.filter(
    (c) =>
    c.cgi >= f.cgi &&
    c.gdpGrowth >= f.growth &&
    c.inflation <= f.inflation &&
    c.debtToGdp <= f.debt &&
    c.fdi >= f.fdi &&
    c.populationGrowth >= f.popGrowth &&
    c.riskScore <= f.risk && (
    f.region === 'All' || c.region === f.region) && (
    f.development === 'All' || c.development === f.development) && (
    f.income === 'All' || c.income === f.income)
  );

  const columns: Column<Country>[] = [
  {
    key: 'country',
    header: 'Country',
    sortable: true,
    sortValue: (c) => c.name,
    render: (c) =>
    <Link
      to={`/app/countries/${c.id}`}
      className="flex items-center gap-2.5 font-medium text-ink hover:text-accent">
      
          <span aria-hidden>{c.flag}</span>
          <span className="truncate">{c.name}</span>
        </Link>

  },
  {
    key: 'cgi',
    header: 'CGI',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.cgi,
    render: (c) =>
    <span className="flex items-center justify-end gap-2">
          <span className="num font-semibold tabular-nums">{c.cgi.toFixed(1)}</span>
          <Delta value={c.cgiDelta} suffix="" size="xs" showIcon={false} />
        </span>

  },
  {
    key: 'growth',
    header: 'Growth',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.gdpGrowth,
    render: (c) => <span className="num tabular-nums">{pct(c.gdpGrowth, 1)}</span>
  },
  {
    key: 'risk',
    header: 'Risk',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.riskScore,
    render: (c) => <RiskBadge band={c.riskBand} />
  },
  {
    key: 'gdp',
    header: 'GDP',
    align: 'right',
    hideBelow: 'md',
    sortable: true,
    sortValue: (c) => c.gdp,
    render: (c) =>
    <span className="num tabular-nums text-ink-2">${c.gdp.toFixed(2)}T</span>

  },
  {
    key: 'inflation',
    header: 'Inflation',
    align: 'right',
    hideBelow: 'md',
    sortable: true,
    sortValue: (c) => c.inflation,
    render: (c) =>
    <span className="num tabular-nums text-ink-2">{pct(c.inflation, 1)}</span>

  },
  {
    key: 'trend',
    header: 'Trend',
    align: 'right',
    width: '104px',
    hideBelow: 'lg',
    render: (c) =>
    <span className="flex justify-end">
          <Sparkline data={c.trend} width={80} height={22} />
        </span>

  }];


  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Research', to: '/app/research' },
        { label: 'Country screener' }]
        }
        title="Country screener"
        subtitle="Filter the coverage universe on quantitative economic criteria."
        actions={
        <>
            <Button
            icon={<RotateCcwIcon className="h-3.5 w-3.5" />}
            onClick={() => setF(defaults)}>
            
              Clear
            </Button>
            <Button
            icon={<DownloadIcon className="h-3.5 w-3.5" />}
            onClick={() =>
            toast.push({
              tone: 'info',
              title: 'Export queued',
              description: `${results.length} economies will be exported as CSV.`
            })
            }>
            
              Export
            </Button>
            <Button
            variant="primary"
            icon={<SaveIcon className="h-3.5 w-3.5" />}
            onClick={() =>
            toast.push({
              tone: 'success',
              title: 'Screen saved',
              description: 'Available under saved screens.'
            })
            }>
            
              Save screen
            </Button>
          </>
        } />
      

      <PageBody>
        <div className="grid gap-5 xl:grid-cols-[288px_minmax(0,1fr)]">
          <div className="space-y-5">
            <Card>
              <CardHeader title="Filters" dense />
              <div className="space-y-5 p-4">
                <RangeInput
                  label="CGI minimum"
                  value={f.cgi}
                  min={40}
                  max={95}
                  onChange={(v) => setF({ ...f, cgi: v })} />
                
                <RangeInput
                  label="GDP growth minimum"
                  value={f.growth}
                  min={0}
                  max={8}
                  step={0.5}
                  suffix="%"
                  onChange={(v) => setF({ ...f, growth: v })} />
                
                <RangeInput
                  label="Inflation maximum"
                  value={f.inflation}
                  min={1}
                  max={40}
                  suffix="%"
                  onChange={(v) => setF({ ...f, inflation: v })} />
                
                <RangeInput
                  label="Debt / GDP maximum"
                  value={f.debt}
                  min={20}
                  max={260}
                  step={5}
                  suffix="%"
                  onChange={(v) => setF({ ...f, debt: v })} />
                
                <RangeInput
                  label="FDI minimum"
                  value={f.fdi}
                  min={0}
                  max={150}
                  step={5}
                  suffix="B"
                  onChange={(v) => setF({ ...f, fdi: v })} />
                
                <RangeInput
                  label="Population growth minimum"
                  value={f.popGrowth}
                  min={-1}
                  max={3}
                  step={0.1}
                  suffix="%"
                  onChange={(v) => setF({ ...f, popGrowth: v })} />
                
                <RangeInput
                  label="Risk score maximum"
                  value={f.risk}
                  min={10}
                  max={90}
                  onChange={(v) => setF({ ...f, risk: v })} />
                
                <div className="space-y-3 border-t border-line pt-4">
                  <Select
                    value={f.region}
                    onChange={(e) => setF({ ...f, region: e.target.value })}
                    aria-label="Region">
                    
                    <option value="All">Region: All</option>
                    {regions.map((r) =>
                    <option key={r}>{r}</option>
                    )}
                  </Select>
                  <Select
                    value={f.development}
                    onChange={(e) => setF({ ...f, development: e.target.value })}
                    aria-label="Development level">
                    
                    <option value="All">Development: All</option>
                    {['Developed', 'Emerging', 'Frontier'].map((r) =>
                    <option key={r}>{r}</option>
                    )}
                  </Select>
                  <Select
                    value={f.income}
                    onChange={(e) => setF({ ...f, income: e.target.value })}
                    aria-label="Income level">
                    
                    <option value="All">Income: All</option>
                    {['High', 'Upper Middle', 'Lower Middle', 'Low'].map((r) =>
                    <option key={r}>{r}</option>
                    )}
                  </Select>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="Saved screens" dense />
              <ul className="divide-y divide-line">
                {savedScreens.map((s) =>
                <li
                  key={s.name}
                  className="flex items-center justify-between px-4 py-2.5">
                  
                    <span className="text-[13px] text-ink-2">{s.name}</span>
                    <Badge>{s.count}</Badge>
                  </li>
                )}
              </ul>
            </Card>
          </div>

          <Card>
            <CardHeader
              title="Screen results"
              subtitle={`${results.length} of ${countries.length} covered economies match`}
              action={
              <Link
                to={`/app/compare?ids=${results.slice(0, 6).map((c) => c.id).join(',')}`}
                className="text-xs font-medium text-accent hover:text-accent-hover">
                
                  Compare top results
                </Link>
              } />
            
            <DataTable
              columns={columns}
              rows={results}
              rowKey={(c) => c.id}
              defaultSort={{ key: 'cgi', dir: 'desc' }}
              emptyState={
              <EmptyState
                title="No economies pass this screen"
                description="Your criteria are too restrictive. Relax the CGI or inflation thresholds."
                action={
                <Button size="sm" onClick={() => setF(defaults)}>
                      Reset filters
                    </Button>
                } />

              } />
            
          </Card>
        </div>
      </PageBody>
    </>);

}