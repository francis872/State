'use client';
import React from 'react';

const HOURS = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
const bars = [65, 40, 85, 60, 90, 30, 75, 55, 45, 80];

export default function TimeTrackerWidget() {
  const total = Math.round(bars.reduce((a, b) => a + b, 0) / bars.length);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#1a1a2e]">Actividad del día</h3>
        <span className="text-sm font-bold text-blue-500">{total}% eficiencia</span>
      </div>

      {/* Progress circular */}
      <div className="flex justify-center mb-4">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke="#3b82f6"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - total / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#1a1a2e]">{total}%</span>
            <span className="text-xs text-slate-400">hoy</span>
          </div>
        </div>
      </div>

      {/* Mini barras por hora */}
      <div className="flex items-end gap-1 h-16">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className="w-full rounded-t-sm bg-blue-400 opacity-80 transition-all duration-500"
              style={{ height: `${(h / 100) * 48}px` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-slate-300">09h</span>
        <span className="text-xs text-slate-300">18h</span>
      </div>
    </div>
  );
}
