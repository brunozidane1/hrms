'use client';

import React from 'react';
import { 
  BarChart3, 
  Settings2, 
  ShieldCheck, 
  HandCoins, 
  PlayCircle, 
  Receipt,
  ChevronRight,
  CreditCard,
  AlertCircle,
  TrendingUp,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { payrollService } from '@/lib/services/payroll';

export default function PayrollHome() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const runPayrollNow = async () => {
    setError('');
    setSuccess('');
    setIsRunning(true);
    try {
      const periods = await payrollService.listPeriods({ page: 1, limit: 1, status: 'OPEN' });
      const openPeriod = periods.data[0];
      if (!openPeriod) {
        setError('No OPEN payroll period found. Create one first in Payroll Run page.');
        return;
      }
      await payrollService.runPayroll(openPeriod.id);
      setSuccess(`Payroll run started for period: ${openPeriod.name}.`);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to run payroll.');
      }
    } finally {
      setIsRunning(false);
    }
  };

  const payrollModules = [
    { 
      title: "Payroll Dashboard", 
      desc: "Financial summaries, variance reports, and historical payroll data.", 
      icon: <BarChart3 className="text-blue-600" />, 
      href: "/hrms/payroll/dashboard",
      color: "blue"
    },
    { 
      title: "Salary Configuration", 
      desc: "Define base pay, HRA, bonuses, and custom allowance structures.", 
      icon: <Settings2 className="text-slate-600" />, 
      href: "/hrms/payroll/salary-structure",
      color: "slate"
    },
    { 
      title: "Tax & Compliance", 
      desc: "Manage TDS, PF, ESI, and statutory legal reporting requirements.", 
      icon: <ShieldCheck className="text-emerald-600" />, 
      href: "/hrms/payroll/tax",
      color: "emerald"
    },
    { 
      title: "Loans & Advances", 
      desc: "Track employee debt, interest rates, and automated EMI deductions.", 
      icon: <HandCoins className="text-amber-600" />, 
      href: "/hrms/payroll/loans",
      color: "amber"
    },
    { 
      title: "Reimbursements", 
      desc: "Review expense claims, mileage, and corporate spending receipts.", 
      icon: <Receipt className="text-indigo-600" />, 
      href: "/hrms/payroll/reimbursements",
      color: "indigo",
      tag: "12 Pending"
    }
  ];

  return (
    <div className="fun-page p-8 max-w-350 mx-auto animate-in fade-in duration-700">
      {error ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-rose-600"><AlertCircle size={16} /> {error}</p> : null}
      {success ? <p className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-600"><CheckCircle size={16} /> {success}</p> : null}
      
      {/* Financial Status Header */}
      <div className="flex flex-col xl:flex-row gap-8 mb-12">
        <div className="flex-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payroll & Finance</h1>
          <p className="text-slate-500 mt-1 font-medium italic">February 2026 Cycle • Disbursal due in 10 days</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Estimated Liability</p>
                <p className="text-xl font-black text-slate-900">$428,500.00</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Compliance Score</p>
                <p className="text-xl font-black text-slate-900">100% Secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Card */}
        <div className="xl:w-96 bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <AlertCircle size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Next Run: Feb 28</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Process February Payroll</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              System has captured all attendance and reimbursement data. Ready for verification.
            </p>
            <button
              onClick={() => void runPayrollNow()}
              disabled={isRunning}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/40 disabled:opacity-60"
            >
              {isRunning ? <Loader2 size={20} className="animate-spin" /> : <PlayCircle size={20} />}
              {isRunning ? 'Running...' : 'Run Payroll Now'}
            </button>
            <a href="/hrms/payroll/run" className="mt-3 inline-flex text-xs text-slate-300 hover:text-white">
              Open advanced payroll run page
            </a>
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payrollModules.map((m, idx) => (
          <a 
            key={idx} 
            href={m.href}
            className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-${m.color}-50 flex items-center justify-center transition-transform group-hover:rotate-6`}>
                {m.icon}
              </div>
              {m.tag && (
                <span className="text-[10px] font-black bg-rose-50 text-rose-600 px-2.5 py-1 rounded-lg uppercase">
                  {m.tag}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {m.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {m.desc}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">Configure</span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
