# Proposal: Codex Agent Skills

## Problem
The AI Workflow Template Hub now has practical Codex skill routing in its own `AGENTS.md`, but the product UI does not yet teach this pattern as a first-class part of the workflow.

The hub currently explains:

- spec-first task folders
- `AGENTS.md` as the repo operating manual
- `DESIGN.md + Skills` for design consistency

However, it does not clearly explain Codex skills as reusable specialist workflows for spec creation, approved implementation, design enforcement, and QA gates. That leaves a gap between the user's actual workflow and the guidance the hub provides.

## Goal
Add a clear Agent Skills layer to the hub so users understand how Codex skills work with spec-first development.

The content should explain:

- what skills are
- why they are valuable
- where they live
- how they differ from project-local files
- when to use each workflow skill
- how to include skill routing in generated `AGENTS.md` files

## User Value
Users should no longer need to repeatedly explain the spec-first workflow to Codex. Instead, they can install or define reusable skills, then let project-local `AGENTS.md`, `DESIGN.md`, and task docs provide the specific context.

This improves:

- speed
- consistency
- scope control
- design consistency
- QA discipline
- handoff quality between planning and implementation

## Scope
- Add an Agent Skills explanation to the Agent Config / AGENTS.md Setup page.
- Update the AGENTS.md generator template with an `Agent Skills` or `Codex Skill Routing` section.
- Add concise cross-reference copy to the Spec-First Workflow page.
- Add concise cross-reference copy to the DESIGN.md + Skills page.
- Update Template Library if needed so the enhanced AGENTS.md template remains discoverable.
- Preserve existing page structure unless a separate Agent Skills page is explicitly approved.

## Not In Scope
- Creating or editing global Codex skills.
- Changing installed skills in `C:\Users\Admin\.codex\skills`.
- Redesigning the whole hub.
- Adding a backend, auth, database, or persistence.
- Adding new dependencies.
- Building a full skill manager UI.
- Adding a new route unless approved after review.
- Rewriting every template to become skill-based in this task.

## Risks
- Over-explaining skills could make the Agent Config page feel heavy.
- Duplicating the Design Skills page could confuse users about where skill guidance lives.
- Making skills sound authoritative over `AGENTS.md` could weaken project-specific governance.
- Adding too many named skills could make the guidance feel brittle if skill names change later.
- Updating the AGENTS.md generator incorrectly could propagate bad instructions into future projects.
- Adding navigation for a new page could increase scope and require more visual verification.

## Success Criteria
- The hub clearly explains that skills are reusable Codex workflows, not replacements for project rules.
- The recommended skill routing is visible in the Agent Config guidance.
- The AGENTS.md generator template includes an Agent Skills section.
- Spec-first guidance explains that `spec-first-workflow` can replace repeated template-pasting when installed.
- Design guidance clarifies that design skills are one subset of broader agent skills.
- No app/source implementation work happens before this spec is approved.
