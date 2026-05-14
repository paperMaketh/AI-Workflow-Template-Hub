# Review Notes: Codex Agent Skills

## Assumptions Made
- This is a high-risk workflow guidance change because it affects future agent behavior.
- The first step should be creating a spec-first task packet, not editing app pages immediately.
- Agent Config / AGENTS.md Setup is the best primary location for broad Codex skill guidance.
- Design Skills should remain focused on `DESIGN.md` and visual consistency.
- The existing manual templates should remain available for users without installed skills.
- The four current recommended skills are:
  - `spec-first-workflow`
  - `approved-task-implementation`
  - `design-md-enforcer`
  - `qa-release-gate`
  - `git-commit-assistant`

## Resolved Decisions
- The task is classified as Spec-First.
- Do not code before this spec is reviewed and approved.
- Use the existing task folder structure rather than introducing a new planning format.
- Prefer adding an Agent Skills section to the existing Agent Config page before considering a standalone page.

## Questions For Review
- Should Agent Skills be a section inside `AGENTS.md Setup`, or should it become its own sidebar page under Agent Config?
- Should the Template Library include a separate "Agent Skills Routing Section" template for retrofitting existing projects?
- Should the AGENTS.md generator refer to the four skill names as "recommended defaults" or as the user's standard workflow?
- Should `plan.md` become a required file in future spec-first task folders, or remain optional?

## Decisions To Confirm Later
- Whether future hub updates should include install instructions for Codex skills.
- Whether to add a dedicated Skill Creation / Skill Maintenance page later.
- Whether to align global Codex skill references with this hub's template content automatically.
- Whether future UI copy should show `git-commit-assistant` as part of the main skill chain or as a final optional Git workflow.

## Possible Simplifications
- Keep all broad skills guidance in `AgentsSetup.tsx`.
- Add only one short cross-reference to `SpecFirst.tsx`.
- Add only one short cross-reference to `DesignSkills.tsx`.
- Avoid adding a new route in this task.
- Avoid adding a separate retrofit template unless the user explicitly wants it.
- Keep `git-commit-assistant` guidance short in the current task and avoid turning the hub into a Git tutorial.

## Implementation Notes
- Task 1 implemented in `src/pages/AgentsSetup.tsx`.
- Added a focused Agent Skills section after "Why It Matters" and before the AGENTS.md generator template.
- The section explains the relationship between `AGENTS.md`, `DESIGN.md`, `docs/tasks`, and Codex skills.
- Added concise cards for `spec-first-workflow`, `approved-task-implementation`, `design-md-enforcer`, and `qa-release-gate`.
- Added a warning callout that skills do not replace review, tests, human approval, or repo-local source-of-truth files.
- Task 2 implemented in `src/data/templates.ts`.
- Updated `AGENTS_MD_GENERATOR_TEMPLATE` so future generated project instructions include recommended Codex skill routing.
- Added the repo-local override rule and a note that projects with different skill names should preserve the same routing intent.
- Task 3 implemented in `src/pages/SpecFirst.tsx`.
- Added a concise `spec-first-workflow` callout near the Spec-First File Generator Template.
- The callout presents the skill as a shortcut for installed Codex setups while keeping the manual generator template as fallback and source shape.
- Task 4 implemented in `src/pages/DesignSkills.tsx`.
- Added a concise note that design skills are one category of broader agent skills.
- Mentioned `design-md-enforcer` as the focused Codex skill for UI, CSS, layout, animation, and visual consistency work.
- Added `git-commit-assistant` to this task packet as the fifth recommended skill.
- Decision recorded: commit/push behavior must be report-first and approval-gated. The skill should not stage, commit, or push during the report phase.
- Existing global skills were updated so the workflow points from implementation to QA, then to `git-commit-assistant` for commit preparation after QA passes.
- Task 5 implemented in `src/pages/TemplateLibrary.tsx` and `src/data/templates.ts`.
- Updated the AGENTS.md generator text so it includes `git-commit-assistant` and explicitly keeps commit/push approval-gated.
- Added an "Agent Skills Routing Section" retrofit template for existing projects that already have an `AGENTS.md`.
- Updated the Template Library Agent Setup card copy/tags so skill routing is easier to find.

## Verification Notes
- Task 1 verification completed:
  - `npm run lint`
  - `npm run build`
- Task 2 verification completed:
  - `npm run lint`
  - `npm run build`
- Task 3 verification completed:
  - `npm run lint`
  - `npm run build`
- Task 4 verification completed:
  - `npm run lint`
  - `npm run build`
- `git-commit-assistant` skill update verification completed:
  - Official skill validator attempted but blocked by missing local Python dependency: `PyYAML`.
  - Manual skill structure check passed: folder name matches skill name, `SKILL.md` frontmatter includes `name` and `description`, and `references/git-commit-templates.md` is linked from `SKILL.md`.
  - `npm run lint`
  - `npm run build`
- Task 5 verification completed:
  - `npm run lint`
  - `npm run build`
- Task 6 verification completed with findings:
  - `npm run lint` passed.
  - `npm run build` passed.
  - User manually reviewed and accepted the Template Library retrofit styling and theme fit.
  - Agent Config / AGENTS.md Setup contains the Agent Skills section and remains readable from source review.
  - Spec-First Workflow contains the `spec-first-workflow` cross-reference.
  - DESIGN.md + Skills contains the `design-md-enforcer` cross-reference.
  - Template Library exposes the AGENTS.md generator and the Agent Skills Routing Section retrofit template.
  - Template Library and `src/data/templates.ts` include `git-commit-assistant` and the report-first approval-gated commit guidance.
  - Follow-up needed: `src/pages/AgentsSetup.tsx` still lists only `spec-first-workflow`, `approved-task-implementation`, `design-md-enforcer`, and `qa-release-gate`; it should include `git-commit-assistant` wherever the recommended skill chain is shown.
  - Follow-up needed: `acceptance-criteria.md` says "four recommended skills" while listing five; update wording to "five recommended skills".
- Task 7 follow-ups resolved:
  - Added `git-commit-assistant` to the Agent Config skill route list.
  - Updated the Agent Skills intro copy to include approval-gated commit report preparation.
  - Updated `acceptance-criteria.md` wording from "four recommended skills" to "five recommended skills".
- Task 8 follow-up verification completed:
  - `npm run lint` passed.
  - `npm run build` passed.
  - Confirmed Agent Config / AGENTS.md Setup includes `git-commit-assistant`.
  - Confirmed `acceptance-criteria.md` says "five recommended skills".
  - Confirmed Template Library still exposes the AGENTS.md generator and Agent Skills Routing Section.
  - Confirmed commit/push guidance remains report-first and approval-gated in `src/data/templates.ts`.
