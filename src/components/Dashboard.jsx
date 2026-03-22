import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import ContactCard from './ContactCard';

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
  if (daysSince < 60) return 0.7;
  if (daysSince < 90) return 0.5;
  return 0.3;
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Rolo</h1>
          <p className="text-gray-600">Your personal relationship manager</p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex justify-around items-center flex-wrap gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{contacts.length}</div>
              <div className="text-sm text-gray-600">people</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{driftingContacts.length}</div>
              <div className="text-sm text-gray-600">drifting</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{upcomingBirthdays.length}</div>
              <div className="text-sm text-gray-600">birthdays soon</div>
            </div>
          </div>
        </div>

        {/* Upcoming Birthdays Banner */}
        {upcomingBirthdays.length > 0 && (
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-md p-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🎂 Upcoming Birthdays</h3>
            <div className="flex flex-wrap gap-3">
              {upcomingBirthdays.slice(0, 3).map(contact => {
                const days = daysUntilBirthday(contact.birthday);
                return (
                  <div
                    key={contact.id}
                    onClick={() => handleContactClick(contact)}
                    className="bg-white rounded-lg px-4 py-2 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="font-semibold text-gray-800">{contact.name}</div>
                    <div className="text-sm text-gray-600">
                      {days === 0 ? 'Today! 🎉' : days === 1 ? 'Tomorrow' : `in ${days} days`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Concentric Rings */}
        <div className="relative mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Rolo</h2>
            <p className="text-gray-600 text-sm">Inner ring = closest friends · Fading = drifting</p>
          </div>

          {/* Inner Ring - Closest Friends */}
          {innerRing.length > 0 && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 bg-amber-200 text-amber-900 rounded-full text-sm font-semibold">
                  Inner Circle
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {innerRing.map(contact => {
                  const drift = calculateDrift(contact.last_interaction?.approximate_date);
                  const opacity = getDriftOpacity(drift);
                  return (
                    <div key={contact.id} style={{ opacity }}>
                      <ContactCard contact={contact} onClick={() => handleContactClick(contact)} drift={drift} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Middle Ring */}
          {middleRing.length > 0 && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 bg-orange-200 text-orange-900 rounded-full text-sm font-semibold">
                  Good Friends
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                {middleRing.map(contact => {
                  const drift = calculateDrift(contact.last_interaction?.approximate_date);
                  const opacity = getDriftOpacity(drift);
                  return (
                    <div key={contact.id} style={{ opacity }}>
                      <ContactCard contact={contact} onClick={() => handleContactClick(contact)} drift={drift} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Outer Ring */}
          {outerRing.length > 0 && (
            <div className="mb-8">
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                  Acquaintances
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-7xl mx-auto">
                {outerRing.map(contact => {
                  const drift = calculateDrift(contact.last_interaction?.approximate_date);
                  const opacity = getDriftOpacity(drift);
                  return (
                    <div key={contact.id} style={{ opacity }}>
                      <ContactCard contact={contact} onClick={() => handleContactClick(contact)} drift={drift} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {contacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No contacts yet. Start with five people you've been meaning to reach out to.</p>
            </div>
          )}
        </div>

        {/* Floating Action Button - Add Contact */}
        <button
          onClick={handleAddContact}
          className="fixed bottom-8 right-8 w-16 h-16 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          title="Add contact"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
            <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
