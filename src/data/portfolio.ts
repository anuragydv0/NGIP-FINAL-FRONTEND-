import { Holding, Order, Transaction } from '../types';

export const portfolioSummary = {
  totalValue: 1842250.5,
  dayPnl: 24530.2,
  dayPnlPct: 1.35,
  totalReturn: 342180.4,
  totalReturnPct: 22.81,
  invested: 1500070.1,
  availableFunds: 218400.0,
  withdrawable: 196200.0,
  pending: 22200.0,
  cagr: 16.42,
  xirr: 18.06,
  volatility: 12.8,
  sharpe: 1.34,
  maxDrawdown: -14.2,
  beta: 0.92
};

const rawHoldings: Omit<
  Holding,
  'invested' | 'value' | 'pnl' | 'returnPct' | 'weight'>[] =
[
{
  id: 'h1',
  instrumentId: 'ngin',
  name: 'NGIP India Growth Index Fund',
  symbol: 'NGIN',
  country: 'India',
  flag: '🇮🇳',
  region: 'Asia Pacific',
  sector: 'Broad Market',
  units: 240,
  avgCost: 1512.4,
  price: 1842.6,
  dayPnl: 5412.0
},
{
  id: 'h2',
  instrumentId: 'bicap',
  name: 'Bharat Infrastructure Capex ETF',
  symbol: 'BICAP',
  country: 'India',
  flag: '🇮🇳',
  region: 'Asia Pacific',
  sector: 'Infrastructure',
  units: 460,
  avgCost: 382.2,
  price: 486.35,
  dayPnl: 4682.4
},
{
  id: 'h3',
  instrumentId: 'vnmfg',
  name: 'Vietnam Manufacturing Basket',
  symbol: 'VNMFG',
  country: 'Vietnam',
  flag: '🇻🇳',
  region: 'Asia Pacific',
  sector: 'Manufacturing',
  units: 1800,
  avgCost: 91.4,
  price: 106.2,
  dayPnl: 3486.0
},
{
  id: 'h4',
  instrumentId: 'gdmi',
  name: 'Global Developed Markets Index',
  symbol: 'GDMI',
  country: 'United States',
  flag: '🇺🇸',
  region: 'Americas',
  sector: 'Broad Market',
  units: 84,
  avgCost: 28640.0,
  price: 32160.0,
  dayPnl: 3820.0
},
{
  id: 'h5',
  instrumentId: 'krsem',
  name: 'Korea Semiconductor Leaders',
  symbol: 'KRSEM',
  country: 'South Korea',
  flag: '🇰🇷',
  region: 'Asia Pacific',
  sector: 'Technology',
  units: 120,
  avgCost: 9840.0,
  price: 12464.0,
  dayPnl: 6240.0
},
{
  id: 'h6',
  instrumentId: 'igb34',
  name: 'India Sovereign Bond 2034',
  symbol: 'IGB34',
  country: 'India',
  flag: '🇮🇳',
  region: 'Asia Pacific',
  sector: 'Sovereign Debt',
  units: 1400,
  avgCost: 99.2,
  price: 101.42,
  dayPnl: -168.0
},
{
  id: 'h7',
  instrumentId: 'mxns',
  name: 'Mexico Nearshoring Industrial ETF',
  symbol: 'MXNS',
  country: 'Mexico',
  flag: '🇲🇽',
  region: 'Americas',
  sector: 'Industrials',
  units: 420,
  avgCost: 2410.0,
  price: 2902.0,
  dayPnl: 1840.0
},
{
  id: 'h8',
  instrumentId: 'gulfd',
  name: 'Gulf Diversification Basket',
  symbol: 'GULFD',
  country: 'United Arab Emirates',
  flag: '🇦🇪',
  region: 'Middle East',
  sector: 'Diversified',
  units: 260,
  avgCost: 4210.0,
  price: 4886.0,
  dayPnl: 962.0
},
{
  id: 'h9',
  instrumentId: 'eirf',
  name: 'Europe Industrial Renewal Fund',
  symbol: 'EIRF',
  country: 'Germany',
  flag: '🇩🇪',
  region: 'Europe',
  sector: 'Industrials',
  units: 180,
  avgCost: 7420.0,
  price: 6980.0,
  dayPnl: -1240.0
},
{
  id: 'h10',
  instrumentId: 'aucm',
  name: 'Australia Critical Minerals ETF',
  symbol: 'AUCM',
  country: 'Australia',
  flag: '🇦🇺',
  region: 'Asia Pacific',
  sector: 'Materials',
  units: 96,
  avgCost: 2140.0,
  price: 2318.0,
  dayPnl: 496.0
}];


const computed = rawHoldings.map((h) => {
  const invested = h.units * h.avgCost;
  const value = h.units * h.price;
  const pnl = value - invested;
  return {
    ...h,
    invested,
    value,
    pnl,
    returnPct: Number((pnl / invested * 100).toFixed(2))
  };
});

const totalValue = computed.reduce((a, h) => a + h.value, 0);

export const holdings: Holding[] = computed.map((h) => ({
  ...h,
  weight: Number((h.value / totalValue * 100).toFixed(2))
}));

function agg(key: 'country' | 'region' | 'sector') {
  const map = new Map<string, number>();
  holdings.forEach((h) => map.set(h[key], (map.get(h[key]) || 0) + h.value));
  return Array.from(map.entries()).
  map(([name, value]) => ({
    name,
    value,
    weight: Number((value / totalValue * 100).toFixed(1))
  })).
  sort((a, b) => b.value - a.value);
}

export const countryAllocation = agg('country');
export const regionAllocation = agg('region');
export const sectorAllocation = agg('sector');

export const currencyAllocation = [
{ name: 'INR', value: 0, weight: 48.4 },
{ name: 'USD', value: 0, weight: 26.1 },
{ name: 'KRW', value: 0, weight: 8.1 },
{ name: 'EUR', value: 0, weight: 6.8 },
{ name: 'AED', value: 0, weight: 6.9 },
{ name: 'AUD', value: 0, weight: 3.7 }];


export const assetAllocation = [
{ name: 'Index Funds', value: 0, weight: 34.2 },
{ name: 'ETFs', value: 0, weight: 28.6 },
{ name: 'Equity Baskets', value: 0, weight: 16.4 },
{ name: 'Sovereign Debt', value: 0, weight: 12.1 },
{ name: 'Funds', value: 0, weight: 8.7 }];


export const performanceSeries = (() => {
  const points: {
    date: string;
    portfolio: number;
    benchmark: number;
  }[] = [];
  let p = 1000000;
  let b = 1000000;
  const months = [
  'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24',
  'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24',
  'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25',
  'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25',
  'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26',
  'Jul 26', 'Aug 26', 'Sep 26'];

  months.forEach((date, i) => {
    p *= 1 + (i * 37 % 100 / 100 - 0.36) * 0.058;
    b *= 1 + (i * 53 % 100 / 100 - 0.38) * 0.042;
    points.push({
      date,
      portfolio: Math.round(p),
      benchmark: Math.round(b)
    });
  });
  points[points.length - 1].portfolio = 1842250;
  return points;
})();

export const drawdownSeries = performanceSeries.map((p, i) => {
  const peak = Math.max(...performanceSeries.slice(0, i + 1).map((x) => x.portfolio));
  return {
    date: p.date,
    drawdown: Number(((p.portfolio - peak) / peak * 100).toFixed(2))
  };
});

export const orders: Order[] = [
{
  id: 'NG-2609-84213',
  instrument: 'Bharat Infrastructure Capex ETF',
  symbol: 'BICAP',
  side: 'BUY',
  quantity: 120,
  filled: 120,
  price: 486.35,
  orderType: 'Limit',
  status: 'Executed',
  time: '10:42:18',
  date: '12 Sep 2026',
  country: 'India',
  flag: '🇮🇳',
  charges: 82.4,
  taxes: 41.2
},
{
  id: 'NG-2609-84198',
  instrument: 'Korea Semiconductor Leaders',
  symbol: 'KRSEM',
  side: 'BUY',
  quantity: 20,
  filled: 0,
  price: 12280.0,
  orderType: 'Limit',
  status: 'Open',
  time: '10:18:04',
  date: '12 Sep 2026',
  country: 'South Korea',
  flag: '🇰🇷',
  charges: 214.0,
  taxes: 108.0
},
{
  id: 'NG-2609-84172',
  instrument: 'Vietnam Manufacturing Basket',
  symbol: 'VNMFG',
  side: 'BUY',
  quantity: 400,
  filled: 180,
  price: 105.4,
  orderType: 'Limit',
  status: 'Pending',
  time: '09:58:31',
  date: '12 Sep 2026',
  country: 'Vietnam',
  flag: '🇻🇳',
  charges: 96.2,
  taxes: 48.1
},
{
  id: 'NG-2609-84140',
  instrument: 'Europe Industrial Renewal Fund',
  symbol: 'EIRF',
  side: 'SELL',
  quantity: 40,
  filled: 40,
  price: 6980.0,
  orderType: 'Market',
  status: 'Executed',
  time: '09:31:12',
  date: '12 Sep 2026',
  country: 'Germany',
  flag: '🇩🇪',
  charges: 168.4,
  taxes: 84.2
},
{
  id: 'NG-2609-84102',
  instrument: 'Africa Frontier Opportunities',
  symbol: 'AFRO',
  side: 'BUY',
  quantity: 300,
  filled: 0,
  price: 1842.0,
  orderType: 'Limit',
  status: 'Rejected',
  time: '09:16:47',
  date: '12 Sep 2026',
  country: 'Kenya',
  flag: '🌍',
  charges: 0,
  taxes: 0
},
{
  id: 'NG-2608-83914',
  instrument: 'NGIP India Growth Index Fund',
  symbol: 'NGIN',
  side: 'BUY',
  quantity: 60,
  filled: 60,
  price: 1798.2,
  orderType: 'Market',
  status: 'Executed',
  time: '14:22:09',
  date: '11 Sep 2026',
  country: 'India',
  flag: '🇮🇳',
  charges: 124.6,
  taxes: 62.3
},
{
  id: 'NG-2608-83880',
  instrument: 'Mexico Nearshoring Industrial ETF',
  symbol: 'MXNS',
  side: 'BUY',
  quantity: 90,
  filled: 0,
  price: 2840.0,
  orderType: 'Stop Limit',
  status: 'Cancelled',
  time: '13:04:55',
  date: '11 Sep 2026',
  country: 'Mexico',
  flag: '🇲🇽',
  charges: 0,
  taxes: 0
},
{
  id: 'NG-2608-83842',
  instrument: 'India Sovereign Bond 2034',
  symbol: 'IGB34',
  side: 'BUY',
  quantity: 400,
  filled: 400,
  price: 100.86,
  orderType: 'Limit',
  status: 'Executed',
  time: '11:47:21',
  date: '11 Sep 2026',
  country: 'India',
  flag: '🇮🇳',
  charges: 41.2,
  taxes: 20.6
},
{
  id: 'NG-2607-83610',
  instrument: 'Gulf Diversification Basket',
  symbol: 'GULFD',
  side: 'SELL',
  quantity: 40,
  filled: 40,
  price: 4842.0,
  orderType: 'Limit',
  status: 'Executed',
  time: '15:12:38',
  date: '10 Sep 2026',
  country: 'United Arab Emirates',
  flag: '🇦🇪',
  charges: 96.8,
  taxes: 48.4
},
{
  id: 'NG-2607-83588',
  instrument: 'Australia Critical Minerals ETF',
  symbol: 'AUCM',
  side: 'BUY',
  quantity: 36,
  filled: 36,
  price: 2286.0,
  orderType: 'Market',
  status: 'Executed',
  time: '10:02:14',
  date: '10 Sep 2026',
  country: 'Australia',
  flag: '🇦🇺',
  charges: 68.4,
  taxes: 34.2
}];


export const orderById = (id: string): Order | undefined =>
orders.find((o) => o.id === id);

export const transactions: Transaction[] = [
{
  id: 't1',
  date: '12 Sep 2026',
  type: 'Investment',
  description: 'Purchase — Bharat Infrastructure Capex ETF',
  instrument: 'BICAP',
  amount: -58362.0,
  status: 'Completed',
  reference: 'TXN-9048213'
},
{
  id: 't2',
  date: '12 Sep 2026',
  type: 'Fee',
  description: 'Brokerage & exchange charges',
  instrument: 'BICAP',
  amount: -123.6,
  status: 'Completed',
  reference: 'TXN-9048214'
},
{
  id: 't3',
  date: '11 Sep 2026',
  type: 'Deposit',
  description: 'Bank transfer — HDFC ••4821',
  amount: 200000.0,
  status: 'Completed',
  reference: 'TXN-9047880'
},
{
  id: 't4',
  date: '11 Sep 2026',
  type: 'Redemption',
  description: 'Sell — Europe Industrial Renewal Fund',
  instrument: 'EIRF',
  amount: 279200.0,
  status: 'Completed',
  reference: 'TXN-9047812'
},
{
  id: 't5',
  date: '10 Sep 2026',
  type: 'Investment',
  description: 'Purchase — Australia Critical Minerals ETF',
  instrument: 'AUCM',
  amount: -82296.0,
  status: 'Completed',
  reference: 'TXN-9046120'
},
{
  id: 't6',
  date: '09 Sep 2026',
  type: 'Withdrawal',
  description: 'Withdrawal to HDFC ••4821',
  amount: -50000.0,
  status: 'Pending',
  reference: 'TXN-9045002'
},
{
  id: 't7',
  date: '08 Sep 2026',
  type: 'Refund',
  description: 'Reversal — cancelled order NG-2608-83880',
  instrument: 'MXNS',
  amount: 2840.0,
  status: 'Completed',
  reference: 'TXN-9043118'
},
{
  id: 't8',
  date: '05 Sep 2026',
  type: 'Investment',
  description: 'Purchase — India Sovereign Bond 2034',
  instrument: 'IGB34',
  amount: -40344.0,
  status: 'Completed',
  reference: 'TXN-9040214'
},
{
  id: 't9',
  date: '02 Sep 2026',
  type: 'Deposit',
  description: 'Bank transfer — ICICI ••2210',
  amount: 150000.0,
  status: 'Completed',
  reference: 'TXN-9036411'
},
{
  id: 't10',
  date: '28 Aug 2026',
  type: 'Withdrawal',
  description: 'Withdrawal to HDFC ••4821',
  amount: -75000.0,
  status: 'Failed',
  reference: 'TXN-9030118'
}];


export const positions = holdings.slice(0, 7).map((h, i) => ({
  id: `p${i + 1}`,
  instrument: h.name,
  symbol: h.symbol,
  flag: h.flag,
  country: h.country,
  side: i % 4 === 3 ? 'SHORT' as const : 'LONG' as const,
  quantity: h.units,
  avgPrice: h.avgCost,
  price: h.price,
  dayPnl: h.dayPnl,
  unrealized: h.pnl,
  exposure: h.value,
  status: i === 2 ? 'Partially Closed' as const : 'Open' as const
}));