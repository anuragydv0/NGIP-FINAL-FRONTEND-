import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightLeftIcon,
  GridIcon,
  ListIcon,
  SlidersHorizontalIcon } from
'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge, DataStatus, Delta, RiskBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/Input';
import { FilterBar, FilterSelect, Pagination } from '../components/ui/FilterBar';
import { Tabs } from '../components/ui/Tabs';
import { Sparkline } from '../components/ui/Sparkline';
import {
  Column,
  DataTable,
  Density,
  DensityToggle } from
'../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { CountryCard } from '../components/domain/Cards';
import { countries, regions } from '../data/countries';
import { Country } from '../types';
import { cx, compact, pct } from '../utils/format';

const categoryTabs = [
{ id: 'all', label: 'All economies' },
{ id: 'growth', label: 'Top growth' },
{ id: 'improved', label: 'Most improved' },
{ id: 'lowrisk', label: 'Low risk' },
{ id: 'emerging', label: 'Emerging' },
{ id: 'developed', label: 'Developed' }];


export function Countries() {
  const [query, setQuery] = React.useState('');
  const [region, setRegion] = React.useState('All');
  const [growth, setGrowth] = React.useState('All');
  const [risk, setRisk] = React.useState('All');
  const [development, setDevelopment] = React.useState('All');
  const [income, setIncome] = React.useState('All');
  const [tab, setTab] = React.useState('all');
  const [view, setView] = React.useState<'table' | 'grid'>('table');
  const [density, setDensity] = React.useState<Density>('comfortable');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    let list = countries.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query.toLowerCase()))
      return false;
      if (region !== 'All' && c.region !== region) return false;
      if (development !== 'All' && c.development !== development) return false;
      if (income !== 'All' && c.income !== income) return false;
      if (risk !== 'All' && c.riskBand !== risk) return false;
      if (growth === 'Above 5%' && c.gdpGrowth < 5) return false;
      if (growth === '3% – 5%' && (c.gdpGrowth < 3 || c.gdpGrowth >= 5))
      return false;
      if (growth === 'Below 3%' && c.gdpGrowth >= 3) return false;
      return true;
    });
    if (tab === 'growth')
    list = [...list].sort((a, b) => b.gdpGrowth - a.gdpGrowth).slice(0, 10);
    if (tab === 'improved')
    list = [...list].sort((a, b) => b.cgiDelta - a.cgiDelta).slice(0, 10);
    if (tab === 'lowrisk')
    list = list.filter((c) => c.riskScore < 40).sort((a, b) => a.riskScore - b.riskScore);
    if (tab === 'emerging')
    list = list.filter((c) => c.development !== 'Developed');
    if (tab === 'developed')
    list = list.filter((c) => c.development === 'Developed');
    return list;
  }, [query, region, growth, risk, development, income, tab]);

  const ranked = React.useMemo(
    () => [...countries].sort((a, b) => b.cgi - a.cgi).map((c) => c.id),
    []
  );

  const columns: Column<Country>[] = [
  {
    key: 'rank',
    header: 'Rank',
    width: '60px',
    render: (c) =>
    <span className="num text-xs tabular-nums text-ink-4">
          {ranked.indexOf(c.id) + 1}
        </span>

  },
  {
    key: 'country',
    header: 'Country',
    sortable: true,
    sortValue: (c) => c.name,
    render: (c) =>
    <Link
      to={`/app/countries/${c.id}`}
      className="group flex items-center gap-2.5">
      
          <span className="text-base" aria-hidden>
            {c.flag}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-medium text-ink transition-colors duration-150 ease-swift group-hover:text-accent">
              {c.name}
            </span>
            <span className="block text-[11px] text-ink-4">
              {c.region} · {c.development}
            </span>
          </span>
        </Link>

  },
  {
    key: 'cgi',
    header: 'CGI',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.cgi,
    render: (c) =>
    <span className="flex flex-col items-end">
          <span className="num font-semibold tabular-nums text-ink">
            {c.cgi.toFixed(1)}
          </span>
          <Delta value={c.cgiDelta} suffix="" size="xs" showIcon={false} />
        </span>

  },
  {
    key: 'growth',
    header: 'GDP growth',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.gdpGrowth,
    render: (c) =>
    <span className="num tabular-nums">{pct(c.gdpGrowth, 1)}</span>

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
    <span
      className={cx(
        'num tabular-nums',
        c.inflation > 8 ? 'text-neg' : 'text-ink-2'
      )}>
      
          {pct(c.inflation, 1)}
        </span>

  },
  {
    key: 'debt',
    header: 'Debt/GDP',
    align: 'right',
    hideBelow: 'lg',
    sortable: true,
    sortValue: (c) => c.debtToGdp,
    render: (c) =>
    <span className="num tabular-nums text-ink-2">
          {pct(c.debtToGdp, 1)}
        </span>

  },
  {
    key: 'fdi',
    header: 'FDI',
    align: 'right',
    hideBelow: 'xl',
    sortable: true,
    sortValue: (c) => c.fdi,
    render: (c) =>
    <span className="num tabular-nums text-ink-2">
          ${compact(c.fdi * 1e9)}
        </span>

  },
  {
    key: 'risk',
    header: 'Risk',
    align: 'right',
    sortable: true,
    sortValue: (c) => c.riskScore,
    render: (c) =>
    <span className="flex items-center justify-end gap-2">
          <span className="num tabular-nums text-ink-2">{c.riskScore}</span>
          <RiskBadge band={c.riskBand} />
        </span>

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
        title="Global countries"
        subtitle="Explore economies, growth trends and global opportunities."
        meta={<DataStatus status="UPDATED" detail="CGI revised 12 Sep 2026" />}
        actions={
        <>
            <Link to="/app/screener">
              <Button icon={<SlidersHorizontalIcon className="h-3.5 w-3.5" />}>
                Advanced screener
              </Button>
            </Link>
            <Link
            to={`/app/compare${selected.length ? `?ids=${selected.join(',')}` : ''}`}>
            
              <Button
              variant="primary"
              icon={<ArrowRightLeftIcon className="h-3.5 w-3.5" />}>
              
                Compare{selected.length ? ` (${selected.length})` : ''}
              </Button>
            </Link>
          </>
        }
        tabs={<Tabs tabs={categoryTabs} value={tab} onChange={setTab} />} />
      

      <PageBody className="space-y-4">
        <Card>
          <FilterBar>
            <SearchInput
              placeholder="Search countries"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              wrapperClassName="w-full sm:w-64"
              className="h-8 text-xs" />
            
            <FilterSelect
              label="Region"
              value={region}
              options={regions}
              onChange={setRegion} />
            
            <FilterSelect
              label="Growth"
              value={growth}
              options={['Above 5%', '3% – 5%', 'Below 3%']}
              onChange={setGrowth} />
            
            <FilterSelect
              label="Risk"
              value={risk}
              options={['Low', 'Moderate', 'Elevated', 'High']}
              onChange={setRisk} />
            
            <FilterSelect
              label="Development"
              value={development}
              options={['Developed', 'Emerging', 'Frontier']}
              onChange={setDevelopment} />
            
            <FilterSelect
              label="Income"
              value={income}
              options={['High', 'Upper Middle', 'Lower Middle', 'Low']}
              onChange={setIncome} />
            
            <div className="ml-auto flex items-center gap-2">
              {view === 'table' &&
              <DensityToggle density={density} onChange={setDensity} />
              }
              <div className="inline-flex rounded-md border border-line-strong bg-surface p-0.5">
                {[
                ['table', ListIcon],
                ['grid', GridIcon]].
                map(([id, Icon]) => {
                  const I = Icon as React.ComponentType<{className?: string;}>;
                  return (
                    <button
                      key={id as string}
                      onClick={() => setView(id as 'table' | 'grid')}
                      aria-label={`${id} view`}
                      className={cx(
                        'rounded p-1.5 transition-colors duration-150 ease-swift',
                        view === id ?
                        'bg-ink text-white' :
                        'text-ink-3 hover:text-ink'
                      )}>
                      
                      <I className="h-3.5 w-3.5" />
                    </button>);

                })}
              </div>
            </div>
          </FilterBar>

          {view === 'table' ?
          <>
              <DataTable
              columns={columns}
              rows={filtered}
              rowKey={(c) => c.id}
              density={density}
              selectedKeys={selected}
              onToggleRow={(key) =>
              setSelected((s) =>
              s.includes(key) ?
              s.filter((x) => x !== key) :
              s.length < 6 ?
              [...s, key] :
              s
              )
              }
              defaultSort={{ key: 'cgi', dir: 'desc' }}
              emptyState={
              <EmptyState
                title="No economies match these filters"
                description="Widen the region, growth or risk filters to see more results."
                action={
                <Button
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    setRegion('All');
                    setGrowth('All');
                    setRisk('All');
                    setDevelopment('All');
                    setIncome('All');
                  }}>
                  
                        Clear all filters
                      </Button>
                } />

              } />
            
              {filtered.length > 0 &&
            <Pagination
              page={page}
              pageCount={Math.max(1, Math.ceil(filtered.length / 24))}
              total={filtered.length}
              onPage={setPage} />

            }
            </> :

          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((c) =>
            <CountryCard key={c.id} country={c} />
            )}
              {filtered.length === 0 &&
            <div className="col-span-full">
                  <EmptyState
                title="No economies match these filters"
                description="Widen the filters to see more results." />
              
                </div>
            }
            </div>
          }
        </Card>

        {selected.length > 0 &&
        <div className="sticky bottom-20 z-20 flex flex-wrap items-center gap-3 rounded-lg border border-accent-line bg-accent-soft px-4 py-3 lg:bottom-4">
            <Badge tone="accent">{selected.length} selected</Badge>
            <span className="text-xs text-ink-2">
              {selected.
            map((id) => countries.find((c) => c.id === id)?.name).
            join(' · ')}
            </span>
            <div className="ml-auto flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
                Clear
              </Button>
              <Link to={`/app/compare?ids=${selected.join(',')}`}>
                <Button size="sm" variant="primary">
                  Compare economies
                </Button>
              </Link>
            </div>
          </div>
        }
      </PageBody>
    </>);

}