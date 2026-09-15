import { AdminUser, AuditLogEntry, DataIngestionJob, SystemHealthMetrics } from '../types';
import { instruments } from './instruments';

export const adminUsers: AdminUser[] = [
  { id: 'u1', name: 'Arjun Mehta', email: 'arjun.mehta@ngip.com', role: 'Admin', status: 'Active', lastLogin: '12 Sep 2026, 14:32' },
  { id: 'u2', name: 'Sophia Chen', email: 'schen@ngip.com', role: 'Analyst', status: 'Active', lastLogin: '13 Sep 2026, 09:15' },
  { id: 'u3', name: 'Liam Davies', email: 'ldavies@ngip.com', role: 'Viewer', status: 'Suspended', lastLogin: '01 Sep 2026, 11:45' },
  { id: 'u4', name: 'Priya Sharma', email: 'psharma@ngip.com', role: 'Analyst', status: 'Active', lastLogin: '13 Sep 2026, 10:20' },
  { id: 'u5', name: 'David Kim', email: 'dkim@ngip.com', role: 'Admin', status: 'Active', lastLogin: '13 Sep 2026, 08:05' }
];

export const auditLogs: AuditLogEntry[] = [
  { id: 'a1', timestamp: '13 Sep 2026, 11:20', actor: 'Arjun Mehta', action: 'Update CGI Weight', target: 'Global Model v2', details: 'Increased Inflation weight to 25%' },
  { id: 'a2', timestamp: '13 Sep 2026, 10:45', actor: 'Sophia Chen', action: 'Publish Research', target: 'India Growth Review', details: 'Changed status to Published' },
  { id: 'a3', timestamp: '13 Sep 2026, 09:30', actor: 'System', action: 'Data Sync', target: 'World Bank API', details: 'Synced 14,230 records' },
  { id: 'a4', timestamp: '12 Sep 2026, 16:15', actor: 'David Kim', action: 'Suspend User', target: 'Liam Davies', details: 'Suspended pending review' },
  { id: 'a5', timestamp: '12 Sep 2026, 14:00', actor: 'System', action: 'Data Sync Failed', target: 'IMF Statistics', details: 'Connection timeout' },
  { id: 'a6', timestamp: '12 Sep 2026, 11:10', actor: 'Arjun Mehta', action: 'Delist Instrument', target: 'MXNS', details: 'Removed from active trading' },
  { id: 'a7', timestamp: '11 Sep 2026, 09:20', actor: 'Priya Sharma', action: 'Draft Research', target: 'Vietnam Manufacturing', details: 'Created new draft' }
];

export const ingestionJobs: DataIngestionJob[] = [
  { id: 'j1', source: 'World Bank API', status: 'Synced', lastSync: '13 Sep 2026, 09:30', recordCount: 14230 },
  { id: 'j2', source: 'IMF Statistics', status: 'Failed', lastSync: '12 Sep 2026, 14:00', recordCount: 8400 },
  { id: 'j3', source: 'Central Bank Feeds', status: 'Synced', lastSync: '13 Sep 2026, 08:15', recordCount: 3150 },
  { id: 'j4', source: 'Global Trade Monitor', status: 'Syncing', lastSync: '13 Sep 2026, 11:55', recordCount: 1100 }
];

export const systemHealth: SystemHealthMetrics = {
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

export const adminInstruments = instruments.map((inst, i) => ({
  ...inst,
  status: i % 7 === 0 ? 'Delisted' : (i % 5 === 0 ? 'Pending Review' : 'Listed')
}));
