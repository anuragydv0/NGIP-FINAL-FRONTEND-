import React from 'react';
import { Link } from 'react-router-dom';
import { GridIcon, ListIcon, StarIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge, DataStatus, Delta, RiskBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/Input';
import { FilterBar, FilterSelect, Pagination } from '../components/ui/FilterBar';
import {
  Column,
  DataTable,
  Density,
  DensityToggle } from
'../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { InstrumentCard } from '../components/domain/Cards';
import { instruments, instrumentTypes } from '../data/instruments';
import { countries, regions } from '../data/countries';
import { useOrderTicket } from '../contexts/OrderTicketContext';
import { LiveCell } from '../contexts/LiveDataContext';
import { Instrument } from '../types';
import { cx, num, pct } from '../utils/format';

export function Instruments() {
  const orderTicket = useOrderTicket();
  const [query, setQuery] = React.useState('');
  const [type, setType] = React.useState('All');
  const [country, setCountry] = React.useState('All');
  const [region, setRegion] = React.useState('All');
  const [sector, setSector] = React.useState('All');
  const [currency, setCurrency] = React.useState('All');
  const [risk, setRisk] = React.useState('All');
  const [provider, setProvider] = React.useState('All');
  const [liquidity, setLiquidity] = React.useState('All');
  const [view, setView] = React.useState<'table' | 'grid'>('table');
  const [density, setDensity] = React.useState<Density>('comfortable');
  const [page, setPage] = React.useState(1);
  const [watched, setWatched] = React.useState<string[]>(['ngin', 'bicap']);

  const sectors = Array.from(new Set(instruments.map((i) => i.sector)));
  const providers = Array.from(new Set(instruments.map((i) => i.provider)));
  const currencies = Array.from(new Set(instruments.map((i) => i.currency)));

  const filtered = instruments.filter((i) => {
    if (
    query &&
    !`${i.name} ${i.symbol}`.toLowerCase().includes(query.toLowerCase()))

    return false;
    if (type !== 'All' && i.type !== type) return false;
    if (country !== 'All' && i.country !== country) return false;
    if (region !== 'All' && i.region !== region) return false;
    if (sector !== 'All' && i.sector !== sector) return false;
    if (currency !== 'All' && i.currency !== currency) return false;
    if (risk !== 'All' && i.risk !== risk) return false;
    if (provider !== 'All' && i.provider !== provider) return false;
    if (liquidity !== 'All' && i.liquidity !== liquidity) return false;
    return true;
  });

  const columns: Column<Instrument>[] = [
  {
    key: 'instrument',
    header: 'Instrument',
    sortable: true,
    sortValue: (i) => i.name,
    render: (i) =>
    <Link to={`/app/instruments/${i.id}`} className="group flex flex-col">
          <span className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-accent">
              {i.symbol}
            </span>
            <Badge>{i.type}</Badge>
          </span>
          <span className="mt-0.5 truncate font-medium text-ink transition-colors duration-150 ease-swift group-hover:text-accent">
            {i.name}
          </span>
        </Link>

  },
  {
    key: 'country',
    header: 'Country',
    hideBelow: 'md',
    sortable: true,
    sortValue: (i) => i.country,
    render: (i) =>
    <span className="whitespace-nowrap text-ink-2">
          <span aria-hidden>{i.flag}</span> {i.country}
        </span>

  },
  {
    key: 'price',
    header: 'Price',
    align: 'right',
    sortable: true,
    sortValue: (i) => i.price,
    render: (i) => <LiveCell type="instrument" id={i.id} fallback={i.price} />

  },
  {
    key: 'change',
    header: 'Change',
    align: 'right',
    sortable: true,
    sortValue: (i) => i.changePct,
    render: (i) => <Delta value={i.changePct} size="xs" />
  },
  {
    key: 'risk',
    header: 'Risk',
    align: 'right',
    hideBelow: 'lg',
    render: (i) => <RiskBadge band={i.risk} />
  },
  {
    key: 'aum',
    header: 'AUM (₹ Cr)',
    align: 'right',
    hideBelow: 'lg',
    sortable: true,
    sortValue: (i) => i.aum,
    render: (i) =>
    <span className="num tabular-nums text-ink-2">{num(i.aum, 0)}</span>

  },
  {
    key: 'expense',
    header: 'Expense',
    align: 'right',
    hideBelow: 'xl',
    sortable: true,
    sortValue: (i) => i.expenseRatio,
    render: (i) =>
    <span className="num tabular-nums text-ink-2">
          {pct(i.expenseRatio)}
        </span>

  },
  {
    key: 'liquidity',
    header: 'Liquidity',
    align: 'right',
    hideBelow: 'xl',
    render: (i) =>
    <Badge
      tone={
      i.liquidity === 'High' ?
      'pos' :
      i.liquidity === 'Medium' ?
      'info' :
      'warn'
      }>
      
          {i.liquidity}
        </Badge>

  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right',
    width: '188px',
    render: (i) =>
    <span className="flex items-center justify-end gap-1.5">
          <button
        onClick={(e) => {
          e.stopPropagation();
          setWatched((w) =>
          w.includes(i.id) ? w.filter((x) => x !== i.id) : [...w, i.id]
          );
        }}
        aria-label="Toggle watchlist"
        className="rounded p-1.5 text-ink-4 transition-colors duration-150 ease-swift hover:bg-ink/[0.05] hover:text-warn">
        
            <StarIcon
          className={cx(
            'h-3.5 w-3.5',
            watched.includes(i.id) && 'fill-warn text-warn'
          )} />
        
          </button>
          <Link
        to={`/app/instruments/${i.id}`}
        className="rounded border border-line-strong px-2 py-1 text-[11px] font-medium text-ink-2 transition-colors duration-150 ease-swift hover:bg-subtle">
        
            View
          </Link>
          <Button size="xs" variant="primary" onClick={() => orderTicket.open(i)}>
            Trade
          </Button>
        </span>

  }];


  return (
    <>
      <PageHeader
        title="Instrument discovery"
        subtitle="ETFs, funds, bonds, government securities and equity baskets that provide country and thematic exposure."
        meta={
        <div className="flex flex-wrap items-center gap-3">
            <DataStatus status="DELAYED" detail="Pricing" />
            <Badge>{instruments.length} instruments in coverage</Badge>
          </div>
        }
        actions={
        <>
            <Link to="/app/watchlists">
              <Button icon={<StarIcon className="h-3.5 w-3.5" />}>
                Watchlists
              </Button>
            </Link>
            <Link to="/app/countries">
              <Button variant="primary">Start from a country</Button>
            </Link>
          </>
        } />
      

      <PageBody>
        <Card>
          <FilterBar>
            <SearchInput
              placeholder="Search name or symbol"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              wrapperClassName="w-full sm:w-56"
              className="h-8 text-xs" />
            
            <FilterSelect
              label="Type"
              value={type}
              options={instrumentTypes}
              onChange={setType} />
            
            <FilterSelect
              label="Country"
              value={country}
              options={countries.map((c) => c.name)}
              onChange={setCountry} />
            
            <FilterSelect
              label="Region"
              value={region}
              options={regions}
              onChange={setRegion} />
            
            <FilterSelect
              label="Sector"
              value={sector}
              options={sectors}
              onChange={setSector} />
            
            <FilterSelect
              label="Currency"
              value={currency}
              options={currencies}
              onChange={setCurrency} />
            
            <FilterSelect
              label="Risk"
              value={risk}
              options={['Low', 'Moderate', 'Elevated', 'High']}
              onChange={setRisk} />
            
            <FilterSelect
              label="Provider"
              value={provider}
              options={providers}
              onChange={setProvider} />
            
            <FilterSelect
              label="Liquidity"
              value={liquidity}
              options={['High', 'Medium', 'Low']}
              onChange={setLiquidity} />
            
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
                        'bg-ink text-surface' :
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
              rowKey={(i) => i.id}
              density={density}
              defaultSort={{ key: 'aum', dir: 'desc' }}
              emptyState={
              <EmptyState
                title="No instruments match these filters"
                description="Try widening the asset type, country or liquidity filters."
                action={
                <Button
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    setType('All');
                    setCountry('All');
                    setRegion('All');
                    setSector('All');
                    setCurrency('All');
                    setRisk('All');
                    setProvider('All');
                    setLiquidity('All');
                  }}>
                  
                        Clear all filters
                      </Button>
                } />

              } />
            
              {filtered.length > 0 &&
            <Pagination
              page={page}
              pageCount={Math.max(1, Math.ceil(filtered.length / 20))}
              total={filtered.length}
              onPage={setPage} />

            }
            </> :

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((i) =>
            <InstrumentCard
              key={i.id}
              instrument={i}
              onTrade={(x) => orderTicket.open(x)} />

            )}
            </div>
          }
        </Card>
      </PageBody>
    </>);

}