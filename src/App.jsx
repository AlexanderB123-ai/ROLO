import { useContext } from 'react';
import { ContactsProvider, ContactsContext } from './context/ContactsContext';
import { FlickeringGrid } from './components/ui/FlickeringGrid';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
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
  const { currentView, isAuthenticated } = useContext(ContactsContext);

  // Show sign-in if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen font-sans relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <FlickeringGrid
            className="absolute inset-0 w-full h-full"
            squareSize={4}
            gridGap={6}
            color="#DD571C"
            maxOpacity={0.07}
            flickerChance={0.08}
          />
        </div>
        <div className="relative z-10">
          <SignIn />
        </div>
      </div>
    );
  }

  const showNavigation = ['home', 'dashboard', 'calendar', 'suggestions', 'ai'].includes(currentView);
  const ViewComponent = views[currentView] || Dashboard;

  return (
    <div className="min-h-screen font-sans relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FlickeringGrid
          className="absolute inset-0 w-full h-full"
          squareSize={4}
          gridGap={6}
          color="#DD571C"
          maxOpacity={0.07}
          flickerChance={0.08}
        />
      </div>

      <div className="relative z-10">
        {showNavigation && <Navigation />}
        <ViewComponent />
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
