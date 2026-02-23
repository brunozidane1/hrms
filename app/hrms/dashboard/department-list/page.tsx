'use client';

import React from 'react';
import {
  Layers,
  Users,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight,
  Activity,
  Target,
  Zap,
  Search,
  Filter,
  TrendingUp,
  Wallet,
  Clock,
  Bell,
  CheckCircle2,
} from 'lucide-react';

type Department = {
  name: string;
  lead: string;
  headcount: number;
  growth: string;
  budget: string;
  status: string;
  openRoles: number;
  attritionRisk: 'Low' | 'Medium' | 'High';
  sparkline: number[];
};

const departments: Department[] = [
  {
    name: 'Engineering',
    lead: 'Alex Rivera',
    headcount: 42,
    growth: '+12%',
    budget: '84%',
    status: 'High Velocity',
    openRoles: 6,
    attritionRisk: 'Low',
    sparkline: [30, 45, 32, 60, 85, 40, 90],
  },
  {
    name: 'Product Design',
    lead: 'Sarah Jenkins',
    headcount: 12,
    growth: '+4%',
    budget: '92%',
    status: 'Stable',
    openRoles: 2,
    attritionRisk: 'Low',
    sparkline: [20, 25, 22, 30, 28, 35, 32],
  },
  {
    name: 'Growth & Marketing',
    lead: 'Marcus Chen',
    headcount: 28,
    growth: '+18%',
    budget: '71%',
    status: 'Scaling',
    openRoles: 4,
    attritionRisk: 'Medium',
    sparkline: [40, 50, 65, 55, 80, 95, 100],
  },
  {
    name: 'Finance',
    lead: 'Nina Patel',
    headcount: 16,
    growth: '+3%',
    budget: '88%',
    status: 'Controlled',
    openRoles: 1,
    attritionRisk: 'Low',
    sparkline: [35, 38, 40, 36, 39, 42, 44],
  },
  {
    name: 'People Operations',
    lead: 'Alicia Vane',
    headcount: 14,
    growth: '+7%',
    budget: '76%',
    status: 'Balanced',
    openRoles: 3,
    attritionRisk: 'Medium',
    sparkline: [28, 34, 38, 40, 36, 45, 48],
  },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const getRiskStyle = (risk: Department['attritionRisk']) => {
  if (risk === 'High') return 'bg-rose-50 text-rose-700 border-rose-200';
  if (risk === 'Medium') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-emerald-50 text-emerald-700 border-emerald-200';
};

export default function SovereignDepartments() {
  const totalHeadcount = departments.reduce((sum, item) => sum + item.headcount, 0);

  return (
    <div className="fun-page dept-fun min-h-screen bg-[#F0F2F5] p-4 lg:p-8 font-sans text-slate-900">
      <style>{`
        .dept-fun .card-mix {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.98), rgba(242,234,255,0.9), rgba(231,249,255,0.9));
          border: 1px solid rgba(126,108,255,0.25);
          box-shadow: 0 16px 30px rgba(98,83,255,0.12);
        }
        .dept-fun .card-mix::after {
          content: '';
          position: absolute;
          top: -55px;
          right: -35px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle at top, rgba(255,122,182,0.35), rgba(122,107,255,0.18), transparent 70%);
          pointer-events: none;
        }
        .dept-fun .fun-chip {
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
      `}</style>
      <div className="relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute -top-10 right-6 h-36 w-36 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute top-20 right-0 h-28 w-28 rounded-full bg-amber-300/30 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto space-y-5 animate-in fade-in duration-500">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="fun-chip">Departments</span>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Department Matrix <span className="text-slate-400 font-light italic">Control</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Live capacity, workforce movement, and utilization by department.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900" size={14} />
              <input
                type="text"
                placeholder="Search departments"
                className="pl-9 pr-3 py-2.5 w-52 sm:w-64 rounded-xl border border-slate-200 bg-white text-[11px] font-semibold outline-none focus:border-slate-900 transition-all"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <Filter size={15} className="text-slate-900" />
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 h-10 px-3 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-xl text-[10px] font-black tracking-wider uppercase hover:opacity-90 transition-all shadow-lg">
              <Layers size={13} /> Create
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total Headcount', value: totalHeadcount.toString(), sub: 'Across all units', icon: Users, tone: 'from-violet-50 via-white to-cyan-50', badge: 'Live' },
            { label: 'Open Positions', value: '16', sub: 'Hiring active', icon: Target, tone: 'from-amber-50 via-white to-rose-50', badge: 'Hiring' },
            { label: 'Avg Utilization', value: '82%', sub: 'Budget allocation', icon: Wallet, tone: 'from-emerald-50 via-white to-lime-50', badge: 'Stable' },
            { label: 'Critical Alerts', value: '5', sub: 'Needs action', icon: Bell, tone: 'from-fuchsia-50 via-white to-violet-50', badge: 'Watch' },
          ].map((kpi) => (
            <div key={kpi.label} className={`card-mix p-3 rounded-2xl bg-linear-to-br ${kpi.tone}`}>
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-white/80 border border-violet-100/70 text-slate-700">
                  <kpi.icon size={14} />
                </div>
                <span className="fun-chip">{kpi.badge}</span>
              </div>
              <p className="mt-2 text-lg font-black text-slate-900">{kpi.value}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</p>
              <p className="text-[9px] text-slate-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="group card-mix rounded-3xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-200 via-fuchsia-200 to-cyan-200 flex items-center justify-center text-slate-700 group-hover:text-slate-900 transition-all">
                      <Activity size={16} />
                    </div>
                    <button className="text-slate-300 hover:text-slate-700 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-black text-slate-900 tracking-tight">{dept.name}</h3>
                      <span className="px-2 py-0.5 bg-white/80 border border-violet-100/70 rounded text-[9px] font-black text-slate-500 uppercase tracking-tight">
                        {dept.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Lead: <span className="text-slate-700">{dept.lead}</span></p>
                  </div>

                  <div className="flex items-end gap-1 h-10 mb-4 px-1">
                    {dept.sparkline.map((val, idx) => (
                      <div
                        key={`${dept.name}-${idx}`}
                        className="flex-1 bg-linear-to-t from-violet-200 to-cyan-200 rounded-sm group-hover:from-violet-300 group-hover:to-fuchsia-300 transition-colors"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 border-t border-slate-100 pt-3 gap-3">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Team</p>
                      <p className="text-sm font-black text-slate-900 mt-0.5">{dept.headcount}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                      <p className="text-sm font-black text-emerald-600 mt-0.5">{dept.growth}</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button className="group border-2 border-dashed border-slate-200 rounded-3xl p-4 flex flex-col items-center justify-center gap-3 hover:border-slate-300 hover:bg-slate-50 transition-all min-h-55">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-100 via-fuchsia-100 to-cyan-100 flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform">
                  <Zap size={16} />
                </div>
                <span className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase">Add Department</span>
              </button>
            </div>

            <div className="card-mix rounded-3xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Department Operations Grid</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Compact workload, budget and risk monitor.</p>
                </div>
                <button className="text-[10px] font-bold text-slate-500 hover:text-slate-900">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-400 text-[9px] uppercase tracking-wider font-bold">
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Headcount</th>
                      <th className="px-4 py-3">Open Roles</th>
                      <th className="px-4 py-3">Utilization</th>
                      <th className="px-4 py-3">Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {departments.map((dept) => (
                      <tr key={`row-${dept.name}`} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-200 via-fuchsia-200 to-cyan-200 text-slate-700 text-[9px] font-black flex items-center justify-center">
                              {getInitials(dept.name)}
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-slate-900">{dept.name}</p>
                              <p className="text-[9px] text-slate-400">{dept.lead}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[11px] font-bold text-slate-700">{dept.headcount}</td>
                        <td className="px-4 py-3 text-[11px] font-semibold text-slate-600">{dept.openRoles}</td>
                        <td className="px-4 py-3">
                          <div className="w-24 h-1.5 rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: dept.budget }} />
                          </div>
                          <p className="text-[9px] text-slate-400 mt-1">{dept.budget}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wider ${getRiskStyle(dept.attritionRisk)}`}>
                            {dept.attritionRisk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 space-y-4">
            <div className="rounded-3xl p-4 text-slate-900 border border-violet-200/60 bg-linear-to-br from-violet-50 via-white to-cyan-50 shadow-[0_18px_34px_rgba(98,83,255,0.18)]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">Workforce Pulse</h3>
                <TrendingUp size={14} className="text-fuchsia-500" />
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-white/90 border border-violet-100/70 p-3">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">Hiring Momentum</p>
                  <p className="text-lg font-black mt-1 text-slate-900">+14%</p>
                </div>
                <div className="rounded-2xl bg-white/90 border border-violet-100/70 p-3">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">Department Health</p>
                  <p className="text-lg font-black mt-1 text-slate-900">Strong</p>
                </div>
              </div>
              <div className="mt-3 rounded-2xl bg-white/90 border border-violet-100/70 p-3">
                <p className="text-[9px] text-fuchsia-600 uppercase tracking-wider font-bold">Insight</p>
                <p className="text-[11px] leading-relaxed text-slate-600 mt-1">
                  Marketing and Engineering account for the fastest expansion this quarter with sustained utilization.
                </p>
              </div>
            </div>

            <div className="card-mix rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-black text-slate-900">Immediate Actions</h3>
                <span className="fun-chip">Now</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Review budget variance', icon: Wallet },
                  { label: 'Approve open requisitions', icon: CheckCircle2 },
                  { label: 'Schedule capacity review', icon: Clock },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between rounded-xl border border-violet-200 px-3 py-2.5 bg-white/80 hover:bg-white transition-all"
                  >
                    <span className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                      <item.icon size={12} />
                      {item.label}
                    </span>
                    <ArrowUpRight size={12} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
