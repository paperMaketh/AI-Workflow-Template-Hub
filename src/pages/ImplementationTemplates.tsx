import React from 'react';
import PageHeader from '../components/PageHeader';
import TemplateCard from '../components/TemplateCard';
import { 
  DIRECT_IMPLEMENTATION_TEMPLATE,
  GUIDED_PLAN_FIRST_TEMPLATE,
  IMPLEMENT_APPROVED_TASK_TEMPLATE,
  BUG_FIX_TEMPLATE,
  REFACTOR_TEMPLATE,
  ANIMATION_IMPLEMENTATION_TEMPLATE
} from '../data/templates';

export default function ImplementationTemplates() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      <PageHeader
        categoryId="impl"
        title="Implementation Templates"
        description="Copy-ready prompts for giving work to Codex Project Agent, Roo Code, or another implementation agent."
      />

      <section className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            1. Direct Implementation Template
          </h2>
          <TemplateCard 
            title="Direct Implementation"
            description="Use for small, safe, obvious changes."
            content={DIRECT_IMPLEMENTATION_TEMPLATE}
            tags={['Implementation', 'Small Task']}
            context="Codex Project Agent / Roo Code / Any Coding Agent"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            2. Guided Plan First Template
          </h2>
          <TemplateCard 
            title="Guided Plan First"
            description="Use for medium tasks that need light planning."
            content={GUIDED_PLAN_FIRST_TEMPLATE}
            tags={['Guided Planning', 'Medium Task']}
            context="Codex Chat (first) / Codex Project Agent (after approval)"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            3. Implement Approved Task Template
          </h2>
          <TemplateCard 
            title="Implement Approved Task"
            description="Use after proposal/design/tasks files are approved."
            content={IMPLEMENT_APPROVED_TASK_TEMPLATE}
            tags={['Implementation', 'Spec-First']}
            context="Codex Project Agent"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            4. Bug Fix Template
          </h2>
          <TemplateCard 
            title="Bug Fix"
            description="Use when fixing a clearly defined bug."
            content={BUG_FIX_TEMPLATE}
            tags={['Implementation', 'Bug']}
            context="Codex Project Agent / Roo Code"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            5. Refactor Template
          </h2>
          <TemplateCard 
            title="Refactor Template"
            description="Use when improving code maintainability without changing behavior."
            content={REFACTOR_TEMPLATE}
            tags={['Implementation', 'Refactor']}
            context="Codex Project Agent / Roo Code"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            6. Animation Implementation Template
          </h2>
          <TemplateCard 
            title="Animation Implementation"
            description="Use when implementing a specific approved animation."
            content={ANIMATION_IMPLEMENTATION_TEMPLATE}
            tags={['Implementation', 'Animation']}
            context="Codex Project Agent / Roo Code"
          />
        </div>
      </section>

    </div>
  );
}

