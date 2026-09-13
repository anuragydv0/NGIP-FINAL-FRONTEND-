import type { ComponentType } from 'react';
import {
  ActivityIcon,
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  BotIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarDaysIcon,
  CandlestickChartIcon,
  DatabaseIcon,
  FileBarChartIcon,
  FileTextIcon,
  FilterIcon,
  FlaskConicalIcon,
  GaugeIcon,
  GlobeIcon,
  HeartPulseIcon,
  LayersIcon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  NewspaperIcon,
  ReceiptIcon,
  ScrollTextIcon,
  SearchIcon,
  SettingsIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon } from
'lucide-react';

export type IconComponent = ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

export interface NavItem {
  label: string;
  to: string;
  icon: IconComponent;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const appNav: NavSection[] = [
{
  label: 'Home',
  items: [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboardIcon }]

},
{
  label: 'Markets',
  items: [
  { label: 'Markets', to: '/app/markets', icon: CandlestickChartIcon },
  { label: 'Countries', to: '/app/countries', icon: GlobeIcon },
  { label: 'Instruments', to: '/app/instruments', icon: LayersIcon },
  { label: 'Watchlists', to: '/app/watchlists', icon: StarIcon }]

},
{
  label: 'Invest',
  items: [
  { label: 'Portfolio', to: '/app/portfolio', icon: BriefcaseIcon },
  { label: 'Holdings', to: '/app/holdings', icon: LayersIcon },
  { label: 'Positions', to: '/app/positions', icon: TrendingUpIcon },
  { label: 'Orders', to: '/app/orders', icon: ListOrderedIcon, badge: '3' },
  { label: 'Funds', to: '/app/funds', icon: WalletIcon },
  { label: 'Transactions', to: '/app/transactions', icon: ReceiptIcon }]

},
{
  label: 'Research',
  items: [
  {
    label: 'Country Intelligence',
    to: '/app/country-intelligence',
    icon: GlobeIcon
  },
  { label: 'Research', to: '/app/research', icon: BookOpenIcon },
  { label: 'News', to: '/app/news', icon: NewspaperIcon },
  { label: 'Economic Calendar', to: '/app/calendar', icon: CalendarDaysIcon },
  { label: 'Screeners', to: '/app/screener', icon: FilterIcon }]

},
{
  label: 'Analytics',
  items: [
  { label: 'Analytics', to: '/app/analytics', icon: BarChart3Icon },
  { label: 'Risk', to: '/app/risk', icon: ShieldAlertIcon },
  { label: 'Scenario Analysis', to: '/app/scenario', icon: GaugeIcon },
  { label: 'Strategy Builder', to: '/app/strategy', icon: TargetIcon },
  { label: 'Backtesting', to: '/app/backtesting', icon: FlaskConicalIcon }]

},
{
  label: 'AI',
  items: [
  { label: 'AI Research', to: '/app/ai-research', icon: SparklesIcon },
  { label: 'AI Portfolio Analyst', to: '/app/ai-analyst', icon: BotIcon }]

},
{
  label: 'System',
  items: [
  { label: 'Reports', to: '/app/reports', icon: FileBarChartIcon },
  { label: 'Alerts', to: '/app/alerts', icon: BellIcon },
  { label: 'Notifications', to: '/app/notifications', icon: BellIcon },
  { label: 'Settings', to: '/app/settings', icon: SettingsIcon }]

}];


export const adminNav: NavSection[] = [
{
  label: 'Operations',
  items: [
  { label: 'Admin Dashboard', to: '/admin/dashboard', icon: GaugeIcon },
  { label: 'Users', to: '/admin/users', icon: UsersIcon },
  { label: 'Orders', to: '/admin/orders', icon: ListOrderedIcon }]

},
{
  label: 'Data',
  items: [
  { label: 'Countries', to: '/admin/countries', icon: GlobeIcon },
  { label: 'Economic Data', to: '/admin/economic-data', icon: DatabaseIcon },
  { label: 'CGI Methodology', to: '/admin/cgi', icon: SlidersHorizontalIcon },
  { label: 'Instruments', to: '/admin/instruments', icon: LayersIcon }]

},
{
  label: 'Content',
  items: [
  { label: 'Research', to: '/admin/research', icon: FileTextIcon }]

},
{
  label: 'Platform',
  items: [
  { label: 'Audit Logs', to: '/admin/audit', icon: ScrollTextIcon },
  { label: 'System Health', to: '/admin/health', icon: HeartPulseIcon }]

}];


export const commandGroups = [
{
  label: 'Navigate',
  items: [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboardIcon },
  { label: 'Countries', to: '/app/countries', icon: GlobeIcon },
  { label: 'Country Comparison', to: '/app/compare', icon: ActivityIcon },
  { label: 'Instruments', to: '/app/instruments', icon: LayersIcon },
  { label: 'Portfolio', to: '/app/portfolio', icon: BriefcaseIcon },
  { label: 'Orders', to: '/app/orders', icon: ListOrderedIcon },
  { label: 'Risk Analysis', to: '/app/risk', icon: ShieldAlertIcon },
  { label: 'Strategy Builder', to: '/app/strategy', icon: TargetIcon },
  { label: 'AI Research', to: '/app/ai-research', icon: SparklesIcon },
  { label: 'Security', to: '/app/security', icon: ShieldCheckIcon },
  { label: 'Admin Console', to: '/admin/dashboard', icon: BuildingIcon }]

},
{
  label: 'Actions',
  items: [
  { label: 'Search all countries', to: '/app/countries', icon: SearchIcon },
  { label: 'Run a screen', to: '/app/screener', icon: FilterIcon },
  { label: 'Generate a report', to: '/app/reports', icon: FileBarChartIcon }]

}];