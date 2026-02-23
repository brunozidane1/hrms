'use client';

import React from 'react';
import { CalendarDays, ClipboardCheck, AlarmClock, FileText, UserCheck, Plus, ChevronRight } from 'lucide-react';

export default function LeaveManagementHome() {
  const modules = [
    {
      title: 'Leave Dashboard',
      desc: 'Overview of balances, pending approvals, and usage trends.',
      icon: <CalendarDays className="text-blue-600" />,
      href: '/hrms/leave/dashboard',
      color: 'blue'
    },
    {
      title: 'Leave Requests',
      desc: 'Approve, reject, and track employee leave requests.',
      icon: <ClipboardCheck className="text-emerald-600" />,
      href: '/hrms/leave/requests',
      color: 'emerald'
    },
    {
      title: 'Leave Policies',
      desc: 'Manage policy rules, accruals, and carry-forward limits.',
      icon: <FileText className="text-indigo-600" />,
      href: '/hrms/leave/policies',
      color: 'indigo'
    },
    {
      title: 'Holiday Calendar',
      desc: 'Configure public holidays and special company days.',
      icon: <AlarmClock className="text-amber-600" />,
      href: '/hrms/leave/holidays',
      color: 'amber'
    },
    {
      title: 'Leave Entitlements',
      desc: 'Define eligibility, tenure rules, and entitlement tiers.',
      icon: <UserCheck className="text-rose-600" />,
      href: '/hrms/leave/entitlements',
      color: 'rose'
    }
  ];

  return (
    <div className="p-8 max-w-350 mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leave Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Track, approve, and configure time-off policies in one place.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus size={18} /> Create Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m, idx) => (
          <a
            key={idx}
            href={m.href}
            className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-${m.color}-50 flex items-center justify-center transition-transform group-hover:rotate-6`}>
                {m.icon}
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {m.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">{m.desc}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">Open Module</span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
