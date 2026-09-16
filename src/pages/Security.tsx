import React, { useState } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Field, Input, Toggle } from '../components/ui/Input';
import { DataTable } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import { mockSessions, mockLogins } from '../data/security';
import { formatRelativeTime } from '../utils/format';

export function Security() {
  const { addToast } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPwd, setChangingPwd] = useState(false);
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState(mockSessions);

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast({ title: 'Error', message: 'All fields are required.', tone: 'neg' });
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast({ title: 'Error', message: 'Passwords do not match.', tone: 'neg' });
      return;
    }
    setChangingPwd(true);
    setTimeout(() => {
      setChangingPwd(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      addToast({ title: 'Password updated', message: 'Your password has been successfully changed.', tone: 'pos' });
    }, 600);
  };

  const handleToggle2FA = (val: boolean) => {
    setTwoFactorEnabled(val);
    if (!val) {
      addToast({ title: '2FA Disabled', message: 'Two-factor authentication is now off.', tone: 'info' });
    }
  };

  const handleLogoutSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    addToast({ title: 'Session terminated', tone: 'info' });
  };

  const handleLogoutAllOther = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    addToast({ title: 'All other sessions terminated', tone: 'pos' });
  };

  const loginColumns = [
    {
      header: 'Time',
      accessor: (l: any) => (
        <span className="text-[13px] text-ink">{formatRelativeTime(new Date(l.timestamp).getTime())}</span>
      )
    },
    {
      header: 'Device',
      accessor: (l: any) => <span className="text-[13px] text-ink-2">{l.device}</span>
    },
    {
      header: 'Location',
      accessor: (l: any) => <span className="text-[13px] text-ink-3">{l.location}</span>
    },
    {
      header: 'Status',
      accessor: (l: any) => (
        <Badge tone={l.status === 'Success' ? 'pos' : 'neg'}>{l.status}</Badge>
      )
    }
  ];

  return (
    <>
      <PageHeader
        title="Security"
        subtitle="Manage your password, 2FA, and monitor account activity."
      />
      <PageBody className="max-w-4xl space-y-6">
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Change Password */}
          <Card>
            <div className="border-b border-line px-5 py-4">
              <h3 className="text-[13px] font-medium text-ink">Change Password</h3>
            </div>
            <div className="space-y-4 px-5 py-5">
              <Field label="Current Password">
                <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </Field>
              <Field label="New Password">
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Field>
              <Field label="Confirm New Password">
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </Field>
              <div className="flex justify-end pt-2">
                <Button variant="primary" onClick={handlePasswordChange} disabled={changingPwd}>
                  {changingPwd ? 'Updating...' : 'Update password'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Two-Factor Auth */}
          <Card>
            <div className="border-b border-line px-5 py-4">
              <h3 className="text-[13px] font-medium text-ink">Two-Factor Authentication</h3>
            </div>
            <div className="space-y-5 px-5 py-5">
              <div className="flex items-start justify-between">
                <div className="pr-6">
                  <p className="text-[13px] font-medium text-ink">Authenticator App</p>
                  <p className="mt-1 text-xs text-ink-3 leading-relaxed">
                    Use an app like Google Authenticator or 1Password to scan a QR code and generate temporary codes.
                  </p>
                </div>
                <Toggle checked={twoFactorEnabled} onChange={handleToggle2FA} />
              </div>
              
              {twoFactorEnabled && (
                <div className="mt-4 rounded-md border border-line bg-subtle p-6 flex flex-col items-center justify-center">
                  <div className="h-32 w-32 rounded bg-surface border border-line flex items-center justify-center mb-4">
                    <span className="text-xs text-ink-4">Mock QR Code</span>
                  </div>
                  <p className="text-xs font-medium text-ink">Scan this code with your app</p>
                  <p className="mt-1 text-[11px] text-ink-4 text-center">Once scanned, enter the 6-digit code to complete setup.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Active Sessions */}
        <Card>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h3 className="text-[13px] font-medium text-ink">Active Sessions</h3>
            <Button variant="secondary" onClick={handleLogoutAllOther}>
              Log out all other sessions
            </Button>
          </div>
          <div className="divide-y divide-line">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-ink">{s.device}</p>
                    {s.isCurrent && <Badge tone="pos">Current session</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-3">
                    {s.location} · Last active: {s.lastActive}
                  </p>
                </div>
                {!s.isCurrent && (
                  <Button variant="ghost" onClick={() => handleLogoutSession(s.id)}>
                    Log out
                  </Button>
                )}
              </div>
            ))}
            {sessions.length === 0 && (
              <div className="px-5 py-4 text-center text-[13px] text-ink-4">
                No active sessions found.
              </div>
            )}
          </div>
        </Card>

        {/* Login History */}
        <Card>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[13px] font-medium text-ink">Recent Login History</h3>
          </div>
          <DataTable data={mockLogins} columns={loginColumns} keyExtractor={(l) => l.id} />
        </Card>

      </PageBody>
    </>
  );
}
