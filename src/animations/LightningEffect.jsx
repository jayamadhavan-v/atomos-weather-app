import React from 'react';

export function LightningEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* CSS animation for random flash */}
      <div className="w-full h-full bg-white opacity-0 animate-[flash_5s_infinite]" />
    </div>
  );
}
