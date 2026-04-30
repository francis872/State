import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  percent?: number;
  positive?: boolean;
}

export default function StatsCard({ title, value, percent, positive }: StatsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl p-6 flex flex-col gap-2 min-w-[180px]">
      <span className="text-sm text-white/60 font-medium">{title}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
      {percent !== undefined && (
        <span className={`text-xs font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? '+' : ''}{percent}%
        </span>
      )}
    </div>
  );
}
