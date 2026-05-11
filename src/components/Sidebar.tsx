import React from 'react';
import { NavLink } from 'react-router-dom';
import { SECTIONS, CATEGORIES, CategoryId } from '../data/sections';
import { Menu, X, ChevronRight, Search } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  
  // Group sections by category roughly
  const groupedSections = SECTIONS.reduce((acc, section) => {
    if (!acc[section.categoryId]) {
      acc[section.categoryId] = [];
    }
    acc[section.categoryId].push(section);
    return acc;
  }, {} as Record<CategoryId, typeof SECTIONS>);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-background border-r border-[#334155]
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col
      `}>
        {/* Sidebar Header & Logo */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"></path>
                </svg>
              </div>
              <span className="text-on-background font-bold text-lg leading-tight">AI Workflow<br/>Template Hub</span>
            </div>
            <button className="lg:hidden text-on-surface-variant hover:text-on-surface mt-1" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              className="block w-full pl-10 pr-3 py-2 bg-surface/50 border border-[#334155] rounded-md text-sm text-on-background placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" 
              placeholder="Search documentation..." 
              type="text"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 space-y-8 pb-6 text-sm">
          {Object.entries(groupedSections).map(([catId, items]) => {
            const category = CATEGORIES[catId as CategoryId];
            return (
              <div key={catId}>
                <h3 className="text-on-background font-semibold mb-3 flex items-center gap-2">
                  <ChevronRight size={16} className="text-on-surface-variant" />
                  {category.title}
                </h3>
                <ul className="space-y-2 pl-6">
                  {items.map(item => (
                    <li key={item.id}>
                      <NavLink
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `
                          block transition-colors
                          ${isActive 
                            ? 'text-primary font-medium border-l-2 border-primary pl-3 -ml-[13px]' 
                            : 'text-on-surface-variant hover:text-primary pl-3 -ml-[13px] border-l-2 border-transparent'
                          }
                        `}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-6 border-t border-[#334155] mt-auto space-y-4">
          <a className="flex items-center justify-between group" href="#">
            <span className="text-sm text-on-surface-variant hover:text-primary transition-colors">GitHub Repository</span>
            <svg className="w-5 h-5 opacity-50 text-on-surface-variant group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
          </a>
          <div className="flex items-center justify-between text-xs text-on-surface-variant opacity-60">
            <span>Contact Support</span>
            <span>v1.0.0-draft</span>
          </div>
        </div>
      </aside>
    </>
  );
}
