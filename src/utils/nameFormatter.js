/**
 * Format a name in Rolodex style: "LAST, First"
 * Handles parenthetical notes like "Emma (Sister)" → "EMMA (Sister)"
 */
export function formatRolodexName(name) {
  if (!name) return '';

  // Extract parenthetical note if present, e.g. "Emma (Sister)"
  const parenMatch = name.match(/^(.+?)\s*\((.+?)\)$/);
  if (parenMatch) {
    const mainName = parenMatch[1].trim();
    const note = parenMatch[2];
    const parts = mainName.split(' ');

    if (parts.length === 1) {
      return `${mainName.toUpperCase()} (${note})`;
    }
    const lastName = parts[parts.length - 1];
    const firstName = parts.slice(0, -1).join(' ');
    return `${lastName.toUpperCase()}, ${firstName} (${note})`;
  }

  const parts = name.trim().split(' ');

  if (parts.length === 1) {
    return parts[0].toUpperCase();
  }

  const lastName = parts[parts.length - 1];
  const firstName = parts.slice(0, -1).join(' ');
  return `${lastName.toUpperCase()}, ${firstName}`;
}

/**
 * Get first name from a full name
 */
export function getFirstName(name) {
  if (!name) return '';
  // Strip parenthetical
  const clean = name.replace(/\s*\(.+?\)$/, '').trim();
  return clean.split(' ')[0];
}

/**
 * Get initials — strips parenthetical notes first
 */
export function getRolodexInitials(name) {
  if (!name) return '';

  // Strip parenthetical note like "(Sister)"
  const cleanName = name.replace(/\s*\(.+?\)$/, '').trim();
  const parts = cleanName.split(' ');

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  return `${lastInitial}${firstInitial}`.toUpperCase();
}
