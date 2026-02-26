'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  User,
  Briefcase,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { employeesService } from '@/lib/services/employees';
import { departmentsService, type Department } from '@/lib/services/departments';
import { positionsService, type Position } from '@/lib/services/positions';
import { ApiClientError } from '@/lib/api-client';

const generateEmployeeCode = (firstName: string, lastName: string): string => {
  const first = firstName.trim().slice(0, 2).toUpperCase();
  const last = lastName.trim().slice(0, 2).toUpperCase();
  const stamp = Date.now().toString().slice(-5);
  return `${first}${last}-${stamp}`;
};

export default function AddEmployeePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successEmployeeName, setSuccessEmployeeName] = useState('');

  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isMetaLoading, setIsMetaLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    joiningDate: '',
    probationEndDate: '',
    employmentStatus: 'PROBATION' as 'PROBATION' | 'CONFIRMED' | 'SUSPENDED' | 'RESIGNED' | 'TERMINATED',
    departmentId: '',
    positionId: '',
    salary: ''
  });

  useEffect(() => {
    const loadMeta = async () => {
      try {
        setIsMetaLoading(true);
        const [departmentResponse, positionResponse] = await Promise.all([
          departmentsService.list({ page: 1, limit: 100 }),
          positionsService.list({ page: 1, limit: 100 })
        ]);

        setDepartments(departmentResponse.data);
        setPositions(positionResponse.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load departments/positions.');
        }
      } finally {
        setIsMetaLoading(false);
      }
    };

    void loadMeta();
  }, []);

  const filteredPositions = useMemo(() => {
    if (!formData.departmentId) return positions;
    return positions.filter((position) => position.department_id === formData.departmentId);
  }, [formData.departmentId, positions]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): string | null => {
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        return 'First name, last name, and email are required.';
      }

      const phone = formData.phone.trim();
      if (phone && (phone.length < 6 || phone.length > 20)) {
        return 'Phone must be between 6 and 20 characters.';
      }
    }

    if (step === 2) {
      if (!formData.departmentId || !formData.positionId) {
        return 'Department and position are required.';
      }

      if (formData.joiningDate && formData.probationEndDate) {
        const joiningDate = new Date(formData.joiningDate);
        const probationEndDate = new Date(formData.probationEndDate);
        if (probationEndDate < joiningDate) {
          return 'Probation end date cannot be before joining date.';
        }
      }
    }

    if (step === 3) {
      if (formData.salary) {
        const salary = Number(formData.salary);
        if (!Number.isFinite(salary) || salary <= 0) {
          return 'Salary must be a positive number.';
        }
      }
    }

    return null;
  };

  const steps = [
    { id: 1, label: 'Personnel', icon: <User size={18} /> },
    { id: 2, label: 'Placement', icon: <Briefcase size={18} /> },
    { id: 3, label: 'Financials', icon: <CreditCard size={18} /> },
    { id: 4, label: 'Validation', icon: <ShieldCheck size={18} /> }
  ];

  const submit = async () => {
    setError('');

    const step1Error = validateStep(1);
    if (step1Error) {
      setError(step1Error);
      return;
    }
    const step2Error = validateStep(2);
    if (step2Error) {
      setError(step2Error);
      return;
    }
    const step3Error = validateStep(3);
    if (step3Error) {
      setError(step3Error);
      return;
    }

    setIsSubmitting(true);

    try {
      await employeesService.create({
        employee_code: generateEmployeeCode(formData.firstName, formData.lastName),
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        ...(formData.phone ? { phone: formData.phone.trim() } : {}),
        ...(formData.joiningDate ? { hire_date: new Date(formData.joiningDate).toISOString() } : {}),
        ...(formData.probationEndDate ? { probation_end_date: new Date(formData.probationEndDate).toISOString() } : {}),
        department_id: formData.departmentId,
        position_id: formData.positionId,
        position_start_date: formData.joiningDate
          ? new Date(formData.joiningDate).toISOString()
          : new Date().toISOString(),
        employment_status: formData.employmentStatus,
        ...(formData.salary ? { base_salary: Number(formData.salary) } : {})
      });

      setSuccessEmployeeName(`${formData.firstName} ${formData.lastName}`);
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.message === 'No salary grade found in company scope for base_salary') {
          setError('Salary grades are not configured in backend. Create at least one salary grade or submit without salary.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to create employee.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setError('');

    const stepError = validateStep(currentStep);
    if (stepError) {
      setError(stepError);
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    void submit();
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-slate-950 text-white rounded-4xl flex items-center justify-center mb-6 shadow-2xl shadow-slate-200 rotate-3">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Record Initialized</h2>
        <p className="text-slate-400 mt-2 font-medium">System entry for {successEmployeeName} is now active.</p>
        <Link
          href="/hrms/employees/list"
          className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-[0.3em] uppercase hover:bg-slate-800 transition-all"
        >
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-5 max-w-350 mx-auto animate-in fade-in duration-700">
      <div className="mb-5 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Action // Intake</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Onboard <span className="text-slate-300 font-light italic">Talent</span></h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 space-y-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative flex items-center gap-3 p-3 rounded-4xl border transition-all duration-500 overflow-hidden ${
                currentStep === step.id
                  ? 'bg-slate-950 border-slate-950 text-white shadow-2xl shadow-slate-200'
                  : 'bg-white border-slate-100 text-slate-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${currentStep === step.id ? 'bg-white/10' : 'bg-slate-50'}`}>
                {step.icon}
              </div>
              <div className="flex flex-col z-10">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Protocol 0{step.id}</span>
                <span className="text-[11px] font-black uppercase tracking-tight">{step.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-9">
          <div className="bg-white border border-slate-100 rounded-4xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 lg:p-5">
            {isMetaLoading ? (
              <div className="min-h-[320px] flex items-center justify-center text-sm font-semibold text-slate-500">
                <Loader2 size={18} className="animate-spin mr-2" /> Loading master data...
              </div>
            ) : (
              <>
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                      <FormInput label="Legal First Name" value={formData.firstName} onChange={(v) => updateField('firstName', v)} placeholder="Michael" />
                      <FormInput label="Legal Last Name" value={formData.lastName} onChange={(v) => updateField('lastName', v)} placeholder="Scott" />
                      <FormInput label="Corporate Email" value={formData.email} onChange={(v) => updateField('email', v)} placeholder="m.scott@paper.com" type="email" />
                      <FormInput label="Secure Contact" value={formData.phone} onChange={(v) => updateField('phone', v)} placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                      <SelectInput
                        label="Organizational Unit"
                        value={formData.departmentId}
                        onChange={(value) => {
                          updateField('departmentId', value);
                          updateField('positionId', '');
                        }}
                        options={departments.map((department) => ({ value: department.id, label: `${department.name} (${department.code})` }))}
                        placeholder="Select a department"
                      />
                      <SelectInput
                        label="Operational Rank"
                        value={formData.positionId}
                        onChange={(value) => updateField('positionId', value)}
                        options={filteredPositions.map((position) => ({ value: position.id, label: `${position.title} (${position.code})` }))}
                        placeholder="Select a position"
                      />
                      <FormInput label="Initialization Date" value={formData.joiningDate} onChange={(v) => updateField('joiningDate', v)} type="date" />
                      <FormInput label="Probation End Date" value={formData.probationEndDate} onChange={(v) => updateField('probationEndDate', v)} type="date" />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                      <SelectInput
                        label="Employment Status"
                        value={formData.employmentStatus}
                        onChange={(value) => updateField('employmentStatus', value)}
                        options={[
                          { value: 'PROBATION', label: 'Probation' },
                          { value: 'CONFIRMED', label: 'Confirmed' },
                          { value: 'SUSPENDED', label: 'Suspended' },
                          { value: 'RESIGNED', label: 'Resigned' },
                          { value: 'TERMINATED', label: 'Terminated' }
                        ]}
                      />
                      <FormInput label="Gross Annual Compensation ($)" value={formData.salary} onChange={(v) => updateField('salary', v)} placeholder="120000" type="number" />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="p-4 bg-slate-50 rounded-4xl space-y-4 border border-slate-100">
                      <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Summary Dossier</h3>
                      <div className="grid grid-cols-2 gap-y-3 text-[11px] font-medium">
                        <SummaryItem label="Subject" value={`${formData.firstName} ${formData.lastName}`} />
                        <SummaryItem label="Registry Email" value={formData.email} align="right" />
                        <SummaryItem
                          label="Department"
                          value={departments.find((x) => x.id === formData.departmentId)?.name ?? '-'}
                          borderTop
                        />
                        <SummaryItem
                          label="Position"
                          value={positions.find((x) => x.id === formData.positionId)?.title ?? '-'}
                          align="right"
                          borderTop
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {error ? (
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-rose-600">
                <AlertCircle size={14} /> {error}
              </div>
            ) : null}

            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${
                  currentStep === 1 ? 'invisible' : 'text-slate-400 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <ChevronLeft size={16} /> Previous Phase
              </button>

              <button
                onClick={handleNext}
                disabled={isSubmitting || isMetaLoading}
                className="flex items-center gap-2.5 px-6 py-3 bg-slate-950 text-white rounded-2xl text-[9px] font-black tracking-[0.25em] uppercase hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Submitting
                  </>
                ) : currentStep === 4 ? (
                  <>
                    Finalize & Commit <Save size={18} />
                  </>
                ) : (
                  <>
                    Progress <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text'
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-1 focus:ring-slate-950 transition-all outline-none text-[11px] font-bold text-slate-900 placeholder:text-slate-300"
      />
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select'
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-1 focus:ring-slate-950 transition-all outline-none text-[11px] font-bold text-slate-900"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  align,
  borderTop
}: {
  label: string;
  value: string;
  align?: 'left' | 'right';
  borderTop?: boolean;
}) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'text-right' : ''} ${borderTop ? 'border-t border-slate-200 pt-3' : ''}`}>
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
      <span className="text-slate-900">{value || '-'}</span>
    </div>
  );
}
