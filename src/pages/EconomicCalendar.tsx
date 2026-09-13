import React from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge, DataStatus } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FilterBar, FilterSelect } from '../components/ui/FilterBar';
import { Segmented } from '../components/ui/Tabs';
import { Column, DataTable, Density, DensityToggle } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { calendarEvents } from '../data/content';
import { CalendarEvent } from '../types';
import { cx } from '../utils/format';

export function EconomicCalendar() {
  const [country, setCountry] = React.useState('All');
  const [importance, setImportance] = React.useState('All');
  const [type, setType] = React.useState('All');
  const [range, setRange] = React.useState('This week');
  const [density, setDensity] = React.useState<Density>('comfortable');

  const countryOptions = Array.from(new Set(calendarEvents.map((e) => e.country)));
  const typeOptions = Array.from(new Set(calendarEvents.map((e) => e.type)));

  const rows = calendarEvents.filter(
    (e) =>
    (country === 'All' || e.country === country) && (
    importance === 'All' || e.importance === importance) && (
    type === 'All' || e.type === type)
  );

  const grouped = rows.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    acc[e.date] = acc[e.date] ? [...acc[e.date], e] : [e];
    return acc;
  }, {});

  const columns: Column<CalendarEvent>[] = [
  {
    key: 'time',
    header: 'Time',
    width: '72px',
    render: (e) =>
    <span className="num tabular-nums text-ink-2">{e.time}</span>

  },
  {
    key: 'country',
    header: 'Country',
    render: (e) =>
    <span className="whitespace-nowrap text-ink-2">
          <span aria-hidden>{e.flag}</span> {e.country}
        </span>

  },
  {
    key: 'event',
    header: 'Event',
    render: (e) =>
    <span className="block">
          <span className="font-medium text-ink">{e.event}</span>
          <span className="block text-[11px] text-ink-4">{e.type}</span>
        </span>

  },
  {
    key: 'previous',
    header: 'Previous',
    align: 'right',
    hideBelow: 'sm',
    render: (e) =>
    <span className="num tabular-nums text-ink-3">{e.previous}</span>

  },
  {
    key: 'expected',
    header: 'Expected',
    align: 'right',
    render: (e) =>
    <span className="num tabular-nums text-ink-2">{e.expected}</span>

  },
  {
    key: 'actual',
    header: 'Actual',
    align: 'right',
    render: (e) =>
    e.actual ?
    <span className="num font-semibold tabular-nums text-ink">
            {e.actual}
          </span> :

    <span className="text-[11px] uppercase tracking-wider text-ink-4">
            Awaiting
          </span>

  },
  {
    key: 'importance',
    header: 'Importance',
    align: 'right',
    render: (e) =>
    <span className="flex items-center justify-end gap-1.5">
          {[0, 1, 2].map((i) =>
      <span
        key={i}
        className={cx(
          'h-1.5 w-1.5 rounded-full',
          e.importance === 'High' && i < 3 ||
          e.importance === 'Medium' && i < 2 ||
          e.importance === 'Low' && i < 1 ?
          e.importance === 'High' ?
          'bg-neg' :
          e.importance === 'Medium' ?
          'bg-warn' :
          'bg-ink-4' :
          'bg-ink/10'
        )} />

      )}
          <span className="ml-1 text-[11px] text-ink-3">{e.importance}</span>
        </span>

  }];


  return (
    <>
      <PageHeader
        title="Economic calendar"
        subtitle="Scheduled data releases and central bank decisions across the coverage universe."
        meta={<DataStatus status="LIVE" detail="All times IST" />}
        actions={
        <>
            <Segmented
            options={['Today', 'This week', 'This month']}
            value={range}
            onChange={setRange} />
          
            <DensityToggle density={density} onChange={setDensity} />
            <Button variant="primary">Create event alert</Button>
          </>
        } />
      

      <PageBody className="space-y-5">
        <Card>
          <FilterBar>
            <FilterSelect
              label="Country"
              value={country}
              options={countryOptions}
              onChange={setCountry} />
            
            <FilterSelect
              label="Importance"
              value={importance}
              options={['High', 'Medium', 'Low']}
              onChange={setImportance} />
            
            <FilterSelect
              label="Event type"
              value={type}
              options={typeOptions}
              onChange={setType} />
            
            <Badge className="ml-auto">{rows.length} events</Badge>
          </FilterBar>

          {rows.length === 0 ?
          <EmptyState
            title="No events match these filters"
            description="Widen the country or importance filters."
            action={
            <Button
              size="sm"
              onClick={() => {
                setCountry('All');
                setImportance('All');
                setType('All');
              }}>
              
                  Clear filters
                </Button>
            } /> :


          Object.entries(grouped).map(([date, events]) =>
          <div key={date}>
                <div className="flex items-center gap-3 border-b border-line bg-subtle px-4 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-2">
                    {date}
                  </span>
                  <span className="num text-[11px] tabular-nums text-ink-4">
                    {events.length} events
                  </span>
                  {events.some((e) => e.importance === 'High') &&
              <Badge tone="neg">High impact</Badge>
              }
                </div>
                <DataTable
              columns={columns}
              rows={events}
              rowKey={(e) => e.id}
              density={density}
              stickyHeader={false} />
            
              </div>
          )
          }
        </Card>

        <Card>
          <CardHeader
            title="This week's high-impact releases"
            subtitle="Events likely to move the economies you hold" />
          
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {calendarEvents.
            filter((e) => e.importance === 'High').
            map((e) =>
            <div
              key={e.id}
              className="rounded-lg border border-line p-4 transition-[border-color] duration-150 ease-swift hover:border-line-strong">
              
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink-3">
                      <span aria-hidden>{e.flag}</span> {e.country}
                    </span>
                    <span className="num text-[11px] tabular-nums text-ink-4">
                      {e.date} · {e.time}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] font-semibold leading-snug text-ink">
                    {e.event}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-2.5">
                    {[
                ['Previous', e.previous],
                ['Expected', e.expected],
                ['Actual', e.actual ?? '—']].
                map(([k, v]) =>
                <div key={k}>
                        <p className="text-[10px] uppercase tracking-wider text-ink-4">
                          {k}
                        </p>
                        <p className="num mt-0.5 text-xs font-medium tabular-nums text-ink">
                          {v}
                        </p>
                      </div>
                )}
                  </div>
                </div>
            )}
          </div>
        </Card>
      </PageBody>
    </>);

}