import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { calculateDrift, daysUntilBirthday } from '../utils/drift';
import {
  Mic, Sparkles, Users, AlertCircle, Cake, MessageCircle,
  Calendar, Brain, Heart, Shield, ChevronRight, Zap, Eye, EyeOff, Check, X,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const sectionLabel = (text) => (
  <div className="flex items-center justify-center gap-3 mb-6">
    <div className="h-px w-8 bg-brand/30" />
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{text}</span>
    <div className="h-px w-8 bg-brand/30" />
  </div>
);

export default function HomePage() {
  const { contacts, setCurrentView } = useContext(ContactsContext);

  const driftingCount = contacts.filter(c => calculateDrift(c.last_interaction?.approximate_date) > 30).length;
  const birthdayCount = contacts.filter(c => {
    const days = daysUntilBirthday(c.birthday);
    return days !== null && days <= 14;
  }).length;

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6 pt-20">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/[0.06] blur-[120px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto relative z-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-7xl md:text-8xl lg:text-9xl font-extrabold gradient-text tracking-tight">Rolo</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-warm-700 mb-6 text-balance leading-tight"
          >
            Stay connected
            <span className="block text-warm-900 font-extrabold">with everyone.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-warm-500 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Social media replaced real connection with passive scrolling.{' '}
            <span className="text-warm-800 font-semibold">Rolo uses AI to bring it back.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setCurrentView('dashboard')}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg gradient-brand shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Users size={20} />
              Open Your Rolo
              <ChevronRight size={18} className="opacity-60 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentView('voice')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-warm-600 hover:text-brand font-medium transition-colors bg-white/60 border border-warm-200/60 hover:border-brand/20"
            >
              <Mic size={16} />
              Add by voice
            </button>
          </motion.div>

          {/* Live stats */}
          {contacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 mt-12 flex-wrap"
            >
              {[
                { icon: <Users size={13} className="text-brand" />, label: `${contacts.length} contacts`, border: 'border-warm-200/60' },
                driftingCount > 0 && { icon: <AlertCircle size={13} className="text-amber-500" />, label: `${driftingCount} drifting`, border: 'border-amber-200/60' },
                birthdayCount > 0 && { icon: <Cake size={13} className="text-green-500" />, label: `${birthdayCount} birthdays soon`, border: 'border-green-200/60' },
              ].filter(Boolean).map((pill, i) => (
                <div key={i} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border ${pill.border} shadow-sm`}>
                  {pill.icon}
                  <span className="text-xs font-semibold text-warm-700">{pill.label}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Scroll hint — mouse wheel icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <div className="w-6 h-10 rounded-full border-2 border-warm-300 mx-auto flex items-start justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-warm-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            {sectionLabel('The Problem')}
            <h2 className="text-3xl md:text-5xl font-extrabold text-warm-900 mb-5">
              The friendship <span className="gradient-text">illusion</span>
            </h2>
            <p className="text-lg text-warm-500 max-w-2xl mx-auto leading-relaxed">
              You see their stories. Like their posts. Think you're staying connected.
              But when was the last time you actually <span className="text-warm-800 font-semibold">called your best friend?</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Social Media side */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="bg-warm-100/60 rounded-2xl p-8 border border-warm-200/60 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-warm-200 flex items-center justify-center">
                    <EyeOff size={18} className="text-warm-500" />
                  </div>
                  <h3 className="text-lg font-bold text-warm-700">Social Media</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Replaces real connection with passive scrolling',
                    'Algorithms optimize for engagement, not friendships',
                    'Creates an illusion of closeness without depth',
                    'Your attention is the product being sold',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-warm-600">
                      <X size={14} className="text-warm-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Rolo side */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-white rounded-2xl p-8 border border-brand/15 shadow-lg shadow-brand/5 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-sm shadow-brand/20">
                    <Heart size={18} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-warm-800">Rolo</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Pushes you toward real-world conversations',
                    'AI detects when relationships are fading',
                    'Personalized outreach — not generic templates',
                    'Success means spending less time in-app',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-warm-700">
                      <Check size={14} className="text-brand mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            {sectionLabel('How It Works')}
            <h2 className="text-3xl md:text-5xl font-extrabold text-warm-900 mb-4">
              Three steps to <span className="gradient-text">stay close</span>
            </h2>
            <p className="text-warm-500 text-lg">No social media. No noise. Just connection.</p>
          </motion.div>

          <div className="relative">
            {/* Connection line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-brand/20 via-brand/40 to-brand/20" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  icon: <Mic size={24} className="text-white" />,
                  title: 'Speak naturally',
                  description: 'Tell Rolo about the people in your life. AI extracts names, interests, birthdays, and conversation topics from your voice.',
                },
                {
                  step: '02',
                  icon: <Brain size={24} className="text-white" />,
                  title: 'AI detects drift',
                  description: 'Rolo tracks when relationships start fading. No more forgetting to check in on the people who matter.',
                },
                {
                  step: '03',
                  icon: <MessageCircle size={24} className="text-white" />,
                  title: 'Reconnect for real',
                  description: 'Get personalized suggestions — a text to send, a call to make, a hangout to plan. Real connection, not likes.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 border border-warm-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full text-center">
                    {/* Step badge */}
                    <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-md shadow-brand/20 relative z-10">
                      {item.icon}
                    </div>
                    <div className="text-[11px] font-bold text-brand uppercase tracking-[0.15em] mb-3">Step {item.step}</div>
                    <h3 className="text-xl font-bold text-warm-800 mb-3">{item.title}</h3>
                    <p className="text-warm-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            {sectionLabel('Features')}
            <h2 className="text-3xl md:text-5xl font-extrabold text-warm-900 mb-4">
              Everything you need to <span className="gradient-text">stay close</span>
            </h2>
            <p className="text-warm-500 text-lg">Powered by AI. Designed for real life.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Mic size={20} />, title: 'Voice-First Input', desc: 'Speak about anyone — AI creates rich profiles automatically. Talk about multiple people in one go.' },
              { icon: <Eye size={20} />, title: 'Drift Detection', desc: 'Know when relationships are fading before it\'s too late. Visual opacity shows who needs attention.' },
              { icon: <Zap size={20} />, title: 'Smart Outreach', desc: 'AI-crafted messages referencing real details from your conversations. Never generic.' },
              { icon: <Calendar size={20} />, title: 'Interaction Calendar', desc: 'See your connection history month by month. Build streaks. Stay consistent.' },
              { icon: <Cake size={20} />, title: 'Birthday Reminders', desc: 'Never miss a birthday. Get AI-written personal messages based on what you know about them.' },
              { icon: <Sparkles size={20} />, title: 'Ask Rolo AI', desc: 'Plan group dinners, find shared interests, get relationship advice from your own data.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="bg-white rounded-2xl p-6 border border-warm-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center text-white mb-4 shadow-sm shadow-brand/20">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-warm-800 text-base mb-2">{feature.title}</h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSER ===== */}
      <section className="py-28 px-6 pb-32">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <div className="bg-white rounded-3xl border border-warm-200/60 shadow-xl overflow-hidden">
              {/* Gradient banner */}
              <div className="h-2 gradient-brand" />

              <div className="p-10 md:p-14 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand/20">
                  <Shield size={28} className="text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-warm-900 mb-4">
                  Our measure of success?
                </h2>
                <p className="text-xl text-warm-600 mb-2">
                  <span className="text-warm-900 font-bold">How little you use the app.</span>
                </p>
                <p className="text-warm-500 mb-10 max-w-lg mx-auto leading-relaxed">
                  Rolo isn't designed to keep you on a screen. It's designed to get you off it — and back to the people who matter.
                </p>

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg gradient-brand shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Heart size={20} />
                  Stay Connected
                  <ChevronRight size={18} className="opacity-60 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-8 text-warm-400 text-sm">
                  <Shield size={14} />
                  <span>Your data stays on your device. Always.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
