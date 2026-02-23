'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Calendar,
  AlertCircle,
  TrendingUp,
  PieChart
} from 'lucide-react';

export default function PayrollDashboard() {
  const [loading, setLoading] = useState(true);

  // Simulated live data
  const metrics = [
    { label: 'Total Gross Pay', value: '$428,500', trend: '+2.4%', up: true, icon: <DollarSign size={20} />, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Employees Paid', value: '412', trend: '+12', up: true, icon: <Users size={20} />, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { label: 'Pending Requests', value: '18', trend: '-5', up: false, icon: <Clock size={20} />, bg: 'bg-amber-50', color: 'text-amber-600' },
    { label: 'Tax Liability', value: '$84,200', trend: '+1.1%', up: true, icon: <TrendingUp size={20} />, bg: 'bg-rose-50', color: 'text-rose-600' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fun-page p-8 max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payroll Intelligence</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
            <Calendar size={16} /> Cycle: Feb 01 — Feb 28, 2026
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100 text-sm font-bold">
            <AlertCircle size={16} /> 3 Days to Cut-off
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Export Reports
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${m.bg} ${m.color}`}>
                {m.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${m.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                {m.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {m.trend}
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{m.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{loading ? '...' : m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left: Processing Timeline & Breakdown */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" /> Disbursal Timeline
            </h3>
            
            

            <div className="relative flex justify-between items-start">
              <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 z-0"></div>
              <TimelineStep label="Attendance" status="Completed" date="Feb 15" active />
              <TimelineStep label="Adjustments" status="In Progress" date="Feb 18" active />
              <TimelineStep label="Validation" status="Pending" date="Feb 22" />
              <TimelineStep label="Disbursal" status="Scheduled" date="Feb 28" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900">Cost Breakdown</h3>
              <PieChart size={20} className="text-slate-400" />
            </div>
            <div className="space-y-4">
               <CostBar label="Basic Salary" amount="$310,000" percent={72} color="bg-blue-500" />
               <CostBar label="Tax & Deductions" amount="$84,200" percent={19} color="bg-rose-500" />
               <CostBar label="Reimbursements" amount="$22,300" percent={5} color="bg-amber-500" />
               <CostBar label="Bonus & Incentives" amount="$12,000" percent={4} color="bg-emerald-500" />
            </div>
          </div>
        </div>

        {/* Right: Quick Actions & Alerts */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden">
            <h3 className="text-xl font-black mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <ActionButton label="Process Adjustments" count="12" />
              <ActionButton label="Review Reimbursements" count="6" />
              <ActionButton label="Tax Filing Status" />
            </div>
            <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Automated Alert</p>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "4 employees have missing bank details for the upcoming run. Please update before Feb 22."
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm">
             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Recent Variance</h4>
             <div className="space-y-6">
                <VarianceItem dept="Engineering" diff="+$12,400" reason="2 New Hires" up={true} />
                <VarianceItem dept="Marketing" diff="-$2,100" reason="Unpaid Leaves" up={false} />
                <VarianceItem dept="Sales" diff="+$4,500" reason="Commission" up={true} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function TimelineStep({ label, status, date, active }: any) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
        active ? 'bg-blue-600 border-white text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300'
      }`}>
        <CheckCircle2 size={16} />
      </div>
      <p className={`mt-3 text-sm font-bold ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase">{status}</p>
      <p className="text-[10px] text-blue-500 font-bold mt-1">{date}</p>
    </div>
  );
}

function CostBar({ label, amount, percent, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-900">{amount}</span>
      </div>
      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function ActionButton({ label, count }: any) {
  return (
    <button className="w-full flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 text-sm font-bold group">
      <span>{label}</span>
      {count ? (
        <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-lg">{count}</span>
      ) : (
        <ArrowUpRight size={16} className="text-slate-500 group-hover:text-blue-400" />
      )}
    </button>
  );
}

function VarianceItem({ dept, diff, reason, up }: any) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-bold text-slate-900">{dept}</p>
        <p className="text-[11px] text-slate-400 font-medium">{reason}</p>
      </div>
      <div className={`text-sm font-black ${up ? 'text-rose-500' : 'text-emerald-500'}`}>
        {diff}
      </div>
    </div>
  );
}