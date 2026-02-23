'use client';

import { useState } from 'react';
import { Plus, Search, CheckCircle, Clock, XCircle, AlertTriangle, Edit, Trash2, Calendar } from 'lucide-react';

export default function LeavePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const leaveRequests = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      leaveType: 'Annual Leave',
      fromDate: '2026-03-01',
      toDate: '2026-03-05',
      duration: '5 days',
      reason: 'Personal vacation',
      status: 'Approved',
      appliedOn: '2026-02-15',
      approvedBy: 'Sarah Johnson',
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      leaveType: 'Sick Leave',
      fromDate: '2026-02-19',
      toDate: '2026-02-19',
      duration: '1 day',
      reason: 'Medical appointment',
      status: 'Pending',
      appliedOn: '2026-02-18',
      approvedBy: null,
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      leaveType: 'Maternity Leave',
      fromDate: '2026-03-15',
      toDate: '2026-06-15',
      duration: '93 days',
      reason: 'Maternity',
      status: 'Approved',
      appliedOn: '2026-01-20',
      approvedBy: 'Emily Davis',
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      leaveType: 'Casual Leave',
      fromDate: '2026-02-25',
      toDate: '2026-02-26',
      duration: '2 days',
      reason: 'Personal work',
      status: 'Rejected',
      appliedOn: '2026-02-16',
      approvedBy: 'Tom Wilson',
    },
    {
      id: 5,
      employeeName: 'James Wilson',
      employeeId: 'EMP005',
      department: 'Sales',
      leaveType: 'Annual Leave',
      fromDate: '2026-04-10',
      toDate: '2026-04-17',
      duration: '8 days',
      reason: 'Family trip',
      status: 'Pending',
      appliedOn: '2026-02-17',
      approvedBy: null,
    },
  ];

  const leaveBalance = [
    { type: 'Annual Leave', total: 20, used: 5, remaining: 15 },
    { type: 'Sick Leave', total: 12, used: 2, remaining: 10 },
    { type: 'Casual Leave', total: 5, used: 1, remaining: 4 },
    { type: 'Maternity Leave', total: 90, used: 0, remaining: 90 },
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
    if (status === 'Rejected') return <XCircle size={16} />;
    return <AlertTriangle size={16} />;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">Manage and track employee leaves</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Apply for Leave
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Total Requests</p>
          <p className="text-3xl font-bold text-gray-900">{leaveRequests.length}</p>
          <p className="text-xs text-gray-500 mt-2">This period</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Approved</p>
          <p className="text-3xl font-bold text-green-600">
            {leaveRequests.filter(r => r.status === 'Approved').length}
          </p>
          <p className="text-xs text-gray-500 mt-2">Leave requests</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">
            {leaveRequests.filter(r => r.status === 'Pending').length}
          </p>
          <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Rejected</p>
          <p className="text-3xl font-bold text-red-600">
            {leaveRequests.filter(r => r.status === 'Rejected').length}
          </p>
          <p className="text-xs text-gray-500 mt-2">Rejected requests</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Total Days Used</p>
          <p className="text-3xl font-bold text-purple-600">28</p>
          <p className="text-xs text-purple-600 mt-2">This year</p>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Leave Balance
          </h3>
          <div className="space-y-4">
            {leaveBalance.map((leave, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">{leave.type}</p>
                  <p className="text-sm font-bold text-gray-900">{leave.remaining} / {leave.total}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(leave.remaining / leave.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{leave.used} used</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Leave Policy</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Annual Leave</span>
              <span className="text-sm font-bold text-blue-600">20 days/year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sick Leave</span>
              <span className="text-sm font-bold text-blue-600">12 days/year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Casual Leave</span>
              <span className="text-sm font-bold text-blue-600">5 days/year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Public Holidays</span>
              <span className="text-sm font-bold text-blue-600">15 days/year</span>
            </div>
          </div>
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
            <option>All Leave Types</option>
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Maternity Leave</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Leave Type</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">From - To</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Duration</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Reason</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{request.employeeName}</p>
                      <p className="text-sm text-gray-500">{request.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{request.leaveType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{request.fromDate}</p>
                    <p className="text-xs text-gray-500">{request.toDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">{request.duration}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{request.reason}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
