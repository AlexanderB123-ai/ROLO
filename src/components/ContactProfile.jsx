import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { getRolodexInitials } from '../utils/nameFormatter';
import { calculateDrift, getRelationshipColor, formatDate } from '../utils/drift';
import { ArrowLeft, MessageCircle, Briefcase, Cake, Heart, Star, Tag, Clock, Pin, TrendingUp } from 'lucide-react';

function darkenHex(hex, amount = 40) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
  const b = Math.max(0, (num & 0x0000FF) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export default function ContactProfile() {
  const { selectedContact, setCurrentView, setSelectedContact } = useContext(ContactsContext);

  if (!selectedContact) return null;

  const contact = selectedContact;
  const drift = calculateDrift(contact.last_interaction?.approximate_date);
  const relColor = getRelationshipColor(contact.relationship_type);
  const darkerColor = darkenHex(relColor.hex, 50);

  const handleBack = () => {
    setSelectedContact(null);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen py-8 px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-warm-500 hover:text-warm-700 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-warm-200/60 shadow-sm overflow-hidden mb-6"
        >
          {/* Top banner with gradient */}
          <div
            className="h-36 relative"
            style={{ background: `linear-gradient(135deg, ${relColor.hex}dd, ${darkerColor})` }}
          >
            {/* Name overlaid on banner */}
            <div className="absolute bottom-4 right-6 text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">{contact.name}</h1>
              <span className="text-sm text-white/80 capitalize">{contact.relationship_type}</span>
            </div>

            {/* Avatar overlapping bottom-left */}
            <div className="absolute -bottom-10 left-6">
              <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
                <div
                  className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-2xl"
                  style={{ background: relColor.hex }}
                >
                  {getRolodexInitials(contact.name)}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-14 px-6 pb-6">
            <div className="flex items-start justify-end mb-4">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-warm-50">
                <Star size={14} className="text-brand" fill="currentColor" />
                <span className="text-sm font-semibold text-warm-700">{contact.importance}/5</span>
              </div>
            </div>

            {/* Drift warning */}
            {drift > 30 && (
              <div className={`p-4 rounded-xl mb-4 flex items-start gap-3 ${
                drift > 90 ? 'bg-red-50 border border-red-100' :
                drift > 60 ? 'bg-amber-50 border border-amber-100' :
                'bg-orange-50 border border-orange-100'
              }`}>
                <Clock size={18} className={`mt-0.5 flex-shrink-0 ${
                  drift > 90 ? 'text-red-500' : drift > 60 ? 'text-amber-500' : 'text-orange-500'
                }`} />
                <div>
                  <p className="font-medium text-warm-800 text-sm">
                    {drift} days since you last connected
                  </p>
                  <p className="text-xs text-warm-500 mt-0.5">
                    {drift > 90 ? 'This relationship is really drifting.' :
                     drift > 60 ? 'Time for a check-in?' :
                     'Consider reaching out soon.'}
                  </p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('outreach')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-medium shadow-sm shadow-brand/20 hover:shadow-md transition-all hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${relColor.hex}, ${darkerColor})` }}
              >
                <MessageCircle size={16} />
                Reach Out
              </button>
              <button
                onClick={handleBack}
                className="px-5 py-3 rounded-xl font-medium text-warm-600 bg-warm-100 hover:bg-warm-200 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <div className="space-y-4">
          {/* Info grid */}
          {(contact.how_we_met || contact.work || contact.birthday || contact.significant_other) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {contact.how_we_met && (
                  <DetailItem icon={<Star size={15} />} label="How we met" value={contact.how_we_met} />
                )}
                {contact.work && (
                  <DetailItem icon={<Briefcase size={15} />} label="Work" value={contact.work} />
                )}
                {contact.birthday && (
                  <DetailItem icon={<Cake size={15} />} label="Birthday" value={formatDate(contact.birthday)} />
                )}
                {contact.significant_other && (
                  <DetailItem icon={<Heart size={15} />} label="Partner" value={contact.significant_other} />
                )}
              </div>
            </motion.div>
          )}

          {/* Interests */}
          {contact.interests?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6"
            >
              <h3 className="text-sm font-semibold text-warm-500 uppercase tracking-wider mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {contact.interests.map((interest, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-brand-light text-brand text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Open threads */}
          {contact.open_threads?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Pin size={14} className="text-brand" />
                <h3 className="text-sm font-semibold text-warm-500 uppercase tracking-wider">Open Threads</h3>
              </div>
              <ul className="space-y-2">
                {contact.open_threads.map((thread, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-warm-700">
                    <span className="text-brand mt-0.5">&#8226;</span>
                    {thread}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Life updates */}
          {contact.life_updates?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-green-500" />
                <h3 className="text-sm font-semibold text-warm-500 uppercase tracking-wider">Life Updates</h3>
              </div>
              <ul className="space-y-2">
                {contact.life_updates.map((update, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-warm-700">
                    <span className="text-green-500 mt-0.5">&#8226;</span>
                    {update}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Last interaction */}
          {contact.last_interaction && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6"
            >
              <h3 className="text-sm font-semibold text-warm-500 uppercase tracking-wider mb-3">Last Interaction</h3>
              <div className="text-sm text-warm-500 mb-1">
                {formatDate(contact.last_interaction.approximate_date)} ({drift} days ago)
              </div>
              {contact.last_interaction.description && (
                <p className="text-sm text-warm-700">{contact.last_interaction.description}</p>
              )}
            </motion.div>
          )}

          {/* Tags */}
          {contact.tags?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag size={14} className="text-warm-400" />
                <h3 className="text-sm font-semibold text-warm-500 uppercase tracking-wider">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-warm-100 text-warm-600 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-warm-400">{icon}</span>
        <span className="text-xs font-medium text-warm-400 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm text-warm-700 font-medium">{value}</p>
    </div>
  );
}
