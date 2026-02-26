'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Briefcase, Loader2, MapPin, Search, AlertCircle } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { atsService, type CareerJob } from '@/lib/services/ats';

const formatEmploymentType = (value: CareerJob['employment_type']) => {
  switch (value) {
    case 'PERMANENT':
      return 'Full-time';
    case 'CONTRACT':
      return 'Contract';
    case 'INTERN':
      return 'Internship';
    case 'CONSULTANT':
      return 'Consulting';
    default:
      return value;
  }
};

const formatSalary = (min: CareerJob['salary_range_min'], max: CareerJob['salary_range_max']) => {
  const minValue = min === null ? null : Number(min);
  const maxValue = max === null ? null : Number(max);

  if (minValue === null && maxValue === null) {
    return 'Salary not specified';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  if (minValue !== null && maxValue !== null) {
    return `${formatter.format(minValue)} - ${formatter.format(maxValue)}`;
  }

  if (minValue !== null) {
    return `${formatter.format(minValue)}+`;
  }

  return `Up to ${formatter.format(maxValue ?? 0)}`;
};

export default function CareersPage() {
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCareers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await atsService.listCareers({
        page: 1,
        limit: 100,
        ...(search.trim() ? { search: search.trim() } : {}),
        ...(location.trim() ? { location: location.trim() } : {})
      });
      setJobs(response.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load careers.');
      }
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      void loadCareers();
    }, 250);
    return () => clearTimeout(timeout);
  }, [search, location]);

  const resultLabel = useMemo(() => {
    if (isLoading) return 'Loading open roles...';
    if (jobs.length === 1) return '1 role available';
    return `${jobs.length} roles available`;
  }, [isLoading, jobs.length]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-700 mb-2">Careers</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Find Your Next Role</h1>
          <p className="text-slate-600 mt-3">Browse active openings and apply in minutes.</p>
        </header>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm mb-6">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title or keywords"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
            <label className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Filter by location"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-3">{resultLabel}</p>
        </div>

        {error ? (
          <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        ) : null}

        <div className="grid gap-4">
          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-600 inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading careers...
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-600">
              No open roles found for the current filters.
            </div>
          ) : (
            jobs.map((job) => (
              <article key={job.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
                    <p className="text-slate-600 mt-1">{job.department.name} • {job.position.title}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                        <Briefcase className="w-3 h-3" />
                        {formatEmploymentType(job.employment_type)}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {job.location}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                        {formatSalary(job.salary_range_min, job.salary_range_max)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/careers/${job.id}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
                  >
                    View & Apply
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
