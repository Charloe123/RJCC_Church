import { useState } from 'react';
import { Shield, Eye, EyeOff, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { loginWithEmail, loginWithGoogle, auth } from '../../firebase/firebase';
import { useAuth } from '../context/auth-context';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (email.toLowerCase() !== 'nkosi@uncommon.org') {
      toast.error("Access denied", { description: "Only authorized admin email is allowed" });
      setIsLoading(false);
      return;
    }

    // Try Firebase first
    if (auth) {
      const { success, error } = await loginWithEmail(email, password);
      if (success) {
        const user = {
          email: email,
          name: email.split('@')[0] || 'Admin',
          role: 'admin' as const,
          branch: 'Main Branch',
        };
        login(user);
        toast.success("Login successful!", { description: `Welcome, ${user.name}` });
        navigate('/app/admin');
        setIsLoading(false);
        return;
      }
      // If Firebase fails, show error
      toast.error("Login failed", { description: error || "Invalid credentials" });
      setIsLoading(false);
      return;
    }

    // Fallback demo mode (when auth is null)
    const user = {
      email: email,
      name: email.split('@')[0] || email,
      role: 'admin' as const,
      branch: 'Main Branch',
    };
    login(user);
    toast.success("Login successful!", { description: `Welcome, ${user.name}` });
    navigate('/app/admin');
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    if (!auth) {
      // Fallback demo mode for Google
      const user = {
        email: 'nkosi@uncommon.org',
        name: 'Admin',
        role: 'admin' as const,
        branch: 'Main Branch',
      };

      login(user);

      toast.success("Login successful!", {
        description: "Welcome, Admin (Demo Mode)",
      });

      navigate('/app/admin');
    } else {
      const { success, error } = await loginWithGoogle();

      if (success) {
        // The onAuthStateChanged in auth-context will handle Firebase user
        // but we need to check if email is authorized
        const currentUser = auth.currentUser;
        if (currentUser?.email?.toLowerCase() === 'nkosi@uncommon.org') {
          toast.success("Login successful!", {
            description: `Welcome, ${currentUser.displayName || 'Admin'}`,
          });
          navigate('/app/admin');
        } else {
          toast.error("Access denied", { description: "Only nkosi@uncommon.org is allowed" });
          await auth.signOut();
        }
      } else {
        toast.error("Google login failed", {
          description: error || "Unable to authenticate with Google",
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans select-none antialiased">
      
      {/* Header Logo & Title */}
      <div className="flex flex-col items-center mb-8 text-center">
        {/* Black Circle Cross Logo */}
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-5 shadow-sm">
          <svg 
            className="w-8 h-8 text-white" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-6-8h12" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-extrabold text-black tracking-tight mb-1">
          RJCC Church
        </h1>
        <p className="text-slate-500 font-medium text-base">
          Admin Portal
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
        
        {/* Sub-header */}
        <div className="mb-7">
          <div className="flex items-center gap-3 text-black font-semibold text-xl mb-2">
            <Shield className="w-5 h-5 stroke-[2.5]" />
            <h2>Admin Sign In</h2>
          </div>
          <p className="text-slate-500 text-base leading-normal font-normal">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
{/* Email Field */}
           <div>
             <label className="block text-black font-semibold text-base mb-2">
               Email
             </label>
             <input 
               type="email" 
               placeholder="nkosi@uncommon.org" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-slate-100/80 border border-transparent rounded-xl px-4 py-3.5 text-lg text-slate-700 placeholder-slate-400 font-medium focus:outline-none focus:bg-slate-50 focus:border-slate-300 transition-colors"
             />
             <span className="block text-slate-400 text-base mt-1.5 font-normal">
               Authorized admin email only
             </span>
           </div>

          {/* Password Field */}
          <div>
            <label className="block text-black font-semibold text-base mb-2">
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100/80 border border-transparent rounded-xl pl-4 pr-12 py-3.5 text-lg text-slate-700 placeholder-slate-400 font-medium focus:outline-none focus:bg-slate-50 focus:border-slate-300 transition-colors"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-base pt-1">
            <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-black focus:ring-0 accent-black cursor-pointer"
              />
              Remember me
            </label>
            <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors font-medium">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white text-base font-semibold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors mt-2 shadow-sm disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Google Sign In Button */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border border-slate-300 text-black text-base font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Chrome className="w-5 h-5" />
            Sign in with Google
          </button>
        </form>

        {/* Footer Link Inside Card */}
        <div className="border-t border-slate-100 mt-6 pt-5 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Church member or usher? <button type="button" onClick={() => navigate('/')} className="text-black font-bold hover:underline">Back to Login Types</button>
          </p>
        </div>
      </div>

      {/* Copyright Footer */}
      <footer className="mt-10 text-center">
        <p className="text-sm text-slate-400 font-medium">
          &copy; 2026 Resurrected Jesus Christ Church
        </p>
      </footer>
    </div>
  );
}