import React, { useState } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/Table';
import { Modal } from '../components/ui/Overlay';
import { Field, Select, Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';
import { mockAlerts } from '../data/alerts';
import { AlertRule } from '../types';
import { countries } from '../data/countries';
import { instruments } from '../data/instruments';

export function Alerts() {
  const { addToast } = useToast();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [isCreating, setIsCreating] = useState(false);

  const [newTargetType, setNewTargetType] = useState<'Country' | 'Instrument'>('Country');
  const [newTargetId, setNewTargetId] = useState(countries[0].id);
  const [newConditionType, setNewConditionType] = useState<'CGI Value' | 'Price Change %' | 'Risk Band Change'>('CGI Value');
  const [newThreshold, setNewThreshold] = useState('< 80');

  const handleDelete = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    addToast({ title: 'Alert deleted', tone: 'info' });
  };

  const handleTogglePause = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'Paused' ? 'Active' : 'Paused';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleCreate = () => {
    const targetName = newTargetType === 'Country'
      ? countries.find((c) => c.id === newTargetId)?.name || 'Unknown'
      : instruments.find((i) => i.id === newTargetId)?.name || 'Unknown';

    const newAlert: AlertRule = {
      id: `alert-new-${Date.now()}`,
      targetType: newTargetType,
      targetId: newTargetId,
      targetName,
      conditionType: newConditionType,
      threshold: newThreshold,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAlerts([newAlert, ...alerts]);
    setIsCreating(false);
    addToast({ title: 'Alert created successfully', tone: 'pos' });
  };
  const columns = [
    {
      key: 'target',
      header: 'Target',
      render: (a: AlertRule) => (
        <div>
          <p className="text-[13px] font-medium text-ink">{a.targetName}</p>
          <p className="text-xs text-ink-3">{a.targetType}</p>
        </div>
      )
    },
    {
      key: 'condition',
      header: 'Condition',
      render: (a: AlertRule) => (
        <span className="text-[13px] text-ink-2">
          {a.conditionType} {a.threshold}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (a: AlertRule) => {
        const tone = a.status === 'Active' ? 'pos' : a.status === 'Triggered' ? 'warn' : 'neutral';
        return <Badge tone={tone}>{a.status}</Badge>;
      }
    },
    {
      key: 'created',
      header: 'Created',
      render: (a: AlertRule) => (
        <span className="text-[13px] text-ink-3">{a.createdAt}</span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (a: AlertRule) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => handleTogglePause(a.id)}>
            {a.status === 'Paused' ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="ghost" onClick={() => handleDelete(a.id)}>
            Delete
          </Button>
        </div>
      ),
      align: 'right' as const
    }
  ];

  return (
    <>
      <PageHeader
        title="Alerts"
        subtitle="Manage triggers for price movements and CGI threshold crossings."
        actions={
          <Button variant="primary" onClick={() => setIsCreating(true)}>
            Create alert
          </Button>
        }
      />
      <PageBody>
        <Card>
          <DataTable rows={alerts} columns={columns} rowKey={(a) => a.id} />
        </Card>
      </PageBody>

      <Modal open={isCreating} onClose={() => setIsCreating(false)} title="Create Alert">
        <div className="space-y-4">
          <Field label="Target Type">
            <Select
              value={newTargetType}
              onChange={(e) => {
                const type = e.target.value as 'Country' | 'Instrument';
                setNewTargetType(type);
                setNewTargetId(type === 'Country' ? countries[0].id : instruments[0].id);
              }}
            >
              <option value="Country">Country (CGI / Macro)</option>
              <option value="Instrument">Instrument (Price / Volatility)</option>
            </Select>
          </Field>
          
          <Field label="Select Target">
            <Select value={newTargetId} onChange={(e) => setNewTargetId(e.target.value)}>
              {newTargetType === 'Country'
                ? countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                : instruments.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.symbol} - {i.name}
                    </option>
                  ))}
            </Select>
          </Field>

          <Field label="Condition Type">
            <Select
              value={newConditionType}
              onChange={(e) => setNewConditionType(e.target.value as any)}
            >
              {newTargetType === 'Country' ? (
                <>
                  <option value="CGI Value">CGI Value</option>
                  <option value="Risk Band Change">Risk Band Change</option>
                </>
              ) : (
                <>
                  <option value="Price Change %">Price Change %</option>
                  <option value="Risk Band Change">Risk Band Change</option>
                </>
              )}
            </Select>
          </Field>

          <Field label="Threshold">
            <Input
              value={newThreshold}
              onChange={(e) => setNewThreshold(e.target.value)}
              placeholder="e.g. < 80 or ±5%"
            />
          </Field>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Save alert
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
