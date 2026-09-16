import { ScenarioDefinition, ScenarioResult } from '../types';
import { holdings } from './portfolio';
import { countries } from './countries';

export const predefinedScenarios: ScenarioDefinition[] = [
  {
    id: 'scen-1',
    name: 'Global Recession',
    description: 'A synchronized global downturn impacting all risk assets, with pronounced effects on emerging markets.',
    growthShock: -3.0,
    currencyShock: -5.0,
    riskOffSentiment: 'High'
  },
  {
    id: 'scen-2',
    name: 'US Rate Hike Cycle',
    description: 'Aggressive Fed tightening causing capital flight from frontier markets and currency devaluation.',
    growthShock: -1.0,
    currencyShock: -10.0,
    riskOffSentiment: 'Medium'
  },
  {
    id: 'scen-3',
    name: 'Commodity Price Shock',
    description: 'A sharp spike in energy and commodity prices, hurting importers but benefiting exporters.',
    growthShock: -0.5,
    currencyShock: 2.0,
    riskOffSentiment: 'Low'
  },
  {
    id: 'scen-4',
    name: 'Tech Sector Correction',
    description: 'A bursting of technology valuations, heavily impacting developed markets.',
    growthShock: -1.5,
    currencyShock: 0,
    riskOffSentiment: 'Medium'
  }
];

export function calculateScenarioImpact(scenario: ScenarioDefinition): ScenarioResult {
  const impacts = holdings.map(holding => {
    // Look up the country to factor in its risk band and CGI
    const countryData = countries.find(c => c.name === holding.country);
    
    // Base shock
    let holdingPctChange = scenario.growthShock + (scenario.currencyShock * 0.5);
    
    // Adjust based on risk band
    if (countryData) {
      if (scenario.riskOffSentiment === 'High') {
        if (countryData.riskBand === 'High') holdingPctChange -= 10;
        if (countryData.riskBand === 'Elevated') holdingPctChange -= 5;
        if (countryData.riskBand === 'Low') holdingPctChange += 2; // Flight to safety
      } else if (scenario.riskOffSentiment === 'Medium') {
        if (countryData.riskBand === 'High') holdingPctChange -= 5;
        if (countryData.riskBand === 'Elevated') holdingPctChange -= 2;
      }
      
      // Better CGI cushions the blow slightly
      if (countryData.cgi > 85) {
        holdingPctChange += 1;
      } else if (countryData.cgi < 50) {
        holdingPctChange -= 2;
      }
    }
    
    // Ensure we don't go below -100%
    holdingPctChange = Math.max(-100, holdingPctChange);
    
    const valueChange = holding.value * (holdingPctChange / 100);
    const valueAfter = holding.value + valueChange;
    
    return {
      holdingId: holding.id,
      holdingName: holding.name,
      symbol: holding.symbol,
      weight: holding.weight,
      pctChange: holdingPctChange,
      valueChange,
      valueAfter
    };
  });

  const totalValueBefore = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalValueAfter = impacts.reduce((sum, i) => sum + i.valueAfter, 0);
  const valueChange = totalValueAfter - totalValueBefore;
  const pctChange = (valueChange / totalValueBefore) * 100;

  return {
    scenarioId: scenario.id,
    scenarioName: scenario.name,
    totalValueBefore,
    totalValueAfter,
    valueChange,
    pctChange,
    impacts: impacts.sort((a, b) => a.pctChange - b.pctChange) // Sort worst hit first
  };
}
