import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Logo } from '../../components/shell/Logo';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import { countries, regions } from '../../data/countries';
import { cx } from '../../utils/format';

interface Step {
  id: string;
  label: string;
  title: string;
  description: string;
}

const steps: Step[] = [
{
  id: 'welcome',
  label: 'Welcome',
  title: 'Welcome to NGIP',
  description:
  'Seven quick questions so your dashboard opens on the economies and instruments that matter to you.'
},
{
  id: 'country',
  label: 'Country',
  title: 'Where are you investing from?',
  description:
  'This sets your reporting currency, tax treatment and default market hours.'
},
{
  id: 'experience',
  label: 'Experience',
  title: 'How much investing experience do you have?',
  description: 'We adjust the depth of analytics shown by default.'
},
{
  id: 'risk',
  label: 'Risk',
  title: 'What is your risk preference?',
  description:
  'Used to flag instruments and country exposures outside your stated comfort band.'
},
{
  id: 'horizon',
  label: 'Horizon',
  title: 'What is your investment horizon?',
  description: 'Determines default chart ranges and performance benchmarks.'
},
{
  id: 'markets',
  label: 'Markets',
  title: 'Which markets interest you most?',
  description: 'Select any number — you can change these at any time.'
},
{
  id: 'done',
  label: 'Dashboard',
  title: 'Your dashboard is ready',
  description:
  'We have pre-loaded your watchlists, economic calendar and country coverage.'
}];


const experienceOptions = [
['New to investing', 'I am starting out and want guided research.'],
['Some experience', 'I invest regularly in funds or equities.'],
['Experienced', 'I manage a diversified portfolio actively.'],
['Professional', 'I invest professionally or manage capital for others.']];


const riskOptions = [
['Conservative', 'Prioritise capital preservation over growth.'],
['Balanced', 'Accept moderate volatility for steady growth.'],
['Growth', 'Accept higher volatility for higher expected return.'],
['Aggressive', 'Maximise growth, tolerate large drawdowns.']];


const horizonOptions = [
['Under 1 year', 'Short-term allocation.'],
['1 – 3 years', 'Medium-term goals.'],
['3 – 7 years', 'Long-term compounding.'],
['7 years or more', 'Multi-decade wealth building.']];


export function Onboarding() {
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);
  const [country, setCountry] = React.useState('India');
  const [experience, setExperience] = React.useState('Some experience');
  const [risk, setRisk] = React.useState('Growth');
  const [horizon, setHorizon] = React.useState('3 – 7 years');
  const [markets, setMarkets] = React.useState<string[]>(['Asia Pacific']);
  const step = steps[index];

  const toggleMarket = (r: string) =>
  setMarkets((m) => m.includes(r) ? m.filter((x) => x !== r) : [...m, r]);

  const OptionList = ({
    options,
    value,
    onChange




  }: {options: string[][];value: string;onChange: (v: string) => void;}) =>
  <div className="space-y-2">
      {options.map(([label, desc]) =>
    <button
      key={label}
      type="button"
      onClick={() => onChange(label)}
      className={cx(
        'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-[border-color,background-color] duration-150 ease-swift',
        value === label ?
        'border-accent bg-accent-soft' :
        'border-line hover:border-line-strong hover:bg-subtle'
      )}>
      
          <span
        className={cx(
          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
          value === label ? 'border-accent bg-accent' : 'border-line-strong'
        )}>
        
            {value === label && <CheckIcon className="h-2.5 w-2.5 text-surface" />}
          </span>
          <span>
            <span className="block text-[13px] font-medium text-ink">{label}</span>
            <span className="mt-0.5 block text-xs text-ink-3">{desc}</span>
          </span>
        </button>
    )}
    </div>;


  return (
    <div className="flex min-h-full w-full flex-col bg-canvas">
      <header className="flex h-16 items-center justify-between border-b border-line bg-surface px-5 lg:px-8">
        <Logo subtitle="Account setup" />
        <button
          onClick={() => navigate('/app/dashboard')}
          className="text-[13px] font-medium text-ink-3 transition-colors duration-150 ease-swift hover:text-ink">
          
          Skip for now
        </button>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 lg:py-14">
        <div className="flex items-center gap-1.5">
          {steps.map((s, i) =>
          <div key={s.id} className="flex-1">
              <div
              className={cx(
                'h-1 rounded-full transition-colors duration-300 ease-swift',
                i <= index ? 'bg-accent' : 'bg-ink/10'
              )} />
            
            </div>
          )}
        </div>
        <p className="num mt-3 text-[11px] font-medium uppercase tracking-wider text-ink-4">
          Step {index + 1} of {steps.length} · {step.label}
        </p>

        <h1 className="mt-5 text-[26px] font-semibold leading-tight tracking-tight text-ink">
          {step.title}
        </h1>
        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ink-3">
          {step.description}
        </p>

        <div className="mt-8">
          {step.id === 'welcome' &&
          <div className="grid gap-3 sm:grid-cols-3">
              {[
            ['Research', 'Economic data and the Country Growth Index for 24 economies.'],
            ['Discover', 'Instruments that give you exposure to those economies.'],
            ['Monitor', 'Performance, attribution and risk across your portfolio.']].
            map(([t, d]) =>
            <div
              key={t}
              className="rounded-lg border border-line bg-surface p-4 shadow-card">
              
                  <p className="text-[13px] font-semibold text-ink">{t}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-3">{d}</p>
                </div>
            )}
            </div>
          }

          {step.id === 'country' &&
          <div className="max-w-sm space-y-4">
              <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                {countries.map((c) =>
              <option key={c.id}>{c.name}</option>
              )}
              </Select>
              <p className="rounded-lg border border-line bg-surface px-4 py-3 text-xs text-ink-3">
                Reporting currency will be set to{' '}
                <span className="font-semibold text-ink">
                  {countries.find((c) => c.name === country)?.currency ?? 'INR'}
                </span>
                .
              </p>
            </div>
          }

          {step.id === 'experience' &&
          <OptionList
            options={experienceOptions}
            value={experience}
            onChange={setExperience} />

          }
          {step.id === 'risk' &&
          <OptionList options={riskOptions} value={risk} onChange={setRisk} />
          }
          {step.id === 'horizon' &&
          <OptionList
            options={horizonOptions}
            value={horizon}
            onChange={setHorizon} />

          }

          {step.id === 'markets' &&
          <div className="grid gap-2 sm:grid-cols-2">
              {regions.map((r) => {
              const active = markets.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleMarket(r)}
                  className={cx(
                    'flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-[border-color,background-color] duration-150 ease-swift',
                    active ?
                    'border-accent bg-accent-soft' :
                    'border-line hover:border-line-strong hover:bg-subtle'
                  )}>
                  
                    <span className="text-[13px] font-medium text-ink">{r}</span>
                    <span
                    className={cx(
                      'flex h-4 w-4 items-center justify-center rounded border',
                      active ? 'border-accent bg-accent' : 'border-line-strong'
                    )}>
                    
                      {active && <CheckIcon className="h-2.5 w-2.5 text-surface" />}
                    </span>
                  </button>);

            })}
            </div>
          }

          {step.id === 'done' &&
          <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
              <dl className="grid gap-4 sm:grid-cols-2">
                {[
              ['Country', country],
              ['Experience', experience],
              ['Risk preference', risk],
              ['Horizon', horizon],
              ['Markets of interest', markets.join(', ') || 'All markets'],
              ['Reporting currency', countries.find((c) => c.name === country)?.currency ?? 'INR']].
              map(([k, v]) =>
              <div key={k}>
                    <dt className="text-[11px] uppercase tracking-wider text-ink-4">
                      {k}
                    </dt>
                    <dd className="mt-1 text-[13px] font-medium text-ink">{v}</dd>
                  </div>
              )}
              </dl>
            </div>
          }
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            icon={<ArrowLeftIcon className="h-4 w-4" />}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}>
            
            Back
          </Button>
          {index === steps.length - 1 ?
          <Button
            variant="primary"
            size="lg"
            iconRight={<ArrowRightIcon className="h-4 w-4" />}
            onClick={() => navigate('/app/dashboard')}>
            
              Open my dashboard
            </Button> :

          <Button
            variant="primary"
            size="lg"
            iconRight={<ArrowRightIcon className="h-4 w-4" />}
            onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}>
            
              Continue
            </Button>
          }
        </div>
      </div>
    </div>);

}