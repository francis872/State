'use client';
import React, { useEffect, useState } from 'react';
import { getContacts, createContact } from '../../services/api/contacts';
import { FiSearch, FiPlus, FiMail, FiPhone, FiUser, FiX, FiMoreVertical } from 'react-icons/fi';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

const MOCK_FALLBACK: Contact[] = [
  { id: 1, name: 'Carlos Mejía', email: 'carlos@email.com', phone: '+57 312 456 7890' },
  { id: 2, name: 'María Torres', email: 'maria@email.com', phone: '+57 300 987 6543' },
  { id: 3, name: 'Andrés Villa', email: 'andres@email.com', phone: '+57 315 234 5678' },
  { id: 4, name: 'Laura Salazar', email: 'laura@email.com', phone: '+57 321 765 4321' },
  { id: 5, name: 'Juan Restrepo', email: 'juan@email.com', phone: '+57 316 543 2109' },
];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

const AVATAR_COLORS = [
  'from-indigo-500 to-purple-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data?.length ? data : MOCK_FALLBACK);
    } catch {
      setContacts(MOCK_FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search)
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      await createContact({ name: form.name, email: form.email });
      setForm({ name: '', email: '', phone: '' });
      setShowModal(false);
      fetchContacts();
    } catch {
      setFormError('Error al crear contacto');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0f1117] p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Contactos</h1>
            <p className="text-sm text-slate-400 mt-0.5">{contacts.length} contactos en total</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
          >
            <FiPlus size={16} /> Nuevo contacto
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#1a1d27] border border-white/5 rounded-xl px-4 py-3 max-w-md">
          <FiSearch size={16} className="text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} title="Limpiar búsqueda" className="text-slate-500 hover:text-slate-300">
              <FiX size={14} />
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-[#1a1d27] border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex flex-col gap-3 p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Contacto', 'Email', 'Teléfono', 'Acciones'].map(col => (
                    <th key={col} className="px-5 py-4 text-left text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact, i) => (
                  <tr
                    key={contact.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-xs font-bold text-white">{getInitials(contact.name)}</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <FiMail size={13} className="text-slate-600" />
                        {contact.email}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <FiPhone size={13} className="text-slate-600" />
                        {contact.phone || '—'}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        title="Opciones"
                        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-all"
                      >
                        <FiMoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-slate-500 text-sm">
                      No se encontraron contactos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="px-5 py-3 border-t border-white/5 text-xs text-slate-600">
            {filtered.length} de {contacts.length} contactos
          </div>
        </div>
      </div>

      {/* Modal crear contacto */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1d27] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">Nuevo contacto</h3>
              <button onClick={() => setShowModal(false)} title="Cerrar" className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-all">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="relative">
                <FiUser size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <FiMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <FiPhone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  placeholder="+57 300 000 0000"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              {formError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                  {formError}
                </div>
              )}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold py-2.5 rounded-xl transition-all text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
                >
                  {creating ? 'Creando...' : 'Crear contacto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface Contact {
  id: number;
  name: string;
  email: string;
  // Puedes agregar phone si el backend lo soporta
  phone?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [creating, setCreating] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err: any) {
      setError('Error al cargar contactos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      await createContact(form);
      setForm({ name: '', email: '' });
      setShowForm(false);
      fetchContacts();
    } catch (err: any) {
      setError('Error al crear contacto');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Contactos</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? 'Cancelar' : 'Crear contacto'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 flex gap-4 bg-white/10 backdrop-blur rounded-2xl p-4 shadow">
          <input
            type="text"
            placeholder="Nombre"
            className="px-3 py-2 rounded-xl bg-white/20 text-white placeholder:text-white/50 outline-none"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 rounded-xl bg-white/20 text-white placeholder:text-white/50 outline-none"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow"
            disabled={creating}
          >
            {creating ? 'Creando...' : 'Guardar'}
          </button>
        </form>
      )}
      {loading ? (
        <div className="text-white/60">Cargando contactos...</div>
      ) : error ? (
        <div className="text-red-400 font-semibold">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow bg-white/10 backdrop-blur">
          <table className="min-w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-2 px-4 font-medium">{c.name}</td>
                  <td className="py-2 px-4">{c.email}</td>
                  <td className="py-2 px-4">{c.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
