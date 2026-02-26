'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, PlayCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { payrollService, type PayrollPeriodRecord, type PayrollRunRecord } from '@/lib/services/payroll';

const dateOnly = (value: string) => new Date(value).toISOString().slice(0, 10);

export default function PayrollRunPage() {
  const [periods, setPeriods] = useState<PayrollPeriodRecord[]>([]);
  const [runs, setRuns] = useState<PayrollRunRecord[]>([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingPeriod, setIsCreatingPeriod] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createPeriodForm, setCreatePeriodForm] = useState({
    name: '',
    start_date: '',
    end_date: ''
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [periodsResponse, runsResponse] = await Promise.all([
        payrollService.listPeriods({ page: 1, limit: 50 }),
        payrollService.listRuns({ page: 1, limit: 20 })
      ]);
      setPeriods(periodsResponse.data);
      setRuns(runsResponse.data);
      const openPeriod = periodsResponse.data.find((period) => period.status === 'OPEN');
      if (openPeriod) {
        setSelectedPeriodId((current) => current || openPeriod.id);
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load payroll data.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const selectedPeriod = useMemo(
    () => periods.find((period) => period.id === selectedPeriodId),
    [periods, selectedPeriodId]
  );

  const runPayroll = async () => {
    if (!selectedPeriodId) {
      setError('Select an OPEN payroll period first.');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      await payrollService.runPayroll(selectedPeriodId);
      setSuccess('Payroll run executed successfully.');
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to run payroll.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalizeRun = async (runId: string) => {
    setError('');
    setSuccess('');
    try {
      await payrollService.finalizeRun(runId);
      setSuccess('Payroll run finalized successfully.');
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to finalize payroll run.');
      }
    }
  };

  const createPeriod = async () => {
    if (!createPeriodForm.name.trim() || !createPeriodForm.start_date || !createPeriodForm.end_date) {
      setError('Name, start date, and end date are required.');
      return;
    }

    const start = new Date(createPeriodForm.start_date);
    const end = new Date(createPeriodForm.end_date);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end.getTime() <= start.getTime()) {
      setError('End date must be after start date.');
      return;
    }

    setError('');
    setSuccess('');
    setIsCreatingPeriod(true);
    try {
      await payrollService.createPeriod({
        name: createPeriodForm.name.trim(),
        start_date: start.toISOString(),
        end_date: end.toISOString()
      });
      setSuccess('Payroll period created successfully.');
      setCreatePeriodForm({ name: '', start_date: '', end_date: '' });
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create payroll period.');
      }
    } finally {
      setIsCreatingPeriod(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Run Payroll</h1>
        <p className="text-slate-600 mt-1">Create periods, execute payroll runs, and finalize drafts.</p>
      </div>

      {error ? <p className="inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-slate-900">Create Payroll Period</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={createPeriodForm.name} onChange={(e) => setCreatePeriodForm((c) => ({ ...c, name: e.target.value }))} placeholder="Period name (e.g. March 2026)" className="px-4 py-3 border border-slate-300 rounded-xl outline-none" />
          <input type="date" value={createPeriodForm.start_date} onChange={(e) => setCreatePeriodForm((c) => ({ ...c, start_date: e.target.value }))} className="px-4 py-3 border border-slate-300 rounded-xl outline-none" />
          <input type="date" value={createPeriodForm.end_date} onChange={(e) => setCreatePeriodForm((c) => ({ ...c, end_date: e.target.value }))} className="px-4 py-3 border border-slate-300 rounded-xl outline-none" />
        </div>
        <button onClick={() => void createPeriod()} disabled={isCreatingPeriod} className="inline-flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 disabled:opacity-60">
          {isCreatingPeriod ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />} Create Period
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-slate-900">Execute Payroll</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select value={selectedPeriodId} onChange={(e) => setSelectedPeriodId(e.target.value)} className="px-4 py-3 border border-slate-300 rounded-xl outline-none">
            <option value="">Select OPEN period</option>
            {periods.filter((period) => period.status === 'OPEN').map((period) => (
              <option key={period.id} value={period.id}>
                {period.name} ({dateOnly(period.start_date)} to {dateOnly(period.end_date)})
              </option>
            ))}
          </select>
          <div className="px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-600 bg-slate-50">
            {selectedPeriod ? `Status: ${selectedPeriod.status}` : 'No period selected'}
          </div>
        </div>
        <button onClick={() => void runPayroll()} disabled={isSubmitting || !selectedPeriodId || isLoading} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />} Run Payroll
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="font-bold text-slate-900 mb-4">Recent Payroll Runs</h2>
        {isLoading ? (
          <p className="text-sm text-slate-500 inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading payroll runs...</p>
        ) : runs.length === 0 ? (
          <p className="text-sm text-slate-500">No payroll runs yet.</p>
        ) : (
          <div className="space-y-3">
            {runs.map((run) => (
              <div key={run.id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 border border-slate-200 rounded-xl p-4">
                <div>
                  <p className="font-semibold text-slate-900">{run.payroll_period.name}</p>
                  <p className="text-xs text-slate-500">Processed at {new Date(run.processed_at).toLocaleString()}</p>
                  <p className="text-xs mt-1 inline-flex px-2 py-1 rounded-md bg-slate-100 text-slate-700">{run.status}</p>
                </div>
                {run.status === 'DRAFT' ? (
                  <button onClick={() => void finalizeRun(run.id)} className="px-4 py-2 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold">
                    Finalize
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">Finalized</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

