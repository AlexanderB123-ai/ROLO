import { useContext } from 'react';
import { ContactsProvider, ContactsContext } from './context/ContactsContext';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import InteractionCalendar from './components/InteractionCalendar';
import VoiceInput from './components/VoiceInput';
import ContactProfile from './components/ContactProfile';
import OutreachSuggestions from './components/OutreachSuggestions';
import Suggestions from './components/Suggestions';

function AppContent() {
  const { currentView } = useContext(ContactsContext);

  // Show navigation for main views (home, dashboard, calendar, suggestions)
  const showNavigation = ['home', 'dashboard', 'calendar', 'suggestions'].includes(currentView);

  return (
    <div className="min-h-screen bg-warm-50 font-sans">
      {showNavigation && <Navigation />}
      <div>
        {currentView === 'home' && <HomePage />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'calendar' && <InteractionCalendar />}
        {currentView === 'suggestions' && <Suggestions />}
        {currentView === 'voice' && <VoiceInput />}
        {currentView === 'profile' && <ContactProfile />}
        {currentView === 'outreach' && <OutreachSuggestions />}
      </div>
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
