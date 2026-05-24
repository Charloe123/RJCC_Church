import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function StaffLogin() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Usher'); // 'Usher' or 'Admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, password, rememberMe });
    // In a real app, you would authenticate here
    // For now, we'll just navigate to the appropriate dashboard
    if (role === 'Admin') {
      navigate('/app/admin');
    } else {
      navigate('/app/usher');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-800 font-sans">
      
      {/* Top Brand Logo & Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-sm">
          †
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
                onClick={() => setRole('Usher')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${
                  role === 'Usher'
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <User size={14} />
                Usher
              </button>
              <button
                type="button"
                onClick={() => setRole('Admin')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${
                  role === 'Admin'
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
              placeholder="admin@rjcc.org"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition"
              required
            />
            <span className="text-[10px] text-slate-400 mt-1 block">e.g. usher@rjcc.org</span>
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
            className="w-full bg-black hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider Section for Demo access */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative px-3 bg-white text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Quick Login (Demo)
          </span>
        </div>

        {/* Demo Fast Login Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setRole('Admin');
              setEmail('admin@rjcc.org');
              setPassword('password123');
            }}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 transition text-center"
          >
            <Shield size={16} className="text-slate-400 mb-1" />
            <span className="text-[11px] font-bold text-slate-700">Admin</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setRole('Usher');
              setEmail('usher@rjcc.org');
              setPassword('password123');
            }}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 transition text-center"
          >
            <User size={16} className="text-blue-500 mb-1" />
            <span className="text-[11px] font-bold text-blue-600">Usher</span>
          </button>
        </div>
        
        <p className="text-[10px] text-slate-400 text-center mt-2">Click for instant demo access</p>

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
