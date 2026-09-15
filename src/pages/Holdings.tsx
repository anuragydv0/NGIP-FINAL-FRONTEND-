import React from 'react';
import { Link } from 'react-router-dom';
import { Columns3Icon, DownloadIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge, DataStatus, Delta } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Checkbox, SearchInput } from '../components/ui/Input';
import { FilterBar, FilterSelect } from '../components/ui/FilterBar';
import { Popover } from '../components/ui/Overlay';
import {
  Column,
  DataTable,
  Density,
  DensityToggle } from
'../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { holdings } from '../data/portfolio';
import { regions } from '../data/countries';
import { Holding } from '../types';
import { cx, inr, num, pct, signedInr } from '../utils/format';

const allColumns = [
'Instrument',
'Country',
'Units',
'Average cost',
'Current price',
'Invested',
'Current value',
'P&L',
'Return %',
'Weight'];


export function Holdings() {
  const [query, setQuery] = React.useState('');
  const [country, setCountry] = React.useState('All');
  const [region, setRegion] = React.useState('All');
  const [sector, setSector] = React.useState('All');
  const [density, setDensity] = React.useState<Density>('compact');
  const [visible, setVisible] = React.useState<string[]>(allColumns);

  const countryOptions = Array.from(new Set(holdings.map((h) => h.country)));
  const sectorOptions = Array.from(new Set(holdings.map((h) => h.sector)));

  const filtered = holdings.filter((h) => {
    if (query && !`${h.name} ${h.symbol}`.toLowerCase().includes(query.toLowerCase()))
    return false;
    if (country !== 'All' && h.country !== country) return false;
    if (region !== 'All' && h.region !== region) return false;
    if (sector !== 'All' && h.sector !== sector) return false;
    return true;
  });

  const totals = filtered.reduce(
    (acc, h) => ({
      invested: acc.invested + h.invested,
      value: acc.value + h.value,
      pnl: acc.pnl + h.pnl,
      weight: acc.weight + h.weight
    }),
    { invested: 0, value: 0, pnl: 0, weight: 0 }
  );

  const columnDefs: Record<string, Column<Holding>> = {
    Instrument: {
      key: 'instrument',
      header: 'Instrument',
      sortable: true,
      sortValue: (h) => h.name,
      render: (h) =>
      <Link to={`/app/instruments/${h.instrumentId}`} className="group block">
          <span className="font-mono text-[11px] font-semibold text-accent">
            {h.symbol}
          </span>
          <span className="block max-w-[260px] truncate font-medium text-ink transition-colors duration-150 ease-swift group-hover:text-accent">
            {h.name}
          </span>
        </Link>

    },
    Country: {
      key: 'country',
      header: 'Country',
      hideBelow: 'md',
      sortable: true,
      sortValue: (h) => h.country,
      render: (h) =>
      <Link
        to="/app/countries"
        className="whitespace-nowrap text-ink-2 hover:text-accent">
        
          <span aria-hidden>{h.flag}</span> {h.country}
        </Link>

    },
    Units: {
      key: 'units',
      header: 'Units',
      align: 'right',
      sortable: true,
      sortValue: (h) => h.units,
      render: (h) =>
      <span className="num tabular-nums">{num(h.units, 0)}</span>

    },
    'Average cost': {
      key: 'avgCost',
      header: 'Avg cost',
      align: 'right',
      hideBelow: 'lg',
      sortable: true,
      sortValue: (h) => h.avgCost,
      render: (h) =>
      <span className="num tabular-nums text-ink-2">{num(h.avgCost)}</span>

    },
    'Current price': {
      key: 'price',
      header: 'Price',
      align: 'right',
      sortable: true,
      sortValue: (h) => h.price,
      render: (h) =>
      <span className="num font-medium tabular-nums">{num(h.price)}</span>

    },
    Invested: {
      key: 'invested',
      header: 'Invested',
      align: 'right',
      hideBelow: 'lg',
      sortable: true,
      sortValue: (h) => h.invested,
      render: (h) =>
      <span className="num tabular-nums text-ink-2">{inr(h.invested, 0)}</span>

    },
    'Current value': {
      key: 'value',
      header: 'Current value',
      align: 'right',
      sortable: true,
      sortValue: (h) => h.value,
      render: (h) =>
      <span className="num font-medium tabular-nums">{inr(h.value, 0)}</span>

    },
    'P&L': {
      key: 'pnl',
      header: 'P&L',
      align: 'right',
      sortable: true,
      sortValue: (h) => h.pnl,
      render: (h) =>
      <span
        className={cx(
          'num font-medium tabular-nums',
          h.pnl >= 0 ? 'text-pos' : 'text-neg'
        )}>
        
          {signedInr(h.pnl, 0)}
        </span>

    },
    'Return %': {
      key: 'returnPct',
      header: 'Return',
      align: 'right',
      sortable: true,
      sortValue: (h) => h.returnPct,
      render: (h) => <Delta value={h.returnPct} size="xs" />
    },
    Weight: {
      key: 'weight',
      header: 'Weight',
      align: 'right',
      hideBelow: 'md',
      sortable: true,
      sortValue: (h) => h.weight,
      render: (h) =>
      <span className="num tabular-nums text-ink-2">{pct(h.weight, 1)}</span>

    }
  };

  const columns = visible.map((v) => columnDefs[v]).filter(Boolean);

  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Portfolio', to: '/app/portfolio' },
        { label: 'Holdings' }]
        }
        title="Holdings"
        subtitle="Every instrument you hold, with cost basis, valuation and portfolio weight."
        meta={<DataStatus status="LIVE" detail="Prices at 15:24 IST" />}
        actions={
        <>
            <Popover
            width="w-56"
            trigger={({ toggle }) =>
            <Button
              icon={<Columns3Icon className="h-3.5 w-3.5" />}
              onClick={toggle}>
              
                  Columns
                </Button>
            }>
            
              <div className="p-1.5">
                <p className="px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-4">
                  Visible columns
                </p>
                {allColumns.map((c) =>
              <div key={c} className="px-1.5 py-1">
                    <Checkbox
                  checked={visible.includes(c)}
                  onChange={(v) =>
                  setVisible((cols) =>
                  v ?
                  allColumns.filter(
                    (x) => cols.includes(x) || x === c
                  ) :
                  cols.filter((x) => x !== c)
                  )
                  }
                  label={c} />
                
                  </div>
              )}
              </div>
            </Popover>
            <DensityToggle density={density} onChange={setDensity} />
            <Button icon={<DownloadIcon className="h-3.5 w-3.5" />}>Export</Button>
          </>
        } />
      

      <PageBody className="space-y-4">
        <Card>
          <FilterBar>
            <SearchInput
              placeholder="Search holdings"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              wrapperClassName="w-full sm:w-60"
              className="h-8 text-xs" />
            
            <FilterSelect
              label="Country"
              value={country}
              options={countryOptions}
              onChange={setCountry} />
            
            <FilterSelect
              label="Region"
              value={region}
              options={regions}
              onChange={setRegion} />
            
            <FilterSelect
              label="Sector"
              value={sector}
              options={sectorOptions}
              onChange={setSector} />
            
            <Badge className="ml-auto">{filtered.length} holdings</Badge>
          </FilterBar>
          <DataTable
            columns={columns}
            rows={filtered}
            rowKey={(h) => h.id}
            density={density}
            defaultSort={{ key: 'value', dir: 'desc' }}
            emptyState={
            <EmptyState
              title="No holdings match these filters"
              description="Clear the filters to see your full portfolio."
              action={
              <Button
                size="sm"
                onClick={() => {
                  setQuery('');
                  setCountry('All');
                  setRegion('All');
                  setSector('All');
                }}>
                
                    Clear filters
                  </Button>
              } />

            } />
          
          {filtered.length > 0 &&
          <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2 border-t border-line bg-subtle px-4 py-3">
              {[
            ['Invested', inr(totals.invested, 0)],
            ['Current value', inr(totals.value, 0)],
            ['P&L', signedInr(totals.pnl, 0)],
            ['Weight', pct(totals.weight, 1)]].
            map(([k, v]) =>
            <span key={k} className="flex items-baseline gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink-4">
                    {k}
                  </span>
                  <span
                className={cx(
                  'num text-[13px] font-semibold tabular-nums',
                  k === 'P&L' && totals.pnl >= 0 ? 'text-pos' : 'text-ink'
                )}>
                
                    {v}
                  </span>
                </span>
            )}
            </div>
          }
        </Card>
      </PageBody>
    </>);

}