# Acceptance Criteria: Brain Dump Workspace

## Functional Requirements
- User can create a new brain dump from the Brain Dump Intake page.
- New brain dumps start with the blank Brain Dump Template prefilled.
- Workspace has Markdown Template Mode and Edit Template Mode.
- Template Mode shows the locked clean original template.
- Edit Mode shows user-created filled versions.
- Saved draft tabs appear only in Edit Mode.
- User can create multiple brain dumps.
- User can switch between saved brain dumps.
- User can rename saved brain dumps.
- User returns to the previously selected brain dump after refresh when that saved draft still exists.
- Tags display as removable chips.
- Comma-separated tag input or paste is converted into separate chips.
- Each saved brain dump includes:
  - id
  - title
  - content
  - tags
  - status
  - createdAt
  - updatedAt
- Status supports only:
  - draft
  - ready
  - used
  - archived
- Brain dumps are stored in localStorage.
- Edits auto-save after typing stops.
- The UI shows a "Last saved" timestamp.
- Refreshing the page does not lose saved brain dumps.
- Copy Blank Template copies the blank template.
- Copy Current Brain Dump copies the exact current Markdown content.
- Duplicate Brain Dump creates a separate saved item.
- Export Current Brain Dump creates a `.md` file.
- Delete Brain Dump asks for confirmation.
- Confirmed delete removes the selected brain dump.
- Deleting the active save selects the nearest available save.
- Deleting the final remaining save in Edit Mode creates/selects a new blank save.
- Duplicate display names do not collide because ids remain unique.
- Empty names fall back to an untitled display name.
- Empty brain dump content is not silently accepted as a normal saved state.
- User is prompted if they try to leave/close/switch away from an empty draft.
- User has an option to delete an empty draft when prompted.
- Archived saves are stored but should not clutter the main saved draft tab strip once archive filtering is implemented.
- Corrupted localStorage does not crash the UI.
- Storage errors are caught and communicated.

## Visual Requirements
- Existing blank Brain Dump Template remains copyable from inside the workspace.
- The Brain Dump page does not repeat the same blank template in multiple page sections.
- Template Mode and Edit Mode are clearly visually distinct.
- Left mode switcher keeps the compact vertical side-panel design.
- Template/Edit mode controls feel attached to the workspace panel like side-mounted browser tabs.
- Side-panel/tab-strip background matches the dark Markdown template background.
- Template/Edit mode controls are one segmented control with a shared outer border, no internal gaps, one divider line, equal segment sizing, and parent-only border radius.
- Selected mode tab appears physically pressed and visually connected to the main panel using inner shadow, darker background, accent border, and reduced elevation.
- Selected mode tab includes a slim primary active indicator on its left edge.
- Unselected mode tab appears neutral or lightly raised while still feeling attached to the side panel.
- Edit-mode saved draft tabs behave visually like mini browser tabs.
- Active saved draft tab is clearly selected.
- Long saved draft names use visual ellipsis without truncating stored data.
- Tags are easy to scan as chips.
- Tag chips can be removed.
- UI remains clean and documentation-like.
- Existing card, button, badge, and code block style language is reused.
- Saved list is easy to scan.
- Editor is comfortable for long writing.
- No new arbitrary colors or visual patterns are introduced.
- Project-root `DESIGN.md` is followed.

## Responsive Requirements
- Workspace is usable on mobile.
- Saved list, controls, and editor do not overlap.
- Textarea remains readable on small screens.
- Long titles, tags, and Markdown content do not break layout.
- Many tags do not break the editor layout.
- Saved draft tabs remain usable with 5, 20, and 50 saves.
- Saved draft tabs support horizontal overflow.
- Mouse-wheel horizontal scrolling works only while hovering the tab strip.
- Sticky/fixed tab panel does not cover editor content.
- Mobile touch scrolling remains usable.

## Accessibility Requirements
- All actions use buttons or proper form controls.
- Editor has a label.
- Title, tags, and status controls have labels.
- Delete action requires confirmation.
- Focus states remain visible.
- Status is readable as text, not only color.

## Performance Requirements
- No backend calls.
- No network dependency.
- No database.
- No authentication.
- No new dependency unless separately approved.
- Auto-save is debounced and does not write on every keystroke.
- Auto-save delay is in the 500-1000ms range after typing stops.
- Switching tabs while a save is pending does not lose content.
- Refreshing while a save is pending does not lose the latest reasonable draft state.
- Empty-content validation does not cause excessive storage writes or data loss.

## Must Not Break
- Template Library still renders all existing templates.
- Brain Dump Processing Prompt remains visible and copyable.
- Existing Brain Dump Template content remains unchanged.
- Template Mode copy always copies the clean template.
- Edit Mode copy always copies the filled draft Markdown.
- Reset Current Save from Template is not included in version one unless separately approved.
- Pre-filled example template mode is not included in version one unless separately approved.
- Existing routes continue to work on GitHub Pages.
- Build still succeeds.
- Typecheck still succeeds.
