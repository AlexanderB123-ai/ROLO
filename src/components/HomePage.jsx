import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { calculateDrift, daysUntilBirthday } from '../utils/drift';
import { Mic, Sparkles, Users, AlertCircle, Cake } from 'lucide-react';

export default function HomePage() {
  const { contacts, setCurrentView } = useContext(ContactsContext);

  const driftingCount = contacts.filter(c => calculateDrift(c.last_interaction?.approximate_date) > 30).length;
  const birthdayCount = contacts.filter(c => {
    const days = daysUntilBirthday(c.birthday);
    return days !== null && days <= 14;
  }).length;

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
          Never lose touch
          <span className="block gradient-text">with anyone.</span>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={() => setCurrentView('dashboard')}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-semibold text-xl gradient-brand shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-1 active:translate-y-0 animate-mic-pulse"
          >
            <Users size={24} />
            View Your People
          </button>
          <button
            onClick={() => setCurrentView('voice')}
            className="inline-flex items-center gap-2 text-warm-500 hover:text-brand font-medium transition-colors text-sm"
          >
            <Mic size={14} />
            or add someone by voice
          </button>
        </motion.div>

        {/* Live stat pills */}
        {contacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-warm-200/60 shadow-sm">
              <Users size={13} className="text-brand" />
              <span className="text-xs font-semibold text-warm-700">{contacts.length} contacts</span>
            </div>
            {driftingCount > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-amber-200/60 shadow-sm">
                <AlertCircle size={13} className="text-amber-500" />
                <span className="text-xs font-semibold text-amber-700">{driftingCount} need attention</span>
              </div>
            )}
            {birthdayCount > 0 && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-green-200/60 shadow-sm">
                <Cake size={13} className="text-green-500" />
                <span className="text-xs font-semibold text-green-700">{birthdayCount} birthdays soon</span>
              </div>
            )}
          </motion.div>
        )}

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
