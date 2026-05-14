# Brain Dump: Codex Agent Skills

## Task Name
Codex Agent Skills

## Goal
Add a clear, reusable explanation of agent skills to the AI Workflow Template Hub, especially for Codex users working with the spec-first workflow.

The hub should explain why skills matter, where they sit relative to `AGENTS.md`, `DESIGN.md`, and `docs/tasks`, and how they help Codex move faster while staying ordered and scoped.

## Why It Matters
The workflow has now adopted reusable Codex skills:

- `spec-first-workflow`
- `approved-task-implementation`
- `design-md-enforcer`
- `qa-release-gate`

These skills reduce repeated prompting and make spec-first execution more consistent across projects. The hub should teach this as a standard part of the workflow so future projects can adopt it cleanly.

If this guidance is vague or placed poorly, it can mislead future agent work. The content is high-risk because it becomes operating guidance for future AI-assisted development.

## User Flow
A user should be able to:

1. Open Agent Config / AGENTS.md Setup.
2. Understand that `AGENTS.md` is the repo-local operating manual.
3. Understand that Codex skills are reusable specialist workflows.
4. See how skills support the spec-first workflow.
5. Copy or generate an `AGENTS.md` template that includes an Agent Skills section.
6. Use the skill routing rules in real projects without re-explaining the workflow every time.

## Requirements
- Add a dedicated explanation of agent skills under the Agent Config area.
- Explain the value of skills for Codex specifically.
- Explain how skills support spec-first planning, approved task implementation, design enforcement, and QA gates.
- Update the AGENTS.md generator template to include an Agent Skills section.
- Add proper cross-references where needed from Spec-First and Design Control.
- Keep the content consistent with the existing hub tone and design system.
- Do not make the hub feel bloated or repetitive.

## Design References
- `DESIGN.md`
- `src/pages/AgentsSetup.tsx`
- `src/pages/SpecFirst.tsx`
- `src/pages/DesignSkills.tsx`
- `src/pages/TemplateLibrary.tsx`
- `src/data/templates.ts`
- `AGENTS.md`

## Existing Files / Components
- `src/pages/AgentsSetup.tsx`
- `src/pages/SpecFirst.tsx`
- `src/pages/DesignSkills.tsx`
- `src/pages/TemplateLibrary.tsx`
- `src/data/templates.ts`
- `src/data/sections.ts` if navigation changes are needed
- `src/App.tsx` only if a new page is approved
- `src/components/TemplateCard.tsx`
- `src/components/Callout.tsx`
- `src/components/PageHeader.tsx`

## Constraints
- Do not implement code before this spec is reviewed and approved.
- Avoid creating a broad redesign.
- Avoid duplicating the whole Design Skills page.
- Avoid making skills sound like they replace `AGENTS.md`, `DESIGN.md`, or task specs.
- Avoid suggesting that skills remove the need for human review.
- Do not add dependencies.
- Do not introduce new visual patterns outside `DESIGN.md`.

## Acceptance Ideas
- The Agent Config section explains Codex skills clearly.
- The AGENTS.md generator template includes a useful Agent Skills section.
- The Spec-First page mentions `spec-first-workflow` as a faster path once skills are installed.
- The Design Control page distinguishes design skills from broader agent workflow skills.
- Template Library exposes the updated template content where appropriate.
- The page builds cleanly and remains responsive.

## Unknowns
- Whether to add a standalone `Agent Skills` page or keep it as a section inside `AGENTS.md Setup`.
- Whether to add a new sidebar item under Agent Config.
- Whether to add a dedicated copy-ready Agent Skills section template separate from the full AGENTS.md generator.
