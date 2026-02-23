'use client';

import { useState } from 'react';
import { Plus, Search, Star, TrendingUp, CheckCircle, AlertTriangle, Edit, MessageSquare } from 'lucide-react';

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const reviews = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      reviewerName: 'Sarah Johnson',
      reviewPeriod: 'Q4 2025',
      rating: 4.5,
      performance: 'Excellent',
      strengths: ['Strong technical skills', 'Great problem solver', 'Team player'],
      improvements: ['Better time management', 'More communication'],
      overallRating: 4.5,
      status: 'Completed',
      reviewDate: '2026-02-15',
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Product',
      reviewerName: 'Tom Wilson',
      reviewPeriod: 'Q4 2025',
      rating: 4.2,
      performance: 'Very Good',
      strengths: ['Leadership skills', 'Strategic thinking', 'Stakeholder management'],
      improvements: ['Delegation', 'Work-life balance'],
      overallRating: 4.2,
      status: 'Completed',
      reviewDate: '2026-02-14',
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      reviewerName: 'Lisa Brown',
      reviewPeriod: 'Q4 2025',
      rating: 3.8,
      performance: 'Good',
      strengths: ['Creativity', 'Campaign execution', 'Analytics'],
      improvements: ['Budget management', 'Cross-team collaboration'],
      overallRating: 3.8,
      status: 'Pending',
      reviewDate: null,
    },
    {
      id: 4,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP004',
      department: 'Design',
      reviewerName: 'James Wilson',
      reviewPeriod: 'Q4 2025',
      rating: 4.7,
      performance: 'Exceptional',
      strengths: ['Design excellence', 'User-focused', 'Innovation'],
      improvements: ['Technical knowledge', 'Documentation'],
      overallRating: 4.7,
      status: 'Completed',
      reviewDate: '2026-02-16',
    },
  ];

  const getPerformanceColor = (performance: string) => {
    const colors: Record<string, string> = {
      'Exceptional': 'bg-green-50 text-green-700 border-green-200',
      'Excellent': 'bg-blue-50 text-blue-700 border-blue-200',
      'Very Good': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Good': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Needs Improvement': 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[performance] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed'
      ? 'bg-green-50 text-green-700 border-green-200'
      : 'bg-yellow-50 text-yellow-700 border-yellow-200';
  };

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const completedCount = reviews.filter(r => r.status === 'Completed').length;
  const pendingCount = reviews.filter(r => r.status === 'Pending').length;

  const stars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : i < rating ? 'fill-yellow-300 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-600 mt-1">Manage and track employee performance reviews</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Create Review
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Reviews</p>
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{reviews.length}</p>
          <p className="text-xs text-gray-500 mt-2">This period</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Completed</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          <p className="text-xs text-gray-500 mt-2">Submitted</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Pending</p>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          <p className="text-xs text-gray-500 mt-2">Awaiting submission</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Avg. Rating</p>
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{avgRating}</p>
          <p className="text-xs text-gray-500 mt-2">Out of 5</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Feedback Given</p>
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{reviews.filter(r => r.status === 'Completed').length}</p>
          <p className="text-xs text-gray-500 mt-2">This cycle</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or reviewer..."
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
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Reviews Cards */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{review.employeeName}</h3>
                <div className="flex gap-3 mt-2 flex-wrap">
                  <p className="text-sm text-gray-600">{review.employeeId}</p>
                  <span className="text-sm text-gray-400">•</span>
                  <p className="text-sm text-gray-600">{review.department}</p>
                  <span className="text-sm text-gray-400">•</span>
                  <p className="text-sm text-gray-600">Reviewer: {review.reviewerName}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-1 mb-2">
                  {stars(review.rating)}
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getPerformanceColor(review.performance)}`}>
                  {review.performance}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(review.status)}`}>
                  {review.status}
                </span>
              </div>
            </div>

            {/* Review Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Review Period</p>
                <p className="text-sm font-semibold text-gray-900">{review.reviewPeriod}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Rating</p>
                <p className="text-sm font-bold text-yellow-600">{review.rating}/5</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Review Date</p>
                <p className="text-sm font-semibold text-gray-900">{review.reviewDate || 'Pending'}</p>
              </div>
              <div className="text-right">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition font-semibold inline-flex items-center gap-1">
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Strengths:</p>
                <ul className="space-y-1">
                  {review.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Areas for Improvement:</p>
                <ul className="space-y-1">
                  {review.improvements.map((improvement, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">→</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
