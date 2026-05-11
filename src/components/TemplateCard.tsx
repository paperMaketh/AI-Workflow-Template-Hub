import React from 'react';
import CodeBlock from './CodeBlock';

interface TemplateCardProps {
  title: string;
  description?: string;
  content: string;
  tags?: string[];
  context?: string;
}

export default function TemplateCard({ title, description, content, tags = [], context }: TemplateCardProps) {
  return (
    <div className="bg-surface border border-[#334155] rounded-lg overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-0 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-on-background">{title}</h3>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20 tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {context && (
            <p className="text-sm text-on-surface-variant font-mono opacity-80 mb-2">
              TARGET: {context}
            </p>
          )}
          {description && (
            <p className="text-sm text-on-surface-variant">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Card Body (Code) */}
      <div className="p-6 space-y-6">
        <CodeBlock code={content.trim()} language="markdown" />
      </div>
    </div>
  );
}
