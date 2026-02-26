'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Search, Loader2, FileText } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { payrollService, type PayrollEntryRecord, type PayrollRunRecord } from '@/lib/services/payroll';

const asNumber = (value: number | string) => Number(value);
const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export default function TaxPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [entries, setEntries] = useState<PayrollEntryRecord[]>([]);
  const [latestRun, setLatestRun] = useState<PayrollRunRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');

        const runsResponse = await payrollService.listRuns({ page: 1, limit: 1 });
        const run = runsResponse.data[0] ?? null;
        setLatestRun(run);

        if (!run) {
          setEntries([]);
          return;
        }

        const entriesResponse = await payrollService.listEntries(run.id, { page: 1, limit: 100 });
        setEntries(entriesResponse.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load tax data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const records = useMemo(() => {
    return entries.map((entry) => {
      const grossSalary = asNumber(entry.gross_salary);
      const taxableIncome = grossSalary * 12;
      const incomeTax = taxableIncome * 0.1;
      const cess = incomeTax * 0.04;
      const totalTax = incomeTax + cess;
      return {
        id: entry.id,
        employeeName: `${entry.employee.first_name} ${entry.employee.last_name}`,
        employeeId: entry.employee.employee_code,
        taxableIncome,
        incomeTax,
        cess,
        totalTax,
        status: latestRun?.status === 'FINALIZED' ? 'Assessed' : 'Pending'
      };
    });
  }, [entries, latestRun?.status]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return records;
    return records.filter((record) => record.employeeName.toLowerCase().includes(q) || record.employeeId.toLowerCase().includes(q));
  }, [records, searchQuery]);

  const totals = useMemo(() => {
    const totalTaxCollected = records.reduce((sum, record) => sum + record.totalTax, 0);
    const totalTaxable = records.reduce((sum, record) => sum + record.taxableIncome, 0);
    const totalIncomeTax = records.reduce((sum, record) => sum + record.incomeTax, 0);
    const averageTaxRate = totalTaxable > 0 ? (totalIncomeTax / totalTaxable) * 100 : 0;
    return { totalTaxCollected, averageTaxRate };
  }, [records]);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tax Management</h1>
        <p className="text-gray-600 mt-1">
          {latestRun ? `Derived from payroll run: ${latestRun.payroll_period.name}` : 'No payroll run available yet.'}
        </p>
      </div>

      {error ? <p className="inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Tax (Estimated)" value={money(totals.totalTaxCollected)} />
        <StatCard label="Assessed" value={String(records.filter((r) => r.status === 'Assessed').length)} />
        <StatCard label="Pending" value={String(records.filter((r) => r.status === 'Pending').length)} />
        <StatCard label="Avg. Tax Rate" value={`${totals.averageTaxRate.toFixed(1)}%`} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by employee name/code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Taxable Income</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Income Tax</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Cess</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total Tax</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500 inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading tax records...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">No tax records found.</td></tr>
              ) : (
                filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{record.employeeName}</p>
                      <p className="text-sm text-gray-500">{record.employeeId}</p>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{money(record.taxableIncome)}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{money(record.incomeTax)}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{money(record.cess)}</td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-blue-600">{money(record.totalTax)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${record.status === 'Assessed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {record.status === 'Assessed' ? <CheckCircle size={14} /> : <FileText size={14} />}
                        {record.status}
                      </span>
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-gray-600 font-medium mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
