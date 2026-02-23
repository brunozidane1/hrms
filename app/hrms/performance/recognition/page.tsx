'use client';

import { useState } from 'react';
import { Plus, Search, Award, Heart, Trophy, TrendingUp, Edit, Trash2, Calendar } from 'lucide-react';

export default function RecognitionPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const recognitions = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      awardType: 'Employee of the Month',
      description: 'Exceptional project delivery and mentoring new team members',
      nominatedBy: 'Sarah Johnson',
      awardDate: '2026-02-15',
      points: 100,
      status: 'Approved',
      rewardAmount: '$500',
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      awardType: 'Innovation Award',
      description: 'Developed AI-powered feature that increased efficiency by 40%',
      nominatedBy: 'Tom Wilson',
      awardDate: '2026-02-10',
      points: 150,
      status: 'Approved',
      rewardAmount: '$1000',
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      awardType: 'Customer Excellence',
      description: 'Outstanding customer feedback score of 4.9/5 consistently',
      nominatedBy: 'Lisa Brown',
      awardDate: '2026-02-12',
      points: 75,
      status: 'Pending',
      rewardAmount: '$300',
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      awardType: 'Design Excellence',
      description: 'Created industry-leading design system adopted company-wide',
      nominatedBy: 'James Wilson',
      awardDate: '2026-02-08',
      points: 200,
      status: 'Approved',
      rewardAmount: '$1500',
    },
    {
      id: 5,
      employeeName: 'James Wilson',
      employeeId: 'EMP005',
      department: 'Sales',
      awardType: 'Sales Excellence',
      description: 'Exceeded quarterly quota by 150%',
      nominatedBy: 'Emily Davis',
      awardDate: '2026-02-05',
      points: 120,
      status: 'Approved',
      rewardAmount: '$750',
    },
  ];

  const getAwardColor = (awardType: string) => {
    const colors: Record<string, string> = {
      'Employee of the Month': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Innovation Award': 'bg-purple-50 text-purple-700 border-purple-200',
      'Customer Excellence': 'bg-blue-50 text-blue-700 border-blue-200',
      'Design Excellence': 'bg-pink-50 text-pink-700 border-pink-200',
      'Sales Excellence': 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[awardType] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    return status === 'Approved'
      ? 'bg-green-50 text-green-700 border-green-200'
      : 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  const totalRecognitions = recognitions.length;
  const approvedCount = recognitions.filter(r => r.status === 'Approved').length;
  const totalPoints = recognitions.reduce((sum, r) => sum + r.points, 0);
  const totalRewardAmount = recognitions.filter(r => r.status === 'Approved').length;

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Recognition</h1>
          <p className="text-gray-600 mt-1">Recognize and reward outstanding employee achievements</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Give Recognition
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Recognition</p>
            <Award className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalRecognitions}</p>
          <p className="text-xs text-gray-500 mt-2">This period</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Approved</p>
            <Trophy className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{approvedCount}</p>
          <p className="text-xs text-gray-500 mt-2">Recognized</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Points</p>
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{totalPoints}</p>
          <p className="text-xs text-gray-500 mt-2">Awarded</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Reward Budget</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">${(totalRewardAmount * 575).toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Spent this cycle</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Participation Rate</p>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">80%</p>
          <p className="text-xs text-gray-500 mt-2">Nominating managers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or nominator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Award Types</option>
            <option>Employee of the Month</option>
            <option>Innovation Award</option>
            <option>Customer Excellence</option>
            <option>Design Excellence</option>
            <option>Sales Excellence</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Recognition Cards */}
      <div className="space-y-4">
        {recognitions.map((recognition) => (
          <div key={recognition.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{recognition.employeeName}</h3>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getAwardColor(recognition.awardType)}`}>
                    <Award size={14} />
                    {recognition.awardType}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{recognition.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Nominated by: </span>
                    <span className="font-semibold text-gray-900">{recognition.nominatedBy}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar size={14} />
                    {recognition.awardDate}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Recognition Points</p>
                  <p className="text-2xl font-bold text-purple-600">{recognition.points}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Reward Amount</p>
                  <p className="text-lg font-bold text-green-600">{recognition.rewardAmount}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(recognition.status)}`}>
                  {recognition.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-semibold text-sm">
                <Edit size={16} />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-semibold text-sm">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
