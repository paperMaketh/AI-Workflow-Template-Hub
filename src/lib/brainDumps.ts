import { BRAIN_DUMP_TEMPLATE } from '../data/templates';

export type BrainDumpWorkspaceMode = 'template' | 'edit';
export type BrainDumpStatus = 'draft' | 'ready' | 'used' | 'archived';

export interface BrainDump {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: BrainDumpStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BrainDumpStorageState {
  savedDrafts: BrainDump[];
  activeDraftId: string | null;
}

export interface StorageResult<T> {
  ok: boolean;
  data: T;
  error?: string;
}

export const templateMarkdown = BRAIN_DUMP_TEMPLATE;
export const BRAIN_DUMPS_STORAGE_KEY = 'ai-workflow-template-hub:brain-dumps:v1';
export const ACTIVE_BRAIN_DUMP_ID_STORAGE_KEY = 'ai-workflow-template-hub:selected-brain-dump-id:v1';
export const BRAIN_DUMP_STATUSES = ['draft', 'ready', 'used', 'archived'] as const;

export function isBrainDumpStatus(value: unknown): value is BrainDumpStatus {
  return typeof value === 'string' && BRAIN_DUMP_STATUSES.includes(value as BrainDumpStatus);
}

export function generateBrainDumpId(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `brain-dump-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function generateDefaultBrainDumpTitle(existingDrafts: Pick<BrainDump, 'title'>[]): string {
  const existingTitles = new Set(existingDrafts.map((draft) => draft.title.trim()));
  let index = 1;

  while (existingTitles.has(`Untitled ${index}`)) {
    index += 1;
  }

  return `Untitled ${index}`;
}

export function createBrainDump(
  existingDrafts: BrainDump[] = [],
  overrides: Partial<Omit<BrainDump, 'id' | 'createdAt' | 'updatedAt'>> = {},
): BrainDump {
  const now = new Date().toISOString();

  return {
    id: generateBrainDumpId(),
    title: normalizeBrainDumpTitle(overrides.title, generateDefaultBrainDumpTitle(existingDrafts)),
    content: overrides.content ?? templateMarkdown,
    tags: normalizeBrainDumpTags(overrides.tags),
    status: overrides.status ?? 'draft',
    createdAt: now,
    updatedAt: now,
  };
}

export function duplicateBrainDump(source: BrainDump, existingDrafts: BrainDump[] = []): BrainDump {
  const now = new Date().toISOString();

  return {
    ...source,
    id: generateBrainDumpId(),
    title: normalizeBrainDumpTitle(`${source.title} Copy`, generateDefaultBrainDumpTitle(existingDrafts)),
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizeBrainDumpTitle(value: unknown, fallback = 'Untitled'): string {
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function normalizeBrainDumpTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return dedupeTags(value
    .filter((tag): tag is string => typeof tag === 'string')
    .map((tag) => tag.trim())
    .filter(Boolean));
}

export function parseBrainDumpTagsInput(value: string): string[] {
  return dedupeTags(value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean));
}

export function addBrainDumpTags(existingTags: string[], input: string): string[] {
  return dedupeTags([...normalizeBrainDumpTags(existingTags), ...parseBrainDumpTagsInput(input)]);
}

export function removeBrainDumpTag(existingTags: string[], tagToRemove: string): string[] {
  const normalizedTagToRemove = tagToRemove.trim().toLowerCase();

  return normalizeBrainDumpTags(existingTags).filter(
    (tag) => tag.toLowerCase() !== normalizedTagToRemove,
  );
}

export function hasBrainDumpContent(content: unknown): content is string {
  return typeof content === 'string' && content.trim().length > 0;
}

export function sanitizeMarkdownFilename(title: string, fallback = 'brain-dump'): string {
  const baseName = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._ -]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[._-]+|[._-]+$/g, '');

  const safeName = baseName || fallback;
  return safeName.endsWith('.md') ? safeName : `${safeName}.md`;
}

export function loadBrainDumpStorage(storage = getBrowserStorage()): StorageResult<BrainDumpStorageState> {
  if (!storage) {
    return emptyStorageState('localStorage is unavailable.');
  }

  try {
    const rawDrafts = storage.getItem(BRAIN_DUMPS_STORAGE_KEY);
    const rawActiveDraftId = storage.getItem(ACTIVE_BRAIN_DUMP_ID_STORAGE_KEY);
    const savedDrafts = parseSavedDrafts(rawDrafts);
    const activeDraftId = normalizeActiveDraftId(rawActiveDraftId, savedDrafts);

    return {
      ok: true,
      data: {
        savedDrafts,
        activeDraftId,
      },
    };
  } catch (error) {
    return emptyStorageState(getStorageErrorMessage(error, 'Could not load saved brain dumps.'));
  }
}

export function saveBrainDumpStorage(
  state: BrainDumpStorageState,
  storage = getBrowserStorage(),
): StorageResult<BrainDumpStorageState> {
  if (!storage) {
    return {
      ok: false,
      data: state,
      error: 'localStorage is unavailable.',
    };
  }

  try {
    const savedDrafts = state.savedDrafts.filter(isBrainDump);
    const activeDraftId = normalizeActiveDraftId(state.activeDraftId, savedDrafts);

    storage.setItem(BRAIN_DUMPS_STORAGE_KEY, JSON.stringify(savedDrafts));

    if (activeDraftId) {
      storage.setItem(ACTIVE_BRAIN_DUMP_ID_STORAGE_KEY, activeDraftId);
    } else {
      storage.removeItem(ACTIVE_BRAIN_DUMP_ID_STORAGE_KEY);
    }

    return {
      ok: true,
      data: {
        savedDrafts,
        activeDraftId,
      },
    };
  } catch (error) {
    return {
      ok: false,
      data: state,
      error: getStorageErrorMessage(error, 'Could not save brain dumps.'),
    };
  }
}

export function ensureEditableBrainDumpState(state: BrainDumpStorageState): BrainDumpStorageState {
  if (state.savedDrafts.length > 0) {
    return {
      savedDrafts: state.savedDrafts,
      activeDraftId: normalizeActiveDraftId(state.activeDraftId, state.savedDrafts) ?? state.savedDrafts[0].id,
    };
  }

  const firstDraft = createBrainDump();

  return {
    savedDrafts: [firstDraft],
    activeDraftId: firstDraft.id,
  };
}

export function isBrainDump(value: unknown): value is BrainDump {
  if (!isObjectRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.content === 'string' &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === 'string') &&
    isBrainDumpStatus(value.status) &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string'
  );
}

function parseSavedDrafts(rawDrafts: string | null): BrainDump[] {
  if (!rawDrafts) {
    return [];
  }

  const parsed = JSON.parse(rawDrafts);

  if (!Array.isArray(parsed)) {
    throw new Error('Saved brain dumps were not stored as an array.');
  }

  return parsed.filter(isBrainDump);
}

function normalizeActiveDraftId(activeDraftId: unknown, savedDrafts: BrainDump[]): string | null {
  if (typeof activeDraftId !== 'string') {
    return null;
  }

  return savedDrafts.some((draft) => draft.id === activeDraftId) ? activeDraftId : null;
}

function getBrowserStorage(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function getStorageErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

function dedupeTags(tags: string[]): string[] {
  const seenTags = new Set<string>();
  const uniqueTags: string[] = [];

  tags.forEach((tag) => {
    const normalizedTag = tag.toLowerCase();

    if (!seenTags.has(normalizedTag)) {
      seenTags.add(normalizedTag);
      uniqueTags.push(tag);
    }
  });

  return uniqueTags;
}

function emptyStorageState(error: string): StorageResult<BrainDumpStorageState> {
  return {
    ok: false,
    data: {
      savedDrafts: [],
      activeDraftId: null,
    },
    error,
  };
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
