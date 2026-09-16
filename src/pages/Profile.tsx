import React, { useState } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Field, Input } from '../components/ui/Input';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../components/ui/Toast';
import { Badge } from '../components/ui/Badge';

export function Profile() {
  const { currentUser } = useUser();
  const { addToast } = useToast();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [saving, setSaving] = useState(false);
  const [linkedStatus, setLinkedStatus] = useState<'Linked' | 'Disconnected'>('Linked');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // NOTE: This does not persist to UserContext since we lack an update function in this mock environment
      addToast({
        title: 'Profile updated',
        message: 'Your personal information has been saved.',
        tone: 'pos'
      });
    }, 600);
  };

  const handleToggleLink = () => {
    const next = linkedStatus === 'Linked' ? 'Disconnected' : 'Linked';
    setLinkedStatus(next);
    addToast({
      title: `Account ${next.toLowerCase()}`,
      message: `Your Google account has been ${next.toLowerCase()}.`,
      tone: 'info'
    });
  };

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your personal information and linked accounts."
      />
      <PageBody className="max-w-3xl space-y-6">
        <Card>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[13px] font-medium text-ink">Personal Information</h3>
          </div>
          <div className="space-y-4 px-5 py-5">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full Name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Email Address">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                />
              </Field>
              <Field label="Account Role">
                <Input value={currentUser.role} disabled />
              </Field>
              <Field label="Account Type">
                <Input value={currentUser.accountType} disabled />
              </Field>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <Badge tone="pos">Active</Badge>
                <span className="text-[11px] text-ink-3">Member since Jan 2024</span>
              </div>
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[13px] font-medium text-ink">Linked Accounts</h3>
          </div>
          <div className="px-5 py-5">
            <div className="flex items-center justify-between rounded-md border border-line p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-subtle text-ink">
                  G
                </div>
                <div>
                  <p className="text-[13px] font-medium text-ink">Google</p>
                  <p className="text-[11px] text-ink-3">
                    {linkedStatus === 'Linked' ? currentUser.email : 'Not connected'}
                  </p>
                </div>
              </div>
              <Button variant="secondary" onClick={handleToggleLink}>
                {linkedStatus === 'Linked' ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        </Card>
      </PageBody>
    </>
  );
}
