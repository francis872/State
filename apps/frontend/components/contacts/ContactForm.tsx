import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createContact } from '../../services/api/contacts';

const propertyTypes = ['Casa', 'Departamento', 'Terreno', 'Local'];
const urgencies = ['Alta', 'Media', 'Baja'];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    urgency: '',
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
      await createContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        propertyType: form.propertyType,
        budget: Number(form.budget),
        urgency: form.urgency,
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', propertyType: '', budget: '', urgency: '' });
      toast.success('Contacto creado');
    } catch (err: any) {
      setError('Error al guardar el contacto');
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 rounded-2xl p-6 shadow flex flex-col gap-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-white mb-2">Nuevo contacto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block text-white mb-1">Nombre</label>
          <input id="cf-name" name="name" aria-label="Nombre" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-white mb-1">Email</label>
          <input id="cf-email" name="email" type="email" aria-label="Email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-white mb-1">Teléfono</label>
          <input id="cf-phone" name="phone" aria-label="Teléfono" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="cf-propertyType" className="block text-white mb-1">Tipo de propiedad</label>
          <select id="cf-propertyType" name="propertyType" aria-label="Tipo de propiedad" value={form.propertyType} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none">
            <option value="">Selecciona</option>
            {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className="block text-white mb-1">Presupuesto</label>
          <input id="cf-budget" name="budget" type="number" aria-label="Presupuesto" value={form.budget} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="cf-urgency" className="block text-white mb-1">Urgencia</label>
          <select id="cf-urgency" name="urgency" aria-label="Urgencia" value={form.urgency} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none">
            <option value="">Selecciona</option>
            {urgencies.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow transition-all duration-150 hover:scale-105 active:scale-95 mt-2 disabled:opacity-60">
        {loading ? 'Guardando...' : 'Guardar contacto'}
      </button>
      {success && <div className="text-green-400 font-semibold">Contacto guardado correctamente</div>}
      {error && <div className="text-red-400 font-semibold">{error}</div>}
    </form>
  );
}
