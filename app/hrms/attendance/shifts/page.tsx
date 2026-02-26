'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Clock, Users, Calendar, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { attendanceService, type ShiftRecord } from '@/lib/services/attendance';

export default function ShiftsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [shifts, setShifts] = useState<ShiftRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', startTime: '', endTime: '', graceMinutes: '0', isNight: false });

  const loadShifts = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await attendanceService.listShifts({ page: 1, limit: 100, ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}) });
      setShifts(response.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load shifts.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadShifts();
  }, [searchQuery]);

  const createShift = async () => {
    setError('');
    setSuccess('');

    if (!form.name.trim() || !form.startTime || !form.endTime) {
      setError('Shift name, start time, and end time are required.');
      return;
    }

    const start = new Date(form.startTime);
    const end = new Date(form.endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setError('Invalid start or end time.');
      return;
    }

    setIsSubmitting(true);
    try {
      await attendanceService.createShift({
        name: form.name.trim(),
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        grace_minutes: Number(form.graceMinutes) || 0,
        is_night: form.isNight
      });
      setSuccess('Shift created successfully.');
      setForm({ name: '', startTime: '', endTime: '', graceMinutes: '0', isNight: false });
      await loadShifts();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create shift.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalEmployees = useMemo(() => shifts.reduce((sum, shift) => sum + shift._count.rotations, 0), [shifts]);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shift Management</h1>
          <p className="text-gray-600 mt-1">Create and manage work shifts</p>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Create New Shift</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} placeholder="Shift name" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" min={0} max={180} value={form.graceMinutes} onChange={(e) => setForm((c) => ({ ...c, graceMinutes: e.target.value }))} placeholder="Grace minutes" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="datetime-local" value={form.startTime} onChange={(e) => setForm((c) => ({ ...c, startTime: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="datetime-local" value={form.endTime} onChange={(e) => setForm((c) => ({ ...c, endTime: e.target.value }))} className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <label className="md:col-span-2 inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.isNight} onChange={(e) => setForm((c) => ({ ...c, isNight: e.target.checked }))} /> Night shift
          </label>
        </div>
        <button onClick={() => void createShift()} disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Shift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card label="Total Shifts" value={String(shifts.length)} icon={<Clock className="w-5 h-5 text-blue-600" />} />
        <Card label="Total Rotations" value={String(totalEmployees)} icon={<Users className="w-5 h-5 text-purple-600" />} />
        <Card label="Night Shifts" value={String(shifts.filter((s) => s.is_night).length)} icon={<Calendar className="w-5 h-5 text-indigo-600" />} />
        <Card label="Avg Grace" value={`${shifts.length ? Math.round(shifts.reduce((sum, s) => sum + s.grace_minutes, 0) / shifts.length) : 0}m`} icon={<Clock className="w-5 h-5 text-amber-600" />} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search shifts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading shifts...</div>
        ) : shifts.length === 0 ? (
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500">No shifts found.</div>
        ) : (
          shifts.map((shift) => (
            <div key={shift.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">{shift.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{shift._count.rotations} rotations</span>
              </div>
              <p className="text-sm text-gray-600">{new Date(shift.start_time).toLocaleString()} - {new Date(shift.end_time).toLocaleString()}</p>
              <div className="mt-3 text-xs text-gray-500">Grace: {shift.grace_minutes} minutes | Night: {shift.is_night ? 'Yes' : 'No'}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Card({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
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
