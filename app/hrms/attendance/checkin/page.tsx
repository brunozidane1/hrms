'use client';

import { useEffect, useMemo, useState } from 'react';
import { Clock, MapPin, CheckCircle, LogIn, LogOut, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { attendanceService, type AttendanceRecord } from '@/lib/services/attendance';

export default function CheckInPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employeeId, setEmployeeId] = useState('');
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadToday = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await attendanceService.myToday();
      setEmployeeId(result.employee_id);
      setTodayAttendance(result.attendance);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load today attendance.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadToday();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalHours = useMemo(() => {
    if (!todayAttendance?.check_in) {
      return '0h 0m';
    }

    const start = new Date(todayAttendance.check_in).getTime();
    const end = todayAttendance.check_out ? new Date(todayAttendance.check_out).getTime() : Date.now();
    const diff = Math.max(0, end - start);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }, [todayAttendance]);

  const handleCheckIn = async () => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      const record = await attendanceService.checkInSelf({ check_in_type: 'MANUAL' });
      setTodayAttendance(record);
      setSuccess('Check-in recorded.');
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to check in.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckOut = async () => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      const record = await attendanceService.checkOutSelf({ check_out_type: 'MANUAL' });
      setTodayAttendance(record);
      setSuccess('Check-out recorded.');
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to check out.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCheckedIn = Boolean(todayAttendance?.check_in) && !todayAttendance?.check_out;
  const isCompleted = Boolean(todayAttendance?.check_in) && Boolean(todayAttendance?.check_out);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Check In / Check Out</h1>
        <p className="text-gray-600 mt-1">Mark your attendance for today</p>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
            <div className="text-center mb-8">
              <p className="text-blue-100 text-sm font-medium mb-2">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-6xl font-bold tracking-tight">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <LogIn className="w-8 h-8 mx-auto mb-3" />
                <p className="text-sm text-blue-100 mb-1">Check In Time</p>
                <p className="text-2xl font-bold">{todayAttendance?.check_in ? new Date(todayAttendance.check_in).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <LogOut className="w-8 h-8 mx-auto mb-3" />
                <p className="text-sm text-blue-100 mb-1">Check Out Time</p>
                <p className="text-2xl font-bold">{todayAttendance?.check_out ? new Date(todayAttendance.check_out).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center mb-8">
              <Clock className="w-8 h-8 mx-auto mb-3" />
              <p className="text-sm text-blue-100 mb-1">Total Working Hours</p>
              <p className="text-3xl font-bold">{totalHours}</p>
            </div>

            {isLoading ? (
              <div className="w-full py-4 text-center inline-flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin" /> Loading...</div>
            ) : !todayAttendance?.check_in ? (
              <button
                onClick={() => void handleCheckIn()}
                disabled={isSubmitting}
                className="w-full bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={24} />} Check In Now
              </button>
            ) : isCheckedIn ? (
              <button
                onClick={() => void handleCheckOut()}
                disabled={isSubmitting}
                className="w-full bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-600 transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={24} />} Check Out
              </button>
            ) : isCompleted ? (
              <div className="w-full bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
                <CheckCircle size={24} /> Day Completed
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-100">
              <MapPin size={16} />
              <span>Employee ID: {employeeId || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Today's Record
            </h3>
            <div className="space-y-3 text-sm">
              <p><span className="text-gray-500">Status:</span> <span className="font-semibold">{todayAttendance?.status ?? 'N/A'}</span></p>
              <p><span className="text-gray-500">Late Minutes:</span> <span className="font-semibold">{todayAttendance?.late_minutes ?? 0}</span></p>
              <p><span className="text-gray-500">Check-in Type:</span> <span className="font-semibold">{todayAttendance?.check_in_type ?? 'N/A'}</span></p>
              <p><span className="text-gray-500">Check-out Type:</span> <span className="font-semibold">{todayAttendance?.check_out_type ?? 'N/A'}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
