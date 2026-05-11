import React from 'react';
import { CheckSquare } from 'lucide-react';

interface ChecklistProps {
  title: string;
  items: string[];
}

export default function Checklist({ title, items }: ChecklistProps) {
  return (
    <div className="bg-surface border border-[#334155] rounded-lg overflow-hidden">
      <div className="bg-surface-low border-b border-[#334155] p-3 text-sm font-semibold font-heading">
        {title}
      </div>
      <ul className="p-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 p-2 text-sm text-on-surface hover:bg-surface-highest rounded-sm transition-colors">
            <CheckSquare size={16} className="text-secondary mt-0.5 shrink-0" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
