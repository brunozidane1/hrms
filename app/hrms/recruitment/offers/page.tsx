'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Plus, Search, DollarSign, Calendar, Send, CheckCircle, Clock, Loader2, AlertCircle, RefreshCcw, Trash2 } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import {
  atsService,
  listApplicantsAcrossJobs,
  type ApplicantWithJob,
  type OfferRecord,
  type OfferTemplateRecord
} from '@/lib/services/ats';

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | OfferRecord['status']>('ALL');
  const [applicants, setApplicants] = useState<ApplicantWithJob[]>([]);
  const [templates, setTemplates] = useState<OfferTemplateRecord[]>([]);
  const [offers, setOffers] = useState<OfferRecord[]>([]);

  const [form, setForm] = useState({ applicantId: '', templateId: '', salary: '', startDate: '' });
  const [updateForm, setUpdateForm] = useState({ offerId: '', salary: '', startDate: '' });
  const [acceptOfferId, setAcceptOfferId] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoadingApplicants, setIsLoadingApplicants] = useState(true);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadOffers = async () => {
    try {
      setIsLoadingOffers(true);
      setError('');
      const response = await atsService.listOffers({
        page: 1,
        limit: 100,
        ...(statusFilter !== 'ALL' ? { status: statusFilter } : {}),
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {})
      });
      setOffers(response.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load offers.');
      }
    } finally {
      setIsLoadingOffers(false);
    }
  };

  useEffect(() => {
    const loadApplicants = async () => {
      setIsLoadingApplicants(true);
      setError('');

      const [applicantsResult, templatesResult] = await Promise.allSettled([
        listApplicantsAcrossJobs(),
        atsService.listOfferTemplates({ page: 1, limit: 100 })
      ]);

      if (applicantsResult.status === 'fulfilled') {
        const eligible = applicantsResult.value.filter((applicant) =>
          ['APPLIED', 'SCREENING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED'].includes(applicant.status)
        );
        setApplicants(eligible);
        if (eligible[0]) {
          setForm((current) => ({ ...current, applicantId: current.applicantId || eligible[0].id }));
        }
      } else {
        const reason = applicantsResult.reason;
        if (reason instanceof ApiClientError) {
          setError(`Applicants lookup failed: ${reason.message}`);
        } else {
          setError('Applicants lookup failed.');
        }
      }

      if (templatesResult.status === 'fulfilled') {
        const templateList = templatesResult.value.data;
        setTemplates(templateList);
        if (templateList[0]) {
          setForm((current) => ({ ...current, templateId: current.templateId || templateList[0].id }));
        }
      } else {
        const reason = templatesResult.reason;
        if (reason instanceof ApiClientError) {
          setError((current) => `${current ? `${current} ` : ''}Offer template lookup failed: ${reason.message}`);
        } else {
          setError((current) => `${current ? `${current} ` : ''}Offer template lookup failed.`);
        }
      }

      setIsLoadingApplicants(false);
    };

    void loadApplicants();
  }, []);

  useEffect(() => {
    void loadOffers();
  }, [searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const sent = offers.filter((offer) => offer.status === 'SENT').length;
    const accepted = offers.filter((offer) => offer.status === 'ACCEPTED').length;
    const declined = offers.filter((offer) => offer.status === 'DECLINED').length;

    return {
      total: offers.length,
      sent,
      accepted,
      declined
    };
  }, [offers]);

  const createOffer = async () => {
    setError('');
    setSuccess('');

    const applicantId = form.applicantId.trim();
    const templateId = form.templateId.trim();
    const salary = Number(form.salary);
    const parsedStartDate = form.startDate ? new Date(form.startDate) : null;

    if (!applicantId || !templateId || !form.salary.trim() || !form.startDate.trim()) {
      setError('Applicant ID, template ID, salary, and start date are required.');
      return;
    }

    if (!Number.isFinite(salary) || salary <= 0) {
      setError('Salary must be a positive number.');
      return;
    }

    if (!parsedStartDate || Number.isNaN(parsedStartDate.getTime())) {
      setError('Start date is invalid.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await atsService.generateOffer(applicantId, {
        template_id: templateId,
        offered_salary: salary,
        start_date: parsedStartDate.toISOString()
      });
      setSuccess('Offer generated successfully.');
      setUpdateForm((current) => ({ ...current, offerId: created.id }));
      await loadOffers();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create offer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateOffer = async () => {
    setError('');
    setSuccess('');

    if (!updateForm.offerId.trim() || (!updateForm.salary.trim() && !updateForm.startDate.trim())) {
      setError('Offer ID and at least one update field are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await atsService.updateOffer(updateForm.offerId.trim(), {
        ...(updateForm.salary.trim() ? { offered_salary: Number(updateForm.salary) } : {}),
        ...(updateForm.startDate.trim() ? { start_date: new Date(updateForm.startDate).toISOString() } : {})
      });
      setSuccess('Offer updated successfully.');
      await loadOffers();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to update offer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const acceptOffer = async () => {
    setError('');
    setSuccess('');

    if (!acceptOfferId.trim()) {
      setError('Offer ID is required to accept an offer.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await atsService.acceptOffer(acceptOfferId.trim());
      setSuccess(`Offer accepted. Employee created with ID: ${result.employeeId}`);
      await loadOffers();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to accept offer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOffer = async (offerId: string) => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await atsService.resendOffer(offerId);
      setSuccess('Offer resent successfully.');
      await loadOffers();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to resend offer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeOffer = async (offerId: string) => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await atsService.deleteOffer(offerId);
      setSuccess('Offer deleted successfully.');
      await loadOffers();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to delete offer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fun-page p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offer Letters</h1>
          <p className="text-gray-600 mt-1">Generate and manage ATS offers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total" value={stats.total.toString()} icon={<Send className="w-5 h-5 text-blue-600" />} />
        <StatCard label="Sent" value={stats.sent.toString()} icon={<Clock className="w-5 h-5 text-amber-600" />} />
        <StatCard label="Accepted" value={stats.accepted.toString()} icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} />
        <StatCard label="Declined" value={stats.declined.toString()} icon={<AlertCircle className="w-5 h-5 text-rose-600" />} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Create Offer</h2>

        {isLoadingApplicants ? (
          <p className="inline-flex items-center gap-2 text-sm text-slate-500"><Loader2 size={16} className="animate-spin" /> Loading candidates...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={form.applicantId}
              onChange={(e) => setForm((current) => ({ ...current, applicantId: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            >
              <option value="">Select applicant</option>
              {applicants.map((applicant) => (
                <option key={applicant.id} value={applicant.id}>{applicant.first_name} {applicant.last_name} - {applicant.job_title}</option>
              ))}
            </select>
            {templates.length > 0 ? (
              <select
                value={form.templateId}
                onChange={(e) => setForm((current) => ({ ...current, templateId: e.target.value }))}
                className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
              >
                <option value="">Select offer template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={form.templateId}
                onChange={(e) => setForm((current) => ({ ...current, templateId: e.target.value }))}
                placeholder="Offer template UUID"
                className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
              />
            )}
            <input
              type="number"
              min={1}
              value={form.salary}
              onChange={(e) => setForm((current) => ({ ...current, salary: e.target.value }))}
              placeholder="Offered salary"
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm((current) => ({ ...current, startDate: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>
        )}

        <button
          onClick={() => void createOffer()}
          disabled={isSubmitting || isLoadingApplicants}
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Offer
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Update Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={updateForm.offerId}
            onChange={(e) => setUpdateForm((current) => ({ ...current, offerId: e.target.value }))}
            placeholder="Offer UUID"
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          />
          <input
            type="number"
            min={1}
            value={updateForm.salary}
            onChange={(e) => setUpdateForm((current) => ({ ...current, salary: e.target.value }))}
            placeholder="New salary"
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          />
          <input
            type="date"
            value={updateForm.startDate}
            onChange={(e) => setUpdateForm((current) => ({ ...current, startDate: e.target.value }))}
            className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
          />
        </div>
        <button
          onClick={() => void updateOffer()}
          disabled={isSubmitting}
          className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-60"
        >
          Update Offer
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Accept Offer</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={acceptOfferId}
            onChange={(e) => setAcceptOfferId(e.target.value)}
            placeholder="Offer UUID"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none"
          />
          <button
            onClick={() => void acceptOffer()}
            disabled={isSubmitting}
            className="px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-60"
          >
            Accept Offer
          </button>
        </div>
      </div>

      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by candidate name, email, or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'ALL' | OfferRecord['status'])}
          className="px-4 py-3 border border-gray-300 rounded-xl outline-none"
        >
          <option value="ALL">All Status</option>
          <option value="SENT">Sent</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="DECLINED">Declined</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoadingOffers ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500 inline-flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Loading offers...
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-slate-500">No offers found.</div>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{offer.applicant.first_name} {offer.applicant.last_name}</h3>
                  <p className="text-sm text-gray-600">{offer.applicant.job_posting.title}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
                    <span className="inline-flex items-center gap-1"><DollarSign size={14} /> {Number(offer.offered_salary).toLocaleString()}</span>
                    <span className="inline-flex items-center gap-1"><Calendar size={14} /> {new Date(offer.start_date).toLocaleDateString()}</span>
                    <span className="inline-flex items-center gap-1"><Send size={14} /> {offer.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {offer.status !== 'ACCEPTED' ? (
                    <>
                      <button
                        onClick={() => void resendOffer(offer.id)}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 disabled:opacity-60"
                      >
                        <RefreshCcw size={13} /> Resend
                      </button>
                      <button
                        onClick={() => void removeOffer(offer.id)}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-60"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </>
                  ) : null}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${offer.status === 'ACCEPTED' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {offer.status === 'ACCEPTED' ? <CheckCircle size={14} className="inline mr-1" /> : <Clock size={14} className="inline mr-1" />} {offer.status}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Offer ID: {offer.id}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
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
