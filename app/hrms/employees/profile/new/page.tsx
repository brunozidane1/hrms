'use client';

import { useState } from 'react';
import { 
  User, Briefcase, CreditCard, ShieldCheck, ChevronRight, 
  ChevronLeft, Save, CheckCircle2, Terminal, Database
} from 'lucide-react';

export default function SovereignAddEmployee() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    department: '', designation: '', joiningDate: '', employeeType: 'Full-time',
    bankName: '', accountNumber: '', taxId: '', salary: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { id: 1, label: 'Personnel', icon: <User size={18} /> },
    { id: 2, label: 'Placement', icon: <Briefcase size={18} /> },
    { id: 3, label: 'Financials', icon: <CreditCard size={18} /> },
    { id: 4, label: 'Validation', icon: <ShieldCheck size={18} /> },
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
    else setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-slate-950 text-white rounded-4xl flex items-center justify-center mb-6 shadow-2xl shadow-slate-200 rotate-3">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Record Initialized</h2>
        <p className="text-slate-400 mt-2 font-medium">System entry for {formData.firstName} {formData.lastName} is now active.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-[0.3em] uppercase hover:bg-slate-800 transition-all"
        >
          Return to Console
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-5 max-w-350 mx-auto animate-in fade-in duration-700">
      
      {/* Header */}
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
        
        {/* Navigation Sidebar (3 Columns) */}
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
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                currentStep === step.id ? 'bg-white/10' : 'bg-slate-50'
              }`}>
                {step.icon}
              </div>
              <div className="flex flex-col z-10">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-50">Protocol 0{step.id}</span>
                <span className="text-[11px] font-black uppercase tracking-tight">{step.label}</span>
              </div>
              {currentStep > step.id && (
                 <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
              )}
            </div>
          ))}
          
             <div className="p-3.5 bg-slate-50 rounded-4xl mt-3">
               <div className="flex items-center gap-2 mb-2.5 text-slate-900">
                <Terminal size={14} />
               <span className="text-[9px] font-black uppercase tracking-widest">Security Note</span>
             </div>
             <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                All PII (Personally Identifiable Information) is encrypted at rest using AES-256 standards.
             </p>
          </div>
        </div>

        {/* Form Area (9 Columns) */}
        <div className="lg:col-span-9">
          <div className="bg-white border border-slate-100 rounded-4xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-4 lg:p-5">
            
            <div>
              {/* STEP 1: PERSONAL */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    <FormInput label="Legal First Name" value={formData.firstName} onChange={(v: string) => updateField('firstName', v)} placeholder="Michael" />
                    <FormInput label="Legal Last Name" value={formData.lastName} onChange={(v: string) => updateField('lastName', v)} placeholder="Scott" />
                    <FormInput label="Corporate Email" value={formData.email} onChange={(v: string) => updateField('email', v)} placeholder="m.scott@paper.com" type="email" />
                    <FormInput label="Secure Contact" value={formData.phone} onChange={(v: string) => updateField('phone', v)} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              )}

              {/* STEP 2: PLACEMENT */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    <FormInput label="Organizational Unit" value={formData.department} onChange={(v: string) => updateField('department', v)} placeholder="Sales" />
                    <FormInput label="Operational Rank" value={formData.designation} onChange={(v: string) => updateField('designation', v)} placeholder="Regional Manager" />
                    <FormInput label="Initialization Date" value={formData.joiningDate} onChange={(v: string) => updateField('joiningDate', v)} type="date" />
                    <div className="space-y-2.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Engagement Type</label>
                      <select 
                        value={formData.employeeType}
                        onChange={(e) => updateField('employeeType', e.target.value)}
                        className="w-full px-3.5 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:ring-1 focus:ring-slate-950 transition-all outline-none text-[11px] font-black uppercase tracking-widest"
                      >
                        <option>Full-time</option>
                        <option>Contract</option>
                        <option>Intern</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: FINANCIALS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    <FormInput label="Primary Institution" value={formData.bankName} onChange={(v: string) => updateField('bankName', v)} placeholder="Sovereign Reserve" />
                    <FormInput label="Account Routing" value={formData.accountNumber} onChange={(v: string) => updateField('accountNumber', v)} placeholder="0000 1111 2222" />
                    <FormInput label="Government Tax ID" value={formData.taxId} onChange={(v: string) => updateField('taxId', v)} placeholder="XXX-XX-XXXX" />
                    <FormInput label="Gross Annual Compensation ($)" value={formData.salary} onChange={(v: string) => updateField('salary', v)} placeholder="120000" type="number" />
                  </div>
                </div>
              )}

              {/* STEP 4: VALIDATION */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="p-4 bg-slate-50 rounded-4xl space-y-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                       <Database size={18} className="text-slate-950" />
                      <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Summary Dossier</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 text-[11px] font-medium">
                      <div className="flex flex-col">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</span>
                         <span className="text-slate-900">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex flex-col text-right">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Placement</span>
                         <span className="text-slate-900">{formData.designation}</span>
                      </div>
                      <div className="flex flex-col border-t border-slate-200 pt-3">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Comp Range</span>
                         <span className="text-slate-900">${formData.salary} / ANNUM</span>
                      </div>
                      <div className="flex flex-col border-t border-slate-200 pt-3 text-right">
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Registry Email</span>
                         <span className="text-slate-900">{formData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${
                  currentStep === 1 ? 'invisible' : 'text-slate-400 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <ChevronLeft size={16} /> Previous Phase
              </button>

              <button 
                onClick={handleNext}
                className="flex items-center gap-2.5 px-6 py-3 bg-slate-950 text-white rounded-2xl text-[9px] font-black tracking-[0.25em] uppercase hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                {currentStep === 4 ? <>Finalize & Commit <Save size={18} /></> : <>Progress <ChevronRight size={18} /></>}
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
  type = 'text',
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