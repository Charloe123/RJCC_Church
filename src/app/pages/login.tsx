import React from 'react';
import { Users, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function LoginTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-800 font-sans">
      
       {/* Top Brand Logo & Header */}
       <div className="text-center mb-6">
         <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-bold text-3xl mx-auto mb-4">
           <img src="images/WhatsApp Image 2026-05-22 at 12.13.26.jpeg" alt="RJCC Logo" className="w-full h-full" />
         </div>
         <h1 className="text-3xl font-extrabold tracking-tight text-black mb-2">RJCC Church</h1>
         <p className="text-sm font-medium text-slate-400 mt-2">Welcome</p>
       </div>

       {/* Main Container Card */}
       <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
         
         {/* Card Header Title */}
         <div className="mb-6">
           <h2 className="text-xl font-bold text-black tracking-tight mb-4">Choose Login Type</h2>
           <p className="text-base text-slate-400 mt-2 leading-relaxed">
             Select the appropriate login portal for your role
           </p>
         </div>

         {/* Selection Buttons Group */}
         <div className="space-y-0.5 rounded-xl overflow-hidden border border-slate-100">
           
           {/* Member Login Option */}
           <button
             className="w-full bg-white hover:bg-slate-50 p-4 flex items-center justify-between text-left transition duration-150 group border-b border-slate-100"
             onClick={() => navigate('/login/member')}
           >
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                 <Users size={18} />
               </div>
               <div>
                 <h3 className="text-lg text-black">Member Login</h3>
                 <p className="text-sm text-slate-400 mt-0.5">Access your member dashboard</p>
               </div>
             </div>
             <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
           </button>

           {/* Staff & Usher Login Option */}
           <button
             className="w-full bg-white hover:bg-slate-50 p-4 flex items-center justify-between text-left transition duration-150 group"
             onClick={() => navigate('/staff-login')}
           >
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                 <Shield size={18} />
               </div>
               <div>
                 <h3 className="text-lg text-black">Staff & Usher Login</h3>
                 <p className="text-sm text-slate-400 mt-0.5">Access admin or usher portal</p>
               </div>
             </div>
             <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
           </button>

         </div>

         {/* Card Footer Help Info */}
         <div className="mt-6 text-center">
           <p className="text-sm text-slate-400 font-medium">
             New member? Contact the church office for registration
           </p>
         </div>

       </div>

       {/* Copyright Notice Footer */}
       <footer className="text-center text-xs text-slate-400 mt-6 tracking-wide">
         © 2026 Resurrected Jesus Christ Church
       </footer>

     </div>
  );
}