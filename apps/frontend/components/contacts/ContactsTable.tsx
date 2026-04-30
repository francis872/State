import React, { useEffect, useState } from 'react';
import { getContacts } from '../../services/api/contacts';

export default function ContactsTable() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError('Error al cargar contactos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="bg-white/10 rounded-2xl p-6 shadow">
      <h2 className="text-lg font-semibold text-white mb-4">Lista de contactos</h2>
      {loading ? (
        <div className="text-white">Cargando contactos...</div>
      ) : error ? (
        <div className="text-red-400 font-semibold">{error}</div>
      ) : (
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-2 text-left">Nombre</th>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Teléfono</th>
            <th className="py-2 text-left">Tipo</th>
            <th className="py-2 text-left">Presupuesto</th>
            <th className="py-2 text-left">Urgencia</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={i} className="border-b border-white/10 hover:bg-white/5">
              <td className="py-2">{c.name}</td>
              <td className="py-2">{c.email}</td>
              <td className="py-2">{c.phone}</td>
              <td className="py-2">{c.propertyType}</td>
              <td className="py-2">${Number(c.budget).toLocaleString()}</td>
              <td className="py-2">{c.urgency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </table>
    </div>
  );
}
