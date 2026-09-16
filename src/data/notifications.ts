import { NotificationItem } from '../types';

function createDeterministicRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = createDeterministicRandom(12345);

const titles = [
  'Order filled: IN-EQ-INFY',
  'Price alert triggered: India CGI',
  'New research published: Asia Pacific',
  'Security alert: New login detected',
  'System maintenance scheduled',
  'Dividend received: US-BND-TRE',
  'Risk band updated: Elevated'
];

const categories: NotificationItem['category'][] = ['Orders', 'Portfolio', 'Markets', 'Economic', 'News', 'Security', 'System'];

export const mockNotifications: NotificationItem[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `notif-${i}`,
  category: categories[Math.floor(random() * categories.length)],
  title: titles[Math.floor(random() * titles.length)],
  body: `This is a detailed description for notification ${i + 1}. It contains information about the event that occurred.`,
  time: new Date(Date.now() - random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
  read: random() > 0.3
})).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
