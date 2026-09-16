import { AlertRule } from '../types';
import { countries } from './countries';
import { instruments } from './instruments';

function createDeterministicRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = createDeterministicRandom(54321);

export const mockAlerts: AlertRule[] = Array.from({ length: 7 }).map((_, i) => {
  const isCountry = random() > 0.5;
  const target = isCountry 
    ? countries[Math.floor(random() * countries.length)] 
    : instruments[Math.floor(random() * instruments.length)];
  
  const conditionType = isCountry ? 'CGI Value' : 'Price Change %';
  
  return {
    id: `alert-${i}`,
    targetType: isCountry ? 'Country' : 'Instrument',
    targetId: target.id,
    targetName: target.name,
    conditionType,
    threshold: isCountry ? '< 80' : '±5%',
    status: random() > 0.8 ? 'Triggered' : (random() > 0.7 ? 'Paused' : 'Active'),
    createdAt: new Date(Date.now() - random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };
});
