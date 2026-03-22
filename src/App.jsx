import { useContext } from 'react';
import { ContactsProvider, ContactsContext } from './context/ContactsContext';
import Dashboard from './components/Dashboard';
import VoiceInput from './components/VoiceInput';
import ContactProfile from './components/ContactProfile';
import OutreachSuggestions from './components/OutreachSuggestions';

function AppContent() {
  const { currentView } = useContext(ContactsContext);

  return (
    <div className="min-h-screen">
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'voice' && <VoiceInput />}
      {currentView === 'profile' && <ContactProfile />}
      {currentView === 'outreach' && <OutreachSuggestions />}
    </div>
  );
}

function App() {
  return (
    <ContactsProvider>
      <AppContent />
    </ContactsProvider>
  );
}

export default App;
