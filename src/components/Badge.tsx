import React from 'react';
import { CATEGORIES, CategoryId } from '../data/sections';

interface BadgeProps {
  categoryId?: CategoryId;
  children: React.ReactNode;
}

export default function Badge({ categoryId, children }: BadgeProps) {
  const color = categoryId ? CATEGORIES[categoryId].colorVar : 'var(--color-primary)';
  
  return (
    <span 
      className="inline-flex items-center px-2 py-1 rounded-full font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider relative overflow-hidden"
      style={{
        color: color,
        border: `1px solid ${color}40`,
        backgroundColor: `${color}15`
      }}
    >
      {children}
    </span>
  );
}
