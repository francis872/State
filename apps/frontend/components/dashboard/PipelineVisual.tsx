import React from 'react';

export default function PipelineVisual() {
  return (
    <div className="w-full h-64 flex items-center justify-center bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-2xl shadow-xl">
      <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 opacity-80 flex items-center justify-center">
        <span className="text-white text-3xl font-bold tracking-wider drop-shadow-lg">PIPELINE</span>
      </div>
    </div>
  );
}
