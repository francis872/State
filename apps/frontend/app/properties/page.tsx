'use client';
import { useEffect, useState } from 'react';
import { getProperties, createProperty, deleteProperty, matchLeadToProperties, Property } from '../../services/api/properties';
import { FiHome, FiPlus, FiMapPin, FiDollarSign, FiTrash2, FiZap } from 'react-icons/fi';

const PROPERTY_TYPES = ['APARTAMENTO', 'CASA', 'OFICINA', 'LOCAL', 'LOTE', 'FINCA'];
const PROPERTY_STATUS = ['AVAILABLE', 'RESERVED', 'SOLD', 'RENTED'];
const STATUS_LABELS: Record<string, string> = { AVAILABLE: 'Disponible', RESERVED: 'Reservada', SOLD: 'Vendida', RENTED: 'Arrendada' };
const STATUS_COLORS: Record<string, string> = { AVAILABLE: 'bg-emerald-500/20 text-emerald-300', RESERVED: 'bg-yellow-500/20 text-yellow-300', SOLD: 'bg-blue-500/20 text-blue-300', RENTED: 'bg-purple-500/20 text-purple-300' };

function fmt(n: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
}

const emptyForm = { title: '', price: 0, location: '', type: 'APARTAMENTO', status: 'AVAILABLE', bedrooms: undefined as number | undefined, bathrooms: undefined as number | undefined, area: undefined as number | undefined, description: '' };

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [matchLeadId, setMatchLeadId] = useState('');
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const [matching, setMatching] = useState(false);

  const load = () => { setLoading(true); getProperties().then(setProperties).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createProperty({ ...form, price: Number(form.price), bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined, bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined, area: form.area ? Number(form.area) : undefined });
      setForm({ ...emptyForm });
      setShowForm(false);
      load();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar propiedad?')) return;
    await deleteProperty(id);
    load();
  };

  const handleMatch = async () => {
    if (!matchLeadId.trim()) return;
    setMatching(true);
    try {
      const results = await matchLeadToProperties(matchLeadId.trim());
      setMatchResults(results);
    } catch { setMatchResults([]); }
    finally { setMatching(false); }
  };

  const filtered = properties
    .filter(p => filterStatus === 'ALL' || p.status === filterStatus)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f1117] via-[#141824] to-[#0f1117] p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3"><FiHome /> Propiedades</h1>
            <p className="text-white/50 mt-1">{properties.length} propiedades en inventario</p>
          </div>
          <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold transition-all">
            <FiPlus size={18} /> Nueva propiedad
          </button>
        </div>

        {/* Property Matcher — unicorn feature */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <FiZap className="text-yellow-400" size={18} />
            <span className="text-white font-bold">Property Matcher IA</span>
            <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">Exclusivo STATE OS</span>
          </div>
          <p className="text-white/50 text-sm mb-3">Ingresa el ID de un lead y el sistema auto-matchea las propiedades más compatibles según presupuesto, tipo y ubicación.</p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Lead ID..."
              value={matchLeadId}
              onChange={e => setMatchLeadId(e.target.value)}
              aria-label="Lead ID para match"
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-yellow-500/60 text-sm"
            />
            <button onClick={handleMatch} disabled={matching} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-60 text-sm">
              {matching ? 'Buscando...' : 'Matchear'}
            </button>
          </div>
          {matchResults.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {matchResults.map((m: any, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 text-sm">
                  <span className="text-yellow-400 font-bold w-8">{Math.round(m.score)}%</span>
                  <span className="text-white">{m.property.title}</span>
                  <span className="text-white/40 ml-auto">{m.property.location} · {fmt(m.property.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add form */}
        {showForm && (
          <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 className="col-span-full text-white font-bold text-lg">Nueva Propiedad</h2>
            {[
              { label: 'Título', key: 'title', type: 'text' },
              { label: 'Precio (COP)', key: 'price', type: 'number' },
              { label: 'Ubicación', key: 'location', type: 'text' },
              { label: 'Área (m²)', key: 'area', type: 'number' },
              { label: 'Habitaciones', key: 'bedrooms', type: 'number' },
              { label: 'Baños', key: 'bathrooms', type: 'number' },
            ].map(f => (
              <div key={f.key}>
                <label htmlFor={`pf-${f.key}`} className="block text-white/70 text-sm mb-1">{f.label}</label>
                <input
                  id={`pf-${f.key}`}
                  type={f.type}
                  aria-label={f.label}
                  required={['title', 'price', 'location'].includes(f.key)}
                  value={(form as any)[f.key] || ''}
                  onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white outline-none focus:border-indigo-500/60"
                />
              </div>
            ))}
            <div>
              <label htmlFor="pf-type" className="block text-white/70 text-sm mb-1">Tipo</label>
              <select id="pf-type" aria-label="Tipo de propiedad" value={form.type} onChange={e => setForm(v => ({ ...v, type: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white outline-none">
                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="pf-status" className="block text-white/70 text-sm mb-1">Estado</label>
              <select id="pf-status" aria-label="Estado de propiedad" value={form.status} onChange={e => setForm(v => ({ ...v, status: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white outline-none">
                {PROPERTY_STATUS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div className="col-span-full flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all">Cancelar</button>
              <button type="submit" disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all disabled:opacity-60">{saving ? 'Guardando...' : 'Guardar'}</button>
            </div>
          </form>
        )}

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <input type="search" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Buscar propiedad" className="flex-1 min-w-48 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none" />
          <div className="flex gap-2">
            {['ALL', ...PROPERTY_STATUS].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${filterStatus === s ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                {s === 'ALL' ? 'Todas' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-white/40 py-16">
            {properties.length === 0 ? 'Agrega tu primera propiedad al inventario.' : 'No hay propiedades con ese filtro.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/8 transition-all group">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-semibold leading-tight">{p.title}</h3>
                  <button onClick={() => handleDelete(p.id)} aria-label="Eliminar propiedad" className="text-white/30 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100">
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-white/50 text-sm">
                  <FiMapPin size={13} /> {p.location}
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <FiDollarSign size={14} /> {fmt(p.price)}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[p.status] || 'bg-white/10 text-white/60'}`}>{STATUS_LABELS[p.status] || p.status}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">{p.type}</span>
                  {p.bedrooms && <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">{p.bedrooms} hab.</span>}
                  {p.area && <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">{p.area}m²</span>}
                </div>
                {p.description && <p className="text-white/40 text-xs line-clamp-2">{p.description}</p>}
                <div className="text-white/25 text-xs font-mono mt-auto">ID: {p.id.slice(0, 8)}…</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
