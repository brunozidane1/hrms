'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { AlertCircle, DollarSign, Loader2, Plus, Search, Users } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { salaryService, type SalaryGradeRecord } from '@/lib/services/salary';

const currency = (amount: number, code: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code || 'USD',
    maximumFractionDigits: 0
  }).format(amount);

export default function SalaryStructurePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [grades, setGrades] = useState<SalaryGradeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ name: '', code: '', minSalary: '', maxSalary: '', currency: 'USD' });

  const loadGrades = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await salaryService.listGrades({ page: 1, limit: 100 });
      setGrades(response.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load salary grades.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadGrades();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return grades;
    return grades.filter((grade) => grade.name.toLowerCase().includes(q) || grade.code.toLowerCase().includes(q) || grade.currency.toLowerCase().includes(q));
  }, [grades, searchQuery]);

  const stats = useMemo(() => {
    const gradeCount = grades.length;
    const avgMinSalary = gradeCount ? grades.reduce((sum, grade) => sum + Number(grade.min_salary), 0) / gradeCount : 0;
    const avgMaxSalary = gradeCount ? grades.reduce((sum, grade) => sum + Number(grade.max_salary), 0) / gradeCount : 0;
    const mappedSalaries = grades.reduce((sum, grade) => sum + (grade._count?.salaries ?? 0), 0);
    return { gradeCount, avgMinSalary, avgMaxSalary, mappedSalaries };
  }, [grades]);

  const createGrade = async () => {
    setError('');
    setSuccess('');

    const name = form.name.trim();
    const code = form.code.trim().toUpperCase();
    const minSalary = Number(form.minSalary);
    const maxSalary = Number(form.maxSalary);

    if (!name || !code || !form.minSalary.trim() || !form.maxSalary.trim() || !form.currency.trim()) {
      setError('Name, code, min salary, max salary, and currency are required.');
      return;
    }

    if (!Number.isFinite(minSalary) || minSalary < 0 || !Number.isFinite(maxSalary) || maxSalary <= 0) {
      setError('Salaries must be valid positive numbers.');
      return;
    }

    if (maxSalary <= minSalary) {
      setError('Max salary must be greater than min salary.');
      return;
    }

    setIsSubmitting(true);
    try {
      await salaryService.createGrade({
        name,
        code,
        min_salary: minSalary,
        max_salary: maxSalary,
        currency: form.currency.trim().toUpperCase()
      });
      setSuccess('Salary grade created successfully.');
      setForm({ name: '', code: '', minSalary: '', maxSalary: '', currency: 'USD' });
      await loadGrades();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create salary grade.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salary Structure</h1>
          <p className="text-gray-600 mt-1">Manage salary grades and pay ranges.</p>
        </div>
      </div>

      {error ? <p className="inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="inline-flex items-center gap-2 text-sm text-emerald-600"><Plus size={16} /> {success}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Grades" value={String(stats.gradeCount)} icon={<DollarSign className="w-5 h-5 text-blue-600" />} />
        <StatCard label="Avg. Min Salary" value={currency(stats.avgMinSalary, 'USD')} icon={<DollarSign className="w-5 h-5 text-emerald-600" />} />
        <StatCard label="Avg. Max Salary" value={currency(stats.avgMaxSalary, 'USD')} icon={<DollarSign className="w-5 h-5 text-indigo-600" />} />
        <StatCard label="Mapped Salaries" value={String(stats.mappedSalaries)} icon={<Users className="w-5 h-5 text-purple-600" />} />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Create Salary Grade</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input value={form.name} onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))} placeholder="Name" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input value={form.code} onChange={(e) => setForm((c) => ({ ...c, code: e.target.value }))} placeholder="Code (e.g. SG-1)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.minSalary} onChange={(e) => setForm((c) => ({ ...c, minSalary: e.target.value }))} placeholder="Min salary" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input type="number" value={form.maxSalary} onChange={(e) => setForm((c) => ({ ...c, maxSalary: e.target.value }))} placeholder="Max salary" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
          <input value={form.currency} onChange={(e) => setForm((c) => ({ ...c, currency: e.target.value }))} placeholder="Currency (USD)" className="px-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
        <button onClick={() => void createGrade()} disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Create Grade
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search by name/code/currency..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Code</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Min Salary</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Max Salary</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Currency</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Mapped Salaries</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500 inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading salary grades...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">No salary grades found.</td></tr>
              ) : (
                filtered.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-900">{grade.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{grade.code}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{currency(Number(grade.min_salary), grade.currency)}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{currency(Number(grade.max_salary), grade.currency)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{grade.currency}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-blue-700">{grade._count?.salaries ?? 0}</td>
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

function StatCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
