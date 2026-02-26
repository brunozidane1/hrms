'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, CheckCircle, Clock, XCircle, AlertTriangle, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { attendanceService, type LeavePolicyRecord, type LeaveRequestRecord, type LeaveTypeRecord } from '@/lib/services/attendance';
import { employeesService, type Employee } from '@/lib/services/employees';

export default function LeavePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<LeaveRequestRecord[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveTypeRecord[]>([]);
  const [leavePolicies, setLeavePolicies] = useState<LeavePolicyRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [myEmployeeId, setMyEmployeeId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingLeaveType, setIsCreatingLeaveType] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ employeeId: '', leaveTypeId: '', startDate: '', endDate: '', totalDays: '', reason: '' });
  const [newLeaveType, setNewLeaveType] = useState({ name: '', policyId: '' });

  const loadData = async () => {
    const errors: string[] = [];
    try {
      setIsLoading(true);
      setError('');
      const [requestsResult, leaveTypesResult, leavePoliciesResult, employeesResult, myTodayResult] = await Promise.allSettled([
        attendanceService.listLeaveRequests({ page: 1, limit: 100 }),
        attendanceService.listLeaveTypes({ page: 1, limit: 100 }),
        attendanceService.listLeavePolicies({ page: 1, limit: 100 }),
        employeesService.list({ page: 1, limit: 100 }),
        attendanceService.myToday()
      ]);

      if (requestsResult.status === 'fulfilled') {
        setRequests(requestsResult.value.data);
      } else {
        setRequests([]);
        errors.push('leave requests');
      }

      if (leaveTypesResult.status === 'fulfilled') {
        setLeaveTypes(leaveTypesResult.value.data);
        if (leaveTypesResult.value.data[0]) {
          setForm((current) => ({ ...current, leaveTypeId: current.leaveTypeId || leaveTypesResult.value.data[0].id }));
        }
      } else {
        setLeaveTypes([]);
        errors.push('leave types');
      }

      if (leavePoliciesResult.status === 'fulfilled') {
        setLeavePolicies(leavePoliciesResult.value.data);
        if (leavePoliciesResult.value.data[0]) {
          setNewLeaveType((current) => ({ ...current, policyId: current.policyId || leavePoliciesResult.value.data[0].id }));
        }
      } else {
        setLeavePolicies([]);
        errors.push('leave policies');
      }

      if (employeesResult.status === 'fulfilled') {
        const activeEmployees = employeesResult.value.data.filter((employee) => employee.is_active);
        setEmployees(activeEmployees);
        if (activeEmployees[0]) {
          setForm((current) => ({ ...current, employeeId: current.employeeId || activeEmployees[0].id }));
        }
      } else {
        setEmployees([]);
        errors.push('employees');
      }

      if (myTodayResult.status === 'fulfilled' && myTodayResult.value.employee_id) {
        setMyEmployeeId(myTodayResult.value.employee_id);
        setForm((current) => ({ ...current, employeeId: current.employeeId || myTodayResult.value.employee_id }));
      }

      if (errors.length > 0) {
        setError(`Some data failed to load: ${errors.join(', ')}.`);
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load leave data.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    if (!form.startDate || !form.endDate) {
      return;
    }

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end.getTime() < start.getTime()) {
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((end.getTime() - start.getTime()) / oneDay) + 1;
    setForm((current) => ({ ...current, totalDays: String(days) }));
  }, [form.startDate, form.endDate]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return requests;
    return requests.filter((request) => {
      const name = `${request.employee.first_name} ${request.employee.last_name}`.toLowerCase();
      return name.includes(q) || request.employee.employee_code.toLowerCase().includes(q) || request.leave_type.name.toLowerCase().includes(q);
    });
  }, [requests, searchQuery]);

  const employeeOptions = useMemo(() => {
    if (employees.length > 0) {
      return employees.map((employee) => ({
        id: employee.id,
        label: `${employee.first_name} ${employee.last_name} (${employee.employee_code})`
      }));
    }

    if (myEmployeeId) {
      return [{ id: myEmployeeId, label: 'My employee profile' }];
    }

    return [];
  }, [employees, myEmployeeId]);

  const createLeaveRequest = async () => {
    setError('');
    setSuccess('');

    const missing: string[] = [];
    if (!form.employeeId.trim()) missing.push('employee');
    if (!form.leaveTypeId.trim()) missing.push('leave type');
    if (!form.startDate.trim()) missing.push('start date');
    if (!form.endDate.trim()) missing.push('end date');
    if (!form.totalDays.trim()) missing.push('total days');

    if (missing.length > 0) {
      setError(`Missing required fields: ${missing.join(', ')}.`);
      return;
    }

    const totalDays = Number(form.totalDays);
    if (!Number.isFinite(totalDays) || totalDays <= 0) {
      setError('Total days must be a positive number.');
      return;
    }

    const startDate = new Date(form.startDate);
    const endDate = new Date(form.endDate);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate.getTime() < startDate.getTime()) {
      setError('End date must be on or after start date.');
      return;
    }

    setIsSubmitting(true);
    try {
      await attendanceService.createLeaveRequest({
        employee_id: form.employeeId.trim(),
        leave_type_id: form.leaveTypeId.trim(),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        total_days: totalDays,
        ...(form.reason.trim() ? { reason: form.reason.trim() } : {})
      });
      setSuccess('Leave request created successfully.');
      setForm((current) => ({ ...current, startDate: '', endDate: '', totalDays: '', reason: '' }));
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create leave request.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const createLeaveType = async () => {
    setError('');
    setSuccess('');

    const name = newLeaveType.name.trim();
    if (!name) {
      setError('Leave type name is required.');
      return;
    }

    setIsCreatingLeaveType(true);
    try {
      await attendanceService.createLeaveType({
        name,
        ...(newLeaveType.policyId ? { policy_id: newLeaveType.policyId } : {})
      });
      setSuccess('Leave type created successfully.');
      setNewLeaveType((current) => ({ ...current, name: '' }));
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create leave type.');
      }
    } finally {
      setIsCreatingLeaveType(false);
    }
  };

  const updateStatus = async (id: string, status: 'APPROVED' | 'REJECTED' | 'CANCELLED') => {
    setError('');
    setSuccess('');
    try {
      await attendanceService.updateLeaveRequestStatus(id, { status });
      setSuccess(`Leave request ${status.toLowerCase()}.`);
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to update leave request status.');
      }
    }
  };

  const getStatusColor = (status: LeaveRequestRecord['status']) => {
    const colors: Record<LeaveRequestRecord['status'], string> = {
      APPROVED: 'bg-green-50 text-green-700 border-green-200',
      PENDING: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      REJECTED: 'bg-red-50 text-red-700 border-red-200',
      CANCELLED: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    return colors[status];
  };

  const getStatusIcon = (status: LeaveRequestRecord['status']) => {
    if (status === 'APPROVED') return <CheckCircle size={16} />;
    if (status === 'PENDING') return <Clock size={16} />;
    if (status === 'REJECTED') return <XCircle size={16} />;
    return <AlertTriangle size={16} />;
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">Manage and track employee leaves</p>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Add Leave Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={newLeaveType.name}
            onChange={(e) => setNewLeaveType((current) => ({ ...current, name: e.target.value }))}
            placeholder="Leave type name (e.g. Annual Leave)"
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          />
          <select
            value={newLeaveType.policyId}
            onChange={(e) => setNewLeaveType((current) => ({ ...current, policyId: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          >
            <option value="">Default company policy</option>
            {leavePolicies.map((policy) => <option key={policy.id} value={policy.id}>{policy.name}</option>)}
          </select>
        </div>
        <button onClick={() => void createLeaveType()} disabled={isCreatingLeaveType} className="inline-flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 disabled:opacity-60">
          {isCreatingLeaveType ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add Leave Type
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Create Leave Request</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={form.employeeId} onChange={(e) => setForm((c) => ({ ...c, employeeId: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none">
            <option value="">Select employee</option>
            {employeeOptions.map((employee) => <option key={employee.id} value={employee.id}>{employee.label}</option>)}
          </select>

          <select value={form.leaveTypeId} onChange={(e) => setForm((c) => ({ ...c, leaveTypeId: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none">
            <option value="">Select leave type</option>
            {leaveTypes.map((leaveType) => <option key={leaveType.id} value={leaveType.id}>{leaveType.name} ({leaveType.policy.name})</option>)}
          </select>
          <input type="date" value={form.startDate} onChange={(e) => setForm((c) => ({ ...c, startDate: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="date" value={form.endDate} onChange={(e) => setForm((c) => ({ ...c, endDate: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" min={0.5} step={0.5} value={form.totalDays} onChange={(e) => setForm((c) => ({ ...c, totalDays: e.target.value }))} placeholder="Total days" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input value={form.reason} onChange={(e) => setForm((c) => ({ ...c, reason: e.target.value }))} placeholder="Reason (optional)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
        <button onClick={() => void createLeaveRequest()} disabled={isSubmitting || employeeOptions.length === 0 || leaveTypes.length === 0} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Leave Request
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search by employee or leave type..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Leave Type</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">From - To</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Duration</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading leave requests...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">No leave requests found.</td></tr>
              ) : (
                filtered.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{request.employee.first_name} {request.employee.last_name}</p>
                      <p className="text-sm text-gray-500">{request.employee.employee_code}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{request.leave_type.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{request.total_days} days</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)} {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'PENDING' ? (
                        <div className="flex gap-2">
                          <button onClick={() => void updateStatus(request.id, 'APPROVED')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50">Approve</button>
                          <button onClick={() => void updateStatus(request.id, 'REJECTED')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50">Reject</button>
                          <button onClick={() => void updateStatus(request.id, 'CANCELLED')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</button>
                        </div>
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
