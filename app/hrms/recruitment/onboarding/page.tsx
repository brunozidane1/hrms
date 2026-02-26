'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, User, Calendar, ClipboardCheck, Loader2 } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { atsService, type OnboardingRecord } from '@/lib/services/ats';

export default function OnboardingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | OnboardingRecord['status']>('ALL');
  const [records, setRecords] = useState<OnboardingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinalizingOfferId, setIsFinalizingOfferId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadOnboarding = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      const response = await atsService.listOnboarding({
        page: 1,
        limit: 100,
        ...(statusFilter !== 'ALL' ? { status: statusFilter } : {}),
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {})
      });
      setRecords(response.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load onboarding records.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadOnboarding();
  }, [searchQuery, statusFilter]);

  const finalizePreOnboarding = async (record: OnboardingRecord) => {
    setError('');
    setSuccess('');

    const latestOffer = record.offer_letters[0];
    if (!latestOffer || latestOffer.status !== 'SENT') {
      setError('No sent offer found for this candidate.');
      return;
    }

    setIsFinalizingOfferId(latestOffer.id);
    try {
      const result = await atsService.acceptOffer(latestOffer.id);
      setSuccess(`Pre-onboarding finalized. Employee created with ID: ${result.employeeId}`);
      await loadOnboarding();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to finalize pre-onboarding.');
      }
    } finally {
      setIsFinalizingOfferId(null);
    }
  };

  const stats = useMemo(() => {
    const hired = records.filter((record) => record.status === 'HIRED').length;
    const offered = records.filter((record) => record.status === 'OFFERED').length;

    return {
      active: offered,
      completed: hired,
      startingSoon: records.length,
      avgCompletion: records.length === 0 ? 'N/A' : `${Math.round((hired / records.length) * 100)}%`
    };
  }, [records]);

  return (
    <div className="fun-page p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onboarding</h1>
          <p className="text-gray-600 mt-1">Track onboarding from ATS onboarding API</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card label="Active Onboarding" value={stats.active.toString()} icon={<User className="w-5 h-5 text-blue-600" />} />
        <Card label="Completed" value={stats.completed.toString()} icon={<CheckCircle className="w-5 h-5 text-green-600" />} />
        <Card label="Starting Soon" value={stats.startingSoon.toString()} icon={<Calendar className="w-5 h-5 text-purple-600" />} />
        <Card label="Avg. Completion" value={stats.avgCompletion} icon={<ClipboardCheck className="w-5 h-5 text-amber-600" />} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'ALL' | OnboardingRecord['status'])}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="OFFERED">Offered</option>
            <option value="HIRED">Hired</option>
          </select>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading onboarding records...
          </div>
        ) : records.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500">No onboarding candidates found.</div>
        ) : (
          records.map((record) => (
            <div key={record.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{record.first_name} {record.last_name}</h3>
                  <p className="text-sm text-gray-600">{record.job_posting.title} | {record.job_posting.department.name}</p>
                  <div className="mt-2 text-xs text-gray-500 inline-flex items-center gap-2">
                    <Clock size={14} /> Last updated: {new Date(record.updated_at).toLocaleString()}
                  </div>
                  {record.offer_letters[0] ? (
                    <div className="mt-2 text-xs text-gray-500">
                      Start date: {new Date(record.offer_letters[0].start_date).toLocaleDateString()}
                    </div>
                  ) : null}
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${record.status === 'HIRED' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  {record.status === 'HIRED' ? <CheckCircle size={14} /> : <Clock size={14} />} {record.status}
                </span>
              </div>
              {record.status === 'OFFERED' && record.offer_letters[0]?.status === 'SENT' ? (
                <div className="mt-4">
                  <button
                    onClick={() => void finalizePreOnboarding(record)}
                    disabled={isFinalizingOfferId === record.offer_letters[0].id}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {isFinalizingOfferId === record.offer_letters[0].id ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Finalizing...
                      </>
                    ) : (
                      'Finalize Pre-Onboarding'
                    )}
                  </button>
                </div>
              ) : null}
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
