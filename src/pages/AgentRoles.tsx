import React from 'react';
import PageHeader from '../components/PageHeader';

export default function AgentRoles() {
  const roles = [
    {
      name: "Design Agent",
      responsibility: "Transfers the visual direction from DESIGN.md into the project, building UI components and layouts.",
      inputs: ["DESIGN.md", "Wireframes or descriptions", "Component specs"],
      produces: ["Styled components", "CSS/Tailwind updates", "UI layouts"],
      avoids: ["Complex business logic", "Database architecture", "API integration"],
      bestFor: "Building the initial UI shell and styling components.",
      promptStarter: "You are the Design Agent. Review DESIGN.md and build the TemplateCard component matching those exact rules."
    },
    {
      name: "Frontend Agent",
      responsibility: "Wires up state, routing, and component interactions.",
      inputs: ["Designed components", "State requirements", "API endpoints"],
      produces: ["React components with state", "Zustand/Redux stores", "API hooks"],
      avoids: ["Changing DESIGN.md rules", "Backend infrastructure"],
      bestFor: "Making a static UI functional and interactive.",
      promptStarter: "You are the Frontend Agent. Wire up the search input to filter the template list using local state."
    },
    {
      name: "Backend Agent",
      responsibility: "Designs and implements APIs, database schemas, and server logic.",
      inputs: ["Data models", "API requirements", "Security rules"],
      produces: ["API routes", "Database migrations", "Authentication logic"],
      avoids: ["Frontend code", "UI styling"],
      bestFor: "Building the engine and data layer.",
      promptStarter: "You are the Backend Agent. Create a new REST endpoint to save user preferences."
    },
    {
      name: "SEO / GEO Agent",
      responsibility: "Optimizes metadata, structured data, and content for search engines and localization.",
      inputs: ["Target keywords", "Target regions", "Existing page source"],
      produces: ["Meta tags", "Schema.org JSON-LD", "i18n translation keys"],
      avoids: ["UI changes", "Breaking core functionality"],
      bestFor: "Polishing a finished page for search visibility.",
      promptStarter: "You are the SEO Agent. Review the Landing page and inject the correct SEO meta tags and open graph data."
    },
    {
      name: "Content Agent",
      responsibility: "Drafts copy, microcopy, and placeholder text that fits the brand voice.",
      inputs: ["Brand voice guidelines", "Wireframes", "Target audience"],
      produces: ["UI copy", "Marketing copy", "Error messages"],
      avoids: ["Changing technical implementation"],
      bestFor: "Replacing Lorem Ipsum with production quality text.",
      promptStarter: "You are the Content Agent. Rewrite these error messages to be more helpful and less robotic."
    },
    {
      name: "QA / Debugging Agent",
      responsibility: "Identifies and fixes bugs, edge cases, and layout issues.",
      inputs: ["Error logs", "Bug report", "Failing code"],
      produces: ["Patched code", "Tests", "Root cause explanation"],
      avoids: ["Adding new features", "Large refactors"],
      bestFor: "Fixing a specific broken behavior.",
      promptStarter: "You are the QA Agent. The sidebar disappears on mobile. Find the CSS issue and provide a fix."
    },
    {
      name: "Refactor Agent",
      responsibility: "Improves code structure, readability, and performance without changing behavior.",
      inputs: ["Messy code", "A defined architectural goal"],
      produces: ["Cleanly modularized code", "Extracted functions"],
      avoids: ["Changing features", "Modifying UI"],
      bestFor: "Cleaning up technical debt.",
      promptStarter: "You are the Refactor Agent. Extract the logic from Home.tsx into reusable custom hooks without changing how the page works."
    },
    {
      name: "Documentation Agent",
      responsibility: "Writes READMEs, inline comments, and developer guides.",
      inputs: ["Finished code", "Project goals"],
      produces: ["README.md", "API Docs", "Code comments"],
      avoids: ["Executing code changes"],
      bestFor: "Onboarding new developers or agents.",
      promptStarter: "You are the Documentation Agent. Read the src/components folder and generate a component library markdown guide."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      <PageHeader
        categoryId="agent"
        title="AI Agent Roles"
        description="Understand the different AI agent roles used in this workflow to direct the right AI for the right task."
      />

      <section className="space-y-6">
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Just like a human engineering team, AI works best when given a specific role. Assigning a role focuses the AI's context and prevents it from making out-of-scope changes.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2 text-on-background">Key Roles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role.name} className="bg-surface-low border border-[#334155] rounded-xl overflow-hidden flex flex-col">
              <div className="p-5 border-b border-[#334155] bg-surface">
                <h3 className="text-xl font-bold text-primary">{role.name}</h3>
                <p className="text-sm text-on-surface-variant mt-1">{role.responsibility}</p>
              </div>
              <div className="p-5 space-y-4 flex-1">
                <div>
                  <h4 className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-2">Inputs needed</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-on-surface">
                    {role.inputs.map(i => <li key={i}>{i}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-2">Produces</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-on-surface">
                    {role.produces.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-error uppercase tracking-widest mb-2">Must avoid</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-on-surface">
                    {role.avoids.map(a => <li key={a}>{a}</li>)}
                  </ul>
                </div>
              </div>
              <div className="p-5 border-t border-[#334155] bg-surface/50">
                <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Example Starter</h4>
                <p className="text-sm font-mono text-on-surface bg-[#0a0f12] p-3 rounded border border-[#334155]">
                  "{role.promptStarter}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
