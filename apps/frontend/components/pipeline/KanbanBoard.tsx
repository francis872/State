'use client';
import React, { useEffect, useState } from 'react';
import { stages } from '../../utils/mockData';
import Column from './Column';
import { getDeals, createDeal, updateDeal } from '../../services/api/pipeline';
import { AnimatePresence, motion } from 'framer-motion';
import SkeletonCard from './SkeletonCard';

type Deal = {
  id: string;
  title: string;
  value: number;
  probability: number;
  stage: string;
  contactId?: string;
};

export default function KanbanBoard() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', value: '', probability: '', stage: stages[0], contactId: '' });
  const [moving, setMoving] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDeals();
      setDeals(data);
    } catch (err) {
      setError('Error al cargar deals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Drag & drop preparado (sin librería real, solo click)
  const handleMove = async (dealId: string, newStage: string) => {
    setMoving(true);
    try {
      await updateDeal(dealId, { stage: newStage });
      fetchDeals();
    } catch {
      setError('Error al mover deal');
    } finally {
      setMoving(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      await createDeal({
        title: form.title,
        value: Number(form.value),
        probability: Number(form.probability),
        stage: form.stage,
        contactId: form.contactId || undefined,
      });
      setForm({ title: '', value: '', probability: '', stage: stages[0], contactId: '' });
      setShowForm(false);
      fetchDeals();
    } catch {
      setError('Error al crear deal');
    } finally {
      setCreating(false);
    }
  };

  // Agrupar deals por stage
  const columns = stages.map((stage) => ({
    stage,
    deals: deals.filter((d) => d.stage === stage),
  }));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white">Kanban</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow transition-all duration-150 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? 'Cancelar' : 'Crear deal'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 flex flex-wrap gap-4 bg-white/10 backdrop-blur rounded-2xl p-4 shadow">
          <input
            type="text"
            placeholder="Título"
            className="px-3 py-2 rounded-xl bg-white/20 text-white placeholder:text-white/50 outline-none"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            required
          />
          <input
            type="number"
            placeholder="Valor"
            className="px-3 py-2 rounded-xl bg-white/20 text-white placeholder:text-white/50 outline-none"
            value={form.value}
            onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
            required
          />
          <input
            type="number"
            placeholder="Probabilidad (%)"
            className="px-3 py-2 rounded-xl bg-white/20 text-white placeholder:text-white/50 outline-none"
            value={form.probability}
            onChange={e => setForm(f => ({ ...f, probability: e.target.value }))}
            required
          />
          <select
            aria-label="Etapa"
            className="px-3 py-2 rounded-xl bg-white/20 text-white outline-none"
            value={form.stage}
            onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}
          >
            {stages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow transition-all duration-150 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-green-400"
            disabled={creating}
          >
            {creating ? 'Creando...' : 'Guardar'}
          </button>
        </form>
      )}
      {loading ? (
        <div className="flex gap-6 overflow-x-auto pb-2 min-h-[420px]">
          {stages.map((stage) => (
            <motion.div key={stage} layout className="min-w-[280px] w-72 flex-shrink-0">
              {[...Array(2)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-400 font-semibold">{error}</div>
      ) : (
        <motion.div layout className="flex gap-6 overflow-x-auto pb-2 min-h-[420px]">
          <AnimatePresence initial={false}>
            {columns.map((col) => (
              <motion.div layout key={col.stage} className="min-w-[280px] w-72 flex-shrink-0">
                <Column
                  stage={col.stage}
                  deals={col.deals}
                  onMove={handleMove}
                  moving={moving}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
