'use client';

import { useState } from 'react';
import { Plus, Search, CheckCircle, Clock, AlertCircle, User, Calendar, FileText, ClipboardCheck } from 'lucide-react';

export default function OnboardingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const onboardingTasks = [
    {
      id: 1,
      employeeName: 'Michael Chen',
      position: 'Product Manager',
      joiningDate: '2026-03-01',
      department: 'Product',
      status: 'In Progress',
      progress: 65,
      completedTasks: 13,
      totalTasks: 20,
      buddy: 'Sarah Johnson',
      tasks: [
        { name: 'Complete HR Forms', status: 'completed' },
        { name: 'IT Setup', status: 'completed' },
        { name: 'Orientation Session', status: 'in-progress' },
        { name: 'Team Introduction', status: 'pending' },
        { name: 'First Project Assignment', status: 'pending' },
      ],
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      joiningDate: '2026-03-15',
      department: 'Engineering',
      status: 'Not Started',
      progress: 0,
      completedTasks: 0,
      totalTasks: 18,
      buddy: 'James Wilson',
      tasks: [],
    },
    {
      id: 3,
      employeeName: 'David Martinez',
      position: 'Data Analyst',
      joiningDate: '2026-02-15',
      department: 'Analytics',
      status: 'Completed',
      progress: 100,
      completedTasks: 20,
      totalTasks: 20,
      buddy: 'Emily Rodriguez',
      tasks: [
        { name: 'Complete HR Forms', status: 'completed' },
        { name: 'IT Setup', status: 'completed' },
        { name: 'Orientation Session', status: 'completed' },
        { name: 'Team Introduction', status: 'completed' },
        { name: 'First Project Assignment', status: 'completed' },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
      'Not Started': 'bg-gray-50 text-gray-700 border-gray-200',
      'Completed': 'bg-green-50 text-green-700 border-green-200',
      'Delayed': 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Completed') return <CheckCircle size={16} />;
    if (status === 'In Progress') return <Clock size={16} />;
    if (status === 'Delayed') return <AlertCircle size={16} />;
    return <FileText size={16} />;
  };

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onboarding</h1>
          <p className="text-gray-600 mt-1">Track new employee onboarding progress</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Add New Hire
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Active Onboarding</p>
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-xs text-blue-600 mt-2">Currently onboarding</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Completed</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">24</p>
          <p className="text-xs text-gray-500 mt-2">This quarter</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Starting Soon</p>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">5</p>
          <p className="text-xs text-gray-500 mt-2">Next 30 days</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. Completion</p>
            <ClipboardCheck className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">12 days</p>
          <p className="text-xs text-green-600 mt-2">↓ 2 days faster</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Delayed</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Marketing</option>
            <option>Analytics</option>
          </select>
        </div>
      </div>

      {/* Onboarding List */}
      <div className="grid grid-cols-1 gap-4">
        {onboardingTasks.map((task) => (
          <div key={task.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{task.employeeName}</h3>
                    <p className="text-sm text-gray-600">{task.position} • {task.department}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                    {task.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Joining Date</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <Calendar size={14} className="text-blue-600" />
                      {task.joiningDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Onboarding Buddy</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <User size={14} className="text-purple-600" />
                      {task.buddy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tasks Completed</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {task.completedTasks} / {task.totalTasks}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-600">Overall Progress</p>
                    <p className="text-xs font-bold text-blue-600">{task.progress}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tasks Preview */}
                {task.tasks.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Recent Tasks:</p>
                    {task.tasks.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        {item.status === 'completed' && <CheckCircle size={16} className="text-green-600" />}
                        {item.status === 'in-progress' && <Clock size={16} className="text-blue-600" />}
                        {item.status === 'pending' && <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />}
                        <span className={item.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-700'}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Section - Actions */}
              <div className="flex lg:flex-col gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm whitespace-nowrap">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm whitespace-nowrap">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
