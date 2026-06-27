import React, { useState } from 'react';
import { Users, UserPlus, Search, Briefcase, DollarSign, Calendar, Edit2, Check, Shield } from 'lucide-react';

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  department: string;
  salary: number;
  shift: string;
  status: 'active' | 'on_leave' | 'terminated';
  hireDate: string;
}

interface StaffListProps {
  staff?: StaffMember[];
  onAddStaff?: (staff: Omit<StaffMember, 'id'>) => void;
}

export default function StaffList({ staff: initialStaff, onAddStaff }: StaffListProps) {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff || [
    { id: 1, name: 'Kipkoech Kiprop', role: 'Chief Administrator', department: 'Executive Board', salary: 150000, shift: 'Day-Shift (08:00 - 17:00)', status: 'active', hireDate: '2024-01-15' },
    { id: 2, name: 'Sarah Jemutai', role: 'Lead Event Coordinator', department: 'Operations', salary: 85000, shift: 'Flexible (Event-driven)', status: 'active', hireDate: '2024-06-01' },
    { id: 3, name: 'Julius Keter', role: 'Head Facility Groundkeeper', department: 'Maintenance', salary: 45000, shift: 'Day-Shift (06:00 - 15:00)', status: 'active', hireDate: '2023-03-10' },
    { id: 4, name: 'Mercy Chelimo', role: 'Financial Controller', department: 'Finance Department', salary: 110000, shift: 'Day-Shift (08:00 - 17:00)', status: 'active', hireDate: '2025-01-10' },
    { id: 5, name: 'Peter Rono', role: 'Lead Track Coach', department: 'Academy Board', salary: 95000, shift: 'Morning Shift (05:00 - 13:00)', status: 'active', hireDate: '2021-02-18' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Add staff form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDept, setNewDept] = useState('Operations');
  const [newSalary, setNewSalary] = useState(50000);
  const [newShift, setNewShift] = useState('Day-Shift (08:00 - 17:00)');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRole) return;

    const newStaff: StaffMember = {
      id: staff.length + 1,
      name: newName,
      role: newRole,
      department: newDept,
      salary: newSalary,
      shift: newShift,
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0]
    };

    setStaff([newStaff, ...staff]);
    if (onAddStaff) {
      onAddStaff(newStaff);
    }

    // Reset fields
    setNewName('');
    setNewRole('');
    setShowAddForm(false);
  };

  const toggleStatus = (id: number) => {
    setStaff(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus: StaffMember['status'] = s.status === 'active' ? 'on_leave' : s.status === 'on_leave' ? 'terminated' : 'active';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDepartment === 'all' || s.department === filterDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6" id="mgmt-staff-list-page">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-light text-white tracking-tight">Staff Directories</h2>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">Manage athletic coaches, engineers, gate personnel & operations staff</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded font-mono uppercase tracking-wider transition"
          id="btn-toggle-add-staff"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Onboard New Staff
        </button>
      </div>

      {/* Onboarding form modal/collapsible */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl space-y-4" id="add-staff-form">
          <div className="border-b border-neutral-800 pb-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">New Personnel Registration Card</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-neutral-400 mb-1">Holder Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Paul Ereng"
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Job Designation</label>
              <input
                type="text"
                required
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. Lead Hurdles Coach"
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Department</label>
              <select
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Executive Board">Executive Board</option>
                <option value="Operations">Operations</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Finance Department">Finance Department</option>
                <option value="Academy Board">Academy Board</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Monthly Salary (KES)</label>
              <input
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-neutral-400 mb-1">Shift Schedule</label>
              <input
                type="text"
                value={newShift}
                onChange={(e) => setNewShift(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-800 bg-neutral-900 rounded text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase rounded text-[11px] tracking-widest transition"
              >
                Confirm Onboarding
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, role, department..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded border border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="px-3 py-2 text-xs rounded border border-neutral-800 bg-neutral-900 text-white font-mono focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Departments</option>
          <option value="Executive Board">Executive Board</option>
          <option value="Operations">Operations</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Finance Department">Finance Department</option>
          <option value="Academy Board">Academy Board</option>
        </select>
      </div>

      {/* Staff Directory Table Grid */}
      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
        <table className="w-full text-left text-xs border-collapse font-sans">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/60 text-neutral-400 font-mono uppercase tracking-wider">
              <th className="py-3 px-4">Staff Member</th>
              <th className="py-3 px-4">Designation</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4 font-right">Salary Ledger</th>
              <th className="py-3 px-4">Shift & Log</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-850">
            {filteredStaff.map((person) => (
              <tr key={person.id} className="hover:bg-neutral-900/40 transition duration-150">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 font-bold uppercase text-[10px]">
                      {person.name.substring(0, 2)}
                    </div>
                    <div>
                      <span className="block text-white font-bold">{person.name}</span>
                      <span className="text-[10px] text-neutral-500 font-mono italic">Hired: {person.hireDate}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-neutral-200">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    {person.role}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-neutral-400 font-mono text-[10px] uppercase">{person.department}</td>
                <td className="py-3.5 px-4 text-neutral-200 font-mono">
                  KES {person.salary.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-neutral-400 font-mono text-[10px]">{person.shift}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => toggleStatus(person.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border cursor-pointer ${
                      person.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : person.status === 'on_leave'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                    title="Click to toggle status"
                  >
                    {person.status.replace('_', ' ')}
                  </button>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => toggleStatus(person.id)}
                      className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white"
                      title="Adjust shift status"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
