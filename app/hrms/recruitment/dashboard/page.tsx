'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Calendar, 
  Clock, 
  ChevronRight,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function RecruitmentDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulated Dashboard Data
  const stats = [
    { label: 'Open Positions', value: 24, trend: '+3', up: true, icon: <Briefcase className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Total Applicants', value: 1248, trend: '+12%', up: true, icon: <Users className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Interviews', value: 42, trend: '-2', up: false, icon: <Calendar className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'Time to Hire', value: '18d', trend: '-4d', up: true, icon: <Clock className="text-purple-600" />, bg: 'bg-purple-50' },
  ];

  const funnelData = [
    { stage: 'Sourced', count: 1248, color: 'bg-blue-500' },
    { stage: 'Applied', count: 850, color: 'bg-indigo-500' },
    { stage: 'Screening', count: 420, color: 'bg-violet-500' },
    { stage: 'Interview', count: 124, color: 'bg-purple-500' },
    { stage: 'Offer', count: 32, color: 'bg-fuchsia-500' },
    { stage: 'Hired', count: 18, color: 'bg-pink-500' },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  return (
    <div className="fun-page p-8 max-w-400 mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recruitment Analytics</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            Real-time hiring pipeline performance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{isLoading ? '...' : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recruitment Funnel Visualization */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900">Conversion Funnel</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Last 30 Days</span>
          </div>
          
          

          <div className="space-y-5">
            {funnelData.map((item, i) => {
              const maxWidth = (item.count / funnelData[0].count) * 100;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-600">{item.stage}</span>
                    <span className="text-slate-900">{isLoading ? '0' : item.count}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: isLoading ? '0%' : `${maxWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actionable Tasks / Feed */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
          <h3 className="text-xl font-black mb-6">Upcoming Interviews</h3>
          <div className="space-y-6">
            <InterviewItem name="Alex Rivera" role="Senior UX Designer" time="10:30 AM" />
            <InterviewItem name="Sarah Chen" role="Backend Engineer" time="1:00 PM" />
            <InterviewItem name="Marcus Todd" role="Product Manager" time="4:15 PM" />
            
            <button className="w-full mt-4 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
              View Full Schedule <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Team Workload</h4>
              <MoreVertical size={16} className="text-slate-500" />
            </div>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                  HR
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                +2
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Your recruitment team is at <span className="text-white font-bold">82% capacity</span> this week. Consider redistributing 4 screening tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterviewItem({ name, role, time }: { name: string, role: string, time: string }) {
  return (
    <div className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-[11px] text-slate-400">{role}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-blue-400">{time}</p>
        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Today</p>
      </div>
    </div>
  );
}