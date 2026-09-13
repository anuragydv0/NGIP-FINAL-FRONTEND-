import React from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, StatCard } from '../components/ui/Card';
import { Badge, DataStatus, Delta } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Segmented } from '../components/ui/Tabs';
import { Column, DataTable, Density, DensityToggle } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { positions } from '../data/portfolio';
import { instruments } from '../data/instruments';
import { useOrderTicket } from '../contexts/OrderTicketContext';
import { cx, inr, num, signedInr } from '../utils/format';

type Position = (typeof positions)[number];

export function Positions() {
  const orderTicket = useOrderTicket();
  const [filter, setFilter] = React.useState('All');
  const [density, setDensity] = React.useState<Density>('compact');

  const rows = positions.filter((p) =>
  filter === 'All' ? true : filter === 'Long' ? p.side === 'LONG' : p.side === 'SHORT'
  );

  const dayPnl = rows.reduce((a, p) => a + p.dayPnl, 0);
  const unrealized = rows.reduce((a, p) => a + p.unrealized, 0);
  const exposure = rows.reduce((a, p) => a + p.exposure, 0);

  const columns: Column<Position>[] = [
  {
    key: 'instrument',
    header: 'Instrument',
    sortable: true,
    sortValue: (p) => p.instrument,
    render: (p) =>
    <Link
      to={`/app/instruments/${p.symbol.toLowerCase()}`}
      className="group block">
      
          <span className="font-mono text-[11px] font-semibold text-accent">
            {p.symbol}
          </span>
          <span className="block max-w-[240px] truncate font-medium text-ink transition-colors duration-150 ease-swift group-hover:text-accent">
            {p.instrument}
          </span>
        </Link>

  },
  {
    key: 'side',
    header: 'Side',
    render: (p) =>
    <Badge tone={p.side === 'LONG' ? 'pos' : 'neg'}>{p.side}</Badge>

  },
  {
    key: 'qty',
    header: 'Quantity',
    align: 'right',
    sortable: true,
    sortValue: (p) => p.quantity,
    render: (p) => <span className="num tabular-nums">{num(p.quantity, 0)}</span>
  },
  {
    key: 'avg',
    header: 'Avg price',
    align: 'right',
    hideBelow: 'md',
    render: (p) =>
    <span className="num tabular-nums text-ink-2">{num(p.avgPrice)}</span>

  },
  {
    key: 'price',
    header: 'Current price',
    align: 'right',
    sortable: true,
    sortValue: (p) => p.price,
    render: (p) =>
    <span className="num font-medium tabular-nums">{num(p.price)}</span>

  },
  {
    key: 'dayPnl',
    header: 'Day P&L',
    align: 'right',
    sortable: true,
    sortValue: (p) => p.dayPnl,
    render: (p) =>
    <span
      className={cx(
        'num font-medium tabular-nums',
        p.dayPnl >= 0 ? 'text-pos' : 'text-neg'
      )}>
      
          {signedInr(p.dayPnl, 0)}
        </span>

  },
  {
    key: 'unrealized',
    header: 'Unrealised P&L',
    align: 'right',
    sortable: true,
    sortValue: (p) => p.unrealized,
    render: (p) =>
    <span className="flex flex-col items-end">
          <span
        className={cx(
          'num font-medium tabular-nums',
          p.unrealized >= 0 ? 'text-pos' : 'text-neg'
        )}>
        
            {signedInr(p.unrealized, 0)}
          </span>
          <Delta
        value={p.unrealized / (p.quantity * p.avgPrice) * 100}
        size="xs"
        showIcon={false} />
      
        </span>

  },
  {
    key: 'exposure',
    header: 'Exposure',
    align: 'right',
    hideBelow: 'lg',
    sortable: true,
    sortValue: (p) => p.exposure,
    render: (p) =>
    <span className="num tabular-nums text-ink-2">{inr(p.exposure, 0)}</span>

  },
  {
    key: 'status',
    header: 'Status',
    align: 'right',
    hideBelow: 'lg',
    render: (p) =>
    <Badge tone={p.status === 'Open' ? 'info' : 'warn'}>{p.status}</Badge>

  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    width: '96px',
    render: (p) => {
      const ins = instruments.find(
        (i) => i.symbol.toLowerCase() === p.symbol.toLowerCase()
      );
      return (
        <Button
          size="xs"
          variant="secondary"
          onClick={() => ins && orderTicket.open(ins, 'SELL')}>
          
            Close
          </Button>);

    }
  }];


  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Portfolio', to: '/app/portfolio' },
        { label: 'Positions' }]
        }
        title="Positions"
        subtitle="Open exposure with intraday and unrealised profit and loss."
        meta={<DataStatus status="LIVE" detail="Refreshing every 5s" />}
        actions={
        <>
            <Segmented
            options={['All', 'Long', 'Short']}
            value={filter}
            onChange={setFilter} />
          
            <DensityToggle density={density} onChange={setDensity} />
          </>
        } />
      

      <PageBody className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Open positions"
            value={rows.length}
            sub={`${rows.filter((p) => p.side === 'LONG').length} long · ${rows.filter((p) => p.side === 'SHORT').length} short`} />
          
          <StatCard
            label="Day P&L"
            value={signedInr(dayPnl)}
            tone={dayPnl >= 0 ? 'pos' : 'neg'} />
          
          <StatCard
            label="Unrealised P&L"
            value={signedInr(unrealized, 0)}
            tone={unrealized >= 0 ? 'pos' : 'neg'} />
          
          <StatCard label="Gross exposure" value={inr(exposure, 0)} />
        </div>

        <Card>
          <CardHeader
            title="Open positions"
            subtitle="Sorted by exposure"
            href="/app/orders"
            hrefLabel="Order book" />
          
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(p) => p.id}
            density={density}
            defaultSort={{ key: 'exposure', dir: 'desc' }}
            emptyState={
            <EmptyState
              title="No open positions"
              description="Positions appear here once an order is executed."
              action={
              <Link to="/app/instruments">
                    <Button size="sm" variant="primary">
                      Discover instruments
                    </Button>
                  </Link>
              } />

            } />
          
        </Card>
      </PageBody>
    </>);

}