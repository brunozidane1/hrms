'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Search, Filter, Mail,
  ArrowUpDown, Download,
  Shield, ChevronRight, Loader2, AlertCircle
} from 'lucide-react';
import { companyService, type CompanyWorkforceRecord } from '@/lib/services/company';
import { departmentsService, type Department } from '@/lib/services/departments';
import { ApiClientError } from '@/lib/api-client';

export default function SovereignDirectory() {
  const [employees, setEmployees] = useState<CompanyWorkforceRecord[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const [employeeResponse, departmentResponse] = await Promise.all([
          companyService.listWorkforce({ page: 1, limit: 100 }),
          departmentsService.list({ page: 1, limit: 100 })
        ]);
        setEmployees(employeeResponse.data);
        setDepartments(departmentResponse.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load employee directory.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const filteredEmployees = useMemo(() => {
    const q = search.trim().toLowerCase();
    return employees.filter((emp) => {
      const departmentName = emp.current_assignment?.department_name ?? '';
      const positionTitle = emp.current_assignment?.position_title ?? '';
      const matchesSearch =
        !q ||
        emp.employee_code.toLowerCase().includes(q) ||
        `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        positionTitle.toLowerCase().includes(q);

      const matchesDepartment =
        departmentFilter === 'ALL' || emp.current_assignment?.department_id === departmentFilter;

      const matchesStatus =
        statusFilter === 'ALL' || emp.employment_status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus && Boolean(departmentName || departmentFilter === 'ALL');
    });
  }, [employees, search, departmentFilter, statusFilter]);

  const exportCsv = async () => {
    try {
      setError('');
      setIsExporting(true);
      const response = await companyService.downloadWorkforceCsv({
        ...(search.trim() ? { search: search.trim() } : {}),
        ...(departmentFilter !== 'ALL' ? { department_id: departmentFilter } : {}),
        ...(statusFilter !== 'ALL' ? { employment_status: statusFilter as 'PROBATION' | 'CONFIRMED' | 'SUSPENDED' | 'RESIGNED' | 'TERMINATED' } : {})
      });

      const url = URL.createObjectURL(response.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = response.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to export CSV.');
      }
    } finally {
      setIsExporting(false);
    }
  };

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

      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="fun-chip">Directory</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Global <span className="text-slate-300 font-light">Directory</span></h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => void exportCsv()}
            disabled={isExporting}
            className="h-11 px-5 border border-violet-200 rounded-xl text-[10px] font-black tracking-widest hover:bg-white transition-all uppercase flex items-center gap-2 bg-white/80 disabled:opacity-60"
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14}/>} Export CSV
          </button>
          <button className="h-11 px-5 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-xl text-[10px] font-black tracking-widest hover:opacity-90 transition-all uppercase shadow-lg">
            Deploy New Entry
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-4 p-2 card-mix rounded-2xl">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH BY NAME, ID, OR KEYWORD..."
            className="w-full pl-12 pr-4 py-3 bg-white/90 border border-violet-200 rounded-xl text-[10px] font-black tracking-widest outline-none focus:border-violet-400 transition-all"
          />
        </div>

        <div className="h-8 w-px bg-slate-200 hidden lg:block" />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="bg-white/90 border border-violet-200 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest uppercase outline-none focus:border-violet-400 appearance-none min-w-[160px]"
        >
          <option value="ALL">All Departments</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/90 border border-violet-200 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest uppercase outline-none focus:border-violet-400 appearance-none min-w-[160px]"
        >
          <option value="ALL">All Status</option>
          <option value="PROBATION">Probation</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="RESIGNED">Resigned</option>
          <option value="TERMINATED">Terminated</option>
        </select>

        <button className="p-3 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-xl hover:scale-105 transition-transform shadow-lg">
          <Filter size={18} />
        </button>
      </div>

      {error ? (
        <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
          <AlertCircle size={14} /> {error}
        </p>
      ) : null}

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
            {isLoading ? (
              <tr>
                <td className="px-8 py-10 text-center" colSpan={5}>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"><Loader2 size={16} className="animate-spin" /> Loading directory...</span>
                </td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td className="px-8 py-10 text-center text-sm font-semibold text-slate-500" colSpan={5}>No employees found.</td>
              </tr>
            ) : (
              filteredEmployees.map((emp, idx) => {
                const fullName = `${emp.first_name} ${emp.last_name}`.trim();
                const role = emp.current_assignment?.position_title ?? 'Unassigned';
                const dept = emp.current_assignment?.department_name ?? '-';
                const statusLabel = emp.employment_status === 'CONFIRMED' ? 'Active' : emp.employment_status.replace('_', ' ');
                const activeVisual = emp.employment_status === 'CONFIRMED' || emp.employment_status === 'PROBATION';

                return (
                  <tr key={emp.id} className="group hover:bg-violet-50/40 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-black text-slate-900 font-mono tracking-tighter bg-slate-100 px-2 py-1 rounded">
                        {emp.employee_code}
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
                          {`${emp.first_name[0] ?? ''}${emp.last_name[0] ?? ''}`.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{fullName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-slate-300" />
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{dept}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                        activeVisual
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                      }`}>
                        <div className={`h-1 w-1 rounded-full ${activeVisual ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                        {statusLabel}
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
                );
              })
            )}
          </tbody>
        </table>

        <div className="px-8 py-6 bg-white/70 border-t border-violet-100/60 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {filteredEmployees.length} of {employees.length} Personnel</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-violet-200 rounded-lg text-[10px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase bg-white/80">Prev</button>
            <button className="px-4 py-2 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
