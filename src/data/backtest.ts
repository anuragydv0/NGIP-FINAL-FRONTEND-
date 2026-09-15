import { BacktestResult } from '../types';

function makeBacktestTrend(seed: number, baseReturn: number, len = 36): { strategy: number, benchmark: number }[] {
  const out = [];
  let strat = 1000000;
  let bench = 1000000;
  
  for (let i = 0; i < len; i++) {
    const driftS = (seed * (i + 1) * 17 % 100 / 100 - 0.40) * 0.08; 
    const driftB = (seed * (i + 2) * 23 % 100 / 100 - 0.42) * 0.06;
    
    strat *= 1 + (baseReturn / 12) + driftS;
    bench *= 1 + (baseReturn / 12) - 0.005 + driftB;
    
    out.push({
      strategy: Math.round(strat),
      benchmark: Math.round(bench)
    });
  }
  return out;
}

export function generateMockBacktest(strategyId: string): BacktestResult {
  const seed = strategyId.length * 42;
  const len = 36;
  const startYear = 2023;
  const startMonth = 9;

  const rawSeries = makeBacktestTrend(seed, 0.12, len);
  
  const series = rawSeries.map((s, i) => {
    let m = startMonth + i;
    let y = startYear;
    while(m > 12) {
      m -= 12;
      y++;
    }
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return {
      date: `${months[m-1]} ${y}`,
      strategy: s.strategy,
      benchmark: s.benchmark
    };
  });
  
  const periodReturns = [];
  for (let i = 1; i < len; i += 3) {
    const sRet = (series[i].strategy - series[i-1].strategy) / series[i-1].strategy;
    const bRet = (series[i].benchmark - series[i-1].benchmark) / series[i-1].benchmark;
    periodReturns.push({
      period: series[i].date,
      strategyReturn: sRet,
      benchmarkReturn: bRet
    });
  }

  const finalS = series[len-1].strategy;
  const cagr = Math.pow(finalS / 1000000, 1 / (len/12)) - 1;

  let maxDrawdown = 0;
  let peak = 1000000;
  for (const s of series) {
    if (s.strategy > peak) peak = s.strategy;
    const dd = (peak - s.strategy) / peak;
    if (dd > maxDrawdown) maxDrawdown = dd;
  }
  
  return {
    strategyId,
    startDate: series[0].date,
    endDate: series[len-1].date,
    cagr: cagr * 100,
    sharpeRatio: 1.45 + (seed % 10) / 10,
    maxDrawdown: maxDrawdown * 100,
    xirr: (cagr + 0.02) * 100,
    series,
    periodReturns
  };
}
