# Design: Brain Dump Workspace

## Technical Approach
Implement the workspace as client-only React state backed by `localStorage`. No backend, database, auth, or network dependency should be introduced.

Recommended storage key:

```text
ai-workflow-template-hub:brain-dumps:v1
```

Recommended selected item key:

```text
ai-workflow-template-hub:selected-brain-dump-id:v1
```

Use a versioned key so future data migrations can be handled deliberately.

Archived saves should remain in storage but should be hidden from the main edit-mode saved draft tab strip once archive filtering is implemented. A later final-polish pass may add a separate archived-only top bar or filter.

## Data Model
```ts
type BrainDumpWorkspaceMode = 'template' | 'edit';
type BrainDumpStatus = 'draft' | 'ready' | 'used' | 'archived';

interface BrainDump {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: BrainDumpStatus;
  createdAt: string;
  updatedAt: string;
}
```

Use ISO strings for `createdAt` and `updatedAt`.

Important state separation:

```ts
const templateMarkdown = BRAIN_DUMP_TEMPLATE;
const savedDrafts: BrainDump[] = [];
let activeDraftId: string | null = null;
```

The original template must remain a locked source. Editing must only update saved drafts.

## Component Structure
Keep implementation scoped to the Brain Dump feature. A reasonable split is:

- `src/pages/BrainDump.tsx`
  - Page composition.
  - Adds the workspace section.
  - Keeps the existing processing prompt section.
  - Does not keep a separate duplicate Brain Dump Template page section once the template is available inside the workspace.
- `src/components/BrainDumpWorkspace.tsx`
  - Owns mode state, localStorage loading/saving, selected item state, auto-save status, tab behavior, and workspace actions.
- Optional smaller components if useful:
  - `BrainDumpModeToolbar`
  - `BrainDumpTabs`
  - `BrainDumpEditor`
  - `BrainDumpActions`

Do not over-abstract unless the page becomes hard to read.

## State and Persistence
On mount:
- Read saved brain dumps from localStorage.
- Validate that parsed data is an array.
- If parsing fails, do not crash the app.
- If localStorage data is missing or corrupted, fall back to a clean default save when entering edit mode.
- Read selected brain dump id if present.
- Restore the selected brain dump id after refresh if that draft still exists and is not hidden by the active view/filter.
- If no saved item exists in template mode, keep showing the locked template.
- If no saved item exists in edit mode, create/select a default blank save.

On create:
- Generate a unique id with `crypto.randomUUID()` if available.
- Fallback to a timestamp/random string if needed.
- Prefill `content` with `BRAIN_DUMP_TEMPLATE`.
- Use default titles such as `Untitled 1`, `Untitled 2`, etc.
- Use `draft` status.
- Use empty tags.
- Set createdAt and updatedAt to current ISO time.
- Save immediately and select the new item.

On edit:
- Update local draft state immediately.
- Debounce persistence so typing does not write to localStorage on every keystroke.
- Suggested debounce: 500-1000ms after typing stops.
- Update `updatedAt` when persistence occurs.
- Show a transient "Auto-saving..." / "Saving..." state while pending and a "Last saved" / "Saved locally" timestamp after persistence.
- Catch localStorage quota or stringify errors and show a storage warning instead of failing silently.
- Empty content should not be accepted as a normal saved state. If the user tries to leave, close, or switch away from an empty draft, prompt them and offer a delete option.

On switch:
- If current edits are pending, save before changing selection or ensure the pending save uses the correct item id.
- Select the target brain dump and populate editor fields from it.
- Renaming while switching tabs must not lose title changes.

On duplicate:
- Copy title, content, tags, and status from current item.
- New id.
- New createdAt and updatedAt.
- Title should indicate it is a copy, for example `Original Title Copy`.
- Save and select the duplicate.

On delete:
- Use `window.confirm`.
- Remove the current item only after confirmation.
- Ask for confirmation especially when the save has content.
- Select the nearest available save after deletion.
- If the final remaining save is deleted in edit mode, immediately create/select a new blank save.
- Never allow zero saves while edit mode is active.
- Save the updated list.

On archive:
- Archived drafts should stay in localStorage.
- Archived drafts should be hidden from the main saved draft tab strip once archive filtering exists.
- Later polish may add a separate archived-only top bar or filter.

On rename:
- Allow rename through double-click or an edit action on the tab.
- Empty titles should fall back to an untitled name.
- Duplicate display names are allowed because ids are unique.
- Store the full title; only truncate visually.

On tags:
- Use removable chips as the primary UI.
- Support comma-separated input/paste as a convenience.
- If the user enters `seo, agent-guide, design-md`, convert it into separate tags.
- Trim whitespace around tags.
- Ignore empty tag entries.
- Avoid duplicate tags on the same draft.

## Markdown Preservation
The editor should be a plain `<textarea>`.

Do not transform line endings, trim content, render Markdown into HTML, or normalize whitespace during save, copy, or export. The exact string in the textarea should be what is copied/exported.

Test Markdown content with:
- Code blocks.
- Tables.
- Nested lists.
- Checkboxes.
- Headings.
- Very long URLs.
- Large pasted content.
- Special characters.

## Export Behavior
Create a Blob with MIME type `text/markdown;charset=utf-8`.

Filename should be derived from the brain dump title, sanitized for filesystem safety, and end in `.md`.

Example:

```text
brain-dump-workspace.md
```

## UI / UX Approach
The workspace should feel like part of the existing documentation interface:

- Use existing dark surface cards, borders, subdued labels, and mono metadata.
- Use existing button patterns from current links/buttons.
- Use `Badge` for status or tags where appropriate.
- Keep actions grouped near the editor/list.
- The editor should be large, readable, and comfortable for long writing.
- Mobile layout should stack list, metadata controls, actions, and editor.
- Desktop layout should use a single workspace frame with a compact vertical mode side panel on the left and the active template/editor area on the right.

### Workspace Modes
Template Mode:
- Shows "Template Mode Active".
- Shows the locked clean Markdown template.
- Shows Copy Blank Template / Copy Markdown Template.
- Does not show the saved draft tab strip.

Edit Mode:
- Shows "Edit Mode Active".
- Shows the saved draft tab strip at the top of the workspace.
- Shows current draft controls and Markdown textarea.
- Shows auto-save status.
- Copy action copies the filled-in Markdown.

### Left Mode Side Panel
- Keep the compact vertical side-panel layout.
- Mode controls should feel attached to the workspace panel, like browser tabs mounted on the side rather than detached floating toolbar buttons.
- Use icon-first controls where practical.
- The tab strip/side-panel background should use the same dark surface as the Markdown template area, rather than a mismatched random dark tone.
- The Template/Edit controls should be one segmented vertical control with a shared outer border, no gaps, one divider line, equal segment sizing, and border radius applied only to the parent control.
- Active Template/Edit tab should visually connect to the main panel and look physically pressed with:
  - inner shadow
  - slightly darker background
  - accent border
  - reduced elevation
- Active Template/Edit tab should include a slim primary indicator on the left edge.
- Inactive Template/Edit tab should look neutral or slightly raised, but still connected to the side panel.
- A later polish pass may add a third attached tab/mode for a pre-filled example template.

### Saved Draft Tab Strip
- Visible only in edit mode.
- Hidden in template mode.
- Slides/fades down when entering edit mode, using restrained motion only.
- Sticky within the workspace content area when practical.
- Horizontally scrollable.
- Mouse wheel should convert to horizontal scrolling only while the tab strip is hovered.
- Avoid trapping vertical page scroll.
- Add enough spacing so sticky/fixed panels do not cover editor content.
- New Save should sit at the end of the tab row and be pinned/sticky to the right where practical.

Each saved draft tab should:
- Behave like a mini browser tab.
- Support active selected state.
- Support delete with an `x`.
- Support rename on double-click or edit action.
- Use dynamic width.
- Shrink as tab count grows.
- Use visual ellipsis for long names without truncating stored titles.
- Handle 5, 20, and 50 saves.

## Accessibility Notes
- Buttons must use real `<button>` elements.
- The textarea must have a visible label.
- Title, tags, and status controls need labels.
- Confirmation must prevent accidental delete.
- Focus states should remain visible.
- Do not rely on color alone to communicate status.

## SEO / GEO Notes
This is a client-side workspace feature and does not need indexable saved content. Existing static page content should remain crawlable.

## Animation Notes
Use only restrained, functional motion. The edit-mode saved draft tab strip may slide/fade into place, but animation must be subtle and must not affect usability.

## Edge Cases
- localStorage unavailable or quota exceeded.
- Corrupted localStorage JSON.
- No saved brain dumps yet.
- Deleting the active brain dump.
- Duplicating a long brain dump.
- Empty title.
- Empty content.
- Tags with extra spaces.
- Comma-separated tag paste.
- Duplicate tags.
- User refreshes while an auto-save is pending.
- User switches brain dumps while an auto-save is pending.
- User types quickly for an extended period.
- Two saves have the same display name.
- Many saves with very long names.
- Tiny mobile viewport.
- Mouse wheel scroll over the tab strip.
- Deleting while an auto-save is running.
- Closing or switching away from an empty draft.

## Future Enhancements
- Write/Preview toggle inside edit mode.
- Split editor and rendered Markdown preview.
- Add a third workspace mode/button for a pre-filled example template so users can see what a completed brain dump looks like.
- Export all saves as `.json`.
- Import saves from `.json`.
- Reset current save from template.
- Separate archived-only top bar or archive filter.

The most important future enhancement is Reset Current Save from Template, because users may want to restart a messy draft without deleting the save system.

## Design Dependency
`DESIGN.md` is now present in the project root and must be followed during implementation.
