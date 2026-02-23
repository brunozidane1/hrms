'use client';

import React, { useState } from 'react';
import { 
  Users, 
  UserMinus, 
  Clock, 
  Coffee, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  MoreHorizontal,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AttendanceDashboard() {
  const [view, setView] = useState('Today');

  // Mock Live Stats
  const metrics = [
    { label: 'Present', value: '412', total: '450', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Users size={20} /> },
    { label: 'Absent', value: '12', total: '450', color: 'text-rose-600', bg: 'bg-rose-50', icon: <UserMinus size={20} /> },
    { label: 'Late', value: '26', total: '412', color: 'text-amber-600', bg: 'bg-amber-50', icon: <Clock size={20} /> },
    { label: 'On Leave', value: '26', total: '450', color: 'text-blue-600', bg: 'bg-blue-50', icon: <Coffee size={20} /> },
  ];

  return (
    <div className="p-8 max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      {/* Header with Quick Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Attendance Oversight</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Live Updates: Last sync 2 minutes ago
          </p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {['Today', 'Weekly', 'Monthly'].map((period) => (
            <button
              key={period}
              onClick={() => setView(period)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                view === period ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 rounded-2xl ${m.bg} ${m.color} transition-transform group-hover:scale-110`}>
                {m.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs font-black ${m.color}`}>
                  {((parseInt(m.value) / parseInt(m.total)) * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">of total</span>
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{m.value}</p>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Trend Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">Attendance Velocity</h3>
              <p className="text-sm text-slate-500 font-medium">Weekly percentage trend</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <Calendar className="text-slate-400" size={20} />
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[94, 98, 85, 92, 96, 70, 0].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <div className="relative w-full group">
                  <div 
                    className={`w-full rounded-t-2xl transition-all duration-1000 ${val < 90 ? 'bg-rose-400' : 'bg-blue-500'}`}
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {val}%
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Incident Log */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">Real-time Log</h3>
          <div className="space-y-6">
            <LogItem 
              name="Robert Fox" 
              action="Late Arrival" 
              time="09:42 AM" 
              status="Warning" 
              icon={<Clock size={14} className="text-amber-500" />} 
              dotColor="bg-amber-500" 
            />
            <LogItem 
              name="Jane Cooper" 
              action="Early Leave" 
              time="03:15 PM" 
              status="Approved" 
              icon={<AlertCircle size={14} className="text-blue-500" />} 
              dotColor="bg-blue-500" 
            />
            <LogItem 
              name="Cody Fisher" 
              action="Check-in" 
              time="08:55 AM" 
              status="On-time" 
              icon={<CheckCircle2 size={14} className="text-emerald-500" />} 
              dotColor="bg-emerald-500" 
            />
             <LogItem 
              name="Guy Hawkins" 
              action="Unplanned" 
              time="--:--" 
              status="Absent" 
              icon={<UserMinus size={14} className="text-rose-500" />} 
              dotColor="bg-rose-500" 
            />
          </div>
          
          <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-sm font-bold text-slate-600 transition-all">
            View Full Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
}

function LogItem({ name, action, time, status, icon, dotColor }: any) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            {icon} {action} • {time}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{status}</span>
      </div>
    </div>
  );
}