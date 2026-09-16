import React, { useState } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/Table';
import { mockNotifications } from '../data/notifications';
import { NotificationItem } from '../types';
import { cx } from '../utils/format';
import { formatRelativeTime } from '../utils/format';

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(mockNotifications);

  const categories = ['All', 'Orders', 'Portfolio', 'Markets', 'Economic', 'Security', 'System'];

  const filtered = activeTab === 'All'
    ? notifications
    : notifications.filter((n) => n.category === activeTab);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const columns = [
    {
      key: 'notification',
      header: 'Notification',
      render: (n: NotificationItem) => (
        <div className="flex items-start gap-3 py-1">
          <div className="mt-1 flex h-2 w-2 shrink-0 items-center justify-center">
            {!n.read && <div className="h-2 w-2 rounded-full bg-accent" />}
          </div>
          <div>
            <p className={cx('text-[13px]', !n.read ? 'font-medium text-ink' : 'text-ink-2')}>
              {n.title}
            </p>
            <p className="mt-0.5 text-xs text-ink-3">{n.body}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      render: (n: NotificationItem) => (
        <span className="text-[13px] text-ink-3">{n.category}</span>
      )
    },
    {
      key: 'time',
      header: 'Time',
      render: (n: NotificationItem) => (
        <span className="text-[13px] text-ink-3 whitespace-nowrap">
          {formatRelativeTime(new Date(n.time).getTime())}
        </span>
      ),
      align: 'right' as const
    },
    {
      key: 'actions',
      header: '',
      render: (n: NotificationItem) => (
        !n.read && (
          <Button variant="ghost" onClick={() => markAsRead(n.id)}>
            Mark read
          </Button>
        )
      ),
      align: 'right' as const
    }
  ];

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on your portfolio, market events, and system alerts."
        actions={
          <Button variant="secondary" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        }
      />
      <PageBody>
        <div className="mb-4">
          <Tabs tabs={categories} active={activeTab} onChange={setActiveTab} />
        </div>
        <Card>
          <DataTable
            rows={filtered}
            columns={columns}
            rowKey={(n) => n.id}
          />
        </Card>
      </PageBody>
    </>
  );
}
