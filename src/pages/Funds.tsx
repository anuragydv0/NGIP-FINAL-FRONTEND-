import React from 'react';
import { ArrowDownLeftIcon, ArrowUpRightIcon, BuildingIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, MetricRow, StatCard } from '../components/ui/Card';
import { Badge, DataStatus } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Drawer } from '../components/ui/Overlay';
import { Field, Input, Select } from '../components/ui/Input';
import { Alert, SuccessPanel } from '../components/ui/States';
import { Column, DataTable } from '../components/ui/Table';
import { useToast } from '../components/ui/Toast';
import { portfolioSummary, transactions } from '../data/portfolio';
import { Transaction } from '../types';
import { cx, inr, signedInr } from '../utils/format';

export function Funds() {
  const toast = useToast();
  const [mode, setMode] = React.useState<'add' | 'withdraw' | null>(null);
  const [amount, setAmount] = React.useState('25000');
  const [account, setAccount] = React.useState('HDFC Bank ••4821');
  const [done, setDone] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const fundFlows = transactions.filter((t) =>
  ['Deposit', 'Withdrawal', 'Refund'].includes(t.type)
  );

  const columns: Column<Transaction>[] = [
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    sortValue: (t) => t.date,
    render: (t) => <span className="num tabular-nums text-ink-2">{t.date}</span>
  },
  {
    key: 'type',
    header: 'Type',
    render: (t) =>
    <Badge
      tone={
      t.type === 'Deposit' ? 'pos' : t.type === 'Withdrawal' ? 'info' : 'neutral'
      }>
      
          {t.type}
        </Badge>

  },
  {
    key: 'description',
    header: 'Description',
    render: (t) => <span className="text-ink">{t.description}</span>
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


  const close = () => {
    setMode(null);
    setDone(false);
  };

  return (
    <>
      <PageHeader
        title="Funds"
        subtitle="Manage the cash available for investment and settlement."
        meta={<DataStatus status="LIVE" detail="Ledger balance" />}
        actions={
        <>
            <Button
            icon={<ArrowUpRightIcon className="h-3.5 w-3.5" />}
            onClick={() => setMode('withdraw')}>
            
              Withdraw
            </Button>
            <Button
            variant="primary"
            icon={<ArrowDownLeftIcon className="h-3.5 w-3.5" />}
            onClick={() => setMode('add')}>
            
              Add funds
            </Button>
          </>
        } />
      

      <PageBody className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Available balance"
            value={inr(portfolioSummary.availableFunds)}
            sub="Ready to invest"
            emphasis />
          
          <StatCard
            label="Invested"
            value={inr(portfolioSummary.invested, 0)}
            sub="Across 10 instruments" />
          
          <StatCard
            label="Withdrawable"
            value={inr(portfolioSummary.withdrawable)}
            sub="After settlement holds" />
          
          <StatCard
            label="Pending"
            value={inr(portfolioSummary.pending)}
            sub="1 withdrawal in progress" />
          
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <Card>
            <CardHeader
              title="Fund movement history"
              subtitle="Deposits, withdrawals and reversals"
              href="/app/transactions"
              hrefLabel="All transactions" />
            
            <DataTable
              columns={columns}
              rows={fundFlows}
              rowKey={(t) => t.id}
              defaultSort={{ key: 'date', dir: 'desc' }} />
            
          </Card>

          <div className="space-y-5">
            <Card className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                Linked bank accounts
              </p>
              <ul className="mt-3 space-y-2">
                {[
                ['HDFC Bank ••4821', 'Primary · verified'],
                ['ICICI Bank ••2210', 'Secondary · verified']].
                map(([name, meta]) =>
                <li
                  key={name}
                  className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">
                  
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink/[0.05] text-ink-3">
                      <BuildingIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium text-ink">
                        {name}
                      </span>
                      <span className="block text-[11px] text-ink-4">{meta}</span>
                    </span>
                  </li>
                )}
              </ul>
            </Card>

            <Card className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                Settlement summary
              </p>
              <div className="mt-3">
                <MetricRow label="Opening balance" value={inr(68400, 0)} />
                <MetricRow label="Deposits (30d)" value={inr(350000, 0)} />
                <MetricRow label="Withdrawals (30d)" value={inr(-50000, 0)} />
                <MetricRow label="Net investments (30d)" value={inr(-181002, 0)} />
                <MetricRow label="Charges & taxes (30d)" value={inr(-2418, 0)} />
              </div>
            </Card>
          </div>
        </div>
      </PageBody>

      <Drawer
        open={mode !== null}
        onClose={close}
        title={mode === 'add' ? 'Add funds' : 'Withdraw funds'}
        subtitle={
        mode === 'add' ?
        'Transfer from a linked bank account' :
        `Withdrawable balance ${inr(portfolioSummary.withdrawable)}`
        }
        footer={
        !done ?
        <Button
          full
          size="lg"
          variant={mode === 'add' ? 'primary' : 'secondary'}
          loading={submitting}
          disabled={!Number(amount)}
          onClick={() => {
            setSubmitting(true);
            window.setTimeout(() => {
              setSubmitting(false);
              setDone(true);
              toast.push({
                tone: 'success',
                title:
                mode === 'add' ?
                'Deposit initiated' :
                'Withdrawal requested',
                description: `${inr(Number(amount))} · ${account}`
              });
            }, 800);
          }}>
          
              {mode === 'add' ? 'Continue to payment' : 'Request withdrawal'}
            </Button> :
        undefined
        }>
        
        {done ?
        <SuccessPanel
          title={mode === 'add' ? 'Deposit initiated' : 'Withdrawal requested'}
          description={
          mode === 'add' ?
          `${inr(Number(amount))} will reflect in your available balance within minutes of bank confirmation.` :
          `${inr(Number(amount))} will be credited to ${account} within one working day.`
          }>
          
            <Button full variant="secondary" onClick={close}>
              Done
            </Button>
          </SuccessPanel> :

        <div className="space-y-4">
            <Field label="Amount" required hint="Minimum ₹500 per transaction">
              <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} />
            
            </Field>
            <div className="flex flex-wrap gap-2">
              {[10000, 25000, 50000, 100000].map((a) =>
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className={cx(
                'rounded-md border px-3 py-1.5 text-xs font-medium transition-[border-color,background-color,color] duration-150 ease-swift',
                Number(amount) === a ?
                'border-accent bg-accent-soft text-accent' :
                'border-line-strong text-ink-3 hover:text-ink'
              )}>
              
                  {inr(a, 0)}
                </button>
            )}
            </div>
            <Field label="Bank account">
              <Select value={account} onChange={(e) => setAccount(e.target.value)}>
                <option>HDFC Bank ••4821</option>
                <option>ICICI Bank ••2210</option>
              </Select>
            </Field>
            <Alert tone="info" title="Settlement timeline">
              {mode === 'add' ?
            'Bank transfers usually settle instantly. NEFT transfers may take up to two hours.' :
            'Withdrawals are processed on working days and settle within T+1.'}
            </Alert>
          </div>
        }
      </Drawer>
    </>);

}