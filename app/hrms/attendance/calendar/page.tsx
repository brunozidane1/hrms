'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { attendanceService, type AttendanceRecord } from '@/lib/services/attendance';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');

        const monthStart = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1));
        const monthEnd = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999));
        const response = await attendanceService.list({ page: 1, limit: 100, date_from: monthStart.toISOString(), date_to: monthEnd.toISOString() });
        setRecords(response.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load calendar attendance data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [currentDate]);

  const attendanceByDay = useMemo(() => {
    const map = new Map<number, { present: number; absent: number; leave: number }>();

    for (const record of records) {
      const day = new Date(record.date).getUTCDate();
      const bucket = map.get(day) ?? { present: 0, absent: 0, leave: 0 };
      if (record.status === 'ABSENT') {
        bucket.absent += 1;
      } else {
        bucket.present += 1;
      }
      map.set(day, bucket);
    }

    return map;
  }, [records]);

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
  };

  const isSunday = (day: number) => new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay() === 0;

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Calendar</h1>
          <p className="text-gray-600 mt-1">Monthly attendance overview</p>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <div className="flex gap-2">
            <button onClick={previousMonth} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"><ChevronLeft size={20} className="text-gray-600" /></button>
            <button onClick={nextMonth} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"><ChevronRight size={20} className="text-gray-600" /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => <div key={day} className="text-center font-bold text-sm text-gray-600 py-2">{day}</div>)}
        </div>

        {isLoading ? (
          <div className="py-10 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2 w-full"><Loader2 size={16} className="animate-spin" /> Loading calendar...</div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => <div key={`empty-${index}`} className="aspect-square" />)}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const data = attendanceByDay.get(day) ?? { present: 0, absent: 0, leave: 0 };
              const isWeekend = isSunday(day);
              const today = isToday(day);

              return (
                <div key={day} className={`aspect-square border rounded-xl p-2 ${today ? 'border-blue-600 bg-blue-50' : isWeekend ? 'bg-gray-50 border-gray-200' : 'border-gray-200 hover:border-blue-300'}`}>
                  <div className="h-full flex flex-col">
                    <div className={`text-sm font-bold mb-1 ${today ? 'text-blue-600' : isWeekend ? 'text-gray-400' : 'text-gray-900'}`}>{day}</div>

                    {!isWeekend && (data.present > 0 || data.absent > 0) ? (
                      <div className="flex-1 flex flex-col gap-1 text-xs">
                        <div className="flex items-center justify-between"><span className="text-gray-500">P:</span><span className="font-semibold text-green-600">{data.present}</span></div>
                        <div className="flex items-center justify-between"><span className="text-gray-500">A:</span><span className="font-semibold text-red-600">{data.absent}</span></div>
                        <div className="flex items-center justify-between"><span className="text-gray-500">L:</span><span className="font-semibold text-purple-600">{data.leave}</span></div>
                      </div>
                    ) : isWeekend ? (
                      <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-medium">Holiday</div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
