import { useState } from 'react';

const STORAGE_KEY = 'reventEducationDemoV1';
const initial = { savedIds: [], completedIds: [], lastReadiness: null };

function readStoredLearning() {
  try {
    const item = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!item || !Array.isArray(item.savedIds) || !Array.isArray(item.completedIds)) return initial;
    return { ...initial, ...item };
  } catch {
    return initial;
  }
}

/** Browser-local prototype state; no backend or points are updated. */
export default function useDemoLearning() {
  const [learning, setLearning] = useState(readStoredLearning);

  const update = (nextValue) => {
    setLearning((previous) => {
      const next = typeof nextValue === 'function' ? nextValue(previous) : nextValue;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });
  };

  const toggleSaved = (topicId) => update((previous) => ({
    ...previous,
    savedIds: previous.savedIds.includes(topicId)
      ? previous.savedIds.filter((id) => id !== topicId)
      : [...previous.savedIds, topicId]
  }));

  const markCompleted = (topicId) => update((previous) => ({
    ...previous,
    completedIds: previous.completedIds.includes(topicId)
      ? previous.completedIds
      : [...previous.completedIds, topicId]
  }));

  const saveReadiness = (result) => update((previous) => ({ ...previous, lastReadiness: result }));

  return { learning, toggleSaved, markCompleted, saveReadiness };
}
