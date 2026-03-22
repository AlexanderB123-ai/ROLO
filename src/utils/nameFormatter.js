/**
 * Format a name in Rolodex style: "LAST, First"
 * Example: "Sarah Chen" -> "CHEN, Sarah"
 */
export function formatRolodexName(name) {
  if (!name) return '';

  const parts = name.trim().split(' ');

  if (parts.length === 1) {
    // Single name, just uppercase it
    return parts[0].toUpperCase();
  }

  // Assume last name is the last part, everything else is first name
  const lastName = parts[parts.length - 1];
  const firstName = parts.slice(0, -1).join(' ');

  return `${lastName.toUpperCase()}, ${firstName}`;
}

/**
 * Get first name from a full name
 */
export function getFirstName(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  return parts[0];
}

/**
 * Get initials in rolodex format
 */
export function getRolodexInitials(name) {
  if (!name) return '';

  const parts = name.trim().split(' ');

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  // First initial + Last initial
  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];

  return `${lastInitial}${firstInitial}`.toUpperCase();
}
