'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Award, 
  ChevronRight, 
  AlertCircle,
  Filter,
  Download,
  Search,
  Zap
} from 'lucide-react';

export default function PerformanceDashboard() {
  const [loading, setLoading] = useState(true);

  // Mock Performance Data
  const metrics = [
    { label: 'Strategic OKRs', value: '42', sub: 'Q1 2026 Focus', icon: <Target className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Avg. Completion', value: '64%', sub: '+12% vs last month', icon: <TrendingUp className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Pending Reviews', value: '128', sub: 'Deadline in 12 days', icon: <MessageSquare className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Recognition', value: '854', sub: 'Peer shoutouts', icon: <Award className="text-purple-600" />, bg: 'bg-purple-50' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fun-page p-8 max-w-400 mx-auto animate-in fade-in duration-700">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance Intelligence</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
            <Zap size={16} className="text-amber-500 fill-amber-500" />
            Active Review Cycle: Annual Appraisal 2026
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search employee..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={20} className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 rounded-2xl ${m.bg}`}>
                {m.icon}
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
            <p className="text-3xl font-black text-slate-900">{loading ? '...' : m.value}</p>
            <p className="text-sm font-bold text-slate-800 mt-1">{m.label}</p>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* OKR Tracking Visualization */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900">Departmental Alignment</h3>
            <select className="bg-slate-50 border-none text-xs font-bold rounded-lg px-3 py-2 outline-none">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Design</option>
            </select>
          </div>

          

          <div className="space-y-6">
            <DepartmentProgress dept="Engineering" progress={82} color="bg-blue-500" />
            <DepartmentProgress dept="Product" progress={64} color="bg-purple-500" />
            <DepartmentProgress dept="Sales" progress={45} color="bg-emerald-500" />
            <DepartmentProgress dept="Operations" progress={28} color="bg-amber-500" />
          </div>
        </div>

        {/* Culture & Review Pipeline */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-6">Review Pipeline</h3>
              <div className="space-y-5">
                <StatusRow label="Self Assessment" val="88%" active />
                <StatusRow label="Manager Review" val="42%" active />
                <StatusRow label="Final Calibration" val="0%" />
              </div>
              <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-white/5">
                Send Reminders <AlertCircle size={16} />
              </button>
            </div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Recent Kudos</h4>
            <div className="space-y-5">
              <KudosItem name="Sarah J." msg="Incredible job on the Q1 launch!" color="bg-amber-100" />
              <KudosItem name="Mike T." msg="Always helping the junior devs." color="bg-blue-100" />
              <KudosItem name="Elena R." msg="Top-tier documentation." color="bg-emerald-100" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function DepartmentProgress({ dept, progress, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-slate-700">{dept}</span>
        <span className="text-sm font-black text-slate-900">{progress}%</span>
      </div>
      <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function StatusRow({ label, val, active }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-500'}`}>{label}</span>
      <span className={`text-sm font-black ${active ? 'text-blue-400' : 'text-slate-600'}`}>{val}</span>
    </div>
  );
}

function KudosItem({ name, msg, color }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-8 h-8 rounded-full ${color} shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-600`}>
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-900">{name}</p>
        <p className="text-[11px] text-slate-500 italic mt-0.5 leading-tight">"{msg}"</p>
      </div>
    </div>
  );
}