# Review Notes: Brain Dump Workspace

## Classification
- Level: High
- Workflow: Spec-First
- Reason: This is a stateful feature with persistence, auto-save, multiple item management, export behavior, and responsive UI requirements.

## Assumptions
- localStorage is acceptable as the only persistence layer.
- Saved brain dumps are private to the user's browser/device.
- Markdown preview is not required for the first version.
- Import from `.md` is not required.
- Search/filter for saved brain dumps is not required in this task.
- Project-root `DESIGN.md` is now available and should be followed.
- The first implementation can keep all saved brain dumps in one localStorage array.
- The workspace should use a mode-based interface rather than separate static template and editor sections.
- Edit mode should never mutate the locked original template.
- Duplicate display names are acceptable because internal ids are unique.
- Edit mode should never end with zero saves; create/select a blank save if the final save is deleted.
- Archived saves should not remain visible in the main saved draft tab strip by default once archived filtering exists.
- Selected draft id should be restored after refresh.
- Empty brain dump content should not be allowed as a normal saved state.

## Reviewer Answers Captured
- Workspace placement/model: use a single Template / Edit Workspace with a compact vertical mode side panel.
- Mode switcher visual model: keep the side panel, but make Template/Edit controls feel attached to the workspace like side-mounted browser tabs instead of detached toolbar buttons.
- Template Mode: view clean original template and copy it.
- Edit Mode: fill the template, auto-save, rename saves, duplicate saves, delete saves, copy/export filled Markdown.
- Top save panel: only visible in edit mode; hidden in template mode; slides/fades down; sticky/fixed at top of workspace content; horizontally scrollable.
- Saved versions: browser-tab style, active state, dynamic width, rename on double-click or edit action, delete with `x`, text ellipsis, horizontal overflow, mouse-wheel horizontal scrolling.
- DESIGN.md: added to project root and should be used.
- Reference images: style references only, not strict function/layout requirements.
- Archived saves: hide from the main saved tab strip in a later filter/final-polish pass. Potential future idea: separate top bar for archived-only saves.
- Tags: main UI should use removable chips. Comma-separated input should be supported as a convenience and converted into chips.
- Selected draft restore: yes, restore the selected brain dump id after refresh.
- Empty content: do not allow empty brain dump content as a normal saved state. Prompt the user and offer an option to delete if they close an empty dump.
- Reset Current Save from Template: keep for later final adjustments/polish.
- Mode switcher visual preference: the side-panel/tab-strip background should use the same dark background as the Markdown template area, with the active mode tab visually pressed and connected to the main panel.
- Page content preference: remove the standalone duplicate Brain Dump Template section from the Brain Dump page and make that template part of the workspace experience.
- Later polish idea: add a third workspace button/mode for a pre-filled example template so users can see what a completed brain dump looks like.

## Decisions Needed Before Implementation
- Approve the proposed data model.
- Approve the localStorage key names.
- Approve the mode-based UI model.
- Approve Task 2 before UI implementation begins.
- Confirm whether this task should be implemented in one pass or task-by-task with review after each task.

## Possible Simplifications
- Build removable tag chips for the main UI, with comma-separated paste/input parsing.
- Keep archived items in storage but filter them out of the main tab strip once archive behavior is implemented.
- Use browser `window.confirm` for delete confirmation.
- Keep the workspace component self-contained instead of creating several new components immediately.
- Keep preview/split view out of version one.
- Keep import/export-all out of version one.
- Keep Reset Current Save from Template out of version one.
- Keep the pre-filled example template mode out of version one unless separately approved.

## Implementation Notes
- Task 1 was approved and implemented.
- Added `src/lib/brainDumps.ts` with data types, storage keys, safe load/save helpers, id generation, default title generation, Markdown filename sanitizing, localStorage validation/fallback handling, and locked template separation.
- No UI components have been implemented yet.
- No backend, auth, database, network dependency, or new package dependency was introduced.
- `npm run lint` passed.
- `npm run build` passed.
- Reviewer follow-up decisions were captured after Task 1: archived saves hidden later, tag chips with comma parsing, selected draft restore, no empty-content saves, and reset-from-template moved to later polish.
- Task 2 was approved and implemented.
- Added `src/components/BrainDumpWorkspace.tsx` with Template Mode, Edit Mode, a compact vertical mode toolbar, a pressed selected-toolbar state, a locked template view, Copy Blank Template action, and an edit workspace shell with active draft content.
- Saved draft tabs, create/delete/rename/export actions, editable autosave behavior, and Brain Dump page integration are intentionally not implemented yet because they belong to later approved tasks.
- `npm run lint` passed after Task 2.
- `npm run build` passed after Task 2.
- Task 3 was approved and implemented.
- Extended `src/components/BrainDumpWorkspace.tsx` with edit-mode-only saved draft tabs, New Save, select, rename, duplicate, delete, Copy Current, and Export `.md` actions.
- Draft actions persist immediately through the Task 1 storage helpers.
- Saved tabs support active state, delete `x`, double-click rename, dynamic width, ellipsis, horizontal overflow, mouse-wheel horizontal scrolling, and a sticky New Save action.
- Archived drafts are filtered out of the main saved draft tab strip.
- Deleting the final saved draft creates/selects a clean blank replacement draft.
- Editable autosave behavior, tag controls, empty-content prompts, and Brain Dump page integration are intentionally not implemented yet because they belong to later approved tasks.
- `npm run lint` passed after Task 3.
- `npm run build` passed after Task 3.
- Task 4 was approved and implemented.
- Extended `src/components/BrainDumpWorkspace.tsx` with editable title, status, tags, and Markdown content controls.
- Added debounced autosave with Saving/Auto-saving/Last saved/error feedback.
- Added removable tag chips with comma-separated input/paste conversion.
- Added localStorage/storage-error handling in the component save path.
- Added empty-content handling so empty drafts are not silently saved and users are prompted when switching away or leaving edit mode for template mode.
- Preserved exact textarea content for save, copy, and export.
- Brain Dump page integration is intentionally not implemented yet because it belongs to Task 5.
- `npm run lint` passed after Task 4.
- `npm run build` passed after Task 4.
- Task 5 was approved and implemented.
- Integrated `BrainDumpWorkspace` into `src/pages/BrainDump.tsx` near the top of the Brain Dump Intake page.
- Kept the existing copy-ready Brain Dump Template card visible as its own section.
- Kept the Brain Dump Processing Prompt visible and copyable.
- Did not modify `src/pages/TemplateLibrary.tsx`; template library content remains unchanged.
- `npm run lint` passed after Task 5.
- `npm run build` passed after Task 5.
- Reviewer polish notes were captured after Task 5: keep the side panel but make mode controls attached like browser tabs, align the side-panel/tab-strip background with the Markdown template surface, consolidate the duplicate Brain Dump Template section into the workspace, and keep a pre-filled example template as a later polish enhancement.
- Task 6 was approved and implemented.
- Updated `src/components/BrainDumpWorkspace.tsx` so the Template/Edit controls keep the compact left side-panel model but read as attached side-mounted tabs on the Markdown-template dark surface.
- Updated `src/pages/BrainDump.tsx` to remove the duplicate standalone Brain Dump Template section; the blank template remains copyable inside the workspace, and the Brain Dump Processing Prompt is now section 2.
- The pre-filled example template mode remains a later polish item and was not implemented in Task 6.
- Reviewer requested an in-between Task 6.5 for the mode switcher: refine Template/Edit from two separate button-like items into one shared vertical segmented control with a shared outer border, no gap, one divider line, parent-only radius, inactive segments blending into the side panel, active inset shadow, and a slim primary left-edge active indicator.
- Task 6.5 was approved and implemented.
- Updated `src/components/BrainDumpWorkspace.tsx` so the mode switcher uses one shared segmented-control container, one outer border, no internal gaps, one divider between modes, equal segment sizing, inactive segments blended into the side panel, active inset shadow, and a slim primary left-edge indicator.
- Reviewer clarified that the segmented mode control should not sit inside padded space because that still reads as floating. Direct low-risk implementation was approved, and the side-panel padding/inner control border radius were removed so the Template/Edit segments attach flush to the panel edges.
- Before Task 7, reviewer requested that future ideas be promoted into explicit tasks. Added Task 8 for the pre-filled example mode/sidebar segment and Reset Current Save from Template. Added Task 9 for archived save access, export/import all saves as JSON, search/filter, and optional Markdown preview polish.
- Task 7 verification was run.
- `npm run lint` passed.
- `npm run build` passed.
- Browser verification confirmed: Brain Dump workspace renders, duplicate standalone Brain Dump Template section is absent, Brain Dump Processing Prompt remains section 2, Template Mode is available, Edit Mode is available, selected draft/content/tags persist after refresh, Copy Blank Template copies the clean template, Copy Current copies the filled Markdown, Duplicate creates copy tabs, New Save remains usable, many saved tabs remain horizontally usable, mobile layout remains readable, and Template Library still renders Brain Dump content.
- Code inspection confirmed: delete uses `window.confirm`, deleting the final save creates a replacement draft, archived drafts are filtered from the main saved draft strip, empty-draft leaving uses confirmation, storage errors are caught, and export creates a Markdown Blob with a sanitized `.md` filename.
- Export button presence was browser-verified, but the Codex in-app browser does not support download events, so the actual file download event could not be observed in-browser.
- Confirmed version-one boundaries: Reset Current Save from Template, pre-filled example mode, Export All Saves, Import Saves, and archived-only view remain planned for Tasks 8/9 and are not present in the current UI.
- Reviewer confirmed that the current Export `.md` download works in their browser.
- Reviewer found a follow-up issue with many saved draft tabs: wheel/trackpad navigation over the tab strip still scrolls the page, making tab navigation difficult. Added Task 7.5 to capture wheel input only over the tab strip, convert it to horizontal tab scrolling, prevent page scroll while the tab strip handles it, and keep normal scrolling elsewhere.
- Reviewer noted that the workspace is polished enough to reuse across other projects and should not remain only Brain Dump-specific. Added Task 10 to extract a reusable Markdown workspace bundle with a three-file copy target: reusable component, storage/data handler, and reusable style tokens, while keeping Brain Dump as a thin wrapper around the generic workspace.
- Task 7.5 was approved and implemented.
- Updated `src/components/BrainDumpWorkspace.tsx` so wheel input over an overflowing saved draft tab strip is captured by the tab bar row, converted into horizontal tab scrolling, stopped from bubbling to page scroll, and paired with `overscroll-contain`. Normal page scrolling remains untouched outside the tab strip.
- Browser gesture testing showed React `onWheel` alone did not reliably stop page scroll in the local browser path, so Task 7.5 was tightened with a native non-passive `wheel` listener on the tab bar row while keeping the React handler as a fallback.
- Reviewer manually tested the Task 7.5 scroll containment fix and confirmed the saved draft tab-strip scrolling now works correctly.
