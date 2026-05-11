export const TASK_TRIAGE_TEMPLATE = `
Analyze the following task description and help me triage it.

Task:
[task description]

Current files affected:
[files]

Help me answer:
1. Is this a small, medium, or large task?
2. Does it touch multiple domains (UI, state, API)?
3. What are the hidden risks?
4. Should I use Direct Implementation, Guided Plan, or Spec-First workflow for this?

Please provide a short recommendation.
`.trim();

export const BRAIN_DUMP_TEMPLATE = `
# Brain Dump

## Task Name
[Short name]

## Goal
[What should be achieved?]

## Why It Matters
[Business/user/dev reason]

## User Flow
[What should the user experience?]

## Requirements
- [Requirement 1]
- [Requirement 2]

## Design References
- DESIGN.md
- [Reference images / links]

## Existing Files / Components
- [Known files]

## Constraints
- Do not [x]
- Avoid [y]

## Acceptance Ideas
- [How I know it is done]

## Unknowns
- [Questions / uncertain parts]
`.trim();

export const BRAIN_DUMP_PROCESSING_PROMPT = `
I am starting a new task/project and I want to turn this brain dump into a structured AI-ready plan.

Use the information below to create a clean task intake.

Brain Dump:
[Paste messy thoughts here]

Known context:
- Project goal: [goal]
- Target users: [users]
- Tech stack: [stack]
- Design direction: follow DESIGN.md
- Reference images: [describe or attach]
- Constraints: [constraints]
- Unknowns: [unknowns]

Output:
1. Clean summary
2. Task classification:
   - Direct Prompt
   - Guided Plan First
   - Spec-First Workflow
3. Recommended docs the coding agent should read
4. Risks and hidden complexity
5. Questions or decisions needed
6. Recommended next prompt
`.trim();

export const DIRECT_IMPLEMENTATION_TEMPLATE = `
Read:
- AGENTS.md
- [DESIGN.md if UI-related]

Task:
[Specific small task]

Scope:
Only edit files directly related to this issue.

Do not:
- modify unrelated files
- refactor unrelated code
- add new libraries
- change the design system
- alter behavior outside this task

Acceptance Criteria:
- [specific result]
- no console errors
- existing behavior remains unchanged
- responsive behavior remains intact

After implementation:
- stop
- list changed files
- summarize what was done
- mention anything I should manually review
`.trim();

export const GUIDED_PLAN_FIRST_TEMPLATE = `
Read:
- AGENTS.md
- DESIGN.md
- [specific relevant files/docs]

Task:
Create a short implementation plan for:
[feature/task]

Do not implement yet.

The plan should include:
- files/components likely affected
- proposed approach
- design considerations
- accessibility considerations
- possible risks
- acceptance criteria
- recommended implementation order

Keep the plan concise and implementation-ready.

After the plan:
- stop
- ask for approval before implementation
`.trim();

export const IMPLEMENT_APPROVED_TASK_TEMPLATE = `
Read:
- AGENTS.md
- DESIGN.md
- docs/tasks/[TASK-ID]/proposal.md
- docs/tasks/[TASK-ID]/design.md
- docs/tasks/[TASK-ID]/tasks.md
- docs/tasks/[TASK-ID]/acceptance-criteria.md

Task:
Implement only Task [NUMBER] from docs/tasks/[TASK-ID]/tasks.md.

Scope:
Only edit files required for Task [NUMBER].

Do not:
- implement Task [NUMBER + 1] or later
- modify unrelated files
- add new libraries unless explicitly required
- change DESIGN.md
- change AGENTS.md
- invent new design tokens
- over-polish beyond the acceptance criteria

Requirements:
- Follow DESIGN.md exactly.
- Follow AGENTS.md.
- Match the task spec.
- Keep changes focused.
- Preserve existing behavior.
- Ensure responsive layout.
- Ensure accessibility basics.

After implementation:
- stop
- list changed files
- summarize what was done
- mention anything I should manually review
- update docs/tasks/[TASK-ID]/review-notes.md with implementation notes if appropriate
`.trim();

export const BUG_FIX_TEMPLATE = `
Read:
- AGENTS.md

Bug:
[describe the issue]

Expected behavior:
[what should happen]

Actual behavior:
[what currently happens]

Scope:
Only inspect and edit files related to this bug.

Do not:
- refactor unrelated code
- change visual design unless the bug is visual
- add new libraries
- modify unrelated features

After fixing:
- explain the root cause
- list changed files
- explain how the fix works
- mention anything I should test manually
`.trim();

export const REFACTOR_TEMPLATE = `
Read:
- AGENTS.md
- relevant feature/component files

Task:
Refactor [specific area].

Goal:
Improve maintainability without changing behavior or design.

Rules:
- Do not change visual appearance.
- Do not change public behavior.
- Do not add new libraries.
- Do not modify unrelated files.
- Preserve existing tests and functionality.

Acceptance Criteria:
- behavior remains the same
- code is cleaner
- duplication is reduced
- components are easier to maintain
- no regressions

After implementation:
- list changed files
- explain what changed
- explain why it is safer/better
- mention anything to manually verify
`.trim();

export const ANIMATION_IMPLEMENTATION_TEMPLATE = `
Read:
- AGENTS.md
- DESIGN.md
- ANIMATION_RULES.md

Task:
Implement [specific animation].

Requirements:
- Keep motion smooth, quick, and restrained.
- Respect reduced motion preferences.
- Use existing motion patterns if available.
- Do not add excessive parallax, bounce, spin, or flashy effects.
- Do not reduce performance.
- Keep animation meaningful and UX-supportive.

Acceptance Criteria:
- Animation feels premium.
- Animation does not distract.
- Works on desktop and mobile.
- No layout shift.
- Reduced motion users are respected.

After implementation:
- stop
- list changed files
- summarize the animation behavior
`.trim();

export const DESIGN_CONSISTENCY_REVIEW_TEMPLATE = `
Read:
- DESIGN.md
- relevant changed files

Task:
Review the current UI implementation against DESIGN.md.

Check for:
- wrong colors
- inconsistent radius
- inconsistent spacing
- inconsistent shadows
- overused animation
- generic-looking sections
- components that do not match the design language
- sections that feel visually disconnected

Rules:
- Do not edit files.
- Do not implement fixes.
- Return findings only.

Return:
1. critical visual issues
2. important polish issues
3. optional polish
4. recommended next task
`.trim();

export const SCOPE_REVIEW_TEMPLATE = `
Review the implementation against the approved task scope.

Read:
- docs/tasks/[TASK-ID]/proposal.md
- docs/tasks/[TASK-ID]/tasks.md
- docs/tasks/[TASK-ID]/acceptance-criteria.md
- current git diff

Check:
- Did the implementation stay within scope?
- Were unrelated files changed?
- Were future tasks implemented early?
- Were new dependencies added?
- Were design rules changed?
- Was the task completed according to acceptance criteria?

Rules:
- Do not edit files.
- Return review only.

Output:
1. Scope pass/fail
2. Unexpected changes
3. Missing requirements
4. Risky changes
5. Recommended next action
`.trim();

export const FINAL_PRE_COMMIT_REVIEW_TEMPLATE = `
Perform a final pre-commit review.

Read:
- AGENTS.md
- DESIGN.md
- docs/tasks/[TASK-ID]/
- current git diff

Check:
- task matches acceptance criteria
- no unrelated files changed
- design remains consistent
- responsive behavior is safe
- accessibility basics are covered
- no unnecessary dependencies
- no obvious performance issues
- no console errors likely
- code is maintainable

Rules:
- Do not edit files.
- Return review only.

Output:
1. Commit readiness: Ready / Not Ready
2. Critical blockers
3. Important fixes
4. Optional polish
5. Suggested commit message
`.trim();

export const ACCESSIBILITY_REVIEW_TEMPLATE = `
Review the changed UI for accessibility issues.

Check:
- semantic HTML
- heading order
- button/link clarity
- keyboard accessibility
- focus states
- form labels if forms exist
- readable contrast
- reduced motion support where relevant
- meaning not conveyed by color alone

Rules:
- Do not edit files.
- Return findings only.

Output:
1. critical accessibility issues
2. recommended fixes
3. optional improvements
`.trim();

export const SEO_GEO_REVIEW_TEMPLATE = `
Review the changed pages/content for SEO and GEO quality.

Check:
- clear page title and purpose
- semantic heading structure
- crawlable content
- meaningful internal links
- FAQ or answer sections where relevant
- schema/structured data if relevant
- AI-readable content blocks
- no fake or unsupported claims
- no keyword stuffing

Rules:
- Do not edit files.
- Return findings only.

Output:
1. SEO issues
2. GEO/AI search issues
3. content clarity issues
4. recommended fixes
`.trim();

export const PERFORMANCE_REVIEW_TEMPLATE = `
Review the implementation for performance risks.

Check:
- unnecessary dependencies
- heavy animations
- layout shift risk
- oversized components
- avoidable re-renders
- image optimization issues
- mobile performance concerns

Rules:
- Do not edit files.
- Return findings only.

Output:
1. critical performance risks
2. important improvements
3. optional optimizations
`.trim();

export const DESIGN_MD_EXTRACTION_TEMPLATE = `
Analyze the following design references and extract their design language.

Do not copy them directly.

Extract:
- visual identity
- color style
- typography style
- spacing rhythm
- corner radius
- shadow style
- layout patterns
- button design
- card design
- motion style
- brand feeling
- what makes the design feel premium

Then create an original DESIGN.md for my project based on those principles.

Project goal:
[goal]

References:
[references]
`.trim();

export const AI_SKILL_CREATION_TEMPLATE = `
Create an AI skill for:
[skill name]

This skill must follow DESIGN.md as the source of truth.

The skill should define:
- purpose
- when to use it
- required inputs
- output expectations
- design rules
- accessibility rules
- common mistakes to avoid
- acceptance criteria

The skill must not invent new colors, spacing, shadows, radius, or animation rules outside DESIGN.md.

Output the complete skill file in Markdown.
`.trim();

export const AGENTS_MD_GENERATOR_TEMPLATE = `
Create an AGENTS.md file for this project.

Project context:
[Paste project description]

Tech stack:
[Paste stack]

Workflow:
This project uses a spec-first workflow.

Agents should:
- read AGENTS.md before all tasks
- read DESIGN.md before UI/design work
- use task folders under docs/tasks
- avoid unrelated file edits
- ask for clarification when scope is unclear
- create proposal.md, design.md, and tasks.md before large features
- report changed files after implementation

AGENTS.md should include:
- project purpose
- tech stack
- commands
- folder structure
- coding rules
- design rules
- accessibility rules
- SEO/GEO rules if relevant
- animation rules if relevant
- task workflow
- spec-first workflow
- recurring mistakes to avoid
- reporting format after changes
- rules for not modifying unrelated files

Output the complete AGENTS.md.
`.trim();

export const SPEC_FIRST_GENERATOR_TEMPLATE = `
Read:
- AGENTS.md
- DESIGN.md
- docs/tasks/[TASK-ID]/brain-dump.md

Task:
Convert the brain dump into a spec-first task folder.

Create or update these files inside:
docs/tasks/[TASK-ID]/

Required files:
1. proposal.md
2. design.md
3. tasks.md
4. acceptance-criteria.md
5. review-notes.md

Do not implement code yet.

proposal.md should include:
- problem
- goal
- user value
- scope
- not in scope
- risks
- success criteria

design.md should include:
- technical approach
- UI/UX approach
- component structure
- data/state needs
- accessibility notes
- SEO/GEO notes if relevant
- animation notes if relevant
- edge cases

tasks.md should include:
- ordered implementation tasks
- suggested file changes
- review checkpoints
- safe commit points

acceptance-criteria.md should include:
- functional requirements
- visual requirements
- responsive requirements
- accessibility requirements
- performance requirements
- must-not-break list

review-notes.md should include:
- assumptions made
- questions for me
- decisions I need to confirm
- possible simplifications

Rules:
- Do not modify app/source files.
- Do not implement anything.
- Do not invent design rules outside DESIGN.md.
- If something is unclear, write assumptions in review-notes.md instead of guessing silently.

After creating the files:
- list all files created/updated
- summarize the recommended implementation order
- clearly state whether this task is Direct, Guided Plan First, or Spec-First
`.trim();
