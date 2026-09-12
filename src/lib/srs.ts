export interface CardState {
  id: string;
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  dueAt: number;
  lastGrade?: number;
}

export type Grade = 0 | 1 | 2 | 3 | 4 | 5;

const STORAGE_KEY = "pharmacology-srs-v1";

export function loadSrsState(): Record<string, CardState> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CardState>) : {};
  } catch {
    return {};
  }
}

export function saveSrsState(state: Record<string, CardState>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Keep the current study session usable if browser storage is unavailable.
  }
}

export function getOrInitCard(
  state: Record<string, CardState>,
  id: string,
): CardState {
  return (
    state[id] ?? {
      id,
      repetitions: 0,
      easeFactor: 2.5,
      intervalDays: 0,
      dueAt: Date.now(),
    }
  );
}

export function reviewCard(card: CardState, grade: Grade): CardState {
  let { repetitions, easeFactor, intervalDays } = card;

  if (grade < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
  );

  return {
    id: card.id,
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    intervalDays,
    dueAt: Date.now() + intervalDays * 24 * 60 * 60 * 1000,
    lastGrade: grade,
  };
}

export function isDue(card: CardState): boolean {
  return card.dueAt <= Date.now();
}

// ---- Modern feature: export / import study progress as JSON ----
// Lets a student back up their spaced-repetition progress or move it
// to another device, since everything is otherwise kept in the browser only.
export function exportProgress(state: Record<string, CardState>): string {
  return JSON.stringify({ app: "pharmacology-highyield", version: 1, exportedAt: new Date().toISOString(), cards: state }, null, 2);
}

export function importProgress(json: string): Record<string, CardState> | null {
  try {
    const parsed = JSON.parse(json) as { cards?: Record<string, CardState> };
    if (parsed && typeof parsed === "object" && parsed.cards) return parsed.cards;
    return null;
  } catch {
    return null;
  }
}

// ---- Modern feature: bookmarked / starred facts ----
const BOOKMARK_KEY = "pharmacology-bookmarks-v1";

export function loadBookmarks(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(BOOKMARK_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function saveBookmarks(ids: Set<string>) {
  try {
    window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore
  }
}
