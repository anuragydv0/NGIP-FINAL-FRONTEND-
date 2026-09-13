export type Region =
'Asia Pacific' |
'Europe' |
'Americas' |
'Middle East' |
'Africa';

export type DevelopmentLevel = 'Developed' | 'Emerging' | 'Frontier';
export type IncomeLevel = 'High' | 'Upper Middle' | 'Lower Middle' | 'Low';
export type RiskBand = 'Low' | 'Moderate' | 'Elevated' | 'High';

export interface CGIPillar {
  label: string;
  score: number;
  delta: number;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: Region;
  development: DevelopmentLevel;
  income: IncomeLevel;
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
  riskBand: RiskBand;
  trend: number[];
  cgiHistory: {year: string;cgi: number;growth: number;}[];
  pillars: CGIPillar[];
  summary: string;
  capital: string;
}

export type InstrumentType =
'ETF' |
'Fund' |
'Bond' |
'Govt Security' |
'Equity Basket' |
'Index';

export interface Instrument {
  id: string;
  name: string;
  symbol: string;
  type: InstrumentType;
  countryId: string;
  country: string;
  flag: string;
  region: Region;
  sector: string;
  currency: string;
  price: number;
  change: number;
  changePct: number;
  aum: number;
  expenseRatio: number;
  liquidity: 'High' | 'Medium' | 'Low';
  risk: RiskBand;
  provider: string;
  ytd: number;
  oneYear: number;
  threeYear: number;
  trend: number[];
  countryExposure: {name: string;weight: number;}[];
  sectorExposure: {name: string;weight: number;}[];
}

export interface Holding {
  id: string;
  instrumentId: string;
  name: string;
  symbol: string;
  country: string;
  flag: string;
  region: Region;
  sector: string;
  units: number;
  avgCost: number;
  price: number;
  invested: number;
  value: number;
  pnl: number;
  returnPct: number;
  weight: number;
  dayPnl: number;
}

export type OrderStatus =
'Executed' |
'Open' |
'Pending' |
'Cancelled' |
'Rejected';

export interface Order {
  id: string;
  instrument: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  filled: number;
  price: number;
  orderType: 'Market' | 'Limit' | 'Stop Loss' | 'Stop Limit';
  status: OrderStatus;
  time: string;
  date: string;
  country: string;
  flag: string;
  charges: number;
  taxes: number;
}

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  time: string;
  country: string;
  flag: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  featured?: boolean;
}

export interface ResearchReport {
  id: string;
  title: string;
  category: string;
  country: string;
  flag: string;
  author: string;
  role: string;
  date: string;
  readingTime: string;
  excerpt: string;
  featured?: boolean;
  rating?: 'Overweight' | 'Neutral' | 'Underweight';
}

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  country: string;
  flag: string;
  event: string;
  previous: string;
  expected: string;
  actual: string | null;
  importance: 'High' | 'Medium' | 'Low';
  type: string;
}

export interface Transaction {
  id: string;
  date: string;
  type:
  'Deposit' |
  'Withdrawal' |
  'Investment' |
  'Redemption' |
  'Fee' |
  'Refund';
  description: string;
  instrument?: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  reference: string;
}

export interface NotificationItem {
  id: string;
  category:
  'Orders' |
  'Portfolio' |
  'Markets' |
  'Economic' |
  'News' |
  'Security' |
  'System';
  title: string;
  body: string;
  time: string;
  read: boolean;
}