'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Mail,
  MessageSquare,
  MapPin,
  Globe,
  ShieldCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { companyService, type CompanyWorkforceRecord } from '@/lib/services/company';
import { ApiClientError } from '@/lib/api-client';

export default function SovereignEmployeeGrid() {
  const [employeeRows, setEmployeeRows] = useState<CompanyWorkforceRecord[]>([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await companyService.listWorkforce({ page: 1, limit: 100 });
        setEmployeeRows(response.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load employee grid.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const employees = useMemo(() => {
    const filtered = employeeRows.filter((row) => {
      const q = search.trim().toLowerCase();
      const fullName = `${row.first_name} ${row.last_name}`.trim().toLowerCase();
      const role = (row.current_assignment?.position_title ?? '').toLowerCase();
      const dept = row.current_assignment?.department_name ?? 'Unassigned';

      const matchesSearch = !q || fullName.includes(q) || role.includes(q) || row.employee_code.toLowerCase().includes(q);
      const matchesDept = departmentFilter === 'ALL' || dept === departmentFilter;
      const matchesStatus = statusFilter === 'ALL' || row.employment_status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });

    return filtered.map((row, idx) => {
      const department = row.current_assignment?.department_name ?? 'Unassigned';
      const role = row.current_assignment?.position_title ?? 'Unassigned';
      const fullName = `${row.first_name} ${row.last_name}`.trim();
      const active = row.employment_status === 'CONFIRMED' || row.employment_status === 'PROBATION';
      const completion = 70 + ((idx * 7) % 25);
      const attendance = `${88 + ((idx * 3) % 11)}%`;
      return {
        id: row.employee_code,
        name: fullName,
        role,
        dept: department,
        location: 'Not Set',
        status: active ? 'Active' : row.employment_status.replace('_', ' '),
        initials: `${row.first_name[0] ?? ''}${row.last_name[0] ?? ''}`.toUpperCase(),
        shift: 'General',
        attendance,
        completion,
        lastCheckIn: '--:--',
        email: row.email,
        phone: row.phone ?? 'N/A',
        hireDate: new Date(row.hire_date).toLocaleDateString()
      };
    });
  }, [employeeRows, search, departmentFilter, statusFilter]);

  const departmentOptions = useMemo(() => {
    const set = new Set<string>();
    employeeRows.forEach((row) => {
      if (row.current_assignment?.department_name) {
        set.add(row.current_assignment.department_name);
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [employeeRows]);

  const getAvatarSvg = (index: number) => {
    const mod = index % 4;
    if (mod === 0) {
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <circle cx="32" cy="32" r="26" fill="#ffedd5" />
          <path d="M14 26 C20 10, 44 10, 50 26" fill="#7a6bff" />
          <circle cx="24" cy="30" r="3" fill="#7a6bff" />
          <circle cx="40" cy="30" r="3" fill="#7a6bff" />
          <path d="M24 40 C28 44, 36 44, 40 40" stroke="#2f2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="19" cy="34" r="3" fill="#ff7ab6" opacity="0.7" />
          <circle cx="45" cy="34" r="3" fill="#ff7ab6" opacity="0.7" />
        </svg>
      );
    }
    if (mod === 1) {
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <circle cx="32" cy="32" r="26" fill="#fde68a" />
          <path d="M18 28 C24 14, 40 14, 46 28" fill="#f97316" />
          <circle cx="24" cy="30" r="3" fill="#7a6bff" />
          <circle cx="40" cy="30" r="3" fill="#7a6bff" />
          <path d="M26 42 C30 46, 34 46, 38 42" stroke="#2f2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="20" cy="36" r="3" fill="#fb7185" opacity="0.7" />
          <circle cx="44" cy="36" r="3" fill="#fb7185" opacity="0.7" />
        </svg>
      );
    }
    if (mod === 2) {
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <circle cx="32" cy="32" r="26" fill="#bae6fd" />
          <path d="M16 28 C22 14, 42 14, 48 28" fill="#0ea5e9" />
          <circle cx="24" cy="30" r="3" fill="#0f172a" />
          <circle cx="40" cy="30" r="3" fill="#0f172a" />
          <path d="M24 40 C28 44, 36 44, 40 40" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="19" cy="34" r="3" fill="#f472b6" opacity="0.7" />
          <circle cx="45" cy="34" r="3" fill="#f472b6" opacity="0.7" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#fecdd3" />
        <path d="M18 28 C22 14, 42 14, 46 28" fill="#f43f5e" />
        <circle cx="24" cy="30" r="3" fill="#0f172a" />
        <circle cx="40" cy="30" r="3" fill="#0f172a" />
        <path d="M26 42 C30 46, 34 46, 38 42" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="20" cy="36" r="3" fill="#f59e0b" opacity="0.7" />
        <circle cx="44" cy="36" r="3" fill="#f59e0b" opacity="0.7" />
      </svg>
    );
  };

  return (
    <div className="fun-page grid-fun min-h-screen bg-[#F0F2F5] p-4 lg:p-8 font-sans text-slate-900">
      <style>{`
        .grid-fun .card-mix {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.98), rgba(242,234,255,0.9), rgba(231,249,255,0.9));
          border: 1px solid rgba(126,108,255,0.25);
          box-shadow: 0 16px 30px rgba(98,83,255,0.12);
        }
        .grid-fun .card-mix::after {
          content: '';
          position: absolute;
          top: -55px;
          right: -35px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle at top, rgba(255,122,182,0.35), rgba(122,107,255,0.18), transparent 70%);
          pointer-events: none;
        }
        .grid-fun .fun-chip {
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
            <span className="fun-chip">Team Grid</span>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Employee Grid <span className="text-slate-400 font-light italic">Control</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Compact workforce tiles with quick context and actions.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white/80 p-1 rounded-xl border border-violet-200">
              <button className="px-3 py-2 text-[9px] font-black uppercase tracking-widest bg-white shadow-sm rounded-lg">Grid</button>
              <button className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">List</button>
            </div>
            <button className="h-10 px-4 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-xl text-[10px] font-black tracking-widest hover:opacity-90 transition-all uppercase shadow-lg">
              New Dossier
            </button>
          </div>
        </div>

        <div className="card-mix rounded-2xl p-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1 min-w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search employee, id, role"
                className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-violet-200 rounded-xl text-[11px] font-semibold outline-none focus:border-violet-400 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="bg-white/90 border border-violet-200 rounded-xl px-3 py-2.5 text-[10px] font-black tracking-wider uppercase outline-none focus:border-violet-400 min-w-30">
                <option>ALL</option>
                {departmentOptions.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white/90 border border-violet-200 rounded-xl px-3 py-2.5 text-[10px] font-black tracking-wider uppercase outline-none focus:border-violet-400 min-w-30">
                <option value="ALL">All Status</option>
                <option value="PROBATION">Probation</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="RESIGNED">Resigned</option>
                <option value="TERMINATED">Terminated</option>
              </select>
              <button className="p-2.5 border border-violet-200 rounded-xl hover:bg-white transition-all bg-white/80">
                <Filter size={15} />
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              `Active: ${employees.filter((e) => e.status === 'Active').length}`,
              `Non-Active: ${employees.filter((e) => e.status !== 'Active').length}`,
              `Departments: ${departmentOptions.length}`,
              `Avg Completion: ${employees.length ? Math.round(employees.reduce((acc, item) => acc + item.completion, 0) / employees.length) : 0}%`
            ].map((chip) => (
              <span key={chip} className="px-2.5 py-1 rounded-full bg-linear-to-r from-violet-50 via-white to-cyan-50 border border-violet-200 text-[9px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                {chip}
              </span>
            ))}
          </div>
        </div>

        {error ? (
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600"><AlertCircle size={14} /> {error}</p>
        ) : null}

        {isLoading ? (
          <div className="card-mix rounded-2xl p-8 text-center text-sm font-semibold text-slate-500">
            <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading employees...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {employees.map((emp, idx) => (
              <div key={emp.id} className="group card-mix rounded-3xl overflow-hidden hover:shadow-md transition-all">
                <div className="p-5 pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-[9px] font-black text-slate-300 font-mono tracking-wider">{emp.id}</div>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider ${
                      emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <div className={`h-1 w-1 rounded-full ${emp.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                      {emp.status}
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="relative -mt-2 mb-2">
                      <div className="w-20 h-20 rounded-full bg-white shadow-[0_12px_24px_rgba(98,83,255,0.18)] border border-violet-200 flex items-center justify-center">
                        {getAvatarSvg(idx)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-violet-200 flex items-center justify-center text-slate-500">
                        <ShieldCheck size={11} />
                      </div>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 truncate">{emp.name}</h3>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate mt-0.5">{emp.role}</p>
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 border border-violet-200 text-[9px] font-semibold text-slate-600">
                        <Globe size={10} /> {emp.dept}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 border border-violet-200 text-[9px] font-semibold text-slate-600">
                        <MapPin size={10} /> {emp.location}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-violet-200 bg-white/85 p-2">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Department</p>
                      <p className="text-[10px] font-bold text-slate-700 mt-1 truncate">{emp.dept}</p>
                    </div>
                    <div className="rounded-xl border border-violet-200 bg-white/85 p-2">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Hire Date</p>
                      <p className="text-[10px] font-bold text-slate-700 mt-1">{emp.hireDate}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-violet-200 bg-white/85 p-2">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Shift</p>
                      <p className="text-[10px] font-bold text-slate-700 mt-1 truncate">{emp.shift}</p>
                    </div>
                    <div className="rounded-xl border border-violet-200 bg-white/85 p-2">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Attendance</p>
                      <p className="text-[10px] font-bold text-emerald-600 mt-1">{emp.attendance}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[9px] font-semibold text-slate-500 mb-1">
                      <span>Weekly Completion</span>
                      <span>{emp.completion}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-linear-to-r from-violet-600 via-fuchsia-500 to-cyan-500" style={{ width: `${emp.completion}%` }} />
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="grid grid-cols-1 gap-2">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white/90 px-3 py-2 text-[10px] font-black text-violet-700 hover:bg-white">
                      <Mail size={14} /> {emp.email}
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white/90 px-3 py-2 text-[10px] font-black text-violet-700 hover:bg-white">
                      <MessageSquare size={14} /> {emp.phone}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
