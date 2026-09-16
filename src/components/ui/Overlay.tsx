import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { cx } from '../../utils/format';
import { IconButton } from './Button';

function useEscape(open: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md'








}: {open: boolean;onClose: () => void;title: string;description?: string;children: React.ReactNode;footer?: React.ReactNode;size?: 'sm' | 'md' | 'lg';}) {
  useEscape(open, onClose);
  const width = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-3xl' }[size];
  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className={cx(
            'relative w-full rounded-2xl border border-line bg-surface/90 backdrop-blur-2xl shadow-pop',
            width
          )}>
          
            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5">
              <div>
                <h2 className="text-sm font-semibold text-ink">{title}</h2>
                {description &&
              <p className="mt-0.5 text-xs text-ink-3">{description}</p>
              }
              </div>
              <IconButton label="Close" onClick={onClose}>
                <XIcon className="h-4 w-4" />
              </IconButton>
            </header>
            <div className="ngip-scroll max-h-[70vh] overflow-y-auto px-5 py-4">
              {children}
            </div>
            {footer &&
          <footer className="flex items-center justify-end gap-2 border-t border-line bg-subtle px-5 py-3">
                {footer}
              </footer>
          }
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'w-full max-w-[440px]',
  side = 'right'









}: {open: boolean;onClose: () => void;title: string;subtitle?: React.ReactNode;children: React.ReactNode;footer?: React.ReactNode;width?: string;side?: 'right' | 'left' | 'bottom';}) {
  useEscape(open, onClose);
  const isBottom = side === 'bottom';
  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={
          isBottom ?
          { y: '100%' } :
          { x: side === 'right' ? '100%' : '-100%' }
          }
          animate={isBottom ? { y: 0 } : { x: 0 }}
          exit={
          isBottom ?
          { y: '100%' } :
          { x: side === 'right' ? '100%' : '-100%' }
          }
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          className={cx(
            'absolute flex flex-col bg-surface/90 backdrop-blur-2xl shadow-pop',
            isBottom ?
            'inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl border-t border-line' :
            cx(
              'inset-y-0 border-line',
              side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
              width
            )
          )}>
          
            {isBottom &&
          <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-ink/15" />
          }
            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-ink">{title}</h2>
                {subtitle &&
              <div className="mt-0.5 text-xs text-ink-3">{subtitle}</div>
              }
              </div>
              <IconButton label="Close" onClick={onClose}>
                <XIcon className="h-4 w-4" />
              </IconButton>
            </header>
            <div className="ngip-scroll flex-1 overflow-y-auto px-5 py-4">
              {children}
            </div>
            {footer &&
          <footer className="border-t border-line bg-subtle px-5 py-3">
                {footer}
              </footer>
          }
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}

export function Tooltip({
  content,
  children,
  side = 'top'




}: {content: React.ReactNode;children: React.ReactNode;side?: 'top' | 'bottom';}) {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}>
      
      {children}
      <AnimatePresence>
        {open &&
        <motion.span
          role="tooltip"
          initial={{ opacity: 0, y: side === 'top' ? 4 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
          className={cx(
            'pointer-events-none absolute left-1/2 z-50 w-max max-w-[240px] -translate-x-1/2 rounded-md bg-ink/90 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-medium leading-relaxed text-surface shadow-pop',
            side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          )}>
          
            {content}
          </motion.span>
        }
      </AnimatePresence>
    </span>);

}

export function Popover({
  trigger,
  children,
  align = 'right',
  width = 'w-64'





}: {trigger: (props: {open: boolean;toggle: () => void;}) => React.ReactNode;children: React.ReactNode | ((close: () => void) => React.ReactNode);align?: 'left' | 'right';width?: string;}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -2, scale: 0.99 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className={cx(
            'absolute z-40 mt-2 origin-top rounded-xl border border-line bg-surface/90 backdrop-blur-2xl p-1.5 shadow-pop',
            align === 'right' ? 'right-0' : 'left-0',
            width
          )}>
          
            {typeof children === 'function' ?
          (children as (close: () => void) => React.ReactNode)(() =>
          setOpen(false)
          ) :
          children}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

export function MenuItem({
  icon,
  children,
  onClick,
  tone





}: {icon?: React.ReactNode;children: React.ReactNode;onClick?: () => void;tone?: 'danger';}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-left text-[13px] transition-colors duration-150 ease-swift hover:bg-ink/[0.05]',
        tone === 'danger' ? 'text-neg' : 'text-ink-2 hover:text-ink'
      )}>
      
      {icon}
      {children}
    </button>);

}