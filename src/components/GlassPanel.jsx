import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassPanel({ children, className, ...props }) {
  return (
    <div className={twMerge(clsx('glass-panel p-8', className))} {...props}>
      {children}
    </div>
  );
}
