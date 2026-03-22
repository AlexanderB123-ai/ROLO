import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { Mic, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { setCurrentView } = useContext(ContactsContext);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-3xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light text-brand text-sm font-semibold mb-8 border border-brand/10"
        >
          <Sparkles size={14} />
          AI-Powered Relationship Manager
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-warm-900 mb-6 text-balance leading-[0.95]"
        >
          Stay connected
          <span className="block gradient-text">with everyone.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-warm-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Social media uses AI to keep you scrolling past your friends.
          <br />
          <span className="text-warm-800 font-medium">Rolo uses AI to make you <span className="text-brand font-bold">call them</span>.</span>
        </motion.p>

        {/* Single hero CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => setCurrentView('voice')}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-semibold text-xl gradient-brand shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-1 active:translate-y-0 animate-mic-pulse"
          >
            <Mic size={24} />
            Start Talking
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-warm-400 text-sm"
        >
          Stay connected. Your data stays on your device.
        </motion.p>
      </div>
    </div>
  );
}
