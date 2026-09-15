import { Strategy } from '../types';

export const savedStrategies: Strategy[] = [
  {
    id: 's1',
    name: 'High Growth Asia',
    description: 'Concentrated exposure in high-growth APAC emerging markets.',
    creator: 'Admin',
    updatedAt: '2026-08-14',
    allocations: [
      { id: 'in', name: 'India', weight: 45 },
      { id: 'vn', name: 'Vietnam', weight: 35 },
      { id: 'kr', name: 'South Korea', weight: 20 }
    ]
  },
  {
    id: 's2',
    name: 'Global Value Dividend',
    description: 'Developed market equities with strong dividend yield characteristics.',
    creator: 'Quant Team',
    updatedAt: '2026-09-02',
    allocations: [
      { id: 'us', name: 'United States', weight: 40 },
      { id: 'de', name: 'Germany', weight: 25 },
      { id: 'gb', name: 'United Kingdom', weight: 20 },
      { id: 'jp', name: 'Japan', weight: 15 }
    ]
  },
  {
    id: 's3',
    name: 'Resource Independence',
    description: 'Net exporters of critical minerals and energy.',
    creator: 'Commodities Desk',
    updatedAt: '2026-09-10',
    allocations: [
      { id: 'au', name: 'Australia', weight: 30 },
      { id: 'br', name: 'Brazil', weight: 30 },
      { id: 'ca', name: 'Canada', weight: 25 },
      { id: 'ae', name: 'United Arab Emirates', weight: 15 }
    ]
  }
];
