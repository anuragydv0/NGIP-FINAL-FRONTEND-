export function inr(value: number, fraction = 2): string {
  const neg = value < 0;
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString('en-IN', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction
  });
  return `${neg ? '-' : ''}₹${formatted}`;
}

export function signedInr(value: number, fraction = 2): string {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}₹${Math.abs(value).toLocaleString('en-IN', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction
  })}`;
}

export function pct(value: number, fraction = 2): string {
  return `${value.toFixed(fraction)}%`;
}

export function signedPct(value: number, fraction = 2): string {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(fraction)}%`;
}

export function compact(value: number): string {
  if (Math.abs(value) >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (Math.abs(value) >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (Math.abs(value) >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (Math.abs(value) >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toFixed(0);
}

export function num(value: number, fraction = 2): string {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction
  });
}

export function toneOf(value: number): 'pos' | 'neg' | 'flat' {
  if (value > 0) return 'pos';
  if (value < 0) return 'neg';
  return 'flat';
}

export function toneClass(value: number): string {
  if (value > 0) return 'text-pos';
  if (value < 0) return 'text-neg';
  return 'text-ink-3';
}

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}