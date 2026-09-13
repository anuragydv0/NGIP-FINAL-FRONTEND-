import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DownloadIcon, SearchIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge, DataStatus } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/Input';
import { FilterBar, FilterSelect } from '../components/ui/FilterBar';
import { Tabs } from '../components/ui/Tabs';
import { Column, DataTable, Density, DensityToggle } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { orders } from '../data/portfolio';
import { Order, OrderStatus } from '../types';
import { cx, num } from '../utils/format';

const statusTone: Record<OrderStatus, 'pos' | 'warn' | 'neutral' | 'neg' | 'info'> = {
  Executed: 'pos',
  Open: 'info',
  Pending: 'warn',
  Cancelled: 'neutral',
  Rejected: 'neg'
};

export function Orders() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [side, setSide] = React.useState('All');
  const [density, setDensity] = React.useState<Density>('compact');

  const counts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const tabs = [
  { id: 'all', label: 'All', count: orders.length },
  { id: 'Open', label: 'Open', count: counts.Open ?? 0 },
  { id: 'Pending', label: 'Pending', count: counts.Pending ?? 0 },
  { id: 'Executed', label: 'Executed', count: counts.Executed ?? 0 },
  { id: 'Cancelled', label: 'Cancelled', count: counts.Cancelled ?? 0 },
  { id: 'Rejected', label: 'Rejected', count: counts.Rejected ?? 0 }];


  const rows = orders.filter((o) => {
    if (tab !== 'all' && o.status !== tab) return false;
    if (side !== 'All' && o.side !== side) return false;
    if (
    query &&
    !`${o.id} ${o.symbol} ${o.instrument}`.
    toLowerCase().
    includes(query.toLowerCase()))

    return false;
    return true;
  });

  const columns: Column<Order>[] = [
  {
    key: 'id',
    header: 'Order ID',
    sortable: true,
    sortValue: (o) => o.id,
    render: (o) =>
    <span className="font-mono text-[11px] font-medium text-ink-2">
          {o.id}
        </span>

  },
  {
    key: 'instrument',
    header: 'Instrument',
    sortable: true,
    sortValue: (o) => o.instrument,
    render: (o) =>
    <span className="block">
          <span className="font-mono text-[11px] font-semibold text-accent">
            {o.symbol}
          </span>
          <span className="block max-w-[240px] truncate font-medium text-ink">
            {o.instrument}
          </span>
        </span>

  },
  {
    key: 'side',
    header: 'Side',
    render: (o) =>
    <span
      className={cx(
        'rounded px-1.5 py-0.5 text-[10px] font-bold',
        o.side === 'BUY' ? 'bg-pos-soft text-pos' : 'bg-neg-soft text-neg'
      )}>
      
          {o.side}
        </span>

  },
  {
    key: 'quantity',
    header: 'Quantity',
    align: 'right',
    sortable: true,
    sortValue: (o) => o.quantity,
    render: (o) =>
    <span className="num tabular-nums">
          {num(o.filled, 0)} / {num(o.quantity, 0)}
        </span>

  },
  {
    key: 'price',
    header: 'Price',
    align: 'right',
    sortable: true,
    sortValue: (o) => o.price,
    render: (o) =>
    <span className="num font-medium tabular-nums">{num(o.price)}</span>

  },
  {
    key: 'type',
    header: 'Type',
    align: 'right',
    hideBelow: 'md',
    render: (o) => <span className="text-ink-2">{o.orderType}</span>
  },
  {
    key: 'status',
    header: 'Status',
    align: 'right',
    render: (o) => <Badge tone={statusTone[o.status]}>{o.status}</Badge>
  },
  {
    key: 'time',
    header: 'Time',
    align: 'right',
    hideBelow: 'lg',
    sortable: true,
    sortValue: (o) => `${o.date} ${o.time}`,
    render: (o) =>
    <span className="num block whitespace-nowrap tabular-nums text-ink-2">
          {o.time}
          <span className="block text-[11px] text-ink-4">{o.date}</span>
        </span>

  }];


  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Full order book with execution status and routing detail."
        meta={<DataStatus status="LIVE" detail="Order gateway connected" />}
        actions={
        <>
            <DensityToggle density={density} onChange={setDensity} />
            <Button icon={<DownloadIcon className="h-3.5 w-3.5" />}>Export</Button>
            <Link to="/app/instruments">
              <Button variant="primary">Place new order</Button>
            </Link>
          </>
        }
        tabs={<Tabs tabs={tabs} value={tab} onChange={setTab} />} />
      

      <PageBody>
        <Card>
          <FilterBar>
            <SearchInput
              placeholder="Search order ID or instrument"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              wrapperClassName="w-full sm:w-72"
              className="h-8 text-xs" />
            
            <FilterSelect
              label="Side"
              value={side}
              options={['BUY', 'SELL']}
              onChange={setSide} />
            
            <Badge className="ml-auto">{rows.length} orders</Badge>
          </FilterBar>
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(o) => o.id}
            density={density}
            onRowClick={(o) => navigate(`/app/orders/${o.id}`)}
            defaultSort={{ key: 'time', dir: 'desc' }}
            emptyState={
            <EmptyState
              icon={<SearchIcon className="h-4 w-4" />}
              title="No orders in this view"
              description="Adjust the status tab or clear the search to see other orders."
              action={
              <Button
                size="sm"
                onClick={() => {
                  setQuery('');
                  setSide('All');
                  setTab('all');
                }}>
                
                    Reset filters
                  </Button>
              } />

            } />
          
        </Card>
      </PageBody>
    </>);

}