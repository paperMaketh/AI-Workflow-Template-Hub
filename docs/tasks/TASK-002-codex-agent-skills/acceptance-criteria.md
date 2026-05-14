# Acceptance Criteria: Codex Agent Skills

## Functional Requirements
- Agent Config / AGENTS.md Setup includes a clear Agent Skills section.
- AGENTS.md generator template includes an Agent Skills or Codex Skill Routing section.
- Spec-First Workflow page references the `spec-first-workflow` skill as an optional acceleration layer.
- DESIGN.md + Skills page clarifies that design skills are part of a broader agent skill system.
- Template Library still exposes the updated AGENTS.md generator under Agent Setup.

## Content Requirements
- Skills are explained as reusable specialist workflows for Codex.
- `AGENTS.md` is explained as project-local operating rules.
- `DESIGN.md` is explained as the visual source of truth.
- `docs/tasks` is explained as the durable task handoff packet.
- Skills are not described as replacing specs, tests, reviews, or human approval.
- Repo-local rules are clearly stated to override generic skill guidance when more specific.
- The five recommended skills are referenced accurately:
  - `spec-first-workflow`
  - `approved-task-implementation`
  - `design-md-enforcer`
  - `qa-release-gate`
  - `git-commit-assistant`
- `git-commit-assistant` is described as report-first and approval-gated before any staging, commit, or push.

## Visual Requirements
- UI follows project `DESIGN.md`.
- New sections use existing documentation page patterns.
- No new arbitrary colors, shadows, radii, or typography styles are introduced.
- Agent Skills content remains scannable and not overly dense.

## Responsive Requirements
- New content stacks cleanly on mobile.
- No comparison layout or template card overflows the page.
- Long skill names remain readable.

## Accessibility Requirements
- Heading order remains logical.
- Interactive copy areas remain accessible through existing `TemplateCard` behavior.
- Meaning is not conveyed by color alone.
- Text contrast remains consistent with existing page patterns.

## Performance Requirements
- No new dependencies are added.
- Static site behavior remains unchanged.
- No runtime-heavy feature or stateful persistence is introduced.

## Error State Requirements
- Users without installed Codex skills can still use the manual prompt templates.
- Users with different skill names can still understand the routing concept.
- Existing projects can retrofit the Agent Skills section without regenerating the full `AGENTS.md`.
- Users can understand that commit reporting can happen before Git mutation, and push requires explicit approval.

## Must Not Break
- Do not remove the current AGENTS.md generator template.
- Do not remove the existing Spec-First File Generator template.
- Do not remove the Design Skills page's current DESIGN.md focus.
- Do not add a backend, auth, database, or new dependency.
- Do not implement app changes before this spec is reviewed and approved.
