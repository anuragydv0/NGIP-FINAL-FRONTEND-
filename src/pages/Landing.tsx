import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  BarChart3Icon,
  CheckIcon,
  GlobeIcon,
  PlayIcon,
  ShieldAlertIcon,
  SparklesIcon } from
'lucide-react';
import { Logo } from '../components/shell/Logo';
import { Button } from '../components/ui/Button';
import { Badge, Delta, ScoreBar } from '../components/ui/Badge';
import { GlobalMap, MapMode } from '../components/charts/GlobalMap';
import { Segmented } from '../components/ui/Tabs';
import { Sparkline } from '../components/ui/Sparkline';
import { AreaSeries } from '../components/charts/Charts';
import { countries } from '../data/countries';
import { globalIndices, globalGrowthIndex } from '../data/markets';
import { performanceSeries, portfolioSummary } from '../data/portfolio';
import { inr, num, pct, signedPct } from '../utils/format';

const flow = [
'Country / Region',
'Economic data',
'Growth & risk analysis',
'Country Growth Index',
'Investment opportunities',
'Financial instruments',
'Portfolio',
'Performance & risk'];


export function Landing() {
  const [mode, setMode] = React.useState<MapMode>('Growth');
  const top = [...countries].sort((a, b) => b.cgi - a.cgi).slice(0, 6);

  return (
    <div className="min-h-full w-full bg-canvas">
      <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-8 px-5 lg:px-8">
          <Link to="/" aria-label="NGIP home">
            <Logo subtitle="Nation Growth Investment Platform" />
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] font-medium text-ink-2 lg:flex">
            {[
            ['Platform', '#platform'],
            ['Country Growth Index', '#cgi'],
            ['Research', '#research'],
            ['Portfolio', '#portfolio'],
            ['Risk', '#risk']].
            map(([label, href]) =>
            <a
              key={label}
              href={href}
              className="transition-colors duration-150 ease-swift hover:text-accent">
              
                {label}
              </a>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/app/dashboard">
              <Button variant="primary" size="sm">
                Explore global markets
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1320px] px-5 py-14 lg:px-8 lg:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <Badge tone="accent">Economic intelligence · 24 covered economies</Badge>
              <h1 className="mt-5 text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink lg:text-[52px]">
                Understand the world.
                <br />
                Invest with context.
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-2">
                Research economies, discover global opportunities, understand
                risks, and connect your portfolio to the world&apos;s growth.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/app/dashboard">
                  <Button
                    variant="primary"
                    size="lg"
                    iconRight={<ArrowRightIcon className="h-4 w-4" />}>
                    
                    Explore global markets
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={<PlayIcon className="h-3.5 w-3.5" />}>
                    
                    See how NGIP works
                  </Button>
                </Link>
              </div>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
                {[
                ['Global Growth Index', globalGrowthIndex.value.toFixed(1), globalGrowthIndex.delta],
                ['Economies covered', '24', 3],
                ['Indicators tracked', '186', 12]].
                map(([label, value, delta]) =>
                <div key={label as string}>
                    <dt className="text-[11px] uppercase tracking-wider text-ink-4">
                      {label}
                    </dt>
                    <dd className="num mt-1 flex items-baseline gap-2 text-xl font-semibold tabular-nums text-ink">
                      {value}
                      <Delta value={Number(delta)} suffix="" size="xs" showIcon={false} />
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-xl border border-line bg-surface p-3 shadow-raised">
              <div className="flex items-center justify-between gap-3 px-2 pb-2.5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                    Global economic map
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-ink">
                    Growth distribution, FY26 estimate
                  </p>
                </div>
                <Segmented
                  size="xs"
                  options={['Growth', 'CGI', 'Risk']}
                  value={mode}
                  onChange={(v) => setMode(v as MapMode)} />
                
              </div>
              <div className="overflow-hidden rounded-lg border border-line bg-subtle">
                <GlobalMap mode={mode} height={300} />
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-line p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                    Top economies by CGI
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {top.slice(0, 4).map((c, i) =>
                    <li key={c.id} className="flex items-center gap-2">
                        <span className="num w-3 text-[11px] tabular-nums text-ink-4">
                          {i + 1}
                        </span>
                        <span aria-hidden>{c.flag}</span>
                        <span className="truncate text-xs font-medium text-ink">
                          {c.name}
                        </span>
                        <span className="num ml-auto text-xs font-semibold tabular-nums text-ink">
                          {c.cgi.toFixed(1)}
                        </span>
                        <Delta value={c.cgiDelta} suffix="" size="xs" showIcon={false} />
                      </li>
                    )}
                  </ul>
                </div>
                <div className="rounded-lg border border-line p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                    Portfolio preview
                  </p>
                  <p className="num mt-1.5 text-lg font-semibold tabular-nums tracking-tight text-ink">
                    {inr(portfolioSummary.totalValue)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Delta value={portfolioSummary.dayPnlPct} size="xs" />
                    <span className="text-[11px] text-ink-4">today</span>
                  </div>
                  <div className="mt-1.5">
                    <AreaSeries
                      data={performanceSeries.slice(-14)}
                      xKey="date"
                      series={[{ key: 'portfolio', label: 'Portfolio' }]}
                      height={72}
                      yWidth={0} />
                    
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 rounded-lg border border-line px-3 py-2.5 sm:grid-cols-4">
                {globalIndices.slice(0, 4).map((m) =>
                <div key={m.name} className="flex items-baseline gap-2">
                    <span className="truncate text-[11px] text-ink-3">
                      {m.name}
                    </span>
                    <span className="num ml-auto text-[11px] font-medium tabular-nums text-ink">
                      {num(m.value, 0)}
                    </span>
                    <span
                    className={`num text-[11px] tabular-nums ${m.changePct >= 0 ? 'text-pos' : 'text-neg'}`}>
                    
                      {signedPct(m.changePct, 1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-[1320px] px-5 py-12 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
            The NGIP research path
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
            {flow.map((step, i) =>
            <React.Fragment key={step}>
                <span className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-2">
                  {step}
                </span>
                {i < flow.length - 1 &&
              <ArrowRightIcon className="h-3.5 w-3.5 text-ink-4" />
              }
              </React.Fragment>
            )}
          </div>
          <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-ink-3">
            A country is an economic research entity, not a tradable asset. NGIP
            takes you from national economic data to the specific instruments
            that give you exposure — then tracks what that exposure does to your
            portfolio.
          </p>
        </div>
      </section>

      <section id="cgi" className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <Badge tone="accent">Country Growth Index</Badge>
            <h2 className="mt-4 text-[30px] font-semibold leading-tight tracking-[-0.015em] text-ink">
              One score for an entire economy — built from ten measurable
              pillars
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-2">
              The CGI aggregates growth, productivity, investment,
              infrastructure, employment, innovation, fiscal health, external
              stability, demographics and governance into a single comparable
              index, revised as new data lands.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
              'Published methodology with versioned weights',
              'Twenty-year history for every covered economy',
              'Pillar-level breakdown, not a black-box score'].
              map((t) =>
              <li key={t} className="flex items-start gap-2.5 text-[13px] text-ink-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {t}
                </li>
              )}
            </ul>
            <Link
              to="/app/countries/in"
              className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hover">
              
              See India&apos;s CGI breakdown
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-end justify-between">
              <div>
                <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <span aria-hidden>🇮🇳</span> India
                  <span className="font-mono text-[11px] text-ink-4">IN</span>
                </p>
                <p className="num mt-2 text-4xl font-semibold leading-none tabular-nums tracking-tight text-ink">
                  91.4
                </p>
              </div>
              <Delta value={2.1} suffix="" size="md" />
            </div>
            <div className="mt-5 space-y-2.5">
              {countries[0].pillars.slice(0, 6).map((p) =>
              <div key={p.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-ink-2">{p.label}</span>
                    <span className="num text-xs font-semibold tabular-nums text-ink">
                      {p.score}
                    </span>
                  </div>
                  <ScoreBar value={p.score} className="mt-1" />
                </div>
              )}
            </div>
            <div className="mt-5 grid grid-cols-4 gap-3 border-t border-line pt-4">
              {[
              ['GDP', `$${countries[0].gdp}T`],
              ['Growth', pct(countries[0].gdpGrowth, 1)],
              ['Inflation', pct(countries[0].inflation, 1)],
              ['Risk', String(countries[0].riskScore)]].
              map(([k, v]) =>
              <div key={k}>
                  <p className="text-[10px] uppercase tracking-wider text-ink-4">
                    {k}
                  </p>
                  <p className="num mt-0.5 text-[13px] font-medium tabular-nums text-ink">
                    {v}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-[1320px] px-5 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-line bg-surface p-6 shadow-card">
              <div className="flex items-center gap-2">
                <GlobeIcon className="h-4 w-4 text-accent" />
                <h3 className="text-[15px] font-semibold text-ink">
                  Country comparison & investment discovery
                </h3>
              </div>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-ink-3">
                Compare up to six economies across growth, inflation, debt,
                FDI, productivity and innovation — then move directly to the
                ETFs, funds, bonds and baskets that provide that exposure.
              </p>
              <div className="mt-5 overflow-hidden rounded-lg border border-line">
                <table className="w-full text-left">
                  <thead className="bg-subtle">
                    <tr className="border-b border-line">
                      {['Country', 'CGI', 'Growth', 'Inflation', 'Risk', 'Trend'].map(
                        (h) =>
                        <th
                          key={h}
                          className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-4">
                          
                            {h}
                          </th>

                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {top.slice(0, 5).map((c) =>
                    <tr key={c.id}>
                        <td className="px-3 py-2 text-xs font-medium text-ink">
                          <span aria-hidden>{c.flag}</span> {c.name}
                        </td>
                        <td className="num px-3 py-2 text-xs font-semibold tabular-nums text-ink">
                          {c.cgi.toFixed(1)}
                        </td>
                        <td className="num px-3 py-2 text-xs tabular-nums text-ink-2">
                          {pct(c.gdpGrowth, 1)}
                        </td>
                        <td className="num px-3 py-2 text-xs tabular-nums text-ink-2">
                          {pct(c.inflation, 1)}
                        </td>
                        <td className="num px-3 py-2 text-xs tabular-nums text-ink-2">
                          {c.riskScore}
                        </td>
                        <td className="px-3 py-1.5">
                          <Sparkline data={c.trend} width={64} height={18} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="rounded-xl border border-line bg-surface p-6 shadow-card">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-accent" />
                  <h3 className="text-[15px] font-semibold text-ink">
                    AI research copilot
                  </h3>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
                  Ask a comparative question and get a structured answer —
                  growth, demographics, investment, risks, bull/base/bear — with
                  the underlying data cited.
                </p>
                <p className="mt-4 rounded-md border border-line bg-subtle px-3 py-2 text-xs italic text-ink-2">
                  “Compare India and Vietnam over the next five years.”
                </p>
              </div>
              <div
                id="risk"
                className="rounded-xl border border-line bg-surface p-6 shadow-card">
                
                <div className="flex items-center gap-2">
                  <ShieldAlertIcon className="h-4 w-4 text-accent" />
                  <h3 className="text-[15px] font-semibold text-ink">
                    Risk analytics
                  </h3>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
                  Volatility, Sharpe, drawdown, country and currency
                  concentration — with plain-language insights on where your
                  exposure is unbalanced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div>
            <Badge tone="accent">Portfolio intelligence</Badge>
            <h2 className="mt-4 text-[30px] font-semibold leading-tight tracking-[-0.015em] text-ink">
              Your portfolio, explained through the economies behind it
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-2">
              Every holding maps back to a country, region, sector and currency,
              so performance attribution answers the question that matters: which
              economies are driving my returns and my risk?
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
              ['CAGR', pct(portfolioSummary.cagr)],
              ['XIRR', pct(portfolioSummary.xirr)],
              ['Volatility', pct(portfolioSummary.volatility, 1)],
              ['Sharpe', portfolioSummary.sharpe.toFixed(2)]].
              map(([k, v]) =>
              <div key={k} className="rounded-lg border border-line px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-ink-4">
                    {k}
                  </p>
                  <p className="num mt-1 text-[15px] font-semibold tabular-nums text-ink">
                    {v}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-ink-4">
                  Portfolio performance vs benchmark
                </p>
                <p className="num mt-1 text-2xl font-semibold tabular-nums tracking-tight text-ink">
                  {inr(portfolioSummary.totalValue)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3Icon className="h-4 w-4 text-ink-4" />
                <Delta value={portfolioSummary.totalReturnPct} size="sm" />
              </div>
            </div>
            <div className="mt-4">
              <AreaSeries
                data={performanceSeries}
                xKey="date"
                series={[
                { key: 'portfolio', label: 'Portfolio' },
                { key: 'benchmark', label: 'Benchmark', color: '#98A2AF' }]
                }
                height={220}
                yTickFormatter={(v) => `${(v / 100000).toFixed(1)}L`}
                formatter={(v) => inr(Number(v), 0)} />
              
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-6 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.015em] text-white">
              Start with an economy. End with a position.
            </h2>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/60">
              Open the platform to explore all 24 covered economies, the Country
              Growth Index and the instruments that give you exposure.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/app/dashboard">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRightIcon className="h-4 w-4" />}>
                
                Explore global markets
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="lg"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30">
                
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Logo subtitle="Nation Growth Investment Platform" />
            <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-ink-4">
              NGIP is a demonstration environment. All market, economic and
              portfolio figures shown are simulated for design purposes and must
              not be used for investment decisions.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] text-ink-3">
            {[
            ['Markets', '/app/markets'],
            ['Countries', '/app/countries'],
            ['Research', '/app/research'],
            ['Risk', '/app/risk'],
            ['Sign in', '/login']].
            map(([l, to]) =>
            <Link
              key={l}
              to={to}
              className="transition-colors duration-150 ease-swift hover:text-accent">
              
                {l}
              </Link>
            )}
          </nav>
        </div>
      </footer>
    </div>);

}