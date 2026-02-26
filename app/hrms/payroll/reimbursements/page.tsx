'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Loader2, Plus, Search } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { payrollService, type ReimbursementRecord } from '@/lib/services/payroll';
import { employeesService, type Employee } from '@/lib/services/employees';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export default function ReimbursementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reimbursements, setReimbursements] = useState<ReimbursementRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ employeeId: '', expenseType: '', description: '', amount: '', expenseDate: '', invoiceNo: '', notes: '' });

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [reimbursementsResponse, employeesResponse] = await Promise.all([
        payrollService.listReimbursements({ page: 1, limit: 100 }),
        employeesService.list({ page: 1, limit: 100 })
      ]);
      setReimbursements(reimbursementsResponse.data);
      const activeEmployees = employeesResponse.data.filter((employee) => employee.is_active);
      setEmployees(activeEmployees);
      if (activeEmployees[0]) {
        setForm((current) => ({ ...current, employeeId: current.employeeId || activeEmployees[0].id }));
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load reimbursements data.');
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
    if (!q) return reimbursements;
    return reimbursements.filter((claim) => {
      const name = `${claim.employee.first_name} ${claim.employee.last_name}`.toLowerCase();
      return name.includes(q) || claim.employee.employee_code.toLowerCase().includes(q) || claim.expense_type.toLowerCase().includes(q) || claim.description.toLowerCase().includes(q);
    });
  }, [reimbursements, searchQuery]);

  const createClaim = async () => {
    setError('');
    setSuccess('');

    const amount = Number(form.amount);

    if (!form.employeeId || !form.expenseType.trim() || !form.description.trim() || !form.amount.trim() || !form.expenseDate.trim()) {
      setError('Employee, expense type, description, amount, and expense date are required.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await payrollService.createReimbursement({
        employee_id: form.employeeId,
        expense_type: form.expenseType.trim(),
        description: form.description.trim(),
        amount,
        expense_date: new Date(form.expenseDate).toISOString(),
        ...(form.invoiceNo.trim() ? { invoice_no: form.invoiceNo.trim() } : {}),
        ...(form.notes.trim() ? { notes: form.notes.trim() } : {})
      });
      setSuccess('Reimbursement created successfully.');
      setForm((current) => ({ ...current, expenseType: '', description: '', amount: '', expenseDate: '', invoiceNo: '', notes: '' }));
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create reimbursement.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id: string, status: 'APPROVED' | 'REJECTED' | 'PAID') => {
    setError('');
    setSuccess('');
    try {
      await payrollService.updateReimbursementStatus(id, { status });
      setSuccess(`Reimbursement ${status.toLowerCase()}.`);
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to update reimbursement status.');
      }
    }
  };

  const getStatusColor = (status: ReimbursementRecord['status']) => {
    if (status === 'APPROVED') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'PENDING') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (status === 'PAID') return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Expense Reimbursements</h1>
        <p className="text-gray-600 mt-1">Manage and approve employee claims.</p>
      </div>

      {error ? <p className="inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Create Reimbursement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select value={form.employeeId} onChange={(e) => setForm((c) => ({ ...c, employeeId: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none">
            <option value="">Select employee</option>
            {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name} ({employee.employee_code})</option>)}
          </select>
          <input value={form.expenseType} onChange={(e) => setForm((c) => ({ ...c, expenseType: e.target.value }))} placeholder="Expense type" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.amount} onChange={(e) => setForm((c) => ({ ...c, amount: e.target.value }))} placeholder="Amount" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="date" value={form.expenseDate} onChange={(e) => setForm((c) => ({ ...c, expenseDate: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input value={form.invoiceNo} onChange={(e) => setForm((c) => ({ ...c, invoiceNo: e.target.value }))} placeholder="Invoice no (optional)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} placeholder="Notes (optional)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} placeholder="Description" className="md:col-span-3 px-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
        <button onClick={() => void createClaim()} disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Claim
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search by employee, type, or description..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Expense Type</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500 inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading reimbursements...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">No reimbursement claims found.</td></tr>
              ) : (
                filtered.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{claim.employee.first_name} {claim.employee.last_name}</p>
                      <p className="text-sm text-gray-500">{claim.employee.employee_code}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{claim.expense_type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{claim.description}</td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-blue-600">{money(Number(claim.amount))}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(claim.status)}`}>
                        <Clock size={14} /> {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {claim.status === 'PENDING' ? (
                        <div className="flex gap-2">
                          <button onClick={() => void updateStatus(claim.id, 'APPROVED')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50">Approve</button>
                          <button onClick={() => void updateStatus(claim.id, 'REJECTED')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50">Reject</button>
                        </div>
                      ) : claim.status === 'APPROVED' ? (
                        <button onClick={() => void updateStatus(claim.id, 'PAID')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50">Mark Paid</button>
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
