'use client';

import { useState } from 'react';
import { Plus, Search, TrendingUp, Crown, Eye, Edit, ArrowRight, Users } from 'lucide-react';

export default function SuccessionPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const successors = [
    {
      id: 1,
      currentPosition: 'Senior Engineer',
      currentHolder: 'John Doe',
      currentHolderId: 'EMP001',
      department: 'Engineering',
      successor1: { name: 'Michael Tech', id: 'EMP006', readiness: 'Ready', yearsToRetirement: 3 },
      successor2: { name: 'Alex Kumar', id: 'EMP007', readiness: 'High Potential', yearsToRetirement: 5 },
      successor3: { name: 'Jane Smith', id: 'EMP008', readiness: 'Medium Potential', yearsToRetirement: 7 },
      criticalityLevel: 'High',
      developmentPlans: ['Technical mentoring', 'Leadership training', 'Project leadership'],
    },
    {
      id: 2,
      currentPosition: 'Product Manager',
      currentHolder: 'Sarah Johnson',
      currentHolderId: 'EMP002',
      department: 'Product',
      successor1: { name: 'Lisa Wong', id: 'EMP009', readiness: 'Ready', yearsToRetirement: 4 },
      successor2: { name: 'David Brown', id: 'EMP010', readiness: 'High Potential', yearsToRetirement: 3 },
      successor3: { name: 'Emma Davis', id: 'EMP011', readiness: 'Medium Potential', yearsToRetirement: 6 },
      criticalityLevel: 'High',
      developmentPlans: ['MBA support', 'Strategic planning exposure', 'Vendor management'],
    },
    {
      id: 3,
      currentPosition: 'Marketing Manager',
      currentHolder: 'Michael Chen',
      currentHolderId: 'EMP003',
      department: 'Marketing',
      successor1: { name: 'Robert Wilson', id: 'EMP012', readiness: 'Medium Potential', yearsToRetirement: 5 },
      successor2: { name: 'Priya Singh', id: 'EMP013', readiness: 'Medium Potential', yearsToRetirement: 7 },
      successor3: { name: 'Sophie Martin', id: 'EMP014', readiness: 'Developing', yearsToRetirement: 8 },
      criticalityLevel: 'Medium',
      developmentPlans: ['Campaign leadership', 'Budget management', 'Team expansion'],
    },
    {
      id: 4,
      currentPosition: 'Design Lead',
      currentHolder: 'Emily Rodriguez',
      currentHolderId: 'EMP004',
      department: 'Design',
      successor1: { name: 'Chris Lee', id: 'EMP015', readiness: 'Ready', yearsToRetirement: 2 },
      successor2: { name: 'Maria Garcia', id: 'EMP016', readiness: 'High Potential', yearsToRetirement: 4 },
      successor3: { name: 'Ivan Peterson', id: 'EMP017', readiness: 'Medium Potential', yearsToRetirement: 6 },
      criticalityLevel: 'High',
      developmentPlans: ['Team mentoring', 'Design strategy', 'Tool expertise'],
    },
  ];

  const getReadinessColor = (readiness: string) => {
    const colors: Record<string, string> = {
      'Ready': 'bg-green-100 text-green-800 border-green-300',
      'High Potential': 'bg-blue-100 text-blue-800 border-blue-300',
      'Medium Potential': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Developing': 'bg-orange-100 text-orange-800 border-orange-300',
    };
    return colors[readiness] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getCriticalityColor = (criticality: string) => {
    const colors: Record<string, string> = {
      'High': 'text-red-600 bg-red-50',
      'Medium': 'text-yellow-600 bg-yellow-50',
      'Low': 'text-green-600 bg-green-50',
    };
    return colors[criticality] || 'text-gray-600 bg-gray-50';
  };

  const totalPositions = successors.length;
  const readyCount = successors.filter(s => s.successor1.readiness === 'Ready').length;
  const retirementRiskCount = successors.filter(s => s.successor1.yearsToRetirement <= 3).length;

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Succession Planning</h1>
          <p className="text-gray-600 mt-1">Manage key positions and develop succession pipelines</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Add Position
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Key Positions</p>
            <Crown className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalPositions}</p>
          <p className="text-xs text-gray-500 mt-2">Being tracked</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Ready Now</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{readyCount}</p>
          <p className="text-xs text-gray-500 mt-2">Successor ready</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Retirement Risk</p>
            <Users className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{retirementRiskCount}</p>
          <p className="text-xs text-gray-500 mt-2">Within 3 years</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Succession Gap</p>
            <Eye className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{totalPositions - readyCount}</p>
          <p className="text-xs text-gray-500 mt-2">Needs development</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by position or current holder..."
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
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Criticality</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {/* Succession Cards */}
      <div className="space-y-6">
        {successors.map((successor) => (
          <div key={successor.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{successor.currentPosition}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getCriticalityColor(successor.criticalityLevel)}`}>
                    {successor.criticalityLevel}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Currently held by {successor.currentHolder} ({successor.department})</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-semibold">
                <Edit size={16} />
                Edit
              </button>
            </div>

            {/* Successors Grid */}
            <div className="space-y-4 mb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[successor.successor1, successor.successor2, successor.successor3].map((successor_info, idx) => (
                  <div key={idx} className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{idx === 0 ? 'Primary' : idx === 1 ? 'Secondary' : 'Tertiary'} Successor</p>
                        <p className="font-semibold text-gray-900">{successor_info.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{successor_info.id}</p>
                      </div>
                      {idx === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border ${getReadinessColor(successor_info.readiness)}`}>
                          {successor_info.readiness}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">{successor_info.yearsToRetirement}</span> years to retirement
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Development Plans */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-3">Development Plans:</p>
              <div className="flex flex-wrap gap-2">
                {successor.developmentPlans.map((plan, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-200">
                    <ArrowRight size={12} />
                    {plan}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
