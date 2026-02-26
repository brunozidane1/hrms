'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Clock, AlertTriangle, CheckCircle, TrendingUp, Calendar, User, Loader2, AlertCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { attendanceService, type OvertimeRecord } from '@/lib/services/attendance';
import { employeesService, type Employee } from '@/lib/services/employees';

export default function OvertimePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState<OvertimeRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ employeeId: '', date: '', hours: '' });

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [overtimeResponse, employeesResponse] = await Promise.all([
        attendanceService.listOvertime({ page: 1, limit: 100 }),
        employeesService.list({ page: 1, limit: 100 })
      ]);
      setRecords(overtimeResponse.data);
      setEmployees(employeesResponse.data.filter((employee) => employee.is_active));
      if (employeesResponse.data[0]) {
        setForm((current) => ({ ...current, employeeId: current.employeeId || employeesResponse.data[0].id }));
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load overtime data.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return records;
    return records.filter((record) => {
      const name = `${record.employee.first_name} ${record.employee.last_name}`.toLowerCase();
      return name.includes(q) || record.employee.employee_code.toLowerCase().includes(q);
    });
  }, [records, searchQuery]);

  const createOvertime = async () => {
    setError('');
    setSuccess('');
    if (!form.employeeId || !form.date || !form.hours) {
      setError('Employee, date, and hours are required.');
      return;
    }

    const hours = Number(form.hours);
    if (!Number.isFinite(hours) || hours <= 0) {
      setError('Hours must be a positive number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await attendanceService.createOvertime({
        employee_id: form.employeeId,
        date: new Date(form.date).toISOString(),
        hours
      });
      setSuccess('Overtime recorded successfully.');
      setForm((current) => ({ ...current, date: '', hours: '' }));
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create overtime record.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const approveOvertime = async (id: string) => {
    setError('');
    setSuccess('');
    try {
      await attendanceService.approveOvertime(id);
      setSuccess('Overtime approved.');
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to approve overtime.');
      }
    }
  };

  const totalOvertime = filtered.reduce((sum, record) => sum + (record.is_approved ? Number(record.hours) : 0), 0);
  const totalPending = filtered.filter((record) => !record.is_approved).length;
  const totalApproved = filtered.filter((record) => record.is_approved).length;

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Overtime Management</h1>
          <p className="text-gray-600 mt-1">Track and manage employee overtime hours</p>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Record Overtime</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={form.employeeId} onChange={(e) => setForm((current) => ({ ...current, employeeId: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none">
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name} ({employee.employee_code})</option>
            ))}
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm((current) => ({ ...current, date: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" min={0.25} step={0.25} value={form.hours} onChange={(e) => setForm((current) => ({ ...current, hours: e.target.value }))} placeholder="Hours" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
        <button onClick={() => void createOvertime()} disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Record Overtime
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Stat label="Total Overtime" value={`${totalOvertime.toFixed(2)}h`} icon={<Clock className="w-5 h-5 text-blue-600" />} />
        <Stat label="Approved" value={String(totalApproved)} icon={<CheckCircle className="w-5 h-5 text-green-600" />} />
        <Stat label="Pending" value={String(totalPending)} icon={<AlertTriangle className="w-5 h-5 text-yellow-600" />} />
        <Stat label="Compensation" value={`$${(totalOvertime * 50).toLocaleString()}`} icon={<TrendingUp className="w-5 h-5 text-purple-600" />} />
        <Stat label="Avg. Per Record" value={`${filtered.length ? (totalOvertime / filtered.length).toFixed(1) : '0.0'}h`} icon={<User className="w-5 h-5 text-indigo-600" />} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search by employee name or code..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Hours</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading overtime...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">No overtime records found.</td></tr>
              ) : (
                filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{record.employee.first_name} {record.employee.last_name}</p>
                      <p className="text-sm text-gray-500">{record.employee.employee_code}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 inline-flex items-center gap-2"><Calendar size={14} className="text-gray-400" /> {new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{Number(record.hours).toFixed(2)}h</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${record.is_approved ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {record.is_approved ? <CheckCircle size={16} /> : <Clock size={16} />} {record.is_approved ? 'APPROVED' : 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {!record.is_approved ? (
                        <button onClick={() => void approveOvertime(record.id)} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                          Approve
                        </button>
                      ) : <span className="text-xs text-slate-400">-</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
