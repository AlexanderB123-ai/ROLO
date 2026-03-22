import { useState, useEffect, useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { generateOutreachSuggestions } from '../utils/claude';
import { formatRolodexName } from '../utils/nameFormatter';

// Helper function to calculate days since last interaction
const calculateDrift = (lastInteractionDate) => {
  if (!lastInteractionDate) return 999;
  const now = new Date();
  const last = new Date(lastInteractionDate);
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

// Fallback suggestions if API fails
const getFallbackSuggestions = (contact, drift) => [
  {
    type: 'text',
    suggestion: 'Send a quick text to check in',
    draft_message: `Hey ${contact.name.split(' ')[0]}! Been thinking about you. How have you been?`,
    reasoning: 'Simple and friendly opening'
  },
  {
    type: 'call',
    suggestion: 'Give them a call to catch up properly',
    draft_message: 'Call them when you have 15-20 minutes free',
    reasoning: 'Voice connection is more personal'
  },
  {
    type: 'hangout',
    suggestion: 'Suggest meeting up in person',
    draft_message: `Hey! Want to grab coffee/lunch sometime this week? Would be great to catch up`,
    reasoning: `It's been ${drift} days - time to reconnect in person`
  }
];

export default function OutreachSuggestions() {
  const { selectedContact, setCurrentView, setSelectedContact, updateContact } = useContext(ContactsContext);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (selectedContact) {
      loadSuggestions();
    }
  }, [selectedContact]);

  const loadSuggestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const drift = calculateDrift(selectedContact.last_interaction?.approximate_date);
      const generated = await generateOutreachSuggestions(selectedContact, drift);
      setSuggestions(generated);
    } catch (err) {
      console.error('Error generating suggestions:', err);
      setError(err.message);
      // Use fallback suggestions
      const drift = calculateDrift(selectedContact.last_interaction?.approximate_date);
      setSuggestions(getFallbackSuggestions(selectedContact, drift));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (message, index) => {
    navigator.clipboard.writeText(message).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleReachedOut = () => {
    // Update the contact's last interaction date
    updateContact(selectedContact.id, {
      last_interaction: {
        approximate_date: new Date().toISOString(),
        description: 'Reached out via Rolo suggestion'
      }
    });

    // Return to dashboard
    setSelectedContact(null);
    setCurrentView('dashboard');
  };

  const handleBack = () => {
    setCurrentView('profile');
  };

  if (!selectedContact) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text':
        return '💬';
      case 'call':
        return '📞';
      case 'hangout':
        return '☕';
      default:
        return '💭';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'text':
        return 'bg-blue-100 text-blue-800';
      case 'call':
        return 'bg-green-100 text-green-800';
      case 'hangout':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          Back to Profile
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Reach Out to {formatRolodexName(selectedContact.name)}
          </h1>
          <p className="text-gray-600">
            {isLoading
              ? 'AI is crafting personalized suggestions...'
              : 'Here are some ways you could reconnect'}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4" style={{borderColor: '#DD571C'}}></div>
          </div>
        )}

        {/* Error Message */}
        {error && !isLoading && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Using fallback suggestions</p>
            <p className="text-sm">AI suggestions unavailable. These are generic templates you can customize.</p>
          </div>
        )}

        {/* Suggestions */}
        {!isLoading && suggestions.length > 0 && (
          <div className="space-y-6 mb-8">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100" style={{boxShadow: '0 4px 24px rgba(221, 87, 28, 0.08)'}}>
                {/* Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{getTypeIcon(suggestion.type)}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(suggestion.type)}`}>
                      {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Suggestion */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {suggestion.suggestion}
                </h3>

                {/* Draft Message */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Draft Message:</p>
                  <p className="text-gray-800 leading-relaxed">{suggestion.draft_message}</p>
                </div>

                {/* Reasoning */}
                {suggestion.reasoning && (
                  <p className="text-sm text-gray-600 mb-4 italic">
                    💡 {suggestion.reasoning}
                  </p>
                )}

                {/* Copy Button */}
                <button
                  onClick={() => handleCopyMessage(suggestion.draft_message, index)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-white ${
                    copiedIndex === index ? 'bg-green-500' : ''
                  }`}
                  style={copiedIndex !== index ? {background: 'linear-gradient(135deg, #DD571C, #C44915)'} : {}}
                >
                  {copiedIndex === index ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Message
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {!isLoading && (
          <div className="flex flex-col gap-4">
            <button
              onClick={handleReachedOut}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
              style={{boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)'}}
            >
              ✓ I Reached Out
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 px-6 text-gray-600 hover:text-gray-800 font-medium transition-all hover:bg-gray-100 rounded-xl"
            >
              ← Back to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
