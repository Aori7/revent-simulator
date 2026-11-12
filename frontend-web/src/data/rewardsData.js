/** Mock data for the REVENT Rewards prototype; replace with API responses later. */
export const rewardCatalog = [
  {
    id: 'fairprice-5', title: '$5 FairPrice Voucher', cost: 200,
    category: 'Groceries', icon: 'shopping-basket',
    subtitle: 'Save on your next grocery run',
    details: [
      '$5 off your next grocery run',
      'Valid at participating FairPrice outlets',
      'Valid for 30 days from redemption',
      'One redemption per user per day (planned backend rule)'
    ],
    terms: 'Demo-only voucher. Not redeemable at any real retailer. Actual eligibility and redemption limits will be enforced when the backend is connected.'
  },
  {
    id: 'transport-5', title: '$5 Transport Voucher', cost: 180,
    category: 'Transport', icon: 'bus',
    subtitle: 'Make your next journey a little easier',
    details: ['Voucher value: $5', 'Valid for 30 days from redemption', 'Demo voucher — no real transport credit is issued'],
    terms: 'Prototype reward for demonstration only. Final participating transport service and terms will be provided later.'
  },
  {
    id: 'coffee-2', title: '$2 Coffee Voucher', cost: 100,
    category: 'Food & Drinks', icon: 'coffee',
    subtitle: 'Enjoy a small treat for learning safely',
    details: ['Voucher value: $2', 'Valid for 30 days from redemption', 'Demo voucher — cannot be used in stores'],
    terms: 'Prototype reward for demonstration only. Final merchant details will be provided later.'
  },
  {
    id: 'grocery-10', title: '$10 Grocery Voucher', cost: 350,
    category: 'Groceries', icon: 'shopping-basket',
    subtitle: 'A little extra towards everyday essentials',
    details: ['Voucher value: $10', 'Valid for 30 days from redemption', 'Demo voucher — cannot be used in stores'],
    terms: 'Prototype reward for demonstration only.'
  }
];

export const starterVouchers = [
  { id: 'demo-voucher-1', catalogId: 'fairprice-5', status: 'available', redeemedAt: '2026-11-10T10:00:00+08:00', expiresAt: '2026-12-10T10:00:00+08:00', code: 'DEMO-FAIRPRICE-001' },
  { id: 'demo-voucher-2', catalogId: 'transport-5', status: 'available', redeemedAt: '2026-11-09T10:00:00+08:00', expiresAt: '2026-12-09T10:00:00+08:00', code: 'DEMO-TRANSPORT-002' },
  { id: 'demo-voucher-3', catalogId: 'coffee-2', status: 'available', redeemedAt: '2026-11-08T10:00:00+08:00', expiresAt: '2026-12-08T10:00:00+08:00', code: 'DEMO-COFFEE-003' },
  { id: 'demo-voucher-4', catalogId: 'transport-5', status: 'used', redeemedAt: '2026-10-24T10:00:00+08:00', expiresAt: '2026-11-23T10:00:00+08:00', usedAt: '2026-10-26T12:00:00+08:00', code: 'DEMO-TRANSPORT-004' },
  { id: 'demo-voucher-5', catalogId: 'coffee-2', status: 'expired', redeemedAt: '2026-09-01T10:00:00+08:00', expiresAt: '2026-10-01T10:00:00+08:00', code: 'DEMO-COFFEE-005' }
];

export const starterActivities = [
  { id: 'seed-earn', type: 'earned', title: 'Completed: Family Emergency Scenario', points: 10, at: '2026-11-04T11: :00+08:00' },
  { id: 'seed-redeem', type: 'redeemed', title: 'Redeemed: $5 FairPrice Voucher', points: -200, at: '2026-11-04T10:00:00+08:00' }
];

export const earnPointTasks = [
  { id: 'learning', title: 'Complete a learning card', description: 'Explore a scam scenario and reveal its red flags', points: 10, path: '/education', linkText: 'Explore learning cards' },
  { id: 'practice', title: 'Practise scam spotting', description: 'Try a short scam-awareness practice check', points: null, path: '/readiness', linkText: 'Try readiness check' },
  { id: 'awareness', title: 'Review your awareness', description: 'See which AI-powered scam topics need more practice', points: null, path: '/awareness', linkText: 'View awareness levels' }
];

export const getRewardById = (id) => rewardCatalog.find((reward) => reward.id === id);
