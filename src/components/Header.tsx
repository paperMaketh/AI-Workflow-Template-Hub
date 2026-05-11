import React from 'react';
import { Menu } from 'lucide-react';

export default function Header({ setIsOpen }: { setIsOpen: (val: boolean) => void }) {
  return (
    <header className="h-16 border-b border-[#334155] bg-surface/50 backdrop-blur-sm sticky top-0 md:static flex items-center px-4 lg:hidden z-30">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-on-surface-variant hover:text-on-surface focus:outline-none"
      >
        <Menu size={24} />
      </button>
      <div className="font-heading font-semibold ml-2">Workflow Hub</div>
    </header>
  );
}
