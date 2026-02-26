'use client';

import { useEffect, useMemo, useState } from 'react';
import { Briefcase, Clock, Eye, Loader2, Search, MapPin, AlertCircle, CheckCircle, Rocket, Plus, X } from 'lucide-react';
import { atsService, type JobPosting } from '@/lib/services/ats';
import { ApiClientError } from '@/lib/api-client';
import { departmentsService, type Department } from '@/lib/services/departments';
import { positionsService, type Position } from '@/lib/services/positions';

const statusOptions = ['ALL', 'DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'PUBLISHED', 'CLOSED'] as const;
type StatusOption = (typeof statusOptions)[number];

const employmentLabel = (type: JobPosting['employment_type']): string => {
  switch (type) {
    case 'PERMANENT':
      return 'Full-time';
    case 'CONTRACT':
      return 'Contract';
    case 'INTERN':
      return 'Intern';
    case 'CONSULTANT':
      return 'Consultant';
    default:
      return type;
  }
};

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<StatusOption>('ALL');
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createForm, setCreateForm] = useState({
    departmentId: '',
    positionId: '',
    title: '',
    description: '',
    employmentType: 'PERMANENT' as 'PERMANENT' | 'CONTRACT' | 'INTERN' | 'CONSULTANT',
    location: ''
  });

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await atsService.listJobs({
        page: 1,
        limit: 100,
        ...(status !== 'ALL' ? { status } : {}),
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {})
      });

      setJobs(response.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load jobs.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadJobs();
  }, [searchQuery, status]);

  useEffect(() => {
    const loadOrg = async () => {
      try {
        const [departmentsResponse, positionsResponse] = await Promise.all([
          departmentsService.list({ page: 1, limit: 100 }),
          positionsService.list({ page: 1, limit: 100 })
        ]);
        setDepartments(departmentsResponse.data.filter((department) => department.is_active));
        setPositions(positionsResponse.data.filter((position) => position.is_active));
      } catch {
        // keep page usable even if org catalog is unavailable
      }
    };

    void loadOrg();
  }, []);

  const stats = useMemo(() => {
    const active = jobs.filter((job) => job.status === 'PUBLISHED').length;
    const draft = jobs.filter((job) => job.status === 'DRAFT').length;
    const approvals = jobs.filter((job) => job.status === 'PENDING_APPROVAL').length;

    return {
      total: jobs.length,
      active,
      draft,
      approvals
    };
  }, [jobs]);

  const runAction = async (jobId: string, action: 'approve' | 'publish' | 'rank') => {
    try {
      setError('');
      setSuccess('');
      setIsActionLoading(`${action}:${jobId}`);

      if (action === 'approve') {
        const updated = await atsService.approveJob(jobId);
        setJobs((current) => current.map((job) => (job.id === jobId ? { ...job, status: updated.status as JobPosting['status'] } : job)));
        setSuccess('Job approved.');
      }

      if (action === 'publish') {
        const updated = await atsService.publishJob(jobId);
        setJobs((current) => current.map((job) => (job.id === jobId ? { ...job, status: updated.status as JobPosting['status'] } : job)));
        setSuccess('Job published.');
      }

      if (action === 'rank') {
        const ranked = await atsService.rankCandidates(jobId);
        setSuccess(`Candidates ranked (${ranked.length}).`);
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Action failed.');
      }
    } finally {
      setIsActionLoading(null);
    }
  };

  const createJob = async () => {
    setError('');
    setSuccess('');

    const title = createForm.title.trim();
    const description = createForm.description.trim();
    const location = createForm.location.trim();

    if (!createForm.departmentId || !createForm.positionId || !title || !description || !location) {
      setError('Department, position, title, description, and location are required.');
      return;
    }

    if (title.length < 2) {
      setError('Job title must be at least 2 characters.');
      return;
    }

    if (description.length < 10) {
      setError('Job description must be at least 10 characters.');
      return;
    }

    if (location.length < 2) {
      setError('Location must be at least 2 characters.');
      return;
    }

    setIsCreateLoading(true);
    try {
      await atsService.createJob({
        department_id: createForm.departmentId,
        position_id: createForm.positionId,
        title,
        description,
        employment_type: createForm.employmentType,
        location,
        status: 'DRAFT'
      });

      setSuccess('Job created as draft.');
      setShowCreateForm(false);
      setCreateForm({
        departmentId: '',
        positionId: '',
        title: '',
        description: '',
        employmentType: 'PERMANENT',
        location: ''
      });
      await loadJobs();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create job.');
      }
    } finally {
      setIsCreateLoading(false);
    }
  };

  const filteredPositions = createForm.departmentId
    ? positions.filter((position) => position.department_id === createForm.departmentId)
    : positions;

  return (
    <div className="fun-page p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-600 mt-1">Live ATS jobs from backend API</p>
        </div>
        <button
          onClick={() => setShowCreateForm((current) => !current)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {showCreateForm ? <X size={16} /> : <Plus size={16} />}
          {showCreateForm ? 'Close' : 'Create Job'}
        </button>
      </div>

      {showCreateForm ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">New Job Posting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={createForm.departmentId}
              onChange={(e) =>
                setCreateForm((current) => ({
                  ...current,
                  departmentId: e.target.value,
                  positionId: ''
                }))
              }
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            >
              <option value="">Select department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name} ({department.code})
                </option>
              ))}
            </select>
            <select
              value={createForm.positionId}
              onChange={(e) => setCreateForm((current) => ({ ...current, positionId: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            >
              <option value="">Select position</option>
              {filteredPositions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.title} ({position.code})
                </option>
              ))}
            </select>
            <input
              value={createForm.title}
              onChange={(e) => setCreateForm((current) => ({ ...current, title: e.target.value }))}
              placeholder="Job title"
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
            <input
              value={createForm.location}
              onChange={(e) => setCreateForm((current) => ({ ...current, location: e.target.value }))}
              placeholder="Location"
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
            <select
              value={createForm.employmentType}
              onChange={(e) =>
                setCreateForm((current) => ({
                  ...current,
                  employmentType: e.target.value as 'PERMANENT' | 'CONTRACT' | 'INTERN' | 'CONSULTANT'
                }))
              }
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            >
              <option value="PERMANENT">Permanent</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Intern</option>
              <option value="CONSULTANT">Consultant</option>
            </select>
            <textarea
              value={createForm.description}
              onChange={(e) => setCreateForm((current) => ({ ...current, description: e.target.value }))}
              placeholder="Job description"
              rows={4}
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none md:col-span-2"
            />
            <p className="text-xs text-slate-500 md:col-span-2">
              Description must be at least 10 characters.
            </p>
          </div>
          <button
            onClick={() => void createJob()}
            disabled={isCreateLoading}
            className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-60"
          >
            {isCreateLoading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Create Draft Job
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard label="Total Jobs" value={stats.total.toString()} icon={<Briefcase className="w-5 h-5 text-blue-600" />} />
        <KpiCard label="Published" value={stats.active.toString()} icon={<Clock className="w-5 h-5 text-emerald-600" />} />
        <KpiCard label="Draft" value={stats.draft.toString()} icon={<Eye className="w-5 h-5 text-violet-600" />} />
        <KpiCard label="Pending Approval" value={stats.approvals.toString()} icon={<MapPin className="w-5 h-5 text-amber-600" />} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusOption)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {statusOptions.map((value) => (
              <option key={value} value={value}>
                {value === 'ALL' ? 'All Status' : value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
          <AlertCircle size={16} /> {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
          <CheckCircle size={16} /> {success}
        </div>
      ) : null}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Job Title</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Position</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Location</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Created</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Loading jobs...
                    </span>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm font-semibold text-rose-600">
                    <span className="inline-flex items-center gap-2">
                      <AlertCircle size={16} /> {error}
                    </span>
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm font-semibold text-slate-500">No jobs found.</td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{job.title}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{job.department.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{job.position.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{job.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{employmentLabel(job.employment_type)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        job.status === 'PUBLISHED'
                          ? 'bg-green-50 text-green-700'
                          : job.status === 'DRAFT'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(job.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {(job.status === 'DRAFT' || job.status === 'PENDING_APPROVAL') && (
                          <button
                            onClick={() => void runAction(job.id, 'approve')}
                            disabled={Boolean(isActionLoading)}
                            className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50 disabled:opacity-50"
                          >
                            {isActionLoading === `approve:${job.id}` ? '...' : 'Approve'}
                          </button>
                        )}
                        {job.status === 'APPROVED' && (
                          <button
                            onClick={() => void runAction(job.id, 'publish')}
                            disabled={Boolean(isActionLoading)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
                          >
                            <Rocket size={12} /> {isActionLoading === `publish:${job.id}` ? '...' : 'Publish'}
                          </button>
                        )}
                        <button
                          onClick={() => void runAction(job.id, 'rank')}
                          disabled={Boolean(isActionLoading)}
                          className="px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                        >
                          {isActionLoading === `rank:${job.id}` ? '...' : 'Rank'}
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

function KpiCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
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
