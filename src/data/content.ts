import {
  CalendarEvent,
  NewsItem,
  NotificationItem,
  ResearchReport } from
'../types';

const seedNews = [
  { headline: 'India lifts FY27 capital expenditure outlay by 14%, focus shifts to logistics corridors', summary: 'The central budget allocates a record outlay toward freight corridors, port modernisation and grid interconnection, with an explicit push to crowd in private capital through hybrid annuity structures.', source: 'NGIP Wire', country: 'India', flag: '🇮🇳', category: 'Policy' as const, impact: 'High' as const, featured: true },
  { headline: 'Bank of Japan holds policy rate, signals gradual normalisation path', summary: 'Policy board maintains the 0.5% rate while upgrading its wage-growth assessment, keeping a March adjustment firmly in play.', source: 'Global Macro Desk', country: 'Japan', flag: '🇯🇵', category: 'Central Bank' as const, impact: 'High' as const },
  { headline: 'Vietnam FDI registrations reach record $38.2B on electronics relocation', summary: 'Registered foreign direct investment climbed 21% year on year, concentrated in electronics assembly and component manufacturing in the northern provinces.', source: 'ASEAN Economic Review', country: 'Vietnam', flag: '🇻🇳', category: 'Economic' as const, impact: 'High' as const },
  { headline: 'Korea chip exports post fourteenth consecutive month of expansion', summary: 'Memory pricing and HBM demand continue to drive the export cycle, with semiconductor shipments up 28% year on year.', source: 'NGIP Wire', country: 'South Korea', flag: '🇰🇷', category: 'Trade' as const, impact: 'Medium' as const },
  { headline: 'EU industrial energy package targets grid buildout across member states', summary: 'A €120B multi-year framework prioritises interconnection and storage, easing one of the binding constraints on European industrial competitiveness.', source: 'Continental Policy Brief', country: 'Germany', flag: '🇩🇪', category: 'Energy' as const, impact: 'Medium' as const },
  { headline: 'Mexico industrial park occupancy hits 97% in northern border states', summary: 'Nearshoring demand continues to outstrip supply, pushing rents higher and accelerating greenfield development pipelines.', source: 'Americas Industrial Monitor', country: 'Mexico', flag: '🇲🇽', category: 'Infrastructure' as const, impact: 'Medium' as const },
  { headline: 'Indonesia extends nickel downstreaming incentives through 2030', summary: 'Policy continuity supports the battery supply-chain thesis but raises questions about trade friction with key export partners.', source: 'ASEAN Economic Review', country: 'Indonesia', flag: '🇮🇩', category: 'Policy' as const, impact: 'Medium' as const },
  { headline: 'Türkiye inflation prints below consensus for third straight month', summary: 'Headline CPI decelerated to 38.4%, supporting the central bank case for a measured easing cycle beginning next quarter.', source: 'Global Macro Desk', country: 'Türkiye', flag: '🇹🇷', category: 'Economic' as const, impact: 'High' as const },
  { headline: 'Gulf sovereign funds raise allocation to Asian infrastructure', summary: 'Combined commitments of $24B signal a durable capital rotation from developed-market credit toward emerging-market real assets.', source: 'NGIP Wire', country: 'United Arab Emirates', flag: '🇦🇪', category: 'Economic' as const, impact: 'Low' as const },
  { headline: 'US Treasury yields ease as labour market data softens', summary: 'The 10-year fell nine basis points after payroll revisions pointed to a cooler underlying trend than previously reported.', source: 'Global Macro Desk', country: 'United States', flag: '🇺🇸', category: 'Central Bank' as const, impact: 'Medium' as const },
  { headline: 'Nigeria FX reserves stabilise following remittance channel reforms', summary: 'Reserves rose for a fourth month, though import cover remains below the central bank comfort threshold.', source: 'Sahel Economic Monitor', country: 'Nigeria', flag: '🇳🇬', category: 'Economic' as const, impact: 'Low' as const },
  { headline: 'Global trade tensions escalate over critical minerals export controls', summary: 'New licensing requirements on rare-earth processing raise supply concerns across the electric-vehicle and defence supply chains.', source: 'Geopolitical Risk Desk', country: 'China', flag: '🇨🇳', category: 'Geopolitics' as const, impact: 'High' as const }
];

export const news: NewsItem[] = seedNews.map((n, i) => {
  const time = i === 0 ? '18 min ago' : i === 1 ? '42 min ago' : `${Math.floor(i * 1.5)} hr ago`;
  return { ...n, id: `n${i + 1}`, time };
});


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


const BASE_TIME = new Date('2026-09-13T12:00:00Z').getTime();

function formatDate(ms: number) {
  const d = new Date(ms);
  const day = d.getUTCDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const seedResearch = [
  { title: 'India 2030: The Capex Decade', category: 'Country Research' as const, country: 'India', flag: '🇮🇳', author: 'Ananya Raghavan', role: 'Head of Emerging Markets Research', excerpt: 'India enters the second half of the decade with the strongest investment cycle since liberalisation. We examine capacity creation, financing capacity and the risks to the base case.', featured: true, rating: 'Overweight' as const },
  { title: 'Vietnam: The Second Wave of Manufacturing Relocation', category: 'Country Research' as const, country: 'Vietnam', flag: '🇻🇳', author: 'Minh Trần', role: 'ASEAN Strategist', excerpt: 'Export complexity is rising faster than headline FDI implies. We map the transition from assembly to component manufacturing and its margin implications.', rating: 'Overweight' as const },
  { title: 'Global Economic Outlook — Q4 2026', category: 'Economic Outlook' as const, country: 'Global', flag: '🌐', author: 'NGIP Global Macro Desk', role: 'Research Team', excerpt: 'Disinflation is broadening while growth diverges. Our base case assumes 3.2% global growth with emerging Asia contributing over half of incremental output.', featured: true, rating: 'Neutral' as const },
  { title: 'The Demographic Dividend Map', category: 'Global Themes' as const, country: 'Global', flag: '🌐', author: 'Priya Menon', role: 'Thematic Research Lead', excerpt: 'Nine economies will supply 62% of net global labour-force growth to 2040. We rank them on absorptive capacity, not just population.' },
  { title: 'Semiconductors and Sovereign Strategy', category: 'Sector Research' as const, country: 'South Korea', flag: '🇰🇷', author: 'Ji-woo Park', role: 'Technology Sector Analyst', excerpt: 'Industrial policy is reshaping the semiconductor cycle. We assess the durability of the current upturn against subsidy-driven capacity additions.', rating: 'Overweight' as const },
  { title: 'European Industrial Competitiveness: A Reassessment', category: 'Market Research' as const, country: 'Germany', flag: '🇩🇪', author: 'Lukas Brandt', role: 'European Strategist', excerpt: 'Energy costs remain the binding constraint. We quantify the gap versus US and Asian peers and identify where reform delivers the largest delta.', rating: 'Underweight' as const },
  { title: 'Nearshoring: Measuring the Real Capital Flows', category: 'Global Themes' as const, country: 'Mexico', flag: '🇲🇽', author: 'Carla Ibarra', role: 'Americas Research', excerpt: 'Announcements exceed deployment by a wide margin. We separate committed capital from signed intent across the North American corridor.', rating: 'Overweight' as const },
  { title: 'Sovereign Debt Sustainability in Frontier Africa', category: 'Country Research' as const, country: 'Kenya', flag: '🇰🇪', author: 'Wanjiru Kamau', role: 'Frontier Markets Analyst', excerpt: 'External debt servicing peaks in 2027. We stress-test five frontier issuers under three global rate scenarios.', rating: 'Neutral' as const },
  { title: 'The Gulf Diversification Scorecard', category: 'Country Research' as const, country: 'United Arab Emirates', flag: '🇦🇪', author: 'Omar Haddad', role: 'MENA Research Lead', excerpt: 'Non-oil GDP share has crossed a structural threshold in two Gulf economies. We measure progress against stated national strategies.', rating: 'Overweight' as const }
];

export const research: ResearchReport[] = seedResearch.map((r, i) => {
  const dateStr = formatDate(BASE_TIME - (i * 3 + 2) * 86400000);
  const readingTime = `${12 + (i * 7 % 10)} min`;
  return { ...r, id: `r${i + 1}`, date: dateStr, readingTime };
});

export const researchCategories = [
  'All',
  'Country Research',
  'Global Themes',
  'Economic Outlook',
  'Market Research',
  'Sector Research'
];

const seedCalendar = [
  { country: 'India', flag: '🇮🇳', event: 'CPI Inflation YoY (Aug)', previous: '4.8%', expected: '4.6%', actual: '4.5%', importance: 'High' as const, type: 'Inflation' as const },
  { country: 'United States', flag: '🇺🇸', event: 'Initial Jobless Claims', previous: '218K', expected: '224K', actual: '231K', importance: 'Medium' as const, type: 'Employment' as const },
  { country: 'Germany', flag: '🇩🇪', event: 'Industrial Production MoM', previous: '-0.4%', expected: '0.2%', actual: null, importance: 'Medium' as const, type: 'Output' as const },
  { country: 'Japan', flag: '🇯🇵', event: 'BoJ Policy Rate Decision', previous: '0.50%', expected: '0.50%', actual: null, importance: 'High' as const, type: 'Central Bank' as const },
  { country: 'Vietnam', flag: '🇻🇳', event: 'Trade Balance (Aug)', previous: '$2.1B', expected: '$2.4B', actual: null, importance: 'Medium' as const, type: 'Trade' as const },
  { country: 'United Kingdom', flag: '🇬🇧', event: 'GDP QoQ (Q2 Final)', previous: '0.3%', expected: '0.3%', actual: null, importance: 'High' as const, type: 'Growth' as const },
  { country: 'Brazil', flag: '🇧🇷', event: 'Selic Rate Decision', previous: '10.50%', expected: '10.25%', actual: null, importance: 'High' as const, type: 'Central Bank' as const },
  { country: 'China', flag: '🇨🇳', event: 'Industrial Production YoY', previous: '5.1%', expected: '5.0%', actual: null, importance: 'High' as const, type: 'Output' as const },
  { country: 'Indonesia', flag: '🇮🇩', event: 'BI 7-Day Reverse Repo', previous: '5.75%', expected: '5.75%', actual: null, importance: 'Medium' as const, type: 'Central Bank' as const },
  { country: 'South Korea', flag: '🇰🇷', event: 'Export Growth (Sep 1-20)', previous: '28.4%', expected: '24.0%', actual: null, importance: 'Medium' as const, type: 'Trade' as const }
];

export const calendarEvents: CalendarEvent[] = seedCalendar.map((c, i) => {
  const dateStr = formatDate(BASE_TIME + Math.floor(i / 3) * 86400000 - 86400000);
  const hrs = 7 + (i * 3 % 10);
  const mins = i % 2 === 0 ? '00' : '30';
  return { ...c, id: `c${i + 1}`, date: dateStr, time: `${hrs.toString().padStart(2, '0')}:${mins}` };
});


const seedNotifications = [
  { category: 'Orders' as const, title: 'Order executed — BICAP', body: '120 units filled at ₹486.35. Order NG-2609-84213 completed.' },
  { category: 'Economic' as const, title: 'India CGI updated to 91.4', body: 'Country Growth Index rose 2.1 points following the Q2 capex revision.' },
  { category: 'Portfolio' as const, title: 'Concentration threshold crossed', body: 'India exposure now represents 48.4% of portfolio value, above your 45% alert.' },
  { category: 'Markets' as const, title: 'KOSPI up 2.14%', body: 'Korean equities extended gains on semiconductor export data.' },
  { category: 'News' as const, title: 'High-impact story — Vietnam', body: 'Vietnam FDI registrations reach record $38.2B on electronics relocation.' },
  { category: 'Security' as const, title: 'New device signed in', body: 'Chrome on macOS · Mumbai, India · 11 Sep 2026 at 07:12 PM.' },
  { category: 'System' as const, title: 'Economic data refresh completed', body: '14 indicators updated across 24 covered economies.' }
];

export const notifications: NotificationItem[] = seedNotifications.map((n, i) => {
  const time = i < 3 ? '10:42 AM' : i < 5 ? 'Yesterday' : '11 Sep';
  return { ...n, id: `x${i + 1}`, read: i >= 3, time };
});

const seedAlerts = [
  { name: 'India CGI above 90', type: 'CGI threshold', target: 'India', condition: 'CGI > 90.0', status: 'Triggered' as const },
  { name: 'Vietnam GDP growth above 6.5%', type: 'GDP threshold', target: 'Vietnam', condition: 'GDP Growth > 6.5%', status: 'Active' as const },
  { name: 'Portfolio drawdown alert', type: 'Portfolio drawdown', target: 'Portfolio', condition: 'Drawdown < -8%', status: 'Active' as const },
  { name: 'BICAP price alert', type: 'Instrument price', target: 'BICAP', condition: 'Price > ₹500.00', status: 'Active' as const },
  { name: 'Türkiye inflation below 35%', type: 'Inflation threshold', target: 'Türkiye', condition: 'CPI < 35.0%', status: 'Paused' as const },
  { name: 'BoJ rate decision', type: 'Major economic event', target: 'Japan', condition: 'Event published', status: 'Active' as const }
];

export const alerts = seedAlerts.map((a, i) => {
  const day = i < 4 ? '12 Sep' : i === 4 ? '04 Sep' : '13 Sep';
  const hrs = 9 - (i % 3) + 3;
  return { ...a, id: `a${i + 1}`, lastRun: `${day}, ${hrs.toString().padStart(2, '0')}:00` };
});

const seedWatchlists = [
  { name: 'My Countries', kind: 'country' as const, items: ['in', 'vn', 'id', 'mx', 'pl'] },
  { name: 'My Instruments', kind: 'instrument' as const, items: ['ngin', 'bicap', 'krsem', 'vnmfg', 'gdmi'] },
  { name: 'Emerging Markets', kind: 'country' as const, items: ['br', 'za', 'tr', 'cl', 'ph'] },
  { name: 'High Growth', kind: 'country' as const, items: ['in', 'vn', 'ph', 'ke'] },
  { name: 'Long Term', kind: 'instrument' as const, items: ['gdmi', 'igb34', 'gdemo'] }
];

export const watchlists = seedWatchlists.map((w, i) => ({ ...w, id: `w${i + 1}` }));