import React, { createContext, useContext, useEffect, useState } from 'react';
import { instruments } from '../data/instruments';
import { countries } from '../data/countries';
import { cx } from '../utils/format';
import { num } from '../utils/format';

type LiveState = {
  price: number;
  flash: 'up' | 'down' | null;
};

interface LiveData {
  instruments: Record<string, LiveState>;
  countries: Record<string, LiveState>;
}

const LiveDataContext = createContext<LiveData | null>(null);

export function LiveDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<LiveData>(() => {
    const inst = {} as Record<string, LiveState>;
    instruments.forEach(i => {
      inst[i.id] = { price: i.price, flash: null };
    });
    const ctry = {} as Record<string, LiveState>;
    countries.forEach(c => {
      ctry[c.id] = { price: c.cgi, flash: null };
    });
    return { instruments: inst, countries: ctry };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const nextInst = { ...prev.instruments };
        const nextCtry = { ...prev.countries };
        
        let changed = false;

        // Tweak 3-6 random instruments
        const numInst = Math.floor(Math.random() * 4) + 3;
        for (let i = 0; i < numInst; i++) {
          const keys = Object.keys(nextInst);
          const key = keys[Math.floor(Math.random() * keys.length)];
          const current = nextInst[key].price;
          // random change between -0.3% and +0.3%
          const change = current * (Math.random() * 0.006 - 0.003);
          const newPrice = Number((current + change).toFixed(2));
          if (newPrice !== current) {
             nextInst[key] = {
               price: newPrice,
               flash: newPrice > current ? 'up' : 'down'
             };
             changed = true;
          }
        }

        // Tweak 2-4 random countries (CGI)
        const numCtry = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numCtry; i++) {
          const keys = Object.keys(nextCtry);
          const key = keys[Math.floor(Math.random() * keys.length)];
          const current = nextCtry[key].price;
          // random change -0.1 to +0.1
          const change = (Math.random() * 0.2 - 0.1);
          const newCGI = Number((current + change).toFixed(1));
          if (newCGI !== current) {
             nextCtry[key] = {
               price: newCGI,
               flash: newCGI > current ? 'up' : 'down'
             };
             changed = true;
          }
        }
        
        return changed ? { instruments: nextInst, countries: nextCtry } : prev;
      });
    }, 2500);

    // Clear flashes slightly before next update to allow CSS transitions
    const clearInt = setInterval(() => {
       setData(prev => {
          let changed = false;
          const nextInst = { ...prev.instruments };
          for (const k in nextInst) {
             if (nextInst[k].flash !== null) {
                nextInst[k] = { ...nextInst[k], flash: null };
                changed = true;
             }
          }
          const nextCtry = { ...prev.countries };
          for (const k in nextCtry) {
             if (nextCtry[k].flash !== null) {
                nextCtry[k] = { ...nextCtry[k], flash: null };
                changed = true;
             }
          }
          return changed ? { instruments: nextInst, countries: nextCtry } : prev;
       });
    }, 2200);

    return () => {
       clearInterval(interval);
       clearInterval(clearInt);
    };
  }, []);

  return (
    <LiveDataContext.Provider value={data}>
      {children}
    </LiveDataContext.Provider>
  );
}

// Custom hook to consume instrument data
export function useLiveInstrument(id: string) {
  const ctx = useContext(LiveDataContext);
  return ctx?.instruments[id] || { price: 0, flash: null };
}

// Custom hook to consume country CGI data
export function useLiveCountry(id: string) {
  const ctx = useContext(LiveDataContext);
  return ctx?.countries[id] || { price: 0, flash: null };
}

// Ready-to-use tiny component for rendering blinking cells efficiently
export function LiveCell({ 
  type, 
  id, 
  fallback, 
  prefix = '', 
  suffix = '',
  precision = 2
}: { 
  type: 'instrument' | 'country', 
  id: string, 
  fallback: number, 
  prefix?: string, 
  suffix?: string,
  precision?: number
}) {
  const ctx = useContext(LiveDataContext);
  const data = type === 'instrument' ? ctx?.instruments[id] : ctx?.countries[id];
  const price = data?.price || fallback;
  const flash = data?.flash || null;

  return (
    <span 
      className={cx(
        'num font-medium tabular-nums px-1.5 py-0.5 -mr-1.5 rounded transition-colors duration-500 ease-out',
        flash === 'up' ? 'bg-pos/20 text-pos' : 
        flash === 'down' ? 'bg-neg/20 text-neg' : 
        'bg-transparent text-ink'
      )}
    >
      {prefix}{num(price, precision)}{suffix}
    </span>
  );
}
