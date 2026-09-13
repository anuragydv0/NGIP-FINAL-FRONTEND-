import React from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, SectionTitle } from '../components/ui/Card';
import { Badge, DataStatus } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/States';
import { NewsCard } from '../components/domain/Cards';
import { news, newsCategories } from '../data/content';
import { countries } from '../data/countries';

export function News() {
  const [category, setCategory] = React.useState('All');
  const [query, setQuery] = React.useState('');
  const [country, setCountry] = React.useState('All');

  const filtered = news.filter(
    (n) =>
    (category === 'All' || n.category === category) && (
    country === 'All' || n.country === country) && (
    !query ||
    `${n.headline} ${n.summary} ${n.country}`.
    toLowerCase().
    includes(query.toLowerCase()))
  );

  const featured = filtered.find((n) => n.featured) ?? filtered[0];
  const top = filtered.filter((n) => n !== featured && n.impact === 'High');
  const latest = filtered.filter((n) => n !== featured && n.impact !== 'High');

  const countriesWithNews = Array.from(new Set(news.map((n) => n.country)));

  return (
    <>
      <PageHeader
        title="News centre"
        subtitle="Global economic, policy and market news mapped to the economies you follow."
        meta={<DataStatus status="LIVE" detail="Wire feeds connected" />}
        actions={
        <>
            <Link to="/app/calendar">
              <Button>Economic calendar</Button>
            </Link>
            <Link to="/app/alerts">
              <Button variant="primary">Manage news alerts</Button>
            </Link>
          </>
        }
        tabs={
        <Tabs
          tabs={newsCategories.map((c) => ({ id: c, label: c }))}
          value={category}
          onChange={setCategory} />

        } />
      

      <PageBody>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <SearchInput
                placeholder="Search headlines"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                wrapperClassName="w-full sm:w-80" />
              
              <Badge className="ml-auto">{filtered.length} stories</Badge>
            </div>

            {filtered.length === 0 ?
            <Card>
                <EmptyState
                title="No stories match your filters"
                description="Try another category or clear the search."
                action={
                <Button
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    setCategory('All');
                    setCountry('All');
                  }}>
                  
                      Clear filters
                    </Button>
                } />
              
              </Card> :

            <>
                {featured && <NewsCard item={featured} variant="featured" />}

                {top.length > 0 &&
              <section>
                    <SectionTitle>Top stories</SectionTitle>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                      {top.map((n) =>
                  <NewsCard key={n.id} item={n} />
                  )}
                    </div>
                  </section>
              }

                {latest.length > 0 &&
              <section>
                    <SectionTitle>Latest</SectionTitle>
                    <Card className="mt-3 px-4">
                      {latest.map((n) =>
                  <NewsCard key={n.id} item={n} variant="compact" />
                  )}
                    </Card>
                  </section>
              }
              </>
            }
          </div>

          <aside className="space-y-5">
            <Card>
              <CardHeader title="Country news" dense />
              <ul className="p-2">
                <li>
                  <button
                    onClick={() => setCountry('All')}
                    className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-[13px] transition-colors duration-150 ease-swift ${
                    country === 'All' ?
                    'bg-accent-soft font-medium text-accent' :
                    'text-ink-2 hover:bg-ink/[0.04]'}`
                    }>
                    
                    All countries
                    <span className="num text-[11px] tabular-nums opacity-70">
                      {news.length}
                    </span>
                  </button>
                </li>
                {countriesWithNews.map((c) => {
                  const count = news.filter((n) => n.country === c).length;
                  const flag = countries.find((x) => x.name === c)?.flag ?? '🌐';
                  return (
                    <li key={c}>
                      <button
                        onClick={() => setCountry(c)}
                        className={`flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-[13px] transition-colors duration-150 ease-swift ${
                        country === c ?
                        'bg-accent-soft font-medium text-accent' :
                        'text-ink-2 hover:bg-ink/[0.04]'}`
                        }>
                        
                        <span aria-hidden>{flag}</span>
                        <span className="min-w-0 flex-1 truncate text-left">{c}</span>
                        <span className="num text-[11px] tabular-nums opacity-70">
                          {count}
                        </span>
                      </button>
                    </li>);

                })}
              </ul>
            </Card>

            <Card>
              <CardHeader title="High-impact today" dense />
              <ul className="divide-y divide-line">
                {news.
                filter((n) => n.impact === 'High').
                slice(0, 4).
                map((n) =>
                <li key={n.id} className="px-4 py-2.5">
                      <p className="line-clamp-2 text-xs font-medium leading-snug text-ink">
                        {n.headline}
                      </p>
                      <p className="mt-1 text-[11px] text-ink-4">
                        {n.source} · {n.time}
                      </p>
                    </li>
                )}
              </ul>
            </Card>
          </aside>
        </div>
      </PageBody>
    </>);

}