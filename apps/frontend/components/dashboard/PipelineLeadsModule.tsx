'use client';
import React, { useState } from 'react';
import { FiSearch, FiFilter, FiMoreVertical, FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiBarChart2, FiShoppingBag } from 'react-icons/fi';

type LeadStatus = 'Interés' | 'Evaluación' | 'Objeción' | 'Cierre';

interface Lead {
  id: string;
  name: string;
  phone: string;
  project: string;
  value: number;
  status: LeadStatus;
  score: number;
  date: string;
  agent: string;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  'Interés': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Evaluación': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'Objeción': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Cierre': 'bg-green-500/20 text-green-300 border-green-500/30',
};

const STATUS_DOT: Record<LeadStatus, string> = {
  'Interés': 'bg-blue-400',
  'Evaluación': 'bg-yellow-400',
  'Objeción': 'bg-orange-400',
  'Cierre': 'bg-green-400',
};

const STAGES: LeadStatus[] = ['Interés', 'Evaluación', 'Objeción', 'Cierre'];

const mockLeads: Lead[] = [
  { id: '1', name: 'Carlos Mejía', phone: '+57 312 456 7890', project: 'El Poblado Res.', value: 480000000, status: 'Cierre', score: 92, date: '2025-01-15', agent: 'Ana R.' },
  { id: '2', name: 'María Torres', phone: '+57 300 987 6543', project: 'Torres Sabaneta', value: 320000000, status: 'Evaluación', score: 78, date: '2025-01-14', agent: 'Luis G.' },
  { id: '3', name: 'Andrés Villa', phone: '+57 315 234 5678', project: 'Castilla Res.', value: 195000000, status: 'Objeción', score: 61, date: '2025-01-14', agent: 'Ana R.' },
  { id: '4', name: 'Laura Salazar', phone: '+57 321 765 4321', project: 'Envigado Premium', value: 560000000, status: 'Cierre', score: 95, date: '2025-01-13', agent: 'Carlos M.' },
  { id: '5', name: 'Juan Restrepo', phone: '+57 316 543 2109', project: 'El Poblado Res.', value: 240000000, status: 'Interés', score: 44, date: '2025-01-13', agent: 'Luis G.' },
  { id: '6', name: 'Camila Ríos', phone: '+57 304 876 5432', project: 'Torres Sabaneta', value: 380000000, status: 'Evaluación', score: 72, date: '2025-01-12', agent: 'Carlos M.' },
  { id: '7', name: 'Felipe Castro', phone: '+57 313 321 0987', project: 'Castilla Res.', value: 210000000, status: 'Interés', score: 38, date: '2025-01-11', agent: 'Ana R.' },
  { id: '8', name: 'Sofia Herrera', phone: '+57 318 654 3210', project: 'Envigado Premium', value: 620000000, status: 'Cierre', score: 98, date: '2025-01-10', agent: 'Luis G.' },
];

const kpis = [
  { label: 'Ingresos estimados', value: '$3.08B', icon: <FiDollarSign size={18} />, delta: '+18%', up: true },
  { label: 'Leads activos', value: '284', icon: <FiUsers size={18} />, delta: '+8%', up: true },
  { label: 'Visitas agendadas', value: '47', icon: <FiShoppingBag size={18} />, delta: '+5%', up: true },
  { label: 'Tasa conversión', value: '24%', icon: <FiBarChart2 size={18} />, delta: '-2%', up: false },
];

const revenueData = [40, 65, 50, 80, 60, 90, 75, 95, 70, 85, 100, 88];
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const maxRevenue = 100;

const categoryData = [
  { label: 'El Poblado', pct: 35, color: '#6366f1' },
  { label: 'Sabaneta', pct: 25, color: '#8b5cf6' },
  { label: 'Envigado', pct: 22, color: '#06b6d4' },
  { label: 'Otros', pct: 18, color: '#334155' },
];

export default function PipelineLeadsModule() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'Todos'>('Todos');

  const filtered = mockLeads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.project.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Todos' || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Kanban columns
  const kanbanCols: Record<LeadStatus, Lead[]> = {
    'Interés': mockLeads.filter(l => l.status === 'Interés'),
    'Evaluación': mockLeads.filter(l => l.status === 'Evaluación'),
    'Objeción': mockLeads.filter(l => l.status === 'Objeción'),
    'Cierre': mockLeads.filter(l => l.status === 'Cierre'),
  };

  // Donut
  let cumulative = 0;
  const donutSegments = categoryData.map(d => {
    const start = cumulative;
    cumulative += d.pct;
    return { ...d, start };
  });

  const formatCOP = (v: number) =>
    v >= 1_000_000_000
      ? `$${(v / 1_000_000_000).toFixed(1)}B`
      : `$${(v / 1_000_000).toFixed(0)}M`;

  return (
    <div className="w-full min-h-screen bg-[#0f1117] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Pipeline & Leads</h1>
            <p className="text-sm text-slate-400 mt-0.5">Gestión de oportunidades en tiempo real</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
            + Nuevo lead
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(kpi => (
            <div key={kpi.label} className="bg-[#1a1d27] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{kpi.icon}</span>
                <span className={`text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full
                  ${kpi.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {kpi.up ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />} {kpi.delta}
                </span>
              </div>
              <span className="text-2xl font-bold text-white">{kpi.value}</span>
              <span className="text-xs text-slate-500">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue bar chart */}
          <div className="lg:col-span-2 bg-[#1a1d27] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Ingresos estimados por mes</h3>
            </div>
            <div className="flex items-end gap-1.5 h-32">
              {revenueData.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-all duration-500 ${v === Math.max(...revenueData) ? 'bg-indigo-500' : 'bg-slate-700'}`}
                    style={{ height: `${(v / maxRevenue) * 100}px` }}
                  />
                  <span className="text-xs text-slate-600">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category donut */}
          <div className="bg-[#1a1d27] border border-white/5 rounded-2xl p-5 flex flex-col">
            <h3 className="text-white font-semibold mb-4">Ventas por zona</h3>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                  {donutSegments.map((seg, i) => (
                    <circle
                      key={i}
                      cx="21" cy="21" r="15.9"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="6"
                      strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
                      strokeDashoffset={`${-(seg.start)}`}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">Zonas</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              {categoryData.map(d => (
                <div key={d.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span className="text-xs text-slate-400">{d.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-300">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kanban columns */}
        <div>
          <h3 className="text-white font-semibold mb-3">Estado del Pipeline</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map(stage => (
              <div key={stage} className="bg-[#1a1d27] border border-white/5 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${STATUS_DOT[stage]}`} />
                    <span className="text-sm font-semibold text-white">{stage}</span>
                  </div>
                  <span className="text-xs bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">
                    {kanbanCols[stage].length}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {kanbanCols[stage].map(lead => (
                    <div key={lead.id} className="bg-[#0f1117] rounded-xl p-3 border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors leading-tight">{lead.name}</span>
                        <span className="text-xs text-slate-500 font-bold">{lead.score}</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-1">{lead.project}</div>
                      <div className="text-xs font-semibold text-indigo-400">{formatCOP(lead.value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-[#1a1d27] border border-white/5 rounded-2xl">
          {/* Table header + filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-white/5">
            <h3 className="text-white font-semibold">Lista de Leads</h3>
            <div className="flex flex-wrap gap-2">
              {/* Search */}
              <div className="flex items-center gap-2 bg-[#0f1117] border border-white/5 rounded-xl px-3 py-2">
                <FiSearch size={14} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar lead o proyecto..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none w-40"
                />
              </div>
              {/* Status filter */}
              <div className="flex items-center gap-1">
                <FiFilter size={14} className="text-slate-500" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value as LeadStatus | 'Todos')}
                  className="bg-[#0f1117] border border-white/5 text-sm text-slate-300 rounded-xl px-3 py-2 outline-none"
                  aria-label="Filtrar por estado"
                >
                  <option value="Todos">Todos</option>
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Lead', 'Proyecto', 'Valor', 'Status', 'Score', 'Asesor', 'Fecha', ''].map(col => (
                    <th key={col} className="px-5 py-3 text-left text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                  >
                    <td className="px-5 py-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.phone}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-300">{lead.project}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-indigo-400">{formatCOP(lead.value)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[lead.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[lead.status]}`} />
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-semibold">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-400">{lead.agent}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">{lead.date}</td>
                    <td className="px-5 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-all" title="Opciones">
                        <FiMoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-slate-500 text-sm">
                      No se encontraron leads
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 text-xs text-slate-500 border-t border-white/5">
            Mostrando {filtered.length} de {mockLeads.length} leads
          </div>
        </div>

      </div>
    </div>
  );
}
