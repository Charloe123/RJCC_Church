import React, { useState, useEffect } from 'react';
import { CheckCircle, Users, Clock, TrendingUp, Camera, UserCheck } from 'lucide-react';
import { UsherSidebar } from '../components/UsherSidebar';
import { db } from '../../firebase/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function QRCodeCheckIn() {
  const [darkMode, setDarkMode] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [checkIns, setCheckIns] = useState<{ id: string; time: string; timestamp: number }[]>([]);
  const [stats, setStats] = useState({
    today: 0,
    total: 0,
    latest: '--:--',
    attendance: '0%'
  });

  // Real-time listener for recent check-ins
  useEffect(() => {
    const q = query(collection(db, 'checkins'), orderBy('timestamp', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: data.memberId,
          time: data.time,
          timestamp: data.timestamp?.toMillis() || Date.now()
        };
      });
      setCheckIns(docs);
      if (docs.length > 0) {
        setStats(prev => ({ ...prev, latest: docs[0].time }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Sync activity with Firebase Firestore
    try {
      await addDoc(collection(db, 'checkins'), {
        memberId: memberId,
        name: `Member ${memberId}`,
        status: "Checked in",
        timestamp: serverTimestamp(),
        time: currentTime,
        initial: memberId.charAt(0).toUpperCase()
      });
      setMemberId(''); // Clear input on success
    } catch (error) {
      console.error("Error saving check-in to Firebase:", error);
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="check-in" />
      
      <div className="flex-1 p-6 sm:p-8 font-sans">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">QR Code Check-In</h1>
          <p className="mt-1 text-sm text-slate-500">Scan member QR codes for attendance tracking</p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {/* Today Card */}
          <div className={`p-6 rounded-2xl border flex items-center space-x-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.today}</div>
              <div className="text-xs text-slate-400 font-medium tracking-wide">Today</div>
            </div>
          </div>

          {/* Total Card */}
          <div className={`p-6 rounded-2xl border flex items-center space-x-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="p-3 bg-slate-50 rounded-full text-slate-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-slate-400 font-medium tracking-wide">Total</div>
            </div>
          </div>

          {/* Latest Card */}
          <div className={`p-6 rounded-2xl border flex items-center space-x-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.latest}</div>
              <div className="text-xs text-slate-400 font-medium tracking-wide">Latest</div>
            </div>
          </div>

          {/* Attendance Card */}
          <div className={`p-6 rounded-2xl border flex items-center space-x-4 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="p-3 bg-purple-50 rounded-full text-purple-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.attendance}</div>
              <div className="text-xs text-slate-400 font-medium tracking-wide">Attendance</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Scanner Panel */}
          <div className={`lg:col-span-6 p-6 rounded-2xl border flex flex-col justify-between ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div>
              <div className="flex items-start space-x-2 mb-1">
                <div className="text-slate-700 mt-0.5">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold">QR Code Scanner</h2>
                  <p className="text-sm text-slate-500">Scan member QR codes for quick check-in</p>
                </div>
              </div>

              <button className="w-full mt-6 bg-black hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors">
                <Camera className="w-5 h-5" />
                <span>Start Camera Scanner</span>
              </button>

              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}></div>
                </div>
                <span className={`relative px-3 text-xs uppercase tracking-wider font-medium ${darkMode ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-400'}`}>OR</span>
              </div>

              <form onSubmit={handleCheckIn} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter Member ID manually"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all placeholder-slate-400 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
                <button
                  type="submit"
                  className={`border rounded-xl px-4 py-2.5 flex items-center space-x-1.5 text-sm font-medium transition-colors ${darkMode ? 'border-slate-700 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                >
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <span>Check In</span>
                </button>
              </form>
            </div>

            <div className={`mt-8 rounded-xl p-4 border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <h3 className="text-sm font-bold mb-2">How to use:</h3>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>Use camera scanner to scan member QR codes</li>
                <li>Or enter Member ID manually for check-in</li>
                <li>Check-in is recorded automatically</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Recent Check-Ins Panel */}
          <div className={`lg:col-span-6 p-6 rounded-2xl border flex flex-col min-h-[350px] ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <h2 className="text-base font-bold mb-4">Recent Check-Ins</h2>
            
            {checkIns.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-slate-50 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 mb-4">
                  <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium text-slate-700">No check-ins yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Scan member QR codes to begin</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto max-h-[300px] space-y-3 pr-1">
                {checkIns.map((item) => (
                  <div key={item.timestamp} className={`flex items-center justify-between p-3 rounded-xl border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                        ID
                      </div>
                      <span className="text-sm font-medium">{item.id}</span>
                    </div>
                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}