'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  Search, 
  Clock, 
  Wallet, 
  TrendingUp, 
  ChevronRight,
  Bell,
  ArrowUpRight
} from 'lucide-react';

export default function HRMSHome() {
  const modules = [
    { 
      title: "Dashboard Overview", 
      desc: "Analytics, workforce trends, and active headcounts.", 
      icon: <LayoutDashboard className="text-blue-600" />, 
      href: "/hrms/dashboard",
      stats: "12 New Reports"
    },
    { 
      title: "Employee Directory", 
      desc: "Onboarding, life-cycle, and organizational charts.", 
      icon: <Users className="text-indigo-600" />, 
      href: "/hrms/employees",
      stats: "482 Active"
    },
    { 
      title: "Self-Service Hub", 
      desc: "Leaves, documents, and personal profile updates.", 
      icon: <UserCircle className="text-emerald-600" />, 
      href: "/hrms/self-service",
      stats: "3 Pending Requests"
    },
    { 
      title: "Talent Acquisition", 
      desc: "ATS, job postings, and candidate pipeline.", 
      icon: <Search className="text-purple-600" />, 
      href: "/hrms/recruitment",
      stats: "14 Open Roles"
    },
    { 
      title: "Time & Attendance", 
      desc: "Shift scheduling, clock-ins, and overtime logs.", 
      icon: <Clock className="text-amber-600" />, 
      href: "/hrms/attendance",
      stats: "98% On Time"
    },
    { 
      title: "Payroll & Benefits", 
      desc: "Compensations, tax filing, and bonus cycles.", 
      icon: <Wallet className="text-rose-600" />, 
      href: "/hrms/payroll",
      stats: "Next: Mar 01"
    },
    { 
      title: "Performance", 
      desc: "OKRs, 360° feedback, and skill matrices.", 
      icon: <TrendingUp className="text-cyan-600" />, 
      href: "/hrms/performance",
      stats: "Review Cycle Live"
    },
  ];

  return (
    <div className="fun-page min-h-screen bg-gray-50/50 p-6 md:p-10 animate-in fade-in duration-700">
      {/* Top Navigation / Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Good Morning, <span className="text-blue-600">HR Admin</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Here's what's happening across the organization today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-10 w-px bg-gray-200 mx-2 hidden md:block"></div>
          <div className="flex items-center gap-3 bg-white p-1.5 pr-4 border border-gray-200 rounded-2xl shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs">AD</div>
            <span className="text-sm font-bold text-gray-700">Admin Panel</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left: Module Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((module, idx) => (
            <a 
              key={idx} 
              href={module.href}
              className="group relative bg-white p-6 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Decorative Background Blur */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {module.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {module.desc}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {module.stats}
                </span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          ))}
        </div>

        {/* Right Sidebar: Quick Insights & Actions */}
        <aside className="space-y-6">
          <div className="bg-gray-900 rounded-4xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Quick Insights</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-bold">94%</p>
                  <p className="text-xs text-gray-400 mt-1">Employee Engagement Score</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-gray-400 mt-1">New Hires this month</p>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                Generate Report <ArrowUpRight size={16} />
              </button>
            </div>
            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500/20 blur-[80px]"></div>
          </div>

          <div className="bg-white border border-gray-100 rounded-4xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Upcoming Events</h4>
            <div className="space-y-4">
              <EventItem title="Product Demo" time="10:00 AM" date="Today" color="bg-blue-500" />
              <EventItem title="HR Sync" time="02:30 PM" date="Today" color="bg-purple-500" />
              <EventItem title="Offboarding" time="09:00 AM" date="Tomorrow" color="bg-rose-500" />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

function EventItem({ title, time, date, color }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={`w-1 h-8 rounded-full ${color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
      <div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        <p className="text-[11px] text-gray-500">{date} • {time}</p>
      </div>
    </div>
  );
}