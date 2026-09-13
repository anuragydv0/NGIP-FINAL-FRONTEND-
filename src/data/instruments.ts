import { Instrument } from '../types';

function trend(seed: number, base: number, len = 30): number[] {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v += (seed * (i + 3) * 19 % 100 / 100 - 0.46) * (base * 0.02);
    out.push(Number(v.toFixed(2)));
  }
  return out;
}

interface Seed {
  name: string;
  symbol: string;
  type: Instrument['type'];
  countryId: string;
  country: string;
  flag: string;
  region: Instrument['region'];
  sector: string;
  currency: string;
  price: number;
  changePct: number;
  aum: number;
  expenseRatio: number;
  liquidity: Instrument['liquidity'];
  risk: Instrument['risk'];
  provider: string;
  ytd: number;
  oneYear: number;
  threeYear: number;
  countryExposure: {name: string;weight: number;}[];
  sectorExposure: {name: string;weight: number;}[];
}

const seeds: Seed[] = [
{
  name: 'NGIP India Growth Index Fund',
  symbol: 'NGIN',
  type: 'Index',
  countryId: 'in',
  country: 'India',
  flag: '🇮🇳',
  region: 'Asia Pacific',
  sector: 'Broad Market',
  currency: 'INR',
  price: 1842.6,
  changePct: 1.24,
  aum: 18420,
  expenseRatio: 0.24,
  liquidity: 'High',
  risk: 'Moderate',
  provider: 'NGIP Asset Management',
  ytd: 14.8,
  oneYear: 21.4,
  threeYear: 17.2,
  countryExposure: [{ name: 'India', weight: 100 }],
  sectorExposure: [
  { name: 'Financials', weight: 31 },
  { name: 'Technology', weight: 18 },
  { name: 'Energy', weight: 12 },
  { name: 'Consumer', weight: 15 },
  { name: 'Industrials', weight: 14 },
  { name: 'Other', weight: 10 }]

},
{
  name: 'Bharat Infrastructure Capex ETF',
  symbol: 'BICAP',
  type: 'ETF',
  countryId: 'in',
  country: 'India',
  flag: '🇮🇳',
  region: 'Asia Pacific',
  sector: 'Infrastructure',
  currency: 'INR',
  price: 486.35,
  changePct: 2.14,
  aum: 6240,
  expenseRatio: 0.42,
  liquidity: 'High',
  risk: 'Elevated',
  provider: 'Meridian Global',
  ytd: 22.6,
  oneYear: 31.8,
  threeYear: 24.1,
  countryExposure: [{ name: 'India', weight: 100 }],
  sectorExposure: [
  { name: 'Construction', weight: 34 },
  { name: 'Utilities', weight: 22 },
  { name: 'Industrials', weight: 28 },
  { name: 'Materials', weight: 16 }]

},
{
  name: 'India Sovereign Bond 2034',
  symbol: 'IGB34',
  type: 'Govt Security',
  countryId: 'in',
  country: 'India',
  flag: '🇮🇳',
  region: 'Asia Pacific',
  sector: 'Sovereign Debt',
  currency: 'INR',
  price: 101.42,
  changePct: -0.12,
  aum: 24800,
  expenseRatio: 0.0,
  liquidity: 'High',
  risk: 'Low',
  provider: 'Government of India',
  ytd: 6.4,
  oneYear: 7.9,
  threeYear: 6.8,
  countryExposure: [{ name: 'India', weight: 100 }],
  sectorExposure: [{ name: 'Sovereign Debt', weight: 100 }]
},
{
  name: 'Vietnam Manufacturing Basket',
  symbol: 'VNMFG',
  type: 'Equity Basket',
  countryId: 'vn',
  country: 'Vietnam',
  flag: '🇻🇳',
  region: 'Asia Pacific',
  sector: 'Manufacturing',
  currency: 'USD',
  price: 42.18,
  changePct: 1.86,
  aum: 1840,
  expenseRatio: 0.58,
  liquidity: 'Medium',
  risk: 'Elevated',
  provider: 'Meridian Global',
  ytd: 18.2,
  oneYear: 27.4,
  threeYear: 15.9,
  countryExposure: [{ name: 'Vietnam', weight: 100 }],
  sectorExposure: [
  { name: 'Industrials', weight: 42 },
  { name: 'Technology', weight: 24 },
  { name: 'Materials', weight: 20 },
  { name: 'Consumer', weight: 14 }]

},
{
  name: 'ASEAN Frontier Growth Fund',
  symbol: 'ASFG',
  type: 'Fund',
  countryId: 'id',
  country: 'Indonesia',
  flag: '🇮🇩',
  region: 'Asia Pacific',
  sector: 'Broad Market',
  currency: 'USD',
  price: 128.94,
  changePct: 0.62,
  aum: 3120,
  expenseRatio: 0.86,
  liquidity: 'Medium',
  risk: 'Elevated',
  provider: 'Northgate Partners',
  ytd: 11.4,
  oneYear: 16.8,
  threeYear: 12.4,
  countryExposure: [
  { name: 'Indonesia', weight: 34 },
  { name: 'Vietnam', weight: 26 },
  { name: 'Philippines', weight: 21 },
  { name: 'Thailand', weight: 19 }],

  sectorExposure: [
  { name: 'Financials', weight: 29 },
  { name: 'Consumer', weight: 24 },
  { name: 'Industrials', weight: 22 },
  { name: 'Materials', weight: 25 }]

},
{
  name: 'Global Developed Markets Index',
  symbol: 'GDMI',
  type: 'Index',
  countryId: 'us',
  country: 'United States',
  flag: '🇺🇸',
  region: 'Americas',
  sector: 'Broad Market',
  currency: 'USD',
  price: 384.72,
  changePct: 0.34,
  aum: 92400,
  expenseRatio: 0.09,
  liquidity: 'High',
  risk: 'Low',
  provider: 'NGIP Asset Management',
  ytd: 9.8,
  oneYear: 14.2,
  threeYear: 11.6,
  countryExposure: [
  { name: 'United States', weight: 62 },
  { name: 'Japan', weight: 12 },
  { name: 'United Kingdom', weight: 8 },
  { name: 'Germany', weight: 6 },
  { name: 'Other', weight: 12 }],

  sectorExposure: [
  { name: 'Technology', weight: 30 },
  { name: 'Financials', weight: 18 },
  { name: 'Healthcare', weight: 14 },
  { name: 'Consumer', weight: 16 },
  { name: 'Industrials', weight: 12 },
  { name: 'Other', weight: 10 }]

},
{
  name: 'US Treasury 10Y Ladder',
  symbol: 'UST10',
  type: 'Bond',
  countryId: 'us',
  country: 'United States',
  flag: '🇺🇸',
  region: 'Americas',
  sector: 'Sovereign Debt',
  currency: 'USD',
  price: 98.64,
  changePct: 0.08,
  aum: 46200,
  expenseRatio: 0.06,
  liquidity: 'High',
  risk: 'Low',
  provider: 'NGIP Asset Management',
  ytd: 3.2,
  oneYear: 4.6,
  threeYear: 2.1,
  countryExposure: [{ name: 'United States', weight: 100 }],
  sectorExposure: [{ name: 'Sovereign Debt', weight: 100 }]
},
{
  name: 'Japan Corporate Reform ETF',
  symbol: 'JCRE',
  type: 'ETF',
  countryId: 'jp',
  country: 'Japan',
  flag: '🇯🇵',
  region: 'Asia Pacific',
  sector: 'Broad Market',
  currency: 'JPY',
  price: 2842.0,
  changePct: -0.42,
  aum: 5840,
  expenseRatio: 0.31,
  liquidity: 'High',
  risk: 'Moderate',
  provider: 'Kaiyo Capital',
  ytd: 12.4,
  oneYear: 19.1,
  threeYear: 14.8,
  countryExposure: [{ name: 'Japan', weight: 100 }],
  sectorExposure: [
  { name: 'Industrials', weight: 26 },
  { name: 'Technology', weight: 22 },
  { name: 'Financials', weight: 20 },
  { name: 'Consumer', weight: 18 },
  { name: 'Other', weight: 14 }]

},
{
  name: 'Europe Industrial Renewal Fund',
  symbol: 'EIRF',
  type: 'Fund',
  countryId: 'de',
  country: 'Germany',
  flag: '🇩🇪',
  region: 'Europe',
  sector: 'Industrials',
  currency: 'EUR',
  price: 76.21,
  changePct: -0.86,
  aum: 2480,
  expenseRatio: 0.74,
  liquidity: 'Medium',
  risk: 'Moderate',
  provider: 'Northgate Partners',
  ytd: 4.2,
  oneYear: 6.8,
  threeYear: 5.4,
  countryExposure: [
  { name: 'Germany', weight: 46 },
  { name: 'France', weight: 24 },
  { name: 'Netherlands', weight: 16 },
  { name: 'Italy', weight: 14 }],

  sectorExposure: [
  { name: 'Industrials', weight: 48 },
  { name: 'Materials', weight: 22 },
  { name: 'Utilities', weight: 18 },
  { name: 'Technology', weight: 12 }]

},
{
  name: 'Emerging Markets Growth Composite',
  symbol: 'EMGC',
  type: 'Index',
  countryId: 'cn',
  country: 'China',
  flag: '🌏',
  region: 'Asia Pacific',
  sector: 'Broad Market',
  currency: 'USD',
  price: 214.86,
  changePct: 1.02,
  aum: 31600,
  expenseRatio: 0.18,
  liquidity: 'High',
  risk: 'Elevated',
  provider: 'NGIP Asset Management',
  ytd: 13.6,
  oneYear: 18.9,
  threeYear: 9.8,
  countryExposure: [
  { name: 'China', weight: 28 },
  { name: 'India', weight: 22 },
  { name: 'Brazil', weight: 12 },
  { name: 'South Korea', weight: 14 },
  { name: 'Other', weight: 24 }],

  sectorExposure: [
  { name: 'Technology', weight: 26 },
  { name: 'Financials', weight: 24 },
  { name: 'Consumer', weight: 18 },
  { name: 'Energy', weight: 14 },
  { name: 'Other', weight: 18 }]

},
{
  name: 'Gulf Diversification Basket',
  symbol: 'GULFD',
  type: 'Equity Basket',
  countryId: 'ae',
  country: 'United Arab Emirates',
  flag: '🇦🇪',
  region: 'Middle East',
  sector: 'Diversified',
  currency: 'USD',
  price: 58.42,
  changePct: 0.94,
  aum: 1240,
  expenseRatio: 0.64,
  liquidity: 'Medium',
  risk: 'Moderate',
  provider: 'Meridian Global',
  ytd: 10.2,
  oneYear: 15.4,
  threeYear: 13.1,
  countryExposure: [
  { name: 'United Arab Emirates', weight: 54 },
  { name: 'Saudi Arabia', weight: 36 },
  { name: 'Qatar', weight: 10 }],

  sectorExposure: [
  { name: 'Financials', weight: 34 },
  { name: 'Real Estate', weight: 22 },
  { name: 'Energy', weight: 26 },
  { name: 'Consumer', weight: 18 }]

},
{
  name: 'Mexico Nearshoring Industrial ETF',
  symbol: 'MXNS',
  type: 'ETF',
  countryId: 'mx',
  country: 'Mexico',
  flag: '🇲🇽',
  region: 'Americas',
  sector: 'Industrials',
  currency: 'USD',
  price: 34.68,
  changePct: 1.42,
  aum: 980,
  expenseRatio: 0.52,
  liquidity: 'Medium',
  risk: 'Elevated',
  provider: 'Northgate Partners',
  ytd: 16.4,
  oneYear: 23.2,
  threeYear: 18.6,
  countryExposure: [{ name: 'Mexico', weight: 100 }],
  sectorExposure: [
  { name: 'Industrials', weight: 44 },
  { name: 'Real Estate', weight: 26 },
  { name: 'Materials', weight: 18 },
  { name: 'Transport', weight: 12 }]

},
{
  name: 'Poland & CEE Convergence Fund',
  symbol: 'CEECV',
  type: 'Fund',
  countryId: 'pl',
  country: 'Poland',
  flag: '🇵🇱',
  region: 'Europe',
  sector: 'Broad Market',
  currency: 'EUR',
  price: 91.34,
  changePct: 0.48,
  aum: 720,
  expenseRatio: 0.82,
  liquidity: 'Low',
  risk: 'Elevated',
  provider: 'Northgate Partners',
  ytd: 12.8,
  oneYear: 17.6,
  threeYear: 13.4,
  countryExposure: [
  { name: 'Poland', weight: 52 },
  { name: 'Czechia', weight: 22 },
  { name: 'Hungary', weight: 14 },
  { name: 'Romania', weight: 12 }],

  sectorExposure: [
  { name: 'Financials', weight: 32 },
  { name: 'Consumer', weight: 24 },
  { name: 'Industrials', weight: 26 },
  { name: 'Energy', weight: 18 }]

},
{
  name: 'Africa Frontier Opportunities',
  symbol: 'AFRO',
  type: 'Fund',
  countryId: 'ke',
  country: 'Kenya',
  flag: '🌍',
  region: 'Africa',
  sector: 'Broad Market',
  currency: 'USD',
  price: 22.14,
  changePct: -1.24,
  aum: 340,
  expenseRatio: 1.12,
  liquidity: 'Low',
  risk: 'High',
  provider: 'Sahel Advisors',
  ytd: 6.8,
  oneYear: 9.4,
  threeYear: 4.2,
  countryExposure: [
  { name: 'Kenya', weight: 32 },
  { name: 'Nigeria', weight: 28 },
  { name: 'South Africa', weight: 26 },
  { name: 'Egypt', weight: 14 }],

  sectorExposure: [
  { name: 'Financials', weight: 38 },
  { name: 'Consumer', weight: 26 },
  { name: 'Telecom', weight: 20 },
  { name: 'Energy', weight: 16 }]

},
{
  name: 'Korea Semiconductor Leaders',
  symbol: 'KRSEM',
  type: 'ETF',
  countryId: 'kr',
  country: 'South Korea',
  flag: '🇰🇷',
  region: 'Asia Pacific',
  sector: 'Technology',
  currency: 'USD',
  price: 148.92,
  changePct: 2.68,
  aum: 4120,
  expenseRatio: 0.48,
  liquidity: 'High',
  risk: 'Elevated',
  provider: 'Kaiyo Capital',
  ytd: 28.4,
  oneYear: 41.2,
  threeYear: 22.8,
  countryExposure: [{ name: 'South Korea', weight: 100 }],
  sectorExposure: [
  { name: 'Semiconductors', weight: 68 },
  { name: 'Equipment', weight: 22 },
  { name: 'Materials', weight: 10 }]

},
{
  name: 'Brazil Agri & Energy Basket',
  symbol: 'BRAGE',
  type: 'Equity Basket',
  countryId: 'br',
  country: 'Brazil',
  flag: '🇧🇷',
  region: 'Americas',
  sector: 'Commodities',
  currency: 'USD',
  price: 29.86,
  changePct: -0.64,
  aum: 610,
  expenseRatio: 0.68,
  liquidity: 'Medium',
  risk: 'High',
  provider: 'Meridian Global',
  ytd: 8.2,
  oneYear: 11.4,
  threeYear: 9.6,
  countryExposure: [{ name: 'Brazil', weight: 100 }],
  sectorExposure: [
  { name: 'Agriculture', weight: 42 },
  { name: 'Energy', weight: 34 },
  { name: 'Materials', weight: 24 }]

},
{
  name: 'Singapore REIT & Financials Fund',
  symbol: 'SGFIN',
  type: 'Fund',
  countryId: 'sg',
  country: 'Singapore',
  flag: '🇸🇬',
  region: 'Asia Pacific',
  sector: 'Financials',
  currency: 'SGD',
  price: 64.28,
  changePct: 0.22,
  aum: 1860,
  expenseRatio: 0.44,
  liquidity: 'High',
  risk: 'Low',
  provider: 'Kaiyo Capital',
  ytd: 7.4,
  oneYear: 10.8,
  threeYear: 8.2,
  countryExposure: [{ name: 'Singapore', weight: 100 }],
  sectorExposure: [
  { name: 'Real Estate', weight: 52 },
  { name: 'Financials', weight: 38 },
  { name: 'Other', weight: 10 }]

},
{
  name: 'Global Demographics Theme Fund',
  symbol: 'GDEMO',
  type: 'Fund',
  countryId: 'in',
  country: 'Multi-country',
  flag: '🌐',
  region: 'Asia Pacific',
  sector: 'Thematic',
  currency: 'USD',
  price: 112.46,
  changePct: 0.78,
  aum: 2240,
  expenseRatio: 0.72,
  liquidity: 'Medium',
  risk: 'Moderate',
  provider: 'NGIP Asset Management',
  ytd: 12.2,
  oneYear: 17.2,
  threeYear: 13.8,
  countryExposure: [
  { name: 'India', weight: 32 },
  { name: 'Indonesia', weight: 18 },
  { name: 'Philippines', weight: 14 },
  { name: 'Nigeria', weight: 10 },
  { name: 'Other', weight: 26 }],

  sectorExposure: [
  { name: 'Consumer', weight: 38 },
  { name: 'Financials', weight: 26 },
  { name: 'Healthcare', weight: 20 },
  { name: 'Technology', weight: 16 }]

},
{
  name: 'Australia Critical Minerals ETF',
  symbol: 'AUCM',
  type: 'ETF',
  countryId: 'au',
  country: 'Australia',
  flag: '🇦🇺',
  region: 'Asia Pacific',
  sector: 'Materials',
  currency: 'AUD',
  price: 41.62,
  changePct: 1.14,
  aum: 1420,
  expenseRatio: 0.46,
  liquidity: 'High',
  risk: 'Moderate',
  provider: 'Meridian Global',
  ytd: 15.2,
  oneYear: 20.6,
  threeYear: 16.4,
  countryExposure: [{ name: 'Australia', weight: 100 }],
  sectorExposure: [
  { name: 'Mining', weight: 62 },
  { name: 'Materials', weight: 24 },
  { name: 'Energy', weight: 14 }]

},
{
  name: 'UAE Sovereign Sukuk 2032',
  symbol: 'AESK32',
  type: 'Bond',
  countryId: 'ae',
  country: 'United Arab Emirates',
  flag: '🇦🇪',
  region: 'Middle East',
  sector: 'Sovereign Debt',
  currency: 'USD',
  price: 99.84,
  changePct: 0.04,
  aum: 8600,
  expenseRatio: 0.0,
  liquidity: 'Medium',
  risk: 'Low',
  provider: 'Government of UAE',
  ytd: 4.1,
  oneYear: 5.6,
  threeYear: 4.4,
  countryExposure: [{ name: 'United Arab Emirates', weight: 100 }],
  sectorExposure: [{ name: 'Sovereign Debt', weight: 100 }]
}];


export const instruments: Instrument[] = seeds.map((s, i) => ({
  id: s.symbol.toLowerCase(),
  ...s,
  change: Number((s.price * s.changePct / 100).toFixed(2)),
  trend: trend(i + 11, s.price)
}));

export const instrumentById = (id: string): Instrument | undefined =>
instruments.find((x) => x.id === id.toLowerCase());

export const instrumentTypes: Instrument['type'][] = [
'ETF',
'Fund',
'Bond',
'Govt Security',
'Equity Basket',
'Index'];