'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Sample attendance data
  const attendanceData: Record<number, { present: number; absent: number; leave: number }> = {
    1: { present: 45, absent: 3, leave: 2 },
    2: { present: 0, absent: 0, leave: 0 }, // Sunday
    3: { present: 46, absent: 2, leave: 2 },
    4: { present: 44, absent: 4, leave: 2 },
    5: { present: 47, absent: 2, leave: 1 },
    6: { present: 45, absent: 3, leave: 2 },
    7: { present: 46, absent: 2, leave: 2 },
    8: { present: 44, absent: 4, leave: 2 },
    9: { present: 0, absent: 0, leave: 0 }, // Sunday
    10: { present: 45, absent: 3, leave: 2 },
    11: { present: 46, absent: 2, leave: 2 },
    12: { present: 47, absent: 2, leave: 1 },
    13: { present: 44, absent: 4, leave: 2 },
    14: { present: 45, absent: 3, leave: 2 },
    15: { present: 46, absent: 2, leave: 2 },
    16: { present: 0, absent: 0, leave: 0 }, // Sunday
    17: { present: 45, absent: 3, leave: 2 },
    18: { present: 47, absent: 2, leave: 1 }, // Today
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSunday = (day: number) => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay() === 0;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Calendar</h1>
          <p className="text-gray-600 mt-1">Monthly attendance overview</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Working Days</p>
          <p className="text-3xl font-bold text-gray-900">22</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Avg. Attendance</p>
          <p className="text-3xl font-bold text-green-600">94.2%</p>
          <p className="text-xs text-green-600 mt-2">↑ 2% from last month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Total Leaves</p>
          <p className="text-3xl font-bold text-purple-600">38</p>
          <p className="text-xs text-gray-500 mt-2">Approved leaves</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Avg. Absences</p>
          <p className="text-3xl font-bold text-red-600">2.8</p>
          <p className="text-xs text-gray-500 mt-2">Per day</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center font-bold text-sm text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const data = attendanceData[day] || { present: 0, absent: 0, leave: 0 };
            const isWeekend = isSunday(day);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`aspect-square border rounded-xl p-2 transition-all hover:shadow-md ${
                  today ? 'border-blue-600 bg-blue-50' : 
                  isWeekend ? 'bg-gray-50 border-gray-200' : 
                  'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="h-full flex flex-col">
                  <div className={`text-sm font-bold mb-1 ${
                    today ? 'text-blue-600' : 
                    isWeekend ? 'text-gray-400' : 
                    'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  
                  {!isWeekend && data.present > 0 && (
                    <div className="flex-1 flex flex-col gap-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">P:</span>
                        <span className="font-semibold text-green-600">{data.present}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">A:</span>
                        <span className="font-semibold text-red-600">{data.absent}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">L:</span>
                        <span className="font-semibold text-purple-600">{data.leave}</span>
                      </div>
                    </div>
                  )}

                  {isWeekend && (
                    <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-medium">
                      Holiday
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
            <span className="text-sm text-gray-600">P = Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded" />
            <span className="text-sm text-gray-600">A = Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded" />
            <span className="text-sm text-gray-600">L = On Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-600 rounded" />
            <span className="text-sm text-gray-600">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded" />
            <span className="text-sm text-gray-600">Weekend/Holiday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
