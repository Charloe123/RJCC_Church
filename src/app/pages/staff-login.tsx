import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '../context/auth-context';

export default function StaffLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<'admin' | 'usher'>('usher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo mode - works without Firebase
    if (email && password) {
      const user = {
        email: email,
        name: email.split('@')[0] || 'Admin',
        role: role as 'admin' | 'usher',
        branch: 'Main Branch',
      };
      login(user);
      toast.success("Login successful!", { description: `Welcome, ${user.name}` });
      if (role === 'admin') {
        navigate('/app/admin');
      } else {
        navigate('/app/usher');
      }
    } else {
      toast.error("Login failed", { description: "Please enter both email and password" });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-800 font-sans">
      
       {/* Top Brand Logo & Header */}
       <div className="text-center mb-6">
         <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-sm">
           <img src="images/WhatsApp Image 2026-05-22 at 12.13.26.jpeg" alt="RJCC Logo" className="w-full h-full" />
         </div>
         <h1 className="text-3xl font-extrabold tracking-tight text-black">RJCC Church</h1>
         <p className="text-sm font-medium text-slate-500 mt-1">Staff Portal</p>
       </div>

      {/* Main Form Box Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        
        {/* Form Title Headline */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-black font-semibold text-sm">
            <Shield size={16} className="text-slate-700" />
            <span>Staff Sign In</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Enter your staff email and password to access the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
{/* Login As Segmented Control */}
           <div>
             <label className="block text-xs font-bold text-slate-700 mb-2">Login As</label>
             <div className="grid grid-cols-2 gap-3">
<button
                  type="button"
                  onClick={() => setRole('usher')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${
                    role === 'usher'
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <User size={14} />
                  Usher
                </button>
<button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${
                    role === 'admin'
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Shield size={14} />
                  Admin
                </button>
             </div>
           </div>

{/* Email Input Field */}
           <div>
             <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="nkosi@uncommon.org"
               className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition"
               required
             />
             <span className="text-[10px] text-slate-400 mt-1 block">Authorized admin email only</span>
           </div>

          {/* Password Input Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Options Row (Remember me / Forgot password) */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-500">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-black focus:ring-black"
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-slate-500 hover:text-black font-medium transition">
              Forgot password?
            </a>
          </div>

{/* Submit Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm mt-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

        {/* Outer Form Footer Toggle */}
        <div className="border-t border-slate-100 mt-6 pt-4 text-center text-xs">
          <p className="text-slate-500">
            Church member? <a href="#member-login" className="font-bold text-black hover:underline">Member Login</a>
          </p>
        </div>

      </div>

      {/* Copywrite Notice Footer */}
      <footer className="text-center text-[11px] text-slate-400 mt-6 tracking-wide">
        © 2026 Resurrected Jesus Christ Church
      </footer>

    </div>
  );
}
