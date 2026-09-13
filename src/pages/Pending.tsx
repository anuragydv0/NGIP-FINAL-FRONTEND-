import React from 'react';
import { Link } from 'react-router-dom';
import { HammerIcon } from 'lucide-react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/States';
import { Badge } from '../components/ui/Badge';

function Module({
  title,
  subtitle,
  planned




}: {title: string;subtitle: string;planned: string[];}) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        meta={<Badge tone="info">Module not built yet</Badge>}
        actions={
        <Link to="/app/dashboard">
            <Button variant="primary">Back to dashboard</Button>
          </Link>
        } />
      
      <PageBody>
        <Card>
          <EmptyState
            icon={<HammerIcon className="h-4 w-4" />}
            title="This module is scheduled but not designed yet"
            description="The application shell, design system and navigation are in place. This screen is the next step in the build." />
          
          <div className="border-t border-line px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-4">
              Planned contents
            </p>
            <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {planned.map((p) =>
              <li
                key={p}
                className="rounded-md border border-line bg-subtle px-3 py-2 text-xs text-ink-2">
                
                  {p}
                </li>
              )}
            </ul>
          </div>
        </Card>
      </PageBody>
    </>);

}

export const ScenarioAnalysis = () =>
<Module
  title="Scenario analysis"
  subtitle="Model bull, base and bear macro assumptions and read their portfolio impact."
  planned={[
  'Bull / base / bear tabs',
  'GDP growth, inflation, rate inputs',
  'FDI, currency, trade inputs',
  'Portfolio impact output',
  'Country impact output',
  'Risk impact output']
  } />;



export const StrategyBuilder = () =>
<Module
  title="Strategy builder"
  subtitle="Define quantitative country rules, rank the universe and build a rebalanced basket."
  planned={[
  'Rule builder (CGI, growth, inflation)',
  'Ranking and selection',
  'Weighting scheme',
  'Rebalance frequency',
  'Strategy results table',
  'Return, volatility, Sharpe, drawdown']
  } />;



export const Backtesting = () =>
<Module
  title="Backtesting"
  subtitle="Run a saved strategy against history with fees, slippage and a benchmark."
  planned={[
  'Strategy selector',
  'Initial capital and date range',
  'Benchmark, fees, slippage',
  'Equity curve',
  'Metrics table',
  'Risk panel']
  } />;



export const AIResearch = () =>
<Module
  title="AI research"
  subtitle="A financial intelligence copilot for comparative economic questions."
  planned={[
  'Conversation history rail',
  'Structured answer sections',
  'Sources and data panel',
  'Related countries',
  'Related instruments',
  'Suggested questions']
  } />;



export const AIPortfolioAnalyst = () =>
<Module
  title="AI portfolio analyst"
  subtitle="Ask why the portfolio moved and where exposure is unbalanced."
  planned={[
  'Preset analyst questions',
  'AI explanation panel',
  'Supporting charts',
  'Affected holdings',
  'Source data citations',
  'Follow-up actions']
  } />;



export const Reports = () =>
<Module
  title="Reports"
  subtitle="Generate, view and download portfolio, country, risk and tax reports."
  planned={[
  'Portfolio report',
  'Country report',
  'Risk report',
  'Transaction statement',
  'Performance report',
  'Tax report']
  } />;



export const Profile = () =>
<Module
  title="Profile"
  subtitle="Your account identity, reporting currency and membership."
  planned={[
  'Name and email',
  'Country and currency',
  'Account status',
  'Membership tier',
  'Preferences',
  'Linked accounts']
  } />;



export const Settings = () =>
<Module
  title="Settings"
  subtitle="General, appearance, notification and data preferences."
  planned={[
  'General',
  'Appearance',
  'Notifications',
  'Privacy',
  'Language and currency',
  'Data preferences']
  } />;



export const Security = () =>
<Module
  title="Security"
  subtitle="Password, multi-factor authentication, sessions and login history."
  planned={[
  'Password',
  'Multi-factor authentication',
  'Active sessions',
  'Devices',
  'Login history',
  'Logout all devices']
  } />;



export const Alerts = () =>
<Module
  title="Alerts"
  subtitle="Threshold alerts across CGI, economic indicators, prices and portfolio drawdown."
  planned={[
  'Active alerts',
  'Triggered alerts',
  'Paused alerts',
  'CGI and indicator thresholds',
  'Instrument price alerts',
  'Portfolio drawdown alerts']
  } />;



export const NotificationsPage = () =>
<Module
  title="Notifications"
  subtitle="Orders, portfolio, market, economic, security and system notifications."
  planned={[
  'Category filters',
  'Unread and read states',
  'Mark all as read',
  'Notification detail',
  'Deep links to source',
  'Delivery preferences']
  } />;



export const AdminDashboard = () =>
<Module
  title="Admin dashboard"
  subtitle="Operational overview of users, orders, data ingestion and platform health."
  planned={[
  'Users and active users',
  'Orders and transactions',
  'Volume and payments',
  'KYC queue',
  'Data ingestion status',
  'System health']
  } />;



export const AdminUsers = () =>
<Module
  title="Admin · users"
  subtitle="User accounts, KYC status and risk classification."
  planned={['User', 'Status', 'Country', 'KYC', 'Created', 'Last active']} />;



export const AdminCountries = () =>
<Module
  title="Admin · countries"
  subtitle="Coverage universe, CGI publication status and data freshness."
  planned={['Country', 'Status', 'CGI', 'Data freshness', 'Last updated', 'Methodology']} />;



export const AdminEconomicData = () =>
<Module
  title="Admin · economic data"
  subtitle="Sources, indicators, ingestion runs and data quality."
  planned={['Sources', 'Indicators', 'Latest updates', 'Data quality', 'Failed ingestion', 'Stale and missing data']} />;



export const AdminCGI = () =>
<Module
  title="Admin · CGI methodology"
  subtitle="Manage pillar weights, indicator mapping, versions and calculation runs."
  planned={['Methodology', 'Weights', 'Indicators', 'Versions', 'Calculation runs', 'Publishing status']} />;



export const AdminInstruments = () =>
<Module
  title="Admin · instruments"
  subtitle="Instrument master, providers, price sources and status."
  planned={['Instrument', 'Provider', 'Type', 'Status', 'Price source', 'Risk and liquidity']} />;



export const AdminOrders = () =>
<Module
  title="Admin · orders"
  subtitle="Platform-wide order flow with provider status."
  planned={['Order ID', 'User', 'Instrument', 'Side', 'Status', 'Provider status']} />;



export const AdminResearch = () =>
<Module
  title="Admin · research"
  subtitle="Editorial workflow for research publication."
  planned={['Draft', 'Review', 'Published', 'Archived', 'Authors', 'Coverage gaps']} />;



export const AdminAudit = () =>
<Module
  title="Admin · audit logs"
  subtitle="Immutable record of administrative actions."
  planned={['Timestamp', 'User', 'Action', 'Resource', 'Before and after', 'Request ID']} />;



export const SystemHealth = () =>
<Module
  title="System health"
  subtitle="Service status, latency and error rates across the platform."
  planned={['API', 'Database', 'Redis', 'Kafka', 'Market data', 'WebSocket']} />;