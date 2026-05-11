import React from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: 'bg-[rgba(56,189,248,0.1)] border-[#38bdf8] text-white',
    warning: 'bg-[rgba(251,191,36,0.1)] border-[#fbbf24] text-white',
    success: 'bg-[rgba(52,211,153,0.1)] border-[#34d399] text-white',
    error: 'bg-[rgba(251,113,133,0.1)] border-[#fb7185] text-white',
  };

  const icons = {
    info: <Info size={18} className="text-[#38bdf8] mt-0.5" />,
    warning: <AlertTriangle size={18} className="text-[#fbbf24] mt-0.5" />,
    success: <CheckCircle size={18} className="text-[#34d399] mt-0.5" />,
    error: <XCircle size={18} className="text-[#fb7185] mt-0.5" />,
  };

  return (
    <div className={`flex gap-3 p-4 rounded-md border-l-2 ${styles[type]}`}>
      <div className="shrink-0">{icons[type]}</div>
      <div>
        {title && <h5 className="font-semibold mb-1">{title}</h5>}
        <div className="text-sm opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
