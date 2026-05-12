import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Copy, Download, Edit3, FileText, LockKeyhole, Plus, Save, X } from 'lucide-react';
import {
  BrainDump,
  BrainDumpStatus,
  BrainDumpStorageState,
  BrainDumpWorkspaceMode,
  addBrainDumpTags,
  createBrainDump,
  duplicateBrainDump,
  ensureEditableBrainDumpState,
  hasBrainDumpContent,
  loadBrainDumpStorage,
  normalizeBrainDumpTitle,
  removeBrainDumpTag,
  sanitizeMarkdownFilename,
  saveBrainDumpStorage,
  templateMarkdown,
} from '../lib/brainDumps';

interface ModeOption {
  id: BrainDumpWorkspaceMode;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const MODES: ModeOption[] = [
  { id: 'template', label: 'Template', icon: FileText },
  { id: 'edit', label: 'Edit', icon: Edit3 },
];

const SAVE_DELAY_MS = 700;

export default function BrainDumpWorkspace() {
  const [mode, setMode] = useState<BrainDumpWorkspaceMode>('template');
  const [templateCopied, setTemplateCopied] = useState(false);
  const initialEditableState = useMemo(
    () => ensureEditableBrainDumpState(loadBrainDumpStorage().data),
    [],
  );
  const [draftState, setDraftState] = useState<BrainDumpStorageState>(initialEditableState);
  const [currentCopiedDraftId, setCurrentCopiedDraftId] = useState<string | null>(null);
  const [renamingDraftId, setRenamingDraftId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [saveState, setSaveState] = useState<'idle' | 'pending' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const pendingSaveTimeoutRef = useRef<number | null>(null);
  const visibleDrafts = draftState.savedDrafts.filter((draft) => draft.status !== 'archived');
  const activeDraft = draftState.savedDrafts.find(
    (draft) => draft.id === draftState.activeDraftId,
  ) ?? visibleDrafts[0] ?? draftState.savedDrafts[0];

  useEffect(() => () => {
    if (pendingSaveTimeoutRef.current) {
      window.clearTimeout(pendingSaveTimeoutRef.current);
    }
  }, []);

  const persistDraftState = (nextState: BrainDumpStorageState, options: { immediate?: boolean } = {}) => {
    const normalizedState = ensureEditableBrainDumpState(nextState);
    setDraftState(normalizedState);

    if (pendingSaveTimeoutRef.current) {
      window.clearTimeout(pendingSaveTimeoutRef.current);
      pendingSaveTimeoutRef.current = null;
    }

    const saveNow = () => {
      const emptyDraft = normalizedState.savedDrafts.find((draft) => !hasBrainDumpContent(draft.content));

      if (emptyDraft) {
        setStorageError(`"${emptyDraft.title}" is empty and has not been saved.`);
        setSaveState('error');
        return;
      }

      setSaveState('saving');
      const result = saveBrainDumpStorage(normalizedState);

      if (result.ok) {
        setDraftState(result.data);
        setLastSavedAt(new Date().toISOString());
        setStorageError(null);
        setSaveState('saved');
      } else {
        setStorageError(result.error ?? 'Could not save brain dumps.');
        setSaveState('error');
      }
    };

    if (options.immediate) {
      saveNow();
      return;
    }

    setSaveState('pending');
    pendingSaveTimeoutRef.current = window.setTimeout(saveNow, SAVE_DELAY_MS);
  };

  const changeMode = (nextMode: BrainDumpWorkspaceMode) => {
    if (mode === 'edit' && nextMode === 'template' && activeDraft && !confirmLeavingEmptyDraft(activeDraft)) {
      return;
    }

    setMode(nextMode);
  };

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(templateMarkdown);
      setTemplateCopied(true);
      setTimeout(() => setTemplateCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy brain dump template', error);
    }
  };

  const createDraft = () => {
    const newDraft = createBrainDump(draftState.savedDrafts);
    persistDraftState({
      savedDrafts: [...draftState.savedDrafts, newDraft],
      activeDraftId: newDraft.id,
    }, { immediate: true });
    setMode('edit');
  };

  const selectDraft = (draftId: string) => {
    if (activeDraft && draftId !== activeDraft.id && !confirmLeavingEmptyDraft(activeDraft)) {
      return;
    }

    persistDraftState({
      savedDrafts: draftState.savedDrafts,
      activeDraftId: draftId,
    }, { immediate: true });
  };

  const startRename = (draft: BrainDump) => {
    setRenamingDraftId(draft.id);
    setRenameValue(draft.title);
  };

  const commitRename = () => {
    if (!renamingDraftId) {
      return;
    }

    persistDraftState({
      savedDrafts: draftState.savedDrafts.map((draft) => (
        draft.id === renamingDraftId
          ? {
            ...draft,
            title: normalizeBrainDumpTitle(renameValue, draft.title),
            updatedAt: new Date().toISOString(),
          }
          : draft
      )),
      activeDraftId: draftState.activeDraftId,
    }, { immediate: true });
    setRenamingDraftId(null);
    setRenameValue('');
  };

  const cancelRename = () => {
    setRenamingDraftId(null);
    setRenameValue('');
  };

  const duplicateDraft = () => {
    if (!activeDraft) {
      return;
    }

    const duplicatedDraft = duplicateBrainDump(activeDraft, draftState.savedDrafts);
    persistDraftState({
      savedDrafts: [...draftState.savedDrafts, duplicatedDraft],
      activeDraftId: duplicatedDraft.id,
    }, { immediate: true });
  };

  const deleteDraft = (draftId: string) => {
    const draftToDelete = draftState.savedDrafts.find((draft) => draft.id === draftId);

    if (!draftToDelete) {
      return;
    }

    const shouldDelete = window.confirm(`Delete "${draftToDelete.title}"? This saved brain dump will be removed from this browser.`);

    if (!shouldDelete) {
      return;
    }

    const remainingDrafts = draftState.savedDrafts.filter((draft) => draft.id !== draftId);
    const visibleRemainingDrafts = remainingDrafts.filter((draft) => draft.status !== 'archived');
    const currentIndex = visibleDrafts.findIndex((draft) => draft.id === draftId);
    const nearestDraft = visibleRemainingDrafts[Math.max(0, currentIndex - 1)] ?? visibleRemainingDrafts[0] ?? remainingDrafts[0];

    if (remainingDrafts.length === 0) {
      const replacementDraft = createBrainDump();
      persistDraftState({
        savedDrafts: [replacementDraft],
        activeDraftId: replacementDraft.id,
      }, { immediate: true });
      return;
    }

    persistDraftState({
      savedDrafts: remainingDrafts,
      activeDraftId: nearestDraft?.id ?? null,
    }, { immediate: true });
  };

  const copyCurrentDraft = async () => {
    if (!activeDraft) {
      return;
    }

    try {
      await navigator.clipboard.writeText(activeDraft.content);
      setCurrentCopiedDraftId(activeDraft.id);
      setTimeout(() => setCurrentCopiedDraftId(null), 2000);
    } catch (error) {
      console.error('Failed to copy current brain dump', error);
    }
  };

  const exportCurrentDraft = () => {
    if (!activeDraft) {
      return;
    }

    const blob = new Blob([activeDraft.content], { type: 'text/markdown;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = sanitizeMarkdownFilename(activeDraft.title);
    link.click();
    URL.revokeObjectURL(objectUrl);
  };

  const updateActiveDraft = (updates: Partial<Pick<BrainDump, 'title' | 'content' | 'tags' | 'status'>>) => {
    if (!activeDraft) {
      return;
    }

    persistDraftState({
      savedDrafts: draftState.savedDrafts.map((draft) => (
        draft.id === activeDraft.id
          ? {
            ...draft,
            ...updates,
            title: updates.title !== undefined ? normalizeBrainDumpTitle(updates.title, draft.title) : draft.title,
            updatedAt: new Date().toISOString(),
          }
          : draft
      )),
      activeDraftId: activeDraft.id,
    });
  };

  const addTagsToActiveDraft = () => {
    if (!activeDraft || !tagInput.trim()) {
      return;
    }

    updateActiveDraft({
      tags: addBrainDumpTags(activeDraft.tags, tagInput),
    });
    setTagInput('');
  };

  const removeTagFromActiveDraft = (tag: string) => {
    if (!activeDraft) {
      return;
    }

    updateActiveDraft({
      tags: removeBrainDumpTag(activeDraft.tags, tag),
    });
  };

  const confirmLeavingEmptyDraft = (draft: BrainDump): boolean => {
    if (hasBrainDumpContent(draft.content)) {
      return true;
    }

    const shouldDelete = window.confirm(`"${draft.title}" is empty. Delete this empty brain dump instead?`);

    if (shouldDelete) {
      deleteDraft(draft.id);
    }

    return shouldDelete;
  };

  return (
    <section className="bg-surface border border-[#334155] rounded-lg overflow-hidden">
      <div className="border-b border-[#334155] bg-surface-low px-4 py-3 md:px-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Template / Edit Workspace
            </p>
            <h2 className="text-xl font-semibold text-on-background">
              Brain Dump Workspace
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {mode === 'template' ? 'Template Mode Active' : 'Edit Mode Active'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[104px_minmax(0,1fr)]">
        <div className="border-b border-[#334155] bg-[#0B1120] md:border-b-0 md:border-r">
          <div className="flex overflow-hidden bg-[#0B1120] md:flex-col">
            {MODES.map((option) => {
              const Icon = option.icon;
              const isActive = mode === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => changeMode(option.id)}
                  aria-pressed={isActive}
                  title={`${option.label} mode`}
                  className={`
                    group relative flex min-h-14 flex-1 items-center justify-center border-r border-[#334155] px-3 py-2
                    transition-[background-color,border-color,box-shadow,color,transform]
                    last:border-r-0
                    focus:outline-none focus:ring-1 focus:ring-primary
                    md:min-h-16 md:w-full md:flex-none md:border-b md:border-r-0 md:last:border-b-0
                    ${isActive
                      ? 'bg-[#0B1120] text-primary shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)]'
                      : 'bg-transparent text-on-surface-variant hover:bg-surface-low/30 hover:text-on-surface'
                    }
                  `}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 bg-primary"
                    />
                  )}
                  <span className="flex flex-col items-center gap-1">
                    <Icon size={20} className={isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'} />
                    <span className="font-mono text-[10px] uppercase tracking-widest">
                      {option.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 bg-background">
          {mode === 'template' ? (
            <TemplateMode onCopyTemplate={copyTemplate} copied={templateCopied} />
          ) : (
            <EditMode
              activeDraft={activeDraft}
              copied={currentCopiedDraftId === activeDraft?.id}
              draftState={draftState}
              onCancelRename={cancelRename}
              onCommitRename={commitRename}
              onCopyCurrentDraft={copyCurrentDraft}
              onCreateDraft={createDraft}
              onDeleteDraft={deleteDraft}
              onDuplicateDraft={duplicateDraft}
              onExportCurrentDraft={exportCurrentDraft}
              onAddTags={addTagsToActiveDraft}
              onRemoveTag={removeTagFromActiveDraft}
              onRenameValueChange={setRenameValue}
              onSelectDraft={selectDraft}
              onStartRename={startRename}
              onTagInputChange={setTagInput}
              onUpdateDraft={updateActiveDraft}
              renameValue={renameValue}
              renamingDraftId={renamingDraftId}
              saveState={saveState}
              storageError={storageError}
              tagInput={tagInput}
              lastSavedAt={lastSavedAt}
              visibleDrafts={visibleDrafts}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function TemplateMode({ onCopyTemplate, copied }: { onCopyTemplate: () => void; copied: boolean }) {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b border-[#334155] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
            <LockKeyhole size={19} />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Template Mode Active
            </p>
            <h3 className="text-lg font-semibold text-on-background">
              Original Brain Dump Template
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onCopyTemplate}
          className="inline-flex items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-sm font-bold text-on-primary transition-colors hover:bg-primary-hover focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <Copy size={16} />
          {copied ? 'Copied Template' : 'Copy Blank Template'}
        </button>
      </div>

      <div className="rounded-lg border border-[#334155] bg-[#0B1120]">
        <div className="border-b border-[#334155] bg-surface/50 px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
            markdown template
          </span>
        </div>
        <div className="max-h-[520px] overflow-auto p-5">
          <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#c4e7ff]">
            <code>{templateMarkdown}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

interface EditModeProps {
  activeDraft: BrainDump;
  copied: boolean;
  draftState: BrainDumpStorageState;
  onCancelRename: () => void;
  onCommitRename: () => void;
  onCopyCurrentDraft: () => void;
  onCreateDraft: () => void;
  onDeleteDraft: (draftId: string) => void;
  onDuplicateDraft: () => void;
  onExportCurrentDraft: () => void;
  onAddTags: () => void;
  onRemoveTag: (tag: string) => void;
  onRenameValueChange: (value: string) => void;
  onSelectDraft: (draftId: string) => void;
  onStartRename: (draft: BrainDump) => void;
  onTagInputChange: (value: string) => void;
  onUpdateDraft: (updates: Partial<Pick<BrainDump, 'title' | 'content' | 'tags' | 'status'>>) => void;
  renameValue: string;
  renamingDraftId: string | null;
  saveState: 'idle' | 'pending' | 'saving' | 'saved' | 'error';
  storageError: string | null;
  tagInput: string;
  lastSavedAt: string | null;
  visibleDrafts: BrainDump[];
}

function EditMode({
  activeDraft,
  copied,
  draftState,
  onCancelRename,
  onCommitRename,
  onCopyCurrentDraft,
  onCreateDraft,
  onDeleteDraft,
  onDuplicateDraft,
  onExportCurrentDraft,
  onAddTags,
  onRemoveTag,
  onRenameValueChange,
  onSelectDraft,
  onStartRename,
  onTagInputChange,
  onUpdateDraft,
  renameValue,
  renamingDraftId,
  saveState,
  storageError,
  tagInput,
  lastSavedAt,
  visibleDrafts,
}: EditModeProps) {
  return (
    <div className="space-y-4">
      <DraftTabs
        activeDraftId={draftState.activeDraftId}
        drafts={visibleDrafts}
        onCancelRename={onCancelRename}
        onCommitRename={onCommitRename}
        onCreateDraft={onCreateDraft}
        onDeleteDraft={onDeleteDraft}
        onRenameValueChange={onRenameValueChange}
        onSelectDraft={onSelectDraft}
        onStartRename={onStartRename}
        renameValue={renameValue}
        renamingDraftId={renamingDraftId}
      />

      <div className="space-y-4 p-4 pt-0 md:p-6 md:pt-0">
      <div className="flex flex-col gap-4 border-b border-[#334155] pb-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
            <Edit3 size={19} />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Edit Mode Active
            </p>
            <label className="mt-2 block">
              <span className="sr-only">Brain dump title</span>
              <input
                value={activeDraft.title}
                onChange={(event) => onUpdateDraft({ title: event.target.value })}
                className="w-full rounded border border-[#334155] bg-[#0B1120] px-3 py-2 text-lg font-semibold text-on-background outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="brain-dump-status">Brain dump status</label>
          <select
            id="brain-dump-status"
            value={activeDraft.status}
            onChange={(event) => onUpdateDraft({ status: event.target.value as BrainDumpStatus })}
            className="rounded border border-[#334155] bg-[#0B1120] px-3 py-2 font-mono text-xs uppercase tracking-wider text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="draft">Draft</option>
            <option value="ready">Ready</option>
            <option value="used">Used</option>
            <option value="archived">Archived</option>
          </select>
          <button
            type="button"
            onClick={onCopyCurrentDraft}
            className="inline-flex items-center gap-2 rounded border border-[#334155] px-3 py-2 text-xs font-bold text-on-surface transition-colors hover:bg-surface-highest focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <Copy size={14} />
            {copied ? 'Copied' : 'Copy Current'}
          </button>
          <button
            type="button"
            onClick={onDuplicateDraft}
            className="inline-flex items-center gap-2 rounded border border-[#334155] px-3 py-2 text-xs font-bold text-on-surface transition-colors hover:bg-surface-highest focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <Copy size={14} />
            Duplicate
          </button>
          <button
            type="button"
            onClick={onExportCurrentDraft}
            className="inline-flex items-center gap-2 rounded bg-primary px-3 py-2 text-xs font-bold text-on-primary transition-colors hover:bg-primary-hover focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <Download size={14} />
            Export .md
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-2">
          <label htmlFor="brain-dump-tags" className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 rounded-lg border border-[#334155] bg-[#0B1120] p-3">
            {activeDraft.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="rounded-full text-primary/80 transition-colors hover:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <input
              id="brain-dump-tags"
              value={tagInput}
              onBlur={onAddTags}
              onChange={(event) => onTagInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ',') {
                  event.preventDefault();
                  onAddTags();
                }
              }}
              placeholder="Add tag, or paste seo, design-md"
              className="min-w-[180px] flex-1 bg-transparent font-mono text-xs text-on-surface outline-none placeholder:text-on-surface-variant/60"
            />
          </div>
        </div>

        <SaveStatus state={saveState} lastSavedAt={lastSavedAt} storageError={storageError} />
      </div>

      <label className="block space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
          Markdown Editor
        </span>
        <textarea
          aria-label="Brain dump markdown editor"
          value={activeDraft.content}
          onChange={(event) => onUpdateDraft({ content: event.target.value })}
          className="min-h-[520px] w-full resize-y rounded-lg border border-[#334155] bg-[#0B1120] p-5 font-mono text-[13px] leading-relaxed text-[#c4e7ff] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </label>
      </div>
    </div>
  );
}

function SaveStatus({
  state,
  lastSavedAt,
  storageError,
}: {
  state: 'idle' | 'pending' | 'saving' | 'saved' | 'error';
  lastSavedAt: string | null;
  storageError: string | null;
}) {
  const savedText = lastSavedAt
    ? `Last saved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'Not saved yet';
  const label = state === 'pending'
    ? 'Auto-saving...'
    : state === 'saving'
      ? 'Saving...'
      : state === 'error'
        ? storageError ?? 'Storage error'
        : savedText;

  return (
    <div className={`
      inline-flex items-center gap-2 rounded border px-3 py-2 font-mono text-[11px] uppercase tracking-widest
      ${state === 'error'
        ? 'border-[#fb7185]/40 bg-[#fb7185]/10 text-[#fb7185]'
        : 'border-[#334155] bg-surface text-on-surface-variant'
      }
    `}>
      <Save size={13} />
      {label}
    </div>
  );
}

interface DraftTabsProps {
  activeDraftId: string | null;
  drafts: BrainDump[];
  onCancelRename: () => void;
  onCommitRename: () => void;
  onCreateDraft: () => void;
  onDeleteDraft: (draftId: string) => void;
  onRenameValueChange: (value: string) => void;
  onSelectDraft: (draftId: string) => void;
  onStartRename: (draft: BrainDump) => void;
  renameValue: string;
  renamingDraftId: string | null;
}

function DraftTabs({
  activeDraftId,
  drafts,
  onCancelRename,
  onCommitRename,
  onCreateDraft,
  onDeleteDraft,
  onRenameValueChange,
  onSelectDraft,
  onStartRename,
  renameValue,
  renamingDraftId,
}: DraftTabsProps) {
  const tabWheelRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheelContainer = tabWheelRef.current;

    if (!wheelContainer) {
      return undefined;
    }

    const handleWheel = (event: WheelEvent) => {
      const scrollContainer = tabScrollRef.current;

      if (!scrollContainer || scrollContainer.scrollWidth <= scrollContainer.clientWidth) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      scrollContainer.scrollLeft += event.deltaY + event.deltaX;
    };

    wheelContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wheelContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const scrollContainer = tabScrollRef.current;

    if (!scrollContainer || scrollContainer.scrollWidth <= scrollContainer.clientWidth) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    scrollContainer.scrollLeft += event.deltaY + event.deltaX;
  };

  return (
    <div className="sticky top-0 z-10 border-b border-[#334155] bg-surface-low/95 backdrop-blur-sm">
      <div
        ref={tabWheelRef}
        onWheel={handleWheel}
        className="flex min-w-0 items-stretch overscroll-contain"
      >
        <div
          ref={tabScrollRef}
          className="flex min-w-0 flex-1 overflow-x-auto overscroll-contain scrollbar-none"
        >
          {drafts.map((draft) => {
            const isActive = draft.id === activeDraftId;
            const isRenaming = draft.id === renamingDraftId;

            return (
              <div
                key={draft.id}
                className={`
                  flex min-w-[128px] max-w-[220px] shrink items-center gap-2 border-r border-[#334155] px-3 py-2
                  ${isActive ? 'bg-background text-primary shadow-[inset_0_-2px_0_var(--color-primary)]' : 'bg-surface-low text-on-surface-variant'}
                `}
              >
                {isRenaming ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onBlur={onCommitRename}
                    onChange={(event) => onRenameValueChange(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        onCommitRename();
                      }
                      if (event.key === 'Escape') {
                        onCancelRename();
                      }
                    }}
                    className="min-w-0 flex-1 rounded-sm border border-primary bg-[#0B1120] px-2 py-1 font-mono text-[11px] text-on-surface outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectDraft(draft.id)}
                    onDoubleClick={() => onStartRename(draft)}
                    className="min-w-0 flex-1 truncate text-left font-mono text-[11px] font-semibold uppercase tracking-wider focus:outline-none focus:text-primary"
                    title={`${draft.title} - double-click to rename`}
                  >
                    {draft.title}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onDeleteDraft(draft.id)}
                  className="shrink-0 rounded-sm p-1 text-on-surface-variant transition-colors hover:bg-surface-highest hover:text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label={`Delete ${draft.title}`}
                  title={`Delete ${draft.title}`}
                >
                  <X size={13} />
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onCreateDraft}
          className="sticky right-0 inline-flex shrink-0 items-center gap-2 border-l border-[#334155] bg-surface px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-surface-highest focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <Plus size={14} />
          New Save
        </button>
      </div>
    </div>
  );
}
