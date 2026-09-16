import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, LogOutIcon, MenuIcon, SearchIcon, SettingsIcon, ShieldCheckIcon, UserIcon, SunIcon, MoonIcon, SparklesIcon } from 'lucide-react';
import { Logo } from './Logo';
import { IconButton } from '../ui/Button';
import { MenuItem, Popover } from '../ui/Overlay';
import { notifications } from '../../data/content';
import { cx } from '../../utils/format';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';

function MarketClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const timeStr = formatter.format(time);

  return (
    <div className="mr-1 hidden items-center gap-2 rounded-md border border-line bg-subtle px-2.5 py-1.5 xl:flex">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pos opacity-60 duration-1000" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pos" />
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-2">
        Markets open
      </span>
      <span className="num text-[11px] tabular-nums text-ink-4">
        IST {timeStr}
      </span>
    </div>
  );
}

export function TopBar({
  onOpenCommand,
  onOpenCopilot,
  onOpenMobileNav
}: {onOpenCommand: () => void; onOpenCopilot: () => void; onOpenMobileNav: () => void;}) {
  const { currentUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const initials = currentUser.name.split(" ").map(n => n[0]).join("").substring(0, 2);
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;
  return <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-3 lg:px-4">
      <button type="button" onClick={onOpenMobileNav} aria-label="Open navigation" className="-ml-1 flex h-9 w-9 items-center justify-center rounded-md text-ink-2 hover:bg-ink/[0.05] lg:hidden">
        <MenuIcon className="h-4.5 w-4.5" />
      </button>

      <Link to="/app/dashboard" className="flex shrink-0 items-center" aria-label="NGIP home">
        <Logo subtitle="Nation Growth" />
      </Link>

      <div className="mx-auto hidden w-full max-w-[520px] md:block">
        <button type="button" onClick={onOpenCommand} className="group flex h-9 w-full items-center gap-2.5 rounded-md border border-line-strong bg-subtle px-3 text-left transition-[border-color,background-color] duration-150 ease-swift hover:border-ink-4 hover:bg-surface">
          <SearchIcon className="h-3.5 w-3.5 text-ink-4" />
          <span className="flex-1 truncate text-[13px] text-ink-4">
            Search countries, instruments, indicators, news…
          </span>
          <kbd className="hidden rounded border border-line-strong bg-surface px-1.5 py-0.5 text-[10px] font-medium text-ink-4 lg:block">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <IconButton label="Search" onClick={onOpenCommand} className="md:hidden">
          <SearchIcon className="h-4 w-4" />
        </IconButton>

        <MarketClock />
        
        <IconButton 
          label="Open Copilot (Cmd+J)" 
          onClick={onOpenCopilot} 
          className="relative text-accent"
        >
          <SparklesIcon className="h-4 w-4" />
        </IconButton>

        <IconButton 
          label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} 
          onClick={toggleTheme} 
          className="relative"
        >
          {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </IconButton>

        <Popover width="w-[340px]" trigger={({
        toggle
      }) => <IconButton label="Notifications" onClick={toggle} className="relative">
              <BellIcon className="h-4 w-4" />
              {unread > 0 && <span className="num absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-neg px-1 text-[9px] font-bold tabular-nums text-surface">
                  {unread}
                </span>}
            </IconButton>}>
          {(close) => <div>
              <div className="flex items-center justify-between px-2.5 py-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                  Notifications
                </p>
                <span className="num text-[11px] text-ink-4">{unread} unread</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => <button key={n.id} onClick={() => {
              navigate('/app/notifications');
              close();
            }} className="flex w-full gap-2.5 rounded px-2.5 py-2 text-left transition-colors duration-150 ease-swift hover:bg-subtle">
                    <span className={cx('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', n.read ? 'bg-transparent' : 'bg-accent')} />
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-medium text-ink">
                        {n.title}
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-[11px] leading-relaxed text-ink-3">
                        {n.body}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-ink-4">
                        {n.category} · {n.time}
                      </span>
                    </span>
                  </button>)}
              </div>
              <div className="mt-1 border-t border-line pt-1">
                <MenuItem onClick={() => {
              navigate('/app/notifications');
              close();
            }}>
                  View all notifications
                </MenuItem>
              </div>
            </div>}
        </Popover>

        <IconButton label="Help" onClick={() => navigate('/app/settings')} className="hidden sm:inline-flex">
          <div className="h-4 w-4" />
        </IconButton>

        <Popover width="w-56" trigger={({
        toggle
      }) => <button type="button" onClick={toggle} className="ml-1 flex items-center gap-2 rounded-md p-1 pr-2 transition-colors duration-150 ease-swift hover:bg-ink/[0.04]" aria-label="Account menu">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-surface">
                {initials}
              </span>
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-[12px] font-semibold text-ink">
                  {currentUser.name}
                </span>
                <span className="block text-[10px] text-ink-4">{currentUser.accountType}</span>
              </span>
            </button>}>
          {(close) => <div>
              <div className="border-b border-line px-2.5 pb-2 pt-1">
                <p className="text-[13px] font-semibold text-ink">{currentUser.name}</p>
                <p className="text-[11px] text-ink-4">{currentUser.email}</p>
              </div>
              <div className="pt-1">
                <MenuItem icon={<UserIcon className="h-3.5 w-3.5" />} onClick={() => {
              navigate('/app/profile');
              close();
            }}>
                  Profile
                </MenuItem>
                <MenuItem icon={<SettingsIcon className="h-3.5 w-3.5" />} onClick={() => {
              navigate('/app/settings');
              close();
            }}>
                  Settings
                </MenuItem>
                <MenuItem icon={<ShieldCheckIcon className="h-3.5 w-3.5" />} onClick={() => {
              navigate('/app/security');
              close();
            }}>
                  Security
                </MenuItem>
              </div>
              <div className="mt-1 border-t border-line pt-1">
                <MenuItem icon={<LogOutIcon className="h-3.5 w-3.5" />} tone="danger" onClick={() => navigate('/login')}>
                  Sign out
                </MenuItem>
              </div>
            </div>}
        </Popover>
      </div>
    </header>;
}