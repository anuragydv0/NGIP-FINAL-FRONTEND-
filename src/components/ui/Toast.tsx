import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  XIcon } from
'lucide-react';
import { cx } from '../../utils/format';

type ToastTone = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  push: (t: Omit<Toast, 'id'>) => void;
}

const ToastContext = React.createContext<ToastContextValue>({ push: () => {} });

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastProvider({ children }: {children: React.ReactNode;}) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const push = React.useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list, { ...t, id }]);
    window.setTimeout(
      () => setToasts((list) => list.filter((x) => x.id !== id)),
      4200
    );
  }, []);

  const dismiss = (id: number) =>
  setToasts((list) => list.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[340px] flex-col gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) =>
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto flex gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-pop">
            
              <span
              className={cx(
                'mt-0.5 shrink-0',
                t.tone === 'success' ?
                'text-pos' :
                t.tone === 'error' ?
                'text-neg' :
                'text-info'
              )}>
              
                {t.tone === 'success' ?
              <CheckCircle2Icon className="h-4 w-4" /> :
              t.tone === 'error' ?
              <AlertTriangleIcon className="h-4 w-4" /> :

              <InfoIcon className="h-4 w-4" />
              }
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{t.title}</p>
                {t.description &&
              <p className="mt-0.5 text-xs leading-relaxed text-ink-3">
                    {t.description}
                  </p>
              }
              </div>
              <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="shrink-0 text-ink-4 transition-colors duration-150 ease-swift hover:text-ink">
              
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>);

}