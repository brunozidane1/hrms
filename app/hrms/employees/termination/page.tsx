'use client';

import { useState } from 'react';
import { 
  Search, 
  Calendar, 
  CheckSquare, 
  ArrowRight,
  ShieldAlert,
  Trash2,
  Lock,
  ChevronLeft
} from 'lucide-react';

export default function SovereignTermination() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employeeId: '',
    terminationDate: '',
    reason: 'Resignation',
    noticeServed: true,
    assetsReturned: {
      laptop: false,
      accessCard: false,
      emailDisabled: false
    }
  });

  const employees = [
    { id: 'EMP-001', name: 'Sarah Jenkins', dept: 'Product' },
    { id: 'EMP-004', name: 'Robert Fox', dept: 'Engineering' },
  ];

  const handleTermination = (e: React.FormEvent) => {
    e.preventDefault();
    // Protocol Execution Logic
  };

  return (
    <div className="p-3 lg:p-5 max-w-300 mx-auto animate-in fade-in duration-700">
      
      {/* 1. Protocol Header */}
      <div className="mb-7 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-rose-600 uppercase">System // Offboarding</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Exit <span className="text-slate-300 font-light italic">Management</span></h1>
        </div>
      </div>

      {/* 2. Critical Warning Banner */}
      <div className="mb-7 p-4 bg-white border-2 border-rose-100 rounded-4xl flex flex-col md:flex-row gap-3 items-center shadow-[0_20px_40px_rgba(225,29,72,0.05)]">
        <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-200">
          <ShieldAlert size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-[9px] font-black text-rose-600 uppercase tracking-[0.2em] mb-1">Critical Action Protocol</h4>
          <p className="text-[11px] font-bold text-slate-900 leading-relaxed max-w-2xl">
            Termination actions are permanent and trigger immediate legal, financial, and access-revocation sequences. 
            Ensure all mandatory exit documentation is archived.
          </p>
        </div>
        <button className="px-4 py-2 border border-rose-200 rounded-xl text-[8px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 transition-all">
          View Legal Policy
        </button>
      </div>

      <form onSubmit={handleTermination} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Progress Tracker (Left) */}
        <div className="lg:col-span-3 space-y-3">
           {[
             { id: 1, label: 'Offboard Logic', desc: 'Identify & Reason' },
             { id: 2, label: 'Asset Purge', desc: 'Hardware & Access' }
           ].map((s) => (
             <div key={s.id} className={`p-3.5 rounded-2xl border transition-all duration-500 ${step === s.id ? 'bg-slate-950 border-slate-950 text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400'}`}>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Step 0{s.id}</p>
               <p className="text-[11px] font-black uppercase tracking-tight">{s.label}</p>
             </div>
           ))}
        </div>

        {/* Main Terminal Area (Right) */}
        <div className="lg:col-span-9">
          <div className="bg-white border border-slate-100 rounded-4xl shadow-sm overflow-hidden flex flex-col min-h-125">
            
            <div className="flex-1 p-4 lg:p-5">
              {step === 1 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Employee Identity */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Personnel</label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <select 
                          value={formData.employeeId}
                          onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                          className="w-full pl-11 pr-3 py-3 bg-slate-50 border-none ring-1 ring-slate-100 rounded-2xl focus:ring-1 focus:ring-slate-950 transition-all outline-none text-[11px] font-black uppercase tracking-widest appearance-none"
                        >
                          <option value="">Scan personnel...</option>
                          {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{emp.name} — {emp.id}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Terminal Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="date"
                          value={formData.terminationDate}
                          onChange={(e) => setFormData({...formData, terminationDate: e.target.value})}
                          className="w-full pl-11 pr-3 py-3 bg-slate-50 border-none ring-1 ring-slate-100 rounded-2xl focus:ring-1 focus:ring-slate-950 transition-all outline-none text-[11px] font-black"
                        />
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Logic Type</label>
                      <select 
                        value={formData.reason}
                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border-none ring-1 ring-slate-100 rounded-2xl focus:ring-1 focus:ring-slate-950 transition-all outline-none text-[11px] font-black uppercase tracking-widest appearance-none"
                      >
                        <option>Resignation</option>
                        <option>Performance Based</option>
                        <option>Contract End</option>
                        <option>Redundancy</option>
                        <option>Misconduct</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl h-fit self-end group cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                       <input 
                        type="checkbox" 
                        checked={formData.noticeServed}
                        onChange={(e) => setFormData({...formData, noticeServed: e.target.checked})}
                        className="w-4 h-4 accent-slate-950 rounded border-slate-300" 
                       />
                       <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Notice Period Verified</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
                      <CheckSquare size={18} className="text-rose-600" />
                      Asset & Access Purge
                    </h3>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verification Required</span>
                  </div>
                  
                  <div className="grid gap-4">
                    <SovereignCheckItem 
                      label="IT Hardware Recovery" 
                      sub="Laptop, monitor, peripherals"
                      checked={formData.assetsReturned.laptop}
                      onChange={() => setFormData({
                        ...formData, 
                        assetsReturned: {...formData.assetsReturned, laptop: !formData.assetsReturned.laptop}
                      })}
                    />
                    <SovereignCheckItem 
                      label="Security Clearance Recovery" 
                      sub="Access cards, office keys, fobs"
                      checked={formData.assetsReturned.accessCard}
                      onChange={() => setFormData({
                        ...formData, 
                        assetsReturned: {...formData.assetsReturned, accessCard: !formData.assetsReturned.accessCard}
                      })}
                    />
                    <SovereignCheckItem 
                      label="System Privileges Revocation" 
                      sub="Email, Slack, VPN, and Admin access"
                      checked={formData.assetsReturned.emailDisabled}
                      onChange={() => setFormData({
                        ...formData, 
                        assetsReturned: {...formData.assetsReturned, emailDisabled: !formData.assetsReturned.emailDisabled}
                      })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              {step === 1 ? (
                <div />
              ) : (
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-[9px] font-black text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-widest"
                >
                  <ChevronLeft size={14} /> Back to Logic
                </button>
              )}
              
              {step === 1 ? (
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.employeeId}
                  className="flex items-center gap-2.5 px-6 py-3 bg-slate-950 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-30 disabled:grayscale"
                >
                  Initiate Purge <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  type="submit"
                  className="flex items-center gap-2.5 px-6 py-3 bg-rose-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-rose-700 transition-all shadow-xl shadow-rose-100"
                >
                  Execute Termination <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function SovereignCheckItem({ label, sub, checked, onChange }: any) {
  return (
    <div 
      onClick={onChange}
      className={`group flex items-center justify-between p-3.5 rounded-4xl border cursor-pointer transition-all duration-300 ${
        checked ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100 hover:border-slate-300'
      }`}
    >
      <div>
        <span className={`text-[11px] font-black uppercase tracking-tight block ${checked ? 'text-emerald-700' : 'text-slate-900'}`}>{label}</span>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{sub}</span>
      </div>
      <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
        checked ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' : 'border-slate-100 bg-slate-50'
      }`}>
        {checked ? <CheckSquare size={14} /> : <Lock size={13} className="text-slate-300" />}
      </div>
    </div>
  );
}