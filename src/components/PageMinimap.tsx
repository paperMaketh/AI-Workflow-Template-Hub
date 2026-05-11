import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Section {
  id: string;
  title: string;
  level: number;
}

export default function PageMinimap() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    // Collect all h2 and h3 elements on page load/render
    const scanSections = () => {
      const headings = Array.from(document.querySelectorAll('main h2, main h3'));
      const newSections: Section[] = headings.map(heading => {
        // Ensure each heading has an ID
        if (!heading.id) {
          heading.id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || Math.random().toString(36).substring(7);
        }
        return {
          id: heading.id,
          title: heading.textContent || '',
          level: heading.tagName === 'H2' ? 2 : 3,
        };
      });
      setSections(newSections);
    };

    // Need a slight delay to ensure DOM is fully painted, 
    // especially with dynamic React routing/rendering
    const timeoutId = setTimeout(scanSections, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible sections
        const visibleEntries = entries.filter(e => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Simplistic approach: take the first intersecting one
          // Better: highest ratio or closest to top
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.5, 1] }
    );

    const observeHeadings = () => {
      document.querySelectorAll('main h2, main h3').forEach(h => observer.observe(h));
    };

    setTimeout(observeHeadings, 150);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [location.pathname]);

  if (sections.length === 0) return null;

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="hidden xl:flex flex-col w-[120px] shrink-0 sticky top-[88px] self-start max-h-[calc(100vh-120px)] overflow-y-auto mt-8 pr-4 scrollbar-none">
      <div className="text-[10px] font-mono text-on-surface-variant/50 uppercase tracking-widest mb-4 pl-3">
        Minimap
      </div>
      <div className="flex flex-col gap-[3px] relative border-l border-[#334155]/50 pl-3">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const isH2 = section.level === 2;
          
          return (
            <div 
              key={`${section.id}-${index}`}
              onClick={() => handleScroll(section.id)}
              className={`
                group relative flex items-center cursor-pointer 
                transition-colors duration-200
                ${isH2 ? 'h-3' : 'h-2'}
              `}
              title={section.title}
            >
              {/* The "bar" indicator */}
              <div 
                className={`
                  rounded-full transition-colors duration-200 h-full
                  ${isH2 ? 'w-4' : 'w-2'}
                  ${isActive 
                    ? 'bg-primary' 
                    : 'bg-surface-high group-hover:bg-primary/50'
                  }
                `} 
              />
              
              {/* Hover text / Active text tooltip-style */}
              <span className={`
                absolute left-6 text-[10px] font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]
                transition-opacity duration-200 origin-left
                ${isActive ? 'text-primary opacity-100' : 'text-on-surface-variant opacity-0 group-hover:opacity-100'}
              `}>
                {section.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
