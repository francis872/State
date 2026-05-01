'use client';
import React, { useState } from 'react';
import { FiCheck, FiZap, FiStar, FiBriefcase, FiExternalLink } from 'react-icons/fi';
import { createCheckoutSession, openBillingPortal, type Plan } from '../../services/api/billing';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const PLANS: {
  id: Plan;
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  cta: string;
  popular?: boolean;
}[] = [
  {
    id: 'BASIC',
    name: 'Básico',
    price: '$49.000',
    period: '/mes',
    description: 'Para asesores independientes',
    icon: <FiZap size={20} />,
    color: 'from-slate-500 to-slate-600',
    cta: 'Comenzar gratis',
    features: [
      '1 usuario',
      'Hasta 200 contactos',
      'Pipeline visual',
      'Inbox básico',
      'Soporte por email',
    ],
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: '$149.000',
    period: '/mes',
    description: 'Para inmobiliarias en crecimiento',
    icon: <FiStar size={20} />,
    color: 'from-indigo-500 to-purple-600',
    cta: 'Elegir Pro',
    popular: true,
    features: [
      'Hasta 5 usuarios',
      'Contactos ilimitados',
      'WhatsApp Business integrado',
      'AI Lead Scoring',
      'Analytics avanzado',
      'Automatización de seguimiento',
      'Soporte prioritario',
    ],
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: 'A medida',
    period: '',
    description: 'Para grandes inmobiliarias',
    icon: <FiBriefcase size={20} />,
    color: 'from-amber-500 to-orange-600',
    cta: 'Contactar ventas',
    features: [
      'Usuarios ilimitados',
      'Multi-sede',
      'API privada',
      'SSO / SAML',
      'SLA 99.9%',
      'Onboarding dedicado',
      'Soporte 24/7',
    ],
  },
];

export default function BillingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<Plan | null>(null);

  const handlePlan = async (plan: Plan) => {
    if (!user) { toast.error('Debes iniciar sesión'); return; }
    if (plan === 'ENTERPRISE') {
      window.location.href = 'mailto:sales@stateos.co?subject=Enterprise';
      return;
    }
    setLoading(plan);
    try {
      const url = await createCheckoutSession(plan);
      window.location.href = url;
    } catch {
      toast.error('Error al procesar el pago. Inténtalo de nuevo.');
    } finally {
      setLoading(null);
    }
  };

  const handlePortal = async () => {
    setLoading('BASIC');
    try {
      const url = await openBillingPortal();
      window.open(url, '_blank');
    } catch {
      toast.error('No hay suscripción activa.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0f1117] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Planes STATE OS</h1>
          <p className="text-slate-400 mt-2">Elige el plan que impulsa tu inmobiliaria</p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`relative bg-[#1a1d27] border rounded-2xl p-6 flex flex-col gap-5 transition-all
                ${plan.popular ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-white/5 hover:border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
              )}

              {/* Icon + name */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold">{plan.name}</h3>
                  <p className="text-xs text-slate-400">{plan.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1">
                <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-400 text-sm pb-1">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <FiCheck size={14} className="text-indigo-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handlePlan(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all
                  ${plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? 'Redirigiendo...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Manage subscription */}
        <div className="bg-[#1a1d27] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">Gestionar suscripción</p>
            <p className="text-sm text-slate-400">Actualiza método de pago, descarga facturas o cancela.</p>
          </div>
          <button
            onClick={handlePortal}
            disabled={loading !== null}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <FiExternalLink size={14} />
            Portal de facturación
          </button>
        </div>

        {/* FAQ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { q: '¿Puedo cambiar de plan en cualquier momento?', a: 'Sí. El cambio es inmediato y se prorratea el costo.' },
            { q: '¿Hay contrato de permanencia?', a: 'No. Puedes cancelar mes a mes sin penalización.' },
            { q: '¿Aceptan pagos colombianos?', a: 'Sí. PSE, tarjetas Visa/Mastercard y transferencias.' },
            { q: '¿El plan incluye soporte técnico?', a: 'Pro y Enterprise incluyen soporte prioritario por WhatsApp.' },
          ].map(item => (
            <div key={item.q} className="bg-[#1a1d27] border border-white/5 rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-1">{item.q}</p>
              <p className="text-sm text-slate-400">{item.a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
