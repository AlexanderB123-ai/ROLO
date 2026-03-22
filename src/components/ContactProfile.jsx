import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';

// Helper function to calculate days since last interaction
const calculateDrift = (lastInteractionDate) => {
  if (!lastInteractionDate) return 999;
  const now = new Date();
  const last = new Date(lastInteractionDate);
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function ContactProfile() {
  const { selectedContact, setCurrentView, setSelectedContact } = useContext(ContactsContext);

  if (!selectedContact) {
    return null;
  }

  const contact = selectedContact;
  const drift = calculateDrift(contact.last_interaction?.approximate_date);

  const handleBack = () => {
    setSelectedContact(null);
    setCurrentView('dashboard');
  };

  const handleReachOut = () => {
    setCurrentView('outreach');
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return getRolodexInitials(name);
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{background: 'linear-gradient(to bottom right, #D6CFC7, #F5F1ED)'}}>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" style={{boxShadow: '0 8px 32px rgba(221, 87, 28, 0.12)'}}>
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}>
                {getInitials(contact.name)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{formatRolodexName(contact.name)}</h1>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{background: '#F5F1ED', color: '#DD571C'}}>
                  {contact.relationship_type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold" style={{color: '#DD571C'}}>
                {contact.importance}
                <span className="text-sm text-gray-500">/5</span>
              </div>
              <div className="text-xs text-gray-500">importance</div>
            </div>
          </div>

          {/* Drift Warning */}
          {drift > 30 && (
            <div className={`p-4 rounded-lg mb-6 ${
              drift > 90 ? 'bg-red-100 border border-red-300' :
              drift > 60 ? 'bg-orange-100 border border-orange-300' :
              'bg-yellow-100 border border-yellow-300'
            }`}>
              <p className="font-semibold text-gray-800">
                {drift > 90 ? '🚨 ' : drift > 60 ? '⚠️ ' : '💭 '}
                It's been {drift} days since you last connected
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {drift > 90
                  ? 'This relationship is really drifting. Reach out soon!'
                  : drift > 60
                  ? 'Getting close to the danger zone. Time for a check-in?'
                  : 'You might want to reach out soon.'}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* How We Met */}
            {contact.how_we_met && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">How We Met</h3>
                <p className="text-gray-800">{contact.how_we_met}</p>
              </div>
            )}

            {/* Work */}
            {contact.work && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">💼 Work</h3>
                <p className="text-gray-800">{contact.work}</p>
              </div>
            )}

            {/* Birthday */}
            {contact.birthday && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">🎂 Birthday</h3>
                <p className="text-gray-800">{formatDate(contact.birthday)}</p>
              </div>
            )}

            {/* Significant Other */}
            {contact.significant_other && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">❤️ Significant Other</h3>
                <p className="text-gray-800">{contact.significant_other}</p>
              </div>
            )}
          </div>

          {/* Interests */}
          {contact.interests && contact.interests.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">✨ Interests</h3>
              <div className="flex flex-wrap gap-2">
                {contact.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{background: '#F5F1ED', color: '#DD571C'}}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Open Threads */}
          {contact.open_threads && contact.open_threads.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">📌 Open Threads</h3>
              <ul className="space-y-2">
                {contact.open_threads.map((thread, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2" style={{color: '#DD571C'}}>•</span>
                    <span className="text-gray-800">{thread}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Life Updates */}
          {contact.life_updates && contact.life_updates.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">📰 Life Updates</h3>
              <ul className="space-y-2">
                {contact.life_updates.map((update, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-800">{update}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Last Interaction */}
          {contact.last_interaction && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Last Interaction</h3>
              <p className="text-gray-600 text-sm">
                {formatDate(contact.last_interaction.approximate_date)} ({drift} days ago)
              </p>
              {contact.last_interaction.description && (
                <p className="text-gray-800 mt-2">{contact.last_interaction.description}</p>
              )}
            </div>
          )}

          {/* Tags */}
          {contact.tags && contact.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">🏷️ Tags</h3>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReachOut}
              className="flex-1 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
              style={{background: 'linear-gradient(135deg, #DD571C, #C44915)', boxShadow: '0 4px 16px rgba(221, 87, 28, 0.3)'}}
            >
              💬 Reach Out
            </button>
            <button
              onClick={handleBack}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-all hover:bg-gray-100 rounded-xl"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
