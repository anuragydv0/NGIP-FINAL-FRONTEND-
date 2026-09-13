import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { OrderTicketProvider } from './contexts/OrderTicketContext';
import { AppShell } from './components/shell/AppShell';

import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Onboarding } from './pages/auth/Onboarding';

import { Dashboard } from './pages/Dashboard';
import { Markets } from './pages/Markets';
import { Countries } from './pages/Countries';
import { CountryDetail } from './pages/CountryDetail';
import { CountryComparison } from './pages/CountryComparison';
import { CountryScreener } from './pages/CountryScreener';
import { CountryIntelligence } from './pages/CountryIntelligence';
import { Instruments } from './pages/Instruments';
import { InstrumentDetail } from './pages/InstrumentDetail';
import { Watchlists } from './pages/Watchlists';

import { Portfolio } from './pages/Portfolio';
import { Holdings } from './pages/Holdings';
import { Positions } from './pages/Positions';
import { Orders } from './pages/Orders';
import { OrderDetail } from './pages/OrderDetail';
import { Funds } from './pages/Funds';
import { Transactions } from './pages/Transactions';

import { ResearchCenter } from './pages/ResearchCenter';
import { ResearchReportPage } from './pages/ResearchReportPage';
import { News } from './pages/News';
import { EconomicCalendar } from './pages/EconomicCalendar';

import { Analytics } from './pages/Analytics';
import { RiskAnalysis } from './pages/RiskAnalysis';

import {
  Alerts,
  NotificationsPage,
  AdminAudit,
  AdminCGI,
  AdminCountries,
  AdminDashboard,
  AdminEconomicData,
  AdminInstruments,
  AdminOrders,
  AdminResearch,
  AdminUsers,
  AIPortfolioAnalyst,
  AIResearch,
  Backtesting,
  Profile,
  Reports,
  ScenarioAnalysis,
  Security,
  Settings,
  StrategyBuilder,
  SystemHealth } from
'./pages/Pending';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <OrderTicketProvider>
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

            <Route path="/admin" element={<AppShell />}>
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
        </OrderTicketProvider>
      </ToastProvider>
    </BrowserRouter>);

}