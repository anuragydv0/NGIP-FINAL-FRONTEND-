import { AdminUser, AuditLogEntry, DataIngestionJob, SystemHealthMetrics } from '../types';
import { instruments } from './instruments';

const BASE_TIME = new Date('2026-09-13T12:00:00Z').getTime();

function formatTime(ms: number) {
  const d = new Date(ms);
  const day = d.getUTCDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const hrs = d.getUTCHours().toString().padStart(2, '0');
  const mins = d.getUTCMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hrs}:${mins}`;
}

const seedUsers = [
  { name: 'Anurag Yadav', email: 'anurag.admin@ngip.com', role: 'Admin', status: 'Active' as const },
  { name: 'Sophia Chen', email: 'schen@ngip.com', role: 'Analyst', status: 'Active' as const },
  { name: 'Liam Davies', email: 'ldavies@ngip.com', role: 'Viewer', status: 'Suspended' as const },
  { name: 'Priya Sharma', email: 'psharma@ngip.com', role: 'Analyst', status: 'Active' as const },
  { name: 'David Kim', email: 'dkim@ngip.com', role: 'Admin', status: 'Active' as const }
];

export const adminUsers: AdminUser[] = seedUsers.map((u, i) => {
  // Compute progressively older logins
  const offsetMs = (i * 14 + (i % 2 === 0 ? 5 : 28)) * 3600000;
  return { 
    ...u, 
    id: `u${i + 1}`,
    lastLogin: formatTime(BASE_TIME - offsetMs)
  };
});

const seedLogs = [
  { actor: 'Anurag Yadav', action: 'Update CGI Weight', target: 'Global Model v2', details: 'Increased Inflation weight to 25%' },
  { actor: 'Sophia Chen', action: 'Publish Research', target: 'India Growth Review', details: 'Changed status to Published' },
  { actor: 'System', action: 'Data Sync', target: 'World Bank API', details: 'Synced 14,230 records' },
  { actor: 'David Kim', action: 'Suspend User', target: 'Liam Davies', details: 'Suspended pending review' },
  { actor: 'System', action: 'Data Sync Failed', target: 'IMF Statistics', details: 'Connection timeout' },
  { actor: 'Anurag Yadav', action: 'Delist Instrument', target: 'MXNS', details: 'Removed from active trading' },
  { actor: 'Priya Sharma', action: 'Draft Research', target: 'Vietnam Manufacturing', details: 'Created new draft' }
];

export const auditLogs: AuditLogEntry[] = seedLogs.map((l, i) => {
  // Generate progressively older timestamps (approx 3 hours apart + jitter)
  const offsetMs = (i * 3 * 3600000) + ((i % 3) * 1800000);
  return { 
    ...l, 
    id: `a${i + 1}`,
    timestamp: formatTime(BASE_TIME - offsetMs)
  };
});

const seedJobs = [
  { source: 'World Bank API', status: 'Synced' as const, recordCount: 14230 },
  { source: 'IMF Statistics', status: 'Failed' as const, recordCount: 8400 },
  { source: 'Central Bank Feeds', status: 'Synced' as const, recordCount: 3150 },
  { source: 'Global Trade Monitor', status: 'Syncing' as const, recordCount: 1100 }
];

export const ingestionJobs: DataIngestionJob[] = seedJobs.map((j, i) => {
  // Mix of recent times
  const offsetMs = (i * 5 + 1) * 3600000;
  return { 
    ...j, 
    id: `j${i + 1}`,
    lastSync: formatTime(BASE_TIME - offsetMs)
  };
});

function generateSystemHealth(): SystemHealthMetrics {
  return {
    apiUptime: 99.98,
    responseTime: 124,
    errorRate: 0.05,
    activeSessions: 142,
    services: [
      { name: 'Auth Service', status: 'Operational' },
      { name: 'Data Pipeline', status: 'Degraded' },
      { name: 'Order Engine', status: 'Operational' },
      { name: 'Pricing Feed', status: 'Operational' }
    ],
    history: Array.from({ length: 24 }).map((_, i) => ({
      time: `${String(i).padStart(2, '0')}:00`,
      responseTime: 100 + Math.random() * 50 + (i === 14 ? 150 : 0) // spike at 14:00
    }))
  };
}

export const systemHealth: SystemHealthMetrics = generateSystemHealth();

export const adminInstruments = instruments.map((inst, i) => ({
  ...inst,
  status: i % 7 === 0 ? 'Delisted' : (i % 5 === 0 ? 'Pending Review' : 'Listed')
}));
