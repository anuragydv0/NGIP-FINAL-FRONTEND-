import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import { cx } from '../../utils/format';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: string;
  sortable?: boolean;
  sortValue?: (row: T) => number | string;
  render: (row: T, index: number) => React.ReactNode;
  hideBelow?: 'sm' | 'md' | 'lg' | 'xl';
}

export type Density = 'compact' | 'comfortable';

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  density?: Density;
  onRowClick?: (row: T) => void;
  selectedKeys?: string[];
  onToggleRow?: (key: string) => void;
  stickyHeader?: boolean;
  emptyState?: React.ReactNode;
  loading?: boolean;
  className?: string;
  maxHeight?: string;
  defaultSort?: {key: string;dir: 'asc' | 'desc';};
  stackedOnMobile?: boolean;
}

const hideMap: Record<string, string> = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
  lg: 'hidden lg:table-cell',
  xl: 'hidden xl:table-cell'
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  density = 'comfortable',
  onRowClick,
  selectedKeys,
  onToggleRow,
  stickyHeader = true,
  emptyState,
  loading,
  className,
  maxHeight,
  defaultSort,
  stackedOnMobile = true
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<{key: string;dir: 'asc' | 'desc';} | null>(
    defaultSort ?? null
  );

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp =
      typeof av === 'number' && typeof bv === 'number' ?
      av - bv :
      String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort, columns]);

  const cellPad = density === 'compact' ? 'px-3 py-1.5' : 'px-3.5 py-2.5';
  const textSize = density === 'compact' ? 'text-xs' : 'text-[13px]';

  if (loading) {
    return (
      <div className="divide-y divide-line">
        {Array.from({ length: 8 }).map((_, i) =>
        <div key={i} className="flex items-center gap-4 px-3.5 py-3">
            <div className="h-3 w-1/4 animate-pulse rounded bg-ink/[0.06]" />
            <div className="h-3 w-1/6 animate-pulse rounded bg-ink/[0.06]" />
            <div className="ml-auto h-3 w-16 animate-pulse rounded bg-ink/[0.06]" />
          </div>
        )}
      </div>);

  }

  if (!rows.length && emptyState) return <>{emptyState}</>;

  return (
    <div
      className={cx('ngip-scroll overflow-auto', className)}
      style={maxHeight ? { maxHeight } : undefined}>
      
      <table className={cx("w-full border-collapse", stackedOnMobile && "block md:table")}>
        <thead
          className={cx(
            'bg-subtle',
            stickyHeader && 'sticky top-0 z-10',
            stackedOnMobile && "hidden md:table-header-group"
          )}>
          
          <tr className="border-b border-line">
            {onToggleRow &&
            <th className="w-9 px-3 py-2" scope="col">
                <span className="sr-only">Select</span>
              </th>
            }
            {columns.map((col) => {
              const isSorted = sort?.key === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className={cx(
                    'whitespace-nowrap px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3',
                    col.align === 'right' ?
                    'text-right' :
                    col.align === 'center' ?
                    'text-center' :
                    'text-left',
                    col.hideBelow && hideMap[col.hideBelow]
                  )}>
                  
                  {col.sortable ?
                  <button
                    type="button"
                    onClick={() =>
                    setSort((s) =>
                    s?.key === col.key ?
                    { key: col.key, dir: s.dir === 'asc' ? 'desc' : 'asc' } :
                    { key: col.key, dir: 'desc' }
                    )
                    }
                    className={cx(
                      'inline-flex items-center gap-1 transition-colors duration-150 ease-swift hover:text-ink',
                      col.align === 'right' && 'flex-row-reverse',
                      isSorted && 'text-ink'
                    )}>
                    
                      {col.header}
                      {isSorted ?
                    sort!.dir === 'asc' ?
                    <ChevronUpIcon className="h-3 w-3" /> :

                    <ChevronDownIcon className="h-3 w-3" /> :


                    <ChevronsUpDownIcon className="h-3 w-3 opacity-40" />
                    }
                    </button> :

                  col.header
                  }
                </th>);

            })}
          </tr>
        </thead>
        <tbody className={cx("divide-y divide-line", stackedOnMobile && "block md:table-row-group")}>
          {sorted.map((row, i) => {
            const key = rowKey(row);
            const selected = selectedKeys?.includes(key);
            return (
              <tr
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cx(
                  'transition-colors duration-100 ease-swift',
                  onRowClick && 'cursor-pointer',
                  selected ? 'bg-accent-soft/60' : 'hover:bg-subtle',
                  stackedOnMobile && 'block md:table-row p-3 md:p-0 mb-3 md:mb-0 border border-line md:border-0 rounded-lg md:rounded-none bg-surface md:bg-transparent last:mb-0'
                )}>
                
                {onToggleRow &&
                <td className={cx(cellPad, 'w-9', stackedOnMobile && 'md:table-cell')} onClick={(e) => e.stopPropagation()}>
                    <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={() => onToggleRow(key)}
                    aria-label="Select row"
                    className="h-3.5 w-3.5 rounded border-line-strong text-accent focus:ring-accent/30" />
                  
                  </td>
                }
                {columns.map((col) =>
                <td
                  key={col.key}
                  className={cx(
                    cellPad,
                    textSize,
                    'text-ink',
                    col.align === 'right' ?
                    'text-right' :
                    col.align === 'center' ?
                    'text-center' :
                    'text-left',
                    col.hideBelow && hideMap[col.hideBelow],
                    stackedOnMobile && 'flex items-center justify-between md:table-cell border-b border-line/50 md:border-b-0 last:border-b-0 px-1 py-1.5 md:py-2.5 md:px-3.5'
                  )}>
                  
                    {stackedOnMobile && (
                      <span className="md:hidden text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                        {col.header}
                      </span>
                    )}
                    <span className={cx(stackedOnMobile && "text-right md:text-left")}>
                      {col.render(row, i)}
                    </span>
                  </td>
                )}
              </tr>);

          })}
        </tbody>
      </table>
    </div>);

}

export function DensityToggle({
  density,
  onChange
}: {density: Density;onChange: (d: Density) => void;}) {
  return (
    <div className="inline-flex rounded-full bg-ink/[0.06] p-1 shadow-inner">
      {(['comfortable', 'compact'] as Density[]).map((d) =>
      <button
        key={d}
        type="button"
        onClick={() => onChange(d)}
        className={cx(
          'rounded-full px-2.5 py-1 text-[11px] font-medium capitalize transition-all duration-200 ease-swift',
          density === d ? 'bg-surface text-ink shadow-sm ring-1 ring-ink/[0.04]' : 'text-ink-3 hover:text-ink hover:bg-ink/[0.02]'
        )}>
        
          {d}
        </button>
      )}
    </div>);
}