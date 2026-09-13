import { Country, CGIPillar } from '../types';

const pillarLabels = [
'Economic Growth',
'Productivity',
'Investment',
'Infrastructure',
'Employment',
'Innovation',
'Fiscal Health',
'External Stability',
'Demographics',
'Governance'];


function makePillars(seed: number, base: number): CGIPillar[] {
  return pillarLabels.map((label, i) => {
    const wobble = seed * (i + 3) * 17 % 23 - 11;
    const score = Math.max(28, Math.min(98, Math.round(base + wobble)));
    const delta = Number((seed * (i + 5) % 9 / 3 - 1.2).toFixed(1));
    return { label, score, delta };
  });
}

function makeTrend(seed: number, base: number, len = 24): number[] {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v += (seed * (i + 2) * 13 % 100 / 100 - 0.45) * (base * 0.035);
    out.push(Number(v.toFixed(2)));
  }
  return out;
}

function makeHistory(seed: number, cgi: number, growth: number) {
  const years = [
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026'];

  return years.map((year, i) => {
    const drift = (i - 11) * 1.35;
    const wobble = (seed * (i + 4) * 29 % 100 / 100 - 0.5) * 3.2;
    const covid = year === '2020' ? -6.5 : 0;
    return {
      year,
      cgi: Number(Math.max(20, cgi + drift + wobble + covid).toFixed(1)),
      growth: Number(
        (growth + wobble * 0.4 + (year === '2020' ? -8 : 0)).toFixed(1)
      )
    };
  });
}

interface Seed {
  name: string;
  code: string;
  flag: string;
  region: Country['region'];
  development: Country['development'];
  income: Country['income'];
  cgi: number;
  cgiDelta: number;
  gdp: number;
  gdpGrowth: number;
  inflation: number;
  debtToGdp: number;
  fdi: number;
  population: number;
  populationGrowth: number;
  interestRate: number;
  unemployment: number;
  currency: string;
  riskScore: number;
  capital: string;
  summary: string;
}

const seeds: Seed[] = [
{
  name: 'India',
  code: 'IN',
  flag: '🇮🇳',
  region: 'Asia Pacific',
  development: 'Emerging',
  income: 'Lower Middle',
  cgi: 91.4,
  cgiDelta: 2.1,
  gdp: 4.12,
  gdpGrowth: 6.8,
  inflation: 4.6,
  debtToGdp: 81.2,
  fdi: 71.4,
  population: 1441,
  populationGrowth: 0.81,
  interestRate: 6.25,
  unemployment: 7.1,
  currency: 'INR',
  riskScore: 34,
  capital: 'New Delhi',
  summary:
  'Domestic-demand led expansion with accelerating capex, formalisation of the economy and a maturing digital public infrastructure stack.'
},
{
  name: 'Vietnam',
  code: 'VN',
  flag: '🇻🇳',
  region: 'Asia Pacific',
  development: 'Frontier',
  income: 'Lower Middle',
  cgi: 84.6,
  cgiDelta: 3.4,
  gdp: 0.47,
  gdpGrowth: 6.1,
  inflation: 3.4,
  debtToGdp: 36.8,
  fdi: 38.2,
  population: 100,
  populationGrowth: 0.68,
  interestRate: 4.5,
  unemployment: 2.3,
  currency: 'VND',
  riskScore: 42,
  capital: 'Hanoi',
  summary:
  'Manufacturing relocation beneficiary with rising export complexity and one of the fastest FDI accumulation rates in Asia.'
},
{
  name: 'Indonesia',
  code: 'ID',
  flag: '🇮🇩',
  region: 'Asia Pacific',
  development: 'Emerging',
  income: 'Upper Middle',
  cgi: 79.2,
  cgiDelta: 1.2,
  gdp: 1.42,
  gdpGrowth: 5.1,
  inflation: 2.9,
  debtToGdp: 39.4,
  fdi: 24.6,
  population: 281,
  populationGrowth: 0.74,
  interestRate: 5.75,
  unemployment: 5.2,
  currency: 'IDR',
  riskScore: 45,
  capital: 'Jakarta',
  summary:
  'Resource downstreaming policy is shifting the economy up the value chain while domestic consumption stays resilient.'
},
{
  name: 'United States',
  code: 'US',
  flag: '🇺🇸',
  region: 'Americas',
  development: 'Developed',
  income: 'High',
  cgi: 88.1,
  cgiDelta: 0.4,
  gdp: 29.4,
  gdpGrowth: 2.3,
  inflation: 2.7,
  debtToGdp: 122.4,
  fdi: 311,
  population: 342,
  populationGrowth: 0.49,
  interestRate: 4.25,
  unemployment: 4.1,
  currency: 'USD',
  riskScore: 21,
  capital: 'Washington, D.C.',
  summary:
  'Innovation leadership and deep capital markets offset a widening fiscal deficit and elevated debt servicing burden.'
},
{
  name: 'Japan',
  code: 'JP',
  flag: '🇯🇵',
  region: 'Asia Pacific',
  development: 'Developed',
  income: 'High',
  cgi: 74.3,
  cgiDelta: 0.9,
  gdp: 4.21,
  gdpGrowth: 1.1,
  inflation: 2.2,
  debtToGdp: 249.7,
  fdi: 41.2,
  population: 123,
  populationGrowth: -0.52,
  interestRate: 0.5,
  unemployment: 2.5,
  currency: 'JPY',
  riskScore: 28,
  capital: 'Tokyo',
  summary:
  'Corporate governance reform and the end of deflation are re-rating domestic equity, though demographics remain a structural drag.'
},
{
  name: 'Germany',
  code: 'DE',
  flag: '🇩🇪',
  region: 'Europe',
  development: 'Developed',
  income: 'High',
  cgi: 76.8,
  cgiDelta: -0.6,
  gdp: 4.65,
  gdpGrowth: 0.8,
  inflation: 2.4,
  debtToGdp: 63.1,
  fdi: 34.8,
  population: 84,
  populationGrowth: 0.12,
  interestRate: 2.75,
  unemployment: 3.4,
  currency: 'EUR',
  riskScore: 26,
  capital: 'Berlin',
  summary:
  'Industrial base under pressure from energy costs and export competition, partially offset by a strong fiscal position.'
},
{
  name: 'Brazil',
  code: 'BR',
  flag: '🇧🇷',
  region: 'Americas',
  development: 'Emerging',
  income: 'Upper Middle',
  cgi: 68.4,
  cgiDelta: 1.8,
  gdp: 2.33,
  gdpGrowth: 2.6,
  inflation: 4.1,
  debtToGdp: 86.7,
  fdi: 62.1,
  population: 218,
  populationGrowth: 0.41,
  interestRate: 10.5,
  unemployment: 7.8,
  currency: 'BRL',
  riskScore: 56,
  capital: 'Brasília',
  summary:
  'Agricultural and energy exports underpin the external account while high real rates constrain domestic investment.'
},
{
  name: 'Mexico',
  code: 'MX',
  flag: '🇲🇽',
  region: 'Americas',
  development: 'Emerging',
  income: 'Upper Middle',
  cgi: 72.9,
  cgiDelta: 2.6,
  gdp: 1.85,
  gdpGrowth: 2.1,
  inflation: 3.9,
  debtToGdp: 52.8,
  fdi: 36.4,
  population: 130,
  populationGrowth: 0.62,
  interestRate: 9.5,
  unemployment: 2.8,
  currency: 'MXN',
  riskScore: 48,
  capital: 'Mexico City',
  summary:
  'Nearshoring demand is lifting industrial real estate and manufacturing capex across the northern corridor.'
},
{
  name: 'United Kingdom',
  code: 'GB',
  flag: '🇬🇧',
  region: 'Europe',
  development: 'Developed',
  income: 'High',
  cgi: 75.1,
  cgiDelta: 0.3,
  gdp: 3.59,
  gdpGrowth: 1.2,
  inflation: 2.9,
  debtToGdp: 101.2,
  fdi: 28.9,
  population: 69,
  populationGrowth: 0.34,
  interestRate: 4.0,
  unemployment: 4.3,
  currency: 'GBP',
  riskScore: 30,
  capital: 'London',
  summary:
  'Services-led growth with a deep financial sector; productivity remains the key structural constraint.'
},
{
  name: 'United Arab Emirates',
  code: 'AE',
  flag: '🇦🇪',
  region: 'Middle East',
  development: 'Emerging',
  income: 'High',
  cgi: 82.3,
  cgiDelta: 2.9,
  gdp: 0.55,
  gdpGrowth: 4.2,
  inflation: 2.1,
  debtToGdp: 29.4,
  fdi: 30.7,
  population: 10,
  populationGrowth: 1.42,
  interestRate: 4.4,
  unemployment: 2.7,
  currency: 'AED',
  riskScore: 31,
  capital: 'Abu Dhabi',
  summary:
  'Aggressive diversification into logistics, finance and tourism is reducing hydrocarbon dependence faster than regional peers.'
},
{
  name: 'Saudi Arabia',
  code: 'SA',
  flag: '🇸🇦',
  region: 'Middle East',
  development: 'Emerging',
  income: 'High',
  cgi: 74.8,
  cgiDelta: 1.1,
  gdp: 1.11,
  gdpGrowth: 3.4,
  inflation: 1.9,
  debtToGdp: 30.1,
  fdi: 21.3,
  population: 37,
  populationGrowth: 1.28,
  interestRate: 5.0,
  unemployment: 4.9,
  currency: 'SAR',
  riskScore: 41,
  capital: 'Riyadh',
  summary:
  'Giga-project capex sustains non-oil growth, though execution and oil-price sensitivity remain the dominant risks.'
},
{
  name: 'China',
  code: 'CN',
  flag: '🇨🇳',
  region: 'Asia Pacific',
  development: 'Emerging',
  income: 'Upper Middle',
  cgi: 77.6,
  cgiDelta: -1.4,
  gdp: 18.9,
  gdpGrowth: 4.6,
  inflation: 0.7,
  debtToGdp: 88.6,
  fdi: 42.8,
  population: 1412,
  populationGrowth: -0.11,
  interestRate: 3.1,
  unemployment: 5.1,
  currency: 'CNY',
  riskScore: 52,
  capital: 'Beijing',
  summary:
  'Manufacturing and green-tech leadership contrasts with property-sector deleveraging and weak household confidence.'
},
{
  name: 'South Korea',
  code: 'KR',
  flag: '🇰🇷',
  region: 'Asia Pacific',
  development: 'Developed',
  income: 'High',
  cgi: 81.2,
  cgiDelta: 1.6,
  gdp: 1.79,
  gdpGrowth: 2.4,
  inflation: 2.3,
  debtToGdp: 55.2,
  fdi: 18.4,
  population: 52,
  populationGrowth: -0.09,
  interestRate: 3.0,
  unemployment: 2.9,
  currency: 'KRW',
  riskScore: 33,
  capital: 'Seoul',
  summary:
  'Semiconductor cycle upturn and record R&D intensity, weighed against the steepest fertility decline in the OECD.'
},
{
  name: 'Poland',
  code: 'PL',
  flag: '🇵🇱',
  region: 'Europe',
  development: 'Emerging',
  income: 'High',
  cgi: 78.4,
  cgiDelta: 2.2,
  gdp: 0.86,
  gdpGrowth: 3.4,
  inflation: 3.8,
  debtToGdp: 49.6,
  fdi: 29.1,
  population: 37,
  populationGrowth: -0.18,
  interestRate: 5.75,
  unemployment: 3.1,
  currency: 'PLN',
  riskScore: 38,
  capital: 'Warsaw',
  summary:
  'EU transfers and supply-chain relocation into Central Europe are compounding an already strong investment cycle.'
},
{
  name: 'Nigeria',
  code: 'NG',
  flag: '🇳🇬',
  region: 'Africa',
  development: 'Frontier',
  income: 'Lower Middle',
  cgi: 58.7,
  cgiDelta: 2.4,
  gdp: 0.39,
  gdpGrowth: 3.2,
  inflation: 21.4,
  debtToGdp: 46.3,
  fdi: 3.8,
  population: 229,
  populationGrowth: 2.41,
  interestRate: 22.5,
  unemployment: 5.0,
  currency: 'NGN',
  riskScore: 74,
  capital: 'Abuja',
  summary:
  'Post-reform FX unification improved transparency but inflation and fiscal financing remain acute constraints.'
},
{
  name: 'South Africa',
  code: 'ZA',
  flag: '🇿🇦',
  region: 'Africa',
  development: 'Emerging',
  income: 'Upper Middle',
  cgi: 61.2,
  cgiDelta: 0.7,
  gdp: 0.41,
  gdpGrowth: 1.4,
  inflation: 4.7,
  debtToGdp: 74.8,
  fdi: 5.2,
  population: 61,
  populationGrowth: 0.87,
  interestRate: 7.75,
  unemployment: 32.1,
  currency: 'ZAR',
  riskScore: 68,
  capital: 'Pretoria',
  summary:
  'Energy reform is easing the growth ceiling, but labour-market exclusion keeps potential output structurally low.'
},
{
  name: 'Kenya',
  code: 'KE',
  flag: '🇰🇪',
  region: 'Africa',
  development: 'Frontier',
  income: 'Lower Middle',
  cgi: 63.4,
  cgiDelta: 3.1,
  gdp: 0.12,
  gdpGrowth: 5.2,
  inflation: 6.1,
  debtToGdp: 68.4,
  fdi: 1.6,
  population: 56,
  populationGrowth: 1.91,
  interestRate: 11.25,
  unemployment: 5.7,
  currency: 'KES',
  riskScore: 71,
  capital: 'Nairobi',
  summary:
  'Digital financial services and agri-exports drive growth; external debt servicing is the principal vulnerability.'
},
{
  name: 'France',
  code: 'FR',
  flag: '🇫🇷',
  region: 'Europe',
  development: 'Developed',
  income: 'High',
  cgi: 74.9,
  cgiDelta: -0.2,
  gdp: 3.17,
  gdpGrowth: 1.0,
  inflation: 2.1,
  debtToGdp: 111.6,
  fdi: 25.4,
  population: 68,
  populationGrowth: 0.21,
  interestRate: 2.75,
  unemployment: 7.3,
  currency: 'EUR',
  riskScore: 32,
  capital: 'Paris',
  summary:
  'Diversified services and luxury exports with a stable investment base; fiscal consolidation is the open question.'
},
{
  name: 'Australia',
  code: 'AU',
  flag: '🇦🇺',
  region: 'Asia Pacific',
  development: 'Developed',
  income: 'High',
  cgi: 79.8,
  cgiDelta: 0.8,
  gdp: 1.82,
  gdpGrowth: 1.9,
  inflation: 3.1,
  debtToGdp: 48.2,
  fdi: 32.6,
  population: 27,
  populationGrowth: 1.14,
  interestRate: 4.1,
  unemployment: 4.0,
  currency: 'AUD',
  riskScore: 24,
  capital: 'Canberra',
  summary:
  'Critical minerals demand and high-skill migration sustain growth in a low-risk institutional environment.'
},
{
  name: 'Canada',
  code: 'CA',
  flag: '🇨🇦',
  region: 'Americas',
  development: 'Developed',
  income: 'High',
  cgi: 77.2,
  cgiDelta: 0.2,
  gdp: 2.24,
  gdpGrowth: 1.6,
  inflation: 2.4,
  debtToGdp: 104.3,
  fdi: 27.8,
  population: 41,
  populationGrowth: 1.62,
  interestRate: 3.25,
  unemployment: 6.4,
  currency: 'CAD',
  riskScore: 25,
  capital: 'Ottawa',
  summary:
  'Population growth supports demand, while household leverage and housing affordability cap the policy runway.'
},
{
  name: 'Philippines',
  code: 'PH',
  flag: '🇵🇭',
  region: 'Asia Pacific',
  development: 'Frontier',
  income: 'Lower Middle',
  cgi: 76.1,
  cgiDelta: 2.7,
  gdp: 0.47,
  gdpGrowth: 5.8,
  inflation: 3.6,
  debtToGdp: 57.2,
  fdi: 8.9,
  population: 118,
  populationGrowth: 1.42,
  interestRate: 6.0,
  unemployment: 4.3,
  currency: 'PHP',
  riskScore: 47,
  capital: 'Manila',
  summary:
  'Young workforce, remittance stability and a services export base make it one of the fastest-growing ASEAN economies.'
},
{
  name: 'Türkiye',
  code: 'TR',
  flag: '🇹🇷',
  region: 'Europe',
  development: 'Emerging',
  income: 'Upper Middle',
  cgi: 64.8,
  cgiDelta: -2.1,
  gdp: 1.14,
  gdpGrowth: 3.1,
  inflation: 38.4,
  debtToGdp: 31.2,
  fdi: 10.4,
  population: 86,
  populationGrowth: 0.51,
  interestRate: 42.5,
  unemployment: 8.6,
  currency: 'TRY',
  riskScore: 79,
  capital: 'Ankara',
  summary:
  'Orthodox policy return is slowly rebuilding credibility, but inflation and currency volatility dominate risk pricing.'
},
{
  name: 'Singapore',
  code: 'SG',
  flag: '🇸🇬',
  region: 'Asia Pacific',
  development: 'Developed',
  income: 'High',
  cgi: 86.7,
  cgiDelta: 1.3,
  gdp: 0.56,
  gdpGrowth: 2.8,
  inflation: 1.8,
  debtToGdp: 168.4,
  fdi: 141.2,
  population: 6,
  populationGrowth: 0.94,
  interestRate: 3.2,
  unemployment: 2.0,
  currency: 'SGD',
  riskScore: 18,
  capital: 'Singapore',
  summary:
  'Regional capital hub with best-in-class governance; growth tracks global trade and financial flows closely.'
},
{
  name: 'Chile',
  code: 'CL',
  flag: '🇨🇱',
  region: 'Americas',
  development: 'Emerging',
  income: 'High',
  cgi: 70.4,
  cgiDelta: 1.4,
  gdp: 0.34,
  gdpGrowth: 2.4,
  inflation: 3.8,
  debtToGdp: 41.2,
  fdi: 15.7,
  population: 20,
  populationGrowth: 0.58,
  interestRate: 5.25,
  unemployment: 8.4,
  currency: 'CLP',
  riskScore: 44,
  capital: 'Santiago',
  summary:
  'Copper and lithium leverage to the energy transition, supported by credible macro institutions.'
}];


function bandOf(score: number): Country['riskBand'] {
  if (score < 30) return 'Low';
  if (score < 50) return 'Moderate';
  if (score < 70) return 'Elevated';
  return 'High';
}

export const countries: Country[] = seeds.map((s, i) => ({
  id: s.code.toLowerCase(),
  ...s,
  riskBand: bandOf(s.riskScore),
  trend: makeTrend(i + 7, s.cgi),
  cgiHistory: makeHistory(i + 3, s.cgi, s.gdpGrowth),
  pillars: makePillars(i + 5, s.cgi)
}));

export const countryById = (id: string): Country | undefined =>
countries.find((c) => c.id === id.toLowerCase());

export const regions: Country['region'][] = [
'Asia Pacific',
'Europe',
'Americas',
'Middle East',
'Africa'];


export const regionAggregates = regions.map((region) => {
  const list = countries.filter((c) => c.region === region);
  const cgi = list.reduce((a, c) => a + c.cgi, 0) / list.length;
  const growth = list.reduce((a, c) => a + c.gdpGrowth, 0) / list.length;
  const risk = list.reduce((a, c) => a + c.riskScore, 0) / list.length;
  return {
    region,
    cgi: Number(cgi.toFixed(1)),
    growth: Number(growth.toFixed(2)),
    risk: Number(risk.toFixed(0)),
    count: list.length
  };
});