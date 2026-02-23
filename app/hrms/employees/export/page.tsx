'use client';

import { useState } from 'react';
import { 
  FileDown, 
  FileText, 
  Table as TableIcon, 
  CheckCircle2, 
  Settings2, 
  Download,
  ChevronRight,
  Eye,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

export default function SovereignExport() {
  const [format, setFormat] = useState('xlsx');
  const [isExporting, setIsExporting] = useState(false);
  
  const fieldCategories = [
    {
      name: "Personnel Identity",
      fields: ["Full Name", "Employee ID", "Date of Birth", "Gender"]
    },
    {
      name: "Organizational Data",
      fields: ["Department", "Designation", "Joining Date", "Manager"]
    },
    {
      name: "Sensitive Pay-Scale",
      fields: ["Base Salary", "Bank Details", "Tax ID", "Bonus Structure"],
      restricted: true
    }
  ];

  const [selectedFields, setSelectedFields] = useState<string[]>(["Full Name", "Employee ID", "Department"]);

  const toggleField = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="p-3 lg:p-5 max-w-350 mx-auto animate-in fade-in duration-700">
      
      {/* Protocol Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">System // Extraction</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight italic">Report <span className="text-slate-300 font-light not-italic">Builder</span></h1>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl">
          <ShieldCheck size={16} className="text-emerald-600" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-emerald-800 uppercase tracking-widest leading-none">Access Level: Level 4 Admin</span>
            <span className="text-[9px] text-emerald-600 font-bold mt-1">Encrypted Tunnel Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* PAYLOAD CONFIGURATION */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Format Selector */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                <Settings2 size={14} />
              </div>
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">01. Protocol Format</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FormatCard 
                id="xlsx" 
                label="Excel Spreadsheet" 
                ext=".xlsx" 
                icon={<TableIcon size={24} />} 
                active={format === 'xlsx'} 
                onClick={() => setFormat('xlsx')} 
              />
              <FormatCard 
                id="pdf" 
                label="Portable Document" 
                ext=".pdf" 
                icon={<FileText size={24} />} 
                active={format === 'pdf'} 
                onClick={() => setFormat('pdf')} 
              />
              <FormatCard 
                id="csv" 
                label="Standard Delimited" 
                ext=".csv" 
                icon={<FileDown size={24} />} 
                active={format === 'csv'} 
                onClick={() => setFormat('csv')} 
              />
            </div>
          </section>

          {/* Column Chooser */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                  <CheckCircle2 size={14} />
                </div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">02. Data Nodes</h3>
              </div>
              <button 
                onClick={() => setSelectedFields(["Full Name", "Employee ID", "Department", "Designation"])}
                className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-2.5 py-1 rounded-md transition-all"
              >
                Reset to Defaults
              </button>
            </div>

            <div className="space-y-5 bg-white border border-slate-100 rounded-4xl p-4 shadow-sm">
              {fieldCategories.map((cat) => (
                <div key={cat.name} className="space-y-3">
                  <div className="flex items-center gap-3 px-2">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.25em]">{cat.name}</span>
                    {cat.restricted && <span className="text-[8px] bg-slate-950 text-white px-2 py-0.5 rounded-full font-black tracking-widest uppercase shadow-md shadow-slate-100">Restricted</span>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {cat.fields.map(field => (
                      <label 
                        key={field} 
                        className={`group flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                          selectedFields.includes(field) 
                          ? 'bg-slate-950 border-slate-950 text-white shadow-xl shadow-slate-100' 
                          : 'bg-slate-50 border-transparent hover:border-slate-200'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={selectedFields.includes(field)} 
                          onChange={() => toggleField(field)} 
                        />
                        <span className={`text-[10px] font-black uppercase tracking-wider ${selectedFields.includes(field) ? 'text-white' : 'text-slate-600'}`}>
                          {field}
                        </span>
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                          selectedFields.includes(field) ? 'bg-blue-500 text-white scale-110 rotate-12' : 'bg-white border-2 border-slate-200'
                        }`}>
                          {selectedFields.includes(field) && <Zap size={10} fill="currentColor" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* TELEMETRY SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="bg-slate-950 rounded-4xl p-5 text-white shadow-2xl sticky top-6 border-2 border-slate-900 overflow-hidden">
            {/* Background Texture Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[80px] pointer-events-none" />
            
            <div className="relative space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                  <Eye size={16} className="text-blue-400" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight italic">Protocol <span className="text-white/30 font-light not-italic">View</span></h3>
              </div>
              
              <div className="space-y-4">
                <TelemetryItem label="Selected Protocol" value={format.toUpperCase()} />
                <TelemetryItem label="Node Count" value={selectedFields.length.toString()} />
                <TelemetryItem label="Estimated Buffer" value="~1.2 MB" />
                <TelemetryItem label="Sync Delay" value="< 2.4s" />
              </div>

              <div className="p-3.5 bg-white/5 rounded-2xl space-y-2.5 border border-white/5">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Payload Keys</p>
                <div className="flex flex-wrap gap-2 font-mono text-[10px] text-blue-400/80 uppercase">
                  {selectedFields.map(f => (
                    <span key={f} className="bg-white/5 px-2 py-1 rounded">[{f.replace(/\s+/g, '_')}]</span>
                  ))}
                  {selectedFields.length === 0 && <span className="text-rose-400 italic font-sans">No nodes selected</span>}
                </div>
              </div>

                <div className="flex items-start gap-3 p-3.5 bg-blue-900/20 border border-blue-500/20 rounded-2xl">
                 <Info size={16} className="text-blue-400 shrink-0 mt-1" />
                  <p className="text-[9px] text-blue-100/60 font-medium leading-relaxed uppercase tracking-wider">
                   All generated reports are logged in the System Audit Trail. 
                   Ensure compliance with GDPR data export policies.
                 </p>
              </div>

              <button 
                onClick={handleExport}
                disabled={isExporting || selectedFields.length === 0}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-white/30 rounded-4xl text-[10px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/40 active:scale-95"
              >
                {isExporting ? (
                  <>Generating... <Download size={20} className="animate-bounce" /></>
                ) : (
                  <>Execute Export <ChevronRight size={20} /></>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FormatCard({ label, ext, icon, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-4xl border-2 cursor-pointer transition-all duration-500 flex flex-col items-center gap-3 group ${
        active 
        ? 'border-slate-950 bg-white shadow-2xl scale-105' 
        : 'border-slate-100 hover:border-slate-300'
      }`}
    >
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ${
        active ? 'bg-slate-950 text-white rotate-360' : 'bg-slate-50 text-slate-300 group-hover:bg-slate-100'
      }`}>
        {icon}
      </div>
      <div className="text-center">
        <p className={`text-[9px] font-black uppercase tracking-wider ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</p>
        <p className="text-[8px] text-blue-500 font-bold tracking-[0.2em] mt-1">{ext}</p>
      </div>
    </div>
  );
}

function TelemetryItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5 group">
      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors">{label}</span>
      <span className="text-xs font-black uppercase tracking-widest">{value}</span>
    </div>
  );
}