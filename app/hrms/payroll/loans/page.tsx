'use client';

import { useState } from 'react';
import { Plus, Search, CheckCircle, Clock, AlertTriangle, DollarSign, TrendingUp, PieChart } from 'lucide-react';

export default function LoansPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const loans = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      loanType: 'Personal Loan',
      amount: 100000,
      principalAmount: 100000,
      sanctionedDate: '2024-06-15',
      repaymentTenure: '36 months',
      monthlyEmi: 2941,
      interestRate: '8.5%',
      disbursedAmount: 95000,
      remainingBalance: 62000,
      status: 'Active',
      emiPaid: 12,
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      loanType: 'Home Loan',
      amount: 500000,
      principalAmount: 500000,
      sanctionedDate: '2023-01-20',
      repaymentTenure: '120 months',
      monthlyEmi: 5292,
      interestRate: '7.2%',
      disbursedAmount: 500000,
      remainingBalance: 420000,
      status: 'Active',
      emiPaid: 24,
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      loanType: 'Educational Loan',
      amount: 150000,
      principalAmount: 150000,
      sanctionedDate: '2022-09-10',
      repaymentTenure: '60 months',
      monthlyEmi: 2750,
      interestRate: '6.5%',
      disbursedAmount: 150000,
      remainingBalance: 25000,
      status: 'Active',
      emiPaid: 47,
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      loanType: 'Personal Loan',
      amount: 50000,
      principalAmount: 50000,
      sanctionedDate: '2021-12-01',
      repaymentTenure: '24 months',
      monthlyEmi: 2217,
      interestRate: '9%',
      disbursedAmount: 50000,
      remainingBalance: 0,
      status: 'Closed',
      emiPaid: 24,
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-green-50 text-green-700 border-green-200';
  };

  const totalLoans = loans.filter(l => l.status === 'Active').length;
  const totalDisbursed = loans.reduce((sum, l) => sum + l.disbursedAmount, 0);
  const totalOutstanding = loans.reduce((sum, l) => sum + l.remainingBalance, 0);
  const averageEmi = (loans.reduce((sum, l) => sum + l.monthlyEmi, 0) / loans.length).toFixed(0);

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loan Management</h1>
          <p className="text-gray-600 mt-1">Manage employee loans and EMI tracking</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          New Loan Application
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Active Loans</p>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalLoans}</p>
          <p className="text-xs text-gray-500 mt-2">Running</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Disbursed</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">${(totalDisbursed / 100000).toFixed(0)}L</p>
          <p className="text-xs text-gray-500 mt-2">All loans</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Outstanding Balance</p>
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">${(totalOutstanding / 100000).toFixed(0)}L</p>
          <p className="text-xs text-gray-500 mt-2">Pending recovery</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. EMI</p>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">${averageEmi}</p>
          <p className="text-xs text-gray-500 mt-2">Monthly average</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Loan Types</p>
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">4</p>
          <p className="text-xs text-gray-500 mt-2">Categories</p>
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
            <option>All Loan Types</option>
            <option>Personal Loan</option>
            <option>Home Loan</option>
            <option>Educational Loan</option>
            <option>Auto Loan</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Loan Type</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Monthly EMI</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Outstanding</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">EMI Paid</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{loan.employeeName}</p>
                      <p className="text-sm text-gray-500">{loan.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{loan.loanType}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-semibold text-gray-900">${loan.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-semibold text-gray-900">${loan.monthlyEmi}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-semibold text-orange-600">${loan.remainingBalance.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{loan.emiPaid} / {parseInt(loan.repaymentTenure)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(loan.status)}`}>
                      {loan.status === 'Active' ? <Clock size={14} /> : <CheckCircle size={14} />}
                      {loan.status}
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
