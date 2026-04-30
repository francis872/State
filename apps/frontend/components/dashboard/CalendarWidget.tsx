'use client';
import React, { useState } from 'react';

type CalEvent = { day: number; title: string; color: string };

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const events: CalEvent[] = [
  { day: 2, title: 'Visita El Poblado', color: 'bg-blue-100 text-blue-700' },
  { day: 5, title: 'Cierre contrato', color: 'bg-green-100 text-green-700' },
  { day: 9, title: 'Propuesta Envigado', color: 'bg-indigo-100 text-indigo-700' },
  { day: 14, title: 'Reunión equipo', color: 'bg-yellow-100 text-yellow-700' },
  { day: 18, title: 'Visita Sabaneta', color: 'bg-blue-100 text-blue-700' },
  { day: 22, title: 'Seguimiento leads', color: 'bg-purple-100 text-purple-700' },
  { day: 26, title: 'Cierre mensual', color: 'bg-rose-100 text-rose-700' },
];

const today = new Date().getDate();
const offset = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

export default function CalendarWidget() {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const [selected, setSelected] = useState<number | null>(today);

  const getEvent = (day: number) => events.find(e => e.day === day);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#1a1a2e]">
          {new Date().toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
        </h3>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <span key={d} className="text-center text-xs font-medium text-slate-400 pb-1">{d}</span>
        ))}
      </div>

      {/* Celdas del mes */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: (offset === 0 ? 6 : offset - 1) }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const event = getEvent(day);
          const isToday = day === today;
          const isSel = day === selected;
          return (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className={`relative flex flex-col items-center justify-start pt-1 h-9 rounded-xl text-sm font-medium transition-all
                ${isToday ? 'bg-blue-500 text-white' : isSel ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              {day}
              {event && !isToday && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Evento del día seleccionado */}
      {selected && getEvent(selected) && (
        <div className={`mt-4 rounded-xl px-3 py-2 text-sm font-medium ${getEvent(selected)!.color}`}>
          📅 {getEvent(selected)!.title}
        </div>
      )}
    </div>
  );
}
