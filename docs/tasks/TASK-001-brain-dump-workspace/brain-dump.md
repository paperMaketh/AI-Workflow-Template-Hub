# Brain Dump

## Task Name
Brain Dump Workspace

## Goal
The Brain Dump page should allow me to use the template as an editable workspace, not only as static text.

## Requirements
- Keep the existing copy-ready Brain Dump Template.
- Add a "Create New Brain Dump" button.
- Add a saved brain dump list.
- Allow multiple saved brain dumps.
- Each brain dump should have:
  - id
  - title
  - content
  - tags
  - status: draft / ready / used / archived
  - createdAt
  - updatedAt
- Store brain dumps in localStorage.
- Auto-save edits after typing stops.
- Show a "Last saved" timestamp.
- Preserve Markdown formatting exactly.
- Provide buttons:
  - Copy Blank Template
  - Copy Current Brain Dump
  - Duplicate Brain Dump
  - Export Current Brain Dump as .md
  - Delete Brain Dump with confirmation
- The editor should be a large Markdown textarea.
- New brain dumps should start with the blank template prefilled.
- The feature must work fully offline and on GitHub Pages.
- Do not add a backend.
- Do not add authentication.
- Do not use a database.

## Design
- Follow DESIGN.md exactly.
- Keep the UI clean and documentation-like.
- Use the existing card, button, badge, and code block styles.
- Do not invent new colors or visual patterns.
- Keep the saved list easy to scan.
- Make the editor comfortable for long writing.
- Ensure mobile layout works.

## Reviewer UI Direction
The workspace should feel like a single "Template / Edit Workspace" instead of separate unrelated sections.

### Template Mode
- Shows the clean original Markdown template.
- The original template is locked and must not be changed by edit-mode behavior.
- Shows a clear "Template Mode Active" state.
- Provides a Copy Markdown Template / Copy Blank Template action.
- Does not show the saved draft tab strip.

### Edit Mode
- Shows an editable Markdown workspace.
- Shows a clear "Edit Mode Active" state.
- Shows saved filled versions in a top tab panel.
- Allows creating, renaming, switching, duplicating, deleting, copying, and exporting saved filled versions.
- Shows auto-save feedback such as "Auto-saving..." and "Saved locally" / "Last saved".

### Layout Concept
- A compact vertical left panel acts as the mode switcher.
- Main modes:
  - Markdown Template Mode: view the clean original template and copy it.
  - Edit Template Mode: fill in the template, auto-save it, rename saves, duplicate saves, delete saves.
- The top saved-version panel appears only in edit mode.
- The main area changes based on the active mode.

### Left Mode Switcher
- Keep the compact vertical side-panel design.
- Template/Edit controls should feel attached to the workspace panel like side-mounted browser tabs, not detached floating buttons.
- The side-panel/tab-strip background should match the dark Markdown template surface.
- Template/Edit should share one segmented-control container with one outer border, no gap between buttons, one divider line, equal segment sizing, and parent-only border radius.
- Selected mode tab should look physically pressed and connected to the main panel using:
  - inner shadow
  - slightly darker background
  - accent border
  - reduced elevation
- Selected mode tab should add a slim primary indicator on the left edge.
- Unselected mode tab should look raised or neutral while still feeling part of the side panel.
- A third pre-filled example mode/tab may be added later during final polish, but is not part of version one unless separately approved.

### Top Save Panel
- Only visible in edit mode.
- Hidden in template mode.
- Slides/fades down in edit mode.
- Fixed or sticky at the top of the workspace content area.
- Horizontally scrollable.
- Should support mouse wheel horizontal scrolling when hovered.
- Should behave like browser tabs with dynamic widths.

### Saved Version Tabs
Each saved version should behave like a mini browser tab:
- Rename on double-click or edit action.
- Delete with an `x`.
- Active selected state.
- Dynamic width.
- Text ellipsis for long names.
- Horizontal overflow.
- Mouse-wheel horizontal scroll.
- New Save tab/button at the end, ideally pinned or sticky to the right.

## Edge Cases and Bugs to Test Early

### Auto-save Problems
Test against:
- Typing fast causing too many localStorage writes.
- Data not saving before tab switch.
- Browser refresh losing current changes.
- Save collision when two saves have the same display name.
- Corrupted localStorage data breaking the UI.

Best fix:
- Use debounced auto-save.
- Save every 500-1000ms after typing stops.
- Keep a lastSaved timestamp.
- Validate localStorage before loading.
- Fall back to a clean default save if data is broken.

### Template vs Edit Data Getting Mixed
Big risk: accidentally changing the original template while editing.

Prevent this by separating:
- `templateMarkdown` as the original locked source.
- `savedDrafts` as user-created filled versions.
- `activeDraftId` as the currently selected save.

Copy behavior:
- Template mode always copies the clean template.
- Edit mode copies the filled-in edited Markdown.

### Deleting the Active Save
Test:
- Delete current active tab.
- Delete final remaining tab.
- Delete while auto-save is running.
- Accidental delete click.

Better behavior:
- Ask for confirmation when deleting.
- Ask especially when the save has content.
- After delete, select the nearest available save.
- Never allow zero saves in edit mode; create/select a new blank save if needed.

### Too Many Save Tabs
Test with:
- 5 saves.
- 20 saves.
- 50 saves.
- Very long save names.
- Tiny mobile viewport.

Fix:
- Tabs shrink like browser tabs.
- Use text ellipsis.
- Allow horizontal scrolling.
- Support mouse wheel scrolling.
- Keep New Save pinned at the end or sticky right where practical.

### Scroll Issues
Watch for:
- Mouse wheel scrolling the page instead of the tab bar.
- Tab bar trapping scroll forever.
- Fixed top panel covering content.
- Mobile touch scroll being awkward.

Fix:
- Only convert wheel to horizontal scroll when hovering over tab bar.
- Add padding or spacing so sticky panels do not cover editor content.
- Use sticky positioning carefully.

### Markdown Rendering Issues
Test:
- Code blocks.
- Tables.
- Nested lists.
- Checkboxes.
- Headings.
- Very long URLs.
- Large pasted content.
- Special characters.

For the first version:
- Keep it simple with an editable Markdown textarea.
- Copy filled Markdown exactly.
- Optional preview can be considered later.

Future enhancement ideas:
- Toggle between Write and Preview inside edit mode.
- Split view: editor on one side, rendered preview on the other.

### LocalStorage Size Limit
Watch for:
- Large pasted documents.
- Many saved drafts.
- JSON stringify failing.
- Storage quota exceeded.

Fix:
- Catch storage errors.
- Show a storage-full warning.
- Keep export available.
- Consider export all/import later.

### Naming Bugs
Test:
- Empty names.
- Duplicate names.
- Very long names.
- Special characters.
- Renaming while switching tabs.

Fix:
- Default names should be `Untitled 1`, `Untitled 2`, etc.
- Allow duplicate display names but keep unique internal IDs.
- Truncate visually, not in stored data.

## Future Feature Recommendations
- Export Current Save as `.md`.
- Export All Saves as `.json`.
- Import Saves from `.json`.
- Duplicate Current Save.
- Reset Current Save from Template.

Most important future enhancement:
- Reset Current Save from Template, so users can quickly restart a messy draft without deleting the whole save system.

## Acceptance Criteria
- I can create multiple brain dumps.
- I can switch between saved brain dumps.
- Edits auto-save.
- Refreshing the page does not lose saved brain dumps.
- Copy Current Brain Dump copies the exact Markdown content.
- Export creates a .md file.
- Delete asks for confirmation.
- The blank template remains copyable separately.
- No existing template library content is broken.
