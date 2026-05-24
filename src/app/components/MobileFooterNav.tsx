import React, { useState } from 'react';
import { Home, QrCode, Users, Settings, HelpCircle } from 'lucide-react';

export default function MobileFooterNav() {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Check-In', icon: QrCode },
    { name: 'Members', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-slate-400 px-6 py-3 border-t border-slate-900 flex items-center justify-between">
      
      {/* Navigation Tabs Links - Evenly Spaced Across Full Width */}
      <div className="flex items-center gap-4 justify-between flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center gap-1.5 transition-colors duration-200 ${
                isActive ? 'text-white font-medium' : 'hover:text-slate-200'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs tracking-wide">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Info/Help Action Badge Right-Aligned */}
      <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-slate-200 transition-colors">
        <HelpCircle size={18} strokeWidth={2.5} />
      </button>

    </div>
  );
}