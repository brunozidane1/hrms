'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Fingerprint, 
  ArrowRight, 
  Loader2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ChevronLeft 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [stage, setStage] = useState<'identify' | 'authorize'>('identify');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStage('authorize');
    }, 800);
  };

  const handleFinalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const isHR = formData.email.includes('admin') || formData.email.includes('hr');
      router.push(isHR ? '/hrms/dashboard' : '/hrms/self-service/dashboard');
    }, 1200);
  };

  return (
    <div className="fun-page min-h-screen bg-slate-50 flex items-center justify-center p-0 lg:p-8 font-sans">
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-100 blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-indigo-50 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-275 min-h-162.5 grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-200 rounded-none lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* Left Column: The Form */}
        <div className="lg:col-span-6 flex flex-col justify-center p-8 lg:p-16">
          <div className="max-w-90 mx-auto w-full">
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Fingerprint className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">HR<span className="text-blue-600">CORE</span></span>
            </div>

            {stage === 'identify' ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to your portal</h1>
                <p className="text-slate-500 mb-8 text-sm">Welcome back! Please enter your work email.</p>

                <form onSubmit={handleIdentify} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]">
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Continue <ArrowRight size={18} /></>}
                  </button>
                </form>

                <div className="text-center space-y-3 mt-6">
                  <p className="text-slate-500 text-sm">
                    Don't have an account? <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-bold">Sign up</Link>
                  </p>
                  <Link href="/auth/forgot-password" className="block text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <button 
                  onClick={() => setStage('identify')} 
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase mb-6 transition-colors"
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Verify Identity</h1>
                <p className="text-slate-500 mb-8 text-sm truncate">{formData.email}</p>

                <form onSubmit={handleFinalLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <Link href="/auth/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]">
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Log In"}
                  </button>
                </form>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-8">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 HRCORE</span>
              <div className="flex gap-4">
                <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Privacy</Link>
                <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Support</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="hidden lg:flex lg:col-span-6 relative bg-linear-to-br from-blue-50 via-slate-50 to-indigo-50 flex-col items-center justify-center p-12 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* SVG Illustration */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="mb-6 drop-shadow-lg">
              {/* Character body */}
              <circle cx="100" cy="60" r="25" fill="#3b82f6" />
              {/* Head shine */}
              <circle cx="95" cy="45" r="8" fill="#60a5fa" opacity="0.6" />
              {/* Body */}
              <rect x="75" y="90" width="50" height="45" rx="8" fill="#1e40af" />
              {/* Arms */}
              <rect x="35" y="95" width="40" height="20" rx="10" fill="#3b82f6" transform="rotate(-20 55 105)" />
              <rect x="125" y="95" width="40" height="20" rx="10" fill="#3b82f6" transform="rotate(20 145 105)" />
              {/* Legs */}
              <rect x="80" y="135" width="15" height="40" rx="7" fill="#1e40af" />
              <rect x="105" y="135" width="15" height="40" rx="7" fill="#1e40af" />
              {/* Face - Eyes */}
              <circle cx="93" cy="55" r="2.5" fill="white" />
              <circle cx="107" cy="55" r="2.5" fill="white" />
              {/* Face - Smile */}
              <path d="M 93 62 Q 100 66 107 62" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>

            <h3 className="text-2xl font-bold text-slate-900 mb-1">Welcome Back!</h3>
            <p className="text-slate-500 text-sm font-medium">Secure access to your HR portal</p>
          </div>
        </div>

      </div>
    </div>
  );
}