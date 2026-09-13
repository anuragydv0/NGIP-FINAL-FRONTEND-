import {
  CalendarEvent,
  NewsItem,
  NotificationItem,
  ResearchReport } from
'../types';

export const news: NewsItem[] = [
{
  id: 'n1',
  headline:
  'India lifts FY27 capital expenditure outlay by 14%, focus shifts to logistics corridors',
  summary:
  'The central budget allocates a record outlay toward freight corridors, port modernisation and grid interconnection, with an explicit push to crowd in private capital through hybrid annuity structures.',
  source: 'NGIP Wire',
  time: '18 min ago',
  country: 'India',
  flag: '🇮🇳',
  category: 'Policy',
  impact: 'High',
  featured: true
},
{
  id: 'n2',
  headline: 'Bank of Japan holds policy rate, signals gradual normalisation path',
  summary:
  'Policy board maintains the 0.5% rate while upgrading its wage-growth assessment, keeping a March adjustment firmly in play.',
  source: 'Global Macro Desk',
  time: '42 min ago',
  country: 'Japan',
  flag: '🇯🇵',
  category: 'Central Bank',
  impact: 'High'
},
{
  id: 'n3',
  headline: 'Vietnam FDI registrations reach record $38.2B on electronics relocation',
  summary:
  'Registered foreign direct investment climbed 21% year on year, concentrated in electronics assembly and component manufacturing in the northern provinces.',
  source: 'ASEAN Economic Review',
  time: '1 hr ago',
  country: 'Vietnam',
  flag: '🇻🇳',
  category: 'Economic',
  impact: 'High'
},
{
  id: 'n4',
  headline: 'Korea chip exports post fourteenth consecutive month of expansion',
  summary:
  'Memory pricing and HBM demand continue to drive the export cycle, with semiconductor shipments up 28% year on year.',
  source: 'NGIP Wire',
  time: '2 hr ago',
  country: 'South Korea',
  flag: '🇰🇷',
  category: 'Trade',
  impact: 'Medium'
},
{
  id: 'n5',
  headline: 'EU industrial energy package targets grid buildout across member states',
  summary:
  'A €120B multi-year framework prioritises interconnection and storage, easing one of the binding constraints on European industrial competitiveness.',
  source: 'Continental Policy Brief',
  time: '3 hr ago',
  country: 'Germany',
  flag: '🇩🇪',
  category: 'Energy',
  impact: 'Medium'
},
{
  id: 'n6',
  headline: 'Mexico industrial park occupancy hits 97% in northern border states',
  summary:
  'Nearshoring demand continues to outstrip supply, pushing rents higher and accelerating greenfield development pipelines.',
  source: 'Americas Industrial Monitor',
  time: '4 hr ago',
  country: 'Mexico',
  flag: '🇲🇽',
  category: 'Infrastructure',
  impact: 'Medium'
},
{
  id: 'n7',
  headline: 'Indonesia extends nickel downstreaming incentives through 2030',
  summary:
  'Policy continuity supports the battery supply-chain thesis but raises questions about trade friction with key export partners.',
  source: 'ASEAN Economic Review',
  time: '6 hr ago',
  country: 'Indonesia',
  flag: '🇮🇩',
  category: 'Policy',
  impact: 'Medium'
},
{
  id: 'n8',
  headline: 'Türkiye inflation prints below consensus for third straight month',
  summary:
  'Headline CPI decelerated to 38.4%, supporting the central bank case for a measured easing cycle beginning next quarter.',
  source: 'Global Macro Desk',
  time: '8 hr ago',
  country: 'Türkiye',
  flag: '🇹🇷',
  category: 'Economic',
  impact: 'High'
},
{
  id: 'n9',
  headline: 'Gulf sovereign funds raise allocation to Asian infrastructure',
  summary:
  'Combined commitments of $24B signal a durable capital rotation from developed-market credit toward emerging-market real assets.',
  source: 'NGIP Wire',
  time: '11 hr ago',
  country: 'United Arab Emirates',
  flag: '🇦🇪',
  category: 'Economic',
  impact: 'Low'
},
{
  id: 'n10',
  headline: 'US Treasury yields ease as labour market data softens',
  summary:
  'The 10-year fell nine basis points after payroll revisions pointed to a cooler underlying trend than previously reported.',
  source: 'Global Macro Desk',
  time: '13 hr ago',
  country: 'United States',
  flag: '🇺🇸',
  category: 'Central Bank',
  impact: 'Medium'
},
{
  id: 'n11',
  headline: 'Nigeria FX reserves stabilise following remittance channel reforms',
  summary:
  'Reserves rose for a fourth month, though import cover remains below the central bank comfort threshold.',
  source: 'Sahel Economic Monitor',
  time: '16 hr ago',
  country: 'Nigeria',
  flag: '🇳🇬',
  category: 'Economic',
  impact: 'Low'
},
{
  id: 'n12',
  headline: 'Global trade tensions escalate over critical minerals export controls',
  summary:
  'New licensing requirements on rare-earth processing raise supply concerns across the electric-vehicle and defence supply chains.',
  source: 'Geopolitical Risk Desk',
  time: '19 hr ago',
  country: 'China',
  flag: '🇨🇳',
  category: 'Geopolitics',
  impact: 'High'
}];


export const newsCategories = [
'All',
'Economic',
'Central Bank',
'Policy',
'Trade',
'Technology',
'Infrastructure',
'Energy',
'Geopolitics'];


export const research: ResearchReport[] = [
{
  id: 'r1',
  title: 'India 2030: The Capex Decade',
  category: 'Country Research',
  country: 'India',
  flag: '🇮🇳',
  author: 'Ananya Raghavan',
  role: 'Head of Emerging Markets Research',
  date: '10 Sep 2026',
  readingTime: '18 min',
  excerpt:
  'India enters the second half of the decade with the strongest investment cycle since liberalisation. We examine capacity creation, financing capacity and the risks to the base case.',
  featured: true,
  rating: 'Overweight'
},
{
  id: 'r2',
  title: 'Vietnam: The Second Wave of Manufacturing Relocation',
  category: 'Country Research',
  country: 'Vietnam',
  flag: '🇻🇳',
  author: 'Minh Trần',
  role: 'ASEAN Strategist',
  date: '08 Sep 2026',
  readingTime: '14 min',
  excerpt:
  'Export complexity is rising faster than headline FDI implies. We map the transition from assembly to component manufacturing and its margin implications.',
  rating: 'Overweight'
},
{
  id: 'r3',
  title: 'Global Economic Outlook — Q4 2026',
  category: 'Economic Outlook',
  country: 'Global',
  flag: '🌐',
  author: 'NGIP Global Macro Desk',
  role: 'Research Team',
  date: '05 Sep 2026',
  readingTime: '26 min',
  excerpt:
  'Disinflation is broadening while growth diverges. Our base case assumes 3.2% global growth with emerging Asia contributing over half of incremental output.',
  featured: true,
  rating: 'Neutral'
},
{
  id: 'r4',
  title: 'The Demographic Dividend Map',
  category: 'Global Themes',
  country: 'Global',
  flag: '🌐',
  author: 'Priya Menon',
  role: 'Thematic Research Lead',
  date: '02 Sep 2026',
  readingTime: '21 min',
  excerpt:
  'Nine economies will supply 62% of net global labour-force growth to 2040. We rank them on absorptive capacity, not just population.'
},
{
  id: 'r5',
  title: 'Semiconductors and Sovereign Strategy',
  category: 'Sector Research',
  country: 'South Korea',
  flag: '🇰🇷',
  author: 'Ji-woo Park',
  role: 'Technology Sector Analyst',
  date: '30 Aug 2026',
  readingTime: '16 min',
  excerpt:
  'Industrial policy is reshaping the semiconductor cycle. We assess the durability of the current upturn against subsidy-driven capacity additions.',
  rating: 'Overweight'
},
{
  id: 'r6',
  title: 'European Industrial Competitiveness: A Reassessment',
  category: 'Market Research',
  country: 'Germany',
  flag: '🇩🇪',
  author: 'Lukas Brandt',
  role: 'European Strategist',
  date: '27 Aug 2026',
  readingTime: '19 min',
  excerpt:
  'Energy costs remain the binding constraint. We quantify the gap versus US and Asian peers and identify where reform delivers the largest delta.',
  rating: 'Underweight'
},
{
  id: 'r7',
  title: 'Nearshoring: Measuring the Real Capital Flows',
  category: 'Global Themes',
  country: 'Mexico',
  flag: '🇲🇽',
  author: 'Carla Ibarra',
  role: 'Americas Research',
  date: '24 Aug 2026',
  readingTime: '13 min',
  excerpt:
  'Announcements exceed deployment by a wide margin. We separate committed capital from signed intent across the North American corridor.',
  rating: 'Overweight'
},
{
  id: 'r8',
  title: 'Sovereign Debt Sustainability in Frontier Africa',
  category: 'Country Research',
  country: 'Kenya',
  flag: '🇰🇪',
  author: 'Wanjiru Kamau',
  role: 'Frontier Markets Analyst',
  date: '20 Aug 2026',
  readingTime: '17 min',
  excerpt:
  'External debt servicing peaks in 2027. We stress-test five frontier issuers under three global rate scenarios.',
  rating: 'Neutral'
},
{
  id: 'r9',
  title: 'The Gulf Diversification Scorecard',
  category: 'Country Research',
  country: 'United Arab Emirates',
  flag: '🇦🇪',
  author: 'Omar Haddad',
  role: 'MENA Research Lead',
  date: '16 Aug 2026',
  readingTime: '15 min',
  excerpt:
  'Non-oil GDP share has crossed a structural threshold in two Gulf economies. We measure progress against stated national strategies.',
  rating: 'Overweight'
}];


export const researchCategories = [
'All',
'Country Research',
'Global Themes',
'Economic Outlook',
'Market Research',
'Sector Research'];


export const calendarEvents: CalendarEvent[] = [
{
  id: 'c1',
  date: '12 Sep 2026',
  time: '11:30',
  country: 'India',
  flag: '🇮🇳',
  event: 'CPI Inflation YoY (Aug)',
  previous: '4.8%',
  expected: '4.6%',
  actual: '4.5%',
  importance: 'High',
  type: 'Inflation'
},
{
  id: 'c2',
  date: '12 Sep 2026',
  time: '14:00',
  country: 'United States',
  flag: '🇺🇸',
  event: 'Initial Jobless Claims',
  previous: '218K',
  expected: '224K',
  actual: '231K',
  importance: 'Medium',
  type: 'Employment'
},
{
  id: 'c3',
  date: '12 Sep 2026',
  time: '18:15',
  country: 'Germany',
  flag: '🇩🇪',
  event: 'Industrial Production MoM',
  previous: '-0.4%',
  expected: '0.2%',
  actual: null,
  importance: 'Medium',
  type: 'Output'
},
{
  id: 'c4',
  date: '13 Sep 2026',
  time: '05:30',
  country: 'Japan',
  flag: '🇯🇵',
  event: 'BoJ Policy Rate Decision',
  previous: '0.50%',
  expected: '0.50%',
  actual: null,
  importance: 'High',
  type: 'Central Bank'
},
{
  id: 'c5',
  date: '13 Sep 2026',
  time: '09:00',
  country: 'Vietnam',
  flag: '🇻🇳',
  event: 'Trade Balance (Aug)',
  previous: '$2.1B',
  expected: '$2.4B',
  actual: null,
  importance: 'Medium',
  type: 'Trade'
},
{
  id: 'c6',
  date: '14 Sep 2026',
  time: '12:00',
  country: 'United Kingdom',
  flag: '🇬🇧',
  event: 'GDP QoQ (Q2 Final)',
  previous: '0.3%',
  expected: '0.3%',
  actual: null,
  importance: 'High',
  type: 'Growth'
},
{
  id: 'c7',
  date: '14 Sep 2026',
  time: '16:30',
  country: 'Brazil',
  flag: '🇧🇷',
  event: 'Selic Rate Decision',
  previous: '10.50%',
  expected: '10.25%',
  actual: null,
  importance: 'High',
  type: 'Central Bank'
},
{
  id: 'c8',
  date: '15 Sep 2026',
  time: '07:00',
  country: 'China',
  flag: '🇨🇳',
  event: 'Industrial Production YoY',
  previous: '5.1%',
  expected: '5.0%',
  actual: null,
  importance: 'High',
  type: 'Output'
},
{
  id: 'c9',
  date: '15 Sep 2026',
  time: '11:00',
  country: 'Indonesia',
  flag: '🇮🇩',
  event: 'BI 7-Day Reverse Repo',
  previous: '5.75%',
  expected: '5.75%',
  actual: null,
  importance: 'Medium',
  type: 'Central Bank'
},
{
  id: 'c10',
  date: '16 Sep 2026',
  time: '13:00',
  country: 'South Korea',
  flag: '🇰🇷',
  event: 'Export Growth (Sep 1-20)',
  previous: '28.4%',
  expected: '24.0%',
  actual: null,
  importance: 'Medium',
  type: 'Trade'
}];


export const notifications: NotificationItem[] = [
{
  id: 'x1',
  category: 'Orders',
  title: 'Order executed — BICAP',
  body: '120 units filled at ₹486.35. Order NG-2609-84213 completed.',
  time: '10:42 AM',
  read: false
},
{
  id: 'x2',
  category: 'Economic',
  title: 'India CGI updated to 91.4',
  body: 'Country Growth Index rose 2.1 points following the Q2 capex revision.',
  time: '09:15 AM',
  read: false
},
{
  id: 'x3',
  category: 'Portfolio',
  title: 'Concentration threshold crossed',
  body: 'India exposure now represents 48.4% of portfolio value, above your 45% alert.',
  time: '08:50 AM',
  read: false
},
{
  id: 'x4',
  category: 'Markets',
  title: 'KOSPI up 2.14%',
  body: 'Korean equities extended gains on semiconductor export data.',
  time: 'Yesterday',
  read: true
},
{
  id: 'x5',
  category: 'News',
  title: 'High-impact story — Vietnam',
  body: 'Vietnam FDI registrations reach record $38.2B on electronics relocation.',
  time: 'Yesterday',
  read: true
},
{
  id: 'x6',
  category: 'Security',
  title: 'New device signed in',
  body: 'Chrome on macOS · Mumbai, India · 11 Sep 2026 at 07:12 PM.',
  time: '11 Sep',
  read: true
},
{
  id: 'x7',
  category: 'System',
  title: 'Economic data refresh completed',
  body: '14 indicators updated across 24 covered economies.',
  time: '11 Sep',
  read: true
}];


export const alerts = [
{
  id: 'a1',
  name: 'India CGI above 90',
  type: 'CGI threshold',
  target: 'India',
  condition: 'CGI > 90.0',
  status: 'Triggered' as const,
  lastRun: '12 Sep, 09:15'
},
{
  id: 'a2',
  name: 'Vietnam GDP growth above 6.5%',
  type: 'GDP threshold',
  target: 'Vietnam',
  condition: 'GDP Growth > 6.5%',
  status: 'Active' as const,
  lastRun: '12 Sep, 06:00'
},
{
  id: 'a3',
  name: 'Portfolio drawdown alert',
  type: 'Portfolio drawdown',
  target: 'Portfolio',
  condition: 'Drawdown < -8%',
  status: 'Active' as const,
  lastRun: '12 Sep, 10:00'
},
{
  id: 'a4',
  name: 'BICAP price alert',
  type: 'Instrument price',
  target: 'BICAP',
  condition: 'Price > ₹500.00',
  status: 'Active' as const,
  lastRun: '12 Sep, 10:42'
},
{
  id: 'a5',
  name: 'Türkiye inflation below 35%',
  type: 'Inflation threshold',
  target: 'Türkiye',
  condition: 'CPI < 35.0%',
  status: 'Paused' as const,
  lastRun: '04 Sep, 18:00'
},
{
  id: 'a6',
  name: 'BoJ rate decision',
  type: 'Major economic event',
  target: 'Japan',
  condition: 'Event published',
  status: 'Active' as const,
  lastRun: '13 Sep, 05:30'
}];


export const watchlists = [
{
  id: 'w1',
  name: 'My Countries',
  kind: 'country' as const,
  items: ['in', 'vn', 'id', 'mx', 'pl']
},
{
  id: 'w2',
  name: 'My Instruments',
  kind: 'instrument' as const,
  items: ['ngin', 'bicap', 'krsem', 'vnmfg', 'gdmi']
},
{
  id: 'w3',
  name: 'Emerging Markets',
  kind: 'country' as const,
  items: ['br', 'za', 'tr', 'cl', 'ph']
},
{
  id: 'w4',
  name: 'High Growth',
  kind: 'country' as const,
  items: ['in', 'vn', 'ph', 'ke']
},
{
  id: 'w5',
  name: 'Long Term',
  kind: 'instrument' as const,
  items: ['gdmi', 'igb34', 'gdemo']
}];