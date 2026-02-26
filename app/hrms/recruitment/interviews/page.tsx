'use client';

import { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock, Video, User, Plus, Loader2, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import {
  atsService,
  listApplicantsAcrossJobs,
  type ApplicantWithJob,
  type InterviewRecord,
  type InterviewerRecord
} from '@/lib/services/ats';

export default function InterviewsPage() {
  const [applicants, setApplicants] = useState<ApplicantWithJob[]>([]);
  const [interviewers, setInterviewers] = useState<InterviewerRecord[]>([]);
  const [interviews, setInterviews] = useState<InterviewRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | InterviewRecord['status']>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    applicantId: '',
    interviewerUserId: '',
    scheduledAt: '',
    duration: '45',
    location: ''
  });

  const loadInterviews = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await atsService.listInterviews({
        page: 1,
        limit: 100,
        ...(statusFilter !== 'ALL' ? { status: statusFilter } : {}),
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {})
      });
      setInterviews(response.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load interviews.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [allApplicants, interviewersResponse] = await Promise.all([
          listApplicantsAcrossJobs(),
          atsService.listInterviewers({ page: 1, limit: 100 })
        ]);
        const eligible = allApplicants.filter((applicant) => ['SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(applicant.status));
        const interviewerList = interviewersResponse.data;
        setApplicants(eligible);
        setInterviewers(interviewerList);
        if (eligible[0]) {
          setForm((current) => ({ ...current, applicantId: eligible[0].id }));
        }
        if (interviewerList[0]) {
          setForm((current) => ({ ...current, interviewerUserId: interviewerList[0].id }));
        }
      } catch {
        // keep form usable even if lookup fails
      }
    };

    void bootstrap();
  }, []);

  useEffect(() => {
    void loadInterviews();
  }, [searchQuery, statusFilter]);

  const scheduleInterview = async () => {
    setError('');
    setSuccess('');

    if (!form.applicantId || !form.interviewerUserId || !form.scheduledAt || !form.location) {
      setError('Applicant, interviewer user ID, date/time, and location/link are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      await atsService.createInterview({
        applicant_id: form.applicantId,
        interviewer_user_id: form.interviewerUserId.trim(),
        scheduled_at: new Date(form.scheduledAt).toISOString(),
        duration_minutes: Number(form.duration),
        location_or_meeting_link: form.location.trim()
      });

      setSuccess('Interview scheduled successfully.');
      await loadInterviews();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to schedule interview.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = useMemo(() => {
    const upcoming = interviews.filter((item) => item.status === 'SCHEDULED').length;
    const completed = interviews.filter((item) => item.status === 'COMPLETED').length;
    const cancelled = interviews.filter((item) => item.status === 'CANCELLED').length;

    return {
      total: interviews.length,
      upcoming,
      completed,
      cancelled
    };
  }, [interviews]);

  return (
    <div className="fun-page p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
          <p className="text-gray-600 mt-1">Schedule and manage candidate interviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card label="Total" value={stats.total.toString()} icon={<Calendar className="w-5 h-5 text-blue-600" />} />
        <Card label="Scheduled" value={stats.upcoming.toString()} icon={<Clock className="w-5 h-5 text-purple-600" />} />
        <Card label="Completed" value={stats.completed.toString()} icon={<CheckCircle className="w-5 h-5 text-green-600" />} />
        <Card label="Cancelled" value={stats.cancelled.toString()} icon={<AlertCircle className="w-5 h-5 text-rose-600" />} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Schedule Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={form.applicantId}
            onChange={(e) => setForm((current) => ({ ...current, applicantId: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          >
            {applicants.map((applicant) => (
              <option key={applicant.id} value={applicant.id}>{applicant.first_name} {applicant.last_name} - {applicant.job_title}</option>
            ))}
          </select>

          <select
            value={form.interviewerUserId}
            onChange={(e) => setForm((current) => ({ ...current, interviewerUserId: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          >
            <option value="">Select interviewer</option>
            {interviewers.map((interviewer) => (
              <option key={interviewer.id} value={interviewer.id}>
                {interviewer.full_name} ({interviewer.role.name})
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            value={form.scheduledAt}
            onChange={(e) => setForm((current) => ({ ...current, scheduledAt: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          />

          <input
            type="number"
            min={15}
            max={480}
            value={form.duration}
            onChange={(e) => setForm((current) => ({ ...current, duration: e.target.value }))}
            placeholder="Duration (minutes)"
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          />

          <input
            value={form.location}
            onChange={(e) => setForm((current) => ({ ...current, location: e.target.value }))}
            placeholder="Meeting link or location"
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none md:col-span-2"
          />
        </div>

        <button
          onClick={() => void scheduleInterview()}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Schedule Interview
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidate/interviewer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'ALL' | InterviewRecord['status'])}
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading interviews...
          </div>
        ) : interviews.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500">No interviews found.</div>
        ) : (
          interviews.map((interview) => (
            <div key={interview.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{interview.applicant.first_name} {interview.applicant.last_name}</h3>
                  <p className="text-sm text-gray-600">{interview.applicant.job_posting.title}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm text-gray-700">
                    <span className="inline-flex items-center gap-2"><Calendar size={14} /> {new Date(interview.scheduled_at).toLocaleString()}</span>
                    <span className="inline-flex items-center gap-2"><Clock size={14} /> {interview.duration_minutes} min</span>
                    <span className="inline-flex items-center gap-2"><Video size={14} /> {interview.location_or_meeting_link}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 mb-2">
                    {interview.status}
                  </div>
                  <div className="text-xs text-gray-500 inline-flex items-center gap-1"><User size={14} /> {interview.interviewer_user.full_name}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Card({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
