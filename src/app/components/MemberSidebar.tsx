import React from 'react';
import { useNavigate } from 'react-router';
import { Home, Settings, Moon, LogOut } from 'lucide-react';

interface MemberSidebarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  active?: 'home' | 'settings';
}

export function MemberSidebar({ darkMode, onToggleDarkMode, active = 'home' }: MemberSidebarProps) {
  const navigate = useNavigate();

  const buttonBase =
    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition text-sm';
  const activeButton = 'bg-white text-black';
  const inactiveButton = 'text-slate-400 hover:text-white';

  return (
    <aside className="w-64 bg-black text-white flex flex-col justify-between p-4 sticky top-0 h-screen">
      <div>
        <div className="flex items-center gap-3 mb-8 px-2 pt-2">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
            +
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide">RJCC</h1>
            <p className="text-xs text-slate-400">Church Management</p>
          </div>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => navigate('/app/member')}
            className={`${buttonBase} ${active === 'home' ? activeButton : inactiveButton}`}
          >
            <Home size={18} /> My Dashboard
          </button>
          <button
            onClick={() => navigate('/app/member/settings')}
            className={`${buttonBase} ${active === 'settings' ? activeButton : inactiveButton}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
      </div>

      <div className="space-y-2 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-semibold">
            M
          </div>
          <div>
            <p className="text-sm font-medium">Church Member</p>
            <p className="text-xs text-slate-500 capitalize">member</p>
          </div>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition text-sm"
        >
          <Moon size={16} /> Dark Mode
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-rose-400 transition text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}