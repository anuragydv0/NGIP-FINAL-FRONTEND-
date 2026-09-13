import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DownloadIcon, PrinterIcon, ShareIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/States';
import { ResearchCard } from '../components/domain/Cards';
import { AreaSeries, BarSeries } from '../components/charts/Charts';
import { research } from '../data/content';
import { countries, countryById } from '../data/countries';
import { cx, pct } from '../utils/format';

const sections = [
{ id: 'summary', label: 'Executive summary' },
{ id: 'economy', label: 'Economic overview' },
{ id: 'growth', label: 'Growth' },
{ id: 'inflation', label: 'Inflation' },
{ id: 'fiscal', label: 'Fiscal' },
{ id: 'external', label: 'External sector' },
{ id: 'demographics', label: 'Demographics' },
{ id: 'infrastructure', label: 'Infrastructure' },
{ id: 'sectors', label: 'Sectors' },
{ id: 'risks', label: 'Risks' },
{ id: 'bull', label: 'Bull case' },
{ id: 'base', label: 'Base case' },
{ id: 'bear', label: 'Bear case' },
{ id: 'landscape', label: 'Investment landscape' },
{ id: 'sources', label: 'Sources' }];


const body: Record<string, string[]> = {
  summary: [
  'The investment cycle that began in 2021 has broadened from public infrastructure into private manufacturing capacity, and we now expect it to sustain above-trend growth through the end of the decade. The critical change is not the headline capital expenditure number but its composition: private participation has risen from 28% to 41% of total project value in three years.',
  'We remain Overweight with a five-year view. The principal risks are execution capacity in the states, the pace of disinflation, and an external demand shock that would delay private investment decisions already at the approval stage.'],

  economy: [
  'Nominal output has compounded at 9.2% over the past five years, with real growth averaging 6.4%. Formalisation continues to expand the tax base — gross tax revenue to GDP has risen 2.1 percentage points since FY21 — giving the fiscal authority room to sustain capital spending without a widening primary deficit.',
  'Monetary policy has entered a neutral phase. With headline inflation inside the target band for four consecutive quarters, the policy rate has room to fall 75 to 100 basis points over the next four quarters, which would materially improve project internal rates of return.'],

  growth: [
  'Growth is now led by investment rather than consumption for the first sustained period since liberalisation. Gross fixed capital formation has risen to 33.4% of GDP. Capacity utilisation across organised manufacturing has stayed above 75% for six quarters, historically the threshold at which private greenfield investment accelerates.'],

  inflation: [
  'Core inflation has been remarkably stable at 3.9% to 4.3%, with headline volatility driven almost entirely by food. We expect the food component to normalise as storage and logistics investment reduces post-harvest loss, structurally lowering the volatility of the headline series.'],

  fiscal: [
  'The consolidated deficit is on a declining path, but the composition matters more than the level: capital expenditure now represents 3.4% of GDP against 1.7% five years ago, while revenue expenditure growth has been held below nominal GDP growth. Interest servicing remains the largest single line item and constrains the pace of further consolidation.'],

  external: [
  'The current account deficit has stabilised near 1.4% of GDP, comfortably financed by foreign direct and portfolio investment. Reserve adequacy is strong at 11.2 months of import cover. Services exports — increasingly global capability centres rather than traditional outsourcing — now offset roughly 60% of the goods trade deficit.'],

  demographics: [
  'The demographic dividend window remains open to approximately 2045. The binding constraint is not labour supply but absorptive capacity: female labour force participation and formal-sector job creation both need to improve for the dividend to convert into per-capita income growth.'],

  infrastructure: [
  'Logistics costs have fallen from an estimated 13% to 9.8% of GDP. Freight corridors, port capacity and grid interconnection are the three areas where the marginal rupee of public capital currently produces the highest measured return.'],

  sectors: [
  'We see the strongest risk-adjusted opportunity in industrials and capital goods, financials levered to credit growth, and energy transition infrastructure. We are more cautious on consumer discretionary, where valuations already price a demand recovery that the data does not yet support.'],

  risks: [
  'Three risks dominate. First, state-level execution capacity — the gap between announced and deployed capital remains wide. Second, a global demand shock that would delay private capex approvals. Third, a commodity price re-acceleration that would reopen the inflation question and delay monetary easing.'],

  bull: [
  'Private capex broadens beyond the current concentration in a handful of sectors, disinflation allows 100 basis points of easing, and external demand recovers faster than consensus. Growth averages 8.4% and the CGI advances above 95.'],

  base: [
  'Growth holds near 6.8% with gradual disinflation and continued public capital spending. The CGI advances modestly as investment and infrastructure pillars improve while fiscal health remains a constraint.'],

  bear: [
  'An external shock or commodity re-acceleration delays easing and private investment decisions. Growth decelerates to 4.7%, the CGI falls to the mid-80s, and the fiscal path deteriorates as revenue growth slows.'],

  landscape: [
  'Exposure is most efficiently expressed through broad index products for the structural growth view, infrastructure-focused vehicles for the capex thesis, and sovereign debt for those seeking to own the disinflation and rate-cut trajectory rather than equity beta.'],

  sources: [
  'National accounts and statistics office releases; central bank monetary policy reports and bulletins; IMF Article IV consultation and fiscal monitor; World Bank development indicators; UNCTAD world investment report; UN population prospects; NGIP proprietary Country Growth Index methodology v4.2.']

};

export function ResearchReportPage() {
  const { id = 'r1' } = useParams();
  const report = research.find((r) => r.id === id);
  const [active, setActive] = React.useState('summary');

  if (!report) {
    return (
      <PageBody>
        <Card>
          <EmptyState
            title="Report not found"
            description="This research report is no longer available."
            action={
            <Link to="/app/research">
                <Button size="sm" variant="primary">
                  Back to research
                </Button>
              </Link>
            } />
          
        </Card>
      </PageBody>);

  }

  const country = countryById(
    countries.find((c) => c.name === report.country)?.id ?? 'in'
  )!;

  return (
    <>
      <PageHeader
        breadcrumbs={[
        { label: 'Research', to: '/app/research' },
        { label: report.category, to: '/app/research' },
        { label: report.title }]
        }
        title={report.title}
        meta={
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/[0.06] text-[11px] font-semibold text-ink-2">
                {report.author.
              split(' ').
              map((w) => w[0]).
              slice(0, 2).
              join('')}
              </span>
              <span>
                <span className="block text-[13px] font-medium text-ink">
                  {report.author}
                </span>
                <span className="block text-[11px] text-ink-4">{report.role}</span>
              </span>
            </span>
            <span className="num text-xs tabular-nums text-ink-4">
              {report.date} · {report.readingTime} read
            </span>
            {report.rating &&
          <Badge
            tone={
            report.rating === 'Overweight' ?
            'pos' :
            report.rating === 'Underweight' ?
            'neg' :
            'info'
            }>
            
                {report.rating}
              </Badge>
          }
            <Badge tone="accent">
              <span aria-hidden>{report.flag}</span> {report.country}
            </Badge>
          </div>
        }
        actions={
        <>
            <Button icon={<ShareIcon className="h-3.5 w-3.5" />}>Share</Button>
            <Button icon={<PrinterIcon className="h-3.5 w-3.5" />}>Print</Button>
            <Button variant="primary" icon={<DownloadIcon className="h-3.5 w-3.5" />}>
              Download PDF
            </Button>
          </>
        } />
      

      <PageBody>
        <div className="grid gap-6 xl:grid-cols-[216px_minmax(0,1fr)_296px]">
          <nav
            aria-label="Report sections"
            className="hidden xl:block xl:sticky xl:top-4 xl:h-fit">
            
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-4">
              Contents
            </p>
            <ul className="mt-2 space-y-0.5">
              {sections.map((s) =>
              <li key={s.id}>
                  <a
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={cx(
                    'block rounded px-2 py-1.5 text-[12px] transition-colors duration-150 ease-swift',
                    active === s.id ?
                    'bg-accent-soft font-medium text-accent' :
                    'text-ink-3 hover:bg-ink/[0.04] hover:text-ink'
                  )}>
                  
                    {s.label}
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <article className="max-w-[720px]">
            <p className="border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-ink-2">
              {report.excerpt}
            </p>
            {sections.map((s) =>
            <section key={s.id} id={s.id} className="mt-9 scroll-mt-6">
                <h2 className="text-[17px] font-semibold tracking-tight text-ink">
                  {s.label}
                </h2>
                <div className="mt-3 space-y-4">
                  {(body[s.id] ?? body.summary).map((p, i) =>
                <p
                  key={i}
                  className="text-[14px] leading-[1.75] text-ink-2">
                  
                      {p}
                    </p>
                )}
                </div>
                {s.id === 'growth' &&
              <figure className="mt-5 rounded-lg border border-line bg-surface p-4">
                    <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                      Country Growth Index and real GDP growth
                    </figcaption>
                    <AreaSeries
                  data={country.cgiHistory}
                  xKey="year"
                  series={[
                  { key: 'cgi', label: 'CGI' },
                  { key: 'growth', label: 'GDP growth %', color: '#1F5FA8' }]
                  }
                  height={220} />
                
                  </figure>
              }
                {s.id === 'sectors' &&
              <figure className="mt-5 rounded-lg border border-line bg-surface p-4">
                    <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                      CGI pillar scores
                    </figcaption>
                    <BarSeries
                  data={country.pillars.map((p) => ({
                    label: p.label,
                    score: p.score
                  }))}
                  xKey="label"
                  series={[{ key: 'score', label: 'Score' }]}
                  layout="vertical"
                  height={280} />
                
                  </figure>
              }
              </section>
            )}
            <p className="mt-10 border-t border-line pt-5 text-[11px] leading-relaxed text-ink-4">
              This report is a simulated demonstration document produced for
              design purposes. It does not constitute investment advice or a
              recommendation to buy or sell any security.
            </p>
          </article>

          <aside className="space-y-5">
            <Card className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                Economy at a glance
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                ['CGI', country.cgi.toFixed(1)],
                ['Growth', pct(country.gdpGrowth, 1)],
                ['Inflation', pct(country.inflation, 1)],
                ['Risk', String(country.riskScore)]].
                map(([k, v]) =>
                <div key={k}>
                    <p className="text-[10px] uppercase tracking-wider text-ink-4">
                      {k}
                    </p>
                    <p className="num mt-0.5 text-[15px] font-semibold tabular-nums text-ink">
                      {v}
                    </p>
                  </div>
                )}
              </div>
              <Link
                to={`/app/countries/${country.id}`}
                className="mt-4 block rounded-md border border-line bg-subtle px-3 py-2 text-xs font-medium text-ink-2 transition-colors duration-150 ease-swift hover:border-accent-line hover:bg-accent-soft hover:text-accent">
                
                Open country intelligence →
              </Link>
            </Card>
            <Card>
              <CardHeader title="Related research" dense />
              <div className="space-y-3 p-3">
                {research.
                filter((r) => r.id !== report.id).
                slice(0, 3).
                map((r) =>
                <ResearchCard key={r.id} report={r} />
                )}
              </div>
            </Card>
          </aside>
        </div>
      </PageBody>
    </>);

}