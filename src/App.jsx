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
import AskAI from './components/AskAI';

const views = {
  home: HomePage,
  dashboard: Dashboard,
  calendar: InteractionCalendar,
  suggestions: Suggestions,
  voice: VoiceInput,
  profile: ContactProfile,
  outreach: OutreachSuggestions,
  ai: AskAI,
};

function AppContent() {
  const { currentView } = useContext(ContactsContext);
  const showNavigation = ['home', 'dashboard', 'calendar', 'suggestions', 'ai'].includes(currentView);
  const ViewComponent = views[currentView] || Dashboard;

  return (
    <div className="min-h-screen font-sans relative">
      {showNavigation && <Navigation />}
      <ViewComponent />
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
