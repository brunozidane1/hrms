'use client';

import { useEffect, useMemo, useState } from 'react';
import { Layers, Plus, Search, Filter, Loader2, AlertCircle, CheckCircle2, Briefcase, Users } from 'lucide-react';
import { ApiClientError } from '@/lib/api-client';
import { departmentsService, type Department } from '@/lib/services/departments';
import { positionsService, type Position } from '@/lib/services/positions';
import { employeesService, type Employee } from '@/lib/services/employees';

const makeCode = (name: string): string =>
  name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .split(/\s+/)
    .map((part) => part.slice(0, 2))
    .join('')
    .slice(0, 12);

const todayIso = () => new Date().toISOString().slice(0, 10);

export default function DepartmentListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPositionSaving, setIsPositionSaving] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentCode, setNewDepartmentCode] = useState('');

  const [positionForm, setPositionForm] = useState({
    departmentId: '',
    title: '',
    code: '',
    level: '1'
  });

  const [assignmentForm, setAssignmentForm] = useState({
    employeeId: '',
    departmentId: '',
    positionId: '',
    managerEmployeeId: '',
    startDate: todayIso()
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [deptResponse, positionResponse, employeeResponse] = await Promise.all([
        departmentsService.list({ page: 1, limit: 100 }),
        positionsService.list({ page: 1, limit: 100 }),
        employeesService.list({ page: 1, limit: 100 })
      ]);

      setDepartments(deptResponse.data);
      setPositions(positionResponse.data);
      setEmployees(employeeResponse.data);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to load departments.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filteredDepartments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return departments;

    return departments.filter((department) =>
      department.name.toLowerCase().includes(query) || department.code.toLowerCase().includes(query)
    );
  }, [departments, searchQuery]);

  const positionsByDepartment = useMemo(() => {
    const map = new Map<string, number>();
    positions.forEach((position) => {
      map.set(position.department_id, (map.get(position.department_id) ?? 0) + 1);
    });
    return map;
  }, [positions]);

  const assignmentPositions = useMemo(() => {
    if (!assignmentForm.departmentId) return positions;
    return positions.filter((position) => position.department_id === assignmentForm.departmentId);
  }, [positions, assignmentForm.departmentId]);

  const createDepartment = async () => {
    setError('');
    setSuccess('');

    const name = newDepartmentName.trim();
    const code = (newDepartmentCode.trim() || makeCode(name)).slice(0, 30);

    if (!name || name.length < 2) {
      setError('Department name must be at least 2 characters.');
      return;
    }

    if (!code || code.length < 2) {
      setError('Department code must be at least 2 characters.');
      return;
    }

    setIsSaving(true);
    try {
      await departmentsService.create({ name, code });
      setNewDepartmentName('');
      setNewDepartmentCode('');
      setSuccess('Department created successfully.');
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create department.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const createPosition = async () => {
    setError('');
    setSuccess('');

    const title = positionForm.title.trim();
    const code = (positionForm.code.trim() || makeCode(title)).slice(0, 30);
    const level = Number(positionForm.level);

    if (!positionForm.departmentId) {
      setError('Select a department for the position.');
      return;
    }

    if (!title || title.length < 2) {
      setError('Position title must be at least 2 characters.');
      return;
    }

    if (!code || code.length < 2) {
      setError('Position code must be at least 2 characters.');
      return;
    }

    if (!Number.isInteger(level) || level < 1 || level > 30) {
      setError('Position rank/level must be between 1 and 30.');
      return;
    }

    setIsPositionSaving(true);
    try {
      await positionsService.create({
        department_id: positionForm.departmentId,
        title,
        code,
        level,
        is_active: true
      });

      setPositionForm({
        departmentId: '',
        title: '',
        code: '',
        level: '1'
      });

      setSuccess('Position created successfully.');
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to create position.');
      }
    } finally {
      setIsPositionSaving(false);
    }
  };

  const assignPosition = async () => {
    setError('');
    setSuccess('');

    if (!assignmentForm.employeeId || !assignmentForm.departmentId || !assignmentForm.positionId || !assignmentForm.startDate) {
      setError('Employee, department, position, and start date are required.');
      return;
    }

    setIsAssigning(true);
    try {
      await positionsService.assign({
        employee_id: assignmentForm.employeeId,
        department_id: assignmentForm.departmentId,
        position_id: assignmentForm.positionId,
        ...(assignmentForm.managerEmployeeId ? { manager_employee_id: assignmentForm.managerEmployeeId } : {}),
        start_date: assignmentForm.startDate
      });

      setAssignmentForm({
        employeeId: '',
        departmentId: '',
        positionId: '',
        managerEmployeeId: '',
        startDate: todayIso()
      });

      setSuccess('Employee position/rank updated successfully.');
      await loadData();
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Failed to assign position.');
      }
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="fun-page min-h-screen bg-[#F0F2F5] p-4 lg:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-5 animate-in fade-in duration-500">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <Layers size={12} /> Departments
            </span>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Department Matrix</h1>
            <p className="text-[11px] text-slate-500 font-medium">Live organizational units from backend API.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search departments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2.5 w-52 sm:w-64 rounded-xl border border-slate-200 bg-white text-[11px] font-semibold outline-none focus:border-slate-900 transition-all"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <Filter size={15} className="text-slate-900" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Total Departments</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{departments.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Active Departments</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{departments.filter((d) => d.is_active).length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Total Positions</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{positions.length}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
          <h2 className="text-sm font-black text-slate-900">Create Department</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              placeholder="Department name"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            />
            <input
              value={newDepartmentCode}
              onChange={(e) => setNewDepartmentCode(e.target.value.toUpperCase())}
              placeholder="Code (optional)"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            />
            <button
              onClick={() => void createDepartment()}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-slate-800 transition-all disabled:opacity-60"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Create
            </button>
          </div>
          {error ? (
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600">
              <AlertCircle size={14} /> {error}
            </p>
          ) : null}
          {success ? (
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 size={14} /> {success}
            </p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
          <h2 className="text-sm font-black text-slate-900 inline-flex items-center gap-2"><Briefcase size={14} />Create Position / Rank</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <select
              value={positionForm.departmentId}
              onChange={(e) => setPositionForm((current) => ({ ...current, departmentId: e.target.value }))}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            >
              <option value="">Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
            <input
              value={positionForm.title}
              onChange={(e) => setPositionForm((current) => ({ ...current, title: e.target.value }))}
              placeholder="Position title"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            />
            <input
              value={positionForm.code}
              onChange={(e) => setPositionForm((current) => ({ ...current, code: e.target.value.toUpperCase() }))}
              placeholder="Position code"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            />
            <input
              type="number"
              min={1}
              max={30}
              value={positionForm.level}
              onChange={(e) => setPositionForm((current) => ({ ...current, level: e.target.value }))}
              placeholder="Rank level"
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            />
            <button
              onClick={() => void createPosition()}
              disabled={isPositionSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-slate-800 transition-all disabled:opacity-60"
            >
              {isPositionSaving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Position
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
          <h2 className="text-sm font-black text-slate-900 inline-flex items-center gap-2"><Users size={14} />Assign / Promote Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <select
              value={assignmentForm.employeeId}
              onChange={(e) => setAssignmentForm((current) => ({ ...current, employeeId: e.target.value }))}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            >
              <option value="">Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name} ({employee.employee_code})</option>
              ))}
            </select>
            <select
              value={assignmentForm.departmentId}
              onChange={(e) => setAssignmentForm((current) => ({ ...current, departmentId: e.target.value, positionId: '' }))}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            >
              <option value="">Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
            <select
              value={assignmentForm.positionId}
              onChange={(e) => setAssignmentForm((current) => ({ ...current, positionId: e.target.value }))}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            >
              <option value="">Position</option>
              {assignmentPositions.map((position) => (
                <option key={position.id} value={position.id}>{position.title} ({position.code})</option>
              ))}
            </select>
            <select
              value={assignmentForm.managerEmployeeId}
              onChange={(e) => setAssignmentForm((current) => ({ ...current, managerEmployeeId: e.target.value }))}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            >
              <option value="">Manager (optional)</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</option>
              ))}
            </select>
            <input
              type="date"
              value={assignmentForm.startDate}
              onChange={(e) => setAssignmentForm((current) => ({ ...current, startDate: e.target.value }))}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none focus:border-slate-900"
            />
            <button
              onClick={() => void assignPosition()}
              disabled={isAssigning}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-slate-800 transition-all disabled:opacity-60"
            >
              {isAssigning ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Assign
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900">Department Operations Grid</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-400 text-[9px] uppercase tracking-wider font-bold">
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Parent</th>
                  <th className="px-4 py-3">Positions</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Loading departments...
                      </span>
                    </td>
                  </tr>
                ) : filteredDepartments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                      No departments found.
                    </td>
                  </tr>
                ) : (
                  filteredDepartments.map((department) => {
                    const parent = departments.find((d) => d.id === department.parent_department_id);
                    return (
                      <tr key={department.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 text-[11px] font-bold text-slate-900">{department.name}</td>
                        <td className="px-4 py-3 text-[11px] font-semibold text-slate-600">{department.code}</td>
                        <td className="px-4 py-3 text-[11px] text-slate-500">{parent?.name ?? '-'}</td>
                        <td className="px-4 py-3 text-[11px] font-semibold text-slate-700">{positionsByDepartment.get(department.id) ?? 0}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-wider ${department.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            {department.is_active ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-slate-500">{new Date(department.created_at).toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
