'use client';
import { useEffect, useState } from 'react';
import { getDashboardStats, getForecast, getActivity, DashboardStats, ForecastData } from '../../services/api/stats';
import { useAuth } from '../../context/AuthContext';
import { FiUsers, FiTrendingUp, FiDollarSign, FiMessageCircle, FiStar, FiTarget, FiZap, FiActivity } from 'react-icons/fi';

const ACTIVITY_ICONS: Record<string, string> = {
  LEAD_CREATED: '👤', LEAD_QUALIFIED: '✅', DEAL_CREATED: '🤝',
  DEAL_MOVED: '➡️', DEAL_CLOSED: '🏆', MESSAGE_RECEIVED: '💬',
  CONTACT_CREATED: '➕', PROPERTY_ADDED: '🏠', MATCH_FOUND: '⚡',
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  return `hace ${Math.floor(hrs / 24)}d`;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getForecast(), getActivity()])
      .then(([s, f, a]) => { setStats(s); setForecast(f); setActivities(a); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const kpis = stats ? [
    { label: 'Contactos', value: stats.totalContacts, icon: <FiUsers size={22} />, color: 'from-blue-500 to-cyan-400', sub: `${stats.totalLeads} leads activos` },
    { label: 'Pipeline', value: fmt(stats.pipelineValue), icon: <FiTrendingUp size={22} />, color: 'from-purple-500 to-indigo-500', sub: `${stats.activeDeals} negocios` },
    { label: 'Forecast', value: fmt(stats.weightedForecast), icon: <FiDollarSign size={22} />, color: 'from-emerald-500 to-teal-400', sub: 'Ingreso ponderado' },
    { label: 'Conversión', value: `${stats.conversionRate}%`, icon: <FiTarget size={22} />, color: 'from-orange-500 to-pink-500', sub: 'Tasa de cierre' },
    { label: 'AI Score', value: `${stats.avgScore}/100`, icon: <FiStar size={22} />, color: 'from-yellow-500 to-orange-400', sub: 'Score promedio leads' },
    { label: 'Mensajes', value: stats.newMessagesThisWeek, icon: <FiMessageCircle size={22} />, color: 'from-pink-500 to-rose-500', sub: 'Esta semana' },
  ] : [];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f1117] via-[#141824] to-[#0f1117] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-5 sm:gap-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Bienvenido{user?.name ? `, ${user.name}` : ''} 👋
            </h1>
            <p className="text-white/50 mt-1">
              {user?.org?.name || 'STATE OS'} · Plan <span className="text-indigo-400 font-semibold">{user?.org?.plan || 'BASIC'}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
            <FiZap className="text-yellow-400" size={16} />
            <span className="text-white/70 text-sm">Live Dashboard</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* KPI Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-all group">
                <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${kpi.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white mb-3`}>
                  {kpi.icon}
                </div>
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <div className="text-white/60 text-sm font-medium">{kpi.label}</div>
                <div className="text-white/35 text-xs mt-0.5">{kpi.sub}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forecast */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FiDollarSign className="text-emerald-400" size={20} />
              <h2 className="text-white font-bold text-lg">Proyección de Ingresos</h2>
            </div>
            {forecast ? (
              <div className="flex gap-4">
                {[
                  { label: '30 días', value: forecast.forecast30, color: 'bg-blue-500' },
                  { label: '60 días', value: forecast.forecast60, color: 'bg-purple-500' },
                  { label: '90 días', value: forecast.forecast90, color: 'bg-emerald-500' },
                ].map((item) => {
                  const pct = forecast.forecast90 > 0 ? Math.round((item.value / forecast.forecast90) * 100) : 0;
                  return (
                    <div key={item.label} className="flex-1 bg-white/5 rounded-xl p-4">
                      <div className="text-white/50 text-xs font-medium mb-2">{item.label}</div>
                      <div className="text-white font-bold text-xl mb-3">{fmt(item.value)}</div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-white/40 text-sm">Conectando con base de datos...</div>
            )}
            {stats && (
              <div className="mt-4 pt-4 border-t border-white/10 flex gap-6 text-sm flex-wrap">
                <div><span className="text-white/40">Pipeline total: </span><span className="text-white font-medium">{fmt(stats.pipelineValue)}</span></div>
                <div><span className="text-white/40">Ganado: </span><span className="text-emerald-400 font-medium">{fmt(stats.wonValue)}</span></div>
              </div>
            )}
          </div>

          {/* Activity Feed */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <FiActivity className="text-indigo-400" size={20} />
              <h2 className="text-white font-bold text-lg">Actividad</h2>
            </div>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-72">
              {activities.length === 0 ? (
                <div className="text-white/30 text-sm text-center mt-8">Sin actividad reciente</div>
              ) : (
                activities.slice(0, 10).map((act: any) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">{ACTIVITY_ICONS[act.type] || '📌'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white/80 text-sm leading-tight">{act.description}</div>
                      <div className="text-white/30 text-xs mt-0.5">{timeAgo(act.createdAt)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pipeline Stage Breakdown */}
        {stats?.stageBreakdown && Object.keys(stats.stageBreakdown).length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FiTrendingUp className="text-purple-400" size={20} />
              <h2 className="text-white font-bold text-lg">Pipeline por Etapa</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(stats.stageBreakdown).map(([stage, data]) => (
                <div key={stage} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-1 min-w-36">
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{stage.replace(/_/g, ' ')}</div>
                  <div className="text-white font-bold">{fmt(data.value)}</div>
                  <div className="text-white/40 text-xs">{data.count} negocio{data.count !== 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
