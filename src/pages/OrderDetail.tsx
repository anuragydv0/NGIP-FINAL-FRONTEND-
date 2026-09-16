import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckIcon, CopyIcon, PrinterIcon, XIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, MetricRow } from '../components/ui/Card';
import { Badge, DataStatus } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Alert, EmptyState } from '../components/ui/States';
import { Modal } from '../components/ui/Overlay';
import { useToast } from '../components/ui/Toast';
import { orderById } from '../data/portfolio';
import { cx, inr, num } from '../utils/format';

export function OrderDetail() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const order = orderById(id);
  const [cancelOpen, setCancelOpen] = React.useState(false);

  if (!order) {
    return (
      <PageBody>
        <Card>
          <EmptyState
            title="Order not found"
            description="This order ID does not exist in your order book."
            action={
            <Link to="/app/orders">
                <Button size="sm" variant="primary">
                  Back to orders
                </Button>
              </Link>
            } />
          
        </Card>
      </PageBody>);

  }

  const amount = order.quantity * order.price;
  const total =
  order.side === 'BUY' ?
  amount + order.charges + order.taxes :
  amount - order.charges - order.taxes;

  const timeline = [
  {
    label: 'Order placed',
    time: `${order.date} · ${order.time}`,
    done: true,
    note: `${order.orderType} order submitted from web terminal`
  },
  {
    label: 'Risk checks passed',
    time: `${order.date} · ${order.time}`,
    done: order.status !== 'Rejected',
    note:
    order.status === 'Rejected' ?
    'Rejected — quantity exceeded single-order limit' :
    'Margin, limit and compliance checks cleared'
  },
  {
    label: 'Routed to venue',
    time: `${order.date} · ${order.time}`,
    done: !['Rejected'].includes(order.status),
    note: 'Routed to primary exchange via NGIP smart order router'
  },
  {
    label:
    order.status === 'Executed' ?
    'Fully executed' :
    order.status === 'Pending' ?
    'Partially executed' :
    order.status === 'Cancelled' ?
    'Cancelled' :
    'Awaiting execution',
    time:
    order.status === 'Executed' || order.status === 'Pending' ?
    `${order.date} · ${order.time}` :
    '—',
    done: order.status === 'Executed',
    active: order.status === 'Open' || order.status === 'Pending',
    note:
    order.status === 'Executed' ?
    `${num(order.filled, 0)} units filled at ${num(order.price)}` :
    order.status === 'Pending' ?
    `${num(order.filled, 0)} of ${num(order.quantity, 0)} units filled` :
    order.status === 'Cancelled' ?
    'Cancelled by user before execution' :
    'Resting in the order book'
  }];


  const executions =
  order.filled > 0 ?
  [
  {
    time: order.time,
    qty: Math.round(order.filled * 0.6),
    price: order.price,
    venue: 'NSE'
  },
  {
    time: order.time,
    qty: order.filled - Math.round(order.filled * 0.6),
    price: Number((order.price * 0.999).toFixed(2)),
    venue: 'NSE'
  }] :

  [];

  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Orders', to: '/app/orders' },
        { label: order.id }]
        }
        title={
        <span className="flex flex-wrap items-center gap-3">
            <span
            className={cx(
              'rounded px-2 py-0.5 text-xs font-bold',
              order.side === 'BUY' ?
              'bg-pos-soft text-pos' :
              'bg-neg-soft text-neg'
            )}>
            
              {order.side}
            </span>
            {order.instrument}
            <span className="font-mono text-sm text-accent">{order.symbol}</span>
          </span>
        }
        meta={
        <div className="flex flex-wrap items-center gap-2.5">
            <Badge
            tone={
            order.status === 'Executed' ?
            'pos' :
            order.status === 'Rejected' ?
            'neg' :
            order.status === 'Cancelled' ?
            'neutral' :
            'warn'
            }
            dot>
            
              {order.status}
            </Badge>
            <span className="font-mono text-[11px] text-ink-4">{order.id}</span>
            <DataStatus status="LIVE" detail="Order gateway" />
          </div>
        }
        actions={
        <>
            <Button
            icon={<CopyIcon className="h-3.5 w-3.5" />}
            onClick={() =>
            toast.push({ tone: 'info', title: 'Order ID copied' })
            }>
            
              Copy ID
            </Button>
            <Button icon={<PrinterIcon className="h-3.5 w-3.5" />}>
              Contract note
            </Button>
            {(order.status === 'Open' || order.status === 'Pending') &&
          <Button variant="danger" onClick={() => setCancelOpen(true)}>
                Cancel order
              </Button>
          }
          </>
        } />
      

      <PageBody className="space-y-5">
        {order.status === 'Rejected' &&
        <Alert tone="neg" title="Order rejected by the risk engine">
            Quantity exceeded the single-order limit for this instrument. No
            charges were applied. Place a smaller order or split it across
            multiple tickets.
          </Alert>
        }
        {order.status === 'Pending' &&
        <Alert tone="warn" title="Partially executed">
            {num(order.filled, 0)} of {num(order.quantity, 0)} units have been
            filled. The remainder is resting at the limit price until market
            close.
          </Alert>
        }

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <Card>
              <CardHeader title="Order status" subtitle="Lifecycle timeline" />
              <ol className="p-5">
                {timeline.map((t, i) =>
                <li key={t.label} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < timeline.length - 1 &&
                  <span
                    className={cx(
                      'absolute left-[11px] top-6 h-full w-px',
                      t.done ? 'bg-accent/40' : 'bg-line'
                    )} />

                  }
                    <span
                    className={cx(
                      'relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2',
                      t.done ?
                      'border-accent bg-accent text-surface' :
                      t.active ?
                      'border-warn bg-warn-soft text-warn' :
                      'border-line bg-surface text-ink-4'
                    )}>
                    
                      {t.done ?
                    <CheckIcon className="h-3 w-3" strokeWidth={3} /> :
                    t.active ?
                    <span className="h-1.5 w-1.5 rounded-full bg-warn" /> :

                    <XIcon className="h-2.5 w-2.5" />
                    }
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="flex flex-wrap items-baseline gap-x-3">
                        <span className="text-[13px] font-semibold text-ink">
                          {t.label}
                        </span>
                        <span className="num text-[11px] tabular-nums text-ink-4">
                          {t.time}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-3">
                        {t.note}
                      </span>
                    </span>
                  </li>
                )}
              </ol>
            </Card>

            <Card>
              <CardHeader
                title="Execution history"
                subtitle={`${executions.length} fills`} />
              
              {executions.length === 0 ?
              <EmptyState
                compact
                title="No fills yet"
                description="Execution details appear here as the order is filled." /> :


              <table className="w-full">
                  <thead className="bg-subtle">
                    <tr className="border-b border-line">
                      {['Time', 'Quantity', 'Price', 'Value', 'Venue'].map((h) =>
                    <th
                      key={h}
                      className={cx(
                        'px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3',
                        h === 'Time' || h === 'Venue' ?
                        'text-left' :
                        'text-right'
                      )}>
                      
                          {h}
                        </th>
                    )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {executions.map((e, i) =>
                  <tr key={i} className="hover:bg-subtle">
                        <td className="num px-4 py-2.5 text-[13px] tabular-nums text-ink-2">
                          {e.time}
                        </td>
                        <td className="num px-4 py-2.5 text-right text-[13px] tabular-nums text-ink">
                          {num(e.qty, 0)}
                        </td>
                        <td className="num px-4 py-2.5 text-right text-[13px] tabular-nums text-ink">
                          {num(e.price)}
                        </td>
                        <td className="num px-4 py-2.5 text-right text-[13px] tabular-nums text-ink">
                          {inr(e.qty * e.price, 0)}
                        </td>
                        <td className="px-4 py-2.5 text-[13px] text-ink-2">
                          {e.venue}
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              }
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                Order details
              </p>
              <div className="mt-3">
                <MetricRow label="Order ID" value={order.id} />
                <MetricRow label="Instrument" value={order.symbol} />
                <MetricRow label="Side" value={order.side} />
                <MetricRow label="Quantity" value={num(order.quantity, 0)} />
                <MetricRow label="Filled" value={num(order.filled, 0)} />
                <MetricRow label="Order type" value={order.orderType} />
                <MetricRow label="Price" value={num(order.price)} />
                <MetricRow
                  label="Trigger"
                  value={order.orderType.startsWith('Stop') ? num(order.price * 0.98) : '—'} />
                
                <MetricRow label="Validity" value="Day" />
                <MetricRow label="Created" value={`${order.date} ${order.time}`} />
                <MetricRow label="Updated" value={`${order.date} ${order.time}`} />
                <MetricRow label="Country" value={order.country} />
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                Charges
              </p>
              <div className="mt-3">
                <MetricRow label="Traded value" value={inr(amount, 0)} />
                <MetricRow label="Brokerage & fees" value={inr(order.charges)} />
                <MetricRow label="Taxes" value={inr(order.taxes)} />
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                <span className="text-[13px] font-semibold text-ink">
                  {order.side === 'BUY' ? 'Net debit' : 'Net credit'}
                </span>
                <span className="num text-base font-semibold tabular-nums text-ink">
                  {inr(total, 0)}
                </span>
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-[13px] font-semibold text-ink">
                Related workflows
              </p>
              <div className="mt-3 space-y-2">
                {[
                ['View instrument', `/app/instruments/${order.symbol.toLowerCase()}`],
                ['Research the economy', '/app/countries'],
                ['Open portfolio', '/app/portfolio'],
                ['Transaction statement', '/app/transactions']].
                map(([label, to]) =>
                <Link
                  key={label}
                  to={to}
                  className="block rounded-md border border-line px-3 py-2 text-xs font-medium text-ink-2 transition-[border-color,background-color,color] duration-150 ease-swift hover:border-accent-line hover:bg-accent-soft hover:text-accent">
                  
                    {label} →
                  </Link>
                )}
              </div>
            </Card>
          </div>
        </div>
      </PageBody>

      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Cancel this order?"
        description="Unfilled quantity will be withdrawn from the venue immediately."
        size="sm"
        footer={
        <>
            <Button variant="ghost" onClick={() => setCancelOpen(false)}>
              Keep order
            </Button>
            <Button
            variant="danger"
            onClick={() => {
              setCancelOpen(false);
              toast.push({
                tone: 'success',
                title: 'Cancellation requested',
                description: `${order.id} will be cancelled at the venue.`
              });
              navigate('/app/orders');
            }}>
            
              Cancel order
            </Button>
          </>
        }>
        
        <div className="rounded-lg border border-line bg-subtle p-4">
          <MetricRow label="Order" value={order.id} />
          <MetricRow label="Instrument" value={order.symbol} />
          <MetricRow
            label="Unfilled quantity"
            value={num(order.quantity - order.filled, 0)} />
          
        </div>
      </Modal>
    </>);

}