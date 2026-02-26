'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Mail, Download, Star, Clock, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { atsService, type ApplicantFileType, type JobApplicant, type JobPosting } from '@/lib/services/ats';

const statusOptions: Array<'ALL' | JobApplicant['status']> = ['ALL', 'APPLIED', 'SCREENING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'HIRED', 'REJECTED'];

export default function ApplicantsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | JobApplicant['status']>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [applicants, setApplicants] = useState<JobApplicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobsResponse = await atsService.listJobs({ page: 1, limit: 100 });
        setJobs(jobsResponse.data);
        if (jobsResponse.data[0]) {
          setSelectedJobId(jobsResponse.data[0].id);
        }
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load jobs.');
        }
      }
    };

    void loadJobs();
  }, []);

  useEffect(() => {
    if (!selectedJobId) return;

    const loadApplicants = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await atsService.listJobApplicants(selectedJobId, {
          page: 1,
          limit: 100,
          ...(selectedStatus !== 'ALL' ? { status: selectedStatus } : {}),
          ...(searchQuery.trim() ? { search: searchQuery.trim() } : {})
        });

        setApplicants(response.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load applicants.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadApplicants();
  }, [selectedJobId, selectedStatus, searchQuery]);

  const stats = useMemo(() => {
    const byStatus = applicants.reduce<Record<string, number>>((acc, applicant) => {
      acc[applicant.status] = (acc[applicant.status] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total: applicants.length,
      applied: byStatus.APPLIED ?? 0,
      shortlisted: byStatus.SHORTLISTED ?? 0,
      interviewing: byStatus.INTERVIEW ?? 0,
      rejected: byStatus.REJECTED ?? 0
    };
  }, [applicants]);

  const updateStatus = async (applicantId: string, status: JobApplicant['status']) => {
    try {
      setIsUpdating(applicantId);
      await atsService.updateApplicantStatus(applicantId, { status });
      setApplicants((current) => current.map((applicant) => (applicant.id === applicantId ? { ...applicant, status } : applicant)));
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to update applicant status.');
      }
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusColor = (status: JobApplicant['status']) => {
    const colors: Record<JobApplicant['status'], string> = {
      APPLIED: 'bg-blue-50 text-blue-700',
      SCREENING: 'bg-yellow-50 text-yellow-700',
      SHORTLISTED: 'bg-purple-50 text-purple-700',
      INTERVIEW: 'bg-green-50 text-green-700',
      OFFERED: 'bg-indigo-50 text-indigo-700',
      HIRED: 'bg-emerald-50 text-emerald-700',
      REJECTED: 'bg-red-50 text-red-700'
    };
    return colors[status];
  };

  const getStatusIcon = (status: JobApplicant['status']) => {
    if (status === 'APPLIED') return <Clock size={16} />;
    if (status === 'HIRED') return <CheckCircle size={16} />;
    if (status === 'REJECTED') return <XCircle size={16} />;
    return <Star size={16} />;
  };

  const downloadApplicantFile = async (applicantId: string, fileType: ApplicantFileType) => {
    try {
      setError('');
      setIsDownloading(`${fileType}:${applicantId}`);
      const result = await atsService.downloadApplicantFile(applicantId, fileType);
      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to download file.');
      }
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="fun-page p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600 mt-1">Review and manage applicants from live ATS data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <StatCard label="Total" value={stats.total} color="text-gray-900" />
        <StatCard label="Applied" value={stats.applied} color="text-blue-600" />
        <StatCard label="Shortlisted" value={stats.shortlisted} color="text-purple-600" />
        <StatCard label="Interviewing" value={stats.interviewing} color="text-green-600" />
        <StatCard label="Rejected" value={stats.rejected} color="text-red-600" />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'ALL' | JobApplicant['status'])}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status === 'ALL' ? 'All Status' : status}</option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
          <AlertCircle size={16} /> {error}
        </div>
      ) : null}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Applicant</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Applied Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">AI Score</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading applicants...</span>
                  </td>
                </tr>
              ) : applicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm font-semibold text-slate-500">No applicants found.</td>
                </tr>
              ) : (
                applicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {`${applicant.first_name[0] ?? ''}${applicant.last_name[0] ?? ''}`.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{applicant.first_name} {applicant.last_name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12} /> {applicant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(applicant.applied_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {typeof applicant.ai_score === 'number' ? applicant.ai_score.toFixed(2) : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(applicant.status)}`}>
                        {getStatusIcon(applicant.status)} {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={isUpdating === applicant.id}
                          onClick={() => void updateStatus(applicant.id, 'SHORTLISTED')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                        >
                          Shortlist
                        </button>
                        <button
                          disabled={isUpdating === applicant.id}
                          onClick={() => void updateStatus(applicant.id, 'REJECTED')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => void downloadApplicantFile(applicant.id, 'resume')}
                          disabled={Boolean(isDownloading)}
                          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          title="Download resume"
                        >
                          {isDownloading === `resume:${applicant.id}` ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        </button>
                        <button
                          onClick={() => void downloadApplicantFile(applicant.id, 'cover-letter')}
                          disabled={Boolean(isDownloading)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                          {isDownloading === `cover-letter:${applicant.id}` ? '...' : 'Cover Letter'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-gray-600 font-medium mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
