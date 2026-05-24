import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Monitor, 
  Heart, 
  Bell, 
  Calendar, 
  User, 
  Download, 
  Printer, 
  HelpCircle,
  Moon,
  LogOut
} from 'lucide-react';
import { UsherSidebar } from '../components/UsherSidebar';

export default function MemberDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const sermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor David",
      date: "May 18, 2026",
      duration: "45 min",
      tag: "Sunday Service"
    },
    {
      title: "The Power of Prayer",
      speaker: "Pastor Sarah",
      date: "May 11, 2026",
      duration: "38 min",
      tag: "Midweek Service"
    },
    {
      title: "Living with Purpose",
      speaker: "Pastor David",
      date: "May 4, 2026",
      duration: "42 min",
      tag: "Sunday Service"
    }
  ];

return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8f9fa] text-[#212529]'}`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="home" />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto relative">
         
        {/* Header Greeting */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-black flex items-center gap-2">
            Welcome, Church Member <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-gray-500 mt-1 text-base">Your personal church member dashboard</p>
        </header>

        {/* FOUR COLOR METRIC TILES */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Sermons - Purple */}
          <div className="bg-[#8a3ffc] text-white p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[120px]">
            <Monitor size={24} className="mb-2" />
            <span className="font-medium">Sermons</span>
          </div>

          {/* Donate - Green */}
          <div className="bg-[#24a148] text-white p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[120px]">
            <Heart size={24} className="mb-2" />
            <span className="font-medium">Donate</span>
          </div>

          {/* Notifications - Blue */}
          <div className="bg-[#0f62fe] text-white p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[120px] relative">
            <span className="absolute top-3 right-3 bg-[#da1e28] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
            <Bell size={24} className="mb-2" />
            <span className="font-medium">Notifications</span>
          </div>

          {/* Events - Orange */}
          <div className="bg-[#ff7605] text-white p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[120px]">
            <Calendar size={24} className="mb-2" />
            <span className="font-medium">Events</span>
          </div>
        </section>

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Member ID Card */}
          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center shadow-sm">
            <div className="w-full flex items-center gap-2 text-gray-700 font-medium mb-6">
              <User size={20} />
              <span>Church Member</span>
            </div>
            
            {/* Main QR Code Container */}
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl mb-6 w-full flex justify-center max-w-[240px]">
              {/* Fallback QR UI Placeholder mimicking the crisp contrast of the asset */}
              <div className="w-44 h-44 bg-neutral-900 flex items-center justify-center text-white text-xs text-center rounded p-2 font-mono">
                [ QR Code Matrix Area ]
              </div>
            </div>

            {/* Meta ID Info Details */}
            <div className="text-center space-y-1 mb-6">
              <p className="font-bold text-gray-800 text-lg">Member ID: 2222</p>
              <p className="text-gray-400 text-sm">2222@member.rjcc.org</p>
              <p className="text-gray-400 text-sm">+244 801 234 5678</p>
            </div>

            {/* ID Card Action Buttons */}
            <div className="flex gap-2 w-full">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Download size={16} />
                <span>Download</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Printer size={16} />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Right Column: Recent Sermons List */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <Monitor size={20} />
                <span className="text-lg font-bold">Recent Sermons</span>
              </div>
              <p className="text-gray-400 text-sm">Watch or download past sermons</p>
            </div>

            {/* Sermons Stack */}
            <div className="space-y-4">
              {sermons.map((sermon, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-base">{sermon.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">
                      <span>{sermon.speaker}</span>
                      <span>•</span>
                      <span>{sermon.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[8px]">i</span> 
                        {sermon.duration}
                      </span>
                      <span className="bg-[#f1e5ff] text-[#8a3ffc] text-xs px-2 py-0.5 rounded-full font-medium">
                        {sermon.tag}
                      </span>
                    </div>
                  </div>

                  {/* Sermon Row Interactive Buttons */}
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      <span>Watch</span>
                    </button>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Float Help Bubble Icon */}
        <button className="fixed bottom-6 right-6 bg-neutral-900 text-white p-3 rounded-full shadow-lg hover:bg-neutral-800 transition-colors">
          <HelpCircle size={24} />
        </button>
      </main>
    </div>
  );
}