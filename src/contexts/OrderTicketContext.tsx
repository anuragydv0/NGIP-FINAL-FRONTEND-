import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoIcon, LockIcon } from 'lucide-react';
import { Instrument } from '../types';
import { instruments } from '../data/instruments';
import { Drawer } from '../components/ui/Overlay';
import { Button } from '../components/ui/Button';
import { Field, Input, Select } from '../components/ui/Input';
import { Alert, SuccessPanel } from '../components/ui/States';
import { Badge, DataStatus } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import { cx, inr, num } from '../utils/format';

type Side = 'BUY' | 'SELL';
type Stage = 'entry' | 'review' | 'success' | 'error';

interface OrderTicketContextValue {
  open: (instrument: Instrument, side?: Side) => void;
}

const OrderTicketContext = React.createContext<OrderTicketContextValue>({
  open: () => {}
});

export function useOrderTicket() {
  return React.useContext(OrderTicketContext);
}

const orderTypes = ['Market', 'Limit', 'Stop Loss', 'Stop Limit'] as const;

export function OrderTicketProvider({
  children


}: {children: React.ReactNode;}) {
  const navigate = useNavigate();
  const toast = useToast();
  const [instrument, setInstrument] = React.useState<Instrument | null>(null);
  const [side, setSide] = React.useState<Side>('BUY');
  const [stage, setStage] = React.useState<Stage>('entry');
  const [quantity, setQuantity] = React.useState('50');
  const [orderType, setOrderType] =
  React.useState<(typeof orderTypes)[number]>('Limit');
  const [price, setPrice] = React.useState('');
  const [trigger, setTrigger] = React.useState('');
  const [validity, setValidity] = React.useState('Day');
  const [submitting, setSubmitting] = React.useState(false);

  const open = React.useCallback((i: Instrument, s: Side = 'BUY') => {
    setInstrument(i);
    setSide(s);
    setStage('entry');
    setQuantity('50');
    setOrderType('Limit');
    setPrice(i.price.toFixed(2));
    setTrigger('');
    setValidity('Day');
  }, []);

  const close = () => setInstrument(null);

  const qty = Number(quantity) || 0;
  const execPrice =
  orderType === 'Market' ? instrument?.price ?? 0 : Number(price) || 0;
  const amount = qty * execPrice;
  const brokerage = Math.min(amount * 0.0003, 20);
  const exchangeFees = amount * 0.0000325;
  const taxes = (brokerage + exchangeFees) * 0.18 + amount * 0.00025;
  const total = side === 'BUY' ? amount + brokerage + exchangeFees + taxes : amount - brokerage - exchangeFees - taxes;

  const qtyInvalid = qty <= 0;
  const priceInvalid = orderType !== 'Market' && execPrice <= 0;

  const submit = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      if (qty > 5000) {
        setStage('error');
        return;
      }
      setStage('success');
      toast.push({
        tone: 'success',
        title: `${side === 'BUY' ? 'Buy' : 'Sell'} order placed`,
        description: `${qty} ${instrument?.symbol} · ${orderType} · ${inr(total)}`
      });
    }, 900);
  };

  return (
    <OrderTicketContext.Provider value={{ open }}>
      {children}
      <Drawer
        open={!!instrument}
        onClose={close}
        title={
        instrument ?
        `${side === 'BUY' ? 'Buy' : 'Sell'} ${instrument.symbol}` :
        'Order'
        }
        subtitle={
        instrument &&
        <span className="flex items-center gap-2">
              <span className="truncate">{instrument.name}</span>
              <DataStatus status="LIVE" />
            </span>

        }
        footer={
        instrument && stage !== 'success' && stage !== 'error' ?
        <div className="space-y-2.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-ink-3">
                  {side === 'BUY' ? 'Total payable' : 'Net proceeds'}
                </span>
                <span className="num text-base font-semibold tabular-nums text-ink">
                  {inr(total)}
                </span>
              </div>
              {stage === 'entry' ?
          <Button
            full
            size="lg"
            variant={side === 'BUY' ? 'primary' : 'danger'}
            disabled={qtyInvalid || priceInvalid}
            onClick={() => setStage('review')}>
            
                  Review order
                </Button> :

          <div className="flex gap-2">
                  <Button
              size="lg"
              variant="secondary"
              onClick={() => setStage('entry')}>
              
                    Back
                  </Button>
                  <Button
              full
              size="lg"
              variant={side === 'BUY' ? 'primary' : 'danger'}
              loading={submitting}
              onClick={submit}>
              
                    Confirm {side === 'BUY' ? 'buy' : 'sell'} order
                  </Button>
                </div>
          }
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-ink-4">
                <LockIcon className="h-3 w-3" />
                Orders are routed to regulated venues · NGIP SEBI Reg. INZ000842
              </p>
            </div> :
        undefined
        }>
        
        {instrument &&
        <>
            {stage === 'success' ?
          <SuccessPanel
            title="Order placed successfully"
            description={`Order NG-2609-84${Math.floor(Math.random() * 900 + 100)} for ${qty} units of ${instrument.symbol} has been submitted.`}>
            
                <div className="rounded-lg border border-line bg-subtle p-4 text-left">
                  {[
              ['Instrument', `${instrument.symbol} · ${instrument.name}`],
              ['Side', side],
              ['Quantity', num(qty, 0)],
              ['Order type', orderType],
              ['Price', orderType === 'Market' ? 'Market' : inr(execPrice)],
              ['Total', inr(total)]].
              map(([k, v]) =>
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-line py-1.5 last:border-0">
                
                      <span className="text-xs text-ink-3">{k}</span>
                      <span className="num truncate text-xs font-medium tabular-nums text-ink">
                        {v}
                      </span>
                    </div>
              )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                full
                variant="primary"
                onClick={() => {
                  close();
                  navigate('/app/orders');
                }}>
                
                    View orders
                  </Button>
                  <Button full variant="secondary" onClick={close}>
                    Done
                  </Button>
                </div>
              </SuccessPanel> :
          stage === 'error' ?
          <div className="space-y-4">
                <Alert tone="neg" title="Order rejected by risk engine">
                  Quantity exceeds the single-order limit of 5,000 units for this
                  instrument. Reduce the quantity or split the order.
                </Alert>
                <Button full variant="secondary" onClick={() => setStage('entry')}>
                  Modify order
                </Button>
              </div> :

          <div className="space-y-5">
                <div className="grid grid-cols-2 gap-2">
                  {(['BUY', 'SELL'] as Side[]).map((s) =>
              <button
                key={s}
                onClick={() => setSide(s)}
                className={cx(
                  'rounded-md border py-2.5 text-[13px] font-semibold transition-[background-color,border-color,color] duration-150 ease-swift',
                  side === s ?
                  s === 'BUY' ?
                  'border-pos bg-pos text-surface' :
                  'border-neg bg-neg text-surface' :
                  'border-line-strong bg-surface text-ink-3 hover:border-ink-4 hover:text-ink'
                )}>
                
                      {s}
                    </button>
              )}
                </div>

                <div className="flex items-center justify-between rounded-lg border border-line bg-subtle px-3.5 py-2.5">
                  <div>
                    <p className="font-mono text-[11px] font-semibold text-accent">
                      {instrument.symbol}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-3">
                      <span aria-hidden>{instrument.flag}</span>{' '}
                      {instrument.country} · {instrument.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="num text-[15px] font-semibold tabular-nums text-ink">
                      {num(instrument.price)}
                    </p>
                    <p
                  className={cx(
                    'num text-[11px] tabular-nums',
                    instrument.changePct >= 0 ? 'text-pos' : 'text-neg'
                  )}>
                  
                      {instrument.changePct >= 0 ? '+' : ''}
                      {instrument.changePct.toFixed(2)}%
                    </p>
                  </div>
                </div>

                {stage === 'review' &&
            <Alert tone="accent" title="Review before confirming">
                    Verify quantity, price and validity. Market orders execute at
                    the next available price.
                  </Alert>
            }

                <fieldset
              disabled={stage === 'review'}
              className="space-y-4 disabled:opacity-70">
              
                  <Field
                label="Quantity"
                error={qtyInvalid ? 'Enter a quantity greater than zero' : undefined}>
                
                    <Input
                  type="number"
                  min={1}
                  value={quantity}
                  invalid={qtyInvalid}
                  onChange={(e) => setQuantity(e.target.value)} />
                
                  </Field>

                  <Field label="Order type">
                    <div className="grid grid-cols-4 gap-1.5">
                      {orderTypes.map((t) =>
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className={cx(
                      'rounded-md border px-1 py-1.5 text-[11px] font-medium transition-[background-color,border-color,color] duration-150 ease-swift',
                      orderType === t ?
                      'border-accent bg-accent-soft text-accent' :
                      'border-line-strong text-ink-3 hover:text-ink'
                    )}>
                    
                          {t}
                        </button>
                  )}
                    </div>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field
                  label="Price"
                  hint={orderType === 'Market' ? 'At market' : undefined}>
                  
                      <Input
                    type="number"
                    value={orderType === 'Market' ? '' : price}
                    placeholder={orderType === 'Market' ? 'Market' : '0.00'}
                    disabled={orderType === 'Market'}
                    invalid={priceInvalid}
                    onChange={(e) => setPrice(e.target.value)} />
                  
                    </Field>
                    <Field
                  label="Trigger price"
                  hint={
                  orderType.startsWith('Stop') ? undefined : 'Not required'
                  }>
                  
                      <Input
                    type="number"
                    value={trigger}
                    placeholder="0.00"
                    disabled={!orderType.startsWith('Stop')}
                    onChange={(e) => setTrigger(e.target.value)} />
                  
                    </Field>
                  </div>

                  <Field label="Validity">
                    <Select
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}>
                  
                      <option>Day</option>
                      <option>Immediate or Cancel</option>
                      <option>Good till cancelled</option>
                    </Select>
                  </Field>
                </fieldset>

                <div className="rounded-lg border border-line">
                  <p className="border-b border-line px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                    Order summary
                  </p>
                  <div className="px-3.5 py-2">
                    {[
                ['Estimated amount', inr(amount)],
                ['Brokerage', inr(brokerage)],
                ['Exchange & regulatory fees', inr(exchangeFees)],
                ['Taxes (GST, STT, stamp)', inr(taxes)]].
                map(([k, v]) =>
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-1.5 last:border-0">
                  
                        <span className="text-xs text-ink-3">{k}</span>
                        <span className="num text-xs font-medium tabular-nums text-ink">
                          {v}
                        </span>
                      </div>
                )}
                  </div>
                  <div className="flex items-baseline justify-between border-t border-line bg-subtle px-3.5 py-2.5">
                    <span className="text-xs font-semibold text-ink">
                      {side === 'BUY' ? 'Total payable' : 'Net proceeds'}
                    </span>
                    <span className="num text-[15px] font-semibold tabular-nums text-ink">
                      {inr(total)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-4">
                  <InfoIcon className="mt-0.5 h-3 w-3 shrink-0" />
                  <p>
                    Available funds {inr(218400)}. Charges shown are estimates and
                    are confirmed on execution.{' '}
                    <Badge tone="info" className="align-middle">
                      Simulated environment
                    </Badge>
                  </p>
                </div>
              </div>
          }
          </>
        }
      </Drawer>
    </OrderTicketContext.Provider>);

}

export function useAnyInstrument(symbol: string): Instrument {
  return instruments.find((i) => i.symbol === symbol) ?? instruments[0];
}