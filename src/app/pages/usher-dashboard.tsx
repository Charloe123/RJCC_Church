import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  UserPlus, 
  ArrowRight,
  Lightbulb,
  Calendar,
  Users,
  QrCode
} from 'lucide-react';
import NewMemberRegistrationPopup from '../components/new-member-registration-popup';
import { UsherSidebar } from '../components/UsherSidebar';
import { db } from '../../firebase/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

export default function UsherDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    { name: "John Adeyemi", status: "Checked in", time: "2 min ago", initial: "J" },
    { name: "Grace Okafor", status: "Registered", time: "5 min ago", initial: "G" },
    { name: "David Mensah", status: "Checked in", time: "8 min ago", initial: "D" },
    { name: "Sarah Williams", status: "Checked in", time: "12 min ago", initial: "S" },
    { name: "Emmanuel Nwosu", status: "Registered", time: "15 min ago", initial: "E" },
  ]);
  const [todayCount, setTodayCount] = useState(127);

  useEffect(() => {
    // 1. Recent Activity Listener (Limited to 5)
    const q = query(
      collection(db, 'checkins'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activities = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          name: data.name,
          status: data.status,
          time: data.time,
          initial: data.initial
        };
      });
      if (activities.length > 0) setRecentActivity(activities);
    });

    // 2. Today's Count Listener (Filtered by date)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    
    const qCount = query(
      collection(db, 'checkins'),
      where('timestamp', '>=', startOfToday)
    );
    const unsubscribeCount = onSnapshot(qCount, (snapshot) => {
      setTodayCount(127 + snapshot.size);
    });

    return () => { unsubscribe(); unsubscribeCount(); };
  }, []);

  const metrics = [
    { id: 1, label: "Today's Check-Ins", value: todayCount.toString(), icon: CheckCircle, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { id: 2, label: "Total Members", value: "1248", icon: Users, color: "text-slate-700", bgColor: "bg-slate-100" },
    { id: 3, label: "Avg Check-In", value: "8 sec", icon: Clock, color: "text-blue-600", bgColor: "bg-blue-50" },
    { id: 4, label: "Attendance Rate", value: "85%", icon: TrendingUp, color: "text-violet-600", bgColor: "bg-violet-50" },
  ];

  const quickActions = [
    { title: "QR Code Check-In", desc: "Scan member QR codes for quick attendance", icon: QrCode, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Register New Member", desc: "Add new members to the system", icon: UserPlus, color: "text-emerald-600", bgColor: "bg-emerald-100" },
    { title: "View Members", desc: "Search and view member information", icon: Users, color: "text-purple-600", bgColor: "bg-purple-100" },
  ];

  const upcomingServices = [
    { title: "Sunday Worship", time: "9:00 AM", date: "May 25, 2026", dayNum: "25" },
    { title: "Midweek Service", time: "6:00 PM", date: "May 21, 2026", dayNum: "21" },
    { title: "Youth Revival", time: "6:00 PM", date: "May 21, 2026", dayNum: "21" },
  ];

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="home" basePath="usher" />

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Welcome Header */}
        <header className="mb-8">
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Welcome, Usher <span className="animate-pulse">👋</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">Your portal for member check-in and registration</p>
        </header>

        {/* 4-Column Stat Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.id} className={`p-5 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div>
                  <p className="text-2xl font-bold tracking-tight mb-0.5">{metric.value}</p>
                  <p className="text-xs font-medium text-slate-500">{metric.label}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${metric.bgColor} ${metric.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            );
          })}
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{quickActions.map((action, idx) => {
                const Icon = action.icon;
                const handleClick = () => {
                  if (action.title === "Register New Member") {
                    setShowRegistrationPopup(true);
                  } else if (action.title === "QR Code Check-In") {
                    navigate('/app/usher/check-in');
                  } else if (action.title === "View Members") {
                    navigate('/app/usher/members');
                  }
                };
                return (
                  <button 
                    key={idx} 
                    onClick={handleClick}
                    className={`p-5 rounded-2xl border text-left flex justify-between items-start group transition-all duration-200 ${
                      darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-500' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.bgColor} ${action.color}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{action.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 pr-4 leading-relaxed">{action.desc}</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
          </div>
        </section>

        {/* Bottom Split Layout: Recent Activity vs. Upcoming Services + Tips */}
        <div className="space-y-6">
          
          {/* Left Column: Recent Activity */}
          <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <h3 className="font-bold text-sm">Recent Activity</h3>
            <p className="text-xs text-slate-400 mt-0.5 mb-4">Latest member registrations and check-ins</p>
            
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                      {activity.initial}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">{activity.name}</h4>
                      <p className="text-[11px] text-slate-500">{activity.status}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column: Upcoming Services & Tips */}
          <div className="space-y-6">
            
            {/* Upcoming Services Section */}
            <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
              <h3 className="font-bold text-sm">Upcoming Services</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-4">Prepare for these events</p>
              
              <div className="space-y-3">
                {upcomingServices.map((service, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex flex-col items-center justify-center relative">
                      <Calendar size={14} className="opacity-40 absolute top-1" />
                      <span className="text-xs font-bold pt-3">{service.dayNum},</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">{service.title}</h4>
                      <p className="text-[11px] text-slate-500">{service.time}</p>
                      <p className="text-[10px] text-slate-400">{service.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Usher Tips Box */}
            <section className="bg-amber-50/60 border border-amber-100 p-5 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs mb-3">
                <Lightbulb size={16} className="fill-amber-400 text-amber-500" />
                <span>Usher Tips</span>
              </div>
              <ul className="text-xs text-amber-900/80 space-y-2 list-disc list-inside leading-relaxed">
                <li>Use QR scanner for fastest check-ins — average 8 seconds per person</li>
                <li>If QR code unavailable, use manual ID entry as backup</li>
                <li>New visitors? Register them immediately to generate their QR code</li>
                <li>Members can download or print their QR code for future visits</li>
              </ul>
            </section>

          </div>
        </div>

       </main>

       {/* New Member Registration Popup */}
       {showRegistrationPopup && <NewMemberRegistrationPopup onClose={() => setShowRegistrationPopup(false)} />}
     </div>
   );
 }