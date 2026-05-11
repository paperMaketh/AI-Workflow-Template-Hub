import React from 'react';
import PageHeader from '../components/PageHeader';

export default function CommonMistakes() {
  const mistakes = [
    {
      title: "Giving the AI too much context at once",
      why: "The AI loses focus, mixes up constraints, or forgets earlier instructions when overwhelmed with an entire codebase or uncurated text.",
      better: "Provide only the relevant files and specific guidelines needed for the current task.",
      exampleFix: "Instead of pasting the entire src folder, just share the Component.tsx and its closest dependencies."
    },
    {
      title: "Not using DESIGN.md before UI work",
      why: "The AI defaults to generic, uninspired styling (like basic Bootstrap-level Tailwind) and invents arbitrary colors/margins.",
      better: "Mandate that the AI reads DESIGN.md before writing any CSS or UI code.",
      exampleFix: "Prompt: 'Read DESIGN.md first, then build the hero section using those exact tokens.'"
    },
    {
      title: "Letting the AI redesign approved layouts",
      why: "AI agents tend to 'improve' things unnecessarily, altering layouts that were already finalized and approved.",
      better: "Explicitly restrict layout changes when asking for functionality or minor polish.",
      exampleFix: "Prompt: 'Do not alter the layout structure or CSS classes. Only wire up the onClick handler.'"
    },
    {
      title: "Asking for too many changes in one prompt",
      why: "Complex multi-step prompts increase the chance of hallucinations, missed requirements, and broken code.",
      better: "Use step-by-step implementation prompts. Tackle one logical block at a time.",
      exampleFix: "Instead of 'Build the auth flow, the dashboard, and the settings page', say 'Step 1: Implement the login form UI.'"
    },
    {
      title: "Not separating planning prompts from build prompts",
      why: "If you ask for code before a plan, the AI makes structural guesses that might not align with your architecture.",
      better: "Generate a spec first. Approve it. Then prompt for implementation.",
      exampleFix: "Use the Spec-First Planning flow. Generate tasks.md, then tackle Task 1."
    },
    {
      title: "Not giving reference images",
      why: "Text descriptions of UI are highly subjective. Without a visual reference, the AI will guess the visual hierarchy.",
      better: "Provide screenshots of similar successful products using Claude/ChatGPT's vision capabilities.",
      exampleFix: "Prompt: 'Analyze this screenshot of the Stripe dashboard, extract its spacing logic, and apply it here.'"
    },
    {
      title: "Not defining do’s and don’ts",
      why: "Without boundaries, the AI will use its own judgment, which might include adding unwanted dependencies or frameworks.",
      better: "Provide strict negative constraints (e.g., must avoid).",
      exampleFix: "Add: 'Do not use external icon libraries. Only use Lucide React.'"
    },
    {
      title: "Not locking the design direction",
      why: "If you keep asking the AI for small tweaks without a central source of truth, the design will drift and become inconsistent.",
      better: "Centralize all design decisions in a DESIGN.md file and reference it constantly.",
      exampleFix: "Prompt: 'Update the DESIGN.md file with these new button styles before rewriting the React component.'"
    },
    {
      title: "Allowing generic UI defaults",
      why: "It makes the product feel cheap and disconnected from the intended premium vibe.",
      better: "Refer to specific design references, styles, or the DESIGN.md rules.",
      exampleFix: "Prompt: 'Do not use a default browser scrollbar. Ensure custom scrollbars are styled as per DESIGN.md.'"
    },
    {
      title: "Ignoring responsive behavior",
      why: "The AI often builds for desktop first and forgets mobile entirely unless explicitly told.",
      better: "Include responsive constraints in every UI prompt.",
      exampleFix: "Prompt: 'Build the Navigation bar. Ensure it collapses into a hamburger menu on mobile (sm: breakpoint).'"
    },
    {
      title: "Not testing after each major change",
      why: "Errors compound. If the agent breaks something in Step 2 and you don't notice until Step 10, debugging is incredibly difficult.",
      better: "Run the app and verify the UI/functionality after every atomic commit or agent action.",
      exampleFix: "Test, then say 'Task complete, moving to Task 2.'"
    },
    {
      title: "Not asking the AI to summarize changed files",
      why: "It's hard to review pull requests or track scope creep if you don't know exactly what the AI touched.",
      better: "Require a standard reporting format.",
      exampleFix: "Prompt: 'After completion, list exactly which files you modified and what changed in each.'"
    },
    {
      title: "Not using focused step-by-step implementation prompts",
      why: "Giving an AI a large goal leads to files that are half-finished or hallucinated.",
      better: "Break down the implementation into discrete, isolated steps.",
      exampleFix: "Prompt: 'Step 1: Just create the static HTML/Tailwind skeleton. Do not wire up state yet.'"
    },
    {
      title: "Letting the AI invent unsupported claims for SEO/content work",
      why: "The AI makes up features, statistics, or pricing that your product doesn't actually have.",
      better: "Provide the exact facts and constrain the AI to only use the provided info.",
      exampleFix: "Prompt: 'Use the provided feature list. Do not invent any new features or benefits.'"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      <PageHeader
        categoryId="mistake"
        title="Common Mistakes"
        description="Avoid these common pitfalls when using AI to build websites, docs, templates, or coding projects."
      />

      <section className="space-y-6">
        <p className="text-lg text-on-surface-variant leading-relaxed">
          AI agents are incredibly powerful, but they require discipline to manage. These are the most frequent mistakes that lead to broken builds, generic designs, and scope creep.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold border-b border-[#334155] pb-2 text-on-background">The Mistakes</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {mistakes.map((mistake, index) => (
            <div key={index} className="bg-surface border border-[#334155] rounded-xl p-6">
              <h3 className="text-xl font-bold text-error mb-3">{mistake.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-on-surface-variant uppercase tracking-widest mb-1">Why it fails</h4>
                  <p className="text-on-surface text-sm">{mistake.why}</p>
                </div>
                
                <div className="border-l-2 border-primary pl-4 py-1">
                  <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-1">Better Approach</h4>
                  <p className="text-on-surface text-sm font-medium">{mistake.better}</p>
                </div>

                {mistake.exampleFix && (
                  <div className="bg-[#0a0f12] border border-[#334155] p-3 rounded">
                    <h4 className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest mb-1">Example</h4>
                    <p className="text-sm font-mono text-on-surface">{mistake.exampleFix}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
