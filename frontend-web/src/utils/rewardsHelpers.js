export const formatDate = (value) => value ? new Date(value).toLocaleDateString('en-SG', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Singapore'
}) : '—';
export const getStatus = (item) => item.status === 'available' && new Date(item.expiresAt) < new Date()
  ? 'expired' : item.status;

