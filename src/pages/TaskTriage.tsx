import React from 'react';
import PageHeader from '../components/PageHeader';
import Checklist from '../components/Checklist';
import { TRIAGE_DECISION_CHECKLIST } from '../data/checklists';

export default function TaskTriage() { 
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      <PageHeader 
        categoryId="triage"
        title="Task Triage"
        description="Decide what level of planning a task needs before giving it to an AI coding agent."
      />

      <section>
        <h2 className="text-2xl font-semibold mb-6">Main Rule</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level 1 */}
        <div className="bg-surface border border-[#334155] rounded-lg p-6 space-y-5">
          <div className="border-b border-[#334155] pb-4">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2">
              <span className="text-[#34d399]">1.</span> Direct Prompt
            </h3>
          </div>
          
          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Use For</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>Small visual fixes</li>
              <li>Text changes</li>
              <li>Simple bugs</li>
              <li>One-file changes</li>
              <li>Obvious low-risk tasks</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Where To Use</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>Codex Project Agent</li>
              <li>Roo Code</li>
              <li>Any Coding Agent</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Required Docs</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>AGENTS.md</li>
              <li>DESIGN.md (if UI related)</li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">Risk Level:</h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/40">Low</span>
          </div>

          <div className="bg-surface-high p-3 rounded text-sm text-on-surface-variant border border-[#334155] italic">
            <strong className="not-italic text-on-surface block mb-1">Example:</strong>
            Fix navbar spacing without modifying unrelated files.
          </div>
        </div>

        {/* Level 2 */}
        <div className="bg-surface border border-[#334155] rounded-lg p-6 space-y-5">
          <div className="border-b border-[#334155] pb-4">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2">
              <span className="text-[#fbbf24]">2.</span> Guided Plan First
            </h3>
          </div>
          
          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Use For</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>Medium features</li>
              <li>Multiple components</li>
              <li>New sections</li>
              <li>Forms</li>
              <li>Simple animation work</li>
              <li>Refactors with moderate risk</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Where To Use</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>Codex Chat (for planning)</li>
              <li>Codex Project Agent (for impl)</li>
              <li>Claude/GPT Chat (second opinion)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Required Docs</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>AGENTS.md</li>
              <li>DESIGN.md</li>
              <li>Relevant existing files</li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">Risk Level:</h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/40">Medium</span>
          </div>

          <div className="bg-surface-high p-3 rounded text-sm text-on-surface-variant border border-[#334155] italic">
            <strong className="not-italic text-on-surface block mb-1">Example:</strong>
            Create a reusable product card component.
          </div>
        </div>

        {/* Level 3 */}
        <div className="bg-surface border border-[#334155] rounded-lg p-6 space-y-5">
          <div className="border-b border-[#334155] pb-4">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2">
              <span className="text-[#c084fc]">3.</span> Spec-First Workflow
            </h3>
          </div>
          
          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Use For</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>Large / stateful features</li>
              <li>User flows</li>
              <li>SEO/GEO-sensitive work</li>
              <li>Recommendation logic</li>
              <li>Dashboards</li>
              <li>Multi-page changes</li>
              <li>Animation systems</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Where To Use</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>Codex Chat (for spec generation)</li>
              <li>Codex Project Agent (for impl)</li>
              <li>GPT/Claude Chat (strategy/review)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Required Docs</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-on-surface marker:text-[#334155]">
              <li>AGENTS.md</li>
              <li>DESIGN.md</li>
              <li>Feature brain dump</li>
              <li>SEO_GEO_SPEC.md (if relevant)</li>
              <li>ANIMATION_RULES.md (if relevant)</li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">Risk Level:</h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/40">High</span>
          </div>

          <div className="bg-surface-high p-3 rounded text-sm text-on-surface-variant border border-[#334155] italic">
            <strong className="not-italic text-on-surface block mb-1">Example:</strong>
            Build a chair finder quiz or consumer/corporate mode switch.
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Comparison Table</h2>
        <div className="overflow-x-auto rounded-lg border border-[#334155]">
          <table className="w-full text-left text-sm text-on-surface-variant">
            <thead className="bg-[#1b2024] text-xs uppercase font-mono text-on-surface border-b border-[#334155]">
              <tr>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Use For</th>
                <th className="px-4 py-3 font-semibold">Risk</th>
                <th className="px-4 py-3 font-semibold">Planning Needed</th>
                <th className="px-4 py-3 font-semibold">Where Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155] bg-surface">
              <tr className="hover:bg-surface-high transition-colors">
                <td className="px-4 py-3 font-medium text-[#34d399]">Direct</td>
                <td className="px-4 py-3">small obvious fixes</td>
                <td className="px-4 py-3">low</td>
                <td className="px-4 py-3">none/minimal</td>
                <td className="px-4 py-3">Codex Project Agent</td>
              </tr>
              <tr className="hover:bg-surface-high transition-colors">
                <td className="px-4 py-3 font-medium text-[#fbbf24]">Guided</td>
                <td className="px-4 py-3">medium features</td>
                <td className="px-4 py-3">medium</td>
                <td className="px-4 py-3">short plan</td>
                <td className="px-4 py-3">Codex Chat then Agent</td>
              </tr>
              <tr className="hover:bg-surface-high transition-colors">
                <td className="px-4 py-3 font-medium text-[#c084fc]">Spec-First</td>
                <td className="px-4 py-3">large/complex features</td>
                <td className="px-4 py-3">high</td>
                <td className="px-4 py-3">proposal/design/tasks</td>
                <td className="px-4 py-3">Chat then Agent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Decision Checklist</h2>
        <Checklist 
          title="Questions to ask before prompting:"
          items={TRIAGE_DECISION_CHECKLIST}
        />
      </section>

    </div>
  );
}

