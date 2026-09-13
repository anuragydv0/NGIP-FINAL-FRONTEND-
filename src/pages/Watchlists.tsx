import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  Trash2Icon } from
'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge, Delta, RiskBadge } from '../components/ui/Badge';
import { Button, IconButton } from '../components/ui/Button';
import { Density, DensityToggle } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { Modal } from '../components/ui/Overlay';
import { Field, Input } from '../components/ui/Input';
import { Sparkline } from '../components/ui/Sparkline';
import { useToast } from '../components/ui/Toast';
import { watchlists as seedWatchlists } from '../data/content';
import { countries } from '../data/countries';
import { instruments } from '../data/instruments';
import { cx, num, pct } from '../utils/format';

export function Watchlists() {
  const toast = useToast();
  const [lists, setLists] = React.useState(seedWatchlists);
  const [activeId, setActiveId] = React.useState(seedWatchlists[0].id);
  const [density, setDensity] = React.useState<Density>('comfortable');
  const [creating, setCreating] = React.useState(false);
  const [newName, setNewName] = React.useState('');

  const active = lists.find((l) => l.id === activeId)!;

  const move = (index: number, dir: -1 | 1) => {
    setLists((all) =>
    all.map((l) => {
      if (l.id !== activeId) return l;
      const items = [...l.items];
      const target = index + dir;
      if (target < 0 || target >= items.length) return l;
      [items[index], items[target]] = [items[target], items[index]];
      return { ...l, items };
    })
    );
  };

  const remove = (id: string) => {
    setLists((all) =>
    all.map((l) =>
    l.id === activeId ? { ...l, items: l.items.filter((x) => x !== id) } : l
    )
    );
    toast.push({ tone: 'info', title: 'Removed from watchlist' });
  };

  const pad = density === 'compact' ? 'py-2' : 'py-3';

  return (
    <>
      <PageHeader
        title="Watchlists"
        subtitle="Track the economies and instruments you are actively researching."
        actions={
        <>
            <DensityToggle density={density} onChange={setDensity} />
            <Button
            variant="primary"
            icon={<PlusIcon className="h-3.5 w-3.5" />}
            onClick={() => setCreating(true)}>
            
              Create watchlist
            </Button>
          </>
        } />
      

      <PageBody>
        <div className="grid gap-5 lg:grid-cols-[248px_minmax(0,1fr)]">
          <Card className="h-fit">
            <CardHeader title="Your lists" dense />
            <ul className="p-2">
              {lists.map((l) =>
              <li key={l.id}>
                  <button
                  onClick={() => setActiveId(l.id)}
                  className={cx(
                    'flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors duration-150 ease-swift',
                    activeId === l.id ?
                    'bg-accent-soft text-accent' :
                    'text-ink-2 hover:bg-ink/[0.04]'
                  )}>
                  
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                      {l.name}
                    </span>
                    <span className="num text-[11px] tabular-nums opacity-70">
                      {l.items.length}
                    </span>
                  </button>
                </li>
              )}
            </ul>
            <div className="border-t border-line p-2">
              <button
                onClick={() => setCreating(true)}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[13px] font-medium text-ink-3 transition-colors duration-150 ease-swift hover:bg-ink/[0.04] hover:text-ink">
                
                <PlusIcon className="h-3.5 w-3.5" />
                New watchlist
              </button>
            </div>
          </Card>

          <Card>
            <CardHeader
              title={active.name}
              subtitle={`${active.items.length} ${active.kind === 'country' ? 'economies' : 'instruments'} · reorder to set priority`}
              action={
              <Badge tone="accent">
                  {active.kind === 'country' ? 'Countries' : 'Instruments'}
                </Badge>
              } />
            
            {active.items.length === 0 ?
            <EmptyState
              title="This watchlist is empty"
              description={
              active.kind === 'country' ?
              'Add economies from the countries page to track their CGI and growth.' :
              'Add instruments from discovery to monitor pricing and exposure.'
              }
              action={
              <Link
                to={
                active.kind === 'country' ?
                '/app/countries' :
                '/app/instruments'
                }>
                
                    <Button size="sm" variant="primary">
                      {active.kind === 'country' ?
                  'Browse countries' :
                  'Browse instruments'}
                    </Button>
                  </Link>
              } /> :


            <ul className="divide-y divide-line">
                {active.items.map((itemId, index) => {
                if (active.kind === 'country') {
                  const c = countries.find((x) => x.id === itemId);
                  if (!c) return null;
                  return (
                    <li
                      key={itemId}
                      className={cx('flex items-center gap-3 px-4', pad)}>
                      
                        <span className="flex flex-col">
                          <IconButton
                          label="Move up"
                          onClick={() => move(index, -1)}
                          className="h-4 w-5">
                          
                            <ChevronUpIcon className="h-3 w-3" />
                          </IconButton>
                          <IconButton
                          label="Move down"
                          onClick={() => move(index, 1)}
                          className="h-4 w-5">
                          
                            <ChevronDownIcon className="h-3 w-3" />
                          </IconButton>
                        </span>
                        <Link
                        to={`/app/countries/${c.id}`}
                        className="flex min-w-0 flex-1 items-center gap-2.5">
                        
                          <span aria-hidden>{c.flag}</span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-medium text-ink">
                              {c.name}
                            </span>
                            <span className="block text-[11px] text-ink-4">
                              {c.region} · growth {pct(c.gdpGrowth, 1)}
                            </span>
                          </span>
                        </Link>
                        <RiskBadge band={c.riskBand} />
                        <Sparkline data={c.trend} width={72} height={20} />
                        <span className="w-16 text-right">
                          <span className="num block text-[13px] font-semibold tabular-nums text-ink">
                            {c.cgi.toFixed(1)}
                          </span>
                          <Delta
                          value={c.cgiDelta}
                          suffix=""
                          size="xs"
                          showIcon={false} />
                        
                        </span>
                        <IconButton
                        label="Remove"
                        onClick={() => remove(itemId)}
                        className="hover:text-neg">
                        
                          <Trash2Icon className="h-3.5 w-3.5" />
                        </IconButton>
                      </li>);

                }
                const i = instruments.find((x) => x.id === itemId);
                if (!i) return null;
                return (
                  <li
                    key={itemId}
                    className={cx('flex items-center gap-3 px-4', pad)}>
                    
                      <span className="flex flex-col">
                        <IconButton
                        label="Move up"
                        onClick={() => move(index, -1)}
                        className="h-4 w-5">
                        
                          <ChevronUpIcon className="h-3 w-3" />
                        </IconButton>
                        <IconButton
                        label="Move down"
                        onClick={() => move(index, 1)}
                        className="h-4 w-5">
                        
                          <ChevronDownIcon className="h-3 w-3" />
                        </IconButton>
                      </span>
                      <Link
                      to={`/app/instruments/${i.id}`}
                      className="min-w-0 flex-1">
                      
                        <span className="block font-mono text-[11px] font-semibold text-accent">
                          {i.symbol}
                        </span>
                        <span className="block truncate text-[13px] font-medium text-ink">
                          {i.name}
                        </span>
                      </Link>
                      <Badge>{i.type}</Badge>
                      <Sparkline data={i.trend} width={72} height={20} />
                      <span className="w-24 text-right">
                        <span className="num block text-[13px] font-medium tabular-nums text-ink">
                          {num(i.price)}
                        </span>
                        <Delta value={i.changePct} size="xs" showIcon={false} />
                      </span>
                      <IconButton
                      label="Remove"
                      onClick={() => remove(itemId)}
                      className="hover:text-neg">
                      
                        <Trash2Icon className="h-3.5 w-3.5" />
                      </IconButton>
                    </li>);

              })}
              </ul>
            }
          </Card>
        </div>
      </PageBody>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title="Create watchlist"
        description="Watchlists can hold either economies or instruments."
        footer={
        <>
            <Button variant="ghost" onClick={() => setCreating(false)}>
              Cancel
            </Button>
            <Button
            variant="primary"
            disabled={!newName.trim()}
            onClick={() => {
              const id = `w${Date.now()}`;
              setLists((l) => [
              ...l,
              { id, name: newName.trim(), kind: 'country', items: [] }]
              );
              setActiveId(id);
              setNewName('');
              setCreating(false);
              toast.push({ tone: 'success', title: 'Watchlist created' });
            }}>
            
              Create
            </Button>
          </>
        }>
        
        <Field label="Watchlist name" required>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Frontier Asia"
            autoFocus />
          
        </Field>
      </Modal>
    </>);

}