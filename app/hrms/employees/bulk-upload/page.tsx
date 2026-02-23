'use client';

import { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Table as TableIcon,
  Download,
  Loader2,
  Database,
  Layers,
  FileCode
} from 'lucide-react';

export default function SovereignBulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStep, setUploadStep] = useState(1); // 1: Upload, 2: Mapping, 3: Processing
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const csvHeaders = ['Full_Name', 'Email_Addr', 'Dept_ID', 'Salary_2026', 'Mobile_Pri'];
  const systemFields = ['Full Name', 'Email', 'Department', 'Salary', 'Phone'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStep(2);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadStep(2);
    }
  };

  const reset = () => {
    setFile(null);
    setUploadStep(1);
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto animate-in fade-in duration-700">
      
      {/* 1. Header & Utility */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">System // Ingestion</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Bulk <span className="text-slate-300 font-light not-italic">Sync</span></h1>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 border-2 border-slate-950 rounded-xl hover:bg-slate-950 hover:text-white transition-all">
          <Download size={16} />
          Get Protocol Template
        </button>
      </div>

      {/* 2. Pipeline Stepper */}
      <div className="flex items-center gap-6 mb-12">
        {[
          { id: 1, label: 'Source' },
          { id: 2, label: 'Key Mapping' },
          { id: 3, label: 'Ingestion' }
        ].map((s) => (
          <div key={s.id} className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all border ${
              uploadStep >= s.id ? 'bg-slate-950 border-slate-950 text-white shadow-lg shadow-slate-200' : 'bg-white border-slate-100 text-slate-300'
            }`}>
              {uploadStep > s.id ? <CheckCircle2 size={14} /> : `0${s.id}`}
            </div>
            <span className={`text-[11px] font-black uppercase tracking-widest ${uploadStep >= s.id ? 'text-slate-900' : 'text-slate-300'}`}>
              {s.label}
            </span>
            {s.id < 3 && <div className="w-12 h-px bg-slate-100" />}
          </div>
        ))}
      </div>

      {/* 3. Terminal Interface */}
      <div className="bg-white border border-slate-100 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* STEP 1: DROPZONE */}
        {uploadStep === 1 && (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-24 text-center transition-all cursor-pointer group ${
              isDragging ? 'bg-slate-50' : 'bg-white'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".csv,.xlsx" />
            <div className={`w-28 h-28 rounded-[2.5rem] mx-auto flex items-center justify-center mb-8 transition-all duration-700 ${
              isDragging ? 'bg-slate-950 text-white shadow-2xl rotate-12 scale-110' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
            }`}>
              <UploadCloud size={40} className={isDragging ? 'animate-bounce' : ''} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">Upload Data Source</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-xs mx-auto mb-10 leading-relaxed">
              Standardized .CSV or .XLSX required. <br/>Limit: 5,000 Nodes Per Sync.
            </p>
            <button className="px-10 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
              Initialize Browser
            </button>
          </div>
        )}

        {/* STEP 2: MAPPING INTERFACE */}
        {uploadStep === 2 && file && (
          <div className="p-12 space-y-8 animate-in slide-in-from-right-8 duration-700">
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500 border border-slate-100">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{file.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{(file.size / 1024).toFixed(1)} KB // Integrity Verified</p>
                </div>
              </div>
              <button onClick={reset} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-8 px-8 mb-4">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">System Node Field</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Source Key (CSV)</span>
              </div>
              
              <div className="space-y-2">
                {systemFields.map((field) => (
                  <div key={field} className="grid grid-cols-2 gap-8 items-center p-2 bg-white border border-slate-50 rounded-[1.5rem] hover:border-slate-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-4 pl-6 py-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Layers size={14} />
                      </div>
                      <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{field}</span>
                    </div>
                    <div className="pr-2">
                      <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-[11px] font-bold font-mono focus:ring-1 focus:ring-slate-950 transition-all appearance-none cursor-pointer">
                        <option value="">-- AUTO_DETECT --</option>
                        {csvHeaders.map(h => (
                          <option key={h} value={h} selected={h.toLowerCase().includes(field.split(' ')[0].toLowerCase())}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button 
                onClick={() => setUploadStep(3)}
                className="flex items-center gap-4 px-12 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Execute Pipeline <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TELEMETRY */}
        {uploadStep === 3 && (
          <div className="p-24 text-center animate-in zoom-in duration-700">
            <div className="relative w-32 h-32 mx-auto mb-10">
               <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] animate-pulse"></div>
               <div className="relative w-32 h-32 bg-slate-950 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl">
                 <Loader2 size={48} className="animate-spin" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4 italic">Processing <span className="text-slate-300 font-light not-italic">Array</span></h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose mb-12">
              Syncing 42 records to secure registry. <br/>Validating foreign key constraints and email uniqueness.
            </p>
            
            <div className="max-w-md mx-auto space-y-6">
              <div className="flex justify-between items-end">
                 <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                       <CheckCircle2 size={12} /> 38 Valid
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                       <AlertCircle size={12} /> 4 Pending Review
                    </div>
                 </div>
                 <span className="text-[10px] font-mono font-black text-slate-950">85% COMPLETE</span>
              </div>
              <div className="w-full h-3 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-slate-950 transition-all duration-1000 shadow-[0_0_15px_rgba(0,0,0,0.1)]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Protocol Notes */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProtocolCard 
          icon={<FileCode size={18} />}
          title="Encoding" 
          desc="Protocol requires UTF-8 character mapping to prevent metadata corruption during sync." 
        />
        <ProtocolCard 
          icon={<Database size={18} />}
          title="Conflict Logic" 
          desc="Existing Employee IDs will trigger a record update (UPSERT) rather than a collision error." 
        />
        <ProtocolCard 
          icon={<Layers size={18} />}
          title="Integrity" 
          desc="Primary keys: Full Name, Email, and Start Date are non-nullable for this ingestion." 
        />
      </div>
    </div>
  );
}

function ProtocolCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 bg-white border border-slate-50 rounded-[2rem] hover:border-slate-200 transition-all group">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-slate-950 group-hover:text-white transition-all">
        {icon}
      </div>
      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-3">{title}</h4>
      <p className="text-[12px] text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}