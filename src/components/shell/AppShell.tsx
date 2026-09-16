import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  BriefcaseIcon,
  CandlestickChartIcon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  UserIcon } from
'lucide-react';
import { Sidebar, SidebarNav } from './Sidebar';
import { TopBar } from './TopBar';
import { CommandPalette } from './CommandPalette';
import { Copilot } from './Copilot';
import { Drawer } from '../ui/Overlay';
import { adminNav, appNav } from './navigation';
import { cx } from '../../utils/format';

const mobileTabs = [
{ label: 'Home', to: '/app/dashboard', icon: LayoutDashboardIcon },
{ label: 'Markets', to: '/app/markets', icon: CandlestickChartIcon },
{ label: 'Portfolio', to: '/app/portfolio', icon: BriefcaseIcon },
{ label: 'Orders', to: '/app/orders', icon: ListOrderedIcon },
{ label: 'Profile', to: '/app/profile', icon: UserIcon }];


export function AppShell() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [copilotOpen, setCopilotOpen] = React.useState(false);
  const [mobileNav, setMobileNav] = React.useState(false);
  const { pathname } = useLocation();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isAdmin = pathname.startsWith('/admin');

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setCopilotOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  React.useEffect(() => {
    setMobileNav(false);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex h-full w-full flex-col bg-canvas">
      <TopBar
        onOpenCommand={() => setCommandOpen(true)}
        onOpenCopilot={() => setCopilotOpen(true)}
        onOpenMobileNav={() => setMobileNav(true)} />
      
      <div className="flex min-h-0 flex-1">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <main
          ref={scrollRef}
          className="ngip-scroll min-w-0 flex-1 overflow-y-auto pb-16 lg:pb-0">
          
          <Outlet />
        </main>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-line bg-surface/95 backdrop-blur lg:hidden"
        aria-label="Primary">
        
        {mobileTabs.map((t) => {
          const Icon = t.icon;
          return (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
              cx(
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors duration-150 ease-swift',
                isActive ? 'text-accent' : 'text-ink-4'
              )
              }>
              
              <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              {t.label}
            </NavLink>);

        })}
      </nav>

      <Drawer
        open={mobileNav}
        onClose={() => setMobileNav(false)}
        side="left"
        width="w-[272px]"
        title="NGIP"
        subtitle={isAdmin ? 'Admin console' : 'Nation Growth Investment Platform'}>
        
        <div className="-mx-5 -mt-4">
          <SidebarNav sections={isAdmin ? adminNav : appNav} collapsed={false} />
        </div>
      </Drawer>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <Copilot open={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </div>);
}