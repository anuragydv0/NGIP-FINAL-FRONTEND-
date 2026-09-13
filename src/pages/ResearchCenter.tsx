import React from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, SectionTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/States';
import { ResearchCard } from '../components/domain/Cards';
import { research, researchCategories } from '../data/content';
import { countries } from '../data/countries';

export function ResearchCenter() {
  const [category, setCategory] = React.useState('All');
  const [query, setQuery] = React.useState('');

  const filtered = research.filter(
    (r) =>
    (category === 'All' || r.category === category) && (
    !query ||
    `${r.title} ${r.country} ${r.author}`.
    toLowerCase().
    includes(query.toLowerCase()))
  );

  const featured = filtered.filter((r) => r.featured);
  const rest = filtered.filter((r) => !r.featured);

  return (
    <>
      <PageHeader
        title="Research centre"
        subtitle="Institutional country, sector and thematic research from the NGIP research desk."
        meta={
        <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{research.length} published reports</Badge>
            <Badge>9 analysts · 24 economies</Badge>
          </div>
        }
        actions={
        <>
            <Link to="/app/news">
              <Button>News centre</Button>
            </Link>
            <Link to="/app/ai-research">
              <Button variant="primary">Ask AI research</Button>
            </Link>
          </>
        }
        tabs={
        <Tabs
          tabs={researchCategories.map((c) => ({ id: c, label: c }))}
          value={category}
          onChange={setCategory} />

        } />
      

      <PageBody className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Search reports, countries or authors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            wrapperClassName="w-full sm:w-80" />
          
          <Badge className="ml-auto">{filtered.length} reports</Badge>
        </div>

        {filtered.length === 0 &&
        <Card>
            <EmptyState
            title="No research matches your search"
            description="Try a different category or search term."
            action={
            <Button
              size="sm"
              onClick={() => {
                setQuery('');
                setCategory('All');
              }}>
              
                  Clear search
                </Button>
            } />
          
          </Card>
        }

        {featured.length > 0 &&
        <section>
            <SectionTitle>Featured reports</SectionTitle>
            <div className="mt-3 grid gap-4 lg:grid-cols-2">
              {featured.map((r) =>
            <ResearchCard key={r.id} report={r} variant="featured" />
            )}
            </div>
          </section>
        }

        {rest.length > 0 &&
        <section>
            <SectionTitle>
              {category === 'All' ? 'All research' : category}
            </SectionTitle>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {rest.map((r) =>
            <ResearchCard key={r.id} report={r} />
            )}
            </div>
          </section>
        }

        <Card>
          <CardHeader
            title="Country coverage"
            subtitle="Economies with active research coverage"
            href="/app/countries" />
          
          <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries.slice(0, 12).map((c) => {
              const count = research.filter((r) => r.country === c.name).length;
              return (
                <Link
                  key={c.id}
                  to={`/app/countries/${c.id}`}
                  className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2.5 transition-[border-color,background-color] duration-150 ease-swift hover:border-accent-line hover:bg-accent-soft/40">
                  
                  <span aria-hidden>{c.flag}</span>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                    {c.name}
                  </span>
                  <Badge tone={count > 0 ? 'accent' : 'neutral'}>
                    {count} {count === 1 ? 'report' : 'reports'}
                  </Badge>
                </Link>);

            })}
          </div>
        </Card>
      </PageBody>
    </>);

}