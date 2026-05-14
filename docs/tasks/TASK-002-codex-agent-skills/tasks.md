# Tasks: Codex Agent Skills

## Task 1: Add Agent Skills Guidance To Agent Config

Suggested files:
- `src/pages/AgentsSetup.tsx`

Work:
- Add a new "Agent Skills" or "Codex Skills" section under the Agent Config / AGENTS.md Setup page.
- Explain what skills are for Codex.
- Explain the relationship between `AGENTS.md`, `DESIGN.md`, Codex skills, and `docs/tasks`.
- Explain why skills help production speed while maintaining order.
- Include the four recommended skill routes:
  - `spec-first-workflow`
  - `approved-task-implementation`
  - `design-md-enforcer`
  - `qa-release-gate`
  - `git-commit-assistant`
- Make clear that skills do not replace repo rules, tests, review, or human approval.
- Explain that `git-commit-assistant` is report-first and approval-gated before any commit or push.

Review checkpoint:
- Confirm the section is useful without being too long.
- Confirm it belongs naturally under Agent Config.
- Confirm it does not duplicate the Design Skills page.
- Confirm it follows `DESIGN.md`.

## Task 2: Update AGENTS.md Generator Template

Suggested files:
- `src/data/templates.ts`

Work:
- Add Agent Skills / Codex Skill Routing to `AGENTS_MD_GENERATOR_TEMPLATE`.
- Add Agent Skills to the list of required AGENTS.md sections.
- Include copy-ready routing guidance for installed Codex skills.
- Include the rule that repo-local files override reusable skills when more specific.
- Include `git-commit-assistant` as the final report-first commit preparation skill after QA.

Review checkpoint:
- Confirm generated `AGENTS.md` files will include useful skill guidance.
- Confirm the template does not assume every project has the exact same skill names unless it frames them as recommended/default.
- Confirm the template remains readable and copyable.
- Confirm commit/push behavior is not described as automatic.

## Task 3: Add Spec-First Cross-Reference

Suggested files:
- `src/pages/SpecFirst.tsx`

Work:
- Add a concise note explaining that installed Codex skills can shorten the spec-first workflow.
- Mention `spec-first-workflow` as the reusable skill that creates or updates task folders.
- Keep the existing copy-paste template available for users without installed skills.

Review checkpoint:
- Confirm the page still teaches the manual workflow.
- Confirm skills are presented as an acceleration layer, not a replacement for approval.

## Task 4: Add Design Skills Cross-Reference

Suggested files:
- `src/pages/DesignSkills.tsx`

Work:
- Clarify that design skills are a subset of broader agent skills.
- Mention that `design-md-enforcer` is the relevant Codex skill for UI/CSS/design consistency work.
- Keep the page focused on `DESIGN.md` and visual drift prevention.

Review checkpoint:
- Confirm this page does not become the main Agent Skills guide.
- Confirm it still reads as design-control guidance.

## Task 5: Update Template Library Discoverability

Suggested files:
- `src/pages/TemplateLibrary.tsx`
- `src/data/templates.ts` if adding a separate retrofit template is approved

Work:
- Ensure the updated AGENTS.md generator remains visible under Agent Setup.
- Decide whether to add a separate "Agent Skills Routing Section" template for retrofitting existing projects.
- If added, keep it short and avoid duplicating the full generator template.
- Ensure Template Library discoverability accounts for `git-commit-assistant` in the skill routing guidance.

Review checkpoint:
- Confirm users can find the Agent Skills guidance from the Template Library.
- Confirm the library does not become cluttered with duplicate templates.

## Task 6: Verification

Commands:
- `npm run lint`
- `npm run build`

Manual checks:
- Open Agent Config / AGENTS.md Setup.
- Confirm the Agent Skills section is readable on desktop and mobile.
- Open Spec-First Workflow.
- Confirm the skill cross-reference is clear.
- Open DESIGN.md + Skills.
- Confirm the design skill cross-reference is concise.
- Open Template Library.
- Confirm Agent Setup templates remain discoverable.
- Confirm `git-commit-assistant` appears wherever the recommended skill chain is shown.
- Confirm commit and push remain report-first and approval-gated in the guidance.
- Confirm no unrelated pages were visually disrupted.

Safe commit point:
- Commit after acceptance criteria pass and reviewer approves.

## Task 7: Resolve Verification Follow-ups

Suggested files:
- `src/pages/AgentsSetup.tsx`
- `docs/tasks/TASK-002-codex-agent-skills/acceptance-criteria.md`
- `docs/tasks/TASK-002-codex-agent-skills/review-notes.md`

Work:
- Add `git-commit-assistant` to the Agent Config / AGENTS.md Setup skill route list.
- Make the `git-commit-assistant` description clear that it is report-first and approval-gated before staging, committing, or pushing.
- Update acceptance criteria wording from "four recommended skills" to "five recommended skills".
- Record the follow-up resolution in review notes.

Review checkpoint:
- Confirm Agent Config shows the full five-skill chain.
- Confirm acceptance criteria wording matches the five listed skills.
- Confirm no unrelated page or template changes were made.

## Task 8: Follow-up Verification

Commands:
- `npm run lint`
- `npm run build`

Manual checks:
- Confirm Agent Config / AGENTS.md Setup includes `git-commit-assistant`.
- Confirm `acceptance-criteria.md` says "five recommended skills".
- Confirm Template Library still exposes the AGENTS.md generator and Agent Skills Routing Section.
- Confirm commit/push guidance remains report-first and approval-gated.

Safe commit point:
- Commit after Task 7 and Task 8 pass.
