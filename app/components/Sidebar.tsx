'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Briefcase, Clock, Wallet, Star, Building2,
  TrendingUp, UserCheck, FileText, 
  Share2, History, Zap, Signature, Sparkles,
  ChevronLeft, ChevronRight, Calendar, Settings, 
  CreditCard, UserCog, ShieldCheck,
  Globe, Box
} from 'lucide-react';

type UserRole =
  | 'admin'
  | 'hr-admin'
  | 'manager'
  | 'employee'
  | 'hiring-manager'
  | 'interviewer'
  | 'leadership'
  | 'sales-manager'
  | 'finance'
  | 'marketing'
  | 'approver'
  | 'reviewer'
  | 'auditor'
  | 'compliance-officer'
  | 'it';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
  subItems?: SubItem[];
  roles?: UserRole[];
}

interface SubItem {
  label: string;
  href?: string;
  roles?: UserRole[];
  subItems?: { label: string; href: string; roles?: UserRole[] }[];
}

export default function SovereignSidebar({ module: _module }: { module?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [openSubSections, setOpenSubSections] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // Unified HRMS-First Menu Structure
  const menuGroups: { group: string; items: MenuItem[] }[] = [
    {
      group: 'Human Capital',
      items: [
        {
          icon: <LayoutDashboard size={18} />,
          label: 'Overview',
          href: '/hrms/dashboard',
          roles: ['hr-admin', 'manager', 'employee'],
        },
        {
          icon: <Building2 size={18} />,
          label: 'Company',
          href: '/hrms/dashboard/company-timeline',
          roles: ['hr-admin', 'manager', 'leadership'],
          subItems: [
            { label: 'Company Timeline', href: '/hrms/dashboard/company-timeline' },
            { label: 'Department List', href: '/hrms/dashboard/department-list' },
            { label: 'Employee Directory', href: '/hrms/dashboard/employee-directory' },
            { label: 'Employee Grid', href: '/hrms/dashboard/employee-grid' },
            { label: 'Org Chart', href: '/hrms/dashboard/org-chart' },
          ]
        },
        { 
          icon: <Users size={18} />, 
          label: 'Employee Base', 
          href: '/hrms/employees',
          roles: ['hr-admin', 'manager', 'employee'],
          subItems: [
            { label: 'Add Employee', href: '/hrms/employees/profile/new' },
            { label: 'Termination Management', href: '/hrms/employees/termination' },
            { label: 'Bulk Import', href: '/hrms/employees/bulk-upload' },
            { label: 'Export Records', href: '/hrms/employees/export' },
            { label: 'Re-hire Verification', href: '/hrms/employees/rehire-check' },
          ]
        },
        { 
          icon: <Briefcase size={18} />, 
          label: 'Recruitment', 
          href: '/hrms/recruitment',
          roles: ['hr-admin', 'hiring-manager', 'interviewer', 'manager'],
          subItems: [
            { label: 'Recruitment Dashboard', href: '/hrms/recruitment/dashboard' },
            { label: 'Job Postings', href: '/hrms/recruitment/jobs' },
            { label: 'Applicant Tracking', href: '/hrms/recruitment/applicants' },
            { label: 'Interview Management', href: '/hrms/recruitment/interviews' },
            { label: 'Offer Management', href: '/hrms/recruitment/offers' },
            { label: 'Pre-Onboarding', href: '/hrms/recruitment/onboarding' },
          ]
        },
        { 
          icon: <Star size={18} />, 
          label: 'Performance', 
          href: '/hrms/performance',
          roles: ['hr-admin', 'manager', 'employee', 'leadership'],
          subItems: [
            { label: 'Performance Insights', href: '/hrms/performance/dashboard' },
            { label: 'Objectives & OKRs', href: '/hrms/performance/okrs' },
            { label: 'Review Cycles', href: '/hrms/performance/reviews' },
            { label: 'Succession Planning', href: '/hrms/performance/succession' },
            { label: 'Recognition Wall', href: '/hrms/performance/recognition' },
          ]
        },
        {
          icon: <UserCog size={18} />,
          label: 'Self Service',
          href: '/hrms/self-service',
          roles: ['employee', 'hr-admin', 'manager'],
          subItems: [
            { label: 'Dashboard', href: '/hrms/self-service/dashboard' },
            { label: 'Attendance', href: '/hrms/self-service/attendance' },
            { label: 'Leave History', href: '/hrms/self-service/leave-history' },
            { label: 'Payslips', href: '/hrms/self-service/payslips' },
            { label: 'Documents', href: '/hrms/self-service/documents' },
            { label: 'Profile', href: '/hrms/self-service/profile' },
            { label: 'Schedule', href: '/hrms/self-service/schedule' },
            { label: 'Performance', href: '/hrms/self-service/performance' },
            { label: 'Loans', href: '/hrms/self-service/loans' },
            { label: 'Settings', href: '/hrms/self-service/settings' },
          ]
        },
      ]
    },
    {
      group: 'Operations',
      items: [
        { 
          icon: <Clock size={18} />, 
          label: 'Attendance', 
          href: '/hrms/attendance',
          roles: ['hr-admin', 'manager', 'employee'],
          subItems: [
            { label: 'Real-time Dashboard', href: '/hrms/attendance/dashboard' },
            { label: 'Daily Logs', href: '/hrms/attendance/daily' },
            { label: 'Master Calendar', href: '/hrms/attendance/calendar' },
            { label: 'Virtual Punch-in', href: '/hrms/attendance/checkin' },
            { label: 'Shift Rostering', href: '/hrms/attendance/shifts' },
            { label: 'Leave Management', href: '/hrms/attendance/leave' },
            { label: 'Timesheets & OT', href: '/hrms/attendance/overtime' },
          ]
        },
        { 
          icon: <Wallet size={18} />, 
          label: 'Payroll Engine', 
          href: '/hrms/payroll',
          roles: ['hr-admin', 'finance', 'manager'],
          subItems: [
            { label: 'Payroll Dashboard', href: '/hrms/payroll/dashboard' },
            { label: 'Salary Configuration', href: '/hrms/payroll/salary-structure' },
            { label: 'Tax & Compliance', href: '/hrms/payroll/tax' },
            { label: 'Loans & Advances', href: '/hrms/payroll/loans' },
            { label: 'Reimbursements', href: '/hrms/payroll/reimbursements' },
          ]
        },
        {
          icon: <Calendar size={18} />,
          label: 'Leave Mgmt',
          href: '/hrms/leave',
          roles: ['hr-admin', 'manager', 'employee'],
          subItems: [
            { label: 'Leave Balance Report', href: '/hrms/leave/balance-report' },
            { label: 'Leave Approval List', href: '/hrms/leave/approval-list' },
            { label: 'Leave Policies', href: '/hrms/leave/policies' },
          ]
        },
      ]
    },

    {
      group: 'System',
      items: [
        { icon: <ShieldCheck size={18} />, label: 'Security', href: '/settings/security', roles: ['admin', 'hr-admin'] },
        { icon: <Settings size={18} />, label: 'Configuration', href: '/settings/config', roles: ['admin', 'hr-admin'] },
      ]
    }
  ];

  const allMenuItems = menuGroups.flatMap((group) => group.items);

  const getMenu = (label: string) => allMenuItems.find((item) => item.label === label);
  const getMenuRequired = (label: string): MenuItem => {
    const item = getMenu(label);
    if (item) return item;
    return { icon: <Box size={18} />, label, href: '#' };
  };

  const selfServiceMenu = getMenu('Self Service');
  const selfServiceDirectMenus: MenuItem[] = (selfServiceMenu?.subItems ?? [])
    .filter((subItem) => Boolean(subItem.href))
    .map((subItem) => ({
      icon: <UserCog size={18} />,
      label: subItem.label,
      href: subItem.href as string,
      roles: subItem.roles,
    }));

  const userMenuGroups: { group: string; items: MenuItem[] }[] = [
    {
      group: 'HR Admin',
      items: [
        getMenuRequired('Overview'),
        getMenuRequired('Company'),
        getMenuRequired('Employee Base'),
        getMenuRequired('Recruitment'),
        getMenuRequired('Attendance'),
        getMenuRequired('Leave Mgmt'),
        getMenuRequired('Payroll Engine'),
        getMenuRequired('Performance'),
      ],
    },
    {
      group: 'Manager',
      items: [
        getMenuRequired('Overview'),
        getMenuRequired('Company'),
        getMenuRequired('Employee Base'),
        getMenuRequired('Recruitment'),
        getMenuRequired('Attendance'),
        getMenuRequired('Leave Mgmt'),
        getMenuRequired('Performance'),
      ],
    },
    {
      group: 'All Employees',
      items: [
        ...selfServiceDirectMenus,
      ],
    },
    { group: 'Leadership', items: [getMenuRequired('Company'), getMenuRequired('Performance')] },
    { group: 'Finance', items: [getMenuRequired('Payroll Engine')] },
    { group: 'Project Manager', items: [getMenuRequired('Attendance'), getMenuRequired('Performance')] },
  ];

  useEffect(() => {
    if (!pathname) return;

    const nextOpenItems: Record<string, boolean> = {};
    const nextOpenSubSections: Record<string, boolean> = {};

    userMenuGroups.forEach((group, groupIndex) => {
      group.items.forEach((item, itemIndex) => {
        const itemKey = `${groupIndex}-${itemIndex}-${item.href}`;

        if (item.subItems && pathname.startsWith(item.href)) {
          nextOpenItems[itemKey] = true;
        }

        item.subItems?.forEach((subItem, subIndex) => {
          const childItems = subItem.subItems ?? [];
          const sectionKey = `${itemKey}-${subIndex}-${subItem.label}`;

          if (childItems.some((child) => pathname.startsWith(child.href))) {
            nextOpenItems[itemKey] = true;
            nextOpenSubSections[sectionKey] = true;
          }

          if (subItem.href && pathname.startsWith(subItem.href)) {
            nextOpenItems[itemKey] = true;
          }
        });
      });
    });

    setOpenItems((prev) => ({ ...prev, ...nextOpenItems }));
    setOpenSubSections((prev) => ({ ...prev, ...nextOpenSubSections }));
  }, [pathname]);

  return (
    <aside 
      className={`relative h-screen bg-linear-to-b from-white via-violet-50 to-cyan-50 border-r border-violet-200/60 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col z-30 ${
        collapsed ? 'w-21' : 'w-70'
      }`}
      style={{
        scrollbarColor: 'rgba(200, 210, 230, 0.7) transparent',
        scrollbarWidth: 'thin',
      }}
    >
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-fuchsia-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-24 w-64 h-64 bg-cyan-300/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-72 h-72 bg-violet-300/15 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* 1. Brand Section */}
      <div className={`relative h-20 flex items-center border-b border-violet-200/40 backdrop-blur-sm ${collapsed ? 'px-0 justify-center' : 'px-8 justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-fuchsia-300 to-violet-300 rounded-xl blur opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-9 h-9 bg-linear-to-br from-violet-600 via-fuchsia-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-300/50 group-hover:scale-110 group-hover:shadow-fuchsia-400/50 transition-all">
                <Sparkles className="text-white w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black tracking-[0.2em] bg-linear-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text leading-none">SOVEREIGN</span>
              <span className="text-[9px] font-bold text-cyan-600 mt-1 uppercase tracking-wide">Navigation</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-8 h-8 rounded-full border border-violet-200 bg-white/80 shadow-sm backdrop-blur-sm flex items-center justify-center text-violet-400 hover:text-fuchsia-600 hover:bg-white hover:border-fuchsia-300 transition-all ${collapsed ? 'absolute -right-4 top-10 z-50' : ''}`}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* 2. Navigation Scroll Area */}
      <nav 
        className={`flex-1 overflow-y-auto py-6 space-y-8 ${collapsed ? 'px-3' : 'px-4'}`}
        style={{
          scrollbarColor: 'rgba(148, 163, 184, 0.6) rgba(226, 232, 240, 0.3)',
          scrollbarWidth: 'thin',
        }}
      >
        <style>{`
          nav::-webkit-scrollbar {
            width: 6px;
          }
          nav::-webkit-scrollbar-track {
            background: rgba(111, 92, 255, 0.08);
            border-radius: 10px;
          }
          nav::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(111,92,255,0.5), rgba(255,78,203,0.5));
            border-radius: 10px;
            transition: all 0.2s ease;
          }
          nav::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, rgba(87,66,255,0.8), rgba(255,78,203,0.8));
          }
        `}</style>
        {userMenuGroups.map((group, groupIndex) => (
          <div key={group.group} className="space-y-1">
            {!collapsed && (
              <h3 className="px-4 text-[9px] font-black bg-linear-to-r from-fuchsia-600 to-violet-600 text-transparent bg-clip-text uppercase tracking-[0.25em] mb-4">
                {group.group}
              </h3>
            )}
            <ul className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const itemKey = `${groupIndex}-${itemIndex}-${item.href}`;
                const isActive = pathname?.startsWith(item.href);
                const isToggleItem = Boolean(item.subItems);
                const isOpen = Boolean(openItems[itemKey]);
                const showSubItems = !collapsed && item.subItems && isOpen;

                return (
                  <li key={`${group.group}-${item.href}-${itemIndex}`}>
                    <div className="relative">
                      <Link
                        href={item.href}
                        onClick={(event) => {
                          if (!isToggleItem) return;
                          event.preventDefault();
                          setOpenItems((prev) => ({
                            ...prev,
                            [itemKey]: !prev[itemKey],
                          }));
                        }}
                        className={`flex items-center gap-3.5 py-3 rounded-2xl transition-all duration-300 group relative ${
                          collapsed ? 'justify-center' : 'px-4'
                        } ${
                          isActive 
                            ? 'bg-linear-to-br from-violet-100 via-fuchsia-50 to-cyan-50 text-violet-700 shadow-[inset_0_0_0_1.5px_rgba(111,92,255,0.4)] shadow-violet-200/50 backdrop-blur-sm' 
                            : 'text-slate-600 hover:text-fuchsia-600 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-sm'
                        }`}
                      >
                        <div className={`shrink-0 transition-all duration-300 ${isActive ? 'text-violet-600 scale-110 drop-shadow-lg' : 'text-slate-500 group-hover:text-fuchsia-600 group-hover:scale-110'}`}>
                          {item.icon}
                        </div>
                        {!collapsed && (
                          <span className={`text-[13px] tracking-tight truncate flex-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                            {item.label}
                          </span>
                        )}
                        {!collapsed && (item as any).badge && (
                          <span className="text-[8px] font-black bg-linear-to-r from-violet-100 to-pink-100 px-2 py-1 rounded-full text-violet-600 group-hover:from-fuchsia-200 group-hover:to-pink-200 group-hover:text-fuchsia-700 transition-all shadow-sm">
                            {(item as any).badge}
                          </span>
                        )}
                        {!collapsed && isToggleItem && (
                          <ChevronRight size={14} className={`text-gray-400 transition-all ${isOpen ? 'rotate-90' : ''}`} />
                        )}
                        {isActive && (
                          <div className="absolute right-2 w-2 h-2 rounded-full bg-fuchsia-500 shadow-lg shadow-fuchsia-400/50 animate-pulse" />
                        )}
                      </Link>
                    </div>

                    {showSubItems && item.subItems && (
                      <ul className="mt-2 ml-10 space-y-1">
                        {item.subItems.map((subItem, subIndex) => {
                          const childItems = Array.isArray(subItem.subItems) ? subItem.subItems : [];
                          const hasChildren = childItems.length > 0;
                          const isSubActive = subItem.href ? pathname?.startsWith(subItem.href) : false;
                          const isChildActive = hasChildren
                            ? childItems.some((child) => pathname?.startsWith(child.href))
                            : false;
                          const sectionKey = `${itemKey}-${subIndex}-${subItem.label}`;
                          const isSectionOpen = Boolean(openSubSections[sectionKey]);

                          if (hasChildren) {
                            return (
                              <li key={`${sectionKey}-wrapper`}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenSubSections((prev) => ({
                                      ...prev,
                                      [sectionKey]: !prev[sectionKey]
                                    }))
                                  }
                                  className={`flex items-center w-full rounded-xl px-3 py-2 text-[11px] transition-all ${
                                    isChildActive ? 'bg-white/70 text-violet-700 font-semibold shadow-sm backdrop-blur-sm' : 'text-slate-600 hover:bg-white/50 hover:text-fuchsia-600 hover:backdrop-blur-sm'
                                  }`}
                                >
                                  <span className="flex-1 text-left">{subItem.label}</span>
                                  <ChevronRight size={12} className={`transition-transform ${isSectionOpen ? 'rotate-90' : ''}`} />
                                </button>
                                {isSectionOpen && (
                                  <ul className="mt-1 ml-4 space-y-1">
                                    {childItems.map((child) => {
                                      const isChildItemActive = pathname?.startsWith(child.href);
                                      return (
                                        <li key={child.href}>
                                          <Link
                                            href={child.href}
                                            className={`block rounded-xl px-3 py-2 text-[11px] transition-all ${
                                              isChildItemActive ? 'bg-violet-100/60 text-violet-700 font-semibold shadow-sm' : 'text-slate-600 hover:bg-white/50 hover:text-fuchsia-600'
                                            }`}
                                          >
                                            {child.label}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            );
                          }

                          return (
                            <li key={`${sectionKey}-${subItem.href ?? subItem.label}`}>
                              {subItem.href ? (
                                <Link
                                  href={subItem.href}
                                  className={`block rounded-xl px-3 py-2 text-[11px] transition-all ${
                                    isSubActive ? 'bg-white/70 text-violet-700 font-semibold shadow-sm backdrop-blur-sm' : 'text-slate-600 hover:bg-white/50 hover:text-fuchsia-600 hover:backdrop-blur-sm'
                                  }`}
                                >
                                  {subItem.label}
                                </Link>
                              ) : (
                                <span className="block rounded-xl px-3 py-2 text-[11px] text-slate-600">
                                  {subItem.label}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      
    </aside>
  );
}