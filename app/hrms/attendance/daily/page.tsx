'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, Search, CheckCircle, XCircle, Clock, AlertTriangle, Loader2, AlertCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { attendanceService, type AttendanceRecord } from '@/lib/services/attendance';

export default function DailyAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const date = new Date(selectedDate);
        const dateFrom = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
        const dateTo = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));

        const response = await attendanceService.list({
          page: 1,
          limit: 100,
          date_from: dateFrom.toISOString(),
          date_to: dateTo.toISOString()
        });

        setRecords(response.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load attendance records.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [selectedDate]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return records;
    return records.filter((record) => {
      const name = `${record.employee.first_name} ${record.employee.last_name}`.toLowerCase();
      return name.includes(q) || record.employee.employee_code.toLowerCase().includes(q);
    });
  }, [records, searchQuery]);

  const totalPresent = filtered.filter((r) => r.status === 'PRESENT' || r.status === 'LATE' || r.status === 'HALF_DAY').length;
  const totalAbsent = filtered.filter((r) => r.status === 'ABSENT').length;
  const totalLate = filtered.filter((r) => r.status === 'LATE').length;
  const attendancePercentage = filtered.length > 0 ? ((totalPresent / filtered.length) * 100).toFixed(1) : '0.0';

  const getStatusColor = (status: AttendanceRecord['status']) => {
    const colors: Record<AttendanceRecord['status'], string> = {
      PRESENT: 'bg-green-50 text-green-700',
      ABSENT: 'bg-red-50 text-red-700',
      LATE: 'bg-yellow-50 text-yellow-700',
      HALF_DAY: 'bg-blue-50 text-blue-700'
    };
    return colors[status];
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    if (status === 'PRESENT') return <CheckCircle size={16} className="text-green-600" />;
    if (status === 'ABSENT') return <XCircle size={16} className="text-red-600" />;
    if (status === 'LATE') return <AlertTriangle size={16} className="text-yellow-600" />;
    return <Clock size={16} className="text-blue-600" />;
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Attendance</h1>
          <p className="text-gray-600 mt-1">View and manage daily attendance records</p>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Stat label="Total Employees" value={filtered.length.toString()} />
        <Stat label="Present" value={totalPresent.toString()} color="text-green-600" />
        <Stat label="Absent" value={totalAbsent.toString()} color="text-red-600" />
        <Stat label="Late" value={totalLate.toString()} color="text-yellow-600" />
        <Stat label="Attendance %" value={`${attendancePercentage}%`} color="text-blue-600" />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Check In</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Check Out</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total Hours</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Late By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading attendance...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">No attendance records found.</td></tr>
              ) : (
                filtered.map((record) => {
                  const checkIn = record.check_in ? new Date(record.check_in) : null;
                  const checkOut = record.check_out ? new Date(record.check_out) : null;
                  const totalMs = checkIn && checkOut ? checkOut.getTime() - checkIn.getTime() : 0;
                  const hours = Math.floor(Math.max(0, totalMs) / (1000 * 60 * 60));
                  const minutes = Math.floor((Math.max(0, totalMs) % (1000 * 60 * 60)) / (1000 * 60));

                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{record.employee.first_name} {record.employee.last_name}</p>
                          <p className="text-sm text-gray-500">{record.employee.employee_code}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{checkIn ? checkIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{checkOut ? checkOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{checkIn && checkOut ? `${hours}h ${minutes}m` : '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)} {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">{record.late_minutes > 0 ? `${record.late_minutes} min` : '-'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color = 'text-gray-900' }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-gray-600 font-medium mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
