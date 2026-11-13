import { useState } from 'react';

const STORAGE_KEY = 'reventEducationDemoV1';
export const LEARNING_STAGES = ['Beginner', 'Developing', 'Confident'];
const initial = { savedIds: [], completedIds: [], completedStages: {}, lastReadiness: null };

function readStoredLearning() {
  try {
    const item = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!item || !Array.isArray(item.savedIds) || !Array.isArray(item.completedIds)) return initial;

    // Previously one finished guide meant one completed lesson. Treat that as
    // the Beginner card rather than falsely showing the new 3-card path as 100%.
    const oldCards = Object.fromEntries(item.completedIds.map((id) => [id, ['Beginner']]));
    const completedStages = item.completedStages && typeof item.completedStages === 'object'
      ? item.completedStages : oldCards;
    const completedIds = Object.keys(completedStages).filter((id) =>
      LEARNING_STAGES.every((stage) => Array.isArray(completedStages[id]) && completedStages[id].includes(stage))
    );
    return { ...initial, ...item, completedStages, completedIds };
  } catch {
    return initial;
  }
}

/** Frontend demo state stored per browser, not per customer. */
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

  const markStageCompleted = (topicId, stage) => {
    if (!LEARNING_STAGES.includes(stage)) return;
    update((previous) => {
      const prevStages = previous.completedStages?.[topicId] || [];
      const nextStages = LEARNING_STAGES.filter((item) => item === stage || prevStages.includes(item));
      const completedStages = { ...previous.completedStages, [topicId]: nextStages };
      const allDone = LEARNING_STAGES.every((item) => nextStages.includes(item));
      return {
        ...previous,
        completedStages,
        completedIds: allDone
          ? [...new Set([...previous.completedIds, topicId])]
          : previous.completedIds.filter((id) => id !== topicId)
      };
    });
  };

  // Preserved for any older components that call this legacy demo helper.
  const markCompleted = (topicId) => update((previous) => ({
    ...previous,
    completedStages: { ...previous.completedStages, [topicId]: [...LEARNING_STAGES] },
    completedIds: [...new Set([...previous.completedIds, topicId])]
  }));

  const saveReadiness = (result) => update((previous) => ({ ...previous, lastReadiness: result }));

  return { learning, toggleSaved, markStageCompleted, markCompleted, saveReadiness };
}
