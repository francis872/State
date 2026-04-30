'use client';
import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiUsers, FiGlobe, FiDollarSign, FiBarChart2 } from 'react-icons/fi';

const countryData = [
  { country: 'Colombia 🇨🇴', city: 'Medellín', users: 1842, pct: 42 },
  { country: 'Colombia 🇨🇴', city: 'Bogotá', users: 934, pct: 21 },
  { country: 'Colombia 🇨🇴', city: 'Cali', users: 614, pct: 14 },
  { country: 'Colombia 🇨🇴', city: 'Barranquilla', users: 421, pct: 10 },
  { country: 'Colombia 🇨🇴', city: 'Bucaramanga', users: 312, pct: 7 },
  { country: 'Colombia 🇨🇴', city: 'Otros', users: 277, pct: 6 },
];

const topEngaged = [
  { name: 'Proyecto El Poblado', value: 94, color: 'bg-indigo-400' },
  { name: 'Torres Sabaneta', value: 78, color: 'bg-purple-400' },
  { name: 'Castilla Residencial', value: 63, color: 'bg-blue-400' },
  { name: 'Envigado Premium', value: 51, color: 'bg-violet-400' },
];

const forecastData = [
  { label: 'Ene', prev: 180, curr: 210 },
  { label: 'Feb', prev: 210, curr: 190 },
  { label: 'Mar', prev: 170, curr: 240 },
  { label: 'Abr', prev: 230, curr: 260 },
  { label: 'May', prev: 200, curr: 290 },
  { label: 'Jun', prev: 250, curr: 310 },
];

const maxForecast = 320;

const timeStats = [
  { label: 'Lun', h: 75 }, { label: 'Mar', h: 50 }, { label: 'Mié', h: 90 },
  { label: 'Jue', h: 65 }, { label: 'Vie', h: 85 }, { label: 'Sáb', h: 40 }, { label: 'Dom', h: 30 },
];

export default function AnalyticsModule() {
  return (
    <div className="w-full min-h-screen bg-[#13132b] p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics & Métricas</h1>
            <p className="text-sm text-indigo-300/70 mt-0.5">Visión global del rendimiento comercial</p>
          </div>
          <div className="flex gap-3">
            {['7D', '30D', '90D'].map((range) => (
              <button
                key={range}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${range === '30D' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-indigo-200 hover:bg-white/20'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total usuarios', value: '4,400', icon: <FiUsers size={18} />, delta: '+12%', up: true, color: 'text-indigo-400' },
            { label: 'Leads activos', value: '1,284', icon: <FiBarChart2 size={18} />, delta: '+8%', up: true, color: 'text-purple-400' },
            { label: 'Ingresos est.', value: '$38,200', icon: <FiDollarSign size={18} />, delta: '+18%', up: true, color: 'text-blue-400' },
            { label: 'Tasa cierre', value: '24.6%', icon: <FiGlobe size={18} />, delta: '-2%', up: false, color: 'text-violet-400' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className={`${kpi.color}`}>{kpi.icon}</span>
                <span className={`text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full
                  ${kpi.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {kpi.up ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />} {kpi.delta}
                </span>
              </div>
              <span className="text-2xl font-bold text-white">{kpi.value}</span>
              <span className="text-xs text-indigo-200/60">{kpi.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabla actividad por ciudad */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FiGlobe size={16} className="text-indigo-400" /> Actividad por ciudad
            </h3>
            <div className="flex flex-col gap-3">
              {countryData.map((row) => (
                <div key={row.city} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-indigo-100">{row.city}</span>
                    <span className="text-xs text-indigo-300/60">{row.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa / Zona globo simulada */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#1a1a40] to-[#2d2d6b] border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 70%)`,
              }}
            />
            {/* Globo CSS art */}
            <div className="relative w-36 h-36">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-900 opacity-80" />
              <div className="absolute inset-2 rounded-full border border-indigo-400/30"
                style={{ transform: 'rotateX(20deg)', boxShadow: 'inset 0 0 30px rgba(99,102,241,0.4)' }} />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-indigo-400/20" style={{ transform: 'translateY(-50%)' }} />
              <div className="absolute top-1/3 left-0 right-0 h-px bg-indigo-400/10" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-indigo-400/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FiGlobe size={42} className="text-indigo-200/60" />
              </div>
              {/* puntos de presencia */}
              {[
                { top: '35%', left: '48%' }, { top: '50%', left: '35%' },
                { top: '55%', left: '62%' }, { top: '40%', left: '68%' },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-indigo-300 rounded-full animate-pulse"
                  style={{ top: pos.top, left: pos.left, boxShadow: '0 0 6px #818cf8' }}
                />
              ))}
            </div>
            <p className="text-xs text-indigo-200/60 mt-4 text-center">Cobertura activa<br />Colombia</p>
          </div>

          {/* Most engaged */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-4">Proyectos más activos</h3>
            <div className="flex flex-col gap-4">
              {topEngaged.map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-indigo-100">{item.name}</span>
                    <span className="text-xs text-indigo-300/70 font-semibold">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-2 rounded-full ${item.color} transition-all duration-700`}
                      style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forecast mensual */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Forecast de leads</h3>
              <div className="flex gap-3 text-xs text-indigo-300/60">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" /> 2024</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400 inline-block" /> 2025</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-40">
              {forecastData.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end">
                    <div
                      className="flex-1 bg-indigo-500/50 rounded-t"
                      style={{ height: `${(d.prev / maxForecast) * 120}px` }}
                    />
                    <div
                      className="flex-1 bg-purple-500/70 rounded-t"
                      style={{ height: `${(d.curr / maxForecast) * 120}px` }}
                    />
                  </div>
                  <span className="text-xs text-indigo-300/60">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time statistics */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-4">Actividad por día</h3>
            <div className="flex items-end gap-2 h-32 mb-2">
              {timeStats.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-purple-400 opacity-80 transition-all duration-500"
                    style={{ height: `${(d.h / 100) * 100}px` }}
                  />
                  <span className="text-xs text-indigo-300/60">{d.label}</span>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="flex gap-4 mt-4 border-t border-white/10 pt-4">
              <div className="flex-1 text-center">
                <div className="text-xl font-bold text-white">$124K</div>
                <div className="text-xs text-indigo-300/60">Ingresos totales</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex-1 text-center">
                <div className="text-xl font-bold text-white">89%</div>
                <div className="text-xs text-indigo-300/60">Cobertura zona</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
