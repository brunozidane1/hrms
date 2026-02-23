'use client';

import { 
  Gift, 
  Award, 
  Calendar,
  Zap, 
  ChevronRight, 
  Filter, 
  Search,
  ArrowUpRight,
  Clock,
  MapPin,
  TrendingUp,
  Bell,
  Users,
  Sparkles,
  Target,
  Activity,
} from 'lucide-react';

type EventType = 'anniversary' | 'birthday' | 'event' | 'onboarding';

type TimelineEvent = {
  id: number;
  type: EventType;
  title: string;
  user: string;
  role: string;
  date: string;
  time: string;
  impact: string;
  location?: string;
  attendees?: number;
  status: 'Live' | 'Scheduled' | 'Upcoming';
};

export default function SovereignTimeline() {
  const events: TimelineEvent[] = [
    {
      id: 1,
      type: 'anniversary',
      title: '5 Year Work Anniversary',
      user: 'Sarah Jenkins',
      role: 'Senior Lead Designer',
      date: 'TODAY',
      time: '09:00 AM',
      impact: 'Core Milestone',
      attendees: 26,
      status: 'Live',
    },
    {
      id: 2,
      type: 'birthday',
      title: 'Birthday Celebration',
      user: 'Marcus Chen',
      role: 'DevOps Engineer',
      date: 'TODAY',
      time: '12:30 PM',
      impact: 'Culture',
      location: 'Lounge Area',
      attendees: 43,
      status: 'Scheduled',
    },
    {
      id: 3,
      type: 'event',
      title: 'Q1 Strategy Townhall',
      user: 'Executive Team',
      role: 'Global Operations',
      date: 'FEB 22, 2026',
      time: '10:00 AM',
      location: 'Main Theater / Zoom',
      impact: 'Strategic',
      attendees: 214,
      status: 'Upcoming',
    },
    {
      id: 4,
      type: 'onboarding',
      title: 'Batch Onboarding Kickoff',
      user: 'People Operations',
      role: 'HR Enablement',
      date: 'FEB 23, 2026',
      time: '08:30 AM',
      location: 'Training Room 2',
      impact: 'Enablement',
      attendees: 18,
      status: 'Upcoming',
    },
    {
      id: 5,
      type: 'event',
      title: 'Leadership AMA',
      user: 'Leadership Circle',
      role: 'Company-wide',
      date: 'FEB 25, 2026',
      time: '04:30 PM',
      location: 'Virtual Hall',
      impact: 'Engagement',
      attendees: 128,
      status: 'Scheduled',
    },
  ];

  const kpis = [
    { label: 'Events Today', value: '12', sub: '+3 vs yesterday', icon: Calendar },
    { label: 'Live Sessions', value: '4', sub: '2 high-priority', icon: Activity },
    { label: 'Participation', value: '91%', sub: '+5.2% weekly', icon: TrendingUp },
    { label: 'Pending Alerts', value: '7', sub: 'Needs review', icon: Bell },
  ];

  const getInitials = (name: string) =>
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const getEventIcon = (type: EventType) => {
    if (type === 'anniversary') return <Award size={14} />;
    if (type === 'birthday') return <Gift size={14} />;
    if (type === 'onboarding') return <Users size={14} />;
    return <Zap size={14} />;
  };

  const getStatusStyle = (status: TimelineEvent['status']) => {
    if (status === 'Live') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Scheduled') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <div className="fun-page timeline-fun min-h-screen bg-[#F0F2F5] p-4 lg:p-8 font-sans text-slate-900">
      <style>{`
        .timeline-fun .card-mix {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255,255,255,0.98), rgba(242,234,255,0.9), rgba(231,249,255,0.9));
          border: 1px solid rgba(126,108,255,0.25);
          box-shadow: 0 16px 30px rgba(98,83,255,0.12);
        }
        .timeline-fun .card-mix::after {
          content: '';
          position: absolute;
          top: -55px;
          right: -35px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle at top, rgba(255,122,182,0.35), rgba(122,107,255,0.18), transparent 70%);
          pointer-events: none;
        }
        .timeline-fun .fun-chip {
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
      <div className="max-w-7xl mx-auto space-y-5 animate-in fade-in duration-500">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="fun-chip">Timeline</span>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Company Timeline
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">High-frequency people milestones, culture events, and operational alerts.</p>
          </div>

          <div className="flex items-center gap-2">
          <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900" size={14} />
              <input
                type="text"
                placeholder="Search timeline"
                className="pl-9 pr-3 py-2.5 w-52 sm:w-64 rounded-xl border border-slate-200 bg-white text-[11px] font-semibold outline-none focus:border-slate-900 transition-all"
              />
          </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <Filter size={15} className="text-slate-900" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-8 card-mix rounded-3xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-slate-900">Timeline Feed</h2>
                  <span className="fun-chip">Live</span>
                </div>
                <p className="text-[10px] text-slate-400">Compact stream of prioritized company moments.</p>
              </div>
              <button className="text-[10px] font-bold text-slate-500 hover:text-slate-900">Sort: Latest</button>
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-2 bottom-0 w-px bg-slate-200" />
              <div className="space-y-5">
                {events.map((event, idx) => (
                  <div key={event.id} className="relative flex gap-3 sm:gap-4 group">
                    <div className="relative z-10">
                      <div className="w-7 h-7 rounded-lg border border-violet-200 bg-white/90 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                        {getEventIcon(event.type)}
                      </div>
                      {idx === events.length - 1 && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-7 h-10 w-px bg-linear-to-b from-slate-200 to-transparent" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(event.status)}`}>
                          {event.status}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{event.date}</span>
                        <span className="text-[9px] font-semibold text-slate-400 flex items-center gap-1"><Clock size={10} />{event.time}</span>
                      </div>

                      <div className="rounded-2xl border border-violet-100/70 bg-white/70 p-3 sm:p-4 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">{event.title}</h3>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">Impact: {event.impact}</p>
                          </div>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                            <ArrowUpRight size={14} />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-200 via-fuchsia-200 to-cyan-200 text-slate-700 text-[9px] font-black flex items-center justify-center">
                              {getInitials(event.user)}
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-slate-900">{event.user}</p>
                              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">{event.role}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {event.location && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-violet-200 text-[9px] font-semibold text-slate-600">
                                <MapPin size={10} /> {event.location}
                              </span>
                            )}
                            {event.attendees && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-violet-200 text-[9px] font-semibold text-slate-600">
                                <Users size={10} /> {event.attendees}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 space-y-4">
            <div className="rounded-3xl p-4 border border-violet-200/60 bg-linear-to-br from-violet-50 via-white to-cyan-50 text-slate-900 shadow-[0_18px_34px_rgba(98,83,255,0.18)]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">Pulse Snapshot</h3>
                <Sparkles size={14} className="text-fuchsia-500" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/90 p-3 border border-violet-100/70">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">Celebrations</p>
                  <p className="text-lg font-black mt-1 text-slate-900">08</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-3 border border-violet-100/70">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">Milestones</p>
                  <p className="text-lg font-black mt-1 text-slate-900">05</p>
                </div>
              </div>
              <div className="mt-3 rounded-2xl bg-white/90 border border-violet-100/70 p-3">
                <p className="text-[9px] text-fuchsia-600 uppercase tracking-wider font-bold">Insight</p>
                <p className="text-[11px] leading-relaxed text-slate-600 mt-1">
                  Engagement events are 14% higher than last week with strongest participation from Product and HR Ops.
                </p>
              </div>
            </div>

            <div className="card-mix rounded-3xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">Upcoming Queue</h3>
                  <span className="fun-chip">Next</span>
                </div>
                <Target size={14} className="text-slate-400" />
              </div>
              <div className="space-y-3">
                {events.slice(1, 5).map((event) => (
                  <div key={`queue-${event.id}`} className="rounded-2xl border border-violet-100/70 p-3 bg-white/70">
                    <p className="text-[11px] font-bold text-slate-900 truncate">{event.title}</p>
                    <div className="mt-1 flex items-center justify-between text-[9px] text-slate-500 font-semibold">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-mix rounded-3xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-black text-slate-900">Quick Actions</h3>
                <span className="fun-chip">Tools</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Create Event', icon: Calendar },
                  { label: 'Send Alert', icon: Bell },
                  { label: 'Export Feed', icon: TrendingUp },
                  { label: 'Manage Tags', icon: Filter },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center gap-2 rounded-xl border border-violet-200 bg-white/80 px-2.5 py-2 text-[10px] font-bold text-slate-700 hover:bg-white"
                  >
                    <action.icon size={12} />
                    <span className="truncate">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all">
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase group-hover:text-slate-900">Load More</span>
            <ChevronRight size={14} className="rotate-90 text-slate-400 group-hover:text-slate-900" />
          </button>
        </div>
      </div>
    </div>
  );
}