'use client';

import React from 'react';
import { 
  GitBranch, 
  ChevronDown, 
  Maximize2, 
  Users, 
  ShieldCheck, 
  Command,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function SovereignOrgChart() {
  return (
    <div className="fun-page org-fun p-4 lg:p-8 max-w-400 mx-auto animate-in fade-in duration-700">
      <style>{`
        .org-fun .card-mix {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.98), rgba(242,234,255,0.9), rgba(231,249,255,0.9));
          border: 1px solid rgba(126,108,255,0.25);
          box-shadow: 0 16px 30px rgba(98,83,255,0.12);
        }
        .org-fun .card-mix::after {
          content: '';
          position: absolute;
          top: -55px;
          right: -35px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle at top, rgba(255,122,182,0.35), rgba(122,107,255,0.18), transparent 70%);
          pointer-events: none;
        }
        .org-fun .fun-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #7a6bff, #ff7ab6, #00c2ff);
          box-shadow: 0 8px 16px rgba(122,107,255,0.25);
        }
      `}</style>
      <div className="relative overflow-hidden">
        <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute -top-10 right-6 h-36 w-36 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute top-20 right-0 h-28 w-28 rounded-full bg-amber-300/30 blur-3xl" />
      </div>
      
      {/* 1. Header & Controls */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="fun-chip">Org Map</span>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Structural <span className="text-slate-300 font-light">Map</span></h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white/80 p-1 rounded-xl border border-violet-200">
             <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest bg-white shadow-sm rounded-lg">Hierarchy</button>
             <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Matrix</button>
          </div>
          <button className="h-11 w-11 flex items-center justify-center bg-white/90 border border-violet-200 rounded-xl hover:bg-white transition-all">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* 2. Visual Hierarchy Tree */}
      <div className="relative flex flex-col items-center">
        
        {/* Level 1: Executive Node */}
        <div className="relative z-20">
          <OrgNode 
            name="Alex Rivera" 
            role="Chief Executive Officer" 
            dept="Executive"
            isLeader
          />
        </div>

        {/* Vertical Connector 1 */}
        <div className="w-px h-8 bg-violet-200" />

        {/* Horizontal Connector Line */}
        <div className="relative w-full max-w-4xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-violet-200" />
        </div>

        {/* Level 2: Department Heads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-0 w-full max-w-5xl">
          
          {/* Engineering Branch */}
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-violet-200" />
            <OrgNode 
              name="Marcus Chen" 
              role="VP of Engineering" 
              dept="Engineering"
              headcount={42}
            />
            <div className="w-px h-6 bg-violet-200 border-dashed" />
            <button className="group mt-2 flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-violet-200 rounded-full hover:border-violet-400 transition-all">
              <Plus size={12} className="text-slate-500 group-hover:text-violet-700" />
              <span className="text-[9px] font-black text-slate-500 group-hover:text-violet-700 uppercase tracking-widest">Expand Unit</span>
            </button>
          </div>

          {/* Product Branch */}
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-violet-200" />
            <OrgNode 
              name="Sarah Jenkins" 
              role="Head of Product" 
              dept="Product"
              headcount={12}
            />
          </div>

          {/* Growth Branch */}
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-violet-200" />
            <OrgNode 
              name="Elena Volkov" 
              role="Chief Growth Officer" 
              dept="Growth"
              headcount={18}
            />
          </div>

        </div>
      </div>

      {/* 3. Global Stats Overlay (Bottom Left) */}
      <div className="fixed bottom-12 left-12 hidden xl:block">
        <div className="card-mix p-4 rounded-4xl shadow-2xl space-y-3">
            <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 rounded-lg text-white">
                  <GitBranch size={14} />
               </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">System Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Nodes</p>
                  <p className="text-xl font-black text-slate-900">142</p>
               </div>
               <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Span Index</p>
                  <p className="text-xl font-black text-slate-900">6.4</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

const getAvatarSvg = (seed: string) => {
  const mod = seed.length % 4;
  if (mod === 0) {
    return (
      <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#ffedd5" />
        <path d="M14 26 C20 10, 44 10, 50 26" fill="#7a6bff" />
        <circle cx="24" cy="30" r="3" fill="#7a6bff" />
        <circle cx="40" cy="30" r="3" fill="#7a6bff" />
        <path d="M24 40 C28 44, 36 44, 40 40" stroke="#2f2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="19" cy="34" r="3" fill="#ff7ab6" opacity="0.7" />
        <circle cx="45" cy="34" r="3" fill="#ff7ab6" opacity="0.7" />
      </svg>
    );
  }
  if (mod === 1) {
    return (
      <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#fde68a" />
        <path d="M18 28 C24 14, 40 14, 46 28" fill="#f97316" />
        <circle cx="24" cy="30" r="3" fill="#7a6bff" />
        <circle cx="40" cy="30" r="3" fill="#7a6bff" />
        <path d="M26 42 C30 46, 34 46, 38 42" stroke="#2f2f2f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="20" cy="36" r="3" fill="#fb7185" opacity="0.7" />
        <circle cx="44" cy="36" r="3" fill="#fb7185" opacity="0.7" />
      </svg>
    );
  }
  if (mod === 2) {
    return (
      <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#bae6fd" />
        <path d="M16 28 C22 14, 42 14, 48 28" fill="#0ea5e9" />
        <circle cx="24" cy="30" r="3" fill="#0f172a" />
        <circle cx="40" cy="30" r="3" fill="#0f172a" />
        <path d="M24 40 C28 44, 36 44, 40 40" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="19" cy="34" r="3" fill="#f472b6" opacity="0.7" />
        <circle cx="45" cy="34" r="3" fill="#f472b6" opacity="0.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
      <circle cx="32" cy="32" r="26" fill="#fecdd3" />
      <path d="M18 28 C22 14, 42 14, 46 28" fill="#f43f5e" />
      <circle cx="24" cy="30" r="3" fill="#0f172a" />
      <circle cx="40" cy="30" r="3" fill="#0f172a" />
      <path d="M26 42 C30 46, 34 46, 38 42" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="36" r="3" fill="#f59e0b" opacity="0.7" />
      <circle cx="44" cy="36" r="3" fill="#f59e0b" opacity="0.7" />
    </svg>
  );
};

function OrgNode({ name, role, dept, headcount, isLeader }: any) {
  return (
    <div className={`group relative p-4 card-mix rounded-4xl w-52 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${isLeader ? 'border-violet-500/70' : ''}`}>
      <div className="flex flex-col items-center text-center">
        {/* Avatar Area */}
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-full bg-white border border-violet-200 shadow-[0_12px_24px_rgba(98,83,255,0.16)] flex items-center justify-center transition-transform group-hover:rotate-3">
            {getAvatarSvg(name)}
          </div>
          {isLeader && (
            <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-violet-200">
              <ShieldCheck size={14} className="text-violet-600" />
            </div>
          )}
        </div>

        {/* Identity */}
        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{name}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{role}</p>
        
        {/* Metadata */}
        <div className="mt-3 pt-3 border-t border-violet-100/70 w-full flex items-center justify-between">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter italic">{dept}</span>
          {headcount && (
            <div className="flex items-center gap-1">
              <Users size={10} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-900">{headcount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Reveal Action */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
        <button className="w-8 h-8 rounded-full bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <ArrowRight size={14} />
         </button>
      </div>
    </div>
  );
}