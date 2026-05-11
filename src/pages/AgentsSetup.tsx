import React from 'react';
import PageHeader from '../components/PageHeader';
import TemplateCard from '../components/TemplateCard';
import { AGENTS_MD_GENERATOR_TEMPLATE } from '../data/templates';

export default function AgentsSetup() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      <PageHeader
        categoryId="agent"
        title="AGENTS.md Setup"
        description="Explain how AGENTS.md acts as the operating manual for coding agents."
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">What AGENTS.md Is</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          AGENTS.md tells future coding agents how to work inside the repo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-surface-low border border-[#334155] p-5 rounded-lg space-y-2">
            <h3 className="font-medium text-on-background">Core Definitions</h3>
            <ul className="list-disc pl-5 space-y-1 text-on-surface-variant text-sm">
              <li>Project purpose & Tech stack</li>
              <li>Commands & Folder structure</li>
              <li>Coding & Design rules</li>
              <li>Task & Spec-first workflow</li>
            </ul>
          </div>
          <div className="bg-surface-low border border-[#334155] p-5 rounded-lg space-y-2">
            <h3 className="font-medium text-on-background">Advanced Rules</h3>
            <ul className="list-disc pl-5 space-y-1 text-on-surface-variant text-sm">
              <li>Accessibility & SEO/GEO rules</li>
              <li>Animation rules</li>
              <li>Recurring mistakes to avoid</li>
              <li>Reporting format after changes</li>
              <li>Rules for not modifying unrelated files</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">Why It Matters</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          AGENTS.md prevents repeated mistakes. It gives the agent consistent operating instructions. It reduces the need to repeat rules in every prompt.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">AGENTS.md Generator Template</h2>
        <TemplateCard 
          title="AGENTS.md Generator Template"
          description="Use this to spin up a new AGENTS.md for a project."
          content={AGENTS_MD_GENERATOR_TEMPLATE}
          tags={['AGENTS.md', 'Setup']}
          context="ChatGPT / Claude"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2">Recurring Mistakes Section</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          When an agent makes the same mistake twice, add it to AGENTS.md.
        </p>

        <div className="bg-surface border border-[#334155] rounded-xl p-6">
          <h3 className="font-semibold text-primary mb-3">Examples of recurring mistakes to document:</h3>
          <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
            <li>Do not modify unrelated files.</li>
            <li>Do not invent new colors.</li>
            <li>Do not over-animate.</li>
            <li>Do not duplicate existing components.</li>
            <li>Do not add dependencies unnecessarily.</li>
            <li>Do not skip acceptance criteria.</li>
          </ul>
        </div>
      </section>

    </div>
  );
}
