'use client';

import { useState } from 'react';
import { Search, Filter, Mail, Phone, Download, Star, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ApplicantsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const applicants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 555-0123',
      appliedFor: 'Senior Software Engineer',
      experience: '5 years',
      location: 'New York, NY',
      status: 'Under Review',
      rating: 4.5,
      appliedDate: '2026-02-15',
      resume: 'sarah_johnson_resume.pdf',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '+1 555-0124',
      appliedFor: 'Product Manager',
      experience: '7 years',
      location: 'San Francisco, CA',
      status: 'Interview Scheduled',
      rating: 4.8,
      appliedDate: '2026-02-14',
      resume: 'michael_chen_resume.pdf',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '+1 555-0125',
      appliedFor: 'Marketing Specialist',
      experience: '3 years',
      location: 'Austin, TX',
      status: 'New',
      rating: 4.2,
      appliedDate: '2026-02-16',
      resume: 'emily_rodriguez_resume.pdf',
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'jwilson@email.com',
      phone: '+1 555-0126',
      appliedFor: 'UX Designer',
      experience: '4 years',
      location: 'Remote',
      status: 'Shortlisted',
      rating: 4.6,
      appliedDate: '2026-02-13',
      resume: 'james_wilson_resume.pdf',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      phone: '+1 555-0127',
      appliedFor: 'Senior Software Engineer',
      experience: '6 years',
      location: 'Seattle, WA',
      status: 'Rejected',
      rating: 3.8,
      appliedDate: '2026-02-12',
      resume: 'lisa_anderson_resume.pdf',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-blue-50 text-blue-700',
      'Under Review': 'bg-yellow-50 text-yellow-700',
      'Shortlisted': 'bg-purple-50 text-purple-700',
      'Interview Scheduled': 'bg-green-50 text-green-700',
      'Rejected': 'bg-red-50 text-red-700',
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'New') return <Clock size={16} />;
    if (status === 'Interview Scheduled') return <CheckCircle size={16} />;
    if (status === 'Rejected') return <XCircle size={16} />;
    return <Star size={16} />;
  };

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600 mt-1">Review and manage all job applicants</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold">
            <Filter size={20} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Total Applicants</p>
          <p className="text-3xl font-bold text-gray-900">169</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">New</p>
          <p className="text-3xl font-bold text-blue-600">42</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Shortlisted</p>
          <p className="text-3xl font-bold text-purple-600">28</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Interviewing</p>
          <p className="text-3xl font-bold text-green-600">15</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 font-medium mb-2">Rejected</p>
          <p className="text-3xl font-bold text-red-600">84</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Positions</option>
            <option>Senior Software Engineer</option>
            <option>Product Manager</option>
            <option>Marketing Specialist</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>All Status</option>
            <option>New</option>
            <option>Under Review</option>
            <option>Shortlisted</option>
            <option>Interview Scheduled</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Applicants List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Applicant</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Applied For</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Experience</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Location</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Rating</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{applicant.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail size={12} />
                            {applicant.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{applicant.appliedFor}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{applicant.experience}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{applicant.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{applicant.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(applicant.status)}`}>
                      {getStatusIcon(applicant.status)}
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{applicant.appliedDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Profile">
                        View
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="Download Resume">
                        <Download size={18} />
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
