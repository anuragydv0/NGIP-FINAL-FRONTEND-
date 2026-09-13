import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge, DataStatus, Delta } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Segmented } from '../components/ui/Tabs';
import { GlobalMap, MapMode } from '../components/charts/GlobalMap';
import { BarSeries } from '../components/charts/Charts';
import { CountryCard, InsightCard } from '../components/domain/Cards';
import { countries, regionAggregates } from '../data/countries';
import { pct } from '../utils/format';

const modes: MapMode[] = ['Growth', 'CGI', 'Risk', 'GDP', 'Inflation', 'FDI'];

export function CountryIntelligence() {
  const [mode, setMode] = React.useState<MapMode>('CGI');
  const [region, setRegion] = React.useState('All regions');

  const improved = [...countries].
  sort((a, b) => b.cgiDelta - a.cgiDelta).
  slice(0, 4);
  const deteriorating = [...countries].
  sort((a, b) => a.cgiDelta - b.cgiDelta).
  slice(0, 4);

  const filtered =
  region === 'All regions' ?
  countries :
  countries.filter((c) => c.region === region);

  return (
    <>
      <PageHeader
        title="Country intelligence"
        subtitle="A single briefing surface for what changed across the covered economies this week."
        meta={
        <div className="flex flex-wrap items-center gap-3">
            <DataStatus status="UPDATED" detail="CGI cycle 2026-W37" />
            <Badge tone="accent">24 economies · 186 indicators</Badge>
          </div>
        }
        actions={
        <Link to="/app/countries">
            <Button>All countries</Button>
          </Link>
        } />
      

      <PageBody className="space-y-5">
        <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader
              title="Economic map"
              action={
              <Segmented
                size="xs"
                options={modes}
                value={mode}
                onChange={(v) => setMode(v as MapMode)} />

              } />
            
            <div className="p-3">
              <GlobalMap mode={mode} height={330} />
            </div>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardHeader title="Regional growth index" dense />
              <div className="px-3 py-4">
                <BarSeries
                  data={regionAggregates.map((r) => ({
                    label: r.region,
                    cgi: r.cgi
                  }))}
                  xKey="label"
                  series={[{ key: 'cgi', label: 'Average CGI' }]}
                  layout="vertical"
                  height={196} />
                
              </div>
            </Card>
            <InsightCard
              tone="pos"
              title="Emerging Asia leads the CGI revision cycle"
              body="Four of the five largest upward CGI revisions this cycle came from emerging Asian economies, driven by investment and infrastructure pillars."
              action={
              <Link
                to="/app/countries"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-hover">
                
                  Review the cohort
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              } />
            
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {[
          ['Largest upward revisions', improved],
          ['Largest downward revisions', deteriorating]].
          map(([title, list]) =>
          <Card key={title as string}>
              <CardHeader title={title as string} dense />
              <ul className="divide-y divide-line">
                {(list as typeof countries).map((c) =>
              <li key={c.id}>
                    <Link
                  to={`/app/countries/${c.id}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 ease-swift hover:bg-subtle">
                  
                      <span aria-hidden>{c.flag}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink">
                          {c.name}
                        </span>
                        <span className="block text-[11px] text-ink-4">
                          {c.region} · growth {pct(c.gdpGrowth, 1)}
                        </span>
                      </span>
                      <span className="num text-[13px] font-semibold tabular-nums text-ink">
                        {c.cgi.toFixed(1)}
                      </span>
                      <Delta value={c.cgiDelta} suffix="" size="xs" />
                    </Link>
                  </li>
              )}
              </ul>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader
            title="Coverage universe"
            subtitle="Open any economy for its full intelligence page"
            action={
            <Segmented
              size="xs"
              options={['All regions', 'Asia Pacific', 'Europe', 'Americas']}
              value={region}
              onChange={setRegion} />

            } />
          
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filtered.slice(0, 12).map((c) =>
            <CountryCard key={c.id} country={c} />
            )}
          </div>
        </Card>
      </PageBody>
    </>);

}