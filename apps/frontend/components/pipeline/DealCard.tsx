import React from 'react';
import { motion } from 'framer-motion';

interface DealCardProps {
  id?: number;
  title: string;
  value: number;
  probability: number;
  currentStage?: string;
  onMove?: (dealId: number, newStage: string) => void;
  moving?: boolean;
}

const stages = ['Lead', 'Contacto', 'Visita', 'Negociación', 'Cerrado'];

export default function DealCard({ id, title, value, probability, currentStage, onMove, moving }: DealCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(80,80,200,0.18)', y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={`bg-white/10 backdrop-blur rounded-2xl shadow-xl p-4 mb-4 cursor-pointer border border-white/10 transition-all duration-200 ${moving ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <div className="font-semibold text-white text-base mb-1 truncate">{title}</div>
      <div className="flex items-center justify-between text-sm text-white/80 mb-2">
        <span className="font-mono">${value.toLocaleString()}</span>
        <span className="text-xs px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold ml-2">
          {probability}%
        </span>
      </div>
      {onMove && id !== undefined && currentStage && (
        <div className="flex gap-1 mt-2">
          {stages.filter(s => s !== currentStage).map((s) => (
            <button
              key={s}
              className="text-xs px-2 py-1 rounded bg-white/20 text-white hover:bg-blue-500/40 transition-all duration-150 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400"
              onClick={() => onMove(id, s)}
              disabled={moving}
              title={`Mover a ${s}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
