import React from 'react';
import PageHeader from '../components/PageHeader';
import TemplateCard from '../components/TemplateCard';
import { BRAIN_DUMP_TEMPLATE, BRAIN_DUMP_PROCESSING_PROMPT } from '../data/templates';

export default function BrainDump() { 
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      <PageHeader
        categoryId="intake"
        title="Brain Dump Intake"
        description="Turn messy ideas into structured input for planning."
      />

      <section className="space-y-4 text-lg text-on-surface-variant leading-relaxed">
        <p>
          <strong className="text-on-background">A brain dump is intentionally messy.</strong><br/>
          It captures the raw idea before the AI turns it into a structured task.
        </p>
        <p>
          It should include:
        </p>
        <div className="flex flex-wrap gap-2 text-sm mt-2">
          {['goal', 'context', 'requirements', 'design direction', 'reference images', 'constraints', 'unknowns', 'desired outcome'].map(item => (
            <span key={item} className="px-3 py-1 rounded-full bg-surface border border-[#334155] text-on-surface">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            1. Brain Dump Template
          </h2>
          <p className="text-on-surface-variant mb-4">
            Fill this out with whatever raw thoughts you have. It doesn't need to be perfect, just complete enough to give the AI context.
          </p>
          <TemplateCard 
            title="Raw Brain Dump"
            description="Use this format in your notes before prompting the AI."
            content={BRAIN_DUMP_TEMPLATE}
            tags={['Intake', 'Prep']}
            context="Your notes app / draft"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            2. Brain Dump Processing Prompt
          </h2>
          <p className="text-on-surface-variant mb-4">
            Take your filled-out raw brain dump from above and feed it to a Chat agent using this prompt to generate a structured AI-ready plan.
          </p>
          <TemplateCard 
            title="Process the Brain Dump"
            description="Asks a smart model (like Claude 3.5 Sonnet or GPT-4o) to turn your notes into a clean spec."
            content={BRAIN_DUMP_PROCESSING_PROMPT}
            tags={['Codex Chat', 'Claude', 'ChatGPT']}
            context="Chat Interface (Not project agent)"
          />
        </div>
      </section>

    </div>
  );
}

