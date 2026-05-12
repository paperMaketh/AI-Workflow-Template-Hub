# Tasks: Brain Dump Workspace

## Task 1: Add Workspace Data Utilities
Suggested files:
- `src/components/BrainDumpWorkspace.tsx` or `src/lib/brainDumps.ts`

Work:
- Define `BrainDump` and `BrainDumpStatus` types.
- Define localStorage keys.
- Add safe load/save helpers.
- Add id generation helper.
- Add filename sanitizer for Markdown export.
- Add default title generation such as `Untitled 1`, `Untitled 2`.
- Add tag parsing/normalization helpers for chip UI and comma-separated paste/input.
- Add empty-content validation helper.
- Add safe localStorage validation and fallback handling.
- Keep `templateMarkdown`, `savedDrafts`, and `activeDraftId` separate.

Review checkpoint:
- Confirm storage shape matches the requested fields exactly.
- Confirm no backend, auth, database, or new dependency is introduced.
- Confirm the clean template cannot be modified by edit-mode state.
- Confirm selected draft id can be restored after refresh.
- Confirm tag parsing supports comma-separated input.
- Confirm empty content can be detected before save/close/switch decisions.

## Task 2: Build Workspace Shell and Modes
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`

Work:
- Add Template Mode and Edit Mode.
- Add compact left vertical mode toolbar.
- Add physically pressed selected mode state using DESIGN.md colors and existing UI language.
- Add locked template view with Copy Blank Template.
- Add edit workspace view with active draft area.

Review checkpoint:
- Confirm the workspace matches the intended mode model.
- Confirm template mode does not show saved draft tabs.
- Confirm edit mode does not mutate the original template.

## Task 3: Build Saved Draft Tabs and Actions
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`

Work:
- Add edit-mode-only saved draft tab strip.
- Add create/new save, select, rename, duplicate, delete, copy current, and export behavior.
- Support tab delete with `x`.
- Support rename by double-click or edit action.
- Support dynamic tab width, ellipsis, and horizontal overflow.
- Support mouse-wheel horizontal scrolling while hovering the tab strip.
- Keep New Save at the end, pinned/sticky right if practical.
- Hide archived saves from the main saved draft tab strip once archive behavior/filtering is implemented.

Review checkpoint:
- Confirm many tabs remain usable.
- Confirm delete asks for confirmation and selects the nearest save.
- Confirm deleting the final save creates/selects a clean blank save.
- Confirm archived saves do not clutter the main tab strip once archive handling exists.

## Task 4: Build Editor and Auto-save
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`

Work:
- Add debounced auto-save.
- Add "Saving..." and "Last saved" UI.
- Add title, status, tags, and Markdown textarea controls.
- Implement tags as removable chips with comma-separated input/paste conversion.
- Prompt if the user tries to close, switch away from, or otherwise leave an empty draft, with an option to delete it.
- Catch localStorage and quota errors.
- Preserve exact textarea content for save, copy, and export.

Review checkpoint:
- Confirm all required actions are present.
- Confirm textarea content is not trimmed or transformed.
- Confirm delete requires confirmation.
- Confirm fast typing, tab switching, and refresh do not lose changes.
- Confirm empty content is not silently preserved as a normal saved state.
- Confirm tag chips are removable and comma-separated input converts to chips.

## Task 5: Integrate Workspace Into BrainDump Page
Suggested files:
- `src/pages/BrainDump.tsx`

Work:
- Keep the existing copy-ready Brain Dump Template.
- Add the Template / Edit Workspace near the top of the Brain Dump Intake page.
- Keep the existing Brain Dump Processing Prompt.
- Ensure the blank template remains copyable separately.

Review checkpoint:
- Confirm existing template cards still render.
- Confirm Template Library imports are not affected.

## Task 6: Responsive and Visual Polish
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`
- `src/pages/BrainDump.tsx`

Work:
- Keep the left side-panel design, but make the Template/Edit mode controls feel attached to the workspace panel like side-mounted browser tabs.
- Change the side-panel/tab-strip background to match the dark Markdown template background so the mode controls feel visually integrated.
- Ensure the active mode tab visually connects to the main panel, while inactive mode tabs remain neutral or slightly raised.
- Fold the standalone "Brain Dump Template" page section into the workspace instead of showing a duplicate third copy of the same template on the page.
- Keep the clean template copy action available inside the workspace.
- Keep the editable version available inside the workspace.
- Make saved list easy to scan.
- Make editor comfortable for long writing.
- Ensure mobile layout stacks cleanly.
- Reuse established surface, border, badge, and button styling.
- Avoid new colors or visual patterns.
- Follow project-root `DESIGN.md`.
- Test tiny mobile viewport, long names, and large pasted Markdown.
- Ensure sticky tab panel does not cover content.

Review checkpoint:
- Confirm no invented design system rules.
- Confirm mobile and desktop layouts are readable.
- Confirm the Brain Dump page no longer repeats the same template three times.
- Confirm the clean template remains copyable from inside the workspace.

## Task 6.5: Refine Mode Switcher Segmented Control
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`

Work:
- Keep the compact left side-panel design.
- Replace the floating/separate-card feel of the Template/Edit buttons with one shared vertical segmented control built into the side panel.
- Wrap Template and Edit in one shared outer container.
- Use one shared outer border around the whole control.
- Remove gaps between the mode buttons.
- Use only one divider line between Template and Edit.
- Keep both segments the same width and height.
- Apply border radius only to the parent control, not to each individual segment.
- Let inactive segments blend into the side-panel surface.
- Keep the active segment pressed with inset shadow.
- Add a slim primary active indicator on the left edge of the active segment.
- Do not add new colors or visual patterns outside `DESIGN.md`.

Review checkpoint:
- Confirm the mode switcher no longer reads as two floating cards.
- Confirm Template/Edit reads as one integrated segmented vertical control.
- Confirm active state is clear through the left-edge indicator, inset shadow, and text/icon color.
- Confirm inactive state blends into the side panel but remains readable.
- Confirm mobile layout still works when the control becomes horizontal or stacked as needed.

## Task 7: Verification
Commands:
- `npm run lint`
- `npm run build`

Manual checks:
- Create multiple brain dumps.
- Switch between saved brain dumps.
- Edit and wait for auto-save.
- Refresh and confirm saved data persists.
- Copy blank template.
- Copy current brain dump and compare exact Markdown.
- Duplicate current brain dump.
- Export current brain dump as `.md`.
- Delete and confirm prompt appears.
- Delete active save.
- Delete final remaining save.
- Rename save, including empty and duplicate names.
- Test 5, 20, and 50 saves.
- Test long save names and long URLs.
- Test corrupted localStorage fallback.
- Test storage error handling where practical.
- Test mouse-wheel horizontal scroll over tab strip.
- Test selected draft restore after refresh.
- Test removable tag chips and comma-separated tag paste.
- Test closing/switching away from an empty draft.
- Confirm Reset Current Save from Template is not included in version one.
- Confirm the standalone Brain Dump Template section has been consolidated into the workspace.
- Confirm a pre-filled example template is not included in version one unless separately approved.
- Check Template Library still renders the Brain Dump Template.

Safe commit point:
- Commit after all acceptance criteria pass and reviewer approves.

## Task 7.5: Tab Strip Scroll Containment Fix
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`

Work:
- Improve saved draft tab-strip wheel handling when many draft tabs exist.
- When the pointer is over the saved draft tab strip, capture wheel input for that area.
- Convert vertical wheel delta into horizontal tab-strip scrolling.
- Prevent the page itself from scrolling while the tab strip is handling wheel input.
- Keep normal page scroll behavior everywhere outside the tab strip.
- Add CSS scroll containment such as `overscroll-behavior` where appropriate.
- Preserve touch/mobile scrolling behavior.
- Avoid global scroll locks or page-level event listeners unless clearly needed.

Review checkpoint:
- Confirm many saved tabs can be navigated with the mouse wheel/trackpad without the page also scrolling.
- Confirm the page still scrolls normally when the pointer is not over the tab strip.
- Confirm the tab strip does not trap scroll outside its own hover/focus area.
- Confirm mobile touch scrolling remains usable.

## Task 8: Example Mode and Reset Polish
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`
- `src/lib/brainDumps.ts`

Work:
- Add a third sidebar mode/segment for a pre-filled example brain dump.
- Keep the side-panel mode control visually consistent with Task 6.5 when it has three segments.
- Example mode should show a realistic completed brain dump using the same workspace visual language.
- Example mode should be read-only and must not mutate the clean template or saved drafts.
- Add a "Use Example as New Brain Dump" action that creates a new editable save from the example content.
- Add "Reset Current Save from Template" inside Edit Mode.
- Reset should ask for confirmation before replacing current draft content.
- Reset should preserve the current draft id, title, tags, status, createdAt, and update only content/updatedAt unless a later decision says otherwise.
- Keep Copy Blank Template separate from copy current/example actions.

Review checkpoint:
- Confirm the sidebar mode control remains polished with Template, Edit, and Example segments.
- Confirm the example content is clearly read-only.
- Confirm creating a save from the example does not overwrite existing saves.
- Confirm resetting a draft asks for confirmation and restores the blank template exactly.
- Confirm template, example, and edit content remain separate.

## Task 9: Saved Draft Management and Portability Polish
Suggested files:
- `src/components/BrainDumpWorkspace.tsx`
- `src/lib/brainDumps.ts`

Work:
- Add an archived-only view, filter, or top bar so archived saves remain recoverable without cluttering the main saved draft strip.
- Add Export All Saves as `.json`.
- Add Import Saves from `.json`.
- Validate imported JSON before merging or replacing local saves.
- Avoid id collisions when importing.
- Show a clear warning before replacing local saves, if replace behavior is supported.
- Add saved-draft search/filter if the saved list becomes difficult to scan.
- Consider a Write/Preview toggle or split Markdown preview only if it can be kept clean, offline, and dependency-light.

Review checkpoint:
- Confirm archived drafts can be found again after being hidden from the main tab strip.
- Confirm export-all produces valid JSON containing all expected brain dump fields.
- Confirm import handles invalid/corrupt JSON without breaking the UI.
- Confirm imports do not silently overwrite unrelated local saves.
- Confirm any preview feature preserves the exact Markdown source.

## Task 10: Extract Reusable Markdown Workspace Package
Suggested files:
- `src/workspace/markdown-workspace/MarkdownWorkspace.tsx`
- `src/workspace/markdown-workspace/markdownWorkspaceStorage.ts`
- `src/workspace/markdown-workspace/markdownWorkspaceStyles.ts`
- Optional: `src/workspace/markdown-workspace/index.ts`
- Keep `src/components/BrainDumpWorkspace.tsx` as a thin project-specific wrapper if useful.

Goal:
- Turn the Brain Dump Workspace into a reusable local Markdown workspace that can be copied into other projects with as few files as possible.
- Target copy bundle should be three files:
  - `MarkdownWorkspace.tsx` - reusable React component and subcomponents.
  - `markdownWorkspaceStorage.ts` - types, localStorage handling, draft creation, duplication, import/export helpers, validation, filename sanitizing.
  - `markdownWorkspaceStyles.ts` - reusable class-name/style tokens for projects using Tailwind or a similar class setup.

Proposed folder structure:
```text
src/
  workspace/
    markdown-workspace/
      MarkdownWorkspace.tsx
      markdownWorkspaceStorage.ts
      markdownWorkspaceStyles.ts
      index.ts
```

Reusable API shape:
```ts
<MarkdownWorkspace
  title="Brain Dump Workspace"
  storageKey="ai-workflow-template-hub:brain-dumps:v1"
  selectedStorageKey="ai-workflow-template-hub:selected-brain-dump-id:v1"
  templateLabel="Template"
  templateMarkdown={BRAIN_DUMP_TEMPLATE}
  defaultDraftTitlePrefix="Untitled"
  statuses={['draft', 'ready', 'used', 'archived']}
/>
```

Work:
- Rename generic data concepts away from `BrainDump` naming:
  - `BrainDump` -> `MarkdownWorkspaceDraft`
  - `BrainDumpStatus` -> `MarkdownWorkspaceStatus`
  - `BrainDumpStorageState` -> `MarkdownWorkspaceStorageState`
  - `createBrainDump` -> `createWorkspaceDraft`
  - `duplicateBrainDump` -> `duplicateWorkspaceDraft`
- Make template Markdown, labels, storage keys, default title prefix, allowed statuses, and optional example content configurable through props.
- Keep the current Brain Dump page behavior unchanged by using a small wrapper that passes Brain Dump-specific props into the generic component.
- Keep the component backend-free, auth-free, database-free, and fully offline.
- Keep localStorage optional/injectable where practical so other projects can test or swap storage behavior.
- Keep browser APIs isolated in the storage/action layer where possible:
  - clipboard copy
  - `.md` export
  - `.json` export/import once Task 9 exists
- Move hard-coded style class groups into `markdownWorkspaceStyles.ts` so visual reuse requires fewer edits.
- Keep Tailwind as the default styling approach, but avoid project-specific class names that only work in this site unless they are defined in the style file.
- Document the minimal copy instructions in comments or a short README block:
  - copy the three workspace files
  - install/keep `react` and `lucide-react`
  - provide template Markdown and storage keys
  - ensure Tailwind classes or equivalent tokens exist

Review checkpoint:
- Confirm Brain Dump page still behaves exactly the same after the generic extraction.
- Confirm another page can instantiate the workspace with different labels/template/storage keys.
- Confirm the three-file bundle is understandable without reading the whole site.
- Confirm generic files do not import from `src/data/templates.ts` or other Brain Dump-specific files.
- Confirm project-specific Brain Dump wrapper is the only place that knows about `BRAIN_DUMP_TEMPLATE`.
- Confirm no backend, auth, database, or new dependency is introduced.
- Confirm `npm run lint` and `npm run build` pass after extraction.
