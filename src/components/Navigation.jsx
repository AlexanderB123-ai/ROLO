import { useContext, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Lightbulb, Calendar, Share2 } from 'lucide-react';
import { ContactsContext } from '../context/ContactsContext';

export default function Navigation() {
  const { currentView, setCurrentView } = useContext(ContactsContext);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Contacts', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'network', label: 'Network', icon: Share2 }
  ];

  const activeIndex = tabs.findIndex(tab => tab.id === currentView);

  useEffect(() => {
    const idx = activeIndex >= 0 ? activeIndex : 0;
    if (tabRefs.current[idx]) {
      const activeTab = tabRefs.current[idx];
      const { offsetLeft, offsetWidth } = activeTab;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-2xl mx-auto glass-strong rounded-2xl shadow-lg shadow-warm-900/5 px-2 py-2">
          <div className="relative flex items-center">
            {/* Sliding indicator */}
            {activeIndex >= 0 && (
              <motion.div
                className="absolute h-full rounded-xl gradient-brand shadow-md shadow-brand/25"
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 35
                  }
                }}
              />
            )}

            {/* Tab buttons */}
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;

              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[index] = el)}
                  onClick={() => setCurrentView(tab.id)}
                  className="relative flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 z-10"
                  style={{
                    color: isActive ? '#FFFFFF' : '#9C8B7A',
                  }}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
