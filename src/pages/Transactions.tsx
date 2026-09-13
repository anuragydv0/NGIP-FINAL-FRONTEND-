import React from 'react';
import { DownloadIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input, SearchInput } from '../components/ui/Input';
import { FilterBar, FilterSelect, Pagination } from '../components/ui/FilterBar';
import { Tabs } from '../components/ui/Tabs';
import { Column, DataTable, Density, DensityToggle } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { transactions } from '../data/portfolio';
import { Transaction } from '../types';
import { cx, inr, signedInr } from '../utils/format';

const typeTabs = [
{ id: 'all', label: 'All' },
{ id: 'Deposit', label: 'Deposits' },
{ id: 'Withdrawal', label: 'Withdrawals' },
{ id: 'Investment', label: 'Investments' },
{ id: 'Redemption', label: 'Redemptions' },
{ id: 'Fee', label: 'Fees' },
{ id: 'Refund', label: 'Refunds' }];


export function Transactions() {
  const [tab, setTab] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState('All');
  const [instrument, setInstrument] = React.useState('All');
  const [from, setFrom] = React.useState('');
  const [density, setDensity] = React.useState<Density>('compact');
  const [page, setPage] = React.useState(1);

  const instrumentOptions = Array.from(
    new Set(transactions.map((t) => t.instrument).filter(Boolean) as string[])
  );

  const rows = transactions.filter((t) => {
    if (tab !== 'all' && t.type !== tab) return false;
    if (status !== 'All' && t.status !== status) return false;
    if (instrument !== 'All' && t.instrument !== instrument) return false;
    if (
    query &&
    !`${t.description} ${t.reference}`.toLowerCase().includes(query.toLowerCase()))

    return false;
    return true;
  });

  const credits = rows.filter((t) => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const debits = rows.filter((t) => t.amount < 0).reduce((a, t) => a + t.amount, 0);

  const columns: Column<Transaction>[] = [
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    sortValue: (t) => t.date,
    render: (t) =>
    <span className="num whitespace-nowrap tabular-nums text-ink-2">
          {t.date}
        </span>

  },
  {
    key: 'type',
    header: 'Type',
    render: (t) =>
    <Badge
      tone={
      t.type === 'Deposit' || t.type === 'Redemption' || t.type === 'Refund' ?
      'pos' :
      t.type === 'Fee' ?
      'warn' :
      'info'
      }>
      
          {t.type}
        </Badge>

  },
  {
    key: 'description',
    header: 'Description',
    render: (t) =>
    <span className="block">
          <span className="block text-ink">{t.description}</span>
          {t.instrument &&
      <span className="block font-mono text-[11px] text-ink-4">
              {t.instrument}
            </span>
      }
        </span>

  },
  {
    key: 'reference',
    header: 'Reference',
    hideBelow: 'lg',
    render: (t) =>
    <span className="font-mono text-[11px] text-ink-4">{t.reference}</span>

  },
  {
    key: 'status',
    header: 'Status',
    align: 'right',
    render: (t) =>
    <Badge
      tone={
      t.status === 'Completed' ? 'pos' : t.status === 'Pending' ? 'warn' : 'neg'
      }>
      
          {t.status}
        </Badge>

  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'right',
    sortable: true,
    sortValue: (t) => t.amount,
    render: (t) =>
    <span
      className={cx(
        'num font-medium tabular-nums',
        t.amount >= 0 ? 'text-pos' : 'text-ink'
      )}>
      
          {signedInr(t.amount, 0)}
        </span>

  }];


  return (
    <>
      <PageHeader
        title="Transactions"
        subtitle="Complete ledger of deposits, investments, redemptions, fees and refunds."
        actions={
        <>
            <DensityToggle density={density} onChange={setDensity} />
            <Button icon={<DownloadIcon className="h-3.5 w-3.5" />}>
              Download statement
            </Button>
          </>
        }
        tabs={<Tabs tabs={typeTabs} value={tab} onChange={setTab} />} />
      

      <PageBody>
        <Card>
          <FilterBar>
            <SearchInput
              placeholder="Search description or reference"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              wrapperClassName="w-full sm:w-72"
              className="h-8 text-xs" />
            
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              aria-label="From date"
              className="h-8 w-40 text-xs" />
            
            <FilterSelect
              label="Status"
              value={status}
              options={['Completed', 'Pending', 'Failed']}
              onChange={setStatus} />
            
            <FilterSelect
              label="Instrument"
              value={instrument}
              options={instrumentOptions}
              onChange={setInstrument} />
            
            <Badge className="ml-auto">{rows.length} entries</Badge>
          </FilterBar>
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(t) => t.id}
            density={density}
            defaultSort={{ key: 'date', dir: 'desc' }}
            emptyState={
            <EmptyState
              title="No transactions found"
              description="Adjust the type, status or date filters."
              action={
              <Button
                size="sm"
                onClick={() => {
                  setQuery('');
                  setStatus('All');
                  setInstrument('All');
                  setTab('all');
                  setFrom('');
                }}>
                
                    Clear filters
                  </Button>
              } />

            } />
          
          {rows.length > 0 &&
          <>
              <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2 border-t border-line bg-subtle px-4 py-3">
                <span className="flex items-baseline gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink-4">
                    Credits
                  </span>
                  <span className="num text-[13px] font-semibold tabular-nums text-pos">
                    {inr(credits, 0)}
                  </span>
                </span>
                <span className="flex items-baseline gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink-4">
                    Debits
                  </span>
                  <span className="num text-[13px] font-semibold tabular-nums text-ink">
                    {inr(debits, 0)}
                  </span>
                </span>
                <span className="flex items-baseline gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink-4">
                    Net
                  </span>
                  <span className="num text-[13px] font-semibold tabular-nums text-ink">
                    {signedInr(credits + debits, 0)}
                  </span>
                </span>
              </div>
              <Pagination
              page={page}
              pageCount={Math.max(1, Math.ceil(rows.length / 25))}
              total={rows.length}
              onPage={setPage} />
            
            </>
          }
        </Card>
      </PageBody>
    </>);

}