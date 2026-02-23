'use client';

import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, User, Plus, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function InterviewsPage() {
  const [view, setView] = useState<'upcoming' | 'completed'>('upcoming');

  const interviews = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      date: '2026-02-20',
      time: '10:00 AM',
      duration: '60 min',
      type: 'Video Call',
      interviewer: 'John Smith',
      round: 'Technical Round',
      status: 'Scheduled',
      meetingLink: 'https://meet.example.com/abc123',
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      position: 'Product Manager',
      date: '2026-02-21',
      time: '2:00 PM',
      duration: '45 min',
      type: 'In-Person',
      interviewer: 'Emily Davis',
      round: 'Final Round',
      status: 'Scheduled',
      location: 'Conference Room A',
    },
    {
      id: 3,
      candidateName: 'James Wilson',
      position: 'UX Designer',
      date: '2026-02-19',
      time: '11:00 AM',
      duration: '30 min',
      type: 'Phone Call',
      interviewer: 'Lisa Brown',
      round: 'Screening',
      status: 'Scheduled',
    },
    {
      id: 4,
      candidateName: 'Emily Rodriguez',
      position: 'Marketing Specialist',
      date: '2026-02-18',
      time: '3:00 PM',
      duration: '45 min',
      type: 'Video Call',
      interviewer: 'Tom Wilson',
      round: 'First Round',
      status: 'Completed',
      feedback: 'Strong communication skills, good cultural fit',
      rating: 4.5,
    },
  ];

  const upcomingInterviews = interviews.filter(i => i.status === 'Scheduled');
  const completedInterviews = interviews.filter(i => i.status === 'Completed');
  const displayedInterviews = view === 'upcoming' ? upcomingInterviews : completedInterviews;

  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
          <p className="text-gray-600 mt-1">Schedule and manage candidate interviews</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Schedule Interview
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Today's Interviews</p>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-xs text-blue-600 mt-2">In progress</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">This Week</p>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-xs text-gray-500 mt-2">Scheduled</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Completed</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">45</p>
          <p className="text-xs text-green-600 mt-2">This month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Pending Feedback</p>
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-xs text-amber-600 mt-2">Awaiting response</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setView('upcoming')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${
              view === 'upcoming' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Upcoming ({upcomingInterviews.length})
          </button>
          <button
            onClick={() => setView('completed')}
            className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${
              view === 'completed' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Completed ({completedInterviews.length})
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Interviews List */}
      <div className="grid grid-cols-1 gap-4">
        {displayedInterviews.map((interview) => (
          <div key={interview.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{interview.candidateName}</h3>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                    {interview.round}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{interview.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{interview.time} ({interview.duration})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {interview.type === 'Video Call' ? <Video className="w-4 h-4 text-gray-400" /> : <MapPin className="w-4 h-4 text-gray-400" />}
                    <span className="text-gray-700">{interview.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{interview.interviewer}</span>
                  </div>
                </div>

                {interview.status === 'Completed' && interview.feedback && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-sm text-gray-700">
                      <strong>Feedback:</strong> {interview.feedback}
                    </p>
                    {interview.rating && (
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Rating:</strong> {interview.rating}/5
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Right Section - Actions */}
              <div className="flex lg:flex-col gap-2">
                {interview.status === 'Scheduled' && (
                  <>
                    {interview.meetingLink && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm whitespace-nowrap">
                        Join Meeting
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm whitespace-nowrap">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium text-sm whitespace-nowrap">
                      Cancel
                    </button>
                  </>
                )}
                {interview.status === 'Completed' && (
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm whitespace-nowrap">
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayedInterviews.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No {view} interviews</h3>
          <p className="text-gray-600">There are no {view} interviews at the moment</p>
        </div>
      )}
    </div>
  );
}
