import { useContext, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Lightbulb, Calendar, Sparkles, LogOut } from 'lucide-react';
import { ContactsContext } from '../context/ContactsContext';

export default function Navigation() {
  const { currentView, setCurrentView, signOut } = useContext(ContactsContext);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef([]);

  const tabs = [
    { id: 'home', label: 'Rolo', icon: Home },
    { id: 'dashboard', label: 'Contacts', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
    { id: 'ai', label: 'Ask AI', icon: Sparkles }
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
    <nav className="fixed top-0 left-0 right-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="mx-4 mt-4">
        <div className="max-w-2xl mx-auto rounded-2xl shadow-lg shadow-warm-900/8 px-1.5 py-1.5 bg-white/50 backdrop-blur-xl border border-white/60 flex items-center gap-1.5" style={{ WebkitBackdropFilter: 'blur(24px)' }}>
          <div className="relative flex items-center flex-1">
            {/* Sliding indicator */}
            {activeIndex >= 0 && (
              <motion.div
                className="absolute h-full rounded-xl gradient-brand"
                style={{ boxShadow: '0 2px 8px rgba(221, 87, 28, 0.3)' }}
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
                  aria-label={tab.label}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative flex-1 px-3 py-2.5 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-1.5 z-10"
                  style={{
                    color: isActive ? '#FFFFFF' : '#9C8B7A',
                    textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.15)' : 'none',
                  }}
                >
                  <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sign out button */}
          <button
            onClick={signOut}
            aria-label="Sign out"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-warm-400 hover:text-warm-600 hover:bg-warm-100 transition-colors flex-shrink-0"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
