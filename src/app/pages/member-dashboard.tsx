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
import { useNavigate } from 'react-router';
import { QRCodeSVG } from 'qrcode.react';
import { MobileBottomNav } from '../components/mobile-bottom-nav';

export default function MemberDashboard() {
  const navigate = useNavigate();
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
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8f9fa] text-[#212529]'} pt-16 lg:pt-0`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="home" basePath="member" />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative">
         
         {/* Header Greeting */}
         <header className="mb-4 sm:mb-6">
           <h1 className="text-2xl sm:text-3xl tracking-tight text-black flex items-center gap-2">
             Welcome, Church Member <span className="animate-bounce">👋</span>
           </h1>
           <p className="text-gray-400 sm:text-gray-500 mt-1 text-sm sm:text-base">Your personal church member dashboard</p>
         </header>

        {/* FOUR COLOR METRIC TILES */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Sermons - Purple */}
          <div className="bg-[#8a3ffc] text-white p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[100px] sm:min-h-[120px]">
            <Monitor size={20} className="sm:w-6 sm:h-6 mb-1 sm:mb-2" />
            <span className="font-medium text-sm sm:text-base">Sermons</span>
          </div>

          {/* Donate - Green */}
          <div 
            onClick={() => navigate('/app/member/donate')}
            className="bg-[#24a148] text-white p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[100px] sm:min-h-[120px]"
          >
            <Heart size={20} className="sm:w-6 sm:h-6 mb-1 sm:mb-2" />
            <span className="font-medium text-sm sm:text-base">Donate</span>
          </div>

          {/* Notifications - Blue */}
          <div className="bg-[#0f62fe] text-white p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[100px] sm:min-h-[120px] relative">
            <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#da1e28] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
            <Bell size={20} className="sm:w-6 sm:h-6 mb-1 sm:mb-2" />
            <span className="font-medium text-sm sm:text-base">Notifications</span>
          </div>

          {/* Events - Orange */}
          <div className="bg-[#ff7605] text-white p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:opacity-95 transition-opacity min-h-[100px] sm:min-h-[120px]">
            <Calendar size={20} className="sm:w-6 sm:h-6 mb-1 sm:mb-2" />
            <span className="font-medium text-sm sm:text-base">Events</span>
          </div>
        </section>

{/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          
          {/* Left Column: Member ID Card */}
          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 flex flex-col items-center shadow-sm">
            <div className="w-full flex items-center gap-2 text-gray-700 font-medium mb-4 sm:mb-6">
              <User size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Church Member</span>
            </div>
            
            {/* Main QR Code Container */}
            <div className="bg-gray-50 border border-gray-100 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 w-full flex justify-center max-w-[200px] sm:max-w-[240px]">
              <QRCodeSVG
                value="2222"
                size={140}
                bgColor="#f9fafb"
                fgColor="#111827"
                level="M"
                includeMargin={false}
                className="sm:w-[176px] sm:h-[176px]"
              />
            </div>

            {/* Meta ID Info Details */}
            <div className="text-center space-y-0.5 mb-3 sm:mb-4">
              <p className="text-base sm:text-lg text-gray-800">Member ID: 2222</p>
              <p className="text-xs sm:text-sm text-gray-400">2222@member.rjcc.org</p>
              <p className="text-xs sm:text-sm text-gray-400">+244 801 234 5678</p>
            </div>

            {/* ID Card Action Buttons */}
            <div className="flex gap-2 w-full">
              <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span>Download</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                <Printer size={14} className="sm:w-4 sm:h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Right Column: Recent Sermons List */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700 font-medium mb-1">
                <Monitor size={18} className="sm:w-5 sm:h-5" />
                <span className="text-base sm:text-lg font-bold">Recent Sermons</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">Watch or download past sermons</p>
            </div>

            {/* Sermons Stack */}
            <div className="space-y-3 sm:space-y-4">
              {sermons.map((sermon, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                  <div className="space-y-1">
                    <h3 className="text-gray-900 text-sm sm:text-base">{sermon.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-400">
                      <span>{sermon.speaker}</span>
                      <span>•</span>
                      <span>{sermon.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                      <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-gray-400 rounded-full flex items-center justify-center text-[6px] sm:text-[8px]">i</span> 
                        {sermon.duration}
                      </span>
                      <span className="bg-[#f1e5ff] text-[#8a3ffc] text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium">
                        {sermon.tag}
                      </span>
                    </div>
                  </div>

                  {/* Sermon Row Interactive Buttons */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                      <span>Watch</span>
                    </button>
                    <button className="p-1.5 sm:p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                      <Download size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> {/* Closes the Two Column Grid */}

{/* Floating Help Bubble Icon */}
         <button className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 bg-neutral-900 text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-neutral-800 transition-colors lg:hidden">
           <HelpCircle size={20} className="sm:w-6 sm:h-6" />
         </button>
         <MobileBottomNav />
       </main>
     </div>
  );
}