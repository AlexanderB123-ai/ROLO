import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ContactsProvider, ContactsContext } from './context/ContactsContext';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import InteractionCalendar from './components/InteractionCalendar';
import VoiceInput from './components/VoiceInput';
import ContactProfile from './components/ContactProfile';
import OutreachSuggestions from './components/OutreachSuggestions';
import Suggestions from './components/Suggestions';

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const views = {
  home: HomePage,
  dashboard: Dashboard,
  calendar: InteractionCalendar,
  suggestions: Suggestions,
  voice: VoiceInput,
  profile: ContactProfile,
  outreach: OutreachSuggestions,
};

function AppContent() {
  const { currentView } = useContext(ContactsContext);
  const showNavigation = ['home', 'dashboard', 'calendar', 'suggestions'].includes(currentView);
  const ViewComponent = views[currentView] || HomePage;

  return (
    <div className="min-h-screen bg-warm-50 font-sans">
      {showNavigation && <Navigation />}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ViewComponent />
        </motion.div>
      </AnimatePresence>
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
