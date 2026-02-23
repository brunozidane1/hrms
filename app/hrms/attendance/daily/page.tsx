'use client';

import { useState } from 'react';
import { Calendar, Search, Download, CheckCircle, XCircle, Clock, AlertTriangle, Filter } from 'lucide-react';

export default function DailyAttendancePage() {
  const [selectedDate, setSelectedDate] = useState('2026-02-18');
  const [searchQuery, setSearchQuery] = useState('');

  const attendanceRecords = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      totalHours: '9h 00m',
      status: 'Present',
      lateBy: null,
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      totalHours: '9h 15m',
      status: 'Late',
      lateBy: '15 min',
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      checkIn: null,
      checkOut: null,
      totalHours: '0h 00m',
      status: 'Absent',
      lateBy: null,
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      checkIn: '09:00 AM',
      checkOut: '03:00 PM',
      totalHours: '6h 00m',
      status: 'Half Day',
      lateBy: null,
    },
    {
      id: 5,
      employeeName: 'James Wilson',
      employeeId: 'EMP005',
      department: 'Sales',
      checkIn: '08:45 AM',
      checkOut: '06:15 PM',
      totalHours: '9h 30m',
      status: 'Present',
      lateBy: null,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Present': 'bg-green-50 text-green-700',
      'Absent': 'bg-red-50 text-red-700',
      'Late': 'bg-yellow-50 text-yellow-700',
      'Half Day': 'bg-blue-50 text-blue-700',
      'On Leave': 'bg-purple-50 text-purple-700',
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Present') return <CheckCircle size={16} className="text-green-600" />;
    if (status === 'Absent') return <XCircle size={16} className="text-red-600" />;
    if (status === 'Late') return <AlertTriangle size={16} className="text-yellow-600" />;
    return <Clock size={16} className="text-blue-600" />;
  };

  const totalPresent = attendanceRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
  const totalAbsent = attendanceRecords.filter(r => r.status === 'Absent').length;
  const totalLate = attendanceRecords.filter(r => r.status === 'Late').length;
  const attendancePercentage = ((totalPresent / attendanceRecords.length) * 100).toFixed(1);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Attendance</h1>
          <p className="text-gray-600 mt-1">View and manage daily attendance records</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Total Employees</p>
          <p className="text-3xl font-bold text-gray-900">{attendanceRecords.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Present</p>
          <p className="text-3xl font-bold text-green-600">{totalPresent}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Absent</p>
          <p className="text-3xl font-bold text-red-600">{totalAbsent}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Late</p>
          <p className="text-3xl font-bold text-yellow-600">{totalLate}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Attendance %</p>
          <p className="text-3xl font-bold text-blue-600">{attendancePercentage}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Marketing</option>
            <option>Design</option>
            <option>Sales</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
            <option>Half Day</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Check In</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Check Out</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total Hours</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Late By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{record.employeeName}</p>
                      <p className="text-sm text-gray-500">{record.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{record.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {record.checkIn || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {record.checkOut || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{record.totalHours}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-red-600 font-medium">
                      {record.lateBy || '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
