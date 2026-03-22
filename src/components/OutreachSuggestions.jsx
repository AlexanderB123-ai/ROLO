import { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { ContactsContext } from '../context/ContactsContext';
import { generateOutreachSuggestions } from '../utils/claude';
import { fallbackOutreachSuggestions } from '../utils/fallbackData';
import { formatRolodexName } from '../utils/nameFormatter';
import { calculateDrift, getRelationshipColor } from '../utils/drift';
import { ArrowLeft, Copy, Check, MessageCircle, Phone, Coffee, Loader2, CheckCircle, RefreshCw } from 'lucide-react';

const typeConfig = {
  text: { icon: MessageCircle, label: 'Text', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  call: { icon: Phone, label: 'Call', color: 'bg-green-50 text-green-600 border-green-100' },
  hangout: { icon: Coffee, label: 'Hangout', color: 'bg-purple-50 text-purple-600 border-purple-100' },
};

export default function OutreachSuggestions() {
  const { selectedContact, setCurrentView, setSelectedContact, updateContact } = useContext(ContactsContext);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (selectedContact) loadSuggestions();
  }, [selectedContact]);

  const loadSuggestions = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    setUsedFallback(false);

    try {
      const drift = calculateDrift(selectedContact.last_interaction?.approximate_date);
      const generated = await generateOutreachSuggestions(selectedContact, drift);
      setSuggestions(generated);
    } catch (err) {
      console.warn('API failed, using fallback suggestions:', err);
      setSuggestions(fallbackOutreachSuggestions);
      setUsedFallback(true);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
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
    <div className="min-h-screen py-8 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          onClick={handleBack}
          aria-label="Back to profile"
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
            Reach out to {selectedContact.name}
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

        {/* Fallback notice */}
        {usedFallback && !isLoading && (
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
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${config.color}`}>
                      <Icon size={13} />
                      {config.label}
                    </div>
                  </div>

                  <h3 className="font-semibold text-warm-800 mb-3">{suggestion.suggestion}</h3>

                  <div className="bg-warm-50 rounded-xl p-4 mb-3">
                    <p className="text-xs font-medium text-warm-400 uppercase tracking-wider mb-2">Draft</p>
                    <p className="text-warm-700 text-sm leading-relaxed">{suggestion.draft_message}</p>
                  </div>

                  {suggestion.reasoning && (
                    <p className="text-xs text-warm-400 mb-4 italic">{suggestion.reasoning}</p>
                  )}

                  <button
                    onClick={() => handleCopyMessage(suggestion.draft_message, index)}
                    aria-label={copiedIndex === index ? 'Copied' : 'Copy message'}
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
              onClick={loadSuggestions}
              disabled={isLoadingRef.current}
              aria-label="Generate new suggestions"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-warm-600 bg-warm-100 hover:bg-warm-200 transition-colors text-sm disabled:opacity-50"
            >
              <RefreshCw size={15} />
              Regenerate
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
