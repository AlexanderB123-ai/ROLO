import { createContext, useState, useEffect } from 'react';
import { loadContacts, saveContacts } from '../utils/storage';
import { loadSeedData } from '../utils/seedData';

export const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('rolo_authenticated') === 'true';
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('rolo_user_name') || '';
  });

  // Load contacts from localStorage on mount
  useEffect(() => {
    const loaded = loadContacts();
    if (loaded.length === 0) {
      const seedData = loadSeedData();
      setContacts(seedData);
      saveContacts(seedData);
    } else {
      setContacts(loaded);
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    saveContacts(contacts);
  }, [contacts]);

  const signIn = (email) => {
    setIsAuthenticated(true);
    setUserName(email);
    localStorage.setItem('rolo_authenticated', 'true');
    localStorage.setItem('rolo_user_name', email);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserName('');
    setCurrentView('home');
    localStorage.removeItem('rolo_authenticated');
    localStorage.removeItem('rolo_user_name');
  };

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: contact.id || crypto.randomUUID(),
      created_at: contact.created_at || Date.now()
    };
    setContacts(prev => [...prev, newContact]);
  };

  const addContacts = (contactsArray) => {
    const newContacts = contactsArray.map(contact => ({
      ...contact,
      id: contact.id || crypto.randomUUID(),
      created_at: contact.created_at || Date.now()
    }));
    setContacts(prev => [...prev, ...newContacts]);
  };

  const updateContact = (id, updates) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const getContactById = (id) => {
    return contacts.find(c => c.id === id);
  };

  const value = {
    contacts,
    currentView,
    setCurrentView,
    selectedContact,
    setSelectedContact,
    addContact,
    addContacts,
    updateContact,
    deleteContact,
    getContactById,
    isAuthenticated,
    userName,
    signIn,
    signOut
  };

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}
