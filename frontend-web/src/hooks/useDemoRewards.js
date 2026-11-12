import { useEffect, useRef, useState } from 'react';
import { getRewardById, starterActivities, starterVouchers } from '../data/rewardsData';

const STORAGE_KEY = 'reventRewardsDemoV1';
const EDUCATION_STORAGE_KEY = 'reventEducationDemoV1';
const LEVELS = ['Beginner', 'Developing', 'Confident'];
const BASE_STATE = {
  points: 320,
  vouchers: starterVouchers,
  activities: starterActivities,
  creditedLearningKeys: [],
  lastRedemption: null
};

function awardCompletedLearning(previous) {
  let education;
  try { education = JSON.parse(window.localStorage.getItem(EDUCATION_STORAGE_KEY) || 'null'); }
  catch { return previous; }
  if (!education?.completedStages) return previous;

  const finishedKeys = Object.entries(education.completedStages).flatMap(([topicId, stages]) =>
    LEVELS.filter((level) => Array.isArray(stages) && stages.includes(level))
      .map((level) => `${topicId}:${level}`)
  );
  const unseen = finishedKeys.filter((key) => !previous.creditedLearningKeys.includes(key));
  if (!unseen.length) return previous;

  const at = new Date().toISOString();
  return {
    ...previous,
    points: previous.points + unseen.length * 10,
    creditedLearningKeys: [...previous.creditedLearningKeys, ...unseen],
    activities: [
      ...unseen.map((key) => ({
        id: `learning-${key}`,
        type: 'earned',
        title: `Completed: ${key.split(':')[0].replaceAll('-', ' ')} (${key.split(':')[1]})`,
        points: 10,
        at
      })),
      ...previous.activities
    ]
  };
}

function loadState() {
  let previous = BASE_STATE;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.vouchers) && Array.isArray(saved.activities)) {
      previous = { ...BASE_STATE, ...saved, creditedLearningKeys: saved.creditedLearningKeys || [] };
    }
  } catch { /* Use demo defaults. */ }
  return awardCompletedLearning(previous);
}

const persist = (state) => {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch { /* Demo still works if storage is unavailable. */ }
};

/** Frontend-only demo: backend must validate real redemptions and point awards. */
export default function useDemoRewards() {
  const [rewards, setRewards] = useState(loadState);
  const current = useRef(rewards);

  function update(makeNext) {
    const next = makeNext(current.current);
    current.current = next;
    setRewards(next);
    persist(next);
    return next;
  }

  // Persist initial learning credits too, not only button-triggered changes.
  useEffect(() => { persist(rewards); }, [rewards]);

  function redeem(catalogId) {
    const reward = getRewardById(catalogId);
    if (!reward) return { ok: false, message: 'This reward is unavailable.' };
    if (current.current.points < reward.cost) {
      return { ok: false, message: 'You do not have enough points for this reward.' };
    }

    const now = new Date();
    const expiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const id = `demo-voucher-${now.getTime()}-${Math.random().toString(36).slice(2, 6)}`;
    const voucher = {
      id, catalogId, status: 'available',
      redeemedAt: now.toISOString(), expiresAt: expiry.toISOString(),
      code: `DEMO-${catalogId.toUpperCase()}-${id.slice(-4).toUpperCase()}`
    };
    update((previous) => ({
      ...previous,
      points: previous.points - reward.cost,
      vouchers: [voucher, ...previous.vouchers],
      activities: [{ id: `activity-${id}`, type: 'redeemed', title: `Redeemed: ${reward.title}`, points: -reward.cost, at: now.toISOString() }, ...previous.activities],
      lastRedemption: { voucherId: id, catalogId }
    }));
    return { ok: true, voucher };
  }

  function markUsed(voucherId) {
    update((previous) => ({
      ...previous,
      vouchers: previous.vouchers.map((voucher) =>
        voucher.id === voucherId && voucher.status === 'available'
          ? { ...voucher, status: 'used', usedAt: new Date().toISOString() }
          : voucher
      )
    }));
  }

  return { rewards, redeem, markUsed };
}
