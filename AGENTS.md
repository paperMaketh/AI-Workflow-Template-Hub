# AGENTS.md

This file contains the core instructions and constraints for any AI coding agent working on this repository.

## Role
You are assisting in building the **AI Workflow Template Hub**.
This is a static documentation site designed to store prompt templates, workflows, and guidelines.

## Stack Constraints
- React + Vite + TypeScript.
- Tailwind CSS exclusively for styling.
- **No Backend**, no databases, no server-side rendering.
- `react-router-dom` using `HashRouter` to maintain GitHub Pages compatibility.

## Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build the static output
- `npm run preview` - Preview the built output

## Folder Structure
- `src/components/` - Reusable UI components (e.g. `TemplateCard`, `CodeBlock`, `PageHeader`)
- `src/pages/` - Top-level page views mapping to sidebar navigation
- `src/data/` - Static data like generic checklists, template text blocks, and section configurations

## Coding Rules
- Create new reusable components in `src/components/` rather than heavy duplication.
- For prompt storage, use `src/data/` structure mapping to `TemplateCard.tsx` components.
- Keep code clean, functional, and side-effect free where possible.

## Design Rules
- **Source of Truth:** Read `DESIGN.md` for the overarching visual direction.
- Do not introduce arbitrary colors or gradients outside the defined token palette.
- Keep the aesthetic "technical" and "low-light" with clear boundaries, avoiding overuse of generic drop shadows.
- Maintain high contrast. Check that background chips have appropriate opacity.

## Task & Workflow Rules
- **Spec-First Workflow:** Break down major tasks. Generate a proposal, design plan, and task list before implementing code.
- Read `AGENTS.md` before starting all tasks.
- Read `DESIGN.md` before making any visual, CSS, or UI structural changes.
- Ensure the result behaves responsively and handles overflow/long text cleanly.

## Codex Skill Routing
- Use `spec-first-workflow` when creating or refining spec-first task folders and prompt templates.
- Use `approved-task-implementation` after the user approves one specific task from a task folder.
- Use `design-md-enforcer` for UI, CSS, layout, component, animation, and design consistency changes.
- Use `qa-release-gate` for final review, acceptance criteria checks, and release readiness.
- Use `git-commit-assistant` after QA passes to produce a report-first commit review before staging, committing, or pushing.
- This repo's `AGENTS.md`, `DESIGN.md`, and task docs remain the source of truth when they are more specific than a reusable skill.

## Recurring Mistakes to Avoid
- **Do not modify unrelated files.**
- **Do not invent new colors** outside of Tailwind standard tokens or established variables.
- **Do not over-animate.** Use subtle fades/transitions only.
- **Do not duplicate existing components.** Reuse `TemplateCard`, `PageHeader`, `Callout`, etc.
- **Do not add dependencies unnecessarily.** (No heavy external UI libraries; stick to basic Tailwind and standard Lucide React icons).
- **Do not skip acceptance criteria.** Ensure the task exactly matches what was requested.
- **Do not assume earlier edits are still present.** Re-open changed files when a user asks for a double check or when task state seems inconsistent.

## Tool Lessons From Prior Work
- This repository may be nested inside another folder that also has a `.git` directory. Run `git status` and `git diff` from the actual project root: `AI-Workflow-Template-Hub`.
- The app uses `HashRouter`. When visually checking routes on Vite/GitHub Pages, use URLs like `http://127.0.0.1:5173/AI-Workflow-Template-Hub/#/brain-dump`, not `/AI-Workflow-Template-Hub/brain-dump`.
- On Windows, starting Vite with `Start-Process npm` can fail with access denied. Use `npm.cmd` when launching through PowerShell, for example `Start-Process -FilePath "npm.cmd" -ArgumentList @('run','dev','--','--host','127.0.0.1','--port','5173')`.
- If a dev server does not respond immediately, check whether it bound to the expected port before assuming the code failed. Capture stdout/stderr to temp files when starting background processes.
- Browser verification may reject `networkidle` in this environment. Use `waitForLoadState({ state: "load" })` for local Vite checks.
- Before reporting UI completion, confirm the rendered route contains the expected text and that obsolete duplicate content is absent.

## Reporting Format
After making changes:
- Describe what was edited.
- List any files changed.
- If making manual review requests, state them clearly.
- Output directly actionable diffs without long retrospective essays.
