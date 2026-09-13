export interface MarketRow {
  name: string;
  sub: string;
  value: number;
  change: number;
  changePct: number;
  trend: number[];
}

function trend(seed: number, base: number, len = 20): number[] {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v += (seed * (i + 2) * 23 % 100 / 100 - 0.47) * (base * 0.015);
    out.push(Number(v.toFixed(2)));
  }
  return out;
}

function build(
rows: [string, string, number, number][],
seedBase: number)
: MarketRow[] {
  return rows.map(([name, sub, value, changePct], i) => ({
    name,
    sub,
    value,
    changePct,
    change: Number((value * changePct / 100).toFixed(2)),
    trend: trend(seedBase + i, value)
  }));
}

export const globalIndices = build(
  [
  ['NGIP Global 200', 'Global composite', 4826.42, 0.62],
  ['NGIP Emerging 100', 'Emerging composite', 1284.16, 1.14],
  ['NIFTY 50', 'India', 26142.8, 0.84],
  ['S&P 500', 'United States', 6284.12, 0.34],
  ['Nikkei 225', 'Japan', 42186.4, -0.42],
  ['DAX', 'Germany', 19842.6, -0.28],
  ['FTSE 100', 'United Kingdom', 8642.18, 0.16],
  ['KOSPI', 'South Korea', 3128.44, 2.14],
  ['VN-Index', 'Vietnam', 1412.86, 1.62],
  ['Bovespa', 'Brazil', 138426.0, -0.86]],

  3
);

export const countryMarkets = build(
  [
  ['India', 'NIFTY 50', 26142.8, 0.84],
  ['United States', 'S&P 500', 6284.12, 0.34],
  ['Japan', 'Nikkei 225', 42186.4, -0.42],
  ['Germany', 'DAX', 19842.6, -0.28],
  ['South Korea', 'KOSPI', 3128.44, 2.14],
  ['Vietnam', 'VN-Index', 1412.86, 1.62],
  ['Indonesia', 'IDX Composite', 7842.16, 0.48],
  ['Mexico', 'IPC', 58426.2, 1.02],
  ['Poland', 'WIG20', 2648.4, 0.72],
  ['Australia', 'ASX 200', 8942.6, 0.38]],

  9
);

export const regionalMarkets = build(
  [
  ['Asia Pacific', '12 markets', 1842.62, 0.94],
  ['Europe', '9 markets', 1426.18, -0.22],
  ['Americas', '6 markets', 2184.42, 0.41],
  ['Middle East', '4 markets', 986.24, 0.68],
  ['Africa', '5 markets', 642.86, -0.34]],

  17
);

export const currencies = build(
  [
  ['USD / INR', 'Indian Rupee', 86.42, -0.12],
  ['EUR / INR', 'Euro', 94.18, 0.24],
  ['USD / JPY', 'Japanese Yen', 148.62, 0.36],
  ['USD / CNY', 'Chinese Yuan', 7.14, -0.08],
  ['USD / VND', 'Vietnamese Dong', 24862.0, 0.14],
  ['GBP / USD', 'Pound Sterling', 1.284, -0.18],
  ['USD / BRL', 'Brazilian Real', 5.42, 0.86],
  ['USD / TRY', 'Turkish Lira', 42.18, 1.24]],

  23
);

export const commodities = build(
  [
  ['Brent Crude', 'USD / barrel', 78.42, -1.24],
  ['Gold', 'USD / oz', 2846.2, 0.62],
  ['Silver', 'USD / oz', 34.18, 1.14],
  ['Copper', 'USD / lb', 4.62, 0.84],
  ['Lithium Carbonate', 'USD / tonne', 14280.0, -2.16],
  ['Natural Gas', 'USD / MMBtu', 3.42, 2.42],
  ['Wheat', 'USD / bushel', 6.18, -0.42]],

  31
);

export const economicIndicators = [
{ name: 'Global GDP Growth', value: '3.2%', change: 0.1, period: 'FY26E' },
{ name: 'Global Inflation', value: '4.1%', change: -0.4, period: 'Aug 2026' },
{ name: 'World Trade Volume', value: '+2.8%', change: 0.3, period: 'Q2 2026' },
{ name: 'Global FDI Flows', value: '$1.42T', change: 4.2, period: 'FY26E' },
{ name: 'Global PMI', value: '52.4', change: 0.8, period: 'Aug 2026' },
{ name: 'Commodity Index', value: '118.6', change: -1.2, period: 'Live' }];


export const marketMovers = {
  gainers: build(
    [
    ['Korea Semiconductor Leaders', 'KRSEM', 148.92, 2.68],
    ['Bharat Infrastructure Capex ETF', 'BICAP', 486.35, 2.14],
    ['Vietnam Manufacturing Basket', 'VNMFG', 42.18, 1.86],
    ['Mexico Nearshoring Industrial ETF', 'MXNS', 34.68, 1.42],
    ['NGIP India Growth Index Fund', 'NGIN', 1842.6, 1.24]],

    41
  ),
  losers: build(
    [
    ['Africa Frontier Opportunities', 'AFRO', 22.14, -1.24],
    ['Europe Industrial Renewal Fund', 'EIRF', 76.21, -0.86],
    ['Brazil Agri & Energy Basket', 'BRAGE', 29.86, -0.64],
    ['Japan Corporate Reform ETF', 'JCRE', 2842.0, -0.42],
    ['India Sovereign Bond 2034', 'IGB34', 101.42, -0.12]],

    47
  )
};

export const globalGrowthIndex = {
  value: 72.8,
  delta: 0.9,
  developed: { value: 78.4, delta: 0.3 },
  emerging: { value: 74.2, delta: 1.8 },
  frontier: { value: 66.1, delta: 2.4 }
};