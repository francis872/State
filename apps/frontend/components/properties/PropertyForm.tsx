import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createProperty } from '../../services/api/properties';

const propertyTypes = ['Casa', 'Departamento', 'Terreno', 'Local'];
const statuses = ['disponible', 'reservado', 'vendido', 'retirado'];

export default function PropertyForm() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    type: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await createProperty({
        title: form.title,
        price: Number(form.price),
        location: form.location,
        type: form.type,
        status: form.status,
      });
      setSuccess(true);
      setForm({ title: '', price: '', location: '', type: '', status: '' });
      toast.success('Propiedad creada');
    } catch (err: any) {
      setError('Error al guardar la propiedad');
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 rounded-2xl p-6 shadow flex flex-col gap-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-white mb-2">Nueva propiedad</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pf-title" className="block text-white mb-1">Título</label>
          <input id="pf-title" name="title" aria-label="Título" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="pf-price" className="block text-white mb-1">Precio</label>
          <input id="pf-price" name="price" type="number" aria-label="Precio" value={form.price} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="pf-location" className="block text-white mb-1">Ubicación</label>
          <input id="pf-location" name="location" aria-label="Ubicación" value={form.location} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="pf-type" className="block text-white mb-1">Tipo</label>
          <select id="pf-type" name="type" aria-label="Tipo de propiedad" value={form.type} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none">
            <option value="">Selecciona</option>
            {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="pf-status" className="block text-white mb-1">Estado</label>
          <select id="pf-status" name="status" aria-label="Estado" value={form.status} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none">
            <option value="">Selecciona</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow transition-all duration-150 hover:scale-105 active:scale-95 mt-2 disabled:opacity-60">
        {loading ? 'Guardando...' : 'Guardar propiedad'}
      </button>
      {success && <div className="text-green-400 font-semibold">Propiedad guardada correctamente</div>}
      {error && <div className="text-red-400 font-semibold">{error}</div>}
    </form>
  );
}
