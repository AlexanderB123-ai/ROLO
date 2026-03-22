import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import ContactCard from './ContactCard';
import { formatRolodexName } from '../utils/nameFormatter';

// Helper function to calculate days since last interaction
const calculateDrift = (lastInteractionDate) => {
  if (!lastInteractionDate) return 999;
  const now = new Date();
  const last = new Date(lastInteractionDate);
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

// Helper function to get opacity based on drift
const getDriftOpacity = (daysSince) => {
  if (daysSince < 30) return 1;
  if (daysSince < 60) return 0.85;
  if (daysSince < 90) return 0.6;
  return 0.4;
};

// Helper function to check if birthday is coming up
const daysUntilBirthday = (birthday) => {
  if (!birthday) return null;
  const today = new Date();
  const birthDate = new Date(birthday);
  const thisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (thisYear < today) {
    thisYear.setFullYear(today.getFullYear() + 1);
  }

  const diff = thisYear - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};

export default function Dashboard() {
  const { contacts, setCurrentView, setSelectedContact } = useContext(ContactsContext);

  // Categorize contacts by importance
  const innerRing = contacts.filter(c => c.importance >= 4); // 4-5
  const middleRing = contacts.filter(c => c.importance === 3); // 3
  const outerRing = contacts.filter(c => c.importance <= 2); // 1-2

  // Calculate stats
  const driftingContacts = contacts.filter(c => {
    const drift = calculateDrift(c.last_interaction?.approximate_date);
    return drift > 30;
  });

  const upcomingBirthdays = contacts.filter(c => {
    const days = daysUntilBirthday(c.birthday);
    return days !== null && days <= 14;
  }).sort((a, b) => daysUntilBirthday(a.birthday) - daysUntilBirthday(b.birthday));

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentView('profile');
  };

  const handleAddContact = () => {
    setCurrentView('voice');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #D6CFC7, #F5F1ED)'}}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{background: '#DD571C'}}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" style={{background: '#DD571C'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" style={{background: '#C4B5A8'}}></div>
      </div>

      <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-6xl font-bold mb-3" style={{color: '#DD571C'}}>
            Rolo
          </h1>
          <p className="text-gray-600 text-lg">AI that makes you more human</p>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/20">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold mb-1 transition-all group-hover:scale-110" style={{color: '#DD571C'}}>
                  {contacts.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">people in your world</div>
              </div>
              <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold mb-1 transition-all group-hover:scale-110" style={{color: '#DD571C'}}>
                  {driftingContacts.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">relationships drifting</div>
              </div>
              <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold mb-1 transition-all group-hover:scale-110" style={{color: '#DD571C'}}>
                  {upcomingBirthdays.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">birthdays coming up</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Birthdays Banner */}
        {upcomingBirthdays.length > 0 && (
          <div className="mb-8 animate-slide-up animation-delay-200">
            <div className="rounded-3xl p-[2px]" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}>
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🎂</span>
                  <h3 className="text-xl font-bold text-gray-800">Upcoming Birthdays</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {upcomingBirthdays.slice(0, 3).map(contact => {
                    const days = daysUntilBirthday(contact.birthday);
                    return (
                      <div
                        key={contact.id}
                        onClick={() => handleContactClick(contact)}
                        className="rounded-2xl px-4 py-3 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                        style={{background: '#F5F1ED'}}
                      >
                        <div className="font-semibold text-gray-800">{formatRolodexName(contact.name)}</div>
                        <div className="text-sm font-medium" style={{color: '#DD571C'}}>
                          {days === 0 ? '🎉 Today!' : days === 1 ? 'Tomorrow' : `in ${days} days`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Concentric Rings */}
        <div className="relative mb-12">
          <div className="text-center mb-8 animate-fade-in animation-delay-400">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Inner Circle</h2>
            <p className="text-gray-600">The closer they are, the more they matter · Fading means drifting</p>
          </div>

          {/* Inner Ring - Closest Friends */}
          {innerRing.length > 0 && (
            <div className="mb-12 animate-slide-up animation-delay-600">
              <div className="text-center mb-6">
                <span className="inline-block px-6 py-3 text-white rounded-full text-sm font-bold shadow-lg" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}>
                  Inner Circle ✨
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {innerRing.map(contact => {
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
          )}

          {/* Middle Ring */}
          {middleRing.length > 0 && (
            <div className="mb-12 animate-slide-up animation-delay-800">
              <div className="text-center mb-6">
                <span className="inline-block px-6 py-3 text-white rounded-full text-sm font-bold shadow-lg" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}>
                  Good Friends 💙
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
                {middleRing.map(contact => {
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
          )}

          {/* Outer Ring */}
          {outerRing.length > 0 && (
            <div className="mb-12 animate-slide-up animation-delay-1000">
              <div className="text-center mb-6">
                <span className="inline-block px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full text-sm font-bold shadow-lg">
                  Acquaintances 👋
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
                {outerRing.map(contact => {
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
          )}

          {/* Empty State */}
          {contacts.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-gray-600 text-xl mb-2">Your Rolo is empty</p>
              <p className="text-gray-500">Start by adding five people you've been meaning to reach out to</p>
            </div>
          )}
        </div>

        {/* Floating Action Button - Add Contact */}
        <button
          onClick={handleAddContact}
          className="fixed bottom-8 right-8 w-20 h-20 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 group animate-pulse"
          style={{background: 'linear-gradient(135deg, #DD571C, #C44915)', boxShadow: '0 8px 32px rgba(221, 87, 28, 0.4)'}}
          title="Add contact"
        >
          <svg className="w-10 h-10 group-hover:scale-110 group-hover:rotate-90 transition-all" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
            <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: backwards;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          animation-fill-mode: backwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
          animation-fill-mode: backwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
