import { useContext, useState } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';

// Helper to calculate drift
const calculateDrift = (lastInteractionDate) => {
  if (!lastInteractionDate) return 999;
  const now = new Date();
  const last = new Date(lastInteractionDate);
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

export default function Suggestions() {
  const { contacts, setSelectedContact, setCurrentView } = useContext(ContactsContext);
  const [showAIPrompt, setShowAIPrompt] = useState(true);

  // Get contacts that need attention (drifting)
  const suggestedContacts = contacts
    .map(contact => ({
      ...contact,
      drift: calculateDrift(contact.last_interaction?.approximate_date)
    }))
    .filter(c => c.drift > 30)
    .sort((a, b) => {
      // Sort by importance first, then drift
      if (b.importance !== a.importance) {
        return b.importance - a.importance;
      }
      return b.drift - a.drift;
    })
    .slice(0, 8); // Show top 8

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentView('profile');
  };

  const handleReachOut = (contact) => {
    setSelectedContact(contact);
    setCurrentView('outreach');
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4" style={{background: 'linear-gradient(to bottom right, #D6CFC7, #F5F1ED)'}}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{background: '#DD571C'}}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" style={{background: '#DD571C'}}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3" style={{color: '#DD571C'}}>
            Who Should You Reach Out To?
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered suggestions based on drift and importance
          </p>
        </div>

        {/* AI Prompt Card */}
        {showAIPrompt && suggestedContacts.length > 0 && (
          <div className="mb-8 animate-slide-up">
            <div className="rounded-3xl p-[2px]" style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}>
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">🤖</span>
                      <h3 className="text-xl font-bold" style={{color: '#DD571C'}}>AI Assistant</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                      I noticed you haven't talked to <span className="font-semibold">{suggestedContacts.length} important {suggestedContacts.length === 1 ? 'person' : 'people'}</span> in a while.
                      Would you like me to help you reach out with personalized message suggestions?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowAIPrompt(false);
                          if (suggestedContacts[0]) {
                            handleReachOut(suggestedContacts[0]);
                          }
                        }}
                        className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all hover:scale-105"
                        style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}
                      >
                        Yes, help me reach out
                      </button>
                      <button
                        onClick={() => setShowAIPrompt(false)}
                        className="px-6 py-3 bg-gray-100 rounded-xl font-semibold text-gray-700 transition-all hover:bg-gray-200"
                      >
                        Maybe later
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAIPrompt(false)}
                    className="text-gray-400 hover:text-gray-600 ml-4"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Contacts */}
        {suggestedContacts.length > 0 ? (
          <div className="space-y-4 animate-slide-up animation-delay-200">
            <h2 className="text-2xl font-bold mb-6" style={{color: '#DD571C'}}>
              Priority Reach-Outs ({suggestedContacts.length})
            </h2>
            {suggestedContacts.map((contact, index) => (
              <div
                key={contact.id}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-slide-up group"
                style={{animationDelay: `${index * 0.1}s`, boxShadow: '0 4px 24px rgba(221, 87, 28, 0.08)'}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}
                    >
                      {getRolodexInitials(contact.name)}
                    </div>

                    {/* Contact Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{formatRolodexName(contact.name)}</h3>
                      <p className="text-sm text-gray-600 mb-2">{contact.relationship_type}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{background: '#DD571C'}}>
                          {contact.drift} days ago
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{background: '#D6CFC7', color: '#DD571C'}}>
                          Importance: {contact.importance}/5
                        </span>
                        {contact.open_threads && contact.open_threads.length > 0 && (
                          <span className="text-xs text-gray-600">
                            💭 {contact.open_threads.length} open {contact.open_threads.length === 1 ? 'thread' : 'threads'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleContactClick(contact)}
                      className="px-5 py-3 bg-white rounded-xl font-semibold border-2 transition-all hover:scale-105 hover:shadow-md"
                      style={{color: '#DD571C', borderColor: '#DD571C'}}
                    >
                      👤 View Profile
                    </button>
                    <button
                      onClick={() => handleReachOut(contact)}
                      className="px-5 py-3 rounded-xl text-white font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                      style={{background: 'linear-gradient(135deg, #DD571C, #C44915)', boxShadow: '0 4px 16px rgba(221, 87, 28, 0.3)'}}
                    >
                      💬 Reach Out
                    </button>
                  </div>
                </div>

                {/* Open Threads Preview */}
                {contact.open_threads && contact.open_threads.length > 0 && (
                  <div className="mt-4 pt-4 border-t" style={{borderColor: '#D6CFC7'}}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Things to follow up on:</p>
                    <ul className="space-y-1">
                      {contact.open_threads.slice(0, 2).map((thread, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span style={{color: '#DD571C'}}>•</span>
                          <span>{thread}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold mb-3" style={{color: '#DD571C'}}>You're all caught up!</h2>
            <p className="text-gray-600 mb-6">No one is drifting right now. Keep up the great work!</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-8 py-4 rounded-xl text-white font-semibold shadow-lg transition-all hover:scale-105"
              style={{background: 'linear-gradient(135deg, #DD571C, #C44915)'}}
            >
              View All Contacts
            </button>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: backwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
