import { SecuritySession, LoginEvent } from '../types';

function createDeterministicRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = createDeterministicRandom(98765);

const seedSessions = [
  { device: 'Chrome on Windows', location: 'Mumbai, India', isCurrent: true },
  { device: 'Safari on iPhone', location: 'Mumbai, India' },
  { device: 'Firefox on macOS', location: 'Delhi, India' }
];

export const mockSessions: SecuritySession[] = seedSessions.map((s, i) => {
  const lastActive = i === 0 ? 'Just now' : i === 1 ? '2 hours ago' : `${i * 1.5} days ago`;
  return { ...s, id: i === 0 ? 'sess-current' : `sess-${i}`, lastActive };
});

export const mockLogins: LoginEvent[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `log-${i}`,
  timestamp: new Date(Date.now() - random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  device: random() > 0.5 ? 'Chrome on Windows' : 'Safari on iPhone',
  location: random() > 0.2 ? 'Mumbai, India' : 'Unknown',
  status: random() > 0.1 ? 'Success' : 'Failed'
})).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
