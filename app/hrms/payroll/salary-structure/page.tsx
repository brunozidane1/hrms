'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Eye, Trash2, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function SalaryStructurePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const salaryStructures = [
    {
      id: 1,
      designation: 'Senior Engineer',
      department: 'Engineering',
      basicSalary: 60000,
      allowances: { hra: 12000, da: 6000, medical: 1000, other: 1000 },
      deductions: { pf: 7200, insurance: 500, tax: 5000 },
      netSalary: 67300,
      employees: 5,
    },
    {
      id: 2,
      designation: 'Product Manager',
      department: 'Product',
      basicSalary: 55000,
      allowances: { hra: 11000, da: 5500, medical: 1000, other: 500 },
      deductions: { pf: 6600, insurance: 500, tax: 4500 },
      netSalary: 61400,
      employees: 3,
    },
    {
      id: 3,
      designation: 'Marketing Executive',
      department: 'Marketing',
      basicSalary: 40000,
      allowances: { hra: 8000, da: 4000, medical: 800, other: 200 },
      deductions: { pf: 4800, insurance: 300, tax: 3000 },
      netSalary: 44900,
      employees: 4,
    },
    {
      id: 4,
      designation: 'UI/UX Designer',
      department: 'Design',
      basicSalary: 45000,
      allowances: { hra: 9000, da: 4500, medical: 900, other: 600 },
      deductions: { pf: 5400, insurance: 400, tax: 3500 },
      netSalary: 50200,
      employees: 2,
    },
  ];

  const totalAllowances = (structure: typeof salaryStructures[0]) => {
    return Object.values(structure.allowances).reduce((a, b) => a + b, 0);
  };

  const totalDeductions = (structure: typeof salaryStructures[0]) => {
    return Object.values(structure.deductions).reduce((a, b) => a + b, 0);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salary Structure</h1>
          <p className="text-gray-600 mt-1">Configure and manage salary structures by designation</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          New Structure
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Structures</p>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{salaryStructures.length}</p>
          <p className="text-xs text-gray-500 mt-2">Active configurations</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. Base Salary</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            ${(salaryStructures.reduce((sum, s) => sum + s.basicSalary, 0) / salaryStructures.length / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-gray-500 mt-2">Per designation</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Employees</p>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {salaryStructures.reduce((sum, s) => sum + s.employees, 0)}
          </p>
          <p className="text-xs text-gray-500 mt-2">Mapped to structures</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. Net Salary</p>
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">
            ${(salaryStructures.reduce((sum, s) => sum + s.netSalary, 0) / salaryStructures.length / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-gray-500 mt-2">Monthly average</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by designation or department..."
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
          </select>
        </div>
      </div>

      {/* Salary Structures Grid */}
      <div className="space-y-4">
        {salaryStructures.map((structure) => (
          <div key={structure.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{structure.designation}</h3>
                <p className="text-sm text-gray-600 mt-1">{structure.department} • {structure.employees} employees</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Base</p>
                  <p className="font-bold text-gray-900">${structure.basicSalary.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Allowances</p>
                  <p className="font-bold text-green-600">+${totalAllowances(structure).toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Deductions</p>
                  <p className="font-bold text-red-600">-${totalDeductions(structure).toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Net Salary</p>
                  <p className="font-bold text-blue-600">${structure.netSalary.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Details">
                  <Eye size={18} />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">HRA</p>
                <p className="text-sm font-semibold text-gray-900">${structure.allowances.hra}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">DA</p>
                <p className="text-sm font-semibold text-gray-900">${structure.allowances.da}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">PF</p>
                <p className="text-sm font-semibold text-gray-900">${structure.deductions.pf}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Tax</p>
                <p className="text-sm font-semibold text-gray-900">${structure.deductions.tax}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
