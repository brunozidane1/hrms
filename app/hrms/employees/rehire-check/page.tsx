'use client';

import { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  History, 
  AlertOctagon, 
  CheckCircle, 
  Info,
  ArrowRight,
  ShieldCheck,
  UserX,
  Database,
  Fingerprint,
  Activity
} from 'lucide-react';

// Mock database of former employees
const FORMER_EMPLOYEES = [
  { id: 'EMP-009', name: 'John Doe', dept: 'Marketing', exitDate: '2024-05-12', status: 'Eligible', reason: 'Resignation', rating: 'A+' },
  { id: 'EMP-014', name: 'Jane Smith', dept: 'Engineering', exitDate: '2023-11-20', status: 'Review Required', reason: 'Contract Expired', rating: 'B' },
  { id: 'EMP-022', name: 'Mark Miller', dept: 'Sales', exitDate: '2025-01-15', status: 'Ineligible', reason: 'Policy Violation', rating: 'F' },
];

export default function SovereignRehireCheck() {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const found = FORMER_EMPLOYEES.find(emp => 
      emp.name.toLowerCase().includes(val.toLowerCase()) || 
      emp.id.toLowerCase().includes(val.toLowerCase())
    );
    setSelectedUser(val ? found : null);
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto animate-in fade-in duration-700">
      
      {/* 1. Header & System Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Archive // Verification</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Rehire <span className="text-slate-300 font-light not-italic">Protocol</span></h1>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl">
          <Database size={14} className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">12.4k Records Indexed</span>
        </div>
      </div>

      {/* 2. Search Interface */}
      <div className="relative mb-12 group">
        <div className="absolute inset-0 bg-blue-600/5 blur-3xl group-focus-within:bg-blue-600/10 transition-all duration-500" />
        <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4 px-6">
            <Fingerprint className="text-slate-900" size={24} />
            <input 
              type="text" 
              placeholder="Query Name or Employee Identity Number..." 
              value={query}
              onChange={handleSearch}
              className="w-full py-6 bg-transparent border-none focus:ring-0 text-lg font-bold text-slate-900 placeholder:text-slate-300 outline-none"
            />
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400">
              <span className="border border-slate-200 bg-white px-1 rounded shadow-sm">⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Dynamic Results Area */}
      {selectedUser ? (
        <div className="animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden">
            {/* Status Header */}
            <div className={`h-2 w-full ${
              selectedUser.status === 'Eligible' ? 'bg-emerald-500' : 
              selectedUser.status === 'Ineligible' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            
            <div className="p-10 lg:p-14">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-slate-950 flex items-center justify-center text-3xl font-black text-white shadow-2xl rotate-3">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight italic">{selectedUser.name}</h2>
                    <div className="flex items-center gap-3">
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedUser.id}</span>
                       <div className="w-1 h-1 rounded-full bg-slate-200" />
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{selectedUser.dept}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <StatusBadge status={selectedUser.status} />
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reason Code:</span>
                       <span className="text-[9px] font-black text-slate-950 uppercase tracking-widest">{selectedUser.reason}</span>
                    </div>
                </div>
              </div>

              {/* Data Visualization Grid */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <DossierCard 
                  icon={<Activity size={18} className="text-blue-500" />}
                  label="Performance Tier"
                  value={selectedUser.rating}
                  desc="Consistently ranked in top 5% of department performance during tenure."
                />
                <DossierCard 
                  icon={<History size={18} className="text-slate-950" />}
                  label="Exit Sequence"
                  value={selectedUser.exitDate}
                  desc="Formal resignation with 30-day notice period fully satisfied."
                />
                <DossierCard 
                  icon={<ShieldCheck size={18} className="text-emerald-500" />}
                  label="Legal Clearance"
                  value="Verified"
                  desc="IP protection agreements signed. No non-compete violations logged."
                />
              </div>

              {/* Final Actions */}
              <div className="mt-14 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                    <Info size={18} />
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                    Personnel files are encrypted. <br/>Viewing full records requires <span className="text-slate-950">Bio-Auth</span>.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all">
                    Full Dossier
                  </button>
                  <button 
                    disabled={selectedUser.status === 'Ineligible'}
                    className="flex-1 md:flex-none flex items-center justify-center gap-4 px-12 py-5 bg-slate-950 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-30 disabled:grayscale"
                  >
                    Initiate Recovery <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : query !== '' ? (
        <div className="text-center py-24 bg-white border-4 border-dashed border-slate-50 rounded-[4rem] animate-in zoom-in-95">
            <AlertOctagon size={64} className="mx-auto text-slate-100 mb-6" />
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Zero <span className="text-slate-300 font-light not-italic">Matches</span></h4>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">The subject "{query}" does not exist in our historical sync.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HelpCard 
            icon={<CheckCircle className="text-emerald-500" />} 
            title="Green / Eligible" 
            text="Immediate re-onboarding permitted. All exit protocols were satisfied." 
          />
          <HelpCard 
            icon={<Info className="text-amber-500" />} 
            title="Amber / Review" 
            text="Manual verification of exit interviews or manager feedback required." 
          />
          <HelpCard 
            icon={<UserX className="text-rose-500" />} 
            title="Red / Restricted" 
            text="System lockout active. Subject is blacklisted from future recruitment." 
          />
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    'Eligible': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Ineligible': 'bg-rose-50 text-rose-700 border-rose-100',
    'Review Required': 'bg-amber-50 text-amber-700 border-amber-100',
  };

  return (
    <div className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-sm ${styles[status]}`}>
      <div className={`w-2 h-2 rounded-full animate-pulse ${
        status === 'Eligible' ? 'bg-emerald-500' : status === 'Ineligible' ? 'bg-rose-500' : 'bg-amber-500'
      }`} />
      {status}
    </div>
  );
}

function DossierCard({ icon, label, value, desc }: any) {
  return (
    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
          <span className="text-lg font-black text-slate-900 uppercase tracking-tight">{value}</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">{desc}</p>
    </div>
  );
}

function HelpCard({ icon, title, text }: any) {
  return (
    <div className="p-10 bg-white border border-slate-50 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-700 group">
      <div className="mb-8 w-12 h-12 rounded-[1.25rem] bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-3">{title}</h4>
      <p className="text-[12px] text-slate-400 font-medium leading-relaxed">{text}</p>
    </div>
  );
}