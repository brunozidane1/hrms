'use client';

import { useEffect, useMemo, useState } from 'react';
import { Users, UserMinus, Clock, Coffee, Calendar, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { attendanceService, type AttendanceRecord, type AttendanceSummary } from '@/lib/services/attendance';

export default function AttendanceDashboard() {
  const [view, setView] = useState<'Today' | 'Weekly' | 'Monthly'>('Today');
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');

        const today = new Date();
        const dayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        const dayEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

        const [summaryResponse, attendanceResponse] = await Promise.all([
          attendanceService.summary({ date: dayStart.toISOString() }),
          attendanceService.list({ page: 1, limit: 20, date_from: dayStart.toISOString(), date_to: dayEnd.toISOString() })
        ]);

        setSummary(summaryResponse);
        setRecords(attendanceResponse.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load attendance dashboard.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [view]);

  const metrics = useMemo(() => {
    const total = summary?.totals.active ?? 0;
    const present = summary?.attendance.present ?? 0;
    const absent = summary?.attendance.absent ?? 0;
    const late = summary?.attendance.late ?? 0;
    const onLeave = Math.max(0, total - present - absent);

    return [
      { label: 'Present', value: String(present), total: String(total || 1), color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Users size={20} /> },
      { label: 'Absent', value: String(absent), total: String(total || 1), color: 'text-rose-600', bg: 'bg-rose-50', icon: <UserMinus size={20} /> },
      { label: 'Late', value: String(late), total: String(Math.max(present, 1)), color: 'text-amber-600', bg: 'bg-amber-50', icon: <Clock size={20} /> },
      { label: 'On Leave', value: String(onLeave), total: String(total || 1), color: 'text-blue-600', bg: 'bg-blue-50', icon: <Coffee size={20} /> }
    ];
  }, [summary]);

  return (
    <div className="p-8 max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Attendance Oversight</h1>
          <p className="text-slate-500 mt-1 font-medium">Live Updates from backend attendance API</p>
        </div>

        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {(['Today', 'Weekly', 'Monthly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setView(period)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === period ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 rounded-2xl ${m.bg} ${m.color}`}>{m.icon}</div>
              <div className="text-xs font-black text-slate-500">{((Number(m.value) / Number(m.total || 1)) * 100).toFixed(1)}%</div>
            </div>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{isLoading ? '...' : m.value}</p>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">Attendance Rate</h3>
              <p className="text-sm text-slate-500 font-medium">Today summary</p>
            </div>
            <Calendar className="text-slate-400" size={20} />
          </div>
          {isLoading ? (
            <p className="inline-flex items-center gap-2 text-sm text-slate-500"><Loader2 size={16} className="animate-spin" /> Loading summary...</p>
          ) : (
            <div className="space-y-4">
              <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${summary?.attendance.attendanceRate ?? 0}%` }} />
              </div>
              <p className="text-sm font-semibold text-slate-700">{summary?.attendance.attendanceRate ?? 0}% attendance rate</p>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">Real-time Log</h3>
          <div className="space-y-4">
            {isLoading ? (
              <p className="inline-flex items-center gap-2 text-sm text-slate-500"><Loader2 size={16} className="animate-spin" /> Loading logs...</p>
            ) : records.length === 0 ? (
              <p className="text-sm text-slate-500">No attendance events today.</p>
            ) : (
              records.slice(0, 6).map((record) => (
                <div key={record.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{record.employee.first_name} {record.employee.last_name}</p>
                    <p className="text-[11px] text-slate-500">{record.check_in ? new Date(record.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'} | {record.status}</p>
                  </div>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
