import React, { useState, useEffect } from 'react';
import { PageBody, PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { generatePortfolioAnalysis } from '../data/aiResponses';
import { RefreshCwIcon, SparklesIcon, CheckCircle2Icon, AlertCircleIcon, TrendingUpIcon } from 'lucide-react';
import { cx } from '../utils/format';

export function AIPortfolioAnalyst() {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<{ summary: string; observations: string[]; suggestions: string[] } | null>(null);

  const runAnalysis = () => {
    setLoading(true);
    // Simulated thinking delay
    setTimeout(() => {
      setAnalysis(generatePortfolioAnalysis());
      setLoading(false);
    }, 1200 + Math.random() * 500);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  return (
    <>
      <PageHeader
        title="AI Portfolio Analyst"
        subtitle="Ask why the portfolio moved and where exposure is unbalanced."
        actions={
          <Button variant="secondary" onClick={runAnalysis} disabled={loading}>
            <RefreshCwIcon className={cx('mr-2 h-4 w-4', loading && 'animate-spin')} />
            Regenerate analysis
          </Button>
        }
      />
      
      <PageBody className="max-w-4xl space-y-6">
        {loading || !analysis ? (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-5 w-5 animate-pulse rounded-full bg-line-strong" />
                <div className="h-5 w-48 animate-pulse rounded-md bg-line-strong" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded-md bg-subtle" />
                <div className="h-4 w-[90%] animate-pulse rounded-md bg-subtle" />
                <div className="h-4 w-[60%] animate-pulse rounded-md bg-subtle" />
              </div>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6 h-48 animate-pulse bg-subtle" />
              <Card className="p-6 h-48 animate-pulse bg-subtle" />
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Summary Section */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="h-5 w-5 text-accent" />
                <h3 className="text-[14px] font-semibold text-ink">Executive Summary</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap">
                {analysis.summary}
              </p>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Key Observations */}
              <Card className="flex flex-col">
                <div className="border-b border-line px-5 py-4">
                  <div className="flex items-center gap-2">
                    <AlertCircleIcon className="h-4 w-4 text-warn" />
                    <h3 className="text-[13px] font-medium text-ink">Key Observations</h3>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <ul className="space-y-4">
                    {analysis.observations.map((obs, i) => (
                      <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-ink-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-4" />
                        <span dangerouslySetInnerHTML={{ __html: obs.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-ink">$1</span>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Suggested Actions */}
              <Card className="flex flex-col bg-subtle">
                <div className="border-b border-line px-5 py-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="h-4 w-4 text-pos" />
                    <h3 className="text-[13px] font-medium text-ink">Suggested Actions</h3>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <ul className="space-y-4">
                    {analysis.suggestions.map((sug, i) => (
                      <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-ink-2">
                        <TrendingUpIcon className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="text-center">
              <span className="text-[11px] text-ink-4">AI-generated analysis based on your current holdings. Not financial advice.</span>
            </div>
          </div>
        )}
      </PageBody>
    </>
  );
}
