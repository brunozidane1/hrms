'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin, Camera, CheckCircle, LogIn, LogOut, Calendar } from 'lucide-react';

export default function CheckInPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [totalHours, setTotalHours] = useState('0h 0m');

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (checkInTime && !checkOutTime) {
        const start = new Date(checkInTime);
        const diff = new Date().getTime() - start.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTotalHours(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [checkInTime, checkOutTime]);

  const handleCheckIn = () => {
    const now = new Date().toISOString();
    setCheckInTime(now);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date().toISOString();
    setCheckOutTime(now);
    setIsCheckedIn(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Today's history
  const todayHistory = [
    { type: 'Check In', time: '09:00 AM', location: 'Office - Main Building' },
    { type: 'Break Start', time: '01:00 PM', location: 'Office - Main Building' },
    { type: 'Break End', time: '02:00 PM', location: 'Office - Main Building' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Check In / Check Out</h1>
        <p className="text-gray-600 mt-1">Mark your attendance for today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Check In/Out Card */}
        <div className="lg:col-span-2">
          <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
            <div className="text-center mb-8">
              <p className="text-blue-100 text-sm font-medium mb-2">{mounted && currentTime ? formatDate(currentTime) : 'Loading...'}</p>
              <p className="text-6xl font-bold tracking-tight">{mounted && currentTime ? formatTime(currentTime) : '--:--:--'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <LogIn className="w-8 h-8 mx-auto mb-3" />
                <p className="text-sm text-blue-100 mb-1">Check In Time</p>
                <p className="text-2xl font-bold">
                  {checkInTime ? new Date(checkInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <LogOut className="w-8 h-8 mx-auto mb-3" />
                <p className="text-sm text-blue-100 mb-1">Check Out Time</p>
                <p className="text-2xl font-bold">
                  {checkOutTime ? new Date(checkOutTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center mb-8">
              <Clock className="w-8 h-8 mx-auto mb-3" />
              <p className="text-sm text-blue-100 mb-1">Total Working Hours</p>
              <p className="text-3xl font-bold">{totalHours}</p>
            </div>

            <div className="flex gap-4">
              {!isCheckedIn && !checkOutTime && (
                <button
                  onClick={handleCheckIn}
                  className="flex-1 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition shadow-lg flex items-center justify-center gap-3"
                >
                  <LogIn size={24} />
                  Check In Now
                </button>
              )}
              {isCheckedIn && !checkOutTime && (
                <button
                  onClick={handleCheckOut}
                  className="flex-1 bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-600 transition shadow-lg flex items-center justify-center gap-3"
                >
                  <LogOut size={24} />
                  Check Out
                </button>
              )}
              {checkOutTime && (
                <div className="flex-1 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
                  <CheckCircle size={24} />
                  Day Completed
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-100">
              <MapPin size={16} />
              <span>Location: Office - Main Building, Floor 3</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Activity */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Today's Activity
            </h3>
            <div className="space-y-3">
              {todayHistory.map((entry, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{entry.type}</p>
                    <p className="text-xs text-gray-500">{entry.time}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin size={10} />
                      {entry.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Days Present</span>
                <span className="text-sm font-bold text-gray-900">4 / 5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Hours</span>
                <span className="text-sm font-bold text-gray-900">36h 15m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg. Check-in</span>
                <span className="text-sm font-bold text-gray-900">9:05 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On Time</span>
                <span className="text-sm font-bold text-green-600">100%</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Remember to check out before leaving the office. Late check-ins will be flagged for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
