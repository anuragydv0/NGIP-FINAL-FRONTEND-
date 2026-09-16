import React, { useState } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Field, Select, Toggle } from '../components/ui/Input';
import { Accordion, AccordionItem } from '../components/ui/Accordion';
import { useToast } from '../components/ui/Toast';
import { useTheme } from '../contexts/ThemeContext';
import { mockFaqs } from '../data/faq';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [savingDisplay, setSavingDisplay] = useState(false);
  const [savingNotifs, setSavingNotifs] = useState(false);

  const [currency, setCurrency] = useState('INR');
  const [numberFormat, setNumberFormat] = useState('comma');
  
  const [notifs, setNotifs] = useState({
    execution: true,
    price: true,
    research: false,
    security: true
  });

  const handleSaveDisplay = () => {
    setSavingDisplay(true);
    setTimeout(() => {
      setSavingDisplay(false);
      addToast({ title: 'Display preferences saved', tone: 'pos' });
    }, 400);
  };

  const handleSaveNotifs = () => {
    setSavingNotifs(true);
    setTimeout(() => {
      setSavingNotifs(false);
      addToast({ title: 'Notification preferences saved', tone: 'pos' });
    }, 400);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your application preferences and support."
      />
      <PageBody className="max-w-3xl space-y-6">
        
        {/* Display Preferences */}
        <Card>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[13px] font-medium text-ink">Display Preferences</h3>
          </div>
          <div className="space-y-5 px-5 py-5">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Default Currency">
                <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="INR">Indian Rupee (INR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </Select>
              </Field>
              <Field label="Number Format">
                <Select value={numberFormat} onChange={(e) => setNumberFormat(e.target.value)}>
                  <option value="comma">1,234,567.89</option>
                  <option value="space">1 234 567.89</option>
                  <option value="dot">1.234.567,89</option>
                </Select>
              </Field>
            </div>
            
            <div className="flex items-center justify-between border-t border-line pt-4">
              <div>
                <p className="text-[13px] font-medium text-ink">Theme</p>
                <p className="text-xs text-ink-3">Switch between light and dark themes</p>
              </div>
              <Button variant="secondary" onClick={toggleTheme}>
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </Button>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={handleSaveDisplay} disabled={savingDisplay}>
                {savingDisplay ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[13px] font-medium text-ink">Notification Preferences</h3>
          </div>
          <div className="space-y-4 px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">Order Execution</p>
                <p className="text-xs text-ink-3">Receive alerts when orders are filled or rejected</p>
              </div>
              <Toggle checked={notifs.execution} onChange={(val) => setNotifs({ ...notifs, execution: val })} />
            </div>
            <div className="flex items-center justify-between border-t border-line pt-4">
              <div>
                <p className="text-[13px] font-medium text-ink">Price Alerts</p>
                <p className="text-xs text-ink-3">Receive alerts when instruments hit price targets</p>
              </div>
              <Toggle checked={notifs.price} onChange={(val) => setNotifs({ ...notifs, price: val })} />
            </div>
            <div className="flex items-center justify-between border-t border-line pt-4">
              <div>
                <p className="text-[13px] font-medium text-ink">Research Digests</p>
                <p className="text-xs text-ink-3">Weekly summaries of macro-economic research</p>
              </div>
              <Toggle checked={notifs.research} onChange={(val) => setNotifs({ ...notifs, research: val })} />
            </div>
            <div className="flex items-center justify-between border-t border-line pt-4">
              <div>
                <p className="text-[13px] font-medium text-ink">Security Alerts</p>
                <p className="text-xs text-ink-3">Important updates about your account security</p>
              </div>
              <Toggle checked={notifs.security} onChange={(val) => setNotifs({ ...notifs, security: val })} />
            </div>
            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={handleSaveNotifs} disabled={savingNotifs}>
                {savingNotifs ? 'Saving...' : 'Save preferences'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Support & FAQ */}
        <Card>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[13px] font-medium text-ink">Support & FAQ</h3>
          </div>
          <div className="px-5 pb-2 pt-1">
            <Accordion>
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} title={faq.question}>
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Card>

      </PageBody>
    </>
  );
}
