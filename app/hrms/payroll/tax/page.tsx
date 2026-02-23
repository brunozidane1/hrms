'use client';

import { useState } from 'react';
import { Plus, Search, Download, CheckCircle, AlertTriangle, FileText, TrendingDown, Calendar } from 'lucide-react';

export default function TaxPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const taxRecords = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      financialYear: '2025-26',
      basicSalary: 60000,
      taxableIncome: 480000,
      incomeTax: 52000,
      surcharge: 0,
      cess: 2600,
      totalTax: 54600,
      status: 'Assessed',
      panNumber: 'AABPT5055K',
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      financialYear: '2025-26',
      basicSalary: 55000,
      taxableIncome: 440000,
      incomeTax: 47000,
      surcharge: 0,
      cess: 2350,
      totalTax: 49350,
      status: 'Assessed',
      panNumber: 'BBCPT6066L',
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      financialYear: '2025-26',
      basicSalary: 45000,
      taxableIncome: 360000,
      incomeTax: 35000,
      surcharge: 0,
      cess: 1750,
      totalTax: 36750,
      status: 'Pending',
      panNumber: 'CCPIT7077M',
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      financialYear: '2025-26',
      basicSalary: 40000,
      taxableIncome: 320000,
      incomeTax: 30000,
      surcharge: 0,
      cess: 1500,
      totalTax: 31500,
      status: 'Assessed',
      panNumber: 'DDCIT8088N',
    },
  ];

  const waivers = [
    { year: '2025-26', count: 2, reason: 'Below taxable income' },
    { year: '2024-25', count: 1, reason: 'Senior citizen' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Assessed'
      ? 'bg-green-50 text-green-700 border-green-200'
      : 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  const totalTaxCollected = taxRecords.reduce((sum, r) => sum + r.totalTax, 0);
  const averageTaxRate = (taxRecords.reduce((sum, r) => sum + r.incomeTax, 0) / taxRecords.reduce((sum, r) => sum + r.taxableIncome, 0) * 100).toFixed(1);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Management</h1>
          <p className="text-gray-600 mt-1">View and manage employee income tax calculations</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Download size={20} />
          Generate Tax Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Total Tax Collected</p>
          <p className="text-3xl font-bold text-gray-900">${(totalTaxCollected / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-500 mt-2">All employees</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Assessed</p>
          <p className="text-3xl font-bold text-green-600">{taxRecords.filter(r => r.status === 'Assessed').length}</p>
          <p className="text-xs text-gray-500 mt-2">Employees</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Pending Assessment</p>
          <p className="text-3xl font-bold text-yellow-600">{taxRecords.filter(r => r.status === 'Pending').length}</p>
          <p className="text-xs text-gray-500 mt-2">Employees</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Avg. Tax Rate</p>
          <p className="text-3xl font-bold text-blue-600">{averageTaxRate}%</p>
          <p className="text-xs text-gray-500 mt-2">Effective rate</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Tax Waivers</p>
          <p className="text-3xl font-bold text-purple-600">{waivers.reduce((sum, w) => sum + w.count, 0)}</p>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or PAN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Years</option>
            <option>2025-26</option>
            <option>2024-25</option>
            <option>2023-24</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Assessed</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Tax Records Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">PAN</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Taxable Income</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Income Tax</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total Tax</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {taxRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{record.employeeName}</p>
                      <p className="text-sm text-gray-500">{record.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{record.panNumber}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-semibold text-gray-900">${record.taxableIncome.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-semibold text-gray-900">${record.incomeTax.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-blue-600">${record.totalTax.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                      {record.status === 'Assessed' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Waivers Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Tax Waivers
        </h3>
        <div className="space-y-2">
          {waivers.map((waiver, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{waiver.year}</p>
                <p className="text-sm text-gray-600">{waiver.reason}</p>
              </div>
              <p className="text-lg font-bold text-blue-600">{waiver.count} employees</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
