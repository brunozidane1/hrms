'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Loader2, Plus, Search } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { payrollService, type PayrollLoanRecord } from '@/lib/services/payroll';
import { employeesService, type Employee } from '@/lib/services/employees';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export default function LoansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loans, setLoans] = useState<PayrollLoanRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ employeeId: '', loanType: '', principalAmount: '', disbursedAmount: '', interestRate: '', tenureMonths: '', monthlyEmi: '', sanctionedDate: '', notes: '' });

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [loansResponse, employeesResponse] = await Promise.all([
        payrollService.listLoans({ page: 1, limit: 100 }),
        employeesService.list({ page: 1, limit: 100 })
      ]);
      setLoans(loansResponse.data);
      const activeEmployees = employeesResponse.data.filter((employee) => employee.is_active);
      setEmployees(activeEmployees);
      if (activeEmployees[0]) {
        setForm((current) => ({ ...current, employeeId: current.employeeId || activeEmployees[0].id }));
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load loans data.');
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
    if (!q) return loans;
    return loans.filter((loan) => {
      const name = `${loan.employee.first_name} ${loan.employee.last_name}`.toLowerCase();
      return name.includes(q) || loan.employee.employee_code.toLowerCase().includes(q) || loan.loan_type.toLowerCase().includes(q);
    });
  }, [loans, searchQuery]);

  const createLoan = async () => {
    setError('');
    setSuccess('');

    const principalAmount = Number(form.principalAmount);
    const disbursedAmount = form.disbursedAmount.trim() ? Number(form.disbursedAmount) : undefined;
    const interestRate = Number(form.interestRate);
    const tenureMonths = Number(form.tenureMonths);
    const monthlyEmi = form.monthlyEmi.trim() ? Number(form.monthlyEmi) : undefined;

    if (!form.employeeId || !form.loanType.trim() || !form.principalAmount.trim() || !form.interestRate.trim() || !form.tenureMonths.trim() || !form.sanctionedDate.trim()) {
      setError('Employee, loan type, principal amount, interest rate, tenure, and sanctioned date are required.');
      return;
    }

    if (!Number.isFinite(principalAmount) || principalAmount <= 0 || !Number.isFinite(interestRate) || interestRate < 0 || !Number.isFinite(tenureMonths) || tenureMonths <= 0) {
      setError('Please provide valid numeric values for amount/rate/tenure.');
      return;
    }

    setIsSubmitting(true);
    try {
      await payrollService.createLoan({
        employee_id: form.employeeId,
        loan_type: form.loanType.trim(),
        principal_amount: principalAmount,
        ...(disbursedAmount !== undefined ? { disbursed_amount: disbursedAmount } : {}),
        interest_rate: interestRate,
        tenure_months: tenureMonths,
        ...(monthlyEmi !== undefined ? { monthly_emi: monthlyEmi } : {}),
        sanctioned_date: new Date(form.sanctionedDate).toISOString(),
        ...(form.notes.trim() ? { notes: form.notes.trim() } : {})
      });
      setSuccess('Loan created successfully.');
      setForm((current) => ({ ...current, loanType: '', principalAmount: '', disbursedAmount: '', interestRate: '', tenureMonths: '', monthlyEmi: '', sanctionedDate: '', notes: '' }));
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create loan.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateLoanStatus = async (loanId: string, status: 'ACTIVE' | 'CLOSED' | 'REJECTED') => {
    setError('');
    setSuccess('');
    try {
      await payrollService.updateLoanStatus(loanId, { status, ...(status === 'CLOSED' ? { outstanding_amount: 0 } : {}) });
      setSuccess(`Loan marked as ${status.toLowerCase()}.`);
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to update loan status.');
      }
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Loan Management</h1>
        <p className="text-gray-600 mt-1">Manage employee loans and outstanding balances.</p>
      </div>

      {error ? <p className="inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Create Loan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select value={form.employeeId} onChange={(e) => setForm((c) => ({ ...c, employeeId: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none">
            <option value="">Select employee</option>
            {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name} ({employee.employee_code})</option>)}
          </select>
          <input value={form.loanType} onChange={(e) => setForm((c) => ({ ...c, loanType: e.target.value }))} placeholder="Loan type" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.principalAmount} onChange={(e) => setForm((c) => ({ ...c, principalAmount: e.target.value }))} placeholder="Principal amount" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.disbursedAmount} onChange={(e) => setForm((c) => ({ ...c, disbursedAmount: e.target.value }))} placeholder="Disbursed amount (optional)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.interestRate} onChange={(e) => setForm((c) => ({ ...c, interestRate: e.target.value }))} placeholder="Interest rate (%)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.tenureMonths} onChange={(e) => setForm((c) => ({ ...c, tenureMonths: e.target.value }))} placeholder="Tenure (months)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.monthlyEmi} onChange={(e) => setForm((c) => ({ ...c, monthlyEmi: e.target.value }))} placeholder="Monthly EMI (optional)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="date" value={form.sanctionedDate} onChange={(e) => setForm((c) => ({ ...c, sanctionedDate: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input value={form.notes} onChange={(e) => setForm((c) => ({ ...c, notes: e.target.value }))} placeholder="Notes (optional)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
        <button onClick={() => void createLoan()} disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Loan
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search by employee or loan type..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Loan Type</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Principal</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Outstanding</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">EMI</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-500 inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading loans...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-500">No loans found.</td></tr>
              ) : (
                filtered.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{loan.employee.first_name} {loan.employee.last_name}</p>
                      <p className="text-sm text-gray-500">{loan.employee.employee_code}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{loan.loan_type}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{money(Number(loan.principal_amount))}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-orange-600">{money(Number(loan.outstanding_amount))}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{money(Number(loan.monthly_emi))}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${loan.status === 'ACTIVE' ? 'bg-blue-50 text-blue-700 border-blue-200' : loan.status === 'CLOSED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        <Clock size={14} /> {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {loan.status === 'ACTIVE' ? (
                        <div className="flex gap-2">
                          <button onClick={() => void updateLoanStatus(loan.id, 'CLOSED')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50">Close</button>
                          <button onClick={() => void updateLoanStatus(loan.id, 'REJECTED')} className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50">Reject</button>
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
