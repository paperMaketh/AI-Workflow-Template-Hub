import React from 'react';
import { Link } from 'react-router-dom';
import { SECTIONS } from '../data/sections';
import SectionCard from '../components/SectionCard';
import Callout from '../components/Callout';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function Home() {
  const mainSectionIds = [
    'task-triage',
    'brain-dump',
    'spec-first',
    'impl-templates',
    'review-templates',
    'design-skills'
  ];

  const getSectionCards = () => {
    return SECTIONS
      .filter(s => mainSectionIds.includes(s.id))
      .map(section => (
        <React.Fragment key={section.id}>
          <SectionCard 
            title={section.title}
            description={section.description || ''}
            path={section.path}
            categoryId={section.categoryId}
          />
        </React.Fragment>
      ));
  };

  const quickFlowSteps = [
    { title: "Brain Dump", desc: "Capture the messy idea, goal, context, references, constraints, and unknowns." },
    { title: "Triage", desc: "Decide whether the task is direct, guided, or spec-first." },
    { title: "Spec", desc: "For large tasks, generate proposal.md, design.md, tasks.md, acceptance-criteria.md, and review-notes.md." },
    { title: "Review", desc: "Check the plan before code is written." },
    { title: "Implement", desc: "Give the project agent a controlled work order." },
    { title: "QA", desc: "Review scope, design, responsiveness, accessibility, SEO, performance, and code quality." },
    { title: "Commit", desc: "Save a clean milestone before continuing." }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-16 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="space-y-8 mt-4">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-on-background mb-4 tracking-tight leading-tight">
            AI Workflow<br/>Template Hub
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            A quick-reference command center for planning, prompting, reviewing, and shipping with AI coding agents.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/quick-start" 
            className="bg-primary text-on-primary font-bold px-6 py-3 rounded transition-colors hover:bg-primary-hover shadow-[0_0_16px_rgba(56,189,248,0.2)]"
          >
            Start Quick Guide
          </Link>
          <Link 
            to="/templates"
            className="bg-transparent border border-[#334155] text-on-surface px-6 py-3 rounded transition-colors hover:bg-surface-highest"
          >
            Open Template Library
          </Link>
        </div>

        <div className="pt-4 max-w-3xl">
          <Callout type="info">
            <strong className="block text-lg mb-2 text-primary">Codex is the fast implementer. You are the technical director.</strong>
            <ul className="list-none space-y-1.5 opacity-90 font-mono text-sm">
              <li><span className="text-primary opacity-60 mr-2">»</span>The docs are the law.</li>
              <li><span className="text-primary opacity-60 mr-2">»</span>The prompt is the work order.</li>
              <li><span className="text-primary opacity-60 mr-2">»</span>The review is quality control.</li>
            </ul>
          </Callout>
        </div>
      </section>

      {/* Quick Flow Visual */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 border-b border-[#334155] pb-2">Quick Flow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickFlowSteps.map((step, index) => (
            <div key={index} className="relative bg-surface border border-[#334155] rounded-lg p-5 group hover:border-[#87929a] transition-colors duration-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-highest text-xs font-mono text-on-surface-variant border border-[#334155]">
                  {index + 1}
                </span>
                <h3 className="font-heading font-semibold text-lg">{step.title}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {step.desc}
              </p>
              
              {/* Desktop arrow connector */}
              {index < quickFlowSteps.length - 1 && index % 4 !== 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#334155]">
                  <ArrowRight size={20} />
                </div>
              )}
              {/* Mobile/Tablet arrow connector */}
              {index < quickFlowSteps.length - 1 && (
                <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 text-[#334155]">
                  <ArrowDown size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Grid of Sections */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b border-[#334155] pb-2">Core Workflow Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSectionCards()}
        </div>
      </section>

    </div>
  );
}
