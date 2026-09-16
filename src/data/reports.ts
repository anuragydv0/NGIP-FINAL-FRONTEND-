import { ReportItem } from '../types';

function createDeterministicRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = createDeterministicRandom(55555);

export const mockReportsList: ReportItem[] = Array.from({ length: 6 }).map((_, i) => {
  const types = ['Portfolio Performance', 'Tax Statement', 'Transaction History', 'Country Exposure'];
  const type = types[Math.floor(random() * types.length)];
  const date = new Date(Date.now() - random() * 90 * 24 * 60 * 60 * 1000);
  
  return {
    id: `rep-${i}`,
    name: `${type} - ${date.toLocaleString('en-US', { month: 'short', year: 'numeric' })}`,
    type: type,
    generatedAt: date.toISOString(),
    size: `${(random() * 2 + 0.5).toFixed(1)} MB`
  };
}).sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
