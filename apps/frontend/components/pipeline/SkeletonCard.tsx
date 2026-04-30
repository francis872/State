import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl p-4 mb-4 animate-pulse flex flex-col gap-2 min-h-[80px]">
      <div className="h-4 w-2/3 bg-white/20 rounded mb-2" />
      <div className="h-3 w-1/2 bg-white/20 rounded" />
      <div className="h-3 w-1/4 bg-white/20 rounded mt-2" />
    </div>
  );
}
