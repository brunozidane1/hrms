'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Clock, Users, Calendar } from 'lucide-react';

export default function ShiftsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const shifts = [
    {
      id: 1,
      name: 'Morning Shift',
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      duration: '9 hours',
      breakTime: '1 hour',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      employees: 35,
      color: 'blue',
    },
    {
      id: 2,
      name: 'Evening Shift',
      startTime: '02:00 PM',
      endTime: '11:00 PM',
      duration: '9 hours',
      breakTime: '1 hour',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      employees: 18,
      color: 'purple',
    },
    {
      id: 3,
      name: 'Night Shift',
      startTime: '11:00 PM',
      endTime: '08:00 AM',
      duration: '9 hours',
      breakTime: '1 hour',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      employees: 12,
      color: 'indigo',
    },
    {
      id: 4,
      name: 'Flexible Hours',
      startTime: 'Flexible',
      endTime: 'Flexible',
      duration: '8 hours',
      breakTime: '1 hour',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      employees: 45,
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      green: 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[color] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shift Management</h1>
          <p className="text-gray-600 mt-1">Create and manage work shifts</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Create New Shift
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Shifts</p>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{shifts.length}</p>
          <p className="text-xs text-gray-500 mt-2">Active shifts</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Employees</p>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">110</p>
          <p className="text-xs text-gray-500 mt-2">Assigned to shifts</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Most Popular</p>
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xl font-bold text-gray-900">Flexible Hours</p>
          <p className="text-xs text-gray-500 mt-2">45 employees</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Coverage</p>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">24/7</p>
          <p className="text-xs text-green-600 mt-2">Full coverage</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search shifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Shifts</option>
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
            <option>Flexible</option>
          </select>
        </div>
      </div>

      {/* Shifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shifts.map((shift) => (
          <div key={shift.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{shift.name}</h3>
                <p className="text-sm text-gray-600">
                  {shift.startTime} - {shift.endTime}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getColorClasses(shift.color)}`}>
                {shift.employees} employees
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="text-lg font-bold text-gray-900">{shift.duration}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Break Time</p>
                <p className="text-lg font-bold text-gray-900">{shift.breakTime}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Working Days</p>
              <div className="flex gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div
                    key={day}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition ${
                      shift.workingDays.includes(day)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {day.slice(0, 1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                <Users size={16} />
                View Employees
              </button>
              <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                <Edit size={18} />
              </button>
              <button className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Shift Placeholder */}
      <div className="mt-6 border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition cursor-pointer">
        <Plus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Create New Shift</h3>
        <p className="text-sm text-gray-600">Click to add a new work shift</p>
      </div>
    </div>
  );
}
