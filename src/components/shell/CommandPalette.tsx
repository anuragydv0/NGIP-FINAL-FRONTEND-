import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CornerDownLeftIcon, SearchIcon } from 'lucide-react';
import { countries } from '../../data/countries';
import { instruments } from '../../data/instruments';
import { commandGroups } from './navigation';
import { cx } from '../../utils/format';

interface Entry {
  id: string;
  label: string;
  hint: string;
  group: string;
  to: string;
  glyph?: string;
}

export function CommandPalette({
  open,
  onClose



}: {open: boolean;onClose: () => void;}) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);

  const entries = React.useMemo<Entry[]>(() => {
    const nav: Entry[] = commandGroups.flatMap((g) =>
    g.items.map((i) => ({
      id: `${g.label}-${i.to}-${i.label}`,
      label: i.label,
      hint: g.label === 'Navigate' ? 'Page' : 'Action',
      group: g.label,
      to: i.to
    }))
    );
    const countryEntries: Entry[] = countries.map((c) => ({
      id: `c-${c.id}`,
      label: c.name,
      hint: `CGI ${c.cgi.toFixed(1)} · ${c.region}`,
      group: 'Countries',
      to: `/app/countries/${c.id}`,
      glyph: c.flag
    }));
    const instrumentEntries: Entry[] = instruments.map((i) => ({
      id: `i-${i.id}`,
      label: `${i.symbol} — ${i.name}`,
      hint: `${i.type} · ${i.country}`,
      group: 'Instruments',
      to: `/app/instruments/${i.id}`,
      glyph: i.flag
    }));
    return [...nav, ...countryEntries, ...instrumentEntries];
  }, []);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ?
    entries.filter(
      (e) =>
      e.label.toLowerCase().includes(q) ||
      e.hint.toLowerCase().includes(q)
    ) :
    entries.filter((e) => e.group === 'Navigate' || e.group === 'Actions');
    return filtered.slice(0, 24);
  }, [query, entries]);

  React.useEffect(() => {
    setActive(0);
  }, [query]);

  React.useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(results.length - 1, a + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
      if (e.key === 'Enter' && results[active]) {
        navigate(results[active].to);
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, active, navigate, onClose]);

  const grouped = results.reduce<Record<string, Entry[]>>((acc, e) => {
    acc[e.group] = acc[e.group] ? [...acc[e.group], e] : [e];
    return acc;
  }, {});

  let cursor = -1;

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/45" />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.99 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
          
            <div className="flex items-center gap-2.5 border-b border-line px-4">
              <SearchIcon className="h-4 w-4 text-ink-4" />
              <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries, instruments, indicators, news…"
              className="h-12 w-full bg-transparent text-[13px] text-ink placeholder:text-ink-4 focus:outline-none" />
            
              <kbd className="rounded border border-line-strong px-1.5 py-0.5 text-[10px] font-medium text-ink-4">
                ESC
              </kbd>
            </div>
            <div className="ngip-scroll max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 &&
            <p className="px-4 py-8 text-center text-[13px] text-ink-3">
                  No results for “{query}”
                </p>
            }
              {Object.entries(grouped).map(([group, items]) =>
            <div key={group} className="mb-1">
                  <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-4">
                    {group}
                  </p>
                  {items.map((e) => {
                cursor += 1;
                const isActive = cursor === active;
                return (
                  <button
                    key={e.id}
                    onMouseEnter={() => setActive(entries.length ? results.indexOf(e) : 0)}
                    onClick={() => {
                      navigate(e.to);
                      onClose();
                    }}
                    className={cx(
                      'flex w-full items-center gap-3 px-4 py-2 text-left transition-colors duration-100 ease-swift',
                      isActive ? 'bg-accent-soft' : 'hover:bg-subtle'
                    )}>
                    
                        <span className="w-5 text-center text-sm" aria-hidden>
                          {e.glyph ?? '›'}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium text-ink">
                            {e.label}
                          </span>
                          <span className="block truncate text-[11px] text-ink-3">
                            {e.hint}
                          </span>
                        </span>
                        {isActive &&
                    <CornerDownLeftIcon className="h-3.5 w-3.5 text-accent" />
                    }
                      </button>);

              })}
                </div>
            )}
            </div>
            <div className="flex items-center justify-between border-t border-line bg-subtle px-4 py-2 text-[11px] text-ink-4">
              <span>↑↓ to navigate · ↵ to open</span>
              <span>NGIP Command</span>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}