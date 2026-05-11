import React from 'react';
import Callout from '../components/Callout';
import Checklist from '../components/Checklist';
import PageHeader from '../components/PageHeader';
import { PRE_PROMPT_CHECKLIST } from '../data/checklists';

export default function QuickStart() { 
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      <PageHeader 
        categoryId="core"
        title="Quick Start Guide"
        description="This is the fast process to follow before asking an AI agent to build anything."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-12">
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">7-Step Daily Workflow</h2>
            <div className="space-y-4">
              {[
                "Brain dump the idea",
                "Triage the task",
                "Choose direct, guided, or spec-first",
                "Fill the right template",
                "Give the final prompt to the project agent",
                "Review the output",
                "Commit only after a clean milestone"
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-surface border border-[#334155]">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded bg-surface-highest text-primary font-mono text-sm font-bold border border-[#3e484f]">
                    {idx + 1}
                  </span>
                  <p className="text-on-surface mt-1 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Task Level Rule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface p-5 rounded-lg border border-l-4 border-[#334155] border-l-[#34d399]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#34d399] mb-2">Small Fix</h3>
                <p className="font-semibold text-lg flex items-center">
                  Direct prompt
                </p>
              </div>
              <div className="bg-surface p-5 rounded-lg border border-l-4 border-[#334155] border-l-[#fbbf24]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#fbbf24] mb-2">Medium Feature</h3>
                <p className="font-semibold text-lg flex items-center">
                  Short plan first
                </p>
              </div>
              <div className="bg-surface p-5 rounded-lg border border-l-4 border-[#334155] border-l-[#c084fc]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#c084fc] mb-2">Large Feature</h3>
                <p className="font-semibold text-lg flex items-center">
                  Spec-first workflow
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Codex Polish Trap</h2>
            <div className="bg-surface border border-[#334155] rounded-lg p-6 space-y-4">
              <p className="text-on-surface leading-relaxed text-lg">
                Codex can build 80% very fast.<br/>
                <span className="text-error">The last 20% becomes painful if the first 80% was not controlled.</span>
              </p>
              
              <div className="pt-2">
                <p className="text-sm text-on-surface-variant uppercase tracking-wider font-semibold mb-3">Prevent this with:</p>
                <div className="flex flex-wrap gap-3">
                  {['Clear scope', 'Right context', 'Acceptance criteria', 'Design rules', 'Review checkpoints', 'Small commits'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-surface-highest text-sm text-on-surface border border-[#3e484f]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          <Callout type="warning" title="Escalation Rule">
            <div className="space-y-2 mt-2">
              <p>If the task is unclear,<br/><strong className="text-white">classify upward.</strong></p>
              <hr className="border-white/10 my-2" />
              <p>If unsure between direct and guided,<br/><strong className="text-white">choose guided.</strong></p>
              <hr className="border-white/10 my-2" />
              <p>If unsure between guided and spec-first,<br/><strong className="text-white">choose spec-first.</strong></p>
            </div>
          </Callout>

          <Checklist 
            title="Pre-Prompt Checklist" 
            items={PRE_PROMPT_CHECKLIST}
          />

        </div>

      </div>

    </div>
  );
}
