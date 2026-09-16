import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RequireAdmin } from './components/RequireAdmin';
import { OrderTicketProvider } from './contexts/OrderTicketContext';
import { LiveDataProvider } from './contexts/LiveDataContext';
import { AppShell } from './components/shell/AppShell';

import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Onboarding } from './pages/auth/Onboarding';

import { LoadingState } from './components/ui/States';

const Dashboard = React.lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Markets = React.lazy(() => import('./pages/Markets').then(m => ({ default: m.Markets })));
const Countries = React.lazy(() => import('./pages/Countries').then(m => ({ default: m.Countries })));
const CountryDetail = React.lazy(() => import('./pages/CountryDetail').then(m => ({ default: m.CountryDetail })));
const CountryComparison = React.lazy(() => import('./pages/CountryComparison').then(m => ({ default: m.CountryComparison })));
const CountryScreener = React.lazy(() => import('./pages/CountryScreener').then(m => ({ default: m.CountryScreener })));
const CountryIntelligence = React.lazy(() => import('./pages/CountryIntelligence').then(m => ({ default: m.CountryIntelligence })));
const Instruments = React.lazy(() => import('./pages/Instruments').then(m => ({ default: m.Instruments })));
const InstrumentDetail = React.lazy(() => import('./pages/InstrumentDetail').then(m => ({ default: m.InstrumentDetail })));
const Watchlists = React.lazy(() => import('./pages/Watchlists').then(m => ({ default: m.Watchlists })));

const Portfolio = React.lazy(() => import('./pages/Portfolio').then(m => ({ default: m.Portfolio })));
const Holdings = React.lazy(() => import('./pages/Holdings').then(m => ({ default: m.Holdings })));
const Positions = React.lazy(() => import('./pages/Positions').then(m => ({ default: m.Positions })));
const Orders = React.lazy(() => import('./pages/Orders').then(m => ({ default: m.Orders })));
const OrderDetail = React.lazy(() => import('./pages/OrderDetail').then(m => ({ default: m.OrderDetail })));
const Funds = React.lazy(() => import('./pages/Funds').then(m => ({ default: m.Funds })));
const Transactions = React.lazy(() => import('./pages/Transactions').then(m => ({ default: m.Transactions })));

const ResearchCenter = React.lazy(() => import('./pages/ResearchCenter').then(m => ({ default: m.ResearchCenter })));
const ResearchReportPage = React.lazy(() => import('./pages/ResearchReportPage').then(m => ({ default: m.ResearchReportPage })));
const News = React.lazy(() => import('./pages/News').then(m => ({ default: m.News })));
const EconomicCalendar = React.lazy(() => import('./pages/EconomicCalendar').then(m => ({ default: m.EconomicCalendar })));

const Analytics = React.lazy(() => import('./pages/Analytics').then(m => ({ default: m.Analytics })));
const RiskAnalysis = React.lazy(() => import('./pages/RiskAnalysis').then(m => ({ default: m.RiskAnalysis })));
const AdminDashboard = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminDashboard })));
const AdminUsers = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminUsers })));
const AdminCountries = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminCountries })));
const AdminEconomicData = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminEconomicData })));
const AdminCGI = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminCGI })));
const AdminInstruments = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminInstruments })));
const AdminOrders = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminOrders })));
const AdminResearch = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminResearch })));
const AdminAudit = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminAudit })));
const SystemHealth = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.SystemHealth })));
const StrategyBuilder = React.lazy(() => import('./pages/Strategy').then(m => ({ default: m.StrategyBuilder })));
const Backtesting = React.lazy(() => import('./pages/Backtesting').then(m => ({ default: m.Backtesting })));

const Alerts = React.lazy(() => import('./pages/Alerts').then(m => ({ default: m.Alerts })));
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const Profile = React.lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));
const Settings = React.lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const Security = React.lazy(() => import('./pages/Security').then(m => ({ default: m.Security })));
const Reports = React.lazy(() => import('./pages/Reports').then(m => ({ default: m.Reports })));
const ScenarioAnalysis = React.lazy(() => import('./pages/ScenarioAnalysis').then(m => ({ default: m.ScenarioAnalysis })));
const AIResearch = React.lazy(() => import('./pages/AIResearch').then(m => ({ default: m.AIResearch })));
const AIPortfolioAnalyst = React.lazy(() => import('./pages/AIPortfolioAnalyst').then(m => ({ default: m.AIPortfolioAnalyst })));

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
        <ToastProvider>
          <LiveDataProvider>
          <OrderTicketProvider>
            <React.Suspense fallback={<div className="flex h-screen w-full flex-col items-center justify-center bg-canvas"><LoadingState /></div>}>
              <Routes>
              <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />

            <Route path="/app" element={<AppShell />}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="markets" element={<Markets />} />
              <Route path="countries" element={<Countries />} />
              <Route path="countries/:id" element={<CountryDetail />} />
              <Route path="compare" element={<CountryComparison />} />
              <Route path="screener" element={<CountryScreener />} />
              <Route
                path="country-intelligence"
                element={<CountryIntelligence />} />
              
              <Route path="instruments" element={<Instruments />} />
              <Route path="instruments/:id" element={<InstrumentDetail />} />
              <Route path="watchlists" element={<Watchlists />} />

              <Route path="portfolio" element={<Portfolio />} />
              <Route path="holdings" element={<Holdings />} />
              <Route path="positions" element={<Positions />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="funds" element={<Funds />} />
              <Route path="transactions" element={<Transactions />} />

              <Route path="research" element={<ResearchCenter />} />
              <Route path="research/:id" element={<ResearchReportPage />} />
              <Route path="news" element={<News />} />
              <Route path="calendar" element={<EconomicCalendar />} />

              <Route path="analytics" element={<Analytics />} />
              <Route path="risk" element={<RiskAnalysis />} />
              <Route path="scenario" element={<ScenarioAnalysis />} />
              <Route path="strategy" element={<StrategyBuilder />} />
              <Route path="backtesting" element={<Backtesting />} />

              <Route path="ai-research" element={<AIResearch />} />
              <Route path="ai-analyst" element={<AIPortfolioAnalyst />} />

              <Route path="reports" element={<Reports />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="security" element={<Security />} />
            </Route>

            <Route path="/admin" element={<RequireAdmin><AppShell /></RequireAdmin>}>
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />} />
              
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="countries" element={<AdminCountries />} />
              <Route path="economic-data" element={<AdminEconomicData />} />
              <Route path="cgi" element={<AdminCGI />} />
              <Route path="instruments" element={<AdminInstruments />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="research" element={<AdminResearch />} />
              <Route path="audit" element={<AdminAudit />} />
              <Route path="health" element={<SystemHealth />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </React.Suspense>
          </OrderTicketProvider>
          </LiveDataProvider>
        </ToastProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>);

}



