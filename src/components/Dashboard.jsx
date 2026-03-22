import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import ContactCard from './ContactCard';
import { formatRolodexName } from '../utils/nameFormatter';
import { Mic, AlertCircle, Cake } from 'lucide-react';

const calculateDrift = (lastInteractionDate) => {
  if (!lastInteractionDate) return 999;
  const now = new Date();
  const last = new Date(lastInteractionDate);
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

const getDriftOpacity = (daysSince) => {
  if (daysSince < 30) return 1;
  if (daysSince < 60) return 0.85;
  if (daysSince < 90) return 0.6;
  return 0.4;
};

const daysUntilBirthday = (birthday) => {
  if (!birthday) return null;
  const today = new Date();
  const birthDate = new Date(birthday);
  const thisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (thisYear < today) thisYear.setFullYear(today.getFullYear() + 1);
  return Math.ceil((thisYear - today) / (1000 * 60 * 60 * 24));
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

  const renderRing = (title, subtitle, contactList, gridCols) => {
    if (contactList.length === 0) return null;
    return (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-warm-200" />
          <h3 className="text-sm font-semibold text-warm-500 uppercase tracking-wider">{title}</h3>
          <span className="text-xs text-warm-400 font-medium">{subtitle}</span>
          <div className="h-px flex-1 bg-warm-200" />
        </div>
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
    );
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-2">Your People</h1>
          <p className="text-warm-500">The closer they are, the more they matter</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up delay-100">
          {[
            { value: contacts.length, label: 'Contacts', color: 'text-brand' },
            { value: driftingContacts.length, label: 'Drifting', color: driftingContacts.length > 0 ? 'text-amber-500' : 'text-brand' },
            { value: upcomingBirthdays.length, label: 'Birthdays Soon', color: 'text-brand' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center border border-warm-200/60 shadow-sm">
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-warm-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming birthdays */}
        {upcomingBirthdays.length > 0 && (
          <div className="mb-10 animate-slide-up delay-200">
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
          </div>
        )}

        {/* Drifting alert */}
        {driftingContacts.length > 0 && (
          <div className="mb-10 animate-slide-up delay-300">
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
          </div>
        )}

        {/* Contact rings */}
        <div className="animate-fade-in delay-400">
          {renderRing('Inner Circle', `${innerRing.length} people`, innerRing, 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4')}
          {renderRing('Good Friends', `${middleRing.length} people`, middleRing, 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5')}
          {renderRing('Acquaintances', `${outerRing.length} people`, outerRing, 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6')}
        </div>

        {/* Empty state */}
        {contacts.length === 0 && (
          <div className="text-center py-24 animate-fade-in">
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
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setCurrentView('voice')}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl gradient-brand text-white shadow-lg shadow-brand/30 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-brand/40 hover:scale-105 active:scale-95 z-50"
        title="Add contact"
      >
        <Mic size={24} />
      </button>
    </div>
  );
}
