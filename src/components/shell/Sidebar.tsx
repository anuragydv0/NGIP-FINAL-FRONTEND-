import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ArrowLeftRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ShieldCheckIcon } from
'lucide-react';
import { cx } from '../../utils/format';
import { useUser } from '../../contexts/UserContext';
import { adminNav, appNav, NavSection } from './navigation';
import { Tooltip } from '../ui/Overlay';

function NavRow({
  item,
  collapsed



}: {item: NavSection['items'][number];collapsed: boolean;}) {
  const Icon = item.icon;
  const content =
  <NavLink
    to={item.to}
    className={({ isActive }) =>
    cx(
      'group relative flex items-center gap-2.5 rounded-md text-[13px] font-medium',
      'transition-[background-color,color] duration-150 ease-swift',
      collapsed ? 'h-8 w-8 justify-center' : 'h-8 px-2.5',
      isActive ?
      'bg-accent-soft text-accent' :
      'text-ink-2 hover:bg-ink/[0.04] hover:text-ink'
    )
    }>
    
      {({ isActive }) =>
    <>
          {isActive && !collapsed &&
      <span className="absolute -left-2 top-1.5 h-5 w-[2px] rounded-full bg-accent" />
      }
          <Icon className="h-4 w-4 shrink-0" strokeWidth={1.9} />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {!collapsed && item.badge &&
      <span
        className={cx(
          'num ml-auto rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
          isActive ? 'bg-accent text-surface' : 'bg-ink/[0.06] text-ink-3'
        )}>
        
              {item.badge}
            </span>
      }
        </>
    }
    </NavLink>;


  if (collapsed) {
    return (
      <Tooltip content={item.label} side="bottom">
        {content}
      </Tooltip>);

  }
  return content;
}

export function SidebarNav({
  sections,
  collapsed



}: {sections: NavSection[];collapsed: boolean;}) {
  return (
    <nav className="flex flex-col gap-5 px-3 py-4" aria-label="Main navigation">
      {sections.map((section) =>
      <div key={section.label}>
          {collapsed ?
        <div className="mx-auto mb-2 h-px w-5 bg-line" /> :

        <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-4">
              {section.label}
            </p>
        }
          <div
          className={cx(
            'flex flex-col gap-0.5',
            collapsed && 'items-center'
          )}>
          
            {section.items.map((item) =>
          <NavRow key={item.to} item={item} collapsed={collapsed} />
          )}
          </div>
        </div>
      )}
    </nav>);

}

export function Sidebar({
  collapsed,
  onToggle



}: {collapsed: boolean;onToggle: () => void;}) {
  const { currentUser } = useUser();
  const userIsAdmin = currentUser?.role === "Admin";
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  const sections = (isAdminRoute && userIsAdmin) ? adminNav : appNav;

  return (
    <aside
      className={cx(
        'hidden shrink-0 flex-col border border-line bg-surface/80 backdrop-blur-2xl lg:flex',
        'm-2 mr-0 rounded-2xl overflow-hidden shadow-sm',
        'transition-[width] duration-200 ease-swift',
        collapsed ? 'w-[60px]' : 'w-[228px]'
      )}>
      
      {(isAdminRoute && userIsAdmin) &&
      <div
        className={cx(
          'flex items-center gap-2 border-b border-line bg-ink px-3 py-2 text-surface',
          collapsed && 'justify-center px-0'
        )}>
        
          <ShieldCheckIcon className="h-4 w-4 shrink-0" />
          {!collapsed &&
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
              Admin Console
            </span>
        }
        </div>
      }
      <div className="ngip-scroll flex-1 overflow-y-auto">
        <SidebarNav sections={sections} collapsed={collapsed} />
      </div>
      <div className="border-t border-line p-3">
        {userIsAdmin && (
          <NavLink
          to={isAdminRoute ? '/app/dashboard' : '/admin/dashboard'}
          className={cx(
            'mb-1 flex items-center gap-2.5 rounded-md text-[13px] font-medium text-ink-3 transition-colors duration-150 ease-swift hover:bg-ink/[0.04] hover:text-ink',
            collapsed ? 'h-8 w-8 justify-center' : 'h-8 px-2.5'
          )}
          title={isAdminRoute ? 'Back to platform' : 'Admin console'}>
          
          <ArrowLeftRightIcon className="h-4 w-4 shrink-0" strokeWidth={1.9} />
          {!collapsed &&
          <span className="truncate">
              {isAdminRoute ? 'Back to platform' : 'Admin console'}
            </span>
          }
        </NavLink>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cx(
            'flex items-center gap-2.5 rounded-md text-[13px] font-medium text-ink-3 transition-colors duration-150 ease-swift hover:bg-ink/[0.04] hover:text-ink',
            collapsed ? 'h-8 w-8 justify-center' : 'h-8 w-full px-2.5'
          )}>
          
          {collapsed ?
          <ChevronsRightIcon className="h-4 w-4" strokeWidth={1.9} /> :

          <>
              <ChevronsLeftIcon className="h-4 w-4" strokeWidth={1.9} />
              <span>Collapse</span>
            </>
          }
        </button>
      </div>
    </aside>);

}
