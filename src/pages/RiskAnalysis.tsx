import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DataTable, Column } from '../components/ui/Table';
import { AreaSeries, BarSeries } from '../components/charts/Charts';
import { pct } from '../utils/format';

import { holdings, drawdownSeries, portfolioSummary } from '../data/portfolio';
import { countries } from '../data/countries';
import { RiskBand } from '../types';

export function RiskAnalysis() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for future async readiness
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const riskBandColor = (band: RiskBand | undefined) => {
    switch (band) {
      case 'High': return 'neg';
      case 'Elevated': return 'warn';
      case 'Moderate': return 'info';
      case 'Low': return 'pos';
      default: return 'info';
    }
  };

  const riskBandColorHex = (band: RiskBand | undefined) => {
    switch (band) {
      case 'High': return '#C2372C'; // neg
      case 'Elevated': return '#E08300'; // warn
      case 'Moderate': return '#0072D4'; // info
      case 'Low': return '#107c41'; // pos
      default: return '#0072D4';
    }
  };

  const holdingsWithRisk = holdings.map(h => {
    const country = countries.find(c => c.name === h.country);
    return {
      ...h,
      riskBand: country?.riskBand || 'Moderate',
      contribution: h.weight * 1.2 * (country?.riskScore || 50) / 100 // Mock contribution
    };
  });

  const num = (v: number, dec = 1) => v.toFixed(dec);

  const columns: Column<typeof holdingsWithRisk[0]>[] = [
    {
      key: 'name',
      header: 'Instrument',
      sortable: true,
      sortValue: (r) => r.name,
      render: (r) => (
        <div>
          <div className="font-medium text-ink">{r.name}</div>
          <div className="text-xs text-ink-3">{r.symbol}</div>
        </div>
      )
    },
    {
      key: 'country',
      header: 'Country',
      sortable: true,
      sortValue: (r) => r.country,
      hideBelow: 'md',
      render: (r) => (
        <div className="flex items-center gap-2">
          <span>{r.flag}</span>
          <span>{r.country}</span>
        </div>
      )
    },
    {
      key: 'riskBand',
      header: 'Risk Band',
      sortable: true,
      sortValue: (r) => r.riskBand,
      render: (r) => (
        <Badge tone={riskBandColor(r.riskBand)}>{r.riskBand}</Badge>
      )
    },
    {
      key: 'weight',
      header: 'Weight',
      align: 'right',
      sortable: true,
      sortValue: (r) => r.weight,
      render: (r) => <div className="font-medium tabular-nums">{pct(r.weight, 1)}</div>
    },
    {
      key: 'contribution',
      header: 'Risk Contrib.',
      align: 'right',
      sortable: true,
      sortValue: (r) => r.contribution,
      hideBelow: 'sm',
      render: (r) => <div className="font-medium tabular-nums">{num(r.contribution, 2)}%</div>
    }
  ];

  // Fix 2: Group holdingsWithRisk by riskBand
  const riskBreakdownMap = {
    High: 0,
    Elevated: 0,
    Moderate: 0,
    Low: 0
  };
  
  holdingsWithRisk.forEach(h => {
    if (riskBreakdownMap[h.riskBand as keyof typeof riskBreakdownMap] !== undefined) {
      riskBreakdownMap[h.riskBand as keyof typeof riskBreakdownMap] += h.weight;
    }
  });

  const riskBreakdown = [
    { label: 'High', value: Number(riskBreakdownMap.High.toFixed(1)), color: riskBandColorHex('High') },
    { label: 'Elevated', value: Number(riskBreakdownMap.Elevated.toFixed(1)), color: riskBandColorHex('Elevated') },
    { label: 'Moderate', value: Number(riskBreakdownMap.Moderate.toFixed(1)), color: riskBandColorHex('Moderate') },
    { label: 'Low', value: Number(riskBreakdownMap.Low.toFixed(1)), color: riskBandColorHex('Low') }
  ];

  // Fix 3: Compute Overall Risk band based on highest weight
  let maxWeight = -1;
  let overallRiskBand: RiskBand = 'Moderate';
  Object.entries(riskBreakdownMap).forEach(([band, weight]) => {
    if (weight > maxWeight) {
      maxWeight = weight;
      overallRiskBand = band as RiskBand;
    }
  });

  // Determine tone for Overall Risk text
  const overallRiskTone = riskBandColor(overallRiskBand);
  const overallRiskTextColor = 
    overallRiskTone === 'neg' ? 'text-neg' :
    overallRiskTone === 'warn' ? 'text-warn' :
    overallRiskTone === 'pos' ? 'text-pos' : 'text-info';

  // Fix 3: Compute real HHI
  const hhiValue = holdingsWithRisk.reduce((acc, h) => acc + Math.pow(h.weight / 100, 2), 0);
  const hhiRounded = hhiValue.toFixed(2);
  let hhiText = 'Moderate portfolio concentration';
  if (hhiValue < 0.15) hhiText = 'Low portfolio concentration';
  else if (hhiValue > 0.25) hhiText = 'High portfolio concentration';

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Analytics', to: '/app/analytics' },
          { label: 'Risk analysis' }
        ]}
        title="Risk analysis"
        subtitle="Portfolio-level risk metrics, concentration, and VaR breakdown."
      />
      
      <PageBody className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="p-5 flex flex-col justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-4">Overall Risk</div>
            <div>
              <div className={`text-3xl font-bold mb-1 ${overallRiskTextColor}`}>{overallRiskBand}</div>
              <p className="text-sm text-ink-2">Driven by largest portfolio allocation</p>
            </div>
          </Card>
          <Card className="p-5 flex flex-col justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-4">Volatility Proxy (1Y)</div>
            <div>
              <div className="text-3xl font-bold text-ink mb-1">{pct(portfolioSummary.volatility || 14.5, 1)}</div>
              <p className="text-sm text-ink-2">Annualized standard deviation</p>
            </div>
          </Card>
          <Card className="p-5 flex flex-col justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3 mb-4">Concentration (HHI)</div>
            <div>
              <div className="text-3xl font-bold text-ink mb-1">{hhiRounded}</div>
              <p className="text-sm text-ink-2">{hhiText}</p>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Country Risk Exposure" subtitle="Allocation by sovereign risk band" />
            <div className="p-5">
              <BarSeries
                data={riskBreakdown}
                xKey="label"
                series={[{ key: 'value', label: 'Weight %' }]}
                layout="horizontal"
                height={260}
                formatter={(v) => `${v}%`}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Historical Drawdown" subtitle="Portfolio decline from running peak" />
            <div className="p-5">
              {loading ? (
                <div className="h-[260px] w-full animate-pulse bg-subtle rounded"></div>
              ) : (
                <AreaSeries
                  data={drawdownSeries}
                  xKey="date"
                  series={[{ key: 'drawdown', label: 'Drawdown %', color: '#C2372C' }]}
                  height={260}
                  formatter={(v) => `${Number(v).toFixed(2)}%`}
                />
              )}
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader title="Holdings Risk Analysis" subtitle="Individual instrument contribution to portfolio risk" />
          <div className="border-t border-line">
            <DataTable
              columns={columns}
              rows={holdingsWithRisk}
              rowKey={(r) => r.id}
              loading={loading}
            />
          </div>
        </Card>
      </PageBody>
    </>
  );
}
