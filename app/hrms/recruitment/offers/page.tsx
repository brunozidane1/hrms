'use client';

import { useState } from 'react';
import { Plus, Search, DollarSign, Calendar, Send, Eye, Edit, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const offers = [
    {
      id: 1,
      candidateName: 'Michael Chen',
      position: 'Product Manager',
      department: 'Product',
      salary: '$135,000',
      joiningDate: '2026-03-01',
      status: 'Accepted',
      sentDate: '2026-02-10',
      expiryDate: '2026-02-24',
      benefits: ['Health Insurance', '401k', 'Stock Options'],
    },
    {
      id: 2,
      candidateName: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      salary: '$140,000',
      joiningDate: '2026-03-15',
      status: 'Pending',
      sentDate: '2026-02-15',
      expiryDate: '2026-02-28',
      benefits: ['Health Insurance', '401k', 'Remote Work'],
    },
    {
      id: 3,
      candidateName: 'James Wilson',
      position: 'UX Designer',
      department: 'Design',
      salary: '$105,000',
      joiningDate: '2026-03-10',
      status: 'Draft',
      sentDate: null,
      expiryDate: null,
      benefits: ['Health Insurance', 'Flexible Hours'],
    },
    {
      id: 4,
      candidateName: 'Emily Rodriguez',
      position: 'Marketing Specialist',
      department: 'Marketing',
      salary: '$85,000',
      joiningDate: '2026-04-01',
      status: 'Rejected',
      sentDate: '2026-02-08',
      expiryDate: '2026-02-22',
      benefits: ['Health Insurance', 'Gym Membership'],
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Accepted': 'bg-green-50 text-green-700 border-green-200',
      'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Rejected': 'bg-red-50 text-red-700 border-red-200',
      'Draft': 'bg-gray-50 text-gray-700 border-gray-200',
      'Expired': 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Accepted') return <CheckCircle size={16} />;
    if (status === 'Pending') return <Clock size={16} />;
    if (status === 'Rejected') return <XCircle size={16} />;
    return <Edit size={16} />;
  };

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offer Letters</h1>
          <p className="text-gray-600 mt-1">Create and manage job offers</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Create Offer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Total Offers</p>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">38</p>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Accepted</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">24</p>
          <p className="text-xs text-green-600 mt-2">63% acceptance rate</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Pending</p>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">8</p>
          <p className="text-xs text-gray-500 mt-2">Awaiting response</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Rejected</p>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">6</p>
          <p className="text-xs text-gray-500 mt-2">Declined offers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate name or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>Draft</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>
      </div>

      {/* Offers List */}
      <div className="grid grid-cols-1 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{offer.candidateName}</h3>
                    <p className="text-sm text-gray-600">{offer.position} • {offer.department}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(offer.status)}`}>
                    {getStatusIcon(offer.status)}
                    {offer.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Salary</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <DollarSign size={14} className="text-green-600" />
                      {offer.salary}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Joining Date</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      <Calendar size={14} className="text-blue-600" />
                      {offer.joiningDate}
                    </p>
                  </div>
                  {offer.sentDate && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Sent On</p>
                      <p className="text-sm font-semibold text-gray-900">{offer.sentDate}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {offer.benefits.map((benefit, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {benefit}
                    </span>
                  ))}
                </div>

                {offer.expiryDate && offer.status === 'Pending' && (
                  <div className="mt-3 text-xs text-amber-600">
                    Expires on {offer.expiryDate}
                  </div>
                )}
              </div>

              {/* Right Section - Actions */}
              <div className="flex lg:flex-col gap-2">
                {offer.status === 'Draft' && (
                  <>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm whitespace-nowrap flex items-center gap-2">
                      <Send size={16} />
                      Send Offer
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm whitespace-nowrap flex items-center gap-2">
                      <Edit size={16} />
                      Edit
                    </button>
                  </>
                )}
                {offer.status === 'Pending' && (
                  <>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm whitespace-nowrap flex items-center gap-2">
                      <Eye size={16} />
                      View
                    </button>
                    <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-sm whitespace-nowrap">
                      Resend
                    </button>
                  </>
                )}
                {(offer.status === 'Accepted' || offer.status === 'Rejected') && (
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm whitespace-nowrap flex items-center gap-2">
                    <Eye size={16} />
                    View Details
                  </button>
                )}
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium text-sm whitespace-nowrap flex items-center gap-2">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
