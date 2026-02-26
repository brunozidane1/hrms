'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Calendar, CheckCircle2, Clock, DollarSign, Loader2, PlayCircle, TrendingUp, Users } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { payrollService, type PayrollRunRecord, type PayrollSummary } from '@/lib/services/payroll';

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);

export default function PayrollDashboard() {
  const [summary, setSummary] = useState<PayrollSummary | null>(null);
  const [runs, setRuns] = useState<PayrollRunRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const [summaryResult, runsResult] = await Promise.allSettled([
          payrollService.summary(),
          payrollService.listRuns({ page: 1, limit: 5 })
        ]);

        if (summaryResult.status === 'fulfilled') {
          setSummary(summaryResult.value);
        } else {
          setSummary(null);
          const reason = summaryResult.reason;
          if (reason instanceof ApiClientError) {
            setError(reason.message);
          } else if (reason instanceof Error) {
            setError(reason.message);
          } else {
            setError('Failed to load payroll summary.');
          }
        }

        if (runsResult.status === 'fulfilled') {
          setRuns(runsResult.value.data);
        } else {
          setRuns([]);
          const reason = runsResult.reason;
          if (!error) {
            if (reason instanceof ApiClientError) {
              setError(reason.message);
            } else if (reason instanceof Error) {
              setError(reason.message);
            } else {
              setError('Failed to load payroll runs.');
            }
          }
        }
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load payroll dashboard.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const latestPeriodLabel = useMemo(() => {
    const latest = summary?.latest_run?.payroll_period;
    if (!latest) {
      return 'No run available';
    }
    return `${new Date(latest.start_date).toLocaleDateString()} - ${new Date(latest.end_date).toLocaleDateString()}`;
  }, [summary]);

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payroll Dashboard</h1>
          <p className="text-slate-600 mt-1 inline-flex items-center gap-2"><Calendar size={16} /> {latestPeriodLabel}</p>
        </div>
        <a href="/hrms/payroll/run" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          <PlayCircle size={18} /> Run Payroll
        </a>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <MetricCard label="Net Payroll" value={summary ? money(summary.totals.net_salary) : '-'} icon={<DollarSign size={20} className="text-blue-600" />} />
        <MetricCard label="Employees Paid" value={summary ? String(summary.totals.employee_count) : '-'} icon={<Users size={20} className="text-emerald-600" />} />
        <MetricCard label="Draft Runs" value={summary ? String(summary.runs.draft) : '-'} icon={<Clock size={20} className="text-amber-600" />} />
        <MetricCard label="Finalized Runs" value={summary ? String(summary.runs.finalized) : '-'} icon={<CheckCircle2 size={20} className="text-indigo-600" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">Payroll Totals</h3>
          {isLoading ? (
            <p className="text-sm text-slate-500 inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading...</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="flex justify-between"><span className="text-slate-600">Gross</span><span className="font-semibold">{money(summary?.totals.gross_salary ?? 0)}</span></p>
              <p className="flex justify-between"><span className="text-slate-600">Earnings</span><span className="font-semibold text-emerald-600">{money(summary?.totals.total_earnings ?? 0)}</span></p>
              <p className="flex justify-between"><span className="text-slate-600">Deductions</span><span className="font-semibold text-rose-600">{money(summary?.totals.total_deductions ?? 0)}</span></p>
              <p className="flex justify-between border-t border-slate-100 pt-2"><span className="text-slate-800 font-semibold">Net</span><span className="font-bold text-blue-700">{money(summary?.totals.net_salary ?? 0)}</span></p>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-4 inline-flex items-center gap-2"><TrendingUp size={16} /> Recent Runs</h3>
          {isLoading ? (
            <p className="text-sm text-slate-500 inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading...</p>
          ) : runs.length === 0 ? (
            <p className="text-sm text-slate-500">No payroll runs yet.</p>
          ) : (
            <div className="space-y-3">
              {runs.map((run) => (
                <div key={run.id} className="p-3 border border-slate-200 rounded-xl">
                  <p className="text-sm font-semibold text-slate-900">{run.payroll_period.name}</p>
                  <p className="text-xs text-slate-500">Processed: {new Date(run.processed_at).toLocaleString()}</p>
                  <p className="text-xs mt-1 inline-flex px-2 py-1 rounded-md bg-slate-100 text-slate-700">{run.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-600">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
