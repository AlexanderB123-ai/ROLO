import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { calculateDrift, daysUntilBirthday } from '../utils/drift';
import { Mic, Sparkles, Users, AlertCircle, Cake, MessageCircle, Calendar, Brain, Heart, ArrowDown, Shield } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const { contacts, setCurrentView } = useContext(ContactsContext);

  const driftingCount = contacts.filter(c => calculateDrift(c.last_interaction?.approximate_date) > 30).length;
  const birthdayCount = contacts.filter(c => {
    const days = daysUntilBirthday(c.birthday);
    return days !== null && days <= 14;
  }).length;

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6">
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
              className="flex items-center justify-center gap-3 mt-10 flex-wrap"
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

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <ArrowDown size={20} className="text-warm-300 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-6">
              The friendship <span className="gradient-text">illusion</span>
            </h2>
            <p className="text-lg text-warm-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              You see their stories. You like their posts. You think you're staying connected.
              But when was the last time you actually <span className="text-warm-800 font-semibold">called your best friend?</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="bg-warm-100/60 rounded-2xl p-8 border border-warm-200/60 text-left">
                <div className="w-10 h-10 rounded-xl bg-warm-200 flex items-center justify-center mb-4">
                  <span className="text-lg">📱</span>
                </div>
                <h3 className="text-lg font-bold text-warm-800 mb-2">Social Media</h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  Uses AI to keep you scrolling. Replaces real connection with passive consumption. Algorithms optimize for engagement, not friendships.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-white rounded-2xl p-8 border border-brand/15 shadow-md shadow-brand/5 text-left">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center mb-4">
                  <Heart size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-warm-800 mb-2">Rolo</h3>
                <p className="text-warm-600 text-sm leading-relaxed">
                  Uses AI to push you toward real-world action. Detects drifting relationships, crafts personalized messages, and reminds you to <span className="text-brand font-semibold">stay connected</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
              How Rolo helps you <span className="gradient-text">stay connected</span>
            </h2>
            <p className="text-warm-500 text-lg">Three simple steps. Zero social media.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <Mic size={22} className="text-white" />,
                title: 'Speak naturally',
                description: 'Tell Rolo about the people in your life. Our AI extracts names, interests, birthdays, and conversation topics from your voice.',
              },
              {
                step: '02',
                icon: <Brain size={22} className="text-white" />,
                title: 'AI detects drift',
                description: 'Rolo tracks when relationships are fading. No more forgetting to check in on the people who matter most to you.',
              },
              {
                step: '03',
                icon: <MessageCircle size={22} className="text-white" />,
                title: 'Reconnect for real',
                description: 'Get personalized outreach suggestions — a text to send, a call to make, a hangout to plan. Real connection, not likes.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="bg-white rounded-2xl p-7 border border-warm-200/60 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="text-xs font-bold text-warm-300 uppercase tracking-wider mb-4">Step {item.step}</div>
                  <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center mb-4 shadow-sm shadow-brand/20">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-warm-800 mb-2">{item.title}</h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
              Everything you need to <span className="gradient-text">stay close</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: <Mic size={18} />, title: 'Voice-First Input', desc: 'Speak about anyone — AI creates rich contact profiles automatically.' },
              { icon: <AlertCircle size={18} />, title: 'Drift Detection', desc: 'Know when relationships are fading before it\'s too late.' },
              { icon: <MessageCircle size={18} />, title: 'AI Outreach', desc: 'Personalized message drafts referencing real details, not templates.' },
              { icon: <Calendar size={18} />, title: 'Interaction Calendar', desc: 'See your connection history. Build streaks. Stay consistent.' },
              { icon: <Cake size={18} />, title: 'Birthday Reminders', desc: 'Never miss a birthday. Get AI-written personal messages.' },
              { icon: <Sparkles size={18} />, title: 'Ask Rolo AI', desc: 'Plan group dinners, find shared interests, explore your network.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-warm-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white flex-shrink-0 shadow-sm shadow-brand/20">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-warm-800 mb-1">{feature.title}</h3>
                    <p className="text-warm-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE CLOSER ===== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand/20">
              <Shield size={24} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
              Our measure of success?
            </h2>
            <p className="text-xl text-warm-600 mb-3 leading-relaxed">
              <span className="text-warm-800 font-semibold">How little you use the app.</span>
            </p>
            <p className="text-warm-500 mb-10 max-w-xl mx-auto">
              Rolo isn't designed to keep you on a screen. It's designed to get you off it — and back to the people who matter. Your data stays on your device. Always.
            </p>

            <button
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-semibold text-xl gradient-brand shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-1 active:translate-y-0"
            >
              <Users size={24} />
              Stay Connected
            </button>

            <p className="mt-8 text-warm-400 text-sm">
              Built with love at Pioneering Minds AI Hackathon 2026
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
