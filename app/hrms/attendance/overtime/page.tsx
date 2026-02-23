'use client';

import { useState } from 'react';
import { Plus, Search, Clock, AlertTriangle, CheckCircle, TrendingUp, Calendar, User } from 'lucide-react';

export default function OvertimePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const overtimeRecords = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      date: '2026-02-15',
      startTime: '06:00 PM',
      endTime: '09:30 PM',
      duration: '3.5 hours',
      reason: 'Project deadline',
      status: 'Approved',
      compensationType: 'Time Off',
      approvedBy: 'Sarah Johnson',
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      date: '2026-02-16',
      startTime: '07:00 PM',
      endTime: '10:00 PM',
      duration: '3 hours',
      reason: 'Campaign launch',
      status: 'Pending',
      compensationType: null,
      approvedBy: null,
    },
    {
      id: 3,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      date: '2026-02-14',
      startTime: '06:30 PM',
      endTime: '11:00 PM',
      duration: '4.5 hours',
      reason: 'Design revisions',
      status: 'Approved',
      compensationType: 'Overtime Pay',
      approvedBy: 'Tom Wilson',
    },
    {
      id: 4,
      employeeName: 'James Wilson',
      employeeId: 'EMP005',
      department: 'Sales',
      date: '2026-02-17',
      startTime: '08:00 PM',
      endTime: '11:00 PM',
      duration: '3 hours',
      reason: 'Client meeting followup',
      status: 'Approved',
      compensationType: 'Time Off',
      approvedBy: 'Lisa Brown',
    },
    {
      id: 5,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      date: '2026-02-18',
      startTime: '06:00 PM',
      endTime: '08:30 PM',
      duration: '2.5 hours',
      reason: 'Sprint planning',
      status: 'Pending',
      compensationType: null,
      approvedBy: null,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Approved': 'bg-green-50 text-green-700 border-green-200',
      'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Rejected': 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Approved') return <CheckCircle size={16} />;
    if (status === 'Pending') return <Clock size={16} />;
    if (status === 'Rejected') return <AlertTriangle size={16} />;
    return <Clock size={16} />;
  };

  const totalOvertime = overtimeRecords.reduce((sum, rec) => {
    const hours = parseFloat(rec.duration.split(' ')[0]);
    return sum + (rec.status === 'Approved' ? hours : 0);
  }, 0);

  const totalPending = overtimeRecords.filter(r => r.status === 'Pending').length;
  const totalApproved = overtimeRecords.filter(r => r.status === 'Approved').length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Overtime Management</h1>
          <p className="text-gray-600 mt-1">Track and manage employee overtime hours</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Record Overtime
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Overtime</p>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalOvertime}h</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Approved</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{totalApproved}</p>
          <p className="text-xs text-gray-500 mt-2">Requests</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Pending</p>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{totalPending}</p>
          <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Compensation</p>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">${(totalOvertime * 50).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Cost estimate</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. Per Employee</p>
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">{(totalOvertime / overtimeRecords.length).toFixed(1)}h</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
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
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Overtime Records Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Time</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Duration</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Reason</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Compensation</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {overtimeRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{record.employeeName}</p>
                      <p className="text-sm text-gray-500">{record.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar size={14} className="text-gray-400" />
                      {record.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{record.startTime} - {record.endTime}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{record.duration}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{record.reason}</span>
                  </td>
                  <td className="px-6 py-4">
                    {record.compensationType ? (
                      <span className="text-sm font-medium text-blue-600">{record.compensationType}</span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status}
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
