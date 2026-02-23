'use client';

import { Calendar, Clock, FileText, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function EmployeeDashboard() {
  return (
    <div className="fun-page p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, John!</h1>
        <p className="text-gray-600">Here's what's happening with your work today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">8.5 hrs</h3>
          <p className="text-sm text-gray-600">Today's Hours</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">12 Days</h3>
          <p className="text-sm text-gray-600">Leave Balance</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-violet-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">3 Tasks</h3>
          <p className="text-sm text-gray-600">Pending</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">4.2/5</h3>
          <p className="text-sm text-gray-600">Performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition font-medium text-sm text-gray-700 hover:text-blue-600">
              Apply for Leave
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition font-medium text-sm text-gray-700 hover:text-blue-600">
              View Latest Payslip
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition font-medium text-sm text-gray-700 hover:text-blue-600">
              Check-In/Out
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition font-medium text-sm text-gray-700 hover:text-blue-600">
              Update Profile
            </button>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            Pending Tasks & Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Performance Review Due</p>
                <p className="text-xs text-gray-600 mt-1">Complete your self-assessment by Feb 25, 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Document Upload Required</p>
                <p className="text-xs text-gray-600 mt-1">Upload your tax documents for 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Leave Approved</p>
                <p className="text-xs text-gray-600 mt-1">Your leave request for March 5-7 has been approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
