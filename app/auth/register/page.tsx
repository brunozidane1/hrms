'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Fingerprint,
  Building2
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/login');
    }, 2000);
  };

  return (
    <div className="fun-page min-h-screen bg-slate-50 flex items-center justify-center p-0 lg:p-8 font-sans">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-blue-100 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-275 min-h-175 grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-200 rounded-none lg:rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 flex flex-col justify-center p-8 lg:p-16">
          <div className="max-w-105 mx-auto w-full">
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Fingerprint className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">HR<span className="text-blue-600">CORE</span></span>
            </div>

            {/* Progress Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-100'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-100'}`} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-5">
                  <header>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Personal Details</h1>
                    <p className="text-slate-500 text-sm font-medium">Let's start with your basic information.</p>
                  </header>

                  <div className="space-y-4">
                    <InputGroup label="Full Name" icon={<User size={18}/>}>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </InputGroup>

                    <InputGroup label="Work Email" icon={<Mail size={18}/>}>
                      <input 
                        required
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </InputGroup>
                  </div>

                  <button 
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]"
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-5">
                  <header>
                    <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase mb-4 transition-colors">
                      <ChevronLeft size={14} /> Back
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Secure Account</h1>
                    <p className="text-slate-500 text-sm font-medium">Set your credentials to access the portal.</p>
                  </header>

                  <div className="space-y-4">
                    <div className="relative group">
                      <Lock className="absolute left-4 top-11.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <InputGroup label="Password">
                        <input 
                          required
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-11.5 text-slate-400">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </InputGroup>
                    </div>

                    <InputGroup label="Confirm Password" icon={<CheckCircle2 size={18}/>}>
                      <input 
                        required
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </InputGroup>
                  </div>

                  <button 
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Complete Registration"}
                  </button>
                </div>
              )}
            </form>

            <p className="mt-10 text-center text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-linear-to-br from-emerald-50 via-slate-50 to-teal-50 flex-col items-center justify-center p-12 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* SVG Illustration */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="mb-6 drop-shadow-lg">
              {/* Character body */}
              <circle cx="100" cy="60" r="25" fill="#10b981" />
              {/* Head shine */}
              <circle cx="95" cy="45" r="8" fill="#34d399" opacity="0.6" />
              {/* Body */}
              <rect x="75" y="90" width="50" height="45" rx="8" fill="#059669" />
              {/* Arms raised */}
              <rect x="30" y="80" width="42" height="22" rx="11" fill="#10b981" transform="rotate(-35 51 91)" />
              <rect x="128" y="80" width="42" height="22" rx="11" fill="#10b981" transform="rotate(35 149 91)" />
              {/* Legs */}
              <rect x="80" y="135" width="15" height="40" rx="7" fill="#059669" />
              <rect x="105" y="135" width="15" height="40" rx="7" fill="#059669" />
              {/* Face - Eyes happy */}
              <circle cx="93" cy="55" r="2.5" fill="white" />
              <circle cx="107" cy="55" r="2.5" fill="white" />
              {/* Face - Happy smile */}
              <path d="M 93 62 Q 100 65 107 62" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>

            <h3 className="text-2xl font-bold text-slate-900 mb-1">Join Our Team!</h3>
            <p className="text-slate-500 text-sm font-medium">Create your account in seconds</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function InputGroup({ label, icon, children }: any) {
  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">{icon}</div>}
        {children}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-sm">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">{icon}</div>
      <h4 className="text-slate-900 font-bold mb-1">{title}</h4>
      <p className="text-slate-500 text-xs leading-relaxed font-medium">{desc}</p>
    </div>
  );
}