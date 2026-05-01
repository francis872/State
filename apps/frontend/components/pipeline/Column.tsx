import React from 'react';
import DealCard from './DealCard';
import { motion } from 'framer-motion';

type Deal = {
  id: string;
  title: string;
  value: number;
  probability: number;
  stage: string;
  contactId?: string;
};

interface ColumnProps {
  stage: string;
  deals: Deal[];
  onMove?: (dealId: string, newStage: string) => void;
  moving?: boolean;
  isDragOver?: boolean;
}

export default function Column({ stage, deals, onMove, moving, isDragOver }: ColumnProps) {
  return (
    <motion.div
      layout
      className={`min-w-[280px] w-72 flex-shrink-0 p-4 flex flex-col h-full rounded-2xl shadow-xl border transition-all duration-200
        ${isDragOver ? 'bg-blue-500/10 border-blue-400' : 'bg-white/10 border-white/10 backdrop-blur'}`}
      animate={{
        backgroundColor: isDragOver ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.10)',
        borderColor: isDragOver ? '#60a5fa' : 'rgba(255,255,255,0.10)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <h3 className="text-white font-bold text-lg mb-4 tracking-wide">{stage}</h3>
      <div className="flex-1 overflow-y-auto pr-1">
        {deals.length === 0 && (
          <div className="text-white/40 text-sm italic">Sin deals</div>
        )}
        <motion.div layout>
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              {...deal}
              onMove={onMove}
              currentStage={stage}
              moving={moving}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
