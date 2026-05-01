import Link from 'next/link';
import { FiBarChart2, FiMessageSquare, FiUsers, FiZap, FiShield, FiTrendingUp, FiArrowRight, FiCheck } from 'react-icons/fi';

const FEATURES = [
  {
    icon: <FiZap size={22} />,
    title: 'AI Lead Scoring',
    desc: 'El motor de IA puntúa cada lead en tiempo real según comportamiento, perfil y mercado colombiano.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: <FiMessageSquare size={22} />,
    title: 'Inbox Omnicanal',
    desc: 'WhatsApp Business, Instagram y Email en una sola bandeja. Responde desde el CRM sin cambiar de app.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: <FiBarChart2 size={22} />,
    title: 'Analytics de Mercado',
    desc: 'Dashboards con métricas de ciudades colombianas: Medellín, Bogotá, Cali, Barranquilla y más.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: <FiUsers size={22} />,
    title: 'Pipeline Visual',
    desc: 'Kanban interactivo por etapas del ciclo inmobiliario. Nunca más pierdas un lead caliente.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: 'Automatización',
    desc: 'Seguimientos automáticos, alertas de leads estancados y tareas programadas para tu equipo.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: <FiShield size={22} />,
    title: 'Multi-tenancy Seguro',
    desc: 'Cada inmobiliaria tiene su espacio aislado. Roles por asesor, gerente y administrador.',
    color: 'from-violet-500 to-purple-700',
  },
];

const TESTIMONIALS = [
  {
    name: 'Juliana Ospina',
    role: 'Gerente Comercial — Inmobiliaria El Poblado',
    quote: 'STATE OS transformó la forma en que gestionamos leads. El scoring de IA nos ahorra 3 horas diarias de trabajo manual.',
    avatar: 'JO',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Camilo Restrepo',
    role: 'Asesor Senior — Torres Sabaneta',
    quote: 'El inbox unificado con WhatsApp es un game changer. Mis tiempos de respuesta bajaron 80% y cerré 2 negocios más este mes.',
    avatar: 'CR',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Alejandra Morales',
    role: 'Directora — Grupo Inmobiliario Laureles',
    quote: 'Por fin un CRM que entiende el mercado colombiano. El módulo de analytics con datos por ciudad es exactamente lo que necesitábamos.',
    avatar: 'AM',
    color: 'from-emerald-500 to-teal-500',
  },
];

const PRICING = [
  {
    name: 'Básico',
    price: '$49.000',
    period: '/mes',
    features: ['1 usuario', '200 contactos', 'Pipeline', 'Inbox básico'],
    cta: 'Empezar gratis',
    href: '/login',
  },
  {
    name: 'Pro',
    price: '$149.000',
    period: '/mes',
    features: ['5 usuarios', 'Contactos ilimitados', 'WhatsApp integrado', 'AI Scoring', 'Analytics avanzado'],
    cta: 'Elegir Pro',
    href: '/login',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'A medida',
    period: '',
    features: ['Usuarios ilimitados', 'Multi-sede', 'API privada', 'SLA 99.9%', 'Onboarding dedicado'],
    cta: 'Hablar con ventas',
    href: 'mailto:sales@stateos.co',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080a12] text-white overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#080a12]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            STATE OS
          </span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">
              Iniciar sesión
            </Link>
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
            >
              Comenzar gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <FiZap size={12} /> Nuevo: AI Lead Scoring en tiempo real
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            El CRM diseñado para{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              inmobiliarias colombianas
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Gestiona leads, cierra más negocios y automatiza el seguimiento. Todo en un solo lugar,
            con inteligencia artificial entrenada en el mercado colombiano.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            >
              Comenzar gratis <FiArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
            >
              Ver demo en vivo
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-600">Sin tarjeta de crédito · Prueba gratis 14 días</p>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '+120', label: 'Inmobiliarias activas' },
            { value: '+8.400', label: 'Leads gestionados' },
            { value: '3.2x', label: 'Más cierres promedio' },
            { value: '80%', label: 'Reducción en tiempos' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Todo lo que tu inmobiliaria necesita</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Seis módulos integrados, construidos específicamente para el ciclo de ventas inmobiliario en Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="bg-[#1a1d27] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4`}>
                  {f.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0d0f1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-4">Listo en 5 minutos</h2>
            <p className="text-slate-400">Sin instalaciones. Sin configuraciones complejas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Crea tu cuenta', desc: 'Registra tu inmobiliaria gratis. Elige tu plan cuando lo necesites.' },
              { step: '02', title: 'Importa tus leads', desc: 'Sube tu base de contactos en CSV o conecta WhatsApp Business directamente.' },
              { step: '03', title: 'Cierra negocios', desc: 'La IA prioriza tus leads más calientes. Tú solo tienes que llamar y cerrar.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-400 font-black text-lg">{item.step}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-4">Lo que dicen nuestros clientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-[#1a1d27] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                    <span className="text-xs font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0d0f1a]" id="precios">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-4">Precios simples y transparentes</h2>
            <p className="text-slate-400">Sin sorpresas. Cancela cuando quieras.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(plan => (
              <div
                key={plan.name}
                className={`relative bg-[#1a1d27] border rounded-2xl p-6 flex flex-col gap-5
                  ${plan.popular ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-white/5'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-sm pb-1">{plan.period}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <FiCheck size={13} className="text-indigo-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all
                    ${plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-12">
            <h2 className="text-3xl font-black mb-4">¿Listo para cerrar más negocios?</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Únete a +120 inmobiliarias colombianas que ya usan STATE OS para escalar sus ventas.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-lg shadow-indigo-500/30"
            >
              Comenzar gratis hoy <FiArrowRight size={18} />
            </Link>
            <p className="mt-4 text-sm text-slate-600">14 días gratis · Sin tarjeta de crédito</p>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            STATE OS
          </span>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#precios" className="hover:text-white transition-colors">Precios</Link>
            <Link href="mailto:hola@stateos.co" className="hover:text-white transition-colors">Contacto</Link>
            <Link href="/login" className="hover:text-white transition-colors">Ingresar</Link>
          </div>
          <p className="text-sm text-slate-600">© 2026 STATE OS · Medellín, Colombia</p>
        </div>
      </footer>

    </div>
  );
}
