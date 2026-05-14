# Design Spec: Codex Agent Skills

## Technical Approach
This should be a content and template update using the existing React/Vite static site structure.

Primary implementation should likely touch:

- `src/pages/AgentsSetup.tsx`
- `src/data/templates.ts`
- `src/pages/SpecFirst.tsx`
- `src/pages/DesignSkills.tsx`
- `src/pages/TemplateLibrary.tsx`

Avoid adding new routes unless review approves a standalone Agent Skills page.

## UI / UX Approach
The Agent Config page should remain the main home for this concept because skills are part of agent setup and repo operating rules.

Recommended placement:

1. Keep "What AGENTS.md Is".
2. Keep "Why It Matters".
3. Add a new "Agent Skills" or "Codex Skills" section.
4. Keep "AGENTS.md Generator Template".
5. Keep "Recurring Mistakes Section".

The new section should explain the relationship between:

- `AGENTS.md`: project-local operating manual
- `DESIGN.md`: visual source of truth
- Codex skills: reusable specialist workflows
- `docs/tasks`: durable task handoff packet

Use compact explanatory cards or a short comparison table, following the existing dark technical documentation style.

## Component / Module Structure
Reuse existing components:

- `PageHeader`
- `TemplateCard`
- `Callout`

Inline page sections are acceptable because the page is documentation-style and already uses inline section markup.

Do not add a new reusable component unless the content becomes repeated in multiple places.

## Content Architecture
Recommended new Agent Skills section should cover:

- What skills are for Codex.
- Why they matter for production speed and order.
- The recommended four-skill routing:
  - `spec-first-workflow`
  - `approved-task-implementation`
  - `design-md-enforcer`
  - `qa-release-gate`
- Rule hierarchy:
  - repo-local `AGENTS.md`, `DESIGN.md`, and task docs override generic skill guidance.
- Caution:
  - skills improve repeatability but do not replace review, tests, or human approval.

## Template Update
Update `AGENTS_MD_GENERATOR_TEMPLATE` so generated projects include an Agent Skills section.

The template should request:

- project purpose
- tech stack
- commands
- folder structure
- coding rules
- design rules
- accessibility rules
- task workflow
- spec-first workflow
- agent skills / skill routing
- recurring mistakes
- reporting format

The generated `AGENTS.md` should include a section similar to:

```md
## Agent Skills
- Use `spec-first-workflow` when turning a brain dump, issue, or feature request into task specs.
- Use `approved-task-implementation` after a specific task is approved.
- Use `design-md-enforcer` for UI, CSS, layout, animation, and visual consistency work.
- Use `qa-release-gate` before commit, merge, release, or handoff.
- Repo-local `AGENTS.md`, `DESIGN.md`, and active task docs override generic skill guidance.
```

## Cross-References
Spec-First page:

- Add a short note that installed Codex skills let users invoke `spec-first-workflow` instead of repeatedly pasting the full generator prompt.

Design Skills page:

- Clarify that design skills are one category of agent skills, specifically anchored to `DESIGN.md`.

Template Library:

- Ensure the updated AGENTS.md generator remains visible under Agent Setup.
- Consider adding a separate "Agent Skills Routing Section" template only if the full generator becomes too large or users need to retrofit existing projects.

## Accessibility Notes
- Keep headings in logical order.
- Keep comparison cards readable and keyboard-neutral.
- Avoid relying on color alone to distinguish skill categories.
- Keep copyable template text clear and scannable.

## Responsive Notes
- New Agent Skills content should stack cleanly on mobile.
- Avoid wide tables that overflow on small screens.
- Prefer grid cards or compact rows over dense multi-column tables if mobile readability suffers.

## Edge Cases
- User has not installed the skills yet.
- User uses different skill names.
- User uses another coding agent alongside Codex.
- Project does not have `DESIGN.md`.
- Project is small enough for direct implementation and should not force full spec-first workflow.
- Existing projects need only a retrofit Agent Skills section rather than a full regenerated `AGENTS.md`.
