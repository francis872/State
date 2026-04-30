'use client';
import React from 'react';
import { FiBell, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const progressBars = [
  { label: 'Leads nuevos', value: 72, color: 'bg-blue-500' },
  { label: 'Visitas agendadas', value: 54, color: 'bg-blue-400' },
  { label: 'En evaluación', value: 45, color: 'bg-indigo-400' },
  { label: 'Output cierre', value: 65, color: 'bg-slate-300' },
];

const tasks = [
  { label: 'Llamada con Carlos M.', time: 'Hoy 09:30', done: true },
  { label: 'Enviar propuesta', time: 'Hoy 11:00', done: true },
  { label: 'Visita El Poblado', time: 'Hoy 14:00', done: false },
  { label: 'Follow-up Ana García', time: 'Hoy 16:00', done: false },
  { label: 'Reunión equipo comercial', time: 'Hoy 17:30', done: false },
];

export default function WelcomeCard({ name = 'Asesor' }: { name?: string }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado bienvenida */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a2e]">Bienvenido, {name}</h1>
          <p className="text-sm text-slate-400 mt-1">Esto es lo que está pasando hoy en tu CRM.</p>
        </div>
        <button className="relative p-2 rounded-xl bg-white shadow hover:shadow-md transition-all" title="Notificaciones">
          <FiBell size={20} className="text-slate-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      {/* Barras de progreso estilo Crextio */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex flex-wrap gap-3">
          {progressBars.map((bar) => (
            <div key={bar.label} className="flex flex-col gap-1 flex-1 min-w-[120px]">
              <span className="text-xs text-slate-400 font-medium">{bar.label}</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${bar.color} transition-all duration-700`}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 font-semibold">{bar.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Leads activos', value: 92, icon: '👥', delta: '+5' },
          { label: 'Conversiones', value: 75, icon: '🏠', delta: '+3' },
          { label: 'Deals abiertos', value: 315, icon: '📋', delta: '+12' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <FiTrendingUp size={10} /> {stat.delta}
              </span>
            </div>
            <span className="text-3xl font-bold text-[#1a1a2e]">{stat.value}</span>
            <span className="text-xs text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Tasks de hoy */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#1a1a2e]">Tareas de hoy</h3>
          <span className="text-xs text-blue-500 font-semibold bg-blue-50 px-2 py-1 rounded-full">
            {tasks.filter(t => t.done).length}/{tasks.length}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiCheckCircle
                  size={16}
                  className={task.done ? 'text-blue-500' : 'text-slate-200'}
                />
                <span className={`text-sm font-medium ${task.done ? 'line-through text-slate-300' : 'text-slate-600'}`}>
                  {task.label}
                </span>
              </div>
              <span className="text-xs text-slate-400">{task.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
