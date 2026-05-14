import React from 'react';
import PageHeader from '../components/PageHeader';
import TemplateCard from '../components/TemplateCard';
import {
  BRAIN_DUMP_TEMPLATE,
  TASK_TRIAGE_TEMPLATE,
  SPEC_FIRST_GENERATOR_TEMPLATE,
  DIRECT_IMPLEMENTATION_TEMPLATE,
  GUIDED_PLAN_FIRST_TEMPLATE,
  IMPLEMENT_APPROVED_TASK_TEMPLATE,
  BUG_FIX_TEMPLATE,
  REFACTOR_TEMPLATE,
  ANIMATION_IMPLEMENTATION_TEMPLATE,
  DESIGN_CONSISTENCY_REVIEW_TEMPLATE,
  SCOPE_REVIEW_TEMPLATE,
  ACCESSIBILITY_REVIEW_TEMPLATE,
  SEO_GEO_REVIEW_TEMPLATE,
  PERFORMANCE_REVIEW_TEMPLATE,
  FINAL_PRE_COMMIT_REVIEW_TEMPLATE,
  DESIGN_MD_EXTRACTION_TEMPLATE,
  AI_SKILL_CREATION_TEMPLATE,
  AGENTS_MD_GENERATOR_TEMPLATE,
  AGENT_SKILL_ROUTING_SECTION_TEMPLATE
} from '../data/templates';

export default function TemplateLibrary() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      <PageHeader
        title="Template Library"
        description="The master library of all prompt templates. Copy these into your agent chat or use them as a foundation for your own."
      />

      {/* PLANNING SECTION */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-[#334155] pb-3 text-on-background">Planning</h2>
        
        <div className="space-y-10">
          <TemplateCard 
            title="Brain Dump Intake Template"
            description="Use for capturing messy thoughts before formalizing a task."
            content={BRAIN_DUMP_TEMPLATE}
            tags={['Planning', 'Intake']}
            context="Planning / Claude / ChatGPT"
          />
          <TemplateCard 
            title="Task Triage Template"
            description="Use to figure out task size and approach."
            content={TASK_TRIAGE_TEMPLATE}
            tags={['Planning', 'Triage']}
            context="Planning / Claude / ChatGPT"
          />
          <TemplateCard 
            title="Spec-First File Generator Template"
            description="Use to expand a brain dump into a proper Spec-First folder."
            content={SPEC_FIRST_GENERATOR_TEMPLATE}
            tags={['Planning', 'Spec-First']}
            context="Planning / Claude / Project Agent"
          />
        </div>
      </section>

      {/* IMPLEMENTATION SECTION */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-[#334155] pb-3 text-on-background">Implementation</h2>
        
        <div className="space-y-10">
          <TemplateCard 
            title="Direct Implementation Template"
            description="Use for small, safe, obvious changes."
            content={DIRECT_IMPLEMENTATION_TEMPLATE}
            tags={['Implementation', 'Small Task']}
            context="Project Agent / Roo Code"
          />
          <TemplateCard 
            title="Guided Plan First Template"
            description="Use for medium tasks that need light planning."
            content={GUIDED_PLAN_FIRST_TEMPLATE}
            tags={['Implementation', 'Guided Planning']}
            context="Project Agent / Codex Chat"
          />
          <TemplateCard 
            title="Implement Approved Task Template"
            description="Use after proposal/design/tasks files are approved."
            content={IMPLEMENT_APPROVED_TASK_TEMPLATE}
            tags={['Implementation', 'Spec-First']}
            context="Project Agent"
          />
          <TemplateCard 
            title="Bug Fix Template"
            description="Use when fixing a clearly defined bug."
            content={BUG_FIX_TEMPLATE}
            tags={['Implementation', 'Bug Fix']}
            context="Project Agent / Roo Code"
          />
          <TemplateCard 
            title="Refactor Template"
            description="Use when improving code maintainability without changing behavior."
            content={REFACTOR_TEMPLATE}
            tags={['Implementation', 'Refactoring']}
            context="Project Agent / Roo Code"
          />
          <TemplateCard 
            title="Animation Implementation Template"
            description="Use when implementing a specific approved animation."
            content={ANIMATION_IMPLEMENTATION_TEMPLATE}
            tags={['Implementation', 'Animation']}
            context="Project Agent / Roo Code"
          />
        </div>
      </section>

      {/* REVIEW SECTION */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-[#334155] pb-3 text-on-background">Review</h2>
        
        <div className="space-y-10">
          <TemplateCard 
            title="Design Consistency Review Template"
            description="Use after UI work, before committing."
            content={DESIGN_CONSISTENCY_REVIEW_TEMPLATE}
            tags={['Review & QA', 'UI']}
            context="Review / Project Agent / ChatGPT"
          />
          <TemplateCard 
            title="Scope Review Template"
            description="Use after implementation to verify the agent stayed within scope."
            content={SCOPE_REVIEW_TEMPLATE}
            tags={['Review & QA', 'Scope']}
            context="Review / Project Agent"
          />
          <TemplateCard 
            title="Accessibility Review Template"
            description="Use after UI or form work."
            content={ACCESSIBILITY_REVIEW_TEMPLATE}
            tags={['Review & QA', 'A11y']}
            context="Review / Project Agent / ChatGPT"
          />
          <TemplateCard 
            title="SEO/GEO Review Template"
            description="Use after page/content/metadata work."
            content={SEO_GEO_REVIEW_TEMPLATE}
            tags={['Review & QA', 'SEO']}
            context="Review / Project Agent / ChatGPT"
          />
          <TemplateCard 
            title="Performance Review Template"
            description="Use after animations, images, or large UI changes."
            content={PERFORMANCE_REVIEW_TEMPLATE}
            tags={['Review & QA', 'Performance']}
            context="Review / Project Agent"
          />
          <TemplateCard 
            title="Final Pre-Commit Review Template"
            description="Use before committing a milestone."
            content={FINAL_PRE_COMMIT_REVIEW_TEMPLATE}
            tags={['Review & QA', 'Final Check']}
            context="Review / Project Agent / ChatGPT"
          />
        </div>
      </section>

      {/* DESIGN SYSTEM SECTION */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-[#334155] pb-3 text-on-background">Design System</h2>
        
        <div className="space-y-10">
          <TemplateCard 
            title="DESIGN.md Extraction Template"
            description="Extract design rules from existing references."
            content={DESIGN_MD_EXTRACTION_TEMPLATE}
            tags={['Design', 'Setup']}
            context="ChatGPT / Claude (with vision)"
          />
          <TemplateCard 
            title="AI Skill Creation Template"
            description="Create specialized skills anchored to your DESIGN.md."
            content={AI_SKILL_CREATION_TEMPLATE}
            tags={['Skills', 'Setup']}
            context="ChatGPT / Claude"
          />
        </div>
      </section>

      {/* AGENT SETUP SECTION */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold border-b border-[#334155] pb-3 text-on-background">Agent Setup</h2>
        
        <div className="space-y-10">
          <TemplateCard 
            title="AGENTS.md Generator Template"
            description="Spin up a new AGENTS.md with spec-first workflow and Codex skill routing."
            content={AGENTS_MD_GENERATOR_TEMPLATE}
            tags={['AGENTS.md', 'Setup', 'Skills']}
            context="ChatGPT / Claude"
          />
          <TemplateCard 
            title="Agent Skills Routing Section"
            description="Retrofit an existing AGENTS.md with the standard Codex skill chain."
            content={AGENT_SKILL_ROUTING_SECTION_TEMPLATE}
            tags={['AGENTS.md', 'Skills', 'Codex']}
            context="Codex / Project Agent"
          />
        </div>
      </section>

    </div>
  );
}
