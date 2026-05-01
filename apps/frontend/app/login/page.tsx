'use client';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiHome } from 'react-icons/fi';

type Mode = 'login' | 'register';

export default function AuthPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', orgName: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.email, form.password, form.name, form.orgName || undefined);
      }
      router.replace('/dashboard');
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(msg || (mode === 'login' ? 'Credenciales incorrectas' : 'Error al crear cuenta. Intenta de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof typeof form, val: string) =>
    setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4 sm:p-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">STATE OS</span>
          </div>
          <p className="text-slate-400 text-sm">CRM inmobiliario inteligente para Colombia</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1d27] border border-white/8 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40">
          {/* Tabs */}
          <div className="flex bg-[#0f1117] rounded-xl p-1 mb-6">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all
                  ${mode === m ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {m === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name (register only) */}
            {mode === 'register' && (
              <div className="relative">
                <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  autoComplete="name"
                  value={form.name}
                  onChange={e => field('name', e.target.value)}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="correo@empresa.com"
                autoComplete="email"
                value={form.email}
                onChange={e => field('email', e.target.value)}
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Contraseña"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={form.password}
                onChange={e => field('password', e.target.value)}
                className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                tabIndex={-1}
              >
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            {/* Org name (register only, optional) */}
            {mode === 'register' && (
              <div className="relative">
                <FiHome size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Nombre de tu inmobiliaria (opcional)"
                  autoComplete="organization"
                  value={form.orgName}
                  onChange={e => field('orgName', e.target.value)}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl mt-1 shadow-lg shadow-indigo-500/20"
            >
              {loading
                ? (mode === 'login' ? 'Entrando...' : 'Creando cuenta...')
                : (mode === 'login' ? 'Entrar' : 'Crear cuenta gratis')}
            </button>
          </form>

          {mode === 'login' && (
            <p className="text-center text-xs text-slate-600 mt-5">
              ¿Sin cuenta?{' '}
              <button onClick={() => setMode('register')} className="text-indigo-400 hover:text-indigo-300 font-medium">
                Regístrate gratis →
              </button>
            </p>
          )}
          {mode === 'register' && (
            <p className="text-center text-xs text-slate-600 mt-5">
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => setMode('login')} className="text-indigo-400 hover:text-indigo-300 font-medium">
                Iniciar sesión →
              </button>
            </p>
          )}
        </div>

        <p className="text-center text-xs text-slate-700 mt-6">
          Al registrarte aceptas nuestros términos de servicio · © 2026 STATE OS
        </p>
      </div>
    </div>
  );
}
