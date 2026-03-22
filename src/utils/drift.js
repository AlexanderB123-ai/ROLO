/**
 * Shared drift calculation utilities.
 * Used across Dashboard, ContactProfile, OutreachSuggestions, and Suggestions.
 */

export const calculateDrift = (lastInteractionDate) => {
  if (!lastInteractionDate) return 999;
  const now = new Date();
  const last = new Date(lastInteractionDate);
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

export const getDriftOpacity = (daysSince) => {
  if (daysSince < 30) return 1;
  if (daysSince < 60) return 0.85;
  if (daysSince < 90) return 0.6;
  return 0.4;
};

export const getDriftLevel = (daysSince) => {
  if (daysSince > 90) return 'critical';
  if (daysSince > 60) return 'warning';
  if (daysSince > 30) return 'mild';
  return 'good';
};

export const getDriftColor = (daysSince) => {
  if (daysSince > 90) return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' };
  if (daysSince > 60) return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' };
  if (daysSince > 30) return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' };
  return { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' };
};

export const daysUntilBirthday = (birthday) => {
  if (!birthday) return null;
  const today = new Date();
  const birthDate = new Date(birthday);
  const thisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (thisYear < today) thisYear.setFullYear(today.getFullYear() + 1);
  return Math.ceil((thisYear - today) / (1000 * 60 * 60 * 24));
};

export const getRelationshipColor = (type) => {
  switch (type?.toLowerCase()) {
    case 'friend': return { hex: '#DD571C', bg: 'bg-brand', light: 'bg-brand-light' };
    case 'family': return { hex: '#22C55E', bg: 'bg-green-500', light: 'bg-green-50' };
    case 'colleague': return { hex: '#3B82F6', bg: 'bg-blue-500', light: 'bg-blue-50' };
    case 'mentor': return { hex: '#8B5CF6', bg: 'bg-purple-500', light: 'bg-purple-50' };
    default: return { hex: '#9C8B7A', bg: 'bg-warm-400', light: 'bg-warm-100' };
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
