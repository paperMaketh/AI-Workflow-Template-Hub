import React from 'react';
import PageHeader from '../components/PageHeader';
import TemplateCard from '../components/TemplateCard';
import {
  DESIGN_CONSISTENCY_REVIEW_TEMPLATE,
  SCOPE_REVIEW_TEMPLATE,
  FINAL_PRE_COMMIT_REVIEW_TEMPLATE,
  ACCESSIBILITY_REVIEW_TEMPLATE,
  SEO_GEO_REVIEW_TEMPLATE,
  PERFORMANCE_REVIEW_TEMPLATE
} from '../data/templates';

export default function ReviewTemplates() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      <PageHeader
        categoryId="review"
        title="Review Templates"
        description="Copy-ready prompts for reviewing AI-generated work before committing."
      />

      <section className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            1. Design Consistency Review
          </h2>
          <TemplateCard 
            title="Design Consistency Review"
            description="Use after UI work, before committing."
            content={DESIGN_CONSISTENCY_REVIEW_TEMPLATE}
            tags={['Review & QA', 'UI']}
            context="Codex Chat / Project Agent (review-only) / ChatGPT"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            2. Scope Review
          </h2>
          <TemplateCard 
            title="Scope Review"
            description="Use after implementation to verify the agent stayed within scope."
            content={SCOPE_REVIEW_TEMPLATE}
            tags={['Review & QA', 'Scope']}
            context="Codex Chat / Project Agent (review-only)"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            3. Final Pre-Commit Review
          </h2>
          <TemplateCard 
            title="Final Pre-Commit Review"
            description="Use before committing a milestone."
            content={FINAL_PRE_COMMIT_REVIEW_TEMPLATE}
            tags={['Review & QA', 'Final Check']}
            context="Codex Chat / Project Agent / ChatGPT"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            4. Accessibility Review
          </h2>
          <TemplateCard 
            title="Accessibility Review"
            description="Use after UI or form work."
            content={ACCESSIBILITY_REVIEW_TEMPLATE}
            tags={['Review & QA', 'A11y']}
            context="Codex Chat / Project Agent (review-only) / ChatGPT"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            5. SEO/GEO Review
          </h2>
          <TemplateCard 
            title="SEO/GEO Review"
            description="Use after page/content/metadata work."
            content={SEO_GEO_REVIEW_TEMPLATE}
            tags={['Review & QA', 'SEO']}
            context="Codex Chat / Project Agent (review-only) / ChatGPT"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 border-b border-[#334155] pb-2">
            6. Performance Review
          </h2>
          <TemplateCard 
            title="Performance Review"
            description="Use after animations, images, or large UI changes."
            content={PERFORMANCE_REVIEW_TEMPLATE}
            tags={['Review & QA', 'Performance']}
            context="Codex Chat / Project Agent (review-only)"
          />
        </div>
      </section>

    </div>
  );
}