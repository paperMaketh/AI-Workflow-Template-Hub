# Proposal: Brain Dump Workspace

## Problem
The Brain Dump Intake page currently presents the brain dump template as static copy-ready text. That is useful for copying into another tool, but it does not let the user stay inside the hub to draft, save, revisit, duplicate, export, or manage multiple brain dumps.

## Goal
Add an offline-first Brain Dump Workspace to the Brain Dump Intake page so users can create, edit, auto-save, copy, duplicate, export, and delete multiple Markdown brain dumps while preserving the existing blank template experience.

## User Value
- Users can start planning directly inside the workflow hub.
- Brain dumps survive refreshes without a backend.
- The blank template remains available as a clean source.
- Multiple ideas can be saved and moved through draft, ready, used, and archived states.
- The workflow becomes closer to the site's intended brain dump to spec-first process.

## Scope
- Add workspace UI to `src/pages/BrainDump.tsx`.
- Present the feature as a single Template / Edit Workspace with two modes.
- Add a compact left-side mode switcher for Markdown Template Mode and Edit Template Mode.
- Keep the side-panel layout, but style the mode controls as attached side tabs instead of detached toolbar buttons.
- Keep the clean original template locked in template mode.
- Add an edit-only saved draft tab strip across the top of the workspace.
- Add local state and localStorage persistence for saved brain dumps.
- Add auto-save after typing stops.
- Add saved brain dump list and active brain dump selection.
- Add fields for title, tags, status, content, createdAt, and updatedAt.
- Add copy blank template, copy current brain dump, duplicate, export as `.md`, and delete with confirmation actions.
- Keep the blank Brain Dump Template copyable inside the workspace instead of repeating it as a separate duplicate page section.
- Preserve existing Brain Dump Processing Prompt content.
- Keep the feature fully static, offline-capable, and GitHub Pages compatible.

## Not In Scope
- Backend persistence.
- Authentication.
- Database storage.
- Cloud sync.
- Markdown preview in the first version.
- Split editor/preview view.
- Rich text editing.
- Importing `.md` files.
- Export all saves as `.json`.
- Import saves from `.json`.
- Reset current save from template, unless separately approved for this version.
- Search/filter across saved brain dumps unless explicitly added later.
- Changing the template library content.
- Redesigning the whole page or global design system.

## Risks
- localStorage can fail or be unavailable in private/restricted browser contexts.
- Auto-save timing can feel unclear if the UI does not communicate save state well.
- Large Markdown content may need comfortable textarea sizing and overflow handling.
- A delete action could cause accidental data loss without confirmation.
- Route/page edits could accidentally disturb the existing static template and processing prompt.
- Template and edit data could get mixed if the clean template and saved drafts are not separated.
- Tab-strip behavior can become awkward with many saved drafts, long names, small screens, or mouse-wheel scrolling.
- localStorage quota errors can occur with many large drafts.

## Success Criteria
- The Brain Dump page keeps the original blank template copyable and locked.
- The workspace clearly separates Template Mode from Edit Mode.
- The saved draft tab strip appears only in Edit Mode.
- Users can create and manage multiple saved brain dumps.
- The current draft is auto-saved to localStorage after edits settle.
- Refreshing the page restores the saved list and selected/current brain dump state where appropriate.
- Copy and export actions preserve exact Markdown content.
- Delete asks for confirmation before removing a brain dump.
- The implementation remains static and deployable to GitHub Pages.
- Existing pages and template library content continue to work.
