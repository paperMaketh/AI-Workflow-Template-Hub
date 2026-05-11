import React from 'react';
import PageHeader from '../components/PageHeader';
import Callout from '../components/Callout';
import TemplateCard from '../components/TemplateCard';
import { SPEC_FIRST_GENERATOR_TEMPLATE } from '../data/templates';

export default function SpecFirst() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      <PageHeader
        categoryId="spec"
        title="Spec-First Workflow"
        description="For large tasks, do not code first. Create specs, review them, then implement one task at a time."
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">1. Why Spec First</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <p className="text-on-surface-variant leading-relaxed">
              Spec-first workflow prevents:
            </p>
            <ul className="list-disc list-inside space-y-1 text-on-surface marker:text-[#334155]">
              <li>vague implementation</li>
              <li>scope creep</li>
              <li>unrelated edits</li>
              <li>design drift</li>
              <li>missing acceptance criteria</li>
              <li>4-hour polish sessions</li>
              <li>agents building impressive but misaligned work</li>
            </ul>
          </div>
          <div className="flex-1 w-full">
            <Callout type="warning">
              <strong className="block text-lg mb-2 text-white">Plan before code.</strong>
              <strong className="block text-lg mb-2 text-white">Approve before implementation.</strong>
              <strong className="block text-lg text-white">Implement one task at a time.</strong>
            </Callout>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">2. Task Folder Structure</h2>
        <div className="bg-surface-lowest border border-[#334155] p-6 rounded-lg font-mono text-sm text-[#93c5fd] leading-relaxed">
          docs/tasks/TASK-001-task-name/<br/>
          &nbsp;&nbsp;brain-dump.md<br/>
          &nbsp;&nbsp;proposal.md<br/>
          &nbsp;&nbsp;design.md<br/>
          &nbsp;&nbsp;tasks.md<br/>
          &nbsp;&nbsp;acceptance-criteria.md<br/>
          &nbsp;&nbsp;review-notes.md
        </div>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-1">brain-dump.md</h3>
            <p className="text-on-surface-variant text-sm">Raw messy input from the user.</p>
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-1">proposal.md</h3>
            <p className="text-on-surface-variant text-sm">Explains the problem, goal, scope, not-in-scope, risks, and success criteria.</p>
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-1">design.md</h3>
            <p className="text-on-surface-variant text-sm">Explains technical approach, UI/UX approach, component structure, state/data needs, accessibility notes, SEO/GEO notes, animation notes, and edge cases.</p>
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-1">tasks.md</h3>
            <p className="text-on-surface-variant text-sm">Breaks implementation into ordered tasks with review checkpoints and safe commit points.</p>
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-1">acceptance-criteria.md</h3>
            <p className="text-on-surface-variant text-sm">Defines what must be true before the task is considered done.</p>
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-primary mb-1">review-notes.md</h3>
            <p className="text-on-surface-variant text-sm">Tracks assumptions, questions, decisions, implementation notes, and manual review needs.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">3. Spec-First File Generator Template</h2>
        <p className="text-on-surface-variant leading-relaxed">
          Use when a task is large, ambiguous, stateful, UX-heavy, SEO-sensitive, or likely to cause polish issues.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface border border-[#334155] p-4 rounded-lg">
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Where to use</h4>
            <ul className="list-disc list-inside text-sm text-on-surface marker:text-[#334155] space-y-1">
              <li>Codex Chat for drafting</li>
              <li>Codex Project Agent if writing files</li>
              <li>Claude/GPT Chat for planning help</li>
            </ul>
          </div>
          <div className="bg-surface border border-[#334155] p-4 rounded-lg">
            <h4 className="font-mono text-xs text-on-surface-variant uppercase tracking-wider mb-2">Required Context</h4>
            <ul className="list-disc list-inside text-sm text-on-surface marker:text-[#334155] space-y-1">
              <li>AGENTS.md</li>
              <li>DESIGN.md</li>
              <li>brain-dump.md</li>
              <li>project docs if relevant</li>
            </ul>
          </div>
        </div>

        <TemplateCard
          title="Spec-First File Generator"
          description="Feed this to your planning agent to structure your large tasks."
          content={SPEC_FIRST_GENERATOR_TEMPLATE}
          tags={['Planning', 'Spec-First']}
          context="Chat Agent / Project Agent"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">4. Approval Step</h2>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          After the AI creates the specs, the user should review:
        </p>
        <ul className="list-disc list-inside space-y-1 text-on-surface mb-6 marker:text-[#334155]">
          <li>proposal.md</li>
          <li>design.md</li>
          <li>tasks.md</li>
          <li>acceptance-criteria.md</li>
          <li>review-notes.md</li>
        </ul>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          Then either:
        </p>
        <ul className="list-disc list-inside space-y-1 text-on-surface mb-6 marker:text-[#334155]">
          <li>approve Task 1 for implementation</li>
          <li>request spec changes</li>
          <li>split the task into smaller tasks</li>
        </ul>
        
        <Callout type="error" title="Warning">
          Do not let the project agent implement before the spec is approved.
        </Callout>
      </section>

    </div>
  );
}
