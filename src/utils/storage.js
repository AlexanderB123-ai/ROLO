const STORAGE_KEY = 'rolo_contacts';
const DATA_VERSION_KEY = 'rolo_data_version';
const CURRENT_DATA_VERSION = 2; // Bump this to force seed data reload

export function saveContacts(contacts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
  } catch (error) {
    console.error('Error saving contacts to localStorage:', error);
  }
}

export function loadContacts() {
  try {
    const version = localStorage.getItem(DATA_VERSION_KEY);
    // If data version is outdated, return empty to trigger seed data reload
    if (version !== String(CURRENT_DATA_VERSION)) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading contacts from localStorage:', error);
    return [];
  }
}

export function clearContacts() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing contacts from localStorage:', error);
  }
}
