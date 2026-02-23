'use client';

import { useState } from 'react';
import { 
  Search as SearchIcon, 
  UserPlus, 
  MoreHorizontal, 
  Filter, 
  Download, 
  Mail, 
  Phone,
  ArrowUpDown,
  Circle
} from 'lucide-react';

// Mock Data
const INITIAL_EMPLOYEES = [
  { id: 'EMP-001', name: 'Sarah Jenkins', role: 'Product Designer', dept: 'Design', status: 'Active', email: 's.jenkins@company.com' },
  { id: 'EMP-002', name: 'Michael Chen', role: 'Senior Developer', dept: 'Engineering', status: 'Onboarding', email: 'm.chen@company.com' },
  { id: 'EMP-003', name: 'Alicia Vane', role: 'HR Manager', dept: 'People', status: 'Active', email: 'a.vane@company.com' },
  { id: 'EMP-004', name: 'Robert Fox', role: 'Sales Lead', dept: 'Sales', status: 'Leave', email: 'r.fox@company.com' },
  { id: 'EMP-005', name: 'Cody Fisher', role: 'Data Analyst', dept: 'Engineering', status: 'Active', email: 'c.fisher@company.com' },
];

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees] = useState(INITIAL_EMPLOYEES);

  // 1. Functional Filtering Logic
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-400 mx-auto animate-in fade-in duration-700">
      
      {/* Header Section */}
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
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <UserPlus size={18} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ID, role or department..." 
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

      {/* Employee Table */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                    Employee <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-600">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-500">{emp.role} • {emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                        {emp.dept}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={emp.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-gray-400">
                        <button title={emp.email} className="hover:text-blue-600 transition-colors"><Mail size={16} /></button>
                        <button className="hover:text-blue-600 transition-colors"><Phone size={16} /></button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))
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
        
        {/* Pagination Footer */}
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

// Sub-component for Status Styling
function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Active: 'bg-emerald-50 text-emerald-600 ring-emerald-600/20',
    Onboarding: 'bg-blue-50 text-blue-600 ring-blue-600/20',
    Leave: 'bg-amber-50 text-amber-600 ring-amber-600/20',
    Terminated: 'bg-rose-50 text-rose-600 ring-rose-600/20',
  };

  return (
    <span className={`flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status]}`}>
      <Circle size={8} fill="currentColor" />
      {status}
    </span>
  );
}