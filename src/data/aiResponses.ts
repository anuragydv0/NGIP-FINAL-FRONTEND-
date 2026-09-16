import { countries } from './countries';
import { instruments } from './instruments';
import { holdings } from './portfolio';

// Deterministic random for varying phrasing if needed
function createDeterministicRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function generateResearchResponse(query: string): string {
  const q = query.toLowerCase();
  
  // Try to find a country mentioned in the query
  const country = countries.find(c => q.includes(c.name.toLowerCase()));
  
  if (country) {
    // Generate a deterministic but rich-sounding analysis of the country
    return `Based on NGIP's latest macro-economic data, **${country.name}** currently maintains a Country Growth Index (CGI) of **${country.cgi.toFixed(1)}**, placing it in the **${country.riskBand}** risk band. 

Economic drivers include a GDP growth rate of **${country.gdpGrowth}%** alongside inflation at **${country.inflation}%**. Its debt-to-GDP ratio stands at **${country.debtToGdp}%**. 

In terms of capital inflows, Foreign Direct Investment (FDI) is recorded at **$${(country.fdi / 1e9).toFixed(1)}B**, supporting its status as a ${country.development.toLowerCase()} economy in the ${country.region} region. 

*Suggested action*: Investors looking for exposure might explore the ${instruments.filter(i => i.countryId === country.id).length} tracked instruments we have on platform for this jurisdiction.`;
  }

  // Try to find an instrument mentioned in the query
  const instrument = instruments.find(i => q.includes(i.name.toLowerCase()) || q.includes(i.symbol.toLowerCase()));
  
  if (instrument) {
    return `Looking at **${instrument.name} (${instrument.symbol})**, this ${instrument.type} provides exposure primarily to the **${instrument.sector}** sector in ${instrument.country}. 

It is currently priced at **$${instrument.price.toFixed(2)}** with a year-to-date return of **${(instrument.ytd * 100).toFixed(1)}%**. 

The instrument is classified as **${instrument.risk}** risk, backed by a 3-year trailing performance of **${(instrument.threeYear * 100).toFixed(1)}%**. Given its AUM of **$${(instrument.aum / 1e9).toFixed(2)}B**, liquidity is considered ${instrument.liquidity.toLowerCase()}.`;
  }

  // Generic fallback response
  return `I can help you analyze macro-economic data, assess country risks, or review specific instruments. 

Try asking me about a specific country's economic outlook (e.g., "How is India's economy performing?"), or request a breakdown of a particular instrument tracked on our platform.`;
}

export function generatePortfolioAnalysis() {
  const rand = createDeterministicRandom(Date.now()); // Using Date.now for slightly varied analysis generation on demand, though deterministic seed could be used if strict consistency is preferred. We will use a fixed seed to keep it completely deterministic.
  const deterministicRand = createDeterministicRandom(42);

  if (holdings.length === 0) {
    return {
      summary: "Your portfolio is currently empty. Start by adding investments to generate an analysis.",
      observations: ["No holdings found."],
      suggestions: ["Explore the Markets tab to find instruments matching your risk profile."]
    };
  }

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalPnl = holdings.reduce((sum, h) => sum + h.pnl, 0);
  const pnlPct = (totalPnl / (totalValue - totalPnl)) * 100;
  
  const sortedByWeight = [...holdings].sort((a, b) => b.weight - a.weight);
  const topHolding = sortedByWeight[0];
  const lowestHolding = sortedByWeight[sortedByWeight.length - 1];

  const countryWeights = holdings.reduce((acc, h) => {
    acc[h.country] = (acc[h.country] || 0) + h.weight;
    return acc;
  }, {} as Record<string, number>);

  const topCountry = Object.entries(countryWeights).sort((a, b) => b[1] - a[1])[0];

  const summary = `Your portfolio has a total market value of $${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}, reflecting an overall return of ${pnlPct > 0 ? '+' : ''}${pnlPct.toFixed(2)}%. It is spread across ${holdings.length} instruments, with a significant geographical tilt toward ${topCountry[0]} (${topCountry[1].toFixed(1)}% of total exposure).`;

  const observations = [
    `**Concentration Risk:** Your largest single holding is ${topHolding.symbol} (${topHolding.name}), representing ${topHolding.weight.toFixed(1)}% of your portfolio.`,
    `**Geographic Exposure:** You are heavily exposed to ${topCountry[0]}. Consider if this matches your target macro-economic thesis.`,
    `**Performance Drag:** ${lowestHolding.symbol} is currently your lowest-weighted asset (${lowestHolding.weight.toFixed(1)}%) and may not be contributing meaningfully to overall returns.`
  ];

  const suggestions = [
    `Consider diversifying your ${topCountry[0]} exposure by allocating capital to emerging markets with higher CGI scores.`,
    `Rebalance your position in ${topHolding.symbol} to ensure no single asset exceeds a 15% portfolio weight limit.`
  ];

  return { summary, observations, suggestions };
}
