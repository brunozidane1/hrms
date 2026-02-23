'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Fingerprint, 
  Mail, 
  Loader2, 
  ChevronLeft, 
  CheckCircle2, 
  ArrowRight,
  LifeBuoy
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fun-page min-h-screen bg-slate-50 flex items-center justify-center p-0 lg:p-8 font-sans">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-100 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-275 min-h-150 grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-200 rounded-none lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-6 flex flex-col justify-center p-8 lg:p-16">
          <div className="max-w-90 mx-auto w-full">
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Fingerprint className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">HR<span className="text-blue-600">CORE</span></span>
            </div>

            {submitted ? (
              <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
                <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-emerald-500" size={40} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your mail</h1>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  We've sent a recovery link to <br />
                  <span className="font-bold text-slate-900">{email}</span>
                </p>
                
                <Link 
                  href="/auth/login"
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]"
                >
                  Return to Sign In
                </Link>
                
                <p className="mt-8 text-xs text-slate-400 font-medium">
                  Didn't receive the email? Check your spam folder or <button className="text-blue-600 font-bold hover:underline">try again</button>.
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <header className="mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h1>
                  <p className="text-slate-500 text-sm font-medium">No worries, we'll send you reset instructions.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Work Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Reset Password <ArrowRight size={18} /></>}
                  </button>
                </form>

                <div className="mt-8">
                  <Link href="/auth/login" className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors">
                    <ChevronLeft size={16} /> Back to Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="hidden lg:flex lg:col-span-6 relative bg-linear-to-br from-rose-50 via-slate-50 to-pink-50 flex-col items-center justify-center p-12 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* SVG Illustration */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="mb-6 drop-shadow-lg">
              {/* Character body */}
              <circle cx="100" cy="60" r="25" fill="#f43f5e" />
              {/* Head shine */}
              <circle cx="95" cy="45" r="8" fill="#fb7185" opacity="0.6" />
              {/* Body */}
              <rect x="75" y="90" width="50" height="45" rx="8" fill="#e11d48" />
              {/* Arms at sides thinking */}
              <rect x="35" y="100" width="40" height="20" rx="10" fill="#f43f5e" transform="rotate(-10 55 110)" />
              <rect x="125" y="100" width="40" height="20" rx="10" fill="#f43f5e" transform="rotate(10 145 110)" />
              {/* Legs */}
              <rect x="80" y="135" width="15" height="40" rx="7" fill="#e11d48" />
              <rect x="105" y="135" width="15" height="40" rx="7" fill="#e11d48" />
              {/* Face - thoughtful eyes */}
              <circle cx="93" cy="55" r="2.5" fill="white" />
              <circle cx="107" cy="55" r="2.5" fill="white" />
              {/* Face - concerned mouth */}
              <path d="M 93 62 Q 100 61 107 62" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Question mark bubble */}
              <text x="130" y="40" fontSize="20" fill="#f43f5e" fontWeight="bold">?</text>
            </svg>

            <h3 className="text-2xl font-bold text-slate-900 mb-1">Forgot Your Password?</h3>
            <p className="text-slate-500 text-sm font-medium">We'll help you recover your account</p>
          </div>
        </div>

      </div>
    </div>
  );
}