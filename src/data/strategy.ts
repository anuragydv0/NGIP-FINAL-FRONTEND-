import { Strategy } from '../types';

const BASE_TIME = new Date('2026-09-13T12:00:00Z').getTime();

const seedStrategies = [
  {
    name: 'High Growth Asia',
    description: 'Concentrated exposure in high-growth APAC emerging markets.',
    creator: 'Admin',
    allocations: [
      { id: 'in', name: 'India', weight: 45 },
      { id: 'vn', name: 'Vietnam', weight: 35 },
      { id: 'kr', name: 'South Korea', weight: 20 }
    ]
  },
  {
    name: 'Global Value Dividend',
    description: 'Developed market equities with strong dividend yield characteristics.',
    creator: 'Quant Team',
    allocations: [
      { id: 'us', name: 'United States', weight: 40 },
      { id: 'de', name: 'Germany', weight: 25 },
      { id: 'gb', name: 'United Kingdom', weight: 20 },
      { id: 'jp', name: 'Japan', weight: 15 }
    ]
  },
  {
    name: 'Resource Independence',
    description: 'Net exporters of critical minerals and energy.',
    creator: 'Commodities Desk',
    allocations: [
      { id: 'au', name: 'Australia', weight: 30 },
      { id: 'br', name: 'Brazil', weight: 30 },
      { id: 'ca', name: 'Canada', weight: 25 },
      { id: 'ae', name: 'United Arab Emirates', weight: 15 }
    ]
  }
];

export const savedStrategies: Strategy[] = seedStrategies.map((s, i) => {
  const d = new Date(BASE_TIME - (i * 9 + 3) * 86400000);
  const updatedAt = d.toISOString().split('T')[0];
  return { ...s, id: `s${i + 1}`, updatedAt };
});
