import React from 'react';
import { Home, Users, QrCode, Settings, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

interface UsherSidebarProps {
  active: 'home' | 'members' | 'check-in' | 'settings';
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function UsherSidebar({ active, darkMode, onToggleDarkMode }: UsherSidebarProps) {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Member Home', icon: Home, id: 'home', path: '/app/member' },
    { name: 'Members', icon: Users, id: 'members', path: '/app/member/members' },
    { name: 'QR Check-In', icon: QrCode, id: 'check-in', path: '/app/member/check-in' },
    { name: 'Settings', icon: Settings, id: 'settings', path: '/app/member/settings' },
  ];

  return (
    <div className="w-[280px] h-screen bg-black text-gray-400 flex flex-col justify-between p-4 font-sans selection:bg-transparent sticky top-0">
      {/* Top Section */}
      <div className="flex flex-col gap-8">
        {/* Header/Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <img src="images/WhatsApp Image 2026-05-22 at 12.13.26.jpeg" alt="RJCC Logo" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">RJCC</h1>
              <p className="text-xs text-gray-500 font-medium">Church Management</p>
            </div>
          </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 text-left font-semibold ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-zinc-900'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[15px]">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1">
        <div className="border-t border-zinc-800 my-4 mx-2" />

        {/* User Card */}
        <div className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800/40 p-4 rounded-2xl mb-4 mx-1">
          <div className="w-11 h-11 bg-slate-800 rounded-full flex items-center justify-center text-white border border-slate-700">
            <span className="text-lg font-semibold">U</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-[15px] leading-tight">Member</h3>
            <p className="text-xs text-gray-500 mt-0.5">Church Member</p>
          </div>
        </div>

        <button 
          onClick={onToggleDarkMode}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-zinc-900 transition-colors font-semibold text-left"
        >
          <Moon size={22} />
          <span className="text-[15px]">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-gray-200 hover:bg-zinc-900 transition-colors font-semibold text-left"
        >
          <LogOut size={22} />
          <span className="text-[15px]">Logout</span>
        </button>
      </div>
    </div>
  );
}