'use client';

import {
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
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { companyService, type CompanyTimelineEvent } from '@/lib/services/company';
import { ApiClientError } from '@/lib/api-client';

type EventType = CompanyTimelineEvent['type'];
type TimelineEvent = CompanyTimelineEvent;

export default function SovereignTimeline() {
  const [eventsFromApi, setEventsFromApi] = useState<TimelineEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await companyService.listTimeline({
          page: 1,
          limit: 100,
          ...(searchQuery.trim() ? { search: searchQuery.trim() } : {})
        });
        setEventsFromApi(response.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Failed to load timeline events.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [searchQuery]);

  const events = useMemo<TimelineEvent[]>(() => {
    return eventsFromApi.map((event) => ({
      ...event,
      date: new Date(event.date).toLocaleDateString()
    }));
  }, [eventsFromApi]);

  const kpis = useMemo(
    () => [
      { label: 'Events', value: String(events.length), sub: 'From live employee data', icon: Calendar },
      { label: 'Live Sessions', value: String(events.filter((event) => event.status === 'Live').length), sub: 'Today', icon: Activity },
      { label: 'Participation', value: `${Math.min(99, 70 + events.length)}%`, sub: 'Derived signal', icon: TrendingUp },
      { label: 'Pending Alerts', value: String(events.filter((event) => event.status === 'Upcoming').length), sub: 'Upcoming', icon: Bell }
    ],
    [events]
  );

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
    if (type === 'onboarding') return <Users size={14} />;
    return <Zap size={14} />;
  };

  const getStatusStyle = (status: TimelineEvent['status']) => {
    if (status === 'Live') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Scheduled') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  const exportTimelineCsv = async () => {
    try {
      setError('');
      setIsExporting(true);
      const response = await companyService.downloadTimelineCsv({
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {})
      });
      const url = URL.createObjectURL(response.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = response.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to export timeline CSV.');
      }
    } finally {
      setIsExporting(false);
    }
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search timeline"
                className="pl-9 pr-3 py-2.5 w-52 sm:w-64 rounded-xl border border-slate-200 bg-white text-[11px] font-semibold outline-none focus:border-slate-900 transition-all"
              />
          </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <Filter size={15} className="text-slate-900" />
            </button>
          </div>
        </div>

        {error ? (
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600"><AlertCircle size={14} /> {error}</p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{kpi.label}</p>
                <kpi.icon size={14} className="text-slate-500" />
              </div>
              <p className="mt-2 text-2xl font-black text-slate-900">{kpi.value}</p>
              <p className="text-[10px] font-semibold text-slate-500">{kpi.sub}</p>
            </div>
          ))}
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

            {isLoading ? (
              <div className="py-10 text-center text-sm font-semibold text-slate-500">
                <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Loading timeline...</span>
              </div>
            ) : (
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
                              {event.location ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-violet-200 text-[9px] font-semibold text-slate-600">
                                  <MapPin size={10} /> {event.location}
                                </span>
                              ) : null}
                              {event.attendees ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-violet-200 text-[9px] font-semibold text-slate-600">
                                  <Users size={10} /> {event.attendees}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                  <p className="text-lg font-black mt-1 text-slate-900">{events.filter((event) => event.type === 'anniversary').length}</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-3 border border-violet-100/70">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">Milestones</p>
                  <p className="text-lg font-black mt-1 text-slate-900">{events.length}</p>
                </div>
              </div>
              <div className="mt-3 rounded-2xl bg-white/90 border border-violet-100/70 p-3">
                <p className="text-[9px] text-fuchsia-600 uppercase tracking-wider font-bold">Insight</p>
                <p className="text-[11px] leading-relaxed text-slate-600 mt-1">
                  Timeline is now generated from live employee hiring and assignment records.
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
                {events.slice(0, 4).map((event) => (
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
                    onClick={action.label === 'Export Feed' ? () => void exportTimelineCsv() : undefined}
                    disabled={action.label === 'Export Feed' ? isExporting : false}
                    className="flex items-center gap-2 rounded-xl border border-violet-200 bg-white/80 px-2.5 py-2 text-[10px] font-bold text-slate-700 hover:bg-white"
                  >
                    {action.label === 'Export Feed' && isExporting ? <Loader2 size={12} className="animate-spin" /> : <action.icon size={12} />}
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
