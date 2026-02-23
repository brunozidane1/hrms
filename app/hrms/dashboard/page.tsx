'use client';

import React from 'react';
import { 
  Users, TrendingDown, Clock, Briefcase, 
  ArrowUpRight, ArrowDownRight, MoreVertical,
  UserPlus, FileCheck, Calendar, Search, 
  Bell, UserCheck, PieChart, ChevronRight, 
  Filter, Download, Globe, Zap, Target,
  TrendingUp, Activity, DollarSign
} from 'lucide-react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

const avatarSizes: Record<AvatarSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
  lg: 'w-10 h-10'
};

const avatarThemes = [
  { shell: 'from-fuchsia-500 to-violet-600', hair: 'text-slate-800', shirt: 'text-fuchsia-100' },
  { shell: 'from-cyan-500 to-blue-600', hair: 'text-slate-900', shirt: 'text-cyan-100' },
  { shell: 'from-amber-400 to-orange-500', hair: 'text-slate-800', shirt: 'text-amber-100' },
  { shell: 'from-emerald-500 to-teal-600', hair: 'text-slate-900', shirt: 'text-emerald-100' },
  { shell: 'from-rose-500 to-pink-600', hair: 'text-slate-800', shirt: 'text-rose-100' },
];

const getAvatarTheme = (name: string): (typeof avatarThemes)[number] => {
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarThemes[seed % avatarThemes.length];
};

const Avatar = ({ name, size = 'sm', className = '' }: { name: string; size?: AvatarSize; className?: string }) => {
  const theme = getAvatarTheme(name);

  return (
    <div className={`relative rounded-full bg-linear-to-br ${theme.shell} flex items-center justify-center shadow-md overflow-hidden ${avatarSizes[size]} ${className}`}>
      <svg viewBox="0 0 48 48" className="h-[88%] w-[88%]" aria-hidden="true">
        <circle cx="24" cy="20" r="9" className="text-amber-100" fill="currentColor" />
        <path d="M11 42c0-7 6-12 13-12s13 5 13 12" className={theme.shirt} fill="currentColor" />
        <path d="M15 20c0-6 4-10 9-10s9 4 9 10c-2-2-4-3-9-3s-7 1-9 3Z" className={theme.hair} fill="currentColor" />
        <circle cx="21" cy="21" r="1" className="text-slate-700" fill="currentColor" />
        <circle cx="27" cy="21" r="1" className="text-slate-700" fill="currentColor" />
        <path d="M21 25c1 .8 2 .9 3 .9s2-.1 3-.9" className="text-slate-700" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

export default function HRStrategicDashboard() {
  return (
    <div className="fun-page dashboard-fun min-h-screen bg-[#F0F2F5] p-4 lg:p-10 font-sans text-slate-900">
      <style>{`
        .dashboard-fun .card-mix {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.98), rgba(240,235,255,0.94), rgba(238,251,255,0.94));
          border: 1px solid rgba(126,108,255,0.25);
          box-shadow: 0 16px 30px rgba(98,83,255,0.12);
        }
        .dashboard-fun .card-mix::after {
          content: '';
          position: absolute;
          top: -50px;
          right: -45px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle at top, rgba(255,122,182,0.35), rgba(122,107,255,0.15), transparent 70%);
          pointer-events: none;
        }
        .dashboard-fun .card-mix:hover {
          border-color: rgba(255,78,203,0.45);
          box-shadow: 0 18px 36px rgba(255,78,203,0.18);
        }
        .dashboard-fun .fun-chip {
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
        <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-fuchsia-300/30 blur-3xl" />
        <div className="absolute -top-10 right-10 w-48 h-48 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute top-24 right-0 w-40 h-40 rounded-full bg-amber-300/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. Playful Hero */}
        <div className="relative overflow-hidden rounded-4xl border border-violet-200/60 bg-linear-to-r from-violet-50 via-white to-cyan-50 p-6 sm:p-8 shadow-[0_18px_36px_rgba(98,83,255,0.16)]">
          <div className="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-fuchsia-400/20 blur-2xl" />
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-600">Spotlight Board</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">
                Good Morning, <span className="text-violet-600">Sandy</span> — let&apos;s make today legendary.
              </h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Bright stats, bold goals, and just enough chaos to keep things interesting.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.14em] bg-violet-100 text-violet-700">Focus Mode</span>
                <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.14em] bg-cyan-100 text-cyan-700">3 Wins Pending</span>
                <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.14em] bg-fuchsia-100 text-fuchsia-700">Energy: High</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1.5 Highlights Cards */}
        <div className="space-y-3">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-fuchsia-600">Your Highlights</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                title: 'Team Stats',
                subtitle: '2010-2022',
                cta: 'Details',
                tone: 'from-rose-50 via-white to-amber-50',
                accent: 'text-rose-600',
              },
              {
                title: 'Ideation Workshop',
                subtitle: 'View Proposals',
                cta: 'Details',
                tone: 'from-violet-50 via-white to-cyan-50',
                accent: 'text-violet-600',
              },
              {
                title: 'Upcoming Training',
                subtitle: 'July 2022',
                cta: 'Details',
                tone: 'from-emerald-50 via-white to-amber-50',
                accent: 'text-emerald-600',
              },
              {
                title: 'People Moments',
                subtitle: 'New Hires + Kudos',
                cta: 'Details',
                tone: 'from-cyan-50 via-white to-fuchsia-50',
                accent: 'text-cyan-600',
              },
            ].map((card, idx) => {
              const renderCardSVG = () => {
                switch(idx) {
                  case 0: // Team Stats
                    return (
                      <svg viewBox="0 0 120 100" className="h-24 w-full" aria-hidden="true">
                        {/* Bar Chart */}
                        <rect x="15" y="60" width="16" height="30" rx="4" fill="#f43f5e" opacity="0.8" />
                        <rect x="36" y="40" width="16" height="50" rx="4" fill="#fb7185" />
                        <rect x="57" y="50" width="16" height="40" rx="4" fill="#f43f5e" opacity="0.8" />
                        <rect x="78" y="30" width="16" height="60" rx="4" fill="#fb7185" />
                        {/* Line trending up */}
                        <path d="M18 75 L40 55 L60 45 L85 25" stroke="#f43f5e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    );
                  case 1: // Ideation Workshop
                    return (
                      <svg viewBox="0 0 120 100" className="h-24 w-full" aria-hidden="true">
                        {/* Light Bulb */}
                        <circle cx="60" cy="35" r="18" fill="#7c3aed" opacity="0.3" />
                        <path d="M60 10 Q70 15 70 28 Q70 40 60 45 Q50 40 50 28 Q50 15 60 10 Z" fill="#7c3aed" />
                        {/* Filament */}
                        <path d="M57 42 Q55 48 60 50 Q65 48 63 42" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Base */}
                        <rect x="54" y="50" width="12" height="8" rx="2" fill="#7c3aed" />
                        {/* Sparkles */}
                        <circle cx="30" cy="30" r="2.5" fill="#a78bfa" />
                        <circle cx="90" cy="35" r="2.5" fill="#a78bfa" />
                        <path d="M35 50 L40 55 M85 50 L80 55" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    );
                  case 2: // Upcoming Training
                    return (
                      <svg viewBox="0 0 120 100" className="h-24 w-full" aria-hidden="true">
                        {/* Graduation Cap */}
                        <path d="M30 45 L60 25 L90 45 L90 50 L30 50 Z" fill="#10b981" />
                        {/* Cap top */}
                        <rect x="55" y="20" width="10" height="8" rx="1" fill="#059669" />
                        {/* Tassel */}
                        <line x1="60" y1="28" x2="60" y2="45" stroke="#10b981" strokeWidth="2" />
                        <circle cx="60" cy="48" r="3" fill="#10b981" />
                        {/* Book */}
                        <rect x="20" y="55" width="28" height="30" rx="3" fill="#10b981" opacity="0.3" />
                        <rect x="72" y="58" width="28" height="27" rx="3" fill="#10b981" opacity="0.3" />
                        <line x1="34" y1="55" x2="34" y2="85" stroke="#10b981" strokeWidth="1.5" />
                      </svg>
                    );
                  case 3: // People Moments
                    return (
                      <svg viewBox="0 0 120 100" className="h-24 w-full" aria-hidden="true">
                        {/* Person 1 */}
                        <circle cx="35" cy="25" r="10" fill="#06b6d4" />
                        <rect x="28" y="38" width="14" height="20" rx="3" fill="#06b6d4" />
                        {/* Person 2 */}
                        <circle cx="85" cy="30" r="11" fill="#ec4899" />
                        <rect x="77" y="44" width="16" height="22" rx="3" fill="#ec4899" />
                        {/* Person 3 - center */}
                        <circle cx="60" cy="20" r="9" fill="#8b5cf6" />
                        <rect x="54" y="32" width="12" height="18" rx="2" fill="#8b5cf6" />
                        {/* Celebration confetti */}
                        <circle cx="25" cy="15" r="2" fill="#fbbf24" />
                        <circle cx="95" cy="18" r="2" fill="#fbbf24" />
                        <line x1="40" y1="10" x2="45" y2="8" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
                        {/* Connected by lines */}
                        <path d="M45 40 L60 50" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                        <path d="M75 45 L60 50" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };
              
              return (
                <div key={idx} className={`rounded-4xl border border-violet-200/50 bg-linear-to-br ${card.tone} p-5 shadow-[0_16px_30px_rgba(98,83,255,0.12)]`}> 
                  <div className="flex items-center justify-center rounded-3xl bg-white/80 border border-violet-100/60 p-4 mb-4">
                    {renderCardSVG()}
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{card.title}</h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1">{card.subtitle}</p>
                  <button className={`mt-4 text-[10px] font-black uppercase tracking-[0.2em] ${card.accent}`}> {card.cta} </button>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 2. The "Big Data" Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Growth Forecast Chart Visual */}
          <div className="xl:col-span-8 bg-[linear-gradient(145deg,#ffffff,#f6f2ff,#eef9ff)] rounded-3xl p-6 border border-violet-200/60 shadow-[0_14px_30px_rgba(109,95,255,0.12)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">Headcount Growth Forecast</h3>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.16em] bg-violet-100 text-violet-700">Play Mode</span>
                </div>
                <p className="text-slate-500 font-semibold text-xs">Crystal-ball planning based on Q3 hiring targets</p>
              </div>
              <select className="bg-white border border-violet-200 rounded-xl px-3 py-1.5 text-[10px] font-bold text-violet-700 outline-none">
                <option>Scenario: Rocket Mode</option>
                <option>Scenario: Cruise Mode</option>
              </select>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.14em] bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200">Hiring Confidence 91%</span>
              <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.14em] bg-cyan-50 text-cyan-700 border border-cyan-200">Open Roles 24</span>
              <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.14em] bg-emerald-50 text-emerald-700 border border-emerald-200">Time-to-fill 18d</span>
            </div>

            <div className="relative rounded-2xl border border-violet-200/60 bg-linear-to-b from-violet-50/80 via-cyan-50/55 to-white p-4 shadow-inner">
              <div className="flex items-center justify-between text-[9px] font-bold text-violet-500 uppercase tracking-[0.16em] mb-3">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4</span>
              </div>
              <svg viewBox="0 0 320 120" className="w-full h-24 sm:h-28">
                <defs>
                  <linearGradient id="hc-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="60" x2="320" y2="60" stroke="#CBD5E1" strokeDasharray="4 4" strokeWidth="1" />
                <path
                  d="M0 90 C40 80, 80 78, 120 70 C160 62, 200 52, 240 40 C270 32, 295 26, 320 20"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2"
                />
                <path
                  d="M0 90 C40 80, 80 78, 120 70 C160 62, 200 52, 240 40 C270 32, 295 26, 320 20 L320 120 L0 120 Z"
                  fill="url(#hc-fill)"
                />
                <circle cx="120" cy="70" r="3" fill="#EC4899" />
                <circle cx="240" cy="40" r="3" fill="#06B6D4" />
                <circle cx="320" cy="20" r="3" fill="#7C3AED" />
              </svg>
              <div className="flex items-center gap-4 text-[9px] text-slate-500 mt-2 font-semibold">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Growth Path
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-300" /> Base Pace
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-0.5 bg-slate-400" /> Midline Guide
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="space-y-1 rounded-2xl border border-violet-100 bg-white/85 p-3">
                <p className="text-[9px] font-black text-violet-500 uppercase tracking-[0.14em]">Team Today</p>
                <p className="text-lg font-black">1,248</p>
                <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full w-2/3 bg-linear-to-r from-fuchsia-500 to-violet-500 rounded-full" /></div>
              </div>
              <div className="space-y-1 rounded-2xl border border-cyan-100 bg-white/85 p-3">
                <p className="text-[9px] font-black text-cyan-600 uppercase tracking-[0.14em]">Q4 Target Lane</p>
                <p className="text-lg font-black">1,410</p>
                <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full w-3/4 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full" /></div>
              </div>
              <div className="space-y-1 rounded-2xl border border-fuchsia-100 bg-white/85 p-3">
                <p className="text-[9px] font-black text-fuchsia-600 uppercase tracking-[0.14em]">Momentum Boost</p>
                <p className="text-lg font-black">+14.2%</p>
                <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full w-1/2 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full" /></div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-violet-100 bg-white/85 p-3 flex items-center justify-between gap-3">
              <p className="text-[10px] font-semibold text-slate-600">Trend note: hiring velocity is strongest from Q2 to Q4; keep interview pipeline warm.</p>
              <button className="shrink-0 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.14em] text-violet-700 bg-violet-50 border border-violet-200">View Assumptions</button>
            </div>
          </div>

          {/* Department Distribution (Heatmap Style) */}
          <div className="xl:col-span-4 relative overflow-hidden bg-linear-to-br from-violet-50 via-white to-cyan-50 rounded-3xl p-6 text-slate-900 shadow-[0_18px_34px_rgba(98,83,255,0.18)] border border-violet-200/60">
            <div className="absolute -top-10 -right-6 h-24 w-24 rounded-full bg-fuchsia-300/30 blur-2xl" />
            <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-cyan-300/30 blur-2xl" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold flex items-center gap-2">
                <PieChart size={16} className="text-fuchsia-500" />
                Resource Allocation
              </h3>
              <span className="fun-chip">Mix</span>
            </div>
            <div className="mb-5 rounded-2xl border border-violet-100/70 bg-white/80 p-3">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
                  <circle cx="60" cy="60" r="36" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="12"
                    strokeDasharray="95.0 226.2"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="12"
                    strokeDasharray="63.3 226.2"
                    strokeDashoffset="-95.0"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    fill="none"
                    stroke="#D946EF"
                    strokeWidth="12"
                    strokeDasharray="40.7 226.2"
                    strokeDashoffset="-158.3"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="12"
                    strokeDasharray="27.1 226.2"
                    strokeDashoffset="-199.0"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <circle cx="60" cy="60" r="22" fill="white" />
                  <text x="60" y="58" textAnchor="middle" className="fill-slate-900 text-[10px] font-black">Mix</text>
                  <text x="60" y="70" textAnchor="middle" className="fill-slate-500 text-[8px] font-semibold">100%</text>
                </svg>
                <div className="space-y-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                  <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-500" /> Engineering 42%</p>
                  <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Sales & Ops 28%</p>
                  <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-fuchsia-500" /> Product 18%</p>
                  <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Support 12%</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { dept: 'Engineering', pct: 42, color: 'bg-linear-to-r from-blue-500 to-cyan-500' },
                { dept: 'Sales & Ops', pct: 28, color: 'bg-linear-to-r from-indigo-500 to-violet-500' },
                { dept: 'Product', pct: 18, color: 'bg-linear-to-r from-violet-500 to-fuchsia-500' },
                { dept: 'Support', pct: 12, color: 'bg-linear-to-r from-emerald-500 to-lime-400' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-semibold mb-1.5">
                    <span className="text-slate-600 uppercase tracking-wider">{item.dept}</span>
                    <span className="text-slate-800">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-white/90 rounded-4xl border border-violet-100/70">
              <p className="text-[9px] font-bold text-fuchsia-600 uppercase mb-1.5">Insight</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineering headcount has grown <span className="text-slate-900 font-bold">12% faster</span> than support this quarter, increasing technical debt risk.
              </p>
            </div>
          </div>
        </div>

        {/* 4. The Talent Pipeline (Onboarding Phase) */}
        <div className="card-mix bg-white rounded-3xl border border-violet-200/60 shadow-[0_14px_30px_rgba(109,95,255,0.12)] overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">Onboarding Health Velocity</h3>
                <span className="fun-chip">Live Feed</span>
              </div>
              <p className="text-slate-400 font-medium text-xs mt-1">Real-time pulse check on high-impact hires, with a little personality</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600"><Filter size={16}/></button>
              <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.22em] text-white bg-linear-to-r from-violet-600 via-fuchsia-500 to-cyan-500 shadow-[0_10px_20px_rgba(109,95,255,0.25)]">Roll Call</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-linear-to-r from-violet-50 via-fuchsia-50 to-cyan-50 text-violet-700 text-[9px] uppercase tracking-[0.18em] font-black">
                  <th className="px-6 py-4">Talent Identity</th>
                  <th className="px-6 py-4">Mission / Role</th>
                  <th className="px-6 py-4">Current Quest</th>
                  <th className="px-6 py-4 text-right">Integration Meter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100/60">
                {[
                  { name: 'Sarah Jenkins', role: 'Staff Designer', status: 'Culture Sync (already collecting favorite lunch spots)', index: 88, color: 'blue', mood: 'Ready-ish' },
                  { name: 'Michael Chen', role: 'Lead Architect', status: 'Security Brief (reading every line twice)', index: 42, color: 'indigo', mood: 'Loading Momentum' },
                  { name: 'Alicia Vane', role: 'VP Operations', status: 'Board Review (naturally running the agenda)', index: 95, color: 'emerald', mood: 'Fully Dialed In' },
                  { name: 'David Park', role: 'Growth Lead', status: 'Provisioning (device updates in dramatic slow motion)', index: 12, color: 'rose', mood: 'Warming Up' },
                ].map((hire, i) => (
                  <tr key={i} className="group odd:bg-white even:bg-violet-50/25 hover:bg-fuchsia-50/45 transition-all cursor-pointer">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Avatar name={hire.name} size="md" className="w-9 h-9" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{hire.name}</p>
                          <p className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5 tracking-tight">ID: #HR-2026-{i}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-semibold text-slate-700">{hire.role}</p>
                      <p className="text-[10px] text-slate-500 font-semibold">Strategic Hire • high-impact edition</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: hire.color === 'blue' ? '#3B82F6' : hire.color === 'indigo' ? '#6366F1' : hire.color === 'emerald' ? '#10B981' : '#F43F5E' }}
                        />
                        <span
                          className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.12em] ${
                            hire.color === 'blue'
                              ? 'bg-blue-50 text-blue-700'
                              : hire.color === 'indigo'
                                ? 'bg-indigo-50 text-indigo-700'
                                : hire.color === 'emerald'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {hire.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                         <div className="text-right">
                           <p className="text-xs font-black text-slate-900 tracking-wide">{hire.index}%</p>
                           <p className="text-[8px] font-bold text-violet-500 uppercase tracking-[0.16em]">{hire.mood}</p>
                         </div>
                         <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/70">
                             <div
                               className="h-full"
                               style={{
                                 width: `${hire.index}%`,
                                 background: hire.color === 'blue'
                                   ? 'linear-gradient(90deg, #60A5FA, #2563EB)'
                                   : hire.color === 'indigo'
                                     ? 'linear-gradient(90deg, #818CF8, #4F46E5)'
                                     : hire.color === 'emerald'
                                       ? 'linear-gradient(90deg, #34D399, #059669)'
                                       : 'linear-gradient(90deg, #FB7185, #E11D48)'
                               }}
                             />
                         </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Busy Home Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-mix bg-linear-to-br from-white via-violet-50/60 to-cyan-50/50 rounded-3xl border border-violet-200/60 p-6 shadow-[0_14px_28px_rgba(109,95,255,0.14)]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-slate-900">Employees By Department</h3>
                      <span className="fun-chip">Glow Up</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Headcount is climbing and the momentum is looking good this week</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200">+20%</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Development', value: 48, color: 'bg-linear-to-r from-blue-400 to-blue-600' },
                    { label: 'Marketing', value: 22, color: 'bg-linear-to-r from-emerald-400 to-emerald-600' },
                    { label: 'Finance', value: 15, color: 'bg-linear-to-r from-amber-300 to-orange-500' },
                    { label: 'Design', value: 15, color: 'bg-linear-to-r from-indigo-400 to-violet-600' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/80 border border-violet-100 rounded-full">
                        <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-mix bg-linear-to-br from-white via-fuchsia-50/55 to-amber-50/45 rounded-3xl border border-fuchsia-200/60 p-6 shadow-[0_14px_28px_rgba(236,72,153,0.12)]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Employee Status</h3>
                  <span className="fun-chip">Pulse</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Total Teammates</p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-2xl font-black text-slate-900">154</span>
                  <span className="text-[10px] text-slate-400">This month</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Fulltime (48%)', value: 112 },
                    { label: 'Contract (20%)', value: 112 },
                    { label: 'Probation (22%)', value: 12 },
                    { label: 'WFH (20%)', value: 4 },
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-fuchsia-100 bg-white/80 p-3">
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold text-slate-900 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-fuchsia-100 bg-white/80 p-3 flex items-center gap-3">
                  <Avatar name="Daniel Esbella" size="lg" />
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Top Performer</p>
                    <p className="text-xs font-bold text-slate-900">Daniel Esbella</p>
                    <p className="text-[10px] text-slate-400">IOS Developer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase">Performance</p>
                    <p className="text-sm font-bold text-emerald-600">99%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-mix bg-linear-to-br from-white via-emerald-50/45 to-cyan-50/45 rounded-3xl border border-emerald-200/60 p-6 shadow-[0_14px_28px_rgba(16,185,129,0.12)]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Attendance Overview</h3>
                  <span className="fun-chip">Roll Call</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Total Attendance</p>
                <div className="mt-3 text-2xl font-black text-slate-900">120</div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Present', value: 59, color: 'bg-emerald-500' },
                    { label: 'Late', value: 21, color: 'bg-amber-500' },
                    { label: 'Permission', value: 2, color: 'bg-blue-500' },
                    { label: 'Absent', value: 15, color: 'bg-rose-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-16 text-[9px] font-semibold text-slate-500">{item.label}</div>
                      <div className="flex-1 h-2 bg-white/80 border border-emerald-100 rounded-full">
                        <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                      </div>
                      <div className="w-10 text-right text-[9px] font-semibold text-slate-400">{item.value}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-emerald-100 bg-white/80 p-3">
                  <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Total Absenties</p>
                  <div className="mt-2 flex items-center gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <Avatar key={i} name={`A${i}`} size="xs" className="w-7 h-7 text-[9px] border-2 border-white" />
                    ))}
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">+1</div>
                    <button className="ml-auto px-2.5 py-1 rounded-lg text-[9px] font-black text-violet-700 bg-violet-50 border border-violet-200">View Details</button>
                  </div>
                </div>
              </div>

              <div className="card-mix bg-linear-to-br from-white via-cyan-50/55 to-blue-50/45 rounded-3xl border border-cyan-200/60 p-6 shadow-[0_14px_28px_rgba(59,130,246,0.12)]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Clock-In/Out</h3>
                  <span className="fun-chip">Live Log</span>
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    { name: 'Daniel Esbella', role: 'UI/UX Designer', time: '09:15' },
                    { name: 'Doglas Martini', role: 'Project Manager', time: '09:36' },
                    { name: 'Brian Villalobos', role: 'PHP Developer', time: '09:15' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-white/75 border border-cyan-100 px-2.5 py-2">
                      <Avatar name={item.name} size="sm" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.role}</p>
                      </div>
                      <div className="text-[10px] font-black text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-md px-2 py-1">{item.time}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-cyan-100 bg-white/80 p-3 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Clock In', value: '10:30 AM' },
                    { label: 'Clock Out', value: '09:45 AM' },
                    { label: 'Production', value: '09:21 Hrs' },
                    { label: 'Late', value: '30 Min' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-xs font-bold text-slate-900 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-mix bg-linear-to-br from-white via-indigo-50/50 to-violet-50/45 rounded-3xl border border-indigo-200/60 p-6 shadow-[0_14px_28px_rgba(99,102,241,0.12)]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">Jobs Applicants</h3>
                <span className="fun-chip">Talent Quest</span>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Brian Villalobos', exp: '5+ Years', loc: 'USA', role: 'UI/UX Designer' },
                  { name: 'Anthony Lewis', exp: '4+ Years', loc: 'USA', role: 'Python Developer' },
                  { name: 'Stephan Peralt', exp: '6+ Years', loc: 'USA', role: 'Android Developer' },
                  { name: 'Doglas Martini', exp: '2+ Years', loc: 'USA', role: 'React Developer' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white/80 p-3 hover:bg-indigo-50/45 transition-colors">
                    <Avatar name={item.name} size="md" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">{item.name}</p>
                      <p className="text-[9px] text-slate-400">Exp: {item.exp} · {item.loc}</p>
                      <p className="text-[10px] font-semibold text-slate-600">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-mix bg-linear-to-br from-white via-amber-50/50 to-rose-50/35 rounded-3xl border border-amber-200/60 p-6 shadow-[0_14px_28px_rgba(245,158,11,0.12)] overflow-x-auto">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-black text-slate-900">Projects</h3>
                <span className="fun-chip">In Motion</span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[9px] uppercase tracking-wider text-amber-700 bg-amber-50/70">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Team</th>
                    <th className="py-2 pr-4">Hours</th>
                    <th className="py-2 pr-4">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[10px]">
                  {[
                    { id: 'PRO-001', name: 'Office Management App', hours: '15/255 Hrs', priority: 'High' },
                    { id: 'PRO-002', name: 'Clinic Management', hours: '15/255 Hrs', priority: 'Low' },
                    { id: 'PRO-003', name: 'Educational Platform', hours: '40/255 Hrs', priority: 'Medium' },
                    { id: 'PRO-004', name: 'Chat & Call Mobile App', hours: '35/155 Hrs', priority: 'High' },
                    { id: 'PRO-005', name: 'Travel Planning Website', hours: '50/235 Hrs', priority: 'Medium' },
                    { id: 'PRO-006', name: 'Service Booking Software', hours: '40/255 Hrs', priority: 'Low' },
                    { id: 'PRO-008', name: 'Travel Planning Website', hours: '15/255 Hrs', priority: 'Medium' },
                  ].map((item, i) => (
                    <tr key={i} className="odd:bg-white even:bg-amber-50/35 hover:bg-rose-50/35 transition-colors">
                      <td className="py-3 pr-4 font-semibold text-slate-500">{item.id}</td>
                      <td className="py-3 pr-4 font-bold text-slate-900">{item.name}</td>
                      <td className="py-3 pr-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(n => (
                            <Avatar key={n} name={`T${n}`} size="xs" className="border-2 border-white" />
                          ))}
                          {i % 2 === 1 && (
                            <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">+1</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-slate-500">{item.hours}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          item.priority === 'High'
                            ? 'bg-rose-50 text-rose-700'
                            : item.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-mix bg-linear-to-br from-white via-slate-50 to-violet-50/45 rounded-3xl border border-violet-200/60 p-6 shadow-[0_14px_28px_rgba(109,95,255,0.12)]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Tasks Statistics</h3>
                  <span className="fun-chip">Turbo</span>
                </div>
                <div className="mt-3 text-xl font-black text-slate-900">124/165</div>
                <p className="text-[9px] text-slate-400 mt-1">389/689 hrs invested this week and the team is still pacing strong</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Ongoing', value: 24 },
                    { label: 'On Hold', value: 10 },
                    { label: 'Overdue', value: 16 },
                    { label: 'Ongoing', value: 40 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-20 text-[9px] text-slate-500">{item.label}</div>
                      <div className="flex-1 h-2 bg-white/80 border border-violet-100 rounded-full">
                        <div className="h-full bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full" style={{ width: `${item.value}%` }} />
                      </div>
                      <div className="w-10 text-right text-[9px] text-slate-400">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-mix bg-linear-to-br from-white via-teal-50/45 to-cyan-50/45 rounded-3xl border border-teal-200/60 p-6 shadow-[0_14px_28px_rgba(20,184,166,0.12)]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Schedules</h3>
                  <span className="fun-chip">Meetups</span>
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    { title: 'UI/ UX Designer', desc: 'Interview Candidates - UI/UX Designer', time: 'Thu, 15 Feb 2025 · 01:00 PM - 02:20 PM' },
                    { title: 'IOS Developer', desc: 'Interview Candidates - IOS Developer', time: 'Thu, 15 Feb 2025 · 02:00 PM - 04:20 PM' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-teal-100 bg-white/80 p-3">
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[9px] text-slate-400 mt-1">{item.desc}</p>
                      <p className="text-[9px] font-semibold text-slate-500 mt-2">{item.time}</p>
                      <div className="mt-2 flex -space-x-2">
                        {[1, 2, 3, 4, 5].map(n => (
                          <Avatar key={n} name={`S${n}`} size="xs" className="border-2 border-white" />
                        ))}
                        <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">+3</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 space-y-6">
            <div className="card-mix bg-linear-to-br from-white via-fuchsia-50/45 to-violet-50/40 rounded-3xl border border-fuchsia-200/60 p-6 shadow-[0_14px_28px_rgba(236,72,153,0.12)]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">Employees</h3>
                <span className="fun-chip">Squad</span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { name: 'Anthony Lewis', role: 'Finance', dept: 'Finance' },
                  { name: 'Brian Villalobos', role: 'PHP Developer', dept: 'Development' },
                  { name: 'Stephan Peralt', role: 'Executive', dept: 'Marketing' },
                  { name: 'Doglas Martini', role: 'Project Manager', dept: 'Manager' },
                  { name: 'Anthony Lewis', role: 'UI/UX Designer', dept: 'UI/UX Design' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-fuchsia-100 bg-white/80 px-2.5 py-2">
                    <Avatar name={item.name} size="sm" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">{item.name}</p>
                      <p className="text-[9px] text-slate-400">{item.role}</p>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-500">{item.dept}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-mix bg-linear-to-br from-white via-lime-50/45 to-emerald-50/35 rounded-3xl border border-lime-200/60 p-6 shadow-[0_14px_28px_rgba(132,204,22,0.12)]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">Todo</h3>
                <span className="fun-chip">Mission List</span>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  'Add Holidays',
                  'Add Meeting to Client',
                  'Chat with Adrian',
                  'Management Call',
                  'Add Payroll',
                  'Add Policy for Increment',
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-2 text-[10px] text-slate-600 rounded-lg border border-lime-100 bg-white/85 px-2.5 py-1.5">
                    <input type="checkbox" className="h-3 w-3 rounded border-slate-300" />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="card-mix bg-linear-to-br from-white via-amber-50/45 to-orange-50/35 rounded-3xl border border-amber-200/60 p-6 shadow-[0_14px_28px_rgba(245,158,11,0.12)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Sales Overview</h3>
                  <span className="fun-chip">Money Moves</span>
                </div>
                <span className="text-[9px] text-slate-400">Numbers refreshed at 11:30PM</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-amber-100 bg-white/80 p-3">
                  <p className="text-[9px] text-slate-400 uppercase">Income</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">$45,300</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-white/80 p-3">
                  <p className="text-[9px] text-slate-400 uppercase">Expenses</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">$28,120</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <p className="text-[10px] font-bold text-slate-900">Invoices</p>
                {[
                  { title: 'Redesign Website', id: '#INVOO2', client: 'Logistics', amount: '$3560', status: 'Unpaid' },
                  { title: 'Module Completion', id: '#INVOO5', client: 'Yip Corp', amount: '$4175', status: 'Unpaid' },
                  { title: 'Change on Emp Module', id: '#INVOO3', client: 'Ignis LLP', amount: '$6985', status: 'Unpaid' },
                  { title: 'Changes on the Board', id: '#INVOO2', client: 'Ignis LLP', amount: '$1457', status: 'Unpaid' },
                  { title: 'Hospital Management', id: '#INVOO6', client: 'HCL Corp', amount: '$6458', status: 'Paid' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-white/80 p-3">
                    <Avatar name={item.client} size="sm" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[9px] text-slate-400">{item.id} · {item.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-400">Payment</p>
                      <p className="text-xs font-bold text-slate-900">{item.amount}</p>
                      <p className={`text-[9px] font-semibold ${item.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-mix bg-linear-to-br from-white via-cyan-50/40 to-sky-50/35 rounded-3xl border border-cyan-200/60 p-6 shadow-[0_14px_28px_rgba(34,211,238,0.12)]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">Recent Activities</h3>
                <span className="fun-chip">Buzz</span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { name: 'Matt Morgan', time: '05:30 PM', text: 'Added New Project HRMS Dashboard' },
                  { name: 'Jay Ze', time: '05:00 PM', text: 'Commented on Uploaded Document' },
                  { name: 'Mary Donald', time: '05:30 PM', text: 'Approved Task Projects' },
                  { name: 'George David', time: '06:00 PM', text: 'Requesting Access to Module Tickets' },
                  { name: 'Aaron Zeen', time: '06:30 PM', text: 'Downloaded App Reports' },
                  { name: 'Hendry Daniel', time: '05:30 PM', text: 'Completed New Project HMS' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-cyan-100 bg-white/80 px-2.5 py-2">
                    <Avatar name={item.name} size="sm" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">{item.name}</p>
                      <p className="text-[9px] text-slate-500">{item.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-mix bg-linear-to-br from-white via-rose-50/45 to-fuchsia-50/35 rounded-3xl border border-rose-200/60 p-6 shadow-[0_14px_28px_rgba(244,63,94,0.12)]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">Birthdays</h3>
                <span className="fun-chip">Party Queue</span>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Today</p>
                  <div className="mt-2 flex items-center gap-3">
                    <Avatar name="Andrew Jermia" size="sm" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Andrew Jermia</p>
                      <p className="text-[9px] text-slate-400">IOS Developer</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tomorrow</p>
                  <div className="mt-2 space-y-2">
                    {[
                      { name: 'Mary Zeen', role: 'UI/UX Designer' },
                      { name: 'Antony Lewis', role: 'Android Developer' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Avatar name={item.name} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.name}</p>
                          <p className="text-[9px] text-slate-400">{item.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">25 Jan 2025</p>
                  <div className="mt-2 flex items-center gap-3">
                    <Avatar name="Doglas Martini" size="sm" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Doglas Martini</p>
                      <p className="text-[9px] text-slate-400">.Net Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}