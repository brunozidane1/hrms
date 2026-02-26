'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  Search as SearchIcon,
  UserPlus,
  MoreHorizontal,
  Filter,
  Download,
  Loader2,
  AlertCircle,
  Circle
} from 'lucide-react';
import { employeesService, type Employee } from '@/lib/services/employees';
import { ApiClientError } from '@/lib/api-client';

const normalizeStatus = (status: Employee['employment_status']): string => {
  switch (status) {
    case 'CONFIRMED':
      return 'Active';
    case 'PROBATION':
      return 'Onboarding';
    case 'SUSPENDED':
      return 'Suspended';
    case 'RESIGNED':
    case 'TERMINATED':
      return 'Inactive';
    default:
      return status;
  }
};

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await employeesService.list({ page: 1, limit: 100 });
        setEmployees(response.data);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Could not load employees.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return employees;

    return employees.filter((emp) => {
      const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
      return (
        fullName.includes(query) ||
        emp.employee_code.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query)
      );
    });
  }, [employees, searchTerm]);

  return (
    <div className="p-8 max-w-400 mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Employee Directory</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            Managing <span className="font-bold text-blue-600">{filteredEmployees.length}</span> total members
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <Link href="/hrms/employees/profile/new" className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <UserPlus size={18} />
            <span>Add Employee</span>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, employee code, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none ring-1 ring-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-blue-500 transition-all">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Hire Date</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                      <Loader2 size={18} className="animate-spin" /> Loading employees...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600">
                      <AlertCircle size={18} /> {error}
                    </div>
                  </td>
                </tr>
              ) : filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => {
                  const fullName = `${emp.first_name} ${emp.last_name}`;
                  const initials = `${emp.first_name[0] ?? ''}${emp.last_name[0] ?? ''}`.toUpperCase();

                  return (
                    <tr key={emp.id} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-600">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{fullName}</p>
                            <p className="text-xs text-gray-500">{emp.employee_code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{emp.email}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={normalizeStatus(emp.employment_status)} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(emp.hire_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                        <SearchIcon size={32} />
                      </div>
                      <p className="text-gray-500 font-medium">No employees found matching "{searchTerm}"</p>
                      <button onClick={() => setSearchTerm('')} className="text-sm text-blue-600 font-bold hover:underline">Clear search</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">
            Showing {filteredEmployees.length} of {employees.length} entries
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-lg opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 text-xs font-bold text-white bg-gray-900 rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-600 ring-emerald-600/20',
    Onboarding: 'bg-blue-50 text-blue-600 ring-blue-600/20',
    Suspended: 'bg-amber-50 text-amber-600 ring-amber-600/20',
    Inactive: 'bg-rose-50 text-rose-600 ring-rose-600/20'
  };

  return (
    <span className={`flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status] ?? styles.Inactive}`}>
      <Circle size={8} fill="currentColor" />
      {status}
    </span>
  );
}
