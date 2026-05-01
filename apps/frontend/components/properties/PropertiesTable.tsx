import React, { useEffect, useState } from 'react';
import { getProperties } from '../../services/api/properties';

export default function PropertiesTable() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProperties = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (err) {
      setError('Error al cargar propiedades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="bg-white/10 rounded-2xl p-6 shadow">
      <h2 className="text-lg font-semibold text-white mb-4">Lista de propiedades</h2>
      {loading ? (
        <div className="text-white">Cargando propiedades...</div>
      ) : error ? (
        <div className="text-red-400 font-semibold">{error}</div>
      ) : (
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-2 text-left">Título</th>
            <th className="py-2 text-left">Precio</th>
            <th className="py-2 text-left">Ubicación</th>
            <th className="py-2 text-left">Tipo</th>
            <th className="py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => (
            <tr key={i} className="border-b border-white/10 hover:bg-white/5">
              <td className="py-2">{p.title}</td>
              <td className="py-2">${Number(p.price).toLocaleString()}</td>
              <td className="py-2">{p.location}</td>
              <td className="py-2">{p.type}</td>
              <td className="py-2">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
