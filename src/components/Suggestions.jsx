import { useContext, useState } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { formatRolodexName, getRolodexInitials } from '../utils/nameFormatter';
import { Sparkles, User, MessageCircle, Clock, X } from 'lucide-react';

const calculateDrift = (lastInteractionDate) => {
  if (!lastInteractionDate) return 999;
  const now = new Date();
  const last = new Date(lastInteractionDate);
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

export default function Suggestions() {
  const { contacts, setSelectedContact, setCurrentView } = useContext(ContactsContext);
  const [showAIPrompt, setShowAIPrompt] = useState(true);

  const suggestedContacts = contacts
    .map(contact => ({
      ...contact,
      drift: calculateDrift(contact.last_interaction?.approximate_date)
    }))
    .filter(c => c.drift > 30)
    .sort((a, b) => {
      if (b.importance !== a.importance) return b.importance - a.importance;
      return b.drift - a.drift;
    })
    .slice(0, 8);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setCurrentView('profile');
  };

  const handleReachOut = (contact) => {
    setSelectedContact(contact);
    setCurrentView('outreach');
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-2">Suggestions</h1>
          <p className="text-warm-500">People who could use a message from you</p>
        </div>

        {/* AI Prompt */}
        {showAIPrompt && suggestedContacts.length > 0 && (
          <div className="mb-8 animate-slide-up">
            <div className="bg-white rounded-2xl p-6 border border-warm-200/60 shadow-sm relative">
              <button
                onClick={() => setShowAIPrompt(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-warm-400 hover:text-warm-600 hover:bg-warm-100 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Sparkles size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-warm-800 mb-1">AI Assistant</h3>
                  <p className="text-warm-500 text-sm mb-4">
                    {suggestedContacts.length} important {suggestedContacts.length === 1 ? 'person hasn\'t' : 'people haven\'t'} heard from you in a while. Want personalized message suggestions?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowAIPrompt(false);
                        if (suggestedContacts[0]) handleReachOut(suggestedContacts[0]);
                      }}
                      className="px-5 py-2.5 rounded-xl text-white font-medium text-sm gradient-brand shadow-sm shadow-brand/20 hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      Help me reach out
                    </button>
                    <button
                      onClick={() => setShowAIPrompt(false)}
                      className="px-5 py-2.5 rounded-xl font-medium text-sm text-warm-600 bg-warm-100 hover:bg-warm-200 transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact list */}
        {suggestedContacts.length > 0 ? (
          <div className="space-y-3 animate-slide-up delay-100">
            {suggestedContacts.map((contact, index) => (
              <div
                key={contact.id}
                className="bg-white rounded-2xl p-5 border border-warm-200/60 shadow-sm hover:shadow-md hover:border-brand/15 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm gradient-brand shadow-brand/20 flex-shrink-0 transition-transform group-hover:scale-105"
                  >
                    {getRolodexInitials(contact.name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-warm-800 truncate">{formatRolodexName(contact.name)}</h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-warm-400 capitalize">{contact.relationship_type}</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                        contact.drift > 90 ? 'text-red-500' :
                        contact.drift > 60 ? 'text-amber-500' :
                        'text-orange-500'
                      }`}>
                        <Clock size={11} />
                        {contact.drift}d ago
                      </span>
                      <span className="text-xs text-warm-400">
                        {contact.importance}/5 importance
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleContactClick(contact)}
                      className="p-2.5 rounded-xl border border-warm-200 text-warm-500 hover:text-brand hover:border-brand/30 hover:bg-brand-light transition-all"
                      title="View profile"
                    >
                      <User size={16} />
                    </button>
                    <button
                      onClick={() => handleReachOut(contact)}
                      className="p-2.5 rounded-xl gradient-brand text-white shadow-sm shadow-brand/20 hover:shadow-md transition-all hover:-translate-y-0.5"
                      title="Reach out"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>

                {/* Open threads */}
                {contact.open_threads && contact.open_threads.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-warm-100">
                    <div className="flex flex-wrap gap-2">
                      {contact.open_threads.slice(0, 2).map((thread, i) => (
                        <span key={i} className="text-xs text-warm-500 bg-warm-50 px-2.5 py-1 rounded-lg">
                          {thread}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-6">
              <Sparkles size={28} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-warm-800 mb-2">You're all caught up!</h2>
            <p className="text-warm-500 mb-8">No one is drifting right now. Great work.</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold shadow-md shadow-brand/20 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              View All Contacts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
