import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cx } from '../../utils/format';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-line last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
      >
        <span className="text-[13px] font-medium text-ink">{title}</span>
        <ChevronDownIcon
          className={cx(
            'h-4 w-4 text-ink-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-4 pr-6 text-[13px] leading-relaxed text-ink-2">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx('flex flex-col', className)}>{children}</div>;
}
