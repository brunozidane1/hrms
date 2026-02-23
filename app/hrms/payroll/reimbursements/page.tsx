'use client';

import { useState } from 'react';
import { Plus, Search, CheckCircle, Clock, XCircle, DollarSign, TrendingUp, FileText, Edit, Trash2 } from 'lucide-react';

export default function ReimbursementsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const reimbursements = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      expenseType: 'Travel',
      description: 'Flight to client meeting',
      amount: 2500,
      status: 'Approved',
      submittedDate: '2026-02-10',
      approvedDate: '2026-02-12',
      approvedBy: 'Sarah Johnson',
      invoiceNo: 'INV001445',
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      expenseType: 'Meals & Entertainment',
      description: 'Client dinner expense',
      amount: 450,
      status: 'Approved',
      submittedDate: '2026-02-09',
      approvedDate: '2026-02-11',
      approvedBy: 'Tom Wilson',
      invoiceNo: 'INV001444',
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      expenseType: 'Office Supplies',
      description: 'Marketing materials & samples',
      amount: 1200,
      status: 'Pending',
      submittedDate: '2026-02-15',
      approvedDate: null,
      approvedBy: null,
      invoiceNo: 'INV001446',
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      expenseType: 'Software License',
      description: 'Design tool subscription renewal',
      amount: 350,
      status: 'Rejected',
      submittedDate: '2026-02-08',
      approvedDate: '2026-02-09',
      approvedBy: 'Lisa Brown',
      invoiceNo: 'INV001443',
    },
    {
      id: 5,
      employeeName: 'James Wilson',
      employeeId: 'EMP005',
      department: 'Sales',
      expenseType: 'Travel',
      description: 'Accommodation for conference',
      amount: 1800,
      status: 'Approved',
      submittedDate: '2026-02-14',
      approvedDate: '2026-02-16',
      approvedBy: 'Emily Davis',
      invoiceNo: 'INV001442',
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
    if (status === 'Rejected') return <XCircle size={16} />;
    return <FileText size={16} />;
  };

  const totalApproved = reimbursements.filter(r => r.status === 'Approved').length;
  const totalPending = reimbursements.filter(r => r.status === 'Pending').length;
  const totalRejected = reimbursements.filter(r => r.status === 'Rejected').length;
  const totalAmount = reimbursements.reduce((sum, r) => sum + (r.status === 'Approved' ? r.amount : 0), 0);
  const avgReimbursement = (totalAmount / totalApproved).toFixed(0);

  const expenseTypes = Array.from(new Set(reimbursements.map(r => r.expenseType)));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Reimbursements</h1>
          <p className="text-gray-600 mt-1">Manage and approve employee expense claims</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          New Claim
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Claims</p>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{reimbursements.length}</p>
          <p className="text-xs text-gray-500 mt-2">All statuses</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Approved</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{totalApproved}</p>
          <p className="text-xs text-gray-500 mt-2">Claims</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Pending</p>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{totalPending}</p>
          <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Reimbursed</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">${(totalAmount / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-500 mt-2">Approved amount</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. Claim</p>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">${avgReimbursement}</p>
          <p className="text-xs text-gray-500 mt-2">Per reimbursement</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or invoice number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Expense Types</option>
            {expenseTypes.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Reimbursement Claims Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Expense Type</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Submitted</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reimbursements.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{claim.employeeName}</p>
                      <p className="text-sm text-gray-500">{claim.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{claim.expenseType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{claim.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{claim.invoiceNo}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-blue-600">${claim.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{claim.submittedDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(claim.status)}`}>
                      {getStatusIcon(claim.status)}
                      {claim.status}
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
