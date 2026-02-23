'use client';

import { useState } from 'react';
import { Plus, Search, Target, TrendingUp, CheckCircle, AlertTriangle, Edit, Eye } from 'lucide-react';

export default function OKRsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const okrs = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      objective: 'Improve System Performance',
      keyResults: [
        { result: 'Reduce API response time by 30%', progress: 85, status: 'On Track' },
        { result: 'Implement caching strategy', progress: 100, status: 'Completed' },
        { result: 'Optimize database queries', progress: 60, status: 'In Progress' },
      ],
      completionPercentage: 82,
      quarter: 'Q4 2025',
      status: 'On Track',
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      objective: 'Launch New Feature Suite',
      keyResults: [
        { result: 'Complete product design', progress: 100, status: 'Completed' },
        { result: 'Develop core features', progress: 70, status: 'In Progress' },
        { result: 'Execute beta testing', progress: 0, status: 'Not Started' },
      ],
      completionPercentage: 57,
      quarter: 'Q4 2025',
      status: 'On Track',
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      objective: 'Increase Market Reach',
      keyResults: [
        { result: 'Grow social media followers by 50%', progress: 75, status: 'On Track' },
        { result: 'Launch 12 content pieces', progress: 50, status: 'In Progress' },
        { result: 'Achieve 1M impressions', progress: 45, status: 'In Progress' },
      ],
      completionPercentage: 57,
      quarter: 'Q4 2025',
      status: 'At Risk',
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      objective: 'Redesign UI Framework',
      keyResults: [
        { result: 'Create design system', progress: 90, status: 'On Track' },
        { result: 'Build component library', progress: 100, status: 'Completed' },
        { result: 'Document all components', progress: 80, status: 'On Track' },
      ],
      completionPercentage: 90,
      quarter: 'Q4 2025',
      status: 'On Track',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'On Track': 'bg-green-50 text-green-700 border-green-200',
      'At Risk': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Off Track': 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const avgCompletion = (okrs.reduce((sum, o) => sum + o.completionPercentage, 0) / okrs.length).toFixed(0);
  const onTrackCount = okrs.filter(o => o.status === 'On Track').length;
  const atRiskCount = okrs.filter(o => o.status === 'At Risk').length;

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">OKRs (Objectives & Key Results)</h1>
          <p className="text-gray-600 mt-1">Track and manage quarterly objectives and key results</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Create OKR
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total OKRs</p>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{okrs.length}</p>
          <p className="text-xs text-gray-500 mt-2">Active</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">On Track</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{onTrackCount}</p>
          <p className="text-xs text-gray-500 mt-2">On schedule</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">At Risk</p>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{atRiskCount}</p>
          <p className="text-xs text-gray-500 mt-2">Need attention</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. Completion</p>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{avgCompletion}%</p>
          <p className="text-xs text-gray-500 mt-2">Overall progress</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Quarter</p>
            <Target className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">Q4</p>
          <p className="text-xs text-gray-500 mt-2">2025</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or objective..."
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
            <option>All Status</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Off Track</option>
          </select>
        </div>
      </div>

      {/* OKRs Cards */}
      <div className="space-y-6">
        {okrs.map((okr) => (
          <div key={okr.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{okr.objective}</h3>
                <div className="flex gap-3 mt-2">
                  <p className="text-sm text-gray-600">{okr.employeeName}</p>
                  <span className="text-sm text-gray-400">•</span>
                  <p className="text-sm text-gray-600">{okr.department}</p>
                  <span className="text-sm text-gray-400">•</span>
                  <p className="text-sm text-gray-600">{okr.quarter}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(okr.status)}`}>
                  {okr.status}
                </span>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="View Details">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Overall Progress</p>
                <p className="text-sm font-bold text-gray-900">{okr.completionPercentage}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${getProgressColor(okr.completionPercentage)}`}
                  style={{ width: `${okr.completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Key Results */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Key Results:</p>
              <div className="space-y-3">
                {okr.keyResults.map((kr, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-700">{kr.result}</p>
                      <span className="text-xs font-semibold text-gray-600">
                        {kr.status === 'Completed' && '✓'}
                        {kr.status === 'In Progress' && '→'}
                        {kr.status === 'Not Started' && '○'}
                        {' '}{kr.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(kr.progress)}`}
                        style={{ width: `${kr.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{kr.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
