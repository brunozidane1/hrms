'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, MoreHorizontal, Mail, 
  Phone, MapPin, ArrowUpDown, Download,
  UserCheck, Shield, ChevronRight, Hash
} from 'lucide-react';

export default function SovereignDirectory() {
  const [employees] = useState([
    { id: 'EMP-001', name: 'Sarah Jenkins', role: 'Senior Lead Designer', dept: 'Product', status: 'Active', email: 's.jenkins@corp.sovereign' },
    { id: 'EMP-002', name: 'Marcus Chen', role: 'DevOps Engineer', dept: 'Engineering', status: 'On Leave', email: 'm.chen@corp.sovereign' },
    { id: 'EMP-003', name: 'Alex Rivera', role: 'Head of Engineering', dept: 'Engineering', status: 'Active', email: 'a.rivera@corp.sovereign' },
  ]);

  return (
    <div className="fun-page directory-fun p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <style>{`
        .directory-fun .fun-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #7a6bff, #ff7ab6, #00c2ff);
          box-shadow: 0 8px 16px rgba(122,107,255,0.25);
        }
        .directory-fun .card-mix {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.98), rgba(242,234,255,0.9), rgba(231,249,255,0.9));
          border: 1px solid rgba(126,108,255,0.25);
          box-shadow: 0 16px 30px rgba(98,83,255,0.12);
        }
      `}</style>
      <div className="relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute -top-10 right-6 h-36 w-36 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute top-20 right-0 h-28 w-28 rounded-full bg-amber-300/30 blur-3xl" />
      </div>
      
      {/* 1. System Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="fun-chip">Directory</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Global <span className="text-slate-300 font-light">Directory</span></h1>
        </div>
        
        <div className="flex gap-3">
          <button className="h-11 px-5 border border-violet-200 rounded-xl text-[10px] font-black tracking-widest hover:bg-white transition-all uppercase flex items-center gap-2 bg-white/80">
            <Download size={14}/> Export CSV
          </button>
          <button className="h-11 px-5 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-xl text-[10px] font-black tracking-widest hover:opacity-90 transition-all uppercase shadow-lg">
            Deploy New Entry
          </button>
        </div>
      </div>

      {/* 2. Command Strip (Filters) */}
      <div className="mb-8 flex flex-wrap items-center gap-4 p-2 card-mix rounded-2xl">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="SEARCH BY NAME, ID, OR KEYWORD..." 
            className="w-full pl-12 pr-4 py-3 bg-white/90 border border-violet-200 rounded-xl text-[10px] font-black tracking-widest outline-none focus:border-violet-400 transition-all"
          />
        </div>
        
        <div className="h-8 w-px bg-slate-200 hidden lg:block" />

        <select className="bg-white/90 border border-violet-200 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest uppercase outline-none focus:border-violet-400 appearance-none min-w-[160px]">
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Product</option>
        </select>

        <select className="bg-white/90 border border-violet-200 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest uppercase outline-none focus:border-violet-400 appearance-none min-w-[160px]">
          <option>Full-Time</option>
          <option>Contract</option>
          <option>Remote</option>
        </select>

        <button className="p-3 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-xl hover:scale-105 transition-transform shadow-lg">
          <Filter size={18} />
        </button>
      </div>

      {/* 3. The Ledger (Table) */}
      <div className="card-mix rounded-4xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
              <tr className="border-b border-violet-100/60 bg-white/70">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">ID <ArrowUpDown size={12}/></div>
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Employee</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {employees.map((emp, idx) => (
              <tr key={emp.id} className="group hover:bg-violet-50/40 transition-colors">
                <td className="px-8 py-6">
                  <span className="text-[11px] font-black text-slate-900 font-mono tracking-tighter bg-slate-100 px-2 py-1 rounded">
                    {emp.id}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black text-white ${
                      idx % 3 === 0
                        ? 'bg-linear-to-br from-violet-600 to-fuchsia-500'
                        : idx % 3 === 1
                          ? 'bg-linear-to-br from-cyan-500 to-blue-600'
                          : 'bg-linear-to-br from-amber-400 to-rose-500'
                    }`}>
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{emp.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{emp.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-slate-300" />
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{emp.dept}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                    emp.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    <div className={`h-1 w-1 rounded-full ${emp.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                    {emp.status}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-violet-200 transition-all">
                      <Mail size={16} className="text-slate-400 hover:text-slate-950" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-violet-200 transition-all">
                      <ChevronRight size={18} className="text-slate-400 hover:text-slate-950" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Footer */}
        <div className="px-8 py-6 bg-white/70 border-t border-violet-100/60 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 3 of 142 Personnel</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-violet-200 rounded-lg text-[10px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase bg-white/80">Prev</button>
            <button className="px-4 py-2 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}