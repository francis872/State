import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createDeal } from '../../services/api/pipeline';
import { getContacts } from '../../services/api/contacts';

const stages = ['lead', 'contacto', 'negociacion', 'cerrado'];

export default function DealForm() {
  const [form, setForm] = useState({
    value: '',
    probability: '',
    stage: '',
    closeDate: '',
    contactId: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [contacts, setContacts] = useState<any[]>([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [contactsError, setContactsError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      setContactsLoading(true);
      setContactsError('');
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        setContactsError('Error al cargar contactos');
      } finally {
        setContactsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await createDeal({
        value: Number(form.value),
        probability: Number(form.probability),
        stage: form.stage,
        closeDate: form.closeDate,
        contactId: Number(form.contactId),
      });
      setSuccess(true);
      setForm({ value: '', probability: '', stage: '', closeDate: '', contactId: '' });
      toast.success('Deal creado');
    } catch (err: any) {
      setError('Error al guardar el deal');
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 rounded-2xl p-6 shadow flex flex-col gap-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-white mb-2">Nuevo deal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="df-value" className="block text-white mb-1">Valor</label>
          <input id="df-value" name="value" type="number" aria-label="Valor" value={form.value} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="df-probability" className="block text-white mb-1">Probabilidad (%)</label>
          <input id="df-probability" name="probability" type="number" min="0" max="100" aria-label="Probabilidad" value={form.probability} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="df-stage" className="block text-white mb-1">Etapa</label>
          <select id="df-stage" name="stage" aria-label="Etapa" value={form.stage} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none">
            <option value="">Selecciona</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="df-closeDate" className="block text-white mb-1">Fecha estimada de cierre</label>
          <input id="df-closeDate" name="closeDate" type="date" aria-label="Fecha estimada de cierre" value={form.closeDate} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none" />
        </div>
        <div>
          <label htmlFor="df-contactId" className="block text-white mb-1">Contacto asociado</label>
          <select id="df-contactId" name="contactId" aria-label="Contacto asociado" value={form.contactId} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl bg-white/20 text-white outline-none">
            <option value="">Selecciona</option>
            {contactsLoading ? (
              <option disabled>Cargando...</option>
            ) : contactsError ? (
              <option disabled>{contactsError}</option>
            ) : (
              contacts.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)
            )}
          </select>
        </div>
      </div>
      <button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow transition-all duration-150 hover:scale-105 active:scale-95 mt-2 disabled:opacity-60">
        {loading ? 'Guardando...' : 'Guardar deal'}
      </button>
      {success && <div className="text-green-400 font-semibold">Deal guardado correctamente</div>}
      {error && <div className="text-red-400 font-semibold">{error}</div>}
    </form>
  );
}
