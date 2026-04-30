// apps/frontend/components/dashboard/InsightsPanel.tsx
'use client';
import React from 'react';
import { Insight } from '../../utils/generateInsights';
import { motion, AnimatePresence } from 'framer-motion';

const priorityColors: Record<Insight['priority'], string> = {
  high: 'bg-red-100 text-red-700 border-red-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  low: 'bg-blue-100 text-blue-700 border-blue-300',
};

interface InsightsPanelProps {
  insights: Insight[];
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 60 }}
            className={`border rounded-lg px-4 py-3 shadow-sm flex items-center gap-3 ${priorityColors[insight.priority]}`}
          >
            <span className="font-semibold capitalize">{insight.message}</span>
            {insight.priority === 'high' && (
              <span className="ml-auto text-xs font-bold uppercase text-red-500">¡Prioridad!</span>
            )}
            {insight.priority === 'medium' && (
              <span className="ml-auto text-xs font-bold uppercase text-yellow-500">Atención</span>
            )}
            {insight.priority === 'low' && (
              <span className="ml-auto text-xs font-bold uppercase text-blue-500">Seguimiento</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
