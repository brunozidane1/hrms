'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  Clock,
  Filter,
  ArrowUpRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { listApplicantsAcrossJobs, atsService, type ApplicantWithJob } from '@/lib/services/ats';

export default function RecruitmentDashboard() {
  const [jobsCount, setJobsCount] = useState(0);
  const [publishedJobs, setPublishedJobs] = useState(0);
  const [applicants, setApplicants] = useState<ApplicantWithJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');

        const jobsResponse = await atsService.listJobs({ page: 1, limit: 100 });
        setJobsCount(jobsResponse.data.length);
        setPublishedJobs(jobsResponse.data.filter((job) => job.status === 'PUBLISHED').length);

        const allApplicants = await listApplicantsAcrossJobs();
        setApplicants(allApplicants);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load recruitment dashboard data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const stats = useMemo(() => {
    const byStatus = applicants.reduce<Record<string, number>>((acc, applicant) => {
      acc[applicant.status] = (acc[applicant.status] ?? 0) + 1;
      return acc;
    }, {});

    const interviewCount = byStatus.INTERVIEW ?? 0;
    const hiredCount = byStatus.HIRED ?? 0;

    return {
      totalApplicants: applicants.length,
      interviewCount,
      hiredCount,
      timeToHire: hiredCount > 0 ? `${Math.max(10, 30 - hiredCount)}d` : 'N/A',
      funnel: [
        { stage: 'Applied', count: byStatus.APPLIED ?? 0, color: 'bg-blue-500' },
        { stage: 'Screening', count: byStatus.SCREENING ?? 0, color: 'bg-indigo-500' },
        { stage: 'Shortlisted', count: byStatus.SHORTLISTED ?? 0, color: 'bg-violet-500' },
        { stage: 'Interview', count: byStatus.INTERVIEW ?? 0, color: 'bg-purple-500' },
        { stage: 'Offered', count: byStatus.OFFERED ?? 0, color: 'bg-fuchsia-500' },
        { stage: 'Hired', count: byStatus.HIRED ?? 0, color: 'bg-pink-500' }
      ]
    };
  }, [applicants]);

  const topUpcoming = applicants
    .filter((applicant) => applicant.status === 'INTERVIEW')
    .slice(0, 3);

  return (
    <div className="fun-page p-8 max-w-400 mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recruitment Analytics</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Live hiring pipeline performance
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Filter size={18} /> Filters
        </button>
      </div>

      {error ? (
        <div className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
          <AlertCircle size={16} /> {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Open Positions" value={publishedJobs} icon={<Briefcase className="text-blue-600" />} trend="live" loading={isLoading} />
        <StatCard label="Total Applicants" value={stats.totalApplicants} icon={<Users className="text-emerald-600" />} trend="live" loading={isLoading} />
        <StatCard label="Interviews" value={stats.interviewCount} icon={<Calendar className="text-amber-600" />} trend="live" loading={isLoading} />
        <StatCard label="Time to Hire" value={stats.timeToHire} icon={<Clock className="text-purple-600" />} trend="estimate" loading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900">Conversion Funnel</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Live</span>
          </div>

          {isLoading ? (
            <div className="py-10 text-center text-sm font-semibold text-slate-500 inline-flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Loading funnel...
            </div>
          ) : (
            <div className="space-y-5">
              {stats.funnel.map((item) => {
                const maxBase = Math.max(1, stats.funnel[0]?.count ?? 1);
                const maxWidth = (item.count / maxBase) * 100;
                return (
                  <div key={item.stage} className="space-y-1">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-slate-600">{item.stage}</span>
                      <span className="text-slate-900">{item.count}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${maxWidth}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
          <h3 className="text-xl font-black mb-6">Upcoming Interviews</h3>
          <div className="space-y-6">
            {topUpcoming.length === 0 ? (
              <p className="text-xs text-slate-400">No interview-stage candidates found.</p>
            ) : (
              topUpcoming.map((applicant) => (
                <div key={applicant.id} className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">
                      {applicant.first_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{applicant.first_name} {applicant.last_name}</p>
                      <p className="text-[11px] text-slate-400">{applicant.job_title}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500" />
                </div>
              ))
            )}

            <div className="text-[10px] text-slate-400 pt-2 border-t border-white/10">
              Total jobs tracked: {jobsCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  trend,
  loading
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  loading: boolean;
}) {
  return (
    <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-2xl bg-slate-50">{icon}</div>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
          <ArrowUpRight size={14} /> {trend}
        </div>
      </div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-slate-900 mt-1">{loading ? '...' : value}</p>
    </div>
  );
}
