'use client';
import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiBell, FiLock, FiShield, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

type Tab = 'perfil' | 'notificaciones' | 'seguridad';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'perfil', label: 'Perfil', icon: <FiUser size={16} /> },
  { id: 'notificaciones', label: 'Notificaciones', icon: <FiBell size={16} /> },
  { id: 'seguridad', label: 'Seguridad', icon: <FiShield size={16} /> },
];

function Toggle({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-slate-300">{label}</span>
      <button
        onClick={onToggle}
        title={`Activar/desactivar: ${label}`}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${enabled ? 'bg-indigo-600' : 'bg-white/10'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('perfil');
  const [saved, setSaved] = useState(false);

  // Perfil
  const [profile, setProfile] = useState({
    name: user?.name || 'Asesor',
    email: user?.email || '',
    phone: '+57 300 000 0000',
    company: 'Inmobiliaria STATE',
    role: 'Asesor comercial',
  });

  // Notificaciones
  const [notifs, setNotifs] = useState({
    leads_nuevos: true,
    mensajes: true,
    insights: true,
    cierres: true,
    email_diario: false,
    whatsapp_alerts: true,
  });

  // Seguridad
  const [showPass, setShowPass] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passError, setPassError] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePass = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    if (passwords.new !== passwords.confirm) {
      setPassError('Las contraseñas no coinciden');
      return;
    }
    if (passwords.new.length < 6) {
      setPassError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setSaved(true);
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs(n => ({ ...n, [key]: !n[key] }));
  };

  return (
    <div className="w-full min-h-screen bg-[#0f1117] p-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-bold text-white">Configuración</h1>
          <p className="text-sm text-slate-400 mt-0.5">Gestiona tu cuenta y preferencias</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a1d27] border border-white/5 rounded-2xl p-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Perfil */}
        {activeTab === 'perfil' && (
          <div className="bg-[#1a1d27] border border-white/5 rounded-2xl p-6">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {profile.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold">{profile.name}</p>
                <p className="text-sm text-slate-400">{profile.role}</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Nombre completo', icon: <FiUser size={14} />, type: 'text' },
                  { key: 'email', label: 'Email', icon: <FiMail size={14} />, type: 'email' },
                  { key: 'phone', label: 'Teléfono', icon: <FiPhone size={14} />, type: 'tel' },
                  { key: 'company', label: 'Empresa', icon: <FiBriefcase size={14} />, type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label htmlFor={`profile-${field.key}`} className="block text-xs text-slate-400 font-medium mb-1.5">{field.label}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{field.icon}</span>
                      <input
                        id={`profile-${field.key}`}
                        type={field.type}
                        value={profile[field.key as keyof typeof profile]}
                        onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                        className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-medium mb-1.5">Rol</label>
                <select
                  value={profile.role}
                  onChange={e => setProfile(p => ({ ...p, role: e.target.value }))}
                  aria-label="Seleccionar rol"
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 transition-colors"
                >
                  <option>Asesor comercial</option>
                  <option>Gerente comercial</option>
                  <option>Administrador</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2">
                {saved && (
                  <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                    <FiCheck size={14} /> Cambios guardados
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab: Notificaciones */}
        {activeTab === 'notificaciones' && (
          <div className="bg-[#1a1d27] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">Alertas del CRM</h3>
            <p className="text-xs text-slate-500 mb-5">Configura qué notificaciones quieres recibir</p>
            <Toggle enabled={notifs.leads_nuevos} onToggle={() => toggleNotif('leads_nuevos')} label="Nuevo lead asignado" />
            <Toggle enabled={notifs.mensajes} onToggle={() => toggleNotif('mensajes')} label="Mensaje entrante de lead" />
            <Toggle enabled={notifs.insights} onToggle={() => toggleNotif('insights')} label="Insights automáticos (leads estancados, hot leads)" />
            <Toggle enabled={notifs.cierres} onToggle={() => toggleNotif('cierres')} label="Cierre de negocio registrado" />

            <h3 className="text-white font-semibold mb-1 mt-6">Canales de notificación</h3>
            <p className="text-xs text-slate-500 mb-5">Elige cómo recibir las alertas</p>
            <Toggle enabled={notifs.email_diario} onToggle={() => toggleNotif('email_diario')} label="Resumen diario por email" />
            <Toggle enabled={notifs.whatsapp_alerts} onToggle={() => toggleNotif('whatsapp_alerts')} label="Alertas por WhatsApp" />

            <div className="mt-4 pt-4 border-t border-white/5 text-xs text-slate-500">
              Los cambios se guardan automáticamente.
            </div>
          </div>
        )}

        {/* Tab: Seguridad */}
        {activeTab === 'seguridad' && (
          <div className="bg-[#1a1d27] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">Cambiar contraseña</h3>
            <p className="text-xs text-slate-500 mb-5">Mínimo 6 caracteres</p>

            <form onSubmit={handleChangePass} className="flex flex-col gap-4">
              {[
                { key: 'current', label: 'Contraseña actual' },
                { key: 'new', label: 'Nueva contraseña' },
                { key: 'confirm', label: 'Confirmar nueva contraseña' },
              ].map(field => (
                <div key={field.key}>
                  <label htmlFor={`pass-${field.key}`} className="block text-xs text-slate-400 font-medium mb-1.5">{field.label}</label>
                  <div className="relative">
                    <FiLock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      id={`pass-${field.key}`}
                      type={showPass ? 'text' : 'password'}
                      value={passwords[field.key as keyof typeof passwords]}
                      onChange={e => setPasswords(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 transition-colors"
                      required
                      minLength={6}
                    />
                    {field.key === 'new' && (
                      <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        title={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPass ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {passError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                  {passError}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                {saved && (
                  <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                    <FiCheck size={14} /> Contraseña actualizada
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                  Actualizar contraseña
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5">
              <h3 className="text-white font-semibold mb-3">Zona de peligro</h3>
              <button className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
                Cerrar todas las sesiones activas
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
