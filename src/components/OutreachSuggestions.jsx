import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { generateOutreachSuggestions } from '../utils/claude';
import { formatRolodexName } from '../utils/nameFormatter';
import { calculateDrift, getRelationshipColor } from '../utils/drift';
import { ArrowLeft, Copy, Check, MessageCircle, Phone, Coffee, Loader2, CheckCircle } from 'lucide-react';

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

const typeConfig = {
  text: { icon: MessageCircle, label: 'Text', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  call: { icon: Phone, label: 'Call', color: 'bg-green-50 text-green-600 border-green-100' },
  hangout: { icon: Coffee, label: 'Hangout', color: 'bg-purple-50 text-purple-600 border-purple-100' },
};

export default function OutreachSuggestions() {
  const { selectedContact, setCurrentView, setSelectedContact, updateContact } = useContext(ContactsContext);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (selectedContact) loadSuggestions();
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
    updateContact(selectedContact.id, {
      last_interaction: {
        approximate_date: new Date().toISOString(),
        description: 'Reached out via Rolo suggestion'
      }
    });
    setSelectedContact(null);
    setCurrentView('dashboard');
  };

  const handleBack = () => {
    setCurrentView('profile');
  };

  if (!selectedContact) return null;

  const relColor = getRelationshipColor(selectedContact.relationship_type);

  return (
    <div className="min-h-screen bg-warm-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-warm-500 hover:text-warm-700 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md"
            style={{ background: relColor.hex }}
          >
            {selectedContact.name?.charAt(0)}
          </div>
          <h1 className="text-3xl font-bold text-warm-900 mb-2">
            Reach out to {formatRolodexName(selectedContact.name)}
          </h1>
          <p className="text-warm-500 text-sm">
            {isLoading ? 'AI is crafting personalized suggestions...' : 'Here are some ways to reconnect'}
          </p>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center">
                <Loader2 size={28} className="text-white animate-spin" />
              </div>
            </div>
            <p className="text-warm-500 text-sm">Generating ideas...</p>
          </motion.div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6"
          >
            <p className="font-medium text-amber-800 text-sm">Using template suggestions</p>
            <p className="text-xs text-amber-600 mt-1">AI unavailable — customize these templates for your message.</p>
          </motion.div>
        )}

        {/* Suggestions */}
        {!isLoading && suggestions.length > 0 && (
          <div className="space-y-4 mb-8">
            {suggestions.map((suggestion, index) => {
              const config = typeConfig[suggestion.type] || typeConfig.text;
              const Icon = config.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-warm-200/60 shadow-sm p-6 hover:shadow-md transition-all"
                >
                  {/* Type badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${config.color}`}>
                      <Icon size={13} />
                      {config.label}
                    </div>
                  </div>

                  {/* Suggestion */}
                  <h3 className="font-semibold text-warm-800 mb-3">{suggestion.suggestion}</h3>

                  {/* Draft message */}
                  <div className="bg-warm-50 rounded-xl p-4 mb-3">
                    <p className="text-xs font-medium text-warm-400 uppercase tracking-wider mb-2">Draft</p>
                    <p className="text-warm-700 text-sm leading-relaxed">{suggestion.draft_message}</p>
                  </div>

                  {/* Reasoning */}
                  {suggestion.reasoning && (
                    <p className="text-xs text-warm-400 mb-4 italic">{suggestion.reasoning}</p>
                  )}

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopyMessage(suggestion.draft_message, index)}
                    className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      copiedIndex === index
                        ? 'bg-green-50 text-green-600 border border-green-200'
                        : 'gradient-brand text-white shadow-sm shadow-brand/20 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {copiedIndex === index ? (
                      <><Check size={15} /> Copied!</>
                    ) : (
                      <><Copy size={15} /> Copy Message</>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <button
              onClick={handleReachedOut}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-green-500 text-white font-semibold shadow-md shadow-green-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <CheckCircle size={18} />
              I Reached Out
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 px-6 rounded-xl font-medium text-warm-500 hover:text-warm-700 hover:bg-warm-100 transition-colors text-sm"
            >
              Back to Profile
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
