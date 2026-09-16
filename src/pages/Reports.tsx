import React, { useState } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/Table';
import { useToast } from '../components/ui/Toast';
import { FileTextIcon, DownloadIcon } from 'lucide-react';
import { mockReportsList } from '../data/reports';
import { ReportItem } from '../types';
import { holdings } from '../data/portfolio';
import { formatRelativeTime, inr, cx, pct } from '../utils/format';

const REPORT_TYPES = [
  {
    id: 'portfolio-perf',
    name: 'Portfolio Performance Summary',
    description: 'A comprehensive view of all current holdings, weightings, and cumulative returns.'
  },
  {
    id: 'tax-statement',
    name: 'Tax Statement (Capital Gains)',
    description: 'Realized gains and losses calculated for tax reporting purposes.'
  },
  {
    id: 'country-exposure',
    name: 'Country Exposure Report',
    description: 'Detailed breakdown of portfolio allocation grouped by geographic region and risk band.'
  }
];

export function Reports() {
  const { addToast } = useToast();
  const [selectedReport, setSelectedReport] = useState(REPORT_TYPES[0].id);
  const [generating, setGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setPreviewData(null);
    
    // Simulate generation delay
    setTimeout(() => {
      setGenerating(false);
      setPreviewData(holdings);
      addToast({ title: 'Report generated', tone: 'pos' });
    }, 1200);
  };

  const handleDownload = () => {
    addToast({ title: 'PDF export coming soon', message: 'The PDF generation service is currently offline.', tone: 'info' });
  };

  const historyColumns = [
    {
      key: 'name',
      header: 'Report Name',
      render: (r: ReportItem) => (
        <div className="flex items-center gap-3">
          <FileTextIcon className="h-4 w-4 text-ink-3" />
          <span className="text-[13px] font-medium text-ink">{r.name}</span>
        </div>
      )
    },
    {
      key: 'generated',
      header: 'Generated',
      render: (r: ReportItem) => (
        <span className="text-[13px] text-ink-2">{new Date(r.generatedAt).toLocaleDateString()}</span>
      )
    },
    {
      key: 'size',
      header: 'Size',
      render: (r: ReportItem) => (
        <span className="text-[13px] text-ink-3">{r.size}</span>
      ),
      align: 'right' as const
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <Button variant="ghost" onClick={handleDownload}>
          <DownloadIcon className="h-4 w-4" />
        </Button>
      ),
      align: 'right' as const
    }
  ];

  const previewColumns = [
    {
      key: 'holding',
      header: 'Holding',
      render: (h: any) => (
        <div>
          <p className="text-[13px] font-medium text-ink">{h.symbol}</p>
          <p className="text-xs text-ink-3">{h.name}</p>
        </div>
      )
    },
    {
      key: 'weight',
      header: 'Weight',
      render: (h: any) => <span className="text-[13px] text-ink">{pct(h.weight)}</span>,
      align: 'right' as const
    },
    {
      key: 'invested',
      header: 'Invested',
      render: (h: any) => <span className="text-[13px] text-ink-2">{inr(h.invested, 0)}</span>,
      align: 'right' as const
    },
    {
      key: 'value',
      header: 'Current Value',
      render: (h: any) => <span className="text-[13px] font-medium text-ink">{inr(h.value, 0)}</span>,
      align: 'right' as const
    },
    {
      key: 'return',
      header: 'Return',
      render: (h: any) => (
        <span className={cx('text-[13px] font-medium', h.returnPct >= 0 ? 'text-pos' : 'text-neg')}>
          {h.returnPct >= 0 ? '+' : ''}{pct(h.returnPct)}
        </span>
      ),
      align: 'right' as const
    }
  ];

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Generate, view and download portfolio, country, risk and tax reports."
      />
      <PageBody className="max-w-5xl space-y-8">
        
        {/* Report Generation Section */}
        <section className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-ink">Available Reports</h3>
            <div className="grid gap-3">
              {REPORT_TYPES.map(type => (
                <div 
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={cx(
                    'cursor-pointer rounded-md border p-4 transition-colors',
                    selectedReport === type.id 
                      ? 'border-accent bg-accent/5' 
                      : 'border-line bg-surface hover:border-line-strong'
                  )}
                >
                  <p className="text-[13px] font-medium text-ink">{type.name}</p>
                  <p className="mt-1 text-xs text-ink-3">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="flex flex-col h-fit">
            <div className="border-b border-line px-5 py-4">
              <h3 className="text-[13px] font-medium text-ink">Configuration</h3>
            </div>
            <div className="p-5 space-y-6">
              <div>
                <p className="text-xs font-medium text-ink-2 mb-2">Date Range</p>
                <select className="w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-[13px] text-ink focus:border-accent focus:outline-none">
                  <option>Year to Date (YTD)</option>
                  <option>Last 12 Months</option>
                  <option>Last Quarter</option>
                  <option>Custom Range...</option>
                </select>
              </div>
              <Button 
                variant="primary" 
                className="w-full justify-center" 
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </Card>
        </section>

        {/* Report Preview */}
        {generating ? (
          <Card className="p-12 flex flex-col items-center justify-center space-y-4 bg-subtle">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <p className="text-[13px] text-ink-2">Compiling data...</p>
          </Card>
        ) : previewData ? (
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line px-5 py-4 gap-4">
              <div>
                <h3 className="text-[14px] font-semibold text-ink">
                  {REPORT_TYPES.find(t => t.id === selectedReport)?.name}
                </h3>
                <p className="text-xs text-ink-3 mt-1">Generated {formatRelativeTime(Date.now())}</p>
              </div>
              <Button variant="secondary" onClick={handleDownload}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
            {selectedReport === 'portfolio-perf' ? (
              <DataTable rows={previewData || []} columns={previewColumns} rowKey={(h) => h.id} />
            ) : (
              <div className="p-12 text-center">
                <p className="text-[13px] text-ink-3">Preview mock data not available for this report type. Select "Portfolio Performance Summary".</p>
              </div>
            )}
          </Card>
        ) : null}

        {/* History */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-ink">Recent Reports</h3>
          <Card>
            <DataTable rows={mockReportsList} columns={historyColumns} rowKey={(r) => r.id} />
          </Card>
        </section>

      </PageBody>
    </>
  );
}
