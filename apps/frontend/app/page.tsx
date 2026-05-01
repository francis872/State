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
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#080a12]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            STATE OS
          </span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-colors">
              Iniciar sesión
            </Link>
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-colors"
            >
              Comenzar gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 lg:w-[500px] h-80 lg:h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <FiZap size={11} /> Nuevo: AI Lead Scoring en tiempo real
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6">
            El CRM diseñado para{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block sm:inline">
              inmobiliarias colombianas
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Gestiona leads, cierra más negocios y automatiza el seguimiento. Todo en un solo lugar,
            con inteligencia artificial entrenada en el mercado colombiano.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
            >
              Comenzar gratis <FiArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:-translate-y-0.5 transition-all"
            >
              Ver demo en vivo
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-600">Sin tarjeta de crédito · Prueba gratis 14 días</p>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/8 py-12 px-6 lg:px-8 bg-[#0d0f1a]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '+120', label: 'Inmobiliarias activas' },
            { value: '+8.400', label: 'Leads gestionados' },
            { value: '3.2x', label: 'Más cierres promedio' },
            { value: '80%', label: 'Reducción en tiempos' },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-1">
              <p className="text-3xl sm:text-4xl font-black text-white">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5">Todo lo que tu inmobiliaria necesita</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
              Seis módulos integrados, construidos específicamente para el ciclo de ventas inmobiliario en Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="bg-[#1a1d27] border border-white/5 rounded-2xl p-6 lg:p-7 hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-white font-bold mb-3 text-base lg:text-lg">{f.title}</h3>
                <p className="text-sm lg:text-base text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#0d0f1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Listo en 5 minutos</h2>
            <p className="text-slate-400 text-base lg:text-lg">Sin instalaciones. Sin configuraciones complejas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12">
            {[
              { step: '01', title: 'Crea tu cuenta', desc: 'Registra tu inmobiliaria gratis. Elige tu plan cuando lo necesites.' },
              { step: '02', title: 'Importa tus leads', desc: 'Sube tu base de contactos en CSV o conecta WhatsApp Business directamente.' },
              { step: '03', title: 'Cierra negocios', desc: 'La IA prioriza tus leads más calientes. Tú solo tienes que llamar y cerrar.' },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative">
                {i < 2 && <div className="hidden sm:block absolute top-8 left-[62%] right-[-38%] h-px bg-indigo-500/25" />}
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5">
                  <span className="text-indigo-400 font-black text-xl">{item.step}</span>
                </div>
                <h3 className="text-white font-bold mb-3 text-lg">{item.title}</h3>
                <p className="text-sm lg:text-base text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-slate-400 text-base lg:text-lg">Inmobiliarias reales, resultados reales.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-[#1a1d27] border border-white/5 rounded-2xl p-6 lg:p-7 flex flex-col gap-5 hover:border-white/10 transition-colors">
                <p className="text-slate-300 text-sm lg:text-base leading-relaxed italic flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#0d0f1a]" id="precios">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Precios simples y transparentes</h2>
            <p className="text-slate-400 text-base lg:text-lg">Sin sorpresas. Cancela cuando quieras.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {PRICING.map(plan => (
              <div
                key={plan.name}
                className={`relative bg-[#1a1d27] border rounded-2xl p-7 lg:p-8 flex flex-col gap-6
                  ${plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/15 lg:-mt-4 lg:pb-11' : 'border-white/5'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-indigo-500/30">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                  <div className="flex items-end gap-1.5 mt-3">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-slate-400 text-sm pb-1.5">{plan.period}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm lg:text-base text-slate-300">
                      <FiCheck size={14} className="text-indigo-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm text-center transition-colors
                    ${plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
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
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-10 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-5">¿Listo para cerrar más negocios?</h2>
            <p className="text-slate-400 mb-10 text-base sm:text-lg leading-relaxed">
              Únete a +120 inmobiliarias colombianas que ya usan STATE OS para escalar sus ventas.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-xl shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
            >
              Comenzar gratis hoy <FiArrowRight size={18} />
            </Link>
            <p className="mt-5 text-sm text-slate-600">14 días gratis · Sin tarjeta de crédito</p>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            STATE OS
          </span>
          <div className="flex gap-8 text-sm text-slate-500">
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
