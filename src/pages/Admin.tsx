import React, { useState, useEffect } from 'react';
import { PageHeader, PageBody } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { DataTable } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { AreaSeries } from '../components/charts/Charts';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';
import { Modal } from '../components/ui/Overlay';

import { adminUsers, auditLogs, ingestionJobs, systemHealth, adminInstruments } from '../data/admin';
import { countries } from '../data/countries';
import { orders } from '../data/portfolio';
import { research } from '../data/content';
import { num } from '../utils/format';
import { Link } from 'react-router-dom';

function useSimulatedLoading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);
  return loading;
}

export function AdminDashboard() {
  const loading = useSimulatedLoading();
  return (
    <>
      <PageHeader title="Admin dashboard" subtitle="Operational overview of platform health and activity." />
      <PageBody className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">Total Users</div>
            <div className="text-3xl font-bold text-ink">12,450</div>
          </Card>
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">Platform AUM</div>
            <div className="text-3xl font-bold text-ink">$4.2B</div>
          </Card>
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">Pending Orders</div>
            <div className="text-3xl font-bold text-warn">234</div>
          </Card>
          <Card className="p-5 flex flex-col justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">System Health</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-ink">99.98%</span>
              <Badge tone="pos">Healthy</Badge>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Recent Activity" />
            <div className="border-t border-line">
              <DataTable
                columns={[
                  { key: 'actor', header: 'Actor', render: r => <span className="font-medium">{r.actor}</span> },
                  { key: 'action', header: 'Action', render: r => r.action },
                  { key: 'target', header: 'Target', render: r => r.target },
                  { key: 'time', header: 'Time', render: r => <span className="text-ink-3">{r.timestamp}</span> }
                ]}
                rows={auditLogs.slice(0, 5)}
                rowKey={r => r.id}
                loading={loading}
              />
            </div>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader title="Quick Links" />
              <div className="flex flex-col border-t border-line">
                <Link to="/admin/users" className="p-4 border-b border-line hover:bg-subtle font-medium text-ink">Manage Users</Link>
                <Link to="/admin/economic-data" className="p-4 border-b border-line hover:bg-subtle font-medium text-ink">Data Ingestion Status</Link>
                <Link to="/admin/health" className="p-4 hover:bg-subtle font-medium text-ink">System Health Monitor</Link>
              </div>
            </Card>
          </div>
        </div>
      </PageBody>
    </>
  );
}

export function AdminUsers() {
  const loading = useSimulatedLoading();
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState('');
  
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  return (
    <>
      <PageHeader title="Users" subtitle="User accounts, roles and risk classification." />
      <PageBody className="space-y-6">
        <Card>
          <div className="p-4 border-b border-line">
            <Input placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <DataTable
            columns={[
              { key: 'name', header: 'Name', sortable: true, sortValue: r => r.name, render: r => <span className="font-medium text-ink">{r.name}</span> },
              { key: 'email', header: 'Email', render: r => r.email },
              { key: 'role', header: 'Role', sortable: true, sortValue: r => r.role, render: r => r.role },
              { key: 'status', header: 'Status', sortable: true, sortValue: r => r.status, render: r => <Badge tone={r.status === 'Active' ? 'pos' : 'neg'}>{r.status}</Badge> },
              { key: 'lastLogin', header: 'Last Login', render: r => r.lastLogin },
              { key: 'actions', header: '', align: 'right', render: r => (
                <Button size="sm" variant="secondary" onClick={() => toggleStatus(r.id)}>
                  {r.status === 'Active' ? 'Suspend' : 'Activate'}
                </Button>
              )}
            ]}
            rows={filtered}
            rowKey={r => r.id}
            loading={loading}
          />
        </Card>
      </PageBody>
    </>
  );
}

export function AdminCountries() {
  const loading = useSimulatedLoading();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  return (
    <>
      <PageHeader title="Countries" subtitle="Coverage universe, CGI scores and risk bands." />
      <PageBody className="space-y-6">
        <Card>
          <DataTable
            columns={[
              { key: 'name', header: 'Country', sortable: true, sortValue: r => r.name, render: r => <div className="flex items-center gap-2"><span>{r.flag}</span><span className="font-medium">{r.name}</span></div> },
              { key: 'cgi', header: 'CGI Score', sortable: true, sortValue: r => r.cgi, render: r => <span className="font-medium">{num(r.cgi, 1)}</span> },
              { key: 'risk', header: 'Risk Band', sortable: true, sortValue: r => r.riskBand, render: r => <Badge tone={r.riskBand === 'Low' ? 'pos' : r.riskBand === 'High' ? 'neg' : r.riskBand === 'Elevated' ? 'warn' : 'info'}>{r.riskBand}</Badge> },
              { key: 'updated', header: 'Last Updated', render: () => '12 Sep 2026' },
              { key: 'actions', header: '', align: 'right', render: r => <Button size="sm" onClick={() => setSelectedCountry(r)}>Edit CGI</Button> }
            ]}
            rows={countries}
            rowKey={r => r.id}
            loading={loading}
          />
        </Card>
      </PageBody>

      <Modal open={!!selectedCountry} onClose={() => setSelectedCountry(null)} title={`Edit ${selectedCountry?.name} CGI Factors`}>
        {selectedCountry && (
          <div className="p-6 space-y-6">
            <p className="text-sm text-ink-2 mb-4">Adjust local economic factors. These overrides only apply to this session.</p>
            {selectedCountry.pillars.map((p: any) => (
              <div key={p.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.label}</span>
                  <span className="font-medium">{p.score}</span>
                </div>
                <input type="range" min="0" max="100" defaultValue={p.score} className="w-full accent-accent" />
              </div>
            ))}
            <div className="pt-4 border-t border-line flex gap-3">
              <Button variant="primary" onClick={() => setSelectedCountry(null)}>Apply Changes</Button>
              <Button onClick={() => setSelectedCountry(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export function AdminEconomicData() {
  const [jobs, setJobs] = useState(ingestionJobs);
  const toast = useToast();

  const triggerSync = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Syncing' } : j));
    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'Synced', lastSync: new Date().toLocaleString(), recordCount: j.recordCount + Math.floor(Math.random()*100) } : j));
      toast.push({ title: 'Sync Complete', description: 'Data source successfully synchronized.', tone: 'success' });
    }, 1500);
  };

  return (
    <>
      <PageHeader title="Data Ingestion" subtitle="Manage and monitor economic data pipeline feeds." />
      <PageBody className="space-y-6">
        <Card>
          <DataTable
            columns={[
              { key: 'source', header: 'Data Source', render: r => <span className="font-medium text-ink">{r.source}</span> },
              { key: 'status', header: 'Status', render: r => <Badge tone={r.status === 'Synced' ? 'pos' : r.status === 'Failed' ? 'neg' : 'warn'}>{r.status}</Badge> },
              { key: 'records', header: 'Records', align: 'right', render: r => <span className="tabular-nums">{r.recordCount.toLocaleString()}</span> },
              { key: 'lastSync', header: 'Last Sync', render: r => <span className="tabular-nums">{r.lastSync}</span> },
              { key: 'actions', header: '', align: 'right', render: r => (
                <Button size="sm" disabled={r.status === 'Syncing'} onClick={() => triggerSync(r.id)}>
                  {r.status === 'Syncing' ? 'Syncing...' : 'Trigger Sync'}
                </Button>
              )}
            ]}
            rows={jobs}
            rowKey={r => r.id}
          />
        </Card>
      </PageBody>
    </>
  );
}

export function AdminCGI() {
  const [weights, setWeights] = useState({ Growth: 30, FDI: 20, Inflation: 25, Demographics: 25 });
  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  const previewCountries = countries.slice(0, 10).map(c => {
    // mock computation based on weights
    const adjustment = ((weights.Growth - 30) * 0.1) + ((weights.Inflation - 25) * -0.1);
    return { ...c, newCgi: c.cgi + adjustment };
  });

  return (
    <>
      <PageHeader title="CGI Methodology" subtitle="Adjust global pillar weights to see theoretical impact on Country Growth Index." />
      <PageBody className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Global Weights" subtitle="Must sum to 100%" />
            <div className="p-6 space-y-6">
              {Object.entries(weights).map(([k, v]) => (
                <div key={k} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{k}</span>
                    <span className="font-medium">{v}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={v} 
                    onChange={e => setWeights(prev => ({...prev, [k]: Number(e.target.value)}))} 
                    className="w-full accent-accent" 
                  />
                </div>
              ))}
              <div className={`p-4 rounded-lg flex items-center justify-between ${total === 100 ? 'bg-pos/10 text-pos' : 'bg-neg/10 text-neg'}`}>
                <span className="font-medium">Total Weight</span>
                <span className="font-bold text-lg">{total}%</span>
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader title="Top 10 Preview" subtitle="Simulated score shifts" />
            <div className="border-t border-line">
              <DataTable
                columns={[
                  { key: 'name', header: 'Country', render: r => r.name },
                  { key: 'old', header: 'Current CGI', render: r => num(r.cgi, 1) },
                  { key: 'new', header: 'Simulated CGI', render: r => <span className="font-medium text-ink">{num(r.newCgi, 1)}</span> },
                  { key: 'diff', header: 'Delta', render: r => {
                      const diff = r.newCgi - r.cgi;
                      return <span className={diff >= 0 ? 'text-pos' : 'text-neg'}>{diff > 0 ? '+' : ''}{num(diff, 2)}</span>;
                    }
                  }
                ]}
                rows={previewCountries.sort((a,b) => b.newCgi - a.newCgi)}
                rowKey={r => r.id}
              />
            </div>
          </Card>
        </div>
      </PageBody>
    </>
  );
}

export function AdminInstruments() {
  const loading = useSimulatedLoading();
  const [items, setItems] = useState(adminInstruments);

  const toggleStatus = (id: string, current: string) => {
    const next = current === 'Listed' ? 'Delisted' : 'Listed';
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: next } : i));
  };

  return (
    <>
      <PageHeader title="Instruments Master" subtitle="Manage listing status and availability of tradable assets." />
      <PageBody className="space-y-6">
        <Card>
          <DataTable
            columns={[
              { key: 'name', header: 'Instrument', render: r => (
                <div><div className="font-medium text-ink">{r.name}</div><div className="text-xs text-ink-3">{r.symbol}</div></div>
              )},
              { key: 'type', header: 'Type', render: r => r.type },
              { key: 'aum', header: 'AUM (Cr)', align: 'right', render: r => <span className="tabular-nums">{num(r.aum, 0)}</span> },
              { key: 'status', header: 'Status', render: r => <Badge tone={r.status === 'Listed' ? 'pos' : r.status === 'Delisted' ? 'neg' : 'warn'}>{r.status}</Badge> },
              { key: 'actions', header: '', align: 'right', render: r => (
                <Button size="sm" variant="secondary" onClick={() => toggleStatus(r.id, r.status)}>
                  {r.status === 'Listed' ? 'Delist' : 'List'}
                </Button>
              )}
            ]}
            rows={items}
            rowKey={r => r.id}
            loading={loading}
          />
        </Card>
      </PageBody>
    </>
  );
}

export function AdminOrders() {
  const loading = useSimulatedLoading();
  const [filter, setFilter] = useState('All');
  
  const filtered = orders.filter(o => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return o.status === 'Pending' || o.status === 'Open';
    if (filter === 'Filled') return o.status === 'Executed';
    return o.status === filter;
  });

  return (
    <>
      <PageHeader title="Platform Orders" subtitle="Global order book and execution status." />
      <PageBody className="space-y-6">
        <Card>
          <div className="p-4 border-b border-line flex gap-2">
            {['All', 'Pending', 'Filled', 'Cancelled'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-surface border border-line-strong text-ink shadow-sm' : 'bg-transparent text-ink-3 hover:text-ink-2'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <DataTable
            columns={[
              { key: 'id', header: 'Order ID', render: r => <span className="font-mono text-xs">{r.id}</span> },
              { key: 'user', header: 'User', render: () => 'A. Mehta' }, // mock static user
              { key: 'instrument', header: 'Instrument', render: r => <span className="font-medium">{r.symbol}</span> },
              { key: 'side', header: 'Side', render: r => <span className={r.side === 'BUY' ? 'text-pos font-medium' : 'text-neg font-medium'}>{r.side}</span> },
              { key: 'qty', header: 'Qty / Filled', align: 'right', render: r => <span className="tabular-nums">{r.quantity} / {r.filled}</span> },
              { key: 'status', header: 'Status', render: r => <Badge tone={r.status === 'Executed' ? 'pos' : r.status === 'Cancelled' ? 'neg' : 'info'}>{r.status}</Badge> },
              { key: 'time', header: 'Time', align: 'right', render: r => <span className="text-ink-3 tabular-nums">{r.time}</span> }
            ]}
            rows={filtered}
            rowKey={r => r.id}
            loading={loading}
          />
        </Card>
      </PageBody>
    </>
  );
}

export function AdminResearch() {
  const loading = useSimulatedLoading();
  const [reports, setReports] = useState(research.map((c, i) => ({ ...c, status: i % 3 === 0 ? 'Draft' : 'Published', lastEdited: '12 Sep 2026' })));

  const toggleStatus = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Published' ? 'Draft' : 'Published' } : r));
  };

  return (
    <>
      <PageHeader title="Research Editorial" subtitle="Manage and publish macroeconomic research reports." />
      <PageBody className="space-y-6">
        <Card>
          <DataTable
            columns={[
              { key: 'title', header: 'Title', render: r => <span className="font-medium text-ink">{r.title}</span> },
              { key: 'author', header: 'Author', render: r => r.author },
              { key: 'category', header: 'Category', render: r => r.category },
              { key: 'status', header: 'Status', render: r => <Badge tone={r.status === 'Published' ? 'pos' : 'warn'}>{r.status}</Badge> },
              { key: 'edited', header: 'Last Edited', render: r => <span className="text-ink-3 tabular-nums">{r.lastEdited}</span> },
              { key: 'actions', header: '', align: 'right', render: r => (
                <Button size="sm" variant="secondary" onClick={() => toggleStatus(r.id)}>
                  {r.status === 'Published' ? 'Unpublish' : 'Publish'}
                </Button>
              )}
            ]}
            rows={reports}
            rowKey={r => r.id}
            loading={loading}
          />
        </Card>
      </PageBody>
    </>
  );
}

export function AdminAudit() {
  const loading = useSimulatedLoading();
  const [filter, setFilter] = useState('All');
  
  const filtered = auditLogs.filter(a => filter === 'All' ? true : a.action.includes(filter));

  return (
    <>
      <PageHeader title="Audit Logs" subtitle="Immutable record of administrative actions." />
      <PageBody className="space-y-6">
        <Card>
          <div className="p-4 border-b border-line flex gap-2">
            {['All', 'Update', 'Publish', 'Sync', 'Suspend'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-surface border border-line-strong text-ink shadow-sm' : 'bg-transparent text-ink-3 hover:text-ink-2'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <DataTable
            columns={[
              { key: 'time', header: 'Timestamp', render: r => <span className="tabular-nums text-ink-3">{r.timestamp}</span> },
              { key: 'actor', header: 'Actor', render: r => <span className="font-medium text-ink">{r.actor}</span> },
              { key: 'action', header: 'Action', render: r => r.action },
              { key: 'target', header: 'Target Entity', render: r => r.target },
              { key: 'details', header: 'Details', render: r => <span className="text-ink-2">{r.details}</span> }
            ]}
            rows={filtered}
            rowKey={r => r.id}
            loading={loading}
          />
        </Card>
      </PageBody>
    </>
  );
}

export function SystemHealth() {
  const loading = useSimulatedLoading();
  
  return (
    <>
      <PageHeader title="System Health" subtitle="Service status, latency and error rates." />
      <PageBody className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">API Uptime</div>
            <div className="text-3xl font-bold text-ink">{systemHealth.apiUptime}%</div>
          </Card>
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">Avg Response Time</div>
            <div className="text-3xl font-bold text-ink">{systemHealth.responseTime}ms</div>
          </Card>
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">Error Rate</div>
            <div className="text-3xl font-bold text-ink">{systemHealth.errorRate}%</div>
          </Card>
          <Card className="p-5 flex flex-col justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-2">Active Sessions</div>
            <div className="text-3xl font-bold text-ink">{systemHealth.activeSessions}</div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="API Response Time (24h)" />
            <div className="p-5">
              {loading ? (
                <div className="h-[260px] animate-pulse bg-subtle rounded"></div>
              ) : (
                <AreaSeries
                  data={systemHealth.history}
                  xKey="time"
                  series={[{ key: 'responseTime', label: 'Latency (ms)', color: '#0072D4' }]}
                  height={260}
                />
              )}
            </div>
          </Card>
          
          <Card>
            <CardHeader title="Backend Services" />
            <div className="flex flex-col">
              {systemHealth.services.map(s => (
                <div key={s.name} className="flex items-center justify-between p-4 border-b border-line last:border-0">
                  <span className="font-medium text-ink">{s.name}</span>
                  <Badge tone={s.status === 'Operational' ? 'pos' : s.status === 'Degraded' ? 'warn' : 'neg'}>{s.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PageBody>
    </>
  );
}


