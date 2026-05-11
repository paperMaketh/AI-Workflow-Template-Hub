import React from 'react';
import CopyButton from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#0B1120] border border-[#334155]">
      <div className="flex items-center justify-between px-4 py-2 bg-surface/50 border-b border-[#334155]">
        <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">{language} file</span>
        <CopyButton text={code} />
      </div>
      <div className="p-5 overflow-x-auto">
        <pre className="font-mono text-[13px] leading-relaxed text-[#c4e7ff]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
