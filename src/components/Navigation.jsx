import { useContext, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Lightbulb, Calendar } from 'lucide-react';
import { ContactsContext } from '../context/ContactsContext';

export default function Navigation() {
  const { currentView, setCurrentView } = useContext(ContactsContext);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Contacts', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb }
  ];

  const activeIndex = tabs.findIndex(tab => tab.id === currentView);

  useEffect(() => {
    if (tabRefs.current[activeIndex]) {
      const activeTab = tabRefs.current[activeIndex];
      const { offsetLeft, offsetWidth } = activeTab;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm" style={{background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)', borderColor: '#D6CFC7'}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-16 relative">
          {/* Container for tabs */}
          <div className="relative flex items-center gap-1 bg-gray-100/50 rounded-2xl p-1">
            {/* Sliding fluorescent indicator (tubelight effect) */}
            <motion.div
              className="absolute h-[calc(100%-8px)] rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #DD571C, #C44915)',
                boxShadow: '0 0 20px rgba(221, 87, 28, 0.6), 0 0 40px rgba(221, 87, 28, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                top: '4px'
              }}
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

            {/* Tab buttons */}
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = currentView === tab.id;

              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[index] = el)}
                  onClick={() => setCurrentView(tab.id)}
                  className="relative px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-center"
                  style={{
                    color: isActive ? '#FFFFFF' : '#666',
                    textShadow: isActive ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
                    zIndex: 10
                  }}
                >
                  <Icon size={18} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
