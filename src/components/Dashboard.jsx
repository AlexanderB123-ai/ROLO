import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import ContactCard from './ContactCard';
import { formatRolodexName } from '../utils/nameFormatter';
import { calculateDrift, getDriftOpacity, daysUntilBirthday } from '../utils/drift';
import { Mic, AlertCircle, Cake, Users, Heart, UserCheck, UserMinus } from 'lucide-react';

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } }
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function Dashboard() {
  const { contacts, setCurrentView, setSelectedContact } = useContext(ContactsContext);

  const innerRing = contacts.filter(c => c.importance >= 4);
  const middleRing = contacts.filter(c => c.importance === 3);
  const outerRing = contacts.filter(c => c.importance <= 2);

  const driftingContacts = contacts.filter(c => calculateDrift(c.last_interaction?.approximate_date) > 30);

  const upcomingBirthdays = contacts.filter(c => {
    const days = daysUntilBirthday(c.birthday);
    return days !== null && days <= 14;
  }).sort((a, b) => daysUntilBirthday(a.birthday) - daysUntilBirthday(b.birthday));

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentView('profile');
  };

  const renderRing = (title, icon, contactList, gridCols, accentColor, bgTint) => {
    if (contactList.length === 0) return null;
    return (
      <motion.div variants={fadeUp} className="mb-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accentColor}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-warm-700 uppercase tracking-wider">{title}</h3>
            <p className="text-xs text-warm-400">{contactList.length} {contactList.length === 1 ? 'person' : 'people'}</p>
          </div>
          <div className="h-px flex-1 bg-warm-200/60" />
        </div>

        {/* Cards */}
        <div className={`rounded-2xl p-4 ${bgTint}`}>
          <div className={`grid ${gridCols} gap-4`}>
            {contactList.map(contact => {
              const drift = calculateDrift(contact.last_interaction?.approximate_date);
              const opacity = getDriftOpacity(drift);
              return (
                <div key={contact.id} style={{ opacity }} className="transition-opacity duration-500">
                  <ContactCard contact={contact} onClick={() => handleContactClick(contact)} drift={drift} />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-2">Your People</h1>
          <p className="text-warm-500">The closer they are, the more they matter</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { value: contacts.length, label: 'Contacts', icon: <Users size={16} />, color: 'text-brand bg-brand-light' },
            { value: driftingContacts.length, label: 'Drifting', icon: <UserMinus size={16} />, color: driftingContacts.length > 0 ? 'text-amber-600 bg-amber-50' : 'text-brand bg-brand-light' },
            { value: upcomingBirthdays.length, label: 'Birthdays', icon: <Cake size={16} />, color: 'text-brand bg-brand-light' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center border border-warm-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-warm-800 mb-1">{stat.value}</div>
              <div className="text-xs text-warm-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Upcoming birthdays */}
        {upcomingBirthdays.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl p-6 border border-warm-200/60 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Cake size={18} className="text-brand" />
                <h3 className="font-semibold text-warm-800">Upcoming Birthdays</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {upcomingBirthdays.slice(0, 3).map(contact => {
                  const days = daysUntilBirthday(contact.birthday);
                  return (
                    <div
                      key={contact.id}
                      onClick={() => handleContactClick(contact)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-warm-50 cursor-pointer hover:bg-brand-light transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-warm-800 text-sm">{formatRolodexName(contact.name)}</div>
                        <div className="text-xs font-medium text-brand">
                          {days === 0 ? 'Today!' : days === 1 ? 'Tomorrow' : `in ${days} days`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Drifting alert */}
        {driftingContacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8"
          >
            <button
              onClick={() => setCurrentView('suggestions')}
              className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4 text-left hover:bg-amber-100/80 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-amber-800 text-sm">
                  {driftingContacts.length} {driftingContacts.length === 1 ? 'relationship is' : 'relationships are'} drifting
                </div>
                <div className="text-xs text-amber-600">Tap for AI suggestions on how to reconnect</div>
              </div>
              <span className="text-amber-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </motion.div>
        )}

        {/* Contact rings */}
        <motion.div variants={stagger} initial="initial" animate="animate">
          {renderRing(
            'Inner Circle', <Heart size={14} className="text-white" />,
            innerRing, 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
            'gradient-brand text-white',
            'bg-gradient-to-br from-brand-light/50 to-transparent'
          )}
          {renderRing(
            'Good Friends', <UserCheck size={14} className="text-white" />,
            middleRing, 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
            'bg-warm-500 text-white',
            'bg-warm-100/40'
          )}
          {renderRing(
            'Acquaintances', <Users size={14} className="text-white" />,
            outerRing, 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
            'bg-warm-400 text-white',
            'bg-warm-100/20'
          )}
        </motion.div>

        {/* Empty state */}
        {contacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-warm-100 flex items-center justify-center mx-auto mb-6">
              <Users size={28} className="text-warm-400" />
            </div>
            <h2 className="text-2xl font-bold text-warm-800 mb-2">Your Rolo is empty</h2>
            <p className="text-warm-500 mb-8">Start by adding the people you care about</p>
            <button
              onClick={() => setCurrentView('voice')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold shadow-md shadow-brand/20 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Mic size={18} />
              Add Your First Contact
            </button>
          </motion.div>
        )}
      </div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
        onClick={() => setCurrentView('voice')}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl gradient-brand text-white shadow-lg shadow-brand/30 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-brand/40 hover:scale-105 active:scale-95 z-50"
        title="Add contact"
      >
        <Mic size={24} />
      </motion.button>
    </div>
  );
}
