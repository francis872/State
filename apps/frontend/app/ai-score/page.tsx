'use client';
import { useEffect, useState } from 'react';
import api from '../../services/api/api';
import { FiZap, FiRefreshCw, FiUser, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

interface Lead {
  id: string;
  score: number;
  status: string;
  budget?: number;
  urgency?: string;
  propertyType?: string;
  contact: { name: string; email?: string; channel: string };
}

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Nuevo', CONTACTED: 'Contactado', QUALIFIED: 'Calificado',
  PROPOSAL: 'Propuesta', NEGOTIATION: 'Negociación',
  CLOSED_WON: 'Ganado', CLOSED_LOST: 'Perdido',
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 70 ? 'from-emerald-500 to-green-400' :
    score >= 40 ? 'from-yellow-500 to-orange-400' : 'from-red-500 to-pink-500';
  return (
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex flex-col items-center justify-center shadow-lg`}>
      <span className="text-white font-bold text-lg leading-none">{score}</span>
      <span className="text-white/70 text-[9px]">/ 100</span>
    </div>
  );
}

export default function AIScorePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [search, setSearch] = useState('');

  const fetchLeads = () => {
    setLoading(true);
    api.get('/leads').then(r => setLeads(r.data.leads)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchLeads(); }, []);

  const recalculate = async () => {
    setRecalculating(true);
    try {
      await api.post('/leads/recalculate-scores');
      fetchLeads();
    } finally {
      setRecalculating(false);
    }
  };

  const filtered = leads.filter(l =>
    l.contact.name.toLowerCase().includes(search.toLowerCase()) ||
    (l.contact.email || '').toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => b.score - a.score);

  const hotLeads = filtered.filter(l => l.score >= 70).length;
  const warmLeads = filtered.filter(l => l.score >= 40 && l.score < 70).length;
  const coldLeads = filtered.filter(l => l.score < 40).length;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f1117] via-[#141824] to-[#0f1117] p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FiZap className="text-yellow-400" /> AI Lead Score
            </h1>
            <p className="text-white/50 mt-1">Puntuación inteligente de cada lead en tiempo real</p>
          </div>
          <button
            onClick={recalculate}
            disabled={recalculating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-60"
          >
            <FiRefreshCw size={16} className={recalculating ? 'animate-spin' : ''} />
            {recalculating ? 'Recalculando...' : 'Recalcular scores'}
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Leads Calientes', count: hotLeads, color: 'from-emerald-500 to-green-400', emoji: '🔥', desc: 'Score ≥ 70' },
            { label: 'Leads Tibios', count: warmLeads, color: 'from-yellow-500 to-orange-400', emoji: '⚡', desc: 'Score 40–69' },
            { label: 'Leads Fríos', count: coldLeads, color: 'from-red-500 to-pink-500', emoji: '❄️', desc: 'Score < 40' },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-2xl font-bold text-white">{item.count}</div>
              <div className="text-white/70 text-sm font-medium">{item.label}</div>
              <div className="text-white/35 text-xs">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Score explanation */}
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-4 flex items-start gap-3">
          <FiAlertCircle className="text-indigo-400 mt-0.5 shrink-0" size={18} />
          <div className="text-white/70 text-sm">
            <strong className="text-white">¿Cómo funciona el AI Score?</strong> Cada lead se puntúa de 0–100 basándose en:
            perfil completo (25pts), urgencia (25pts), progresión en el pipeline (25pts), canal de contacto (15pts) y engagement de mensajes (10pts).
          </div>
        </div>

        {/* Search */}
        <input
          type="search"
          placeholder="Buscar lead..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Buscar lead"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-indigo-500/60"
        />

        {/* Leads list */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 rounded-2xl bg-white/5 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-white/40 py-16">No hay leads. Crea contactos y asígnales un lead.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((lead) => (
              <div key={lead.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/8 transition-all">
                <ScoreBadge score={lead.score} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold">{lead.contact.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">{STATUS_LABELS[lead.status] || lead.status}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">{lead.contact.channel}</span>
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-white/40 flex-wrap">
                    {lead.budget && <span>💰 {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(lead.budget)}</span>}
                    {lead.urgency && <span>⏱ {lead.urgency}</span>}
                    {lead.propertyType && <span>🏠 {lead.propertyType}</span>}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${lead.score >= 70 ? 'bg-emerald-400' : lead.score >= 40 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
