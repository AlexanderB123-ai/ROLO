import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { calculateDrift } from '../utils/drift';
import { Mic, Brain, MessageCircle, ArrowRight, Sparkles, Heart, Clock, Shield } from 'lucide-react';

export default function HomePage() {
  const { setCurrentView, contacts } = useContext(ContactsContext);

  const driftingCount = contacts.filter(c => {
    return calculateDrift(c.last_interaction?.approximate_date) > 30;
  }).length;

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 pt-20">
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
            className="text-xl md:text-2xl text-warm-500 max-w-2xl mx-auto mb-4 leading-relaxed font-light"
          >
            Social media uses AI to keep you scrolling past your friends.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-warm-700 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Rolo uses AI to help you <span className="text-brand font-bold">stay connected</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setCurrentView('dashboard')}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg gradient-brand shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setCurrentView('voice')}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-warm-700 bg-white border border-warm-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-warm-300 hover:-translate-y-0.5"
            >
              <Mic size={20} className="text-brand" />
              Add by Voice
            </button>
          </motion.div>
        </div>

        {/* Stats row */}
        {contacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl"
          >
            {[
              { value: contacts.length, label: 'Contacts' },
              { value: driftingCount, label: 'Need Attention' },
              { value: contacts.filter(c => c.importance >= 4).length, label: 'Inner Circle' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl glass transition-all hover:shadow-md">
                <div className="text-3xl md:text-4xl font-bold text-brand mb-1">{stat.value}</div>
                <div className="text-sm text-warm-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2 text-warm-400"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Learn more</span>
          <div className="w-5 h-8 rounded-full border-2 border-warm-300 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-warm-400 animate-pulse-soft" />
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT IS ROLO ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-900 mb-6 text-balance">
            Your relationships deserve
            <span className="gradient-text"> better than a contact list.</span>
          </h2>
          <p className="text-lg text-warm-500 max-w-2xl mx-auto leading-relaxed">
            Rolo is a personal CRM that remembers everything about the people you care about —
            how you met, what they're going through, and when it's time to reach out.
            Powered by AI, designed for humans.
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Mic size={24} />,
                title: 'Voice-First Input',
                description: 'Just talk naturally about your friends. AI extracts names, details, and context automatically.',
              },
              {
                icon: <Clock size={24} />,
                title: 'Drift Detection',
                description: 'Rolo tracks when relationships are fading and gently nudges you before it\'s too late.',
              },
              {
                icon: <Brain size={24} />,
                title: 'AI Suggestions',
                description: 'Get personalized message drafts and reach-out ideas based on each person\'s context.',
              },
              {
                icon: <Heart size={24} />,
                title: 'Inner Circle View',
                description: 'Visual concentric rings show who matters most, with drift indicators at a glance.',
              },
              {
                icon: <MessageCircle size={24} />,
                title: 'Smart Outreach',
                description: 'AI crafts thoughtful texts, call scripts, and hangout ideas tailored to each relationship.',
              },
              {
                icon: <Shield size={24} />,
                title: 'Private & Local',
                description: 'Your relationship data stays on your device. No cloud sync, no data mining, no ads.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-8 rounded-3xl bg-white border border-warm-200/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-1 hover:border-brand/20"
              >
                <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center text-white mb-5 shadow-md shadow-brand/20 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-warm-800 mb-2">{feature.title}</h3>
                <p className="text-warm-500 leading-relaxed text-[15px]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-warm-900 mb-16 text-center">
            How it <span className="gradient-text">works</span>
          </h2>

          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Tell Rolo about your people',
                description: 'Record a quick voice memo or type details about someone. Mention how you met, what they\'re into, what\'s going on in their life.',
              },
              {
                step: '02',
                title: 'AI organizes everything',
                description: 'Rolo\'s AI extracts names, interests, life updates, and open conversation threads — then ranks importance and tracks drift.',
              },
              {
                step: '03',
                title: 'Get nudged to reach out',
                description: 'When a relationship starts drifting, Rolo suggests personalized ways to reconnect — a text, a call idea, or a hangout plan.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 md:gap-8 items-start group"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand/20 transition-transform group-hover:scale-110">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-warm-800 mb-2">{item.title}</h3>
                  <p className="text-warm-500 leading-relaxed max-w-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-[2rem] bg-warm-900 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand/10 blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Your people are waiting to hear from you.
              </h2>
              <p className="text-warm-400 text-lg mb-8 max-w-xl mx-auto">
                Stop letting friendships fade. Stay connected with Rolo.
              </p>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-warm-900 font-semibold text-lg bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Open Your Rolo
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center">
        <p className="text-warm-400 text-sm">
          Stay connected. Your data stays on your device.
        </p>
      </footer>
    </div>
  );
}
