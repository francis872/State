'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiSend, FiMoreVertical, FiPaperclip, FiSmile } from 'react-icons/fi';

type Channel = 'WhatsApp' | 'Instagram' | 'Email';

interface Message {
  id: string;
  text: string;
  from: 'asesor' | 'lead';
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  channel: Channel;
  project: string;
  lastMsg: string;
  time: string;
  unread: number;
  messages: Message[];
}

const CHANNEL_BADGE: Record<Channel, string> = {
  WhatsApp: 'bg-green-500/20 text-green-400',
  Instagram: 'bg-pink-500/20 text-pink-400',
  Email: 'bg-blue-500/20 text-blue-400',
};

const CHANNEL_ICON: Record<Channel, string> = {
  WhatsApp: '💬',
  Instagram: '📸',
  Email: '✉️',
};

const AVATAR_COLORS = [
  'from-indigo-500 to-purple-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

const mockConversations: Conversation[] = [
  {
    id: '1', name: 'Carlos Mejía', channel: 'WhatsApp', project: 'El Poblado Res.',
    lastMsg: 'Cuándo podemos agendar la visita?', time: '09:42', unread: 2,
    messages: [
      { id: 'm1', text: 'Hola, vi el apartamento en El Poblado', from: 'lead', time: '09:30' },
      { id: 'm2', text: '¡Hola Carlos! Claro, con mucho gusto le cuento más del proyecto.', from: 'asesor', time: '09:32' },
      { id: 'm3', text: 'Tiene disponibilidad de 3 habitaciones?', from: 'lead', time: '09:35' },
      { id: 'm4', text: 'Sí, tenemos unidades de 2, 3 y 4 habitaciones desde $480M. ¿Le interesa conocer el proyecto?', from: 'asesor', time: '09:37' },
      { id: 'm5', text: 'Cuándo podemos agendar la visita?', from: 'lead', time: '09:42' },
    ],
  },
  {
    id: '2', name: 'María Torres', channel: 'Instagram', project: 'Torres Sabaneta',
    lastMsg: 'Perfecto, hasta el sábado 🙌', time: '08:15', unread: 0,
    messages: [
      { id: 'm1', text: 'Vi su post en instagram, me interesa el proyecto', from: 'lead', time: '07:50' },
      { id: 'm2', text: '¡Hola María! Torres Sabaneta es un proyecto espectacular, excelente ubicación.', from: 'asesor', time: '07:55' },
      { id: 'm3', text: 'Cuánto cuesta el metro cuadrado?', from: 'lead', time: '08:00' },
      { id: 'm4', text: 'Desde $4.2M/m². Le agendo una visita sin compromiso?', from: 'asesor', time: '08:05' },
      { id: 'm5', text: 'Perfecto, hasta el sábado 🙌', from: 'lead', time: '08:15' },
    ],
  },
  {
    id: '3', name: 'Andrés Villa', channel: 'WhatsApp', project: 'Castilla Res.',
    lastMsg: 'Necesito pensar un poco más...', time: 'Ayer', unread: 0,
    messages: [
      { id: 'm1', text: 'Buenas, los precios me parecen un poco altos', from: 'lead', time: '14:00' },
      { id: 'm2', text: 'Entiendo Andrés. ¿Qué rango de precio le parece cómodo? Podemos revisar opciones.', from: 'asesor', time: '14:05' },
      { id: 'm3', text: 'Algo entre 180 y 220 millones', from: 'lead', time: '14:10' },
      { id: 'm4', text: 'Tenemos unidades en ese rango! Le puedo enviar la ficha técnica ahora.', from: 'asesor', time: '14:12' },
      { id: 'm5', text: 'Necesito pensar un poco más...', from: 'lead', time: '14:30' },
    ],
  },
  {
    id: '4', name: 'Laura Salazar', channel: 'Email', project: 'Envigado Premium',
    lastMsg: 'Adjunto los documentos solicitados', time: 'Ayer', unread: 1,
    messages: [
      { id: 'm1', text: 'Buenas tardes, me interesa el penthouse de Envigado Premium', from: 'lead', time: '16:00' },
      { id: 'm2', text: 'Estimada Laura, qué buena elección. El penthouse tiene vista panorámica y terraza privada.', from: 'asesor', time: '16:15' },
      { id: 'm3', text: 'Adjunto los documentos solicitados', from: 'lead', time: '17:30' },
    ],
  },
  {
    id: '5', name: 'Juan Restrepo', channel: 'WhatsApp', project: 'El Poblado Res.',
    lastMsg: 'Ok gracias por la info', time: 'Lun', unread: 0,
    messages: [
      { id: 'm1', text: 'Hola, ¿tienen parqueadero incluido?', from: 'lead', time: '10:00' },
      { id: 'm2', text: 'Hola Juan! Sí, cada unidad incluye 1 parqueadero y depósito.', from: 'asesor', time: '10:05' },
      { id: 'm3', text: 'Ok gracias por la info', from: 'lead', time: '10:10' },
    ],
  },
];

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeId, setActiveId] = useState<string>(mockConversations[0].id);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = conversations.find(c => c.id === activeId)!;

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.project.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, active?.messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: input.trim(),
      from: 'asesor',
      time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    };
    setConversations(prev => prev.map(c =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, newMsg], lastMsg: newMsg.text, time: newMsg.time, unread: 0 }
        : c
    ));
    setInput('');
  };

  const handleSelect = (id: string) => {
    setActiveId(id);
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#0f1117] flex overflow-hidden">
      {/* Sidebar conversaciones */}
      <div className="w-80 flex-shrink-0 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-white font-bold text-lg mb-3">Inbox</h2>
          <div className="flex items-center gap-2 bg-[#1a1d27] border border-white/5 rounded-xl px-3 py-2">
            <FiSearch size={14} className="text-slate-500" />
            <input
              type="text"
              placeholder="Buscar conversación..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((conv, i) => (
            <button
              key={conv.id}
              onClick={() => handleSelect(conv.id)}
              className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all border-b border-white/5
                ${conv.id === activeId ? 'bg-indigo-600/10 border-l-2 border-l-indigo-500' : 'hover:bg-white/5'}`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <span className="text-xs font-bold text-white">{getInitials(conv.name)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-white truncate">{conv.name}</span>
                  <span className="text-xs text-slate-500 flex-shrink-0">{conv.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${CHANNEL_BADGE[conv.channel]}`}>
                    {CHANNEL_ICON[conv.channel]} {conv.channel}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 truncate">{conv.lastMsg}</span>
                  {conv.unread > 0 && (
                    <span className="w-4 h-4 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel de chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#1a1d27]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[conversations.findIndex(c => c.id === activeId) % AVATAR_COLORS.length]} flex items-center justify-center`}>
              <span className="text-xs font-bold text-white">{getInitials(active.name)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{active.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CHANNEL_BADGE[active.channel]}`}>
                  {CHANNEL_ICON[active.channel]} {active.channel}
                </span>
              </div>
              <span className="text-xs text-slate-400">{active.project}</span>
            </div>
          </div>
          <button title="Opciones" className="p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all">
            <FiMoreVertical size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 flex flex-col gap-3">
          {active.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === 'asesor' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl px-4 py-2.5
                ${msg.from === 'asesor'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-[#1a1d27] border border-white/5 text-slate-200 rounded-bl-sm'
                }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.from === 'asesor' ? 'text-indigo-200/70' : 'text-slate-500'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <form onSubmit={handleSend} className="flex items-center gap-3 bg-[#1a1d27] border border-white/5 rounded-2xl px-4 py-3">
            <button type="button" title="Adjuntar archivo" className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
              <FiPaperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
            />
            <button type="button" title="Emoji" className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0">
              <FiSmile size={18} />
            </button>
            <button
              type="submit"
              disabled={!input.trim()}
              title="Enviar mensaje"
              className="w-9 h-9 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all flex-shrink-0"
            >
              <FiSend size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
